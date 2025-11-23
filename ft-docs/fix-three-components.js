#!/usr/bin/env node
/**
 * Fix Chicklet, FileValidationCard, and ProgressList component errors
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔧 Fixing Chicklet, FileValidationCard, and ProgressList...\n');

let componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));

// Fix Chicklet - change showClose=true to showClose={true}
if (componentsData.designSystem?.components.Chicklet) {
  const comp = componentsData.designSystem.components.Chicklet;
  comp.examples = comp.examples.map(ex => ({
    ...ex,
    code: ex.code.replace(/showClose=true/g, 'showClose={true}').replace(/disabled=true/g, 'disabled={true}')
  }));
  console.log('   ✅ Fixed Chicklet examples (boolean props)');
}

// Fix FileValidationCard - remove console.log statements and fix props
if (componentsData.designSystem?.components.FileValidationCard) {
  const comp = componentsData.designSystem.components.FileValidationCard;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code;
    
    // Remove console.log statements
    code = code.replace(/console\.log\([^)]+\)\"/g, '');
    
    // Fix validationStats prop - convert total=1250 success=1250 invalid=0 to validationStats={{total: 1250, success: 1250, invalid: 0}}
    const totalMatch = code.match(/total=(\d+)/);
    const successMatch = code.match(/success=(\d+)/);
    const invalidMatch = code.match(/invalid=(\d+)/);
    
    if (totalMatch && successMatch && invalidMatch) {
      // Remove individual props
      code = code.replace(/total=\d+\s*/g, '');
      code = code.replace(/success=\d+\s*/g, '');
      code = code.replace(/invalid=\d+\s*/g, '');
      
      // Add validationStats prop
      const total = totalMatch[1];
      const success = successMatch[1];
      const invalid = invalidMatch[1];
      
      // Insert before closing tag
      code = code.replace(/\s*\/>/, ` validationStats={{total: ${total}, success: ${success}, invalid: ${invalid}}} />`);
    }
    
    return { ...ex, code };
  });
  console.log('   ✅ Fixed FileValidationCard examples (removed console.log, fixed validationStats)');
}

// Fix ProgressList - add items prop
if (componentsData.designSystem?.components.ProgressList) {
  const comp = componentsData.designSystem.components.ProgressList;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code;
    
    // If no items prop, add empty array
    if (!code.includes('items=')) {
      code = code.replace(/\s*\/>/, ' items={[]} />');
    }
    
    return { ...ex, code };
  });
  console.log('   ✅ Fixed ProgressList examples (added items prop)');
}

// Write fixed file
fs.writeFileSync(componentsJson, JSON.stringify(componentsData, null, 2));

console.log('\n' + '='.repeat(60));
console.log('✅ ALL THREE COMPONENTS FIXED');
console.log('='.repeat(60));
console.log('\n✨ Components should now render without errors!');

