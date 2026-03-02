#!/usr/bin/env node
/**
 * Codemod: Rename list-only aggregate/demo stories to Docs* prefix
 *
 * Targets stories classified as Bucket B in the normalization audit.
 * Rules:
 *   1. Only renames exports NOT referenced by explorer scenarios
 *   2. Only renames exports that are aggregate (multi-instance) or match known demo patterns
 *   3. Updates both the export name and any internal references (e.g. story: 'OldName')
 *   4. Skips stories already prefixed with Docs
 *   5. Skips ExplorerBase, Default, and explorer-referenced stories
 *
 * Usage: node scripts/codemods/rename-list-stories-to-docs.cjs [--dry-run] [--file path]
 */
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "../..");
const DRY_RUN = process.argv.includes("--dry-run");
const SINGLE_FILE = process.argv.find((a, i) => process.argv[i - 1] === "--file");

const STORY_GLOBS = [
  "src/components/**/*.stories.tsx",
  "src/stories/*.stories.tsx",
];

// Names that are clearly aggregate/demo and should get Docs prefix
const AGGREGATE_NAMES = new Set([
  "Variants", "States", "Sizes", "AllVariants", "AllTypes", "AllSizes",
  "AllStates", "UsageExamples", "AllIcons", "AllLogos", "GraphicVariants",
  "FooterVariants", "ThemeComparison", "VariantShowcase", "TypeShowcase",
  "AllVariations", "Overview", "Dashboard", "Journey", "InteractiveDemo",
  "Comparison", "Demo", "Gallery", "Showcase",
]);

const AGGREGATE_NAME_RE = /^(Variants|States|Sizes|All\w+|Usage\w+|Theme\w+|Showcase\w+|Gallery|Comparison|Demo|InteractiveDemo|Dashboard|Journey|Overview|CustomSlots)$/;
const FIGMA_RE = /^Figma[A-Z]/;

function extractExplorerStoryRefs(source) {
  const refs = new Set();
  // Find explorer config block
  const explorerMatch = source.match(/explorer\s*:\s*\{/);
  if (!explorerMatch) return refs;

  // Extract all story: 'Name' references within explorer config
  const storyRefRe = /story\s*:\s*['"](\w+)['"]/g;
  let m;
  while ((m = storyRefRe.exec(source)) !== null) {
    refs.add(m[1]);
  }

  // baseStory
  const baseM = source.match(/baseStory\s*:\s*['"](\w+)['"]/);
  if (baseM) refs.add(baseM[1]);

  return refs;
}

function isAggregate(source, exportName) {
  // Extract primary component from meta
  const metaComponentMatch = source.match(/component\s*:\s*(\w+)/);
  const primaryComponent = metaComponentMatch ? metaComponentMatch[1] : null;

  // Find the export block
  const exportRe = new RegExp(`export\\s+(?:const|function)\\s+${exportName}\\b`);
  const match = exportRe.exec(source);
  if (!match) return false;

  const blockStart = match.index;
  const nextExport = source.slice(blockStart + 1).search(/\nexport\s+(const|function|default)/);
  const blockEnd = nextExport === -1 ? source.length : blockStart + 1 + nextExport;
  const block = source.slice(blockStart, blockEnd);

  // Count instances of the PRIMARY component (not subcomponents/children)
  // This distinguishes "one Alert with AlertIcon+AlertTitle" from "three Alerts side by side"
  if (primaryComponent) {
    // Match <Component but not <ComponentSub (e.g. <Alert but not <AlertIcon)
    const primaryRe = new RegExp(`<${primaryComponent}(?![A-Za-z])`, "g");
    const primaryInstances = block.match(primaryRe) || [];
    return primaryInstances.length > 1;
  }

  // Fallback: if no primary component found, count JSX component tags
  const componentTags = block.match(/<[A-Z]\w+/g) || [];
  // More than 3 JSX component tags = likely multi-instance or complex demo
  return componentTags.length > 3;
}

function shouldRename(exportName, source, explorerRefs) {
  // Never rename these
  if (exportName === "ExplorerBase") return false;
  if (exportName === "Default") return false;
  if (/^Docs[A-Z]/.test(exportName)) return false; // Already prefixed

  // Never rename explorer-referenced stories
  if (explorerRefs.has(exportName)) return false;

  // Rename if matches known aggregate pattern
  if (AGGREGATE_NAME_RE.test(exportName)) return true;
  if (AGGREGATE_NAMES.has(exportName)) return true;
  if (FIGMA_RE.test(exportName)) return true;

  // Rename if aggregate content (multi-instance render)
  if (isAggregate(source, exportName)) return true;

  return false;
}

function renameExport(source, oldName, newName) {
  let result = source;

  // Rename export declaration: export const OldName or export function OldName
  result = result.replace(
    new RegExp(`(export\\s+const\\s+)${oldName}(\\s*[:=])`, "g"),
    `$1${newName}$2`
  );
  result = result.replace(
    new RegExp(`(export\\s+function\\s+)${oldName}(\\s*\\()`, "g"),
    `$1${newName}$2`
  );

  // Rename story name property if present: OldName.storyName = or .story = { name:
  result = result.replace(
    new RegExp(`${oldName}\\.storyName`, "g"),
    `${newName}.storyName`
  );
  result = result.replace(
    new RegExp(`${oldName}\\.parameters`, "g"),
    `${newName}.parameters`
  );
  result = result.replace(
    new RegExp(`${oldName}\\.args`, "g"),
    `${newName}.args`
  );
  result = result.replace(
    new RegExp(`${oldName}\\.decorators`, "g"),
    `${newName}.decorators`
  );
  result = result.replace(
    new RegExp(`${oldName}\\.play`, "g"),
    `${newName}.play`
  );

  return result;
}

function processFile(relPath) {
  const fullPath = path.join(ROOT, relPath);
  const source = fs.readFileSync(fullPath, "utf8");
  const explorerRefs = extractExplorerStoryRefs(source);

  // Find all exports
  const exportRe = /export\s+(?:const|function)\s+(\w+)/g;
  const exports = [];
  let m;
  while ((m = exportRe.exec(source)) !== null) {
    if (m[1] !== "default") exports.push(m[1]);
  }

  const renames = [];
  for (const name of exports) {
    if (shouldRename(name, source, explorerRefs)) {
      const newName = name.startsWith("Figma") ? `Docs${name}` : `Docs${name}`;
      renames.push({ old: name, new: newName });
    }
  }

  if (renames.length === 0) return { file: relPath, renames: [] };

  let updated = source;
  for (const r of renames) {
    updated = renameExport(updated, r.old, r.new);
  }

  if (!DRY_RUN) {
    fs.writeFileSync(fullPath, updated, "utf8");
  }

  return { file: relPath, renames };
}

function main() {
  let files = [];
  if (SINGLE_FILE) {
    files = [SINGLE_FILE];
  } else {
    for (const g of STORY_GLOBS) {
      files.push(...glob.sync(g, { cwd: ROOT }));
    }
  }

  console.log(`${DRY_RUN ? "[DRY RUN] " : ""}Processing ${files.length} files...\n`);

  let totalRenames = 0;
  const results = [];

  for (const f of files.sort()) {
    const result = processFile(f);
    if (result.renames.length > 0) {
      results.push(result);
      totalRenames += result.renames.length;
      console.log(`  ${result.file}: ${result.renames.length} renames`);
      for (const r of result.renames) {
        console.log(`    ${r.old} -> ${r.new}`);
      }
    }
  }

  console.log(`\nTotal: ${totalRenames} renames across ${results.length} files`);
  if (DRY_RUN) {
    console.log("(dry run — no files modified)");
  }
}

main();
