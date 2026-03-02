#!/usr/bin/env node
/**
 * Codemod: Rename E1 and E2 stories to Docs* prefix
 *
 * E1 = Duplicate args stories (args overlap with ExplorerBase scenarios)
 * E2 = Gallery/composite stories (render multiple primary component instances)
 *
 * These are not truly canonical — they duplicate explorer coverage or are
 * multi-instance galleries. Renaming to Docs* prefix moves them to the
 * docs-only section and keeps the canonical list clean.
 *
 * Usage: node scripts/codemods/rename-e-bucket-to-docs.cjs [--dry-run]
 */
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "../..");
const DRY_RUN = process.argv.includes("--dry-run");

const STORY_GLOBS = [
  "src/components/**/*.stories.tsx",
  "src/stories/*.stories.tsx",
];

function extractExplorerStoryRefs(source) {
  const refs = new Set();
  const explorerMatch = source.match(/explorer\s*:\s*\{/);
  if (!explorerMatch) return refs;
  const storyRefRe = /story\s*:\s*['"](\w+)['"]/g;
  let m;
  while ((m = storyRefRe.exec(source)) !== null) {
    refs.add(m[1]);
  }
  const baseM = source.match(/baseStory\s*:\s*['"](\w+)['"]/);
  if (baseM) refs.add(baseM[1]);
  return refs;
}

function extractExplorerScenarios(source) {
  const scenarios = [];
  const explorerMatch = source.match(/explorer\s*:\s*\{/);
  if (!explorerMatch) return scenarios;
  const scenarioRe = /\{\s*id\s*:\s*['"]([^'"]+)['"]\s*,\s*label\s*:\s*['"]([^'"]+)['"].*?story\s*:\s*['"](\w+)['"](?:.*?args\s*:\s*(\{[^}]*\}))?/gs;
  let m;
  while ((m = scenarioRe.exec(source)) !== null) {
    scenarios.push({ id: m[1], story: m[3], argsRaw: m[4] || null });
  }
  return scenarios;
}

function getPrimaryComponent(source) {
  const metaMatch = source.match(/component\s*:\s*(\w+)/);
  return metaMatch ? metaMatch[1] : null;
}

function getExportBlock(source, exportName) {
  const exportRe = new RegExp(`export\\s+(?:const|function)\\s+${exportName}\\b`);
  const match = exportRe.exec(source);
  if (!match) return null;
  const blockStart = match.index;
  const nextExport = source.slice(blockStart + 1).search(/\nexport\s+(const|function|default)/);
  const blockEnd = nextExport === -1 ? source.length : blockStart + 1 + nextExport;
  return source.slice(blockStart, blockEnd);
}

function extractArgs(block) {
  const argsMatch = block.match(/args\s*:\s*\{([^}]*)\}/);
  return argsMatch ? argsMatch[1].trim() : null;
}

function countPrimaryInstances(block, primaryComponent) {
  if (!primaryComponent) return 0;
  const re = new RegExp(`<${primaryComponent}(?![A-Za-z])`, "g");
  return (block.match(re) || []).length;
}

function isGalleryRender(block, primaryComponent) {
  if (countPrimaryInstances(block, primaryComponent) > 1) return true;
  const hasMapRender = /\.map\s*\(\s*(?:\(|[a-zA-Z])/.test(block) &&
    new RegExp(`<${primaryComponent || "[A-Z]\\w+"}`, "g").test(block);
  if (hasMapRender) return true;
  const labeledSections = (block.match(/<p[\s>].*?<\/p>/g) || []).length;
  if (labeledSections >= 3) return true;
  const allTags = (block.match(/<[A-Z]\w+/g) || []).length;
  if (allTags > 6) return true;
  return false;
}

function classifyAsE1orE2(name, block, explorerScenarios, primaryComponent) {
  const hasRender = /render\s*:\s*(?:\(|function)/.test(block);
  const hasArgs = /args\s*:\s*\{/.test(block);
  const isArgsOnly = hasArgs && !hasRender;

  // E1: duplicate args
  if (isArgsOnly) {
    const storyArgs = extractArgs(block);
    if (storyArgs) {
      const storyKeys = (storyArgs.match(/(\w+)\s*:/g) || []).map(k => k.replace(/\s*:/, ""));
      for (const scenario of explorerScenarios) {
        if (scenario.story === "ExplorerBase" && scenario.argsRaw) {
          const scenarioKeys = (scenario.argsRaw.match(/(\w+)\s*:/g) || []).map(k => k.replace(/\s*:/, ""));
          if (storyKeys.length > 0 && storyKeys.some(k => scenarioKeys.includes(k))) {
            return "E1";
          }
        }
      }
    }
  }

  // E2: gallery render
  if (hasRender && isGalleryRender(block, primaryComponent)) {
    return "E2";
  }

  return null; // Not E1 or E2
}

function renameExport(source, oldName, newName) {
  let result = source;
  result = result.replace(
    new RegExp(`(export\\s+const\\s+)${oldName}(\\s*[:=])`, "g"),
    `$1${newName}$2`
  );
  result = result.replace(
    new RegExp(`(export\\s+function\\s+)${oldName}(\\s*\\()`, "g"),
    `$1${newName}$2`
  );
  // Rename property accessors
  for (const prop of ["storyName", "parameters", "args", "decorators", "play"]) {
    result = result.replace(
      new RegExp(`${oldName}\\.${prop}`, "g"),
      `${newName}.${prop}`
    );
  }
  return result;
}

function processFile(relPath) {
  const fullPath = path.join(ROOT, relPath);
  const source = fs.readFileSync(fullPath, "utf8");
  const explorerRefs = extractExplorerStoryRefs(source);
  const explorerScenarios = extractExplorerScenarios(source);
  const primaryComponent = getPrimaryComponent(source);

  const exportRe = /export\s+(?:const|function)\s+(\w+)/g;
  const allExports = [];
  let m;
  while ((m = exportRe.exec(source)) !== null) {
    if (m[1] !== "default") allExports.push(m[1]);
  }

  const renames = [];
  for (const name of allExports) {
    if (name === "ExplorerBase") continue;
    if (name === "Default") continue;
    if (/^Docs[A-Z]/.test(name)) continue;
    if (explorerRefs.has(name)) continue;

    const block = getExportBlock(source, name);
    if (!block) continue;

    const category = classifyAsE1orE2(name, block, explorerScenarios, primaryComponent);
    if (category) {
      renames.push({ old: name, new: `Docs${name}`, category });
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
  const files = [];
  for (const g of STORY_GLOBS) {
    files.push(...glob.sync(g, { cwd: ROOT }));
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
        console.log(`    [${r.category}] ${r.old} -> ${r.new}`);
      }
    }
  }

  console.log(`\nTotal: ${totalRenames} renames across ${results.length} files`);
  if (DRY_RUN) {
    console.log("(dry run - no files modified)");
  }
}

main();
