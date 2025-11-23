#!/usr/bin/env node
/**
 * Properly fix FileCard examples - fix all syntax errors
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔧 Properly fixing FileCard examples...\n');

let componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));

if (componentsData.designSystem?.components.FileCard) {
  const comp = componentsData.designSystem.components.FileCard;
  
  // Fix each example properly
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    
    // Remove all stray quotes and spaces
    code = code.replace(/\s*\"\s*\"/g, '');
    code = code.replace(/\s*\\"\s*\\"/g, '');
    
    // Fix file prop - ensure it has proper structure
    if (code.includes('file={{')) {
      // Replace with proper file object
      code = code.replace(/file=\{\{[^}]+\}\}/g, 'file={{name: "test.txt", type: "text/plain"}}');
    } else if (!code.includes('file=')) {
      // Add file prop before closing tag
      code = code.replace(/\s*\/>/, ' file={{name: "test.txt", type: "text/plain"}} />');
    }
    
    // Ensure fileType is present and valid
    if (!code.includes('fileType=')) {
      // Extract from fileName
      const fileNameMatch = code.match(/fileName="([^"]+)"/);
      if (fileNameMatch) {
        const fileName = fileNameMatch[1];
        const ext = fileName.split('.').pop()?.toLowerCase() || 'xlsx';
        const fileType = ext === 'xlsx' || ext === 'xls' ? 'xlsx' : ext === 'csv' ? 'csv' : 'pdf';
        code = code.replace(/(fileName="[^"]+")/, `$1 fileType="${fileType}"`);
      } else {
        code = code.replace(/(fileName="[^"]+")/, '$1 fileType="xlsx"');
      }
    }
    
    // Clean up any double spaces or trailing spaces
    code = code.replace(/\s+/g, ' ').trim();
    code = code.replace(/\s+\/>/g, ' />');
    
    return { ...ex, code };
  });
  
  console.log('   ✅ Fixed all FileCard examples');
  
  // Write fixed file
  fs.writeFileSync(componentsJson, JSON.stringify(componentsData, null, 2));
  
  console.log('\n✨ FileCard is now properly fixed!');
} else {
  console.log('   ❌ FileCard not found');
}

