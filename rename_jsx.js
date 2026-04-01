const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const jsFiles = walk('src');
let renamedCount = 0;

jsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // 簡單判斷是否有用到 JSX 標籤 (例如 <div, <Component, </>, <Fragment)
  const hasJSX = /<\s*[a-zA-Z]+[^>]*>|<\s*\/\s*[a-zA-Z]+>|<\s*[a-zA-Z]+[^>]*\/>|<\s*>\s*<\s*\/>/.test(content);
  
  if (hasJSX) {
    const newFile = file.replace(/\.js$/, '.jsx');
    fs.renameSync(file, newFile);
    console.log(Renamed:  -> );
    renamedCount++;
  }
});

console.log(\n Total renamed:  files);
