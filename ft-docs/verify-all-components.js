#!/usr/bin/env node
/**
 * Comprehensive verification of all components
 */

const fs = require('fs');
const path = require('path');

const componentsJson = path.join(__dirname, 'src/data/components.json');

console.log('🔍 Verifying all components...\n');

let componentsData = JSON.parse(fs.readFileSync(componentsJson, 'utf-8'));

const issues = [];
const fixed = [];

// Components that need specific props
const requiredProps = {
  SegmentedTabs: ['items'],
  RadioSelector: ['options'],
  SimpleColumnLayout: ['rows'],
  QuickFilters: ['filters'],
  Table: ['columns', 'data'],
  Tabs: ['tabs'],
  Steps: ['steps'], // Note: StepsItem doesn't need steps prop
  StackedBarChart: ['data'],
  UploadItem: ['file'],
  FileCard: ['file'],
  FileTypeIcon: ['fileType'],
  UploadButton: ['onUpload'],
  Upload: ['onUpload'],
  UserProfile: ['user'],
  UserProfileDropdown: ['user'],
  Footer: ['links'],
  NavigationPopover: ['items'],
  ProgressList: ['items'],
  Dropdown: ['options'],
};

// Check all components
for (const [compName, compData] of Object.entries(componentsData.designSystem?.components || {})) {
  const examples = compData.examples || [];
  
  if (examples.length === 0) {
    issues.push(`${compName}: No examples`);
    continue;
  }
  
  const required = requiredProps[compName] || [];
  
  for (const example of examples) {
    const code = example.code || '';
    const exampleIssues = [];
    
    // Check syntax
    if (code.count && code.split('"').length % 2 !== 0) {
      exampleIssues.push('unmatched quotes');
    }
    if (code.split('{').length !== code.split('}').length) {
      exampleIssues.push('unmatched braces');
    }
    if (code.split('[').length !== code.split(']').length) {
      exampleIssues.push('unmatched brackets');
    }
    
    // Check required props (skip for StepsItem examples)
    if (!code.includes('StepsItem')) {
      for (const prop of required) {
        if (!code.includes(`${prop}=`)) {
          exampleIssues.push(`missing ${prop} prop`);
        } else if (code.includes(`${prop}={[]}`) && compName !== 'Table') {
          // Empty arrays are OK for Table, but not for others that need data
          if (['SegmentedTabs', 'ProgressList', 'Dropdown'].includes(compName)) {
            exampleIssues.push(`empty ${prop} array`);
          }
        }
      }
    }
    
    // Check for invalid patterns
    if (code.includes('console.log(')) {
      exampleIssues.push('has console.log');
    }
    if (code.includes('alert(')) {
      exampleIssues.push('has alert');
    }
    if (code.match(/\w+=\{([A-Z_][A-Z0-9_]*|[a-z]+\.[a-z]+)\}/)) {
      exampleIssues.push('variable reference');
    }
    
    // Check prop name mismatches
    if (compName === 'SegmentedTabs' && code.includes('tabs=')) {
      exampleIssues.push('using tabs instead of items');
    }
    
    if (exampleIssues.length > 0) {
      issues.push(`${compName} - ${example.name}: ${exampleIssues.join(', ')}`);
    } else {
      fixed.push(`${compName} - ${example.name}`);
    }
  }
}

console.log('='.repeat(60));
console.log('VERIFICATION RESULTS');
console.log('='.repeat(60));

if (issues.length > 0) {
  console.log(`\n❌ Found ${issues.length} issues:\n`);
  issues.forEach(issue => console.log(`   - ${issue}`));
} else {
  console.log('\n✅ No issues found!');
}

console.log(`\n✅ ${fixed.length} examples are valid`);

if (issues.length === 0) {
  console.log('\n✨ All components are properly configured!');
} else {
  console.log('\n⚠️  Please fix the issues above.');
  process.exit(1);
}

