#!/usr/bin/env node
'use strict';

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const semver = require('semver');

const projectRoot = path.join(__dirname, '..');
const packageJson = JSON.parse(
  fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8')
);

function getArg(name) {
  const prefix = `${name}=`;
  const match = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : null;
}

function hasFlag(flag) {
  return process.argv.slice(2).includes(flag);
}

function runNpm(args, options = {}) {
  return execFileSync('npm', args, {
    cwd: projectRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  }).trim();
}

function fail(message, error) {
  console.error(`\n❌ ${message}\n`);
  if (error?.stderr) {
    const stderr = String(error.stderr).trim();
    if (stderr) {
      console.error(stderr);
      console.error('');
    }
  }
  process.exit(1);
}

function parseTargetVersion(currentVersion) {
  const explicitVersion = getArg('--version');
  if (explicitVersion) {
    return explicitVersion;
  }

  const bump = getArg('--bump');
  if (!bump) {
    return currentVersion;
  }

  const nextVersion = semver.inc(currentVersion, bump);
  if (!nextVersion) {
    fail(`Unsupported bump type "${bump}".`);
  }

  return nextVersion;
}

function main() {
  const registry =
    getArg('--registry') || packageJson.publishConfig?.registry || 'https://registry.npmjs.org';
  const packageName = packageJson.name;
  const currentVersion = packageJson.version;
  const targetVersion = parseTargetVersion(currentVersion);
  const skipVersionCheck = hasFlag('--skip-version-check');

  try {
    runNpm(['--version']);
  } catch (error) {
    fail('npm is not available on PATH. Install/load Node.js before publishing.', error);
  }

  let username;
  try {
    username = runNpm(['whoami', '--registry', registry]);
  } catch (error) {
    fail(
      `npm authentication failed for ${registry}. Run "npm login" or configure a publish-capable token first.`,
      error
    );
  }

  console.log(`🔐 npm user: ${username}`);
  console.log(`📦 package: ${packageName}`);
  console.log(`🌐 registry: ${registry}`);
  console.log(`🏷️  target version: ${targetVersion}`);

  let remoteVersion = null;
  try {
    remoteVersion = runNpm(['view', packageName, 'version', '--registry', registry]);
  } catch (error) {
    const stderr = String(error?.stderr || '');
    if (/E404|404 Not Found|is not in this registry/i.test(stderr)) {
      fail(
        `${packageName} is not readable from ${registry} for this npm identity. If the package exists, this account/token is not an owner. If it does not exist, create/publish it from the correct owning account or switch to a scoped package name.`,
        error
      );
    }
    fail(`Failed to read current registry metadata for ${packageName}.`, error);
  }

  console.log(`☁️  registry version: ${remoteVersion}`);

  try {
    const owners = runNpm(['owner', 'ls', packageName, '--registry', registry])
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const isOwner = owners.some((line) => line.startsWith(`${username} `) || line === username);
    if (!isOwner) {
      fail(
        `${username} is authenticated but is not listed as an owner of ${packageName}. Ask an existing owner to run "npm owner add ${username} ${packageName}".`
      );
    }
  } catch (error) {
    fail(`Failed to verify npm owner list for ${packageName}.`, error);
  }

  if (!skipVersionCheck && remoteVersion === targetVersion) {
    fail(
      `Version ${targetVersion} is already published for ${packageName}. Bump the version before publishing again.`
    );
  }

  console.log('\n✅ Publish preflight passed.\n');
}

main();
