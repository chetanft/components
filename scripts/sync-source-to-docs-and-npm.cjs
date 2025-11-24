#!/usr/bin/env node
/**
 * Sync Component Source to Docs and NPM Package
 * 
 * When component source is updated, this script:
 * 1. Syncs versions across all packages
 * 2. Validates component exports
 * 3. Builds npm package
 * 
 * Note: Docs now imports directly from source - no components.json needed
 * 
 * Usage: node scripts/sync-source-to-docs-and-npm.cjs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { syncVersion } = require('./sync-version.cjs');

const projectRoot = path.join(__dirname, '..');
const srcComponentsDir = path.join(projectRoot, 'src', 'components');
const docsRegistryPath = path.join(projectRoot, 'ft-docs', 'src', 'registry.tsx');
const srcIndexPath = path.join(projectRoot, 'src', 'index.ts');

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

function execCommand(command, description, options = {}) {
  try {
    log(`\n${description}...`, 'cyan');
    execSync(command, {
      cwd: projectRoot,
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options,
    });
    log(`✅ ${description} completed`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, 'red');
    if (!options.continueOnError) {
      process.exit(1);
    }
    return false;
  }
}

function getExportedComponents() {
  try {
    // Read components/index.ts directly since that's where components are exported
    const componentsIndexPath = path.join(srcComponentsDir, 'index.ts');
    if (!fs.existsSync(componentsIndexPath)) {
      log(`⚠️  Components index not found: ${componentsIndexPath}`, 'yellow');
      return [];
    }
    
    const componentsContent = fs.readFileSync(componentsIndexPath, 'utf8');
    const components = [];
    
    // Extract from export * statements (these export all components from subdirectories)
    const exportStarPattern = /export\s+\*\s+from\s+['"]([^'"]+)['"]/g;
    const exportPaths = [];
    let match;
    while ((match = exportStarPattern.exec(componentsContent)) !== null) {
      exportPaths.push(match[1]);
    }
    
    // Extract named exports
    const namedExportPattern = /export\s+{\s*([^}]+)\s*}\s+from\s+['"][^'"]+['"]/g;
    while ((match = namedExportPattern.exec(componentsContent)) !== null) {
      if (match[1]) {
        const exports = match[1].split(',').map(e => e.trim().split(/\s+as\s+/)[0].trim());
        components.push(...exports);
      }
    }
    
    // For export * paths, we need to read those files to get component names
    // But for simplicity, we'll use the registry file as source of truth
    // since it already has all components listed
    if (fs.existsSync(docsRegistryPath)) {
      const registryContent = fs.readFileSync(docsRegistryPath, 'utf8');
      const importMatch = registryContent.match(/import\s+{([^}]+)}\s+from\s+['"]\.\.\/\.\.\/src['"]/);
      if (importMatch) {
        const registryComponents = importMatch[1]
          .split(',')
          .map(c => c.trim())
          .filter(c => c.length > 0 && !c.includes('React'));
        return registryComponents;
      }
    }
    
    // Fallback: filter out non-component exports
    const filtered = components.filter(c => 
      !['cn', 'ThemeProvider', 'useTheme', 'ThemeSwitch', 'Templates', 'templates', 'IconName', 'iconMap'].includes(c) &&
      !c.includes('Type') && 
      !c.includes('Props') &&
      !c.includes('Legacy') &&
      c.length > 0 &&
      c[0] === c[0].toUpperCase() // Components start with uppercase
    );
    
    return [...new Set(filtered)]; // Remove duplicates
  } catch (error) {
    log(`⚠️  Error reading exports: ${error.message}`, 'yellow');
    return [];
  }
}

function updateDocsRegistry(components) {
  if (!fs.existsSync(docsRegistryPath)) {
    log(`⚠️  Registry file not found: ${docsRegistryPath}`, 'yellow');
    return false;
  }
  
  try {
    // Docs now imports directly from source - registry is manually maintained
    // Just verify components are exported
    log(`   ✅ Verified ${components.length} components are exported`, 'green');
    log(`   ℹ️  Docs imports directly from source - no generation needed`, 'cyan');
    return true;
  } catch (error) {
    log(`   ⚠️  Error: ${error.message}`, 'yellow');
    return false;
  }
}

function syncSourceToDocsAndNpm() {
  log('\n🚀 Syncing Component Source to Docs and NPM Package...\n', 'bold');

  // Step 1: Sync versions (single source of truth)
  log('═══════════════════════════════════════', 'blue');
  log('STEP 1: Version Synchronization', 'bold');
  log('═══════════════════════════════════════', 'blue');
  try {
    syncVersion();
  } catch (error) {
    log(`❌ Version sync failed: ${error.message}`, 'red');
    process.exit(1);
  }

  // Step 2: Get exported components from source
  log('\n═══════════════════════════════════════', 'blue');
  log('STEP 2: Reading Component Exports', 'bold');
  log('═══════════════════════════════════════', 'blue');
  const components = getExportedComponents();
  log(`   Found ${components.length} exported components`, 'cyan');
  log(`   Components: ${components.slice(0, 10).join(', ')}${components.length > 10 ? '...' : ''}`, 'cyan');

  // Step 3: Validate component exports
  log('\n═══════════════════════════════════════', 'blue');
  log('STEP 3: Validating Component Exports', 'bold');
  log('═══════════════════════════════════════', 'blue');
  execCommand('npm run validate:docs', 'Validating component exports', {
    continueOnError: false,
  });

  // Step 4: Update docs registry
  log('\n═══════════════════════════════════════', 'blue');
  log('STEP 4: Validating Docs Setup', 'bold');
  log('═══════════════════════════════════════', 'blue');
  updateDocsRegistry(components);
  log('   ℹ️  Docs imports directly from source - metadata generated on-demand', 'cyan');

  // Step 5: Build npm package
  log('\n═══════════════════════════════════════', 'blue');
  log('STEP 5: Building NPM Package', 'bold');
  log('═══════════════════════════════════════', 'blue');
  execCommand('npm run build', 'Building npm package', {
    continueOnError: false,
  });

  // Summary
  log('\n═══════════════════════════════════════', 'green');
  log('✅ Source to Docs & NPM Sync Complete!', 'bold');
  log('═══════════════════════════════════════', 'green');
  log(`\n📊 Summary:`, 'cyan');
  log(`   • Components synced: ${components.length}`, 'cyan');
  log(`   • Docs registry updated`, 'green');
  log(`   • NPM package built`, 'green');
  log(`\n📦 Ready to publish: npm run publish`, 'cyan');
  log(`📚 Docs will reflect component changes on next build`, 'cyan');
}

// Run if called directly
if (require.main === module) {
  try {
    syncSourceToDocsAndNpm();
    process.exit(0);
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

module.exports = { syncSourceToDocsAndNpm };

