const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/text-main-light/g, 'text-[var(--text-main)]');
  content = content.replace(/border-white\/10/g, 'border-[var(--border-soft)]');
  content = content.replace(/text-main-muted/g, 'text-[var(--text-muted)]');
  content = content.replace(/text-[#10B981]/g, 'text-[var(--success-green)]');
  content = content.replace(/bg-\[\#F59E0B\]\/10/g, 'bg-[var(--success-green)]/10');
  content = content.replace(/text-\[\#F59E0B\]/g, 'text-[var(--success-green)]');
  content = content.replace(/bg-gradient-to-r from-\[var\(--primary\)\] via-\[var\(--accent\)\] to-\[var\(--primary\)\]/g, 'bg-gradient-main');
  content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-\[var\(--primary\)\] via-\[var\(--accent\)\] to-\[var\(--primary\)\]/g, 'text-gradient-main');

  fs.writeFileSync(filePath, content, 'utf8');
}

const files = ['src/components/SmartSections.tsx', 'src/components1.tsx', 'src/components2.tsx', 'src/components3.tsx'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    processFile(file);
    console.log('Processed', file);
  }
});
