const fs = require('fs');

const files = [
  'src/services/__tests__/contactService.test.js',
  'src/services/__tests__/firestoreToSheetsSync.test.js'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/vi\.mock\(\"\.\.\/\.\.\/utils\/logger\", \(\) => \(\{ default: \{\} \}\)\);/g, 'vi.mock("../../utils/logger", () => ({ default: { log: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn(), performance: vi.fn(), formSubmit: vi.fn() } }));');
  fs.writeFileSync(f, content, 'utf8');
});
