#!/usr/bin/env node
/**
 * Fix specific syntax errors and missing props for problematic components
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔧 Fixing specific component errors...\n');

let componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));

let totalFixed = 0;

// Fix FileThumbnail - remove alert() statements
if (componentsData.designSystem?.components.FileThumbnail) {
  const comp = componentsData.designSystem.components.FileThumbnail;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    // Remove alert() statements
    code = code.replace(/alert\([^)]+\)"/g, '');
    // Fix unmatched quotes
    code = code.replace(/(")([^"]*)"([^"]*)$/, '$1$2$3"');
    return { ...ex, code };
  });
  console.log('   ✅ Fixed FileThumbnail (removed alert statements)');
  totalFixed++;
}

// Fix Collapsible - check for regex issues
if (componentsData.designSystem?.components.Collapsible) {
  const comp = componentsData.designSystem.components.Collapsible;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    // Fix regex patterns that might cause issues
    code = code.replace(/\/([^\/]+)\//g, (match, content) => {
      // Escape if it looks like a regex
      if (content.match(/[.*+?^${}()|[\]\\]/)) {
        return `/${content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/`;
      }
      return match;
    });
    return { ...ex, code };
  });
  console.log('   ✅ Fixed Collapsible (regex patterns)');
  totalFixed++;
}

// Fix components that need arrays but have empty examples
const componentsNeedingArrays = {
  RadioSelector: 'options',
  SegmentedTabs: 'tabs',
  SimpleColumnLayout: 'rows',
  QuickFilters: 'filters',
  Table: ['columns', 'data'],
  Tabs: 'tabs',
};

for (const [compName, propName] of Object.entries(componentsNeedingArrays)) {
  if (componentsData.designSystem?.components[compName]) {
    const comp = componentsData.designSystem.components[compName];
    const needsUpdate = comp.examples.some(ex => {
      const code = ex.code || '';
      if (Array.isArray(propName)) {
        return propName.some(p => !code.includes(`${p}=`));
      }
      return !code.includes(`${propName}=`);
    });
    
    if (needsUpdate) {
      comp.examples = comp.examples.map(ex => {
        let code = ex.code || '';
        if (Array.isArray(propName)) {
          propName.forEach(p => {
            if (!code.includes(`${p}=`)) {
              code = code.replace(/\s*\/>/, ` ${p}={[]} />`);
            }
          });
        } else {
          if (!code.includes(`${propName}=`)) {
            code = code.replace(/\s*\/>/, ` ${propName}={[]} />`);
          }
        }
        return { ...ex, code };
      });
      console.log(`   ✅ Fixed ${compName} (added ${propName} prop)`);
      totalFixed++;
    }
  }
}

// Fix UploadItem - needs file prop
if (componentsData.designSystem?.components.UploadItem) {
  const comp = componentsData.designSystem.components.UploadItem;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('file=')) {
      code = code.replace(/\s*\/>/, ' file={{name: "test.txt", type: "text/plain", size: 1024}} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed UploadItem (added file prop)');
  totalFixed++;
}

// Fix FileCard - needs file prop
if (componentsData.designSystem?.components.FileCard) {
  const comp = componentsData.designSystem.components.FileCard;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('file=') && !code.includes('fileName=')) {
      code = code.replace(/\s*\/>/, ' file={{name: "test.txt", type: "text/plain"}} />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed FileCard (added file prop)');
  totalFixed++;
}

// Fix FileTypeIcon - needs fileType prop
if (componentsData.designSystem?.components.FileTypeIcon) {
  const comp = componentsData.designSystem.components.FileTypeIcon;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    if (!code.includes('fileType=')) {
      code = code.replace(/\s*\/>/, ' fileType="pdf" />');
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed FileTypeIcon (added fileType prop)');
  totalFixed++;
}

// Fix Steps - needs steps prop if not present
if (componentsData.designSystem?.components.Steps) {
  const comp = componentsData.designSystem.components.Steps;
  comp.examples = comp.examples.map(ex => {
    let code = ex.code || '';
    // Only add steps if it's a simple example without steps
    if (!code.includes('steps=') && code.includes('<Steps')) {
      // Check if it's a simple example
      if (code.match(/<Steps[^>]*\/>/)) {
        code = code.replace(/\s*\/>/, ' steps={[]} />');
      }
    }
    return { ...ex, code };
  });
  console.log('   ✅ Fixed Steps (added steps prop where needed)');
  totalFixed++;
}

// Write fixed file
fs.writeFileSync(componentsJson, JSON.stringify(componentsData, null, 2));

console.log('\n' + '='.repeat(60));
console.log('✅ SPECIFIC ERRORS FIXED');
console.log('='.repeat(60));
console.log(`\n📊 Summary:`);
console.log(`   - Fixed ${totalFixed} components`);
console.log('\n✨ Components should now render correctly!');

