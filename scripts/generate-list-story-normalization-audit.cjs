#!/usr/bin/env node
/**
 * List Story Normalization Audit
 *
 * Scans every story file, extracts exports, cross-references with explorer
 * config, and classifies each story into action buckets:
 *
 *   A: Canonical (explorer-backed or single-scenario canonical)
 *   B: Docs-only rename needed (aggregate without Docs prefix)
 *   C: Docs-only keep (already Docs-prefixed or marked docsOnly)
 *   D: Split needed (aggregate story that hides canonical coverage)
 *   E: Legacy/duplicate candidate (duplicates explorer coverage)
 *   F: Internal (ExplorerBase — should be hidden from list)
 */
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "docs/LIST_STORY_NORMALIZATION_AUDIT.md");

const STORY_GLOBS = [
  "src/components/**/*.stories.tsx",
  "src/stories/*.stories.tsx",
];

// ─── Parsing helpers (shared with other audit scripts) ──────────────────────

function findMatching(source, start, openChar, closeChar) {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    if (escaped) { escaped = false; continue; }
    if (ch === "\\") { escaped = true; continue; }
    if (!inDouble && !inTemplate && ch === "'") { inSingle = !inSingle; continue; }
    if (!inSingle && !inTemplate && ch === '"') { inDouble = !inDouble; continue; }
    if (!inSingle && !inDouble && ch === "`") { inTemplate = !inTemplate; continue; }
    if (inSingle || inDouble || inTemplate) continue;
    if (ch === openChar) depth++;
    if (ch === closeChar) { depth--; if (depth === 0) return i; }
  }
  return -1;
}

function extractBlock(source, key, openChar, closeChar) {
  const keyIdx = source.indexOf(key);
  if (keyIdx === -1) return null;
  const openIdx = source.indexOf(openChar, keyIdx);
  if (openIdx === -1) return null;
  const endIdx = findMatching(source, openIdx, openChar, closeChar);
  if (endIdx === -1) return null;
  return { body: source.slice(openIdx, endIdx + 1), inner: source.slice(openIdx + 1, endIdx) };
}

function extractTitle(source) {
  const m = source.match(/\btitle\s*:\s*['"]([^'"]+)['"]/);
  return m ? m[1] : null;
}

function componentNameFromTitle(title, relPath) {
  if (title) {
    const last = title.split("/").pop();
    if (last) return last;
  }
  return path.basename(relPath).replace(/\.stories\.tsx$/, "");
}

function extractExports(source) {
  // Extract primary component from meta for aggregate detection
  const metaComponentMatch = source.match(/component\s*:\s*(\w+)/);
  const primaryComponent = metaComponentMatch ? metaComponentMatch[1] : null;

  const exports = new Map();
  // const-style stories
  const exportConstRe = /export\s+const\s+(\w+)\s*[:=]/g;
  let m;
  while ((m = exportConstRe.exec(source)) !== null) {
    const name = m[1];
    // Find the block end (next export or EOF)
    const blockStart = m.index;
    const nextExport = source.slice(blockStart + 1).search(/\nexport\s+(const|function|default)/);
    const blockEnd = nextExport === -1 ? source.length : blockStart + 1 + nextExport;
    const block = source.slice(blockStart, blockEnd);

    const hasRender = /render\s*[:]\s*[\w(]/.test(block);
    const hasArgs = /\bargs\s*:/.test(block);
    const isFunction = /=\s*\(/.test(block.slice(0, 80)) || /=\s*function/.test(block.slice(0, 80));

    // Detect aggregate: multiple PRIMARY component instances in render
    // This avoids false positives from compound components (e.g. Alert with AlertIcon+AlertTitle)
    let isAggregate = false;
    if (primaryComponent) {
      const primaryRe = new RegExp(`<${primaryComponent}(?![A-Za-z])`, "g");
      const primaryInstances = block.match(primaryRe) || [];
      isAggregate = primaryInstances.length > 1;
    } else {
      // No primary component (e.g. utility stories) — fall back to tag count
      const componentTags = block.match(/<[A-Z]\w+/g) || [];
      isAggregate = componentTags.length > 3;
    }

    exports.set(name, { hasRender, hasArgs, isFunction: isFunction && !hasArgs, isAggregate, block });
  }
  // function-style stories
  const exportFnRe = /export\s+function\s+(\w+)\s*\(/g;
  while ((m = exportFnRe.exec(source)) !== null) {
    if (exports.has(m[1])) continue;
    const blockStart = m.index;
    const nextExport = source.slice(blockStart + 1).search(/\nexport\s+(const|function|default)/);
    const blockEnd = nextExport === -1 ? source.length : blockStart + 1 + nextExport;
    const block = source.slice(blockStart, blockEnd);
    let fnAggregate = false;
    if (primaryComponent) {
      const primaryRe = new RegExp(`<${primaryComponent}(?![A-Za-z])`, "g");
      fnAggregate = (block.match(primaryRe) || []).length > 1;
    } else {
      fnAggregate = (block.match(/<[A-Z]\w+/g) || []).length > 3;
    }
    exports.set(m[1], { hasRender: false, hasArgs: false, isFunction: true, isAggregate: fnAggregate, block });
  }
  return exports;
}

function extractExplorerScenarioStories(source) {
  const stories = new Set();
  const block = extractBlock(source, "explorer", "{", "}");
  if (!block) return stories;

  // Find all story references in scenarios
  const storyRe = /story\s*:\s*['"](\w+)['"]/g;
  let m;
  while ((m = storyRe.exec(block.inner)) !== null) {
    stories.add(m[1]);
  }

  // Also extract baseStory
  const baseM = block.inner.match(/baseStory\s*:\s*['"](\w+)['"]/);
  if (baseM) stories.add(baseM[1]);

  return stories;
}

function isDocsOnly(source, exportName) {
  // Check Docs prefix
  if (/^Docs[A-Z]/.test(exportName)) return true;
  // Check docsOnly parameter (look in the export block for this specific story)
  const re = new RegExp(`export\\s+const\\s+${exportName}[\\s\\S]*?docsOnly\\s*:\\s*true`);
  return re.test(source);
}

function hasExplorerConfig(source) {
  return /explorer\s*:\s*\{/.test(source) && /rows\s*:\s*\[/.test(source);
}

// ─── Classification ─────────────────────────────────────────────────────────

const AGGREGATE_NAMES = new Set([
  "Variants", "States", "Sizes", "AllVariants", "AllTypes", "AllSizes",
  "AllStates", "UsageExamples", "AllIcons", "AllLogos", "GraphicVariants",
  "FooterVariants", "ThemeComparison", "VariantShowcase", "TypeShowcase",
]);

const DOCS_AGGREGATE_RE = /^(Variants|States|Sizes|All\w+|Usage\w+|Theme\w+|Showcase\w+|Gallery|Comparison|Demo|InteractiveDemo|Dashboard|Journey|Overview)$/;
const FIGMA_RE = /^Figma[A-Z]/;
const INTERNAL_RE = /^ExplorerBase$/;

function classify(exportName, exportInfo, explorerStories, hasExplorer, source) {
  // F: Internal
  if (INTERNAL_RE.test(exportName)) {
    return { bucket: "F", reason: "ExplorerBase (internal, hide from list)" };
  }

  // C: Already docs-only (Docs prefix or docsOnly flag)
  if (isDocsOnly(source, exportName)) {
    return { bucket: "C", reason: "Already Docs-prefixed or docsOnly marked" };
  }

  // Check if referenced by explorer
  const explorerReferenced = explorerStories.has(exportName);

  // A: Canonical — referenced by explorer OR is Default
  if (explorerReferenced || exportName === "Default") {
    return { bucket: "A", reason: explorerReferenced ? "Explorer-backed canonical" : "Default story (canonical)" };
  }

  // B: Aggregate name that needs Docs prefix
  if (DOCS_AGGREGATE_RE.test(exportName) || AGGREGATE_NAMES.has(exportName)) {
    return { bucket: "B", reason: `Aggregate name "${exportName}" needs Docs prefix` };
  }

  // Figma-prefixed stories — docs-only
  if (FIGMA_RE.test(exportName)) {
    return { bucket: "B", reason: `Figma reference story — rename to Docs prefix` };
  }

  // If aggregate content detected (multi-instance render) AND not in explorer
  // For components with explorer, aggregate detection needs manual review since
  // compound components (e.g. Alert with AlertIcon/AlertTitle) trigger false positives
  if (exportInfo.isAggregate && !hasExplorer) {
    return { bucket: "B", reason: "Aggregate render (multiple instances) — needs Docs prefix" };
  }
  if (exportInfo.isAggregate && hasExplorer) {
    return { bucket: "E", reason: "Possible aggregate render — review (may be compound component)" };
  }

  // If component has explorer and this story is NOT referenced by it
  if (hasExplorer && !explorerReferenced) {
    // Single-scenario story not in explorer — could be canonical or docs
    // Args-only stories may duplicate explorer (which uses ExplorerBase + args)
    if (exportInfo.hasArgs && !exportInfo.hasRender && !exportInfo.isFunction) {
      return { bucket: "E", reason: "Args-only story not in explorer — may duplicate explorer coverage" };
    }
    // Render/function stories that are NOT aggregate are likely canonical
    // (they use render for compound component syntax, not for multi-instance demos)
    // Only flag as E for review, not B for rename
    return { bucket: "E", reason: "Story not referenced by explorer — review for duplication" };
  }

  // No explorer config — classify by naming/content
  if (exportInfo.isFunction && exportInfo.isAggregate) {
    return { bucket: "D", reason: "Aggregate function story — split into canonical + Docs demo" };
  }

  // Default: treat as canonical (single-scenario, no explorer yet)
  return { bucket: "A", reason: "Single-scenario story (canonical)" };
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const allFiles = [];
  for (const g of STORY_GLOBS) {
    allFiles.push(...glob.sync(g, { cwd: ROOT }));
  }

  const components = [];
  const bucketCounts = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
  let totalStories = 0;

  for (const relPath of allFiles.sort()) {
    const fullPath = path.join(ROOT, relPath);
    const source = fs.readFileSync(fullPath, "utf8");
    const title = extractTitle(source);
    const name = componentNameFromTitle(title, relPath);
    const exports = extractExports(source);
    const explorerStories = extractExplorerScenarioStories(source);
    const hasExplorer = hasExplorerConfig(source);

    const classified = [];
    for (const [exportName, info] of exports) {
      const result = classify(exportName, info, explorerStories, hasExplorer, source);
      classified.push({ name: exportName, ...result, isAggregate: info.isAggregate });
      bucketCounts[result.bucket]++;
      totalStories++;
    }

    // Only include components with non-A, non-F stories (i.e. components needing action)
    const needsAction = classified.some((c) => c.bucket !== "A" && c.bucket !== "F");

    components.push({
      name,
      title: title || name,
      relPath,
      hasExplorer,
      classified,
      needsAction,
    });
  }

  // ─── Generate report ─────────────────────────────────────────────────────

  const lines = [];
  lines.push("# List Story Normalization Audit");
  lines.push("");
  lines.push(`> Generated ${new Date().toISOString().slice(0, 10)}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`| Metric | Count |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Total story files | ${allFiles.length} |`);
  lines.push(`| Total story exports | ${totalStories} |`);
  lines.push(`| A: Canonical (ok) | ${bucketCounts.A} |`);
  lines.push(`| B: Needs Docs rename | ${bucketCounts.B} |`);
  lines.push(`| C: Already Docs (ok) | ${bucketCounts.C} |`);
  lines.push(`| D: Needs split | ${bucketCounts.D} |`);
  lines.push(`| E: Duplicate candidate | ${bucketCounts.E} |`);
  lines.push(`| F: Internal (hide) | ${bucketCounts.F} |`);
  lines.push("");
  lines.push("## Bucket Legend");
  lines.push("");
  lines.push("- **A**: Canonical — explorer-backed or single-scenario. No action needed.");
  lines.push("- **B**: Docs-only rename needed — aggregate/demo story without `Docs` prefix. Rename to `Docs*`.");
  lines.push("- **C**: Already docs-only — has `Docs` prefix or `docsOnly: true`. No rename needed.");
  lines.push("- **D**: Split needed — aggregate story hiding canonical coverage. Split into canonical + docs gallery.");
  lines.push("- **E**: Duplicate candidate — story not in explorer, may duplicate explorer coverage. Review.");
  lines.push("- **F**: Internal — `ExplorerBase`. Should be hidden from list view.");
  lines.push("");

  // ─── Action board: components needing work ───────────────────────────────

  const actionComponents = components.filter((c) => c.needsAction);

  lines.push("## Action Board");
  lines.push("");
  lines.push(`${actionComponents.length} components need attention out of ${components.length} total.`);
  lines.push("");

  // Priority sort: most B+D+E stories first
  actionComponents.sort((a, b) => {
    const scoreA = a.classified.filter((c) => "BDE".includes(c.bucket)).length;
    const scoreB = b.classified.filter((c) => "BDE".includes(c.bucket)).length;
    return scoreB - scoreA;
  });

  for (const comp of actionComponents) {
    const actionStories = comp.classified.filter((c) => c.bucket !== "A");
    const canonicalStories = comp.classified.filter((c) => c.bucket === "A");

    lines.push(`### ${comp.title}`);
    lines.push(`\`${comp.relPath}\` | Explorer: ${comp.hasExplorer ? "Yes" : "No"}`);
    lines.push("");

    lines.push("| Story | Bucket | Action |");
    lines.push("|-------|--------|--------|");

    for (const s of actionStories) {
      const bucketLabel = { B: "Rename", C: "OK", D: "Split", E: "Review", F: "Hide" }[s.bucket];
      lines.push(`| \`${s.name}\` | **${s.bucket}**: ${bucketLabel} | ${s.reason} |`);
    }

    if (canonicalStories.length > 0) {
      lines.push(`| *${canonicalStories.length} canonical stories* | **A**: OK | — |`);
    }

    lines.push("");
  }

  // ─── Quick-action summary: top rename targets ────────────────────────────

  lines.push("## Quick-Action: Rename to Docs* (Bucket B)");
  lines.push("");
  lines.push("These stories need `Docs` prefix added:");
  lines.push("");

  const renameTargets = [];
  for (const comp of components) {
    for (const s of comp.classified) {
      if (s.bucket === "B") {
        renameTargets.push({ component: comp.name, story: s.name, path: comp.relPath, reason: s.reason });
      }
    }
  }

  if (renameTargets.length === 0) {
    lines.push("None found.");
  } else {
    lines.push("| Component | Story | Rename To | File |");
    lines.push("|-----------|-------|-----------|------|");
    for (const t of renameTargets) {
      const newName = t.story.startsWith("Figma") ? `Docs${t.story}` : `Docs${t.story}`;
      lines.push(`| ${t.component} | \`${t.story}\` | \`${newName}\` | \`${t.path}\` |`);
    }
  }
  lines.push("");

  // ─── Quick-action summary: duplicate review targets ──────────────────────

  lines.push("## Review: Duplicate Candidates (Bucket E)");
  lines.push("");

  const dupeTargets = [];
  for (const comp of components) {
    for (const s of comp.classified) {
      if (s.bucket === "E") {
        dupeTargets.push({ component: comp.name, story: s.name, path: comp.relPath, reason: s.reason });
      }
    }
  }

  if (dupeTargets.length === 0) {
    lines.push("None found.");
  } else {
    lines.push("| Component | Story | Reason | File |");
    lines.push("|-----------|-------|--------|------|");
    for (const t of dupeTargets) {
      lines.push(`| ${t.component} | \`${t.story}\` | ${t.reason} | \`${t.path}\` |`);
    }
  }
  lines.push("");

  // ─── Internal stories to hide ────────────────────────────────────────────

  lines.push("## Internal: Hide from List View (Bucket F)");
  lines.push("");

  const hideTargets = [];
  for (const comp of components) {
    for (const s of comp.classified) {
      if (s.bucket === "F") {
        hideTargets.push({ component: comp.name, path: comp.relPath });
      }
    }
  }

  lines.push(hideTargets.length + " ExplorerBase exports found across components.");
  lines.push("These should be filtered from the list view in examples-section.tsx.");


  lines.push("");

  // ─── Write output ────────────────────────────────────────────────────────

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, lines.join("\n"), "utf8");
  console.log(`Written: ${path.relative(ROOT, OUT_PATH)}`);
  console.log(`\nSummary: A=${bucketCounts.A} B=${bucketCounts.B} C=${bucketCounts.C} D=${bucketCounts.D} E=${bucketCounts.E} F=${bucketCounts.F}`);
}

main();
