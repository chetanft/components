#!/usr/bin/env node
/**
 * Fix final remaining issues
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔧 Fixing final issues...\n');

let componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));

let totalFixed = 0;

// Fix SimpleColumnLayout - add rows prop
if (componentsData.designSystem?.components.SimpleColumnLayout) {
  const comp = componentsData.designSystem.components.SimpleColumnLayout;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    // Check if it's a self-closing tag or has children
    if (!code.includes('rows=')) {
      if (code.endsWith('/>')) {
        code = code.replace(/\s*\/>/, ' rows={[]} />');
      } else {
        // Has children, insert before closing tag
        code = code.replace(/(<SimpleColumnLayout[^>]*)(>)/, '$1 rows={[]}$2');
      }
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed SimpleColumnLayout (added rows prop)');
  totalFixed++;
}

// Fix FileCard - remove alert statements
if (componentsData.designSystem?.components.FileCard) {
  const comp = componentsData.designSystem.components.FileCard;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    // Remove alert() statements
    code = code.replace(/alert\([^)]+\)/g, '');
    // Clean up any double spaces or trailing spaces before />
    code = code.replace(/\s+/g, ' ').replace(/\s+\/>/g, ' />');
    return { ...ex, code };
  });
  console.log('   ✅ Fixed FileCard (removed alert statements)');
  totalFixed++;
}

// Write fixed file
fs.writeFileSync(componentsJson, JSON.stringify(componentsData, null, 2));

console.log('\n' + '='.repeat(60));
console.log('✅ FINAL ISSUES FIXED');
console.log('='.repeat(60));
console.log(`\n📊 Summary:`);
console.log(`   - Fixed ${totalFixed} components`);
console.log('\n✨ All components should now be error-free!');

