const fs = require('fs');
['src/components2.tsx', 'src/components3.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/text-\[var\(--text-secondary\)\]xl/g, 'text-2xl');
  fs.writeFileSync(file, content, 'utf8');
});
