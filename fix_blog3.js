const fs = require('fs');
let content = fs.readFileSync('src/hooks/__tests__/useBlogData.test.js', 'utf8');

content = content.replace(/expect\(result\.current\.loading\)\.toBe\(false\);/g, "expect(result.current.loading).toBe(false);\n        expect(result.current.enrollmentEvents.length > 0 || result.current.error || !dataTypes?.length).toBe(true); // Ensure it's not just the initial false unless error/empty");

content = content.replace(/expect\(result\.current\.enrollmentEvents\.length > 0 \|\| result\.current\.error \|\| \!dataTypes\?\.length\)\.toBe\(true\); \/\/ Ensure it's not just the initial false unless error\/empty/g,
""); // clean that up if I messed up

content = content.replace(/await waitFor\([\s\n]*\(\) => \{[\s\n]*expect\(result\.current\.loading\)\.toBe\(false\);[\s\n]*\},[\s\n]*\{ timeout: 3000 \},[\s\n]*\);[\s\n]*expect\(result\.current\.enrollmentEvents\)\.toEqual\(mockEnrollmentEvents\);/g,
"await waitFor(() => expect(result.current.enrollmentEvents).toEqual(mockEnrollmentEvents), { timeout: 3000 });");

content = content.replace(/await waitFor\([\s\n]*\(\) => \{[\s\n]*expect\(result\.current\.loading\)\.toBe\(false\);[\s\n]*\},[\s\n]*\{ timeout: 3000 \},[\s\n]*\);[\s\n]*expect\(result\.current\.error\)\.toBeInstanceOf\(Error\);/g,
"await waitFor(() => expect(result.current.error).toBeInstanceOf(Error), { timeout: 3000 });");

fs.writeFileSync('src/hooks/__tests__/useBlogData.test.js', content, 'utf8');
