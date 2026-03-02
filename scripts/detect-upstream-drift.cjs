#!/usr/bin/env node
'use strict';

/**
 * detect-upstream-drift.cjs
 *
 * Detects when upstream design-system package versions have changed relative to
 * a saved snapshot, and reports which spec files may need review.
 *
 * Usage:
 *   node scripts/detect-upstream-drift.cjs --snapshot          # save current versions
 *   node scripts/detect-upstream-drift.cjs --check             # compare against snapshot
 *   node scripts/detect-upstream-drift.cjs --check --json      # machine-readable output
 *   node scripts/detect-upstream-drift.cjs --lockfile-diff <path>  # parse a diff file
 *
 * Exit codes:
 *   0  no drift detected (or snapshot saved successfully)
 *   1  one or more spec files need review
 */

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Paths (all relative to repo root, which is one level up from this script)
// ---------------------------------------------------------------------------
const REPO_ROOT      = path.resolve(__dirname, '..');
const MAPPING_FILE   = path.join(REPO_ROOT, 'specs', 'upstream-mapping.json');
const PACKAGE_JSON   = path.join(REPO_ROOT, 'package.json');
const SNAPSHOT_FILE  = path.join(REPO_ROOT, 'docs', 'audits', 'upstream-versions.json');

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);

function hasFlag(flag) {
  return args.includes(flag);
}

function getFlagValue(flag) {
  const idx = args.indexOf(flag);
  if (idx === -1 || idx + 1 >= args.length) return null;
  return args[idx + 1];
}

const MODE_SNAPSHOT      = hasFlag('--snapshot');
const MODE_CHECK         = hasFlag('--check');
const MODE_LOCKFILE_DIFF = hasFlag('--lockfile-diff');
const JSON_OUTPUT        = hasFlag('--json');
const LOCKFILE_DIFF_PATH = getFlagValue('--lockfile-diff');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    fatal(`Failed to parse JSON at ${filePath}: ${err.message}`);
  }
}

function writeJson(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function fatal(msg) {
  if (JSON_OUTPUT) {
    process.stdout.write(JSON.stringify({ error: msg }, null, 2) + '\n');
  } else {
    process.stderr.write(`[detect-upstream-drift] ERROR: ${msg}\n`);
  }
  process.exit(2);
}

function log(msg) {
  if (!JSON_OUTPUT) {
    process.stdout.write(msg + '\n');
  }
}

// ---------------------------------------------------------------------------
// Load the mapping file
// ---------------------------------------------------------------------------
function loadMapping() {
  const mapping = readJson(MAPPING_FILE);
  if (!mapping || typeof mapping.mappings !== 'object') {
    fatal(`Could not read mappings from ${MAPPING_FILE}`);
  }
  return mapping.mappings; // { packageName: [specFile, ...], ... }
}

// ---------------------------------------------------------------------------
// Extract versions of mapped packages from package.json
// ---------------------------------------------------------------------------
function readPackageVersions(mappedPackages) {
  const pkg = readJson(PACKAGE_JSON);
  if (!pkg) fatal(`Could not read ${PACKAGE_JSON}`);

  const allDeps = Object.assign(
    {},
    pkg.dependencies    || {},
    pkg.devDependencies || {},
    pkg.peerDependencies || {}
  );

  const versions = {};
  for (const name of mappedPackages) {
    versions[name] = allDeps[name] || null;
  }
  return versions;
}

// ---------------------------------------------------------------------------
// Parse changed packages from a unified diff of package-lock.json
//
// Looks for lines like:
//   -      "version": "1.2.3",
//   +      "version": "1.2.4",
// within a block that also contains the package name, OR the simpler
// top-level diff hunk format produced by `git diff`.
// ---------------------------------------------------------------------------
function parseLockfileDiff(diffPath) {
  if (!fs.existsSync(diffPath)) {
    fatal(`Diff file not found: ${diffPath}`);
  }

  const text = fs.readFileSync(diffPath, 'utf8');
  const lines = text.split('\n');

  // Collect all package names that appear near changed "version" lines.
  // Strategy: scan hunks; when we see a +/- version line, look backward in
  // the current hunk context for the nearest "node_modules/<name>" marker.
  const changed = new Set();
  let currentPackage = null;

  for (const line of lines) {
    // Track the current node_modules block heading (e.g. "node_modules/foo")
    const pkgMatch = line.match(/"node_modules\/([^"]+)"/);
    if (pkgMatch) {
      currentPackage = pkgMatch[1]; // may be scoped, e.g. @radix-ui/react-checkbox
    }

    // A changed version line
    if (/^[+-]\s+"version"\s*:/.test(line) && currentPackage) {
      changed.add(currentPackage);
    }
  }

  return Array.from(changed);
}

// ---------------------------------------------------------------------------
// Build the result: which specs are affected by a list of changed packages
// ---------------------------------------------------------------------------
function buildDriftResult(changedPackages, mappings) {
  const affected = {}; // packageName -> { from, to, specs[] }
  const allSpecsSet = new Set();

  for (const pkg of changedPackages) {
    if (!mappings[pkg]) continue; // not a tracked package
    const specs = mappings[pkg];
    affected[pkg] = { specs };
    specs.forEach(s => allSpecsSet.add(s));
  }

  return {
    driftDetected: Object.keys(affected).length > 0,
    changedPackages: Object.keys(affected),
    affectedSpecs: Array.from(allSpecsSet).sort(),
    details: affected,
  };
}

// ---------------------------------------------------------------------------
// Output helpers
// ---------------------------------------------------------------------------
function outputResult(result) {
  if (JSON_OUTPUT) {
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    return;
  }

  if (!result.driftDetected) {
    log('No upstream drift detected. All tracked packages match the snapshot.');
    return;
  }

  log('');
  log('Upstream drift detected — the following spec files may need review:');
  log('');

  for (const [pkg, info] of Object.entries(result.details)) {
    const fromTo = (info.from && info.to)
      ? ` (${info.from} -> ${info.to})`
      : info.from
        ? ` (was ${info.from}, now missing)`
        : info.to
          ? ` (new: ${info.to})`
          : '';
    log(`  Package: ${pkg}${fromTo}`);
    for (const spec of info.specs) {
      log(`    - ${spec}`);
    }
  }

  log('');
  log(`${result.affectedSpecs.length} spec file(s) flagged for review.`);
  log('');
}

// ---------------------------------------------------------------------------
// Mode: --snapshot
// Saves current package.json versions to docs/audits/upstream-versions.json
// ---------------------------------------------------------------------------
function runSnapshot() {
  const mappings = loadMapping();
  const mappedPackages = Object.keys(mappings);
  const versions = readPackageVersions(mappedPackages);

  const snapshot = {
    description: 'Snapshot of upstream package versions for drift detection. Generated by scripts/detect-upstream-drift.cjs',
    generatedAt: new Date().toISOString(),
    versions,
  };

  writeJson(SNAPSHOT_FILE, snapshot);
  log(`Snapshot saved to ${path.relative(REPO_ROOT, SNAPSHOT_FILE)}`);
  log(`Tracked ${mappedPackages.length} package(s).`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Mode: --check
// Compares current package.json versions against the saved snapshot.
// ---------------------------------------------------------------------------
function runCheck() {
  const mappings = loadMapping();
  const mappedPackages = Object.keys(mappings);

  const snapshot = readJson(SNAPSHOT_FILE);
  if (!snapshot || typeof snapshot.versions !== 'object') {
    fatal(
      `No snapshot found at ${SNAPSHOT_FILE}. ` +
      'Run with --snapshot first to create one.'
    );
  }

  const current = readPackageVersions(mappedPackages);
  const saved   = snapshot.versions;

  const changedPackages = [];
  const details = {};

  for (const pkg of mappedPackages) {
    const prev = saved[pkg]    || null;
    const curr = current[pkg]  || null;

    if (prev !== curr) {
      changedPackages.push(pkg);
      if (mappings[pkg]) {
        details[pkg] = {
          from:  prev,
          to:    curr,
          specs: mappings[pkg],
        };
      }
    }
  }

  const allSpecsSet = new Set();
  for (const info of Object.values(details)) {
    info.specs.forEach(s => allSpecsSet.add(s));
  }

  const result = {
    snapshotDate:   snapshot.generatedAt || null,
    driftDetected:  changedPackages.length > 0,
    changedPackages,
    affectedSpecs:  Array.from(allSpecsSet).sort(),
    details,
  };

  outputResult(result);
  process.exit(result.driftDetected ? 1 : 0);
}

// ---------------------------------------------------------------------------
// Mode: --lockfile-diff <path>
// Parses a git diff of package-lock.json and reports affected specs.
// ---------------------------------------------------------------------------
function runLockfileDiff() {
  if (!LOCKFILE_DIFF_PATH) {
    fatal('--lockfile-diff requires a path argument, e.g. --lockfile-diff changes.diff');
  }

  const mappings = loadMapping();
  const changedPackages = parseLockfileDiff(LOCKFILE_DIFF_PATH);

  // Filter to only the packages we track
  const trackedChanged = changedPackages.filter(pkg => mappings[pkg]);

  const allSpecsSet = new Set();
  const details = {};

  for (const pkg of trackedChanged) {
    const specs = mappings[pkg];
    details[pkg] = { specs };
    specs.forEach(s => allSpecsSet.add(s));
  }

  const result = {
    source:         LOCKFILE_DIFF_PATH,
    driftDetected:  trackedChanged.length > 0,
    changedPackages: trackedChanged,
    affectedSpecs:  Array.from(allSpecsSet).sort(),
    details,
  };

  outputResult(result);
  process.exit(result.driftDetected ? 1 : 0);
}

// ---------------------------------------------------------------------------
// Entrypoint
// ---------------------------------------------------------------------------
if (!MODE_SNAPSHOT && !MODE_CHECK && !MODE_LOCKFILE_DIFF) {
  const usage = [
    'Usage:',
    '  node scripts/detect-upstream-drift.cjs --snapshot',
    '      Save current package.json versions as baseline.',
    '',
    '  node scripts/detect-upstream-drift.cjs --check [--json]',
    '      Compare current versions against saved snapshot.',
    '      Exit 1 if any spec files need review.',
    '',
    '  node scripts/detect-upstream-drift.cjs --lockfile-diff <path> [--json]',
    '      Parse a unified diff of package-lock.json to find changed packages.',
    '      Exit 1 if any spec files need review.',
    '',
    'Mapping file:  specs/upstream-mapping.json',
    'Snapshot file: docs/audits/upstream-versions.json',
  ].join('\n');

  process.stdout.write(usage + '\n');
  process.exit(0);
}

if (MODE_SNAPSHOT)      runSnapshot();
else if (MODE_CHECK)    runCheck();
else if (MODE_LOCKFILE_DIFF) runLockfileDiff();
