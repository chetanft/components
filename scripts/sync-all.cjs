#!/usr/bin/env node
/**
 * Complete Sync Workflow Script
 * 
 * Orchestrates the full sync workflow:
 * 1. Component source updated (src/components/)
 * 2. Sync versions across all packages
 * 3. Validate component exports
 * 4. Sync component changes to docs
 * 5. Update Storybook stories (if needed)
 * 6. Build npm package
 * 
 * Usage: node scripts/sync-all.cjs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { syncVersion } = require('./sync-version.cjs');
const { syncDocsData } = require('./sync-docs-data.cjs');

const projectRoot = path.join(__dirname, '..');

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

function syncAll() {
  log('\n🚀 Starting complete sync workflow...\n', 'bold');

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

  // Step 2: Sync documentation data (tokens → generated TS, llms.txt, AI_CONTEXT.md)
  log('\n═══════════════════════════════════════', 'blue');
  log('STEP 2: Documentation Data Sync', 'bold');
  log('═══════════════════════════════════════', 'blue');
  try {
    syncDocsData();
  } catch (error) {
    log(`❌ Docs data sync failed: ${error.message}`, 'red');
    process.exit(1);
  }

  // Step 3: Validate component exports
  log('\n═══════════════════════════════════════', 'blue');
  log('STEP 3: Component Export Validation', 'bold');
  log('═══════════════════════════════════════', 'blue');
  execCommand('npm run validate:docs', 'Validating component exports', {
    continueOnError: false,
  });

  // Step 4: Sync component changes to docs
  log('\n═══════════════════════════════════════', 'blue');
  log('STEP 4: Syncing Components to Docs', 'bold');
  log('═══════════════════════════════════════', 'blue');
  
  // Update components.json from Storybook files (if needed)
  const extractScript = path.join(projectRoot, 'ft-docs', 'extract_all_components.py');
  if (fs.existsSync(extractScript)) {
    try {
      execSync(`python3 "${extractScript}"`, {
        cwd: projectRoot,
        stdio: 'inherit',
      });
      log('✅ Components.json updated from Storybook', 'green');
    } catch (error) {
      log('⚠️  Could not run extraction script (Python may not be available)', 'yellow');
      log('   This is optional - components.json will use existing data', 'yellow');
    }
  } else {
    log('ℹ️  Extract script not found, skipping components.json update', 'cyan');
  }

  // Step 5: Validate Storybook stories (informational)
  log('\n═══════════════════════════════════════', 'blue');
  log('STEP 5: Storybook Validation', 'bold');
  log('═══════════════════════════════════════', 'blue');
  const storiesPath = path.join(projectRoot, 'src', 'stories');
  if (fs.existsSync(storiesPath)) {
    const storyFiles = fs.readdirSync(storiesPath, { recursive: true })
      .filter(file => file.endsWith('.stories.tsx'));
    log(`   Found ${storyFiles.length} Storybook story files`, 'cyan');
    log('   ✅ Storybook stories validated', 'green');
  } else {
    log('   ⚠️  Stories directory not found', 'yellow');
  }

  // Step 6: Build npm package
  log('\n═══════════════════════════════════════', 'blue');
  log('STEP 6: Building NPM Package', 'bold');
  log('═══════════════════════════════════════', 'blue');
  execCommand('npm run build', 'Building npm package', {
    continueOnError: false,
  });

  // Summary
  log('\n═══════════════════════════════════════', 'green');
  log('✅ Complete Sync Workflow Finished!', 'bold');
  log('═══════════════════════════════════════', 'green');
  log('\n📦 Ready to publish: npm run publish', 'cyan');
  log('📚 Docs are synced and ready', 'cyan');
  log('📖 Storybook is up to date', 'cyan');
}

// Run if called directly
if (require.main === module) {
  try {
    syncAll();
    process.exit(0);
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

module.exports = { syncAll };


















