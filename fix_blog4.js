const fs = require('fs');
let content = fs.readFileSync('src/hooks/__tests__/useBlogData.test.js', 'utf8');

// Replace useBlogData() with useBlogData(["enrollmentEvents"]) in the second and third tests
content = content.replace(/test\(\"should load enrollment events\", async \(\) => \{\n\s*const \{ result \} = renderHook\(\(\) => useBlogData\(\), \{ wrapper:/, 
  "test(\"should load enrollment events\", async () => {\n    const { result } = renderHook(() => useBlogData([\"enrollmentEvents\"]), { wrapper:");

content = content.replace(/test\(\"should handle errors gracefully\", async \(\) => \{\n.*\n.*\n\s*const \{ result \} = renderHook\(\(\) => useBlogData\(\), \{ wrapper:/, 
  "test(\"should handle errors gracefully\", async () => {\n    const errorMessage = \"Network error\";\n    blogService.getEnrollmentEvents.mockRejectedValue(new Error(errorMessage));\n\n    const { result } = renderHook(() => useBlogData([\"enrollmentEvents\"]), { wrapper:");

fs.writeFileSync('src/hooks/__tests__/useBlogData.test.js', content, 'utf8');
