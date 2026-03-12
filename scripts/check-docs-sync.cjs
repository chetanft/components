#!/usr/bin/env node
'use strict';

/**
 * Ensures sync:docs produces output matching the committed state.
 * Reads the committed generatedAt timestamp and re-runs sync:docs with it,
 * so the second run produces identical output (no spurious timestamp diff).
 */

const { execSync, spawnSync } = require('child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

let committed;
try {
  committed = execSync('git show HEAD:docs/generated/component-design-specs.json', {
    encoding: 'utf8',
    cwd: projectRoot,
  });
} catch {
  // File may not exist in initial commit
  process.exit(0);
}

const { generatedAt } = JSON.parse(committed);
const env = { ...process.env, SYNC_TIMESTAMP: generatedAt };

const result = spawnSync('npm', ['run', 'sync:docs'], {
  stdio: 'inherit',
  env,
  cwd: projectRoot,
});

process.exit(result.status ?? 1);
