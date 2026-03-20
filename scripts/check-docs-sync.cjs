#!/usr/bin/env node
'use strict';

const fs = require('fs');
/**
 * Ensures sync:docs produces output matching the committed state.
 * Re-runs sync:docs with a stable timestamp and compares generated files
 * after normalizing known timestamp-only fields/comments.
 */

const { execSync, spawnSync } = require('child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const trackedFiles = require('./doc-sync-tracked-files.cjs');

function readHeadFile(file) {
  try {
    return execSync(`git show HEAD:${file}`, {
      encoding: 'utf8',
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return null;
  }
}

function normalizeContent(file, content) {
  if (content == null) {
    return content;
  }

  if (file === 'docs/generated/component-design-specs.json' || file === 'docs/audits/machine-mode-coverage.json') {
    const parsed = JSON.parse(content);
    delete parsed.generatedAt;
    return JSON.stringify(parsed, null, 2) + '\n';
  }

  if (file === 'ft-docs/src/data/design-system.generated.ts') {
    return content
      .replace(/^\/\/ Generated: .*$/m, '// Generated: <normalized>')
      .replace(/^export const GENERATED_AT = .*;$/m, 'export const GENERATED_AT = "<normalized>";');
  }

  if (file === 'docs/component-design-specs.md') {
    return content.replace(/^(> Version: .* \| Generated: ).*$/m, '$1<normalized>');
  }

  if (file === 'AI_CONTEXT.md') {
    return content.replace(/^(> Version: .* \| Last Updated: ).*$/m, '$1<normalized>');
  }

  return content;
}

function restoreFiles(backups) {
  for (const [file, content] of backups.entries()) {
    if (content == null) {
      continue;
    }
    fs.writeFileSync(path.join(projectRoot, file), content, 'utf8');
  }
}

let committed;
try {
  committed = readHeadFile('docs/generated/component-design-specs.json');
} catch {
  // File may not exist in initial commit
  process.exit(0);
}

if (!committed) {
  process.exit(0);
}

const { generatedAt } = JSON.parse(committed);
const env = { ...process.env, SYNC_TIMESTAMP: generatedAt };
const backups = new Map(
  trackedFiles.map((file) => {
    const absolutePath = path.join(projectRoot, file);
    return [file, fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, 'utf8') : null];
  })
);

const result = spawnSync('npm', ['run', 'sync:docs'], {
  stdio: 'inherit',
  env,
  cwd: projectRoot,
});

if ((result.status ?? 1) !== 0) {
  restoreFiles(backups);
  process.exit(result.status ?? 1);
}

const substantiveDiffs = [];
for (const file of trackedFiles) {
  const absolutePath = path.join(projectRoot, file);
  const current = fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, 'utf8') : null;
  const head = readHeadFile(file);
  if (normalizeContent(file, current) !== normalizeContent(file, head)) {
    substantiveDiffs.push(file);
  }
}

restoreFiles(backups);

if (substantiveDiffs.length > 0) {
  console.error('Documentation sync is out of date for:');
  for (const file of substantiveDiffs) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

process.exit(0);
