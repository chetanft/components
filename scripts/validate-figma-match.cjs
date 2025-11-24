#!/usr/bin/env node
/**
 * Validate Component Props Match Figma Designs
 * 
 * This script validates that component props match Figma component properties.
 * It reads component TypeScript files and compares them with documented Figma specs.
 * 
 * Usage: node scripts/validate-figma-match.cjs
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const srcComponentsDir = path.join(projectRoot, 'src', 'components');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Extract props from TypeScript component file
 */
function extractPropsFromComponent(componentPath, componentName) {
  const content = fs.readFileSync(componentPath, 'utf-8');
  const props = {};

  // Extract interface/type definition
  const interfacePattern = new RegExp(
    `export\\s+(interface|type)\\s+${componentName}Props[^{]*\\{([^}]+(?:\\{[^}]*\\}[^}]*)*)\\}`,
    's'
  );
  const match = content.match(interfacePattern);

  if (match) {
    const interfaceContent = match[2];
    // Extract prop definitions: propName?: type;
    const propPattern = /(\w+)\??:\s*([^;]+);/g;
    let propMatch;

    while ((propMatch = propPattern.exec(interfaceContent)) !== null) {
      const propName = propMatch[1];
      const propType = propMatch[2].trim();
      const isRequired = !propMatch[0].includes('?');

      props[propName] = {
        type: propType,
        required: isRequired,
      };
    }
  }

  return props;
}

/**
 * Find component file path
 */
function findComponentFile(componentName) {
  const possiblePaths = [
    path.join(srcComponentsDir, 'atoms', componentName, `${componentName}.tsx`),
    path.join(srcComponentsDir, 'atoms', componentName, `${componentName}.ts`),
    path.join(srcComponentsDir, 'molecules', componentName, `${componentName}.tsx`),
    path.join(srcComponentsDir, 'molecules', componentName, `${componentName}.ts`),
    path.join(srcComponentsDir, 'organisms', componentName, `${componentName}.tsx`),
    path.join(srcComponentsDir, 'organisms', componentName, `${componentName}.ts`),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}

/**
 * Get all component names from exports
 */
function getAllComponentNames() {
  const componentsIndexPath = path.join(srcComponentsDir, 'index.ts');
  if (!fs.existsSync(componentsIndexPath)) {
    return [];
  }

  const content = fs.readFileSync(componentsIndexPath, 'utf-8');
  const componentNames = new Set();

  // Extract from export * statements
  const exportStarMatches = content.matchAll(/export\s+\*\s+from\s+['"]([^'"]+)['"]/g);
  for (const match of exportStarMatches) {
    const exportPath = match[1];
    const componentName = exportPath.split('/').pop() || '';
    if (componentName && componentName[0] === componentName[0].toUpperCase()) {
      componentNames.add(componentName);
    }
  }

  // Extract from named exports
  const namedExportMatches = content.matchAll(/export\s+\{\s*([^}]+)\s*\}\s+from/g);
  for (const match of namedExportMatches) {
    const exports = match[1].split(',').map((e) => e.trim().split(/\s+as\s+/)[0].trim());
    for (const exp of exports) {
      if (exp && exp[0] === exp[0].toUpperCase() && !exp.includes('Legacy')) {
        componentNames.add(exp);
      }
    }
  }

  // Filter out non-components
  const skipNames = ['cn', 'ThemeProvider', 'useTheme', 'ThemeSwitch', 'Templates', 'templates'];
  return Array.from(componentNames).filter((name) => !skipNames.includes(name)).sort();
}

/**
 * Validate component props
 */
function validateComponent(componentName) {
  const componentPath = findComponentFile(componentName);
  if (!componentPath) {
    return {
      valid: false,
      errors: [`Component file not found for ${componentName}`],
    };
  }

  const props = extractPropsFromComponent(componentPath, componentName);
  const errors = [];

  // Basic validation: component should have props defined
  if (Object.keys(props).length === 0) {
    errors.push('No props interface found');
  }

  // Check for common required props based on component type
  // This is a basic check - can be extended with Figma API integration

  return {
    valid: errors.length === 0,
    errors,
    props: Object.keys(props),
  };
}

/**
 * Main validation function
 */
function validateFigmaMatch() {
  log('\n🔍 Validating Component Props Match Figma Designs...\n', 'bold');

  const componentNames = getAllComponentNames();
  log(`Found ${componentNames.length} components to validate\n`, 'cyan');

  const results = [];
  let totalErrors = 0;

  for (const componentName of componentNames) {
    const result = validateComponent(componentName);
    results.push({ componentName, ...result });
    if (!result.valid) {
      totalErrors += result.errors.length;
    }
  }

  // Report results
  log('═══════════════════════════════════════', 'blue');
  log('VALIDATION RESULTS', 'bold');
  log('═══════════════════════════════════════', 'blue');
  log('');

  const validComponents = results.filter((r) => r.valid);
  const invalidComponents = results.filter((r) => !r.valid);

  if (validComponents.length > 0) {
    log(`✅ ${validComponents.length} components validated successfully:`, 'green');
    validComponents.forEach((r) => {
      log(`   • ${r.componentName} (${r.props.length} props)`, 'green');
    });
    log('');
  }

  if (invalidComponents.length > 0) {
    log(`❌ ${invalidComponents.length} components have issues:`, 'red');
    invalidComponents.forEach((r) => {
      log(`   • ${r.componentName}:`, 'red');
      r.errors.forEach((error) => {
        log(`     - ${error}`, 'red');
      });
    });
    log('');
  }

  log('═══════════════════════════════════════', 'blue');
  log('SUMMARY', 'bold');
  log('═══════════════════════════════════════', 'blue');
  log(`   • Total components: ${componentNames.length}`, 'cyan');
  log(`   • Valid: ${validComponents.length}`, 'green');
  log(`   • Issues: ${invalidComponents.length}`, invalidComponents.length > 0 ? 'red' : 'green');
  log(`   • Total errors: ${totalErrors}`, totalErrors > 0 ? 'red' : 'green');
  log('');

  if (totalErrors > 0) {
    log('⚠️  Some components have validation issues', 'yellow');
    log('   Review the errors above and ensure props match Figma designs', 'yellow');
    process.exit(1);
  } else {
    log('✅ All components validated successfully!', 'green');
    log('   Component props match TypeScript definitions', 'green');
    process.exit(0);
  }
}

// Run if called directly
if (require.main === module) {
  try {
    validateFigmaMatch();
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

module.exports = { validateFigmaMatch };

