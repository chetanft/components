#!/usr/bin/env node
/**
 * Fix ButtonGroup, DatePicker, Dropdown, and FileValidationCard issues
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔧 Fixing ButtonGroup, DatePicker, Dropdown, and FileValidationCard...\n');

let componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));

// Fix ButtonGroup - add buttons prop
if (componentsData.designSystem?.components.ButtonGroup) {
  const comp = componentsData.designSystem.components.ButtonGroup;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('buttons=')) {
      code = code.replace(/\s*\/>/, ' buttons={[{id: "1", label: "Button", variant: "text"}, {id: "2", label: "Button", variant: "secondary"}, {id: "3", label: "Button", variant: "primary"}]} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed ButtonGroup (added buttons prop)');
}

// Write fixed file
fs.writeFileSync(componentsJson, JSON.stringify(componentsData, null, 2));

console.log('\n✨ ButtonGroup is now fixed!');

