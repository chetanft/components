#!/usr/bin/env node
/**
 * Duplicate Story Explorer Lint
 *
 * Policy: Docs-level stories in src/stories/ that duplicate a component story
 * in src/components/ must NOT have explorer config. Explorer should only live
 * in the canonical component story file.
 *
 * Flags when a docs story has explorer AND a matching component story exists.
 *
 * Exit code 1 if violations found.
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "..");

function hasExplorerConfig(absPath) {
  const source = fs.readFileSync(absPath, "utf8");
  // Check for explorer config with rows (active explorer, not just docsOnly marker)
  const hasExplorer = /\bexplorer\s*:\s*\{/.test(source);
  if (!hasExplorer) return false;
  // Exclude files that only have docsOnly marker (no rows)
  const hasRows = /\brows\s*:\s*\[/.test(source);
  return hasRows;
}

function extractComponentName(filePath) {
  return path.basename(filePath).replace(/\.stories\.tsx$/, "");
}

function main() {
  const docsStories = glob.sync("src/stories/*.stories.tsx", { cwd: ROOT, absolute: true });
  const componentStories = glob.sync("src/components/**/*.stories.tsx", { cwd: ROOT, absolute: true });

  // Build a set of component names from src/components/
  const componentNames = new Set();
  for (const f of componentStories) {
    componentNames.add(extractComponentName(f));
  }

  const violations = [];

  for (const docsFile of docsStories) {
    const name = extractComponentName(docsFile);
    if (!componentNames.has(name)) continue; // Not a duplicate

    if (hasExplorerConfig(docsFile)) {
      const relPath = path.relative(ROOT, docsFile);
      violations.push({ name, relPath });
    }
  }

  if (violations.length === 0) {
    console.log("Duplicate story explorer lint: PASS (0 violations)");
    return;
  }

  console.error("Duplicate story explorer lint: FAIL");
  console.error("");
  console.error("The following docs stories duplicate a component story AND have explorer config.");
  console.error("Policy: Explorer config must live only in the canonical src/components/ story.");
  console.error("Fix: Remove the explorer config or replace with `docsOnly: true`.");
  console.error("");

  for (const v of violations) {
    console.error(`  VIOLATION: ${v.relPath} (duplicates component: ${v.name})`);
  }

  console.error("");
  console.error(`${violations.length} violation(s) found.`);
  process.exit(1);
}

main();
