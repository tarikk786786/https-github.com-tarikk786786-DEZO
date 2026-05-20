const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Input styles
  content = content.replace(/border-white\/10 rounded-xl px-5/g, 'border-[var(--border-soft)] rounded-xl px-5 focus:border-[var(--primary)]');
  
  // Custom class for text-main-light
  content = content.replace(/text-main-light/g, 'text-[var(--text-main)]');
  
  fs.writeFileSync(filePath, content, 'utf8');
}

const files = ['src/App.tsx'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    processFile(file);
    console.log('Processed', file);
  }
});
