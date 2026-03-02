#!/usr/bin/env node

const { execSync } = require('child_process');

function run(cmd) {
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

try {
  run('npm run check:tokens');
  run('npm run type-check');
  console.log('\n✅ Pre-commit UI checks passed.');
} catch (error) {
  console.error('\n❌ Pre-commit UI checks failed.');
  process.exit(1);
}
