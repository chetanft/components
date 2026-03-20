#!/usr/bin/env node
'use strict';

/**
 * Aligns versions, runs sync:docs, and commits generated doc artifacts (+ ft-docs/package.json)
 * so `npm version` does not fail with "Git working directory not clean."
 * Fails if other tracked/untracked changes remain.
 */

const fs = require('fs');
const { spawnSync, execFileSync } = require('child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const trackedFiles = require('./doc-sync-tracked-files.cjs');
const extraTracked = ['ft-docs/package.json'];

function runNpmScript(scriptName) {
  const result = spawnSync('npm', ['run', scriptName], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: process.env,
  });
  if ((result.status ?? 1) !== 0) {
    process.exit(result.status ?? 1);
  }
}

function stageDocArtifacts() {
  const paths = [...trackedFiles, ...extraTracked].filter((f) =>
    fs.existsSync(path.join(projectRoot, f))
  );
  if (paths.length === 0) {
    return;
  }
  execFileSync('git', ['add', '--', ...paths], { cwd: projectRoot, stdio: 'inherit' });
}

function hasStagedChanges() {
  try {
    execFileSync('git', ['diff', '--cached', '--quiet'], { cwd: projectRoot });
    return false;
  } catch {
    return true;
  }
}

function commitDocSync() {
  execFileSync('git', ['commit', '-m', 'chore: sync generated docs before release'], {
    cwd: projectRoot,
    stdio: 'inherit',
  });
}

function main() {
  runNpmScript('sync:version');
  runNpmScript('sync:docs');
  stageDocArtifacts();

  if (hasStagedChanges()) {
    commitDocSync();
  }

  const status = execFileSync('git', ['status', '--porcelain'], {
    cwd: projectRoot,
    encoding: 'utf8',
  }).trim();

  if (status) {
    console.error(
      '\n❌ Working tree is still dirty after syncing docs. Commit or stash changes, then retry publish.\n'
    );
    console.error(status);
    console.error(
      '\nTip: only doc artifacts and ft-docs/package.json are auto-committed. For Cursor hook noise run: git restore .cursor/hooks/state/continual-learning.json\n'
    );
    process.exit(1);
  }
}

main();
