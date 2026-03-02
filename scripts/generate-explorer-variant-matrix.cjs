#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "..");
const DOC_PATH = path.join(ROOT, "docs/EXPLORER_COMPONENT_VARIANT_MATRIX.md");

const STORY_GLOBS = [
  "src/components/**/*.stories.tsx",
  "src/stories/*.stories.tsx",
];

function findMatching(source, start, openChar, closeChar) {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;

  for (let i = start; i < source.length; i++) {
    const ch = source[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (ch === "\\") {
      escaped = true;
      continue;
    }

    if (!inDouble && !inTemplate && ch === "'" && source[i - 1] !== "\\") {
      inSingle = !inSingle;
      continue;
    }
    if (!inSingle && !inTemplate && ch === '"' && source[i - 1] !== "\\") {
      inDouble = !inDouble;
      continue;
    }
    if (!inSingle && !inDouble && ch === "`" && source[i - 1] !== "\\") {
      inTemplate = !inTemplate;
      continue;
    }

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
  return {
    start: openIdx,
    end: endIdx,
    body: source.slice(openIdx, endIdx + 1),
    inner: source.slice(openIdx + 1, endIdx),
  };
}

function extractTitle(source) {
  const m = source.match(/\btitle\s*:\s*['"]([^'"]+)['"]/);
  return m ? m[1] : null;
}

function hasExplorerBaseExport(source) {
  return /\bexport\s+(?:const|function)\s+ExplorerBase\b/.test(source);
}

function parseRows(explorerInner) {
  const rowsMatch = /rows\s*:\s*\[/.exec(explorerInner);
  if (!rowsMatch) return [];
  const rowsArrayStart = rowsMatch.index + rowsMatch[0].length - 1; // points to '['
  const rowsArrayOpenInExplorer = rowsArrayStart;
  const rowsArrayCloseInExplorer = findMatching(
    explorerInner,
    rowsArrayOpenInExplorer,
    "[",
    "]"
  );
  if (rowsArrayCloseInExplorer === -1) return [];

  const rowsInner = explorerInner.slice(
    rowsArrayOpenInExplorer + 1,
    rowsArrayCloseInExplorer
  );

  const rows = [];
  for (let i = 0; i < rowsInner.length; i++) {
    if (rowsInner[i] !== "{") continue;
    const rowEnd = findMatching(rowsInner, i, "{", "}");
    if (rowEnd === -1) break;
    const rowBlock = rowsInner.slice(i, rowEnd + 1);

    const rowId = (rowBlock.match(/\bid\s*:\s*['"]([^'"]+)['"]/) || [])[1] || "";
    const rowLabel =
      (rowBlock.match(/\blabel\s*:\s*['"]([^'"]+)['"]/) || [])[1] || rowId;

    const scenariosBlock = extractBlock(rowBlock, "scenarios", "[", "]");
    let scenarioLabels = [];
    if (scenariosBlock) {
      const scenarioLabelRe = /\blabel\s*:\s*['"]([^'"]+)['"]/g;
      let m;
      while ((m = scenarioLabelRe.exec(scenariosBlock.inner)) !== null) {
        scenarioLabels.push(m[1].trim());
      }
    }
    scenarioLabels = Array.from(new Set(scenarioLabels));

    rows.push({ id: rowId, label: rowLabel, scenarios: scenarioLabels });
    i = rowEnd;
  }

  return rows;
}

function classifyRows(rows) {
  const out = {
    type: [],
    style: [],
    state: [],
    size: [],
    shape: [],
    content: [],
    other: [],
  };

  for (const row of rows) {
    const key = `${row.id} ${row.label}`.toLowerCase();
    const values = row.scenarios;
    if (!values.length) continue;
    if (/\btype\b/.test(key)) out.type.push(...values);
    else if (/\bstyle\b/.test(key)) out.style.push(...values);
    else if (/\bstate\b/.test(key)) out.state.push(...values);
    else if (/\bsize\b/.test(key)) out.size.push(...values);
    else if (/\bshape\b/.test(key)) out.shape.push(...values);
    else if (/\bcontent\b/.test(key)) out.content.push(...values);
    else out.other.push(`${row.label}: ${values.join(", ")}`);
  }

  for (const k of Object.keys(out)) {
    out[k] = Array.from(new Set(out[k]));
  }

  return out;
}

function fmt(values) {
  return values && values.length ? values.join(", ") : "—";
}

function componentNameFromTitle(title, relPath) {
  if (title) {
    const last = title.split("/").pop();
    if (last) return last;
  }
  return path.basename(relPath).replace(/\.stories\.tsx$/, "");
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
  const title = extractTitle(source);
  const component = componentNameFromTitle(title, relPath);
  const explorerBlock = extractBlock(source, "explorer", "{", "}");

  if (!explorerBlock) {
    return {
      component,
      relPath,
      configured: false,
      partial: false,
      rows: [],
      classification: classifyRows([]),
      notes: "—",
    };
  }

  const inner = explorerBlock.inner;
  const hasDefaultRowId = /\bdefaultRowId\s*:/.test(inner);
  const hasDefaultScenarioId = /\bdefaultScenarioId\s*:/.test(inner);
  const partial = !(hasDefaultRowId && hasDefaultScenarioId);
  const rows = parseRows(inner);
  const classification = classifyRows(rows);

  const notes = [];
  if (!hasExplorerBaseExport(source)) notes.push("no ExplorerBase export");

  return {
    component,
    relPath,
    configured: true,
    partial,
    rows,
    classification,
    notes: notes.length ? notes.join("; ") : "—",
  };
}

function storyPathRank(relPath) {
  if (relPath.startsWith("src/components/")) return 0;
  if (relPath.startsWith("src/stories/")) return 1;
  return 2;
}

function compareRecordPriority(a, b) {
  const aConfigRank = a.configured ? (a.partial ? 1 : 0) : 2;
  const bConfigRank = b.configured ? (b.partial ? 1 : 0) : 2;
  if (aConfigRank !== bConfigRank) return aConfigRank - bConfigRank;

  const aPathRank = storyPathRank(a.relPath);
  const bPathRank = storyPathRank(b.relPath);
  if (aPathRank !== bPathRank) return aPathRank - bPathRank;

  const aRowCount = a.rows?.length || 0;
  const bRowCount = b.rows?.length || 0;
  if (aRowCount !== bRowCount) return bRowCount - aRowCount;

  return a.relPath.localeCompare(b.relPath);
}

function dedupeRecords(records) {
  const byComponent = new Map();
  for (const record of records) {
    const group = byComponent.get(record.component) || [];
    group.push(record);
    byComponent.set(record.component, group);
  }

  const deduped = [];
  let duplicateGroups = 0;

  for (const group of byComponent.values()) {
    group.sort(compareRecordPriority);
    const chosen = { ...group[0] };

    if (group.length > 1) {
      duplicateGroups++;
      const dropped = group.slice(1).map((g) => g.relPath).join(", ");
      chosen.notes =
        chosen.notes === "—"
          ? `deduped; dropped: ${dropped}`
          : `${chosen.notes}; deduped; dropped: ${dropped}`;
    }

    deduped.push(chosen);
  }

  return { deduped, duplicateGroups };
}

function buildMarkdown(records, meta = {}) {
  const total = records.length;
  const configured = records.filter((r) => r.configured && !r.partial).length;
  const partial = records.filter((r) => r.configured && r.partial).length;
  const notConfigured = records.filter((r) => !r.configured).length;

  const lines = [];
  lines.push("# Explorer Component Variant Matrix");
  lines.push("");
  lines.push(
    "Source of truth: generated from current story files (`parameters.explorer` rows/scenarios)."
  );
  lines.push("");
  lines.push("Correctness check meaning:");
  lines.push("- `Configured`: has `explorer` + `defaultRowId` + `defaultScenarioId`");
  lines.push("- `Partial config`: has `explorer` but missing required default IDs");
  lines.push("- `Not configured`: no `explorer` block");
  lines.push("");
  lines.push(
    `Summary: ${total} component rows, ${configured} configured, ${partial} partial, ${notConfigured} not configured.`
  );
  if (meta.sourceCount && meta.sourceCount !== total) {
    lines.push(
      `Deduping: reduced ${meta.sourceCount} story files to ${total} component rows using priority (configured > partial > not configured, \`src/components\` > \`src/stories\`).`
    );
    if (typeof meta.duplicateGroups === "number") {
      lines.push(`Duplicate component-name groups collapsed: ${meta.duplicateGroups}.`);
    }
  }
  lines.push("");
  lines.push(
    "| Component | Type Variants | Style Variants | State Variants | Size Variants | Shape Variants | Content Variants | Other Axes | Correctness Check | Notes | Story File |"
  );
  lines.push(
    "|---|---|---|---|---|---|---|---|---|---|---|"
  );

  for (const r of records.sort((a, b) => a.component.localeCompare(b.component))) {
    const status = r.configured ? (r.partial ? "Partial config" : "Configured") : "Not configured";
    lines.push(
      `| ${r.component} | ${fmt(r.classification.type)} | ${fmt(r.classification.style)} | ${fmt(r.classification.state)} | ${fmt(r.classification.size)} | ${fmt(r.classification.shape)} | ${fmt(r.classification.content)} | ${fmt(r.classification.other)} | ${status} | ${r.notes} | ${r.relPath} |`
    );
  }

  lines.push("");
  return lines.join("\n");
}

function main() {
  const files = STORY_GLOBS.flatMap((pattern) =>
    glob.sync(pattern, { cwd: ROOT, absolute: true })
  );
  const uniqueFiles = Array.from(new Set(files));
  const scannedRecords = uniqueFiles.map(scanFile).filter(Boolean);
  const { deduped, duplicateGroups } = dedupeRecords(scannedRecords);
  const md = buildMarkdown(deduped, {
    sourceCount: scannedRecords.length,
    duplicateGroups,
  });
  fs.writeFileSync(DOC_PATH, md, "utf8");
  console.log(
    `Wrote ${path.relative(ROOT, DOC_PATH)} (${scannedRecords.length} story files scanned, ${deduped.length} component rows).`
  );
}

main();
