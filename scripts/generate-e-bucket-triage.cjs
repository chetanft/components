#!/usr/bin/env node
/**
 * E-Bucket Triage Script
 *
 * Classifies the ~293 E-bucket (review) stories into actionable subcategories:
 *
 *   E1 — Duplicate Args: args-only stories whose args are fully covered by
 *         an ExplorerBase scenario in the same file. Candidates for Docs prefix.
 *   E2 — Gallery/Composite: render-function stories with multiple primary
 *         component instances. Should be renamed to Docs*.
 *   E3 — Canonical: unique single-instance render or args stories not covered
 *         by explorer. Keep as-is.
 *
 * Output: docs/E_BUCKET_TRIAGE.md
 *
 * Usage: node scripts/generate-e-bucket-triage.cjs
 */
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "..");

const STORY_GLOBS = [
  "src/components/**/*.stories.tsx",
  "src/stories/*.stories.tsx",
];

function extractExplorerScenarios(source) {
  const scenarios = [];
  // Find explorer config
  const explorerMatch = source.match(/explorer\s*:\s*\{/);
  if (!explorerMatch) return scenarios;

  // Extract all story refs with their args
  const scenarioRe = /\{\s*id\s*:\s*['"]([^'"]+)['"]\s*,\s*label\s*:\s*['"]([^'"]+)['"].*?story\s*:\s*['"](\w+)['"](?:.*?args\s*:\s*(\{[^}]*\}))?/gs;
  let m;
  while ((m = scenarioRe.exec(source)) !== null) {
    scenarios.push({
      id: m[1],
      label: m[2],
      story: m[3],
      argsRaw: m[4] || null,
    });
  }
  return scenarios;
}

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
  // Extract args object from story
  const argsMatch = block.match(/args\s*:\s*\{([^}]*)\}/);
  if (!argsMatch) return null;
  // Normalize: remove whitespace, sort keys
  const raw = argsMatch[1].trim();
  return raw;
}

function getPrimaryComponent(source) {
  const metaMatch = source.match(/component\s*:\s*(\w+)/);
  return metaMatch ? metaMatch[1] : null;
}

function countPrimaryInstances(block, primaryComponent) {
  if (!primaryComponent) return 0;
  const re = new RegExp(`<${primaryComponent}(?![A-Za-z])`, "g");
  return (block.match(re) || []).length;
}

function isGalleryRender(block, primaryComponent) {
  // Check 1: Multiple direct primary component instances
  const primaryCount = countPrimaryInstances(block, primaryComponent);
  if (primaryCount > 1) return true;

  // Check 2: .map() rendering pattern (generates multiple instances dynamically)
  const hasMapRender = /\.map\s*\(\s*(?:\(|[a-zA-Z])/.test(block) &&
                       new RegExp(`<${primaryComponent || "[A-Z]\\w+"}`, "g").test(block);
  if (hasMapRender) return true;

  // Check 3: Multiple distinct JSX sections (grid/flex with labeled groups)
  // Pattern: labeled variant sections like <p>Label</p> followed by components
  const labeledSections = (block.match(/<p[\s>].*?<\/p>/g) || []).length;
  if (labeledSections >= 3) return true;

  // Check 4: High JSX tag density (many component tags in a single story)
  const allTags = (block.match(/<[A-Z]\w+/g) || []).length;
  if (allTags > 6) return true;

  return false;
}

function classifyEStory(name, source, block, explorerScenarios, primaryComponent) {
  const hasRender = /render\s*:\s*(?:\(|function)/.test(block) ||
                    /=\s*\(\s*\)\s*=>/.test(block) ||
                    /=\s*function/.test(block);
  const hasArgs = /args\s*:\s*\{/.test(block);

  // Check if it's args-only (no render function)
  const isArgsOnly = hasArgs && !hasRender;

  // Check if args duplicate an explorer scenario
  let isDuplicate = false;
  if (isArgsOnly) {
    const storyArgs = extractArgs(block);
    if (storyArgs) {
      // Normalize arg keys from this story
      const storyKeys = (storyArgs.match(/(\w+)\s*:/g) || []).map(k => k.replace(/\s*:/, ""));

      for (const scenario of explorerScenarios) {
        if (scenario.story === "ExplorerBase" && scenario.argsRaw) {
          const scenarioKeys = (scenario.argsRaw.match(/(\w+)\s*:/g) || []).map(k => k.replace(/\s*:/, ""));
          // If the story's primary arg keys overlap with a scenario's keys, it's a duplicate
          if (storyKeys.length > 0 && storyKeys.some(k => scenarioKeys.includes(k))) {
            isDuplicate = true;
            break;
          }
        }
      }
    }
  }

  // Check gallery: render-function with multiple instances/sections
  const isGallery = hasRender && isGalleryRender(block, primaryComponent);

  if (isDuplicate) return "E1"; // Duplicate args
  if (isGallery) return "E2";   // Gallery/composite
  return "E3"; // Canonical
}

function processFile(relPath) {
  const fullPath = path.join(ROOT, relPath);
  const source = fs.readFileSync(fullPath, "utf8");
  const explorerRefs = extractExplorerStoryRefs(source);
  const explorerScenarios = extractExplorerScenarios(source);
  const primaryComponent = getPrimaryComponent(source);

  // Find all exports
  const exportRe = /export\s+(?:const|function)\s+(\w+)/g;
  const allExports = [];
  let m;
  while ((m = exportRe.exec(source)) !== null) {
    if (m[1] !== "default") allExports.push(m[1]);
  }

  const results = [];
  for (const name of allExports) {
    // Skip non-E-bucket stories
    if (name === "ExplorerBase") continue;
    if (name === "Default") continue;
    if (/^Docs[A-Z]/.test(name)) continue;
    if (explorerRefs.has(name)) continue;

    const block = getExportBlock(source, name);
    if (!block) continue;

    const category = classifyEStory(name, source, block, explorerScenarios, primaryComponent);
    results.push({ name, category });
  }

  return { file: relPath, stories: results, primaryComponent };
}

function main() {
  const files = [];
  for (const g of STORY_GLOBS) {
    files.push(...glob.sync(g, { cwd: ROOT }));
  }

  const e1 = []; // Duplicate args
  const e2 = []; // Gallery/composite
  const e3 = []; // Canonical

  for (const f of files.sort()) {
    const result = processFile(f);
    for (const s of result.stories) {
      const entry = { file: result.file, name: s.name, component: result.primaryComponent };
      if (s.category === "E1") e1.push(entry);
      else if (s.category === "E2") e2.push(entry);
      else e3.push(entry);
    }
  }

  const total = e1.length + e2.length + e3.length;

  // Generate markdown report
  const lines = [];
  lines.push("# E-Bucket Triage Report");
  lines.push("");
  lines.push(`> Auto-generated by \`scripts/generate-e-bucket-triage.cjs\``);
  lines.push(`> Generated: ${new Date().toISOString().split("T")[0]}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`| Category | Count | Action |`);
  lines.push(`| --- | --- | --- |`);
  lines.push(`| E1 - Duplicate Args | ${e1.length} | Rename to \`Docs*\` or remove |`);
  lines.push(`| E2 - Gallery/Composite | ${e2.length} | Rename to \`Docs*\` |`);
  lines.push(`| E3 - Canonical | ${e3.length} | Keep as-is |`);
  lines.push(`| **Total** | **${total}** | |`);
  lines.push("");

  // E1: Duplicate args
  lines.push("## E1 - Duplicate Args (candidates for Docs prefix or removal)");
  lines.push("");
  lines.push("These stories have args-only definitions that overlap with ExplorerBase scenarios.");
  lines.push("");
  if (e1.length === 0) {
    lines.push("_None found._");
  } else {
    lines.push("| File | Story | Component |");
    lines.push("| --- | --- | --- |");
    for (const s of e1) {
      lines.push(`| \`${s.file}\` | \`${s.name}\` | ${s.component || "?"} |`);
    }
  }
  lines.push("");

  // E2: Gallery
  lines.push("## E2 - Gallery/Composite (rename to Docs prefix)");
  lines.push("");
  lines.push("Render-function stories with multiple primary component instances.");
  lines.push("");
  if (e2.length === 0) {
    lines.push("_None found._");
  } else {
    lines.push("| File | Story | Component |");
    lines.push("| --- | --- | --- |");
    for (const s of e2) {
      lines.push(`| \`${s.file}\` | \`${s.name}\` | ${s.component || "?"} |`);
    }
  }
  lines.push("");

  // E3: Canonical
  lines.push("## E3 - Canonical (keep as-is)");
  lines.push("");
  lines.push("Unique stories providing value not covered by explorer scenarios.");
  lines.push("");
  if (e3.length === 0) {
    lines.push("_None found._");
  } else {
    // Group by file
    const byFile = {};
    for (const s of e3) {
      if (!byFile[s.file]) byFile[s.file] = [];
      byFile[s.file].push(s);
    }
    lines.push("| File | Stories | Component |");
    lines.push("| --- | --- | --- |");
    for (const [file, stories] of Object.entries(byFile)) {
      const names = stories.map(s => `\`${s.name}\``).join(", ");
      lines.push(`| \`${file}\` | ${names} | ${stories[0].component || "?"} |`);
    }
  }
  lines.push("");

  const output = lines.join("\n") + "\n";
  const outPath = path.join(ROOT, "docs/E_BUCKET_TRIAGE.md");
  fs.writeFileSync(outPath, output, "utf8");
  console.log(`Written to docs/E_BUCKET_TRIAGE.md`);
  console.log(`  E1 (duplicate args): ${e1.length}`);
  console.log(`  E2 (gallery): ${e2.length}`);
  console.log(`  E3 (canonical): ${e3.length}`);
  console.log(`  Total: ${total}`);
}

main();
