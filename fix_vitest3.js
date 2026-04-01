const fs = require('fs');
let content = fs.readFileSync('vitest.config.js', 'utf8');

content = content.replace(/include: \/src\/\.\*\\\.js\$\/,/, "include: /src\\\\/.*\\\\.js\$/,\n");

fs.writeFileSync('vitest.config.js', content, 'utf8');
