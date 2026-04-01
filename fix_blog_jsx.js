const fs = require('fs');
let content = fs.readFileSync('src/hooks/__tests__/useBlogData.test.js', 'utf8');

if (!content.includes('import React')) {
  content = "import React from 'react';\n" + content;
}

content = content.replace(/<QueryClientProvider client=\{new QueryClient\(\{ defaultOptions: \{ queries: \{ retry: false \} \} \}\)\}>\{children\}<\/QueryClientProvider>/g,
"React.createElement(QueryClientProvider, { client: new QueryClient({ defaultOptions: { queries: { retry: false } } }) }, children)");

fs.writeFileSync('src/hooks/__tests__/useBlogData.test.js', content, 'utf8');
