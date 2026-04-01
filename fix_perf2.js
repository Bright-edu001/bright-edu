const fs = require('fs');
let content = fs.readFileSync('src/utils/__tests__/performanceMonitor.test.js', 'utf8');

// replace the internal spy with global mock
if (!content.includes('vi.mock("../logger"')) {
content = content.replace(/describe\(\"performanceMonitor\"/, "import logger from '../logger';\nvi.mock('../logger', () => ({ default: { log: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() } }));\ndescribe(\"performanceMonitor\"");

content = content.replace(/const logger = require\(\"\.\.\/logger\"\)\.default;\s*logSpy = vi\.spyOn\(logger, "log"\)\.mockImplementation\(\(\) => \{\}\);/, 
    "logSpy = logger.log;");
}

fs.writeFileSync('src/utils/__tests__/performanceMonitor.test.js', content, 'utf8');
