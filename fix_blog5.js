const fs = require('fs');
let content = fs.readFileSync('src/hooks/__tests__/useBlogData.test.js', 'utf8');

// The replacement was failing. I will just do:
function replaceNth(str, replaceWhat, replaceTo, nth) {
    let t = 0;
    return str.replace(new RegExp(replaceWhat, 'g'), function (match) {
        t++;
        return (t === nth) ? replaceTo : match;
    });
}
content = replaceNth(content, 'useBlogData\\(\\)', 'useBlogData(["enrollmentEvents"])', 2);
content = replaceNth(content, 'useBlogData\\(\\)', 'useBlogData(["enrollmentEvents"])', 2); // since index shifted
fs.writeFileSync('src/hooks/__tests__/useBlogData.test.js', content, 'utf8');
