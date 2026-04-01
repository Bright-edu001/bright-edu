const fs = require('fs');
let content = fs.readFileSync('src/utils/__tests__/performanceMonitor.test.js', 'utf8');

content = content.replace(/const logger = require\(\"\.\.\/logger\"\)\.default;\s*logSpy = vi\.spyOn\(logger, "log"\)\.mockImplementation\(\(\) => \{\}\);/g, 
"const logger = require('../logger').default;\n    logSpy = vi.spyOn(logger, 'log').mockImplementation(() => {});");

fs.writeFileSync('src/utils/__tests__/performanceMonitor.test.js', content, 'utf8');
