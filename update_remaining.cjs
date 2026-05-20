const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/text-\[\#10B981\]/g, 'text-[var(--success-green)]');
  content = content.replace(/text-\[\#E2E8F0\]/g, 'text-[var(--text-secondary)]');
  content = content.replace(/border-white\/10/g, 'border-[var(--border-soft)]');
  content = content.replace(/text-\[\#06B6D4\]/g, 'text-[var(--cyan)]');
  
  // Custom replacements
  content = content.replace(/bg-gradient-to-r from-teal-400 to-emerald-500/g, 'bg-gradient-main');

  fs.writeFileSync(filePath, content, 'utf8');
}

const files = ['src/App.tsx'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    processFile(file);
    console.log('Processed', file);
  }
});
