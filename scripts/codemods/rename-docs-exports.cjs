#!/usr/bin/env node
/**
 * Codemod: Rename aggregate gallery exports in story files that have ExplorerBase.
 *
 * Renames: Variants -> DocsVariants, States -> DocsStates, Sizes -> DocsSizes
 *
 * Only applies to files in src/components/ that export ExplorerBase.
 * Does NOT rename exports referenced in explorer rows as story targets.
 *
 * Usage:
 *   node scripts/codemods/rename-docs-exports.cjs [--dry-run]
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "../..");
const DRY_RUN = process.argv.includes("--dry-run");

// Only rename these aggregate gallery names
const RENAME_MAP = {
  Variants: "DocsVariants",
  States: "DocsStates",
  Sizes: "DocsSizes",
};

// Patterns for story files in src/components
const STORY_GLOBS = [
  "src/components/**/*.stories.tsx",
];

function getExplorerStoryRefs(source) {
  // Extract all story: 'XYZ' references from explorer config
  const refs = new Set();
  const re = /story:\s*['"](\w+)['"]/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    refs.add(m[1]);
  }
  return refs;
}

function processFile(absPath) {
  const source = fs.readFileSync(absPath, "utf8");

  // Must have ExplorerBase
  if (!/export\s+(const|function)\s+ExplorerBase\b/.test(source)) return null;

  const storyRefs = getExplorerStoryRefs(source);
  let modified = source;
  const renames = [];

  for (const [oldName, newName] of Object.entries(RENAME_MAP)) {
    // Skip if this name is referenced in explorer rows
    if (storyRefs.has(oldName)) continue;

    // Check if export exists
    const exportRegex = new RegExp(
      `export\\s+(const|function)\\s+${oldName}\\b`
    );
    if (!exportRegex.test(modified)) continue;

    // Rename the export declaration
    modified = modified.replace(
      new RegExp(`(export\\s+(?:const|function)\\s+)${oldName}\\b`, "g"),
      `$1${newName}`
    );

    // Also rename any render function references like: function VariantsComponent -> function DocsVariantsComponent
    // But be careful - only rename the export name, not internal references

    renames.push(`${oldName} -> ${newName}`);
  }

  if (renames.length === 0) return null;

  const relPath = path.relative(ROOT, absPath);
  if (!DRY_RUN) {
    fs.writeFileSync(absPath, modified, "utf8");
  }

  return { file: relPath, renames };
}

function main() {
  const files = STORY_GLOBS.flatMap((pattern) =>
    glob.sync(pattern, { cwd: ROOT, absolute: true })
  );

  const results = [];
  for (const file of files) {
    const result = processFile(file);
    if (result) results.push(result);
  }

  console.log(`${DRY_RUN ? "[DRY RUN] " : ""}Processed ${files.length} files, ${results.length} modified.\n`);

  for (const { file, renames } of results) {
    console.log(`  ${file}`);
    for (const r of renames) {
      console.log(`    ${r}`);
    }
  }

  if (DRY_RUN) {
    console.log("\nRe-run without --dry-run to apply changes.");
  }
}

main();
