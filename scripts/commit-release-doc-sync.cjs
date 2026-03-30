#!/usr/bin/env node
'use strict';

/**
 * After `npm version`, regenerates docs for the new package version and commits
 * doc artifacts (+ ft-docs/package.json) so `check:docs-sync` in publish:prepare passes.
 */

const fs = require('fs');
const { spawnSync, execFileSync } = require('child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const trackedFiles = require('./doc-sync-tracked-files.cjs');
const { getHeadDocSyncTimestamp } = require('./publish-git-utils.cjs');
/** Updated by sync:version after a version bump */
const extraTracked = ['ft-docs/package.json'];

function hasStagedChanges() {
  try {
    execFileSync('git', ['diff', '--cached', '--quiet'], { cwd: projectRoot });
    return false;
  } catch {
    return true;
  }
}

function main() {
  const headTs = getHeadDocSyncTimestamp(projectRoot);
  const syncEnv = headTs ? { ...process.env, SYNC_TIMESTAMP: headTs } : process.env;
  const scripts = [
    ['sync:docs', syncEnv],
    ['check:consistency:report', process.env],
    ['generate:registry', process.env],
  ];

  for (const [scriptName, env] of scripts) {
    const result = spawnSync('npm', ['run', scriptName], {
      cwd: projectRoot,
      stdio: 'inherit',
      env,
    });

    if ((result.status ?? 1) !== 0) {
      process.exit(result.status ?? 1);
    }
  }

  const toStage = [...trackedFiles, ...extraTracked].filter((f) =>
    fs.existsSync(path.join(projectRoot, f))
  );

  if (toStage.length === 0) {
    process.exit(0);
  }

  execFileSync('git', ['add', '--', ...toStage], { cwd: projectRoot, stdio: 'inherit' });

  if (hasStagedChanges()) {
    execFileSync(
      'git',
      ['commit', '-m', 'chore: sync generated docs for release version'],
      { cwd: projectRoot, stdio: 'inherit' }
    );
  }
}

main();
