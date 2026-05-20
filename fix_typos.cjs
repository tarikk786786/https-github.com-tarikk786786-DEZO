const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/text-\[var\(--text-secondary\)\]xl/g, 'text-2xl');
fs.writeFileSync('src/App.tsx', content, 'utf8');
