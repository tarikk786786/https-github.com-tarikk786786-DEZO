const { execSync } = require('child_process');
try {
  console.log(execSync('git reflog').toString());
} catch(e) {
  console.log(e.toString());
}
