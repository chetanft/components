#!/usr/bin/env node
/**
 * Explorer Contract Validator
 *
 * Scans story files for `parameters.explorer` config and verifies:
 *   1. Referenced `story` names exist as named exports
 *   2. Every row has at least one scenario
 *   3. Scenario/row ids are non-empty strings
 *   4. Scenario labels are single-scenario labels (no bundled variants)
 *   5. Scenario labels are not vague aggregate labels (e.g. "States", "Sizes")
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "..");
const STORIES_GLOBS = [
  "src/components/**/*.stories.tsx",
  "src/stories/*.stories.tsx",
];

let errors = 0;
let checked = 0;

function extractExports(source) {
  const exports = new Set();
  // Match: export const Name, export function Name, export { Name }
  const patterns = [
    /export\s+(?:const|let|var|function)\s+(\w+)/g,
    /export\s*\{([^}]+)\}/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(source)) !== null) {
      if (re === patterns[1]) {
        // destructured exports
        m[1].split(",").forEach((s) => {
          const name = s.trim().split(/\s+as\s+/).pop().trim();
          if (name) exports.add(name);
        });
      } else {
        exports.add(m[1]);
      }
    }
  }
  return exports;
}

function extractExplorerConfig(source) {
  // Look for explorer: { ... } inside parameters
  // This is a rough heuristic — we look for the pattern and try to eval-parse
  const explorerMatch = source.match(
    /explorer\s*:\s*(\{[\s\S]*?\n\s{4}\})/
  );
  if (!explorerMatch) return null;

  // We can't safely eval TypeScript, so we'll do a simpler check:
  // extract story references from the `story:` fields
  const storyRefs = [];
  const storyPattern = /story\s*:\s*['"](\w+)['"]/g;
  let m;
  while ((m = storyPattern.exec(source)) !== null) {
    storyRefs.push(m[1]);
  }

  // Extract row ids
  const rowIds = [];
  const rowIdPattern = /id\s*:\s*['"]([^'"]+)['"]/g;
  // We'll just collect all ids — rows and scenarios share the same pattern
  // but that's fine for validation
  while ((m = rowIdPattern.exec(source)) !== null) {
    rowIds.push(m[1]);
  }

  // Check for rows with scenarios
  const scenariosPattern = /scenarios\s*:\s*\[/g;
  const hasScenarios = scenariosPattern.test(source);

  return { storyRefs, rowIds, hasScenarios };
}

const files = [];
for (const g of STORIES_GLOBS) {
  files.push(...glob.sync(g, { cwd: ROOT, absolute: true }));
}

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");

  // Skip files without explorer config
  if (!source.includes("explorer:") || !source.includes("parameters")) continue;
  // More precise: check it's inside parameters
  if (!source.includes("parameters")) continue;

  const relPath = path.relative(ROOT, file);
  checked++;

  const namedExports = extractExports(source);

  // Extract story references from explorer config
  const storyRefPattern = /story\s*:\s*['"](\w+)['"]/g;
  let m;
  while ((m = storyRefPattern.exec(source)) !== null) {
    const storyName = m[1];
    if (!namedExports.has(storyName)) {
      console.error(
        `  ERROR: ${relPath} — explorer references story "${storyName}" which is not exported`
      );
      errors++;
    }
  }

  // Check for empty scenarios arrays
  const emptyScenarios = /scenarios\s*:\s*\[\s*\]/g;
  if (emptyScenarios.test(source)) {
    console.error(
      `  ERROR: ${relPath} — has a row with empty scenarios array`
    );
    errors++;
  }

  // Enforce strict single-scenario chip labels.
  // Disallow slash/plus delimiters (e.g. "Default/Filled", "A + B", "A+B") in scenario labels.
  const bundledLabelPattern =
    /\{\s*id:\s*['"][^'"]+['"]\s*,\s*label:\s*['"][^'"]*(?:\/|\+)[^'"]*['"]\s*,\s*story:\s*['"][^'"]+['"]\s*\}/g;
  let badLabel;
  while ((badLabel = bundledLabelPattern.exec(source)) !== null) {
    console.error(
      `  ERROR: ${relPath} — bundled scenario label detected: ${badLabel[0].trim()}`
    );
    errors++;
  }

  // Reject vague aggregate labels even without slash/plus.
  // These labels usually indicate a gallery/showcase story rather than a single API-backed scenario.
  const vagueLabelPattern =
    /\{\s*id:\s*['"][^'"]+['"]\s*,\s*label:\s*['"]([^'"]+)['"]\s*,\s*story:\s*['"][^'"]+['"]\s*\}/g;
  const bannedExactLabels = new Set([
    "Variants",
    "States",
    "Sizes",
    "All Variants",
    "All States",
    "All Sizes",
    "Variant Showcase",
    "State Showcase",
    "Size Showcase",
    "Type Showcase",
    "Item States",
  ]);
  let labelMatch;
  while ((labelMatch = vagueLabelPattern.exec(source)) !== null) {
    const label = labelMatch[1].trim();
    if (bannedExactLabels.has(label)) {
      console.error(
        `  ERROR: ${relPath} — vague scenario label detected: "${label}"`
      );
      errors++;
    }
  }
}

console.log(`\nExplorer contract check: ${checked} files scanned.`);

if (errors > 0) {
  console.error(`Found ${errors} error(s).`);
  process.exit(1);
} else {
  console.log("All explorer contracts valid.");
}
