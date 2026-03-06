#!/usr/bin/env node
/**
 * Version Synchronization Script
 * 
 * Reads version from root package.json (single source of truth)
 * and syncs it to:
 * - ft-docs/package.json
 * - CHANGELOG.md (if version entry exists)
 * - Any other version locations
 * 
 * Usage: node scripts/sync-version.cjs
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const rootPackageJsonPath = path.join(projectRoot, 'package.json');
const docsPackageJsonPath = path.join(projectRoot, 'ft-docs', 'package.json');
const changelogPath = path.join(projectRoot, 'CHANGELOG.md');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    log(`❌ Error reading ${filePath}: ${error.message}`, 'red');
    return null;
  }
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    return true;
  } catch (error) {
    log(`❌ Error writing ${filePath}: ${error.message}`, 'red');
    return false;
  }
}

function syncVersion() {
  log('🔄 Syncing versions across packages...\n', 'cyan');

  // Step 1: Read root package.json (source of truth)
  log('1️⃣ Reading root package.json...', 'blue');
  const rootPackage = readJsonFile(rootPackageJsonPath);
  if (!rootPackage || !rootPackage.version) {
    log('❌ Root package.json not found or missing version', 'red');
    process.exit(1);
  }

  const sourceVersion = rootPackage.version;
  log(`   Source version: ${sourceVersion}`, 'cyan');

  // Step 2: Sync to ft-docs/package.json
  log('\n2️⃣ Syncing to ft-docs/package.json...', 'blue');
  if (fs.existsSync(docsPackageJsonPath)) {
    const docsPackage = readJsonFile(docsPackageJsonPath);
    if (docsPackage) {
      const oldVersion = docsPackage.version;
      if (oldVersion !== sourceVersion) {
        docsPackage.version = sourceVersion;
        if (writeJsonFile(docsPackageJsonPath, docsPackage)) {
          log(`   ✅ Updated: ${oldVersion} → ${sourceVersion}`, 'green');
        } else {
          log(`   ❌ Failed to update`, 'red');
          process.exit(1);
        }
      } else {
        log(`   ✅ Already synced: ${sourceVersion}`, 'green');
      }
    }
  } else {
    log(`   ⚠️  ft-docs/package.json not found, skipping`, 'yellow');
  }

  // Step 3: AI context files (llms.txt, AI_CONTEXT.md) are now generated
  // by sync-docs-data.cjs from templates — no need to patch them here.
  log('\n3️⃣ AI context files handled by sync:docs (skipping)', 'cyan');

  // Step 4: Validate version consistency
  log('\n4️⃣ Validating version consistency...', 'blue');
  const docsPackage = readJsonFile(docsPackageJsonPath);
  if (docsPackage && docsPackage.version !== sourceVersion) {
    log(`   ❌ Version mismatch detected!`, 'red');
    log(`   Root: ${sourceVersion}`, 'red');
    log(`   Docs: ${docsPackage.version}`, 'red');
    process.exit(1);
  }

  log(`   ✅ All versions synchronized: ${sourceVersion}`, 'green');

  // Step 5: Check CHANGELOG.md (informational only)
  log('\n5️⃣ Checking CHANGELOG.md...', 'blue');
  if (fs.existsSync(changelogPath)) {
    const changelogContent = fs.readFileSync(changelogPath, 'utf8');
    const versionRegex = /^## \[([^\]]+)\]/m;
    const match = changelogContent.match(versionRegex);
    if (match) {
      const changelogVersion = match[1];
      if (changelogVersion === 'Unreleased') {
        log(`   ℹ️  CHANGELOG.md has [Unreleased] entry (expected)`, 'cyan');
      } else if (changelogVersion !== sourceVersion) {
        log(`   ⚠️  CHANGELOG.md latest version (${changelogVersion}) differs from package version`, 'yellow');
        log(`   💡 Consider updating CHANGELOG.md with new version entry`, 'yellow');
      } else {
        log(`   ✅ CHANGELOG.md version matches: ${sourceVersion}`, 'green');
      }
    }
  }

  log('\n✅ Version synchronization complete!', 'green');
  return sourceVersion;
}

// Run if called directly
if (require.main === module) {
  try {
    const version = syncVersion();
    process.exit(0);
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

module.exports = { syncVersion };
















