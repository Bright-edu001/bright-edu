const fs = require('fs');
let content = fs.readFileSync('src/hooks/__tests__/useBlogData.test.js', 'utf8');
const importQuery = "import { QueryClient, QueryClientProvider } from '@tanstack/react-query';\n";
if (!content.includes('QueryClientProvider')) {
  content = importQuery + content;
  
  content = content.replace(/renderHook\(\(\) => useBlogData\((.*)\)\)/g, 
  "renderHook(() => useBlogData(\), { wrapper: ({ children }) => <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>{children}</QueryClientProvider> })");
  fs.writeFileSync('src/hooks/__tests__/useBlogData.test.js', content, 'utf8');
}
