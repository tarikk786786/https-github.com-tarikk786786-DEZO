const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace gradients
  content = content.replace(/bg-gradient-to-r from-\[var\(--primary\)\] via-\[var\(--accent\)\] to-\[var\(--primary\)\]/g, 'bg-gradient-main');
  content = content.replace(/bg-gradient-to-r from-\[var\(--primary\)\] to-\[var\(--accent\)\]/g, 'bg-gradient-main');
  content = content.replace(/bg-gradient-to-r from-brand-primary to-\[var\(--accent\)\]/g, 'bg-gradient-main');
  
  // Text gradients
  content = content.replace(/text-transparent bg-clip-text bg-gradient-main/g, 'text-gradient-main');
  content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-\[var\(--primary\)\] to-\[var\(--accent\)\]/g, 'text-gradient-main');
  content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-\[var\(--primary\)\] via-\[var\(--accent\)\] to-\[var\(--primary\)\]/g, 'text-gradient-main');
  
  // Custom class for secondary text / muted text
  content = content.replace(/text-main-muted/g, 'text-[var(--text-muted)]');
  content = content.replace(/text-[#E2E8F0]/g, 'text-[var(--text-secondary)]');
  
  // Card styles
  content = content.replace(/bg-\[var\(--bg-card\)\] backdrop-blur-\[var\(--glass-blur\)\] border border-white\/10/g, 'glass-card');
  
  // Shadows
  content = content.replace(/shadow-\[0_10px_20px_var\(--primary\)]/g, 'shadow-[var(--shadow-soft)]');
  content = content.replace(/shadow-\[0_15px_30px_rgba\(47,128,255,0\.4\)]/g, 'shadow-[var(--shadow-soft)]');
  
  fs.writeFileSync(filePath, content, 'utf8');
}

const files = ['src/App.tsx', 'src/components/SmartSections.tsx', 'src/components1.tsx', 'src/components2.tsx', 'src/components3.tsx'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    processFile(file);
    console.log('Processed', file);
  }
});
