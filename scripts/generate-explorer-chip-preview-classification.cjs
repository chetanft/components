#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "docs/EXPLORER_CHIP_PREVIEW_CLASSIFICATION.md");
const STORY_GLOBS = ["src/components/**/*.stories.tsx", "src/stories/*.stories.tsx"];

// ---------------------------------------------------------------------------
// Compound single-variant allowlist (mirrored from generate-explorer-aggregate-chip-audit.cjs)
// Key format: "title::storyExportName"
// ---------------------------------------------------------------------------
const COMPOUND_ALLOWLIST = new Set([
  'Molecules/Breadcrumb::WithIcons',
  'Molecules/Breadcrumb::CustomSeparator',
  'Molecules/Calendar::EventCalendar',
  'Organisms/DataEntryTable::WithSelection',
  'Organisms/DataEntryTable::WithActions',
  'Organisms/Footer::ThreeButtons',
  'Organisms/Footer::FourButtons',
  'Organisms/Footer::WithLeftSide',
  'Organisms/Form::HorizontalLayout',
  'Organisms/Form::Default',
  'Organisms/Form::WithValidation',
  'Molecules/Mentions::CustomPrefix',
  'Molecules/Mentions::WithRichContent',
  'Molecules/ToggleGroup::Multiple',
  'Molecules/ToggleGroup::Outline',
  'Components/UploadZone::DifferentFileTypes',
]);

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
    if (ch === closeChar) {
      depth--;
      if (depth === 0) return i;
    }
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
  const exports = new Map();
  const exportConstRe = /export\s+const\s+(\w+)\s*[:=][\s\S]*?(?=(?:\nexport\s+const|\nexport\s+function|\nexport\s+default|$))/g;
  let m;
  while ((m = exportConstRe.exec(source)) !== null) {
    const name = m[1];
    const block = m[0];
    const hasRender = /render\s*:\s*\(/.test(block) || /render\s*:\s*[\w(]/.test(block);
    const hasArgs = /\bargs\s*:/.test(block);
    let kind = "unknown";
    if (hasRender && hasArgs) kind = "render+args";
    else if (hasRender) kind = "render";
    else if (hasArgs) kind = "args";
    exports.set(name, { kind, hasArgs, block });
  }
  const exportFnRe = /export\s+function\s+(\w+)\s*\(/g;
  while ((m = exportFnRe.exec(source)) !== null) {
    if (!exports.has(m[1])) exports.set(m[1], { kind: "function", hasArgs: false, block: "" });
  }
  return exports;
}

function parseRows(explorerInner) {
  const rowsStart = explorerInner.indexOf("rows");
  if (rowsStart === -1) return [];
  const arrStart = explorerInner.indexOf("[", rowsStart);
  if (arrStart === -1) return [];
  const arrEnd = findMatching(explorerInner, arrStart, "[", "]");
  if (arrEnd === -1) return [];
  const rowsInner = explorerInner.slice(arrStart + 1, arrEnd);

  const rows = [];
  for (let i = 0; i < rowsInner.length; i++) {
    if (rowsInner[i] !== "{") continue;
    const rowEnd = findMatching(rowsInner, i, "{", "}");
    if (rowEnd === -1) break;
    const rowBlock = rowsInner.slice(i, rowEnd + 1);
    const rowId = (rowBlock.match(/\bid\s*:\s*['"]([^'"]+)['"]/) || [])[1] || "";
    const rowLabel = (rowBlock.match(/\blabel\s*:\s*['"]([^'"]+)['"]/) || [])[1] || rowId;

    const scenariosMatch = rowBlock.match(/scenarios\s*:\s*\[/);
    const scenarios = [];
    if (scenariosMatch) {
      const localStart = rowBlock.indexOf("[", scenariosMatch.index);
      const localEnd = findMatching(rowBlock, localStart, "[", "]");
      const scenariosInner = rowBlock.slice(localStart + 1, localEnd);
      for (let j = 0; j < scenariosInner.length; j++) {
        if (scenariosInner[j] !== "{") continue;
        const sEnd = findMatching(scenariosInner, j, "{", "}");
        if (sEnd === -1) break;
        const sBlock = scenariosInner.slice(j, sEnd + 1);
        const sId = (sBlock.match(/\bid\s*:\s*['"]([^'"]+)['"]/) || [])[1] || "";
        const sLabel = (sBlock.match(/\blabel\s*:\s*['"]([^'"]+)['"]/) || [])[1] || sId;
        const sStory = (sBlock.match(/\bstory\s*:\s*['"]([^'"]+)['"]/) || [])[1];
        const hasArgs = /\bargs\s*:\s*\{/.test(sBlock);
        scenarios.push({ id: sId, label: sLabel, story: sStory, hasArgs });
        j = sEnd;
      }
    }
    rows.push({ id: rowId, label: rowLabel, scenarios });
    i = rowEnd;
  }
  return rows;
}

function aggregateRiskScore(rowLabel, chipLabel, storyName) {
  const text = `${rowLabel} ${chipLabel} ${storyName}`.toLowerCase();
  const strong = [
    "allicons", "all variants", "all states", "all sizes",
    "usageexamples", "usage examples", "comparison", "themecomparison",
    "gallery", "variant gallery", "showcase", "variants", "states",
  ];
  const medium = ["examples", "demo", "list", "grid"];
  let score = 0;
  for (const token of strong) if (text.includes(token)) score += 2;
  for (const token of medium) if (text.includes(token)) score += 1;
  return score;
}

function classifyChip({ rowLabel, chipLabel, story, hasArgs, baseStory, exportInfo }) {
  // Custom matrix pattern: no story reference, but has args + baseStory.
  // The chip is rendered via the base story with per-chip args (e.g. Button).
  if (!story && hasArgs && baseStory) {
    return { category: "custom-matrix-controlled", risk: "low", note: "No story ref; rendered via baseStory + per-chip args" };
  }
  if (!story) return { category: "Missing mapping", risk: "high", note: "No story reference" };
  if (!exportInfo) return { category: "Missing story export", risk: "high", note: "Story export not found" };

  const riskScore = aggregateRiskScore(rowLabel, chipLabel, story);
  const exportKind = exportInfo.kind;

  if (baseStory && story === baseStory && hasArgs) {
    return { category: "ExplorerBase + args", risk: "low", note: "Single preview via composed args" };
  }
  if (baseStory && story === baseStory && !hasArgs) {
    return { category: "ExplorerBase default", risk: "low", note: "Base preview without per-chip args" };
  }
  if (hasArgs) {
    return { category: "Direct story + args", risk: riskScore >= 2 ? "medium" : "low", note: "Single preview from args story" };
  }
  if (riskScore >= 2) {
    return { category: "Aggregate/gallery story (multi-preview risk)", risk: "high", note: `${exportKind} story looks aggregate` };
  }
  if (riskScore === 1) {
    return { category: "Direct story (review for aggregate behavior)", risk: "medium", note: `${exportKind} story; label/story name suggests group/demo` };
  }
  return { category: "Direct single story", risk: exportKind === "function" || exportKind === "render" ? "medium" : "low", note: `${exportKind} export` };
}

function isDocsOnly(source) {
  // Only check meta-level parameters (before export default), not individual stories
  const metaEnd = source.indexOf("export default meta");
  if (metaEnd === -1) return false;
  return /\bdocsOnly\s*:\s*true\b/.test(source.slice(0, metaEnd));
}

function scanFile(absPath) {
  const source = fs.readFileSync(absPath, "utf8");
  const relPath = path.relative(ROOT, absPath);
  if (isDocsOnly(source)) return null;
  const explorer = extractBlock(source, "explorer", "{", "}");
  if (!explorer) return null;

  const title = extractTitle(source);
  const component = componentNameFromTitle(title, relPath);
  const baseStory = (explorer.inner.match(/\bbaseStory\s*:\s*['"]([^'"]+)['"]/) || [])[1] || null;
  const exports = extractExports(source);
  const rows = parseRows(explorer.inner);

  const chips = [];
  for (const row of rows) {
    for (const s of row.scenarios) {
      const exportInfo = s.story ? exports.get(s.story) : null;
      const classification = classifyChip({
        rowLabel: row.label,
        chipLabel: s.label,
        story: s.story,
        hasArgs: s.hasArgs,
        baseStory,
        exportInfo,
      });
      chips.push({
        rowLabel: row.label,
        chipLabel: s.label,
        story: s.story || "—",
        hasArgs: s.hasArgs,
        exportKind: exportInfo?.kind || "—",
        category: classification.category,
        risk: classification.risk,
        note: classification.note,
      });
    }
  }

  return { component, relPath, title, baseStory: baseStory || null, rows, chips };
}

function dedupeByComponent(records) {
  const byName = new Map();
  for (const r of records) {
    const arr = byName.get(r.component) || [];
    arr.push(r);
    byName.set(r.component, arr);
  }
  const out = [];
  for (const arr of byName.values()) {
    arr.sort((a, b) => {
      const aRows = a.rows.length > 0 ? 0 : 1;
      const bRows = b.rows.length > 0 ? 0 : 1;
      if (aRows !== bRows) return aRows - bRows;
      const aPath = a.relPath.startsWith("src/components/") ? 0 : 1;
      const bPath = b.relPath.startsWith("src/components/") ? 0 : 1;
      if (aPath !== bPath) return aPath - bPath;
      return a.relPath.localeCompare(b.relPath);
    });
    out.push(arr[0]);
  }
  return out.sort((a, b) => a.component.localeCompare(b.component));
}

function buildDoc(records) {
  const allChips = records.flatMap((r) => r.chips.map((c) => ({ component: r.component, title: r.title, baseStory: r.baseStory, ...c })));
  const counts = allChips.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {});
  const highRisk = allChips.filter((c) => c.risk === "high");

  // Explorer mode counts
  const baseStoryModeCount = records.filter((r) => r.baseStory != null).length;
  const directModeCount = records.filter((r) => r.baseStory == null).length;

  const lines = [];
  lines.push("# Explorer Chip Preview Classification");
  lines.push("");
  lines.push("Purpose: classify each explorer chip by how its preview is produced and whether it is likely to render a single variant or a multi-variant aggregate/gallery.");
  lines.push("");
  lines.push("Categories used:");
  lines.push("- `ExplorerBase + args`: safest, single preview assembled from a stable base story");
  lines.push("- `custom-matrix-controlled`: no story ref; rendered via baseStory + per-chip args (e.g. Button matrix)");
  lines.push("- `Direct single story`: chip points to a standalone story export");
  lines.push("- `Aggregate/gallery story (multi-preview risk)`: chip likely renders multiple variants/examples in one preview");
  lines.push("- `Missing story export`: chip points to a non-existent story export");
  lines.push("");
  lines.push(`Components scanned (deduped): ${records.length}`);
  lines.push(`Chips scanned: ${allChips.length}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push("| Category | Count |");
  lines.push("|---|---:|");
  Object.entries(counts).sort((a,b)=>b[1]-a[1]).forEach(([k,v]) => {
    lines.push(`| ${k} | ${v} |`);
  });
  lines.push("");
  lines.push("| Explorer Mode | Count |");
  lines.push("|---|---:|");
  lines.push(`| baseStory | ${baseStoryModeCount} |`);
  lines.push(`| direct | ${directModeCount} |`);
  lines.push("");
  lines.push(`High-risk chips (aggregate/gallery or missing export): ${highRisk.length}`);
  lines.push("");
  lines.push("## High-Risk Chips");
  lines.push("");
  lines.push("| Component | Row | Chip | Story | Export | Category | Note |");
  lines.push("|---|---|---|---|---|---|---|");
  highRisk
    .sort((a,b)=> a.component.localeCompare(b.component) || a.rowLabel.localeCompare(b.rowLabel) || a.chipLabel.localeCompare(b.chipLabel))
    .forEach((c) => {
      lines.push(`| ${c.component} | ${c.rowLabel} | ${c.chipLabel} | ${c.story} | ${c.exportKind} | ${c.category} | ${c.note} |`);
    });

  lines.push("");
  lines.push("## Component Breakdown");
  lines.push("");
  for (const r of records) {
    const explorerMode = r.baseStory != null ? "baseStory" : "direct";
    const baseStoryDisplay = r.baseStory != null ? r.baseStory : "\u2014";
    lines.push(`## ${r.component}`);
    lines.push(`- Story file: \`${r.relPath}\``);
    lines.push(`- baseStory: \`${baseStoryDisplay}\``);
    lines.push(`- explorer_mode: \`${explorerMode}\``);
    lines.push("");
    lines.push("| Row | Chip | Story | Args | Export | Classification | Risk | explorer_mode | baseStory | is_compound |");
    lines.push("|---|---|---|---|---|---|---|---|---|---|");
    for (const c of r.chips) {
      const allowlistKey = r.title ? `${r.title}::${c.story === "\u2014" ? "" : c.story}` : null;
      const isCompound = allowlistKey && COMPOUND_ALLOWLIST.has(allowlistKey) ? "yes" : "no";
      lines.push(`| ${c.rowLabel} | ${c.chipLabel} | ${c.story} | ${c.hasArgs ? "Yes" : "No"} | ${c.exportKind} | ${c.category} | ${c.risk} | ${explorerMode} | ${baseStoryDisplay} | ${isCompound} |`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function main() {
  const files = Array.from(new Set(STORY_GLOBS.flatMap((pattern) => glob.sync(pattern, { cwd: ROOT, absolute: true }))));
  const scanned = [];
  for (const file of files) {
    const rec = scanFile(file);
    if (rec) scanned.push(rec);
  }
  // Only include components with actual explorer rows (matches chip audit universe)
  const withRows = scanned.filter((r) => r.rows.length > 0);
  const records = dedupeByComponent(withRows);
  fs.writeFileSync(OUT_PATH, buildDoc(records), "utf8");
  console.log(`Wrote ${path.relative(ROOT, OUT_PATH)} (${records.length} components).`);
}

main();

