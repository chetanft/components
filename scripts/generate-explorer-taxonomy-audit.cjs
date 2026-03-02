#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "docs/EXPLORER_VARIANT_TAXONOMY_AUDIT.md");
const STORY_GLOBS = ["src/components/**/*.stories.tsx", "src/stories/*.stories.tsx"];

// ---------------------------------------------------------------------------
// Standard taxonomy
// ---------------------------------------------------------------------------
const STANDARD_ROW_NAMES = new Set([
  "Type",
  "Variant",
  "Style",
  "Size",
  "State",
  "Shape",
  "Content",
  "Behavior",
  "Theme",
  "Layout",
  "Data",
  "Format",
  "Tone",
  "Brand",
  "Branding",
  "Filter Type",
  "Comparison",
  "Grid",
  "Features",
  "Placement",
]);

const ROW_ALIASES = {
  "States": "State",
  "Theme Mode": "Theme",
  "Filter Type": "Behavior",
};

const AGGREGATE_PATTERNS = [
  /^Variants$/i,
  /^States$/i,
  /^Usage Examples$/i,
  /^All\s/i,
  /^Gallery$/i,
  /^Comparison$/i,
  /^Overview$/i,
  /^Demo$/i,
  /^Examples$/i,
  /^Variant Showcase$/i,
  /^State Showcase$/i,
  /^Size Showcase$/i,
  /^Type Showcase$/i,
  /^Item States$/i,
  /^Sizes$/i,
];

// ---------------------------------------------------------------------------
// Parsing helpers (inlined from generate-explorer-chip-audit.cjs)
// ---------------------------------------------------------------------------
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

        // Extract a normalized args fingerprint for duplicate detection
        let argsFingerprint = "";
        if (hasArgs) {
          const argsIdx = sBlock.indexOf("args");
          const argsOpen = sBlock.indexOf("{", argsIdx);
          if (argsOpen !== -1) {
            const argsClose = findMatching(sBlock, argsOpen, "{", "}");
            if (argsClose !== -1) {
              argsFingerprint = sBlock.slice(argsOpen, argsClose + 1).replace(/\s+/g, " ").trim();
            }
          }
        }

        scenarios.push({ id: sId, label: sLabel, story: sStory, hasArgs, argsFingerprint });
        j = sEnd;
      }
    }
    rows.push({ id: rowId, label: rowLabel, scenarios });
    i = rowEnd;
  }
  return rows;
}

// ---------------------------------------------------------------------------
// Taxonomy checks
// ---------------------------------------------------------------------------
function isStandardRow(label) {
  if (STANDARD_ROW_NAMES.has(label)) return true;
  if (ROW_ALIASES[label]) return true;
  return false;
}

function isMixedRow(label) {
  return /[&/]/.test(label);
}

function isAggregateLabel(label) {
  return AGGREGATE_PATTERNS.some((p) => p.test(label));
}

function isDocsOnly(source) {
  // Only check meta-level parameters (before export default), not individual stories
  const metaEnd = source.indexOf("export default meta");
  if (metaEnd === -1) return false;
  return /\bdocsOnly\s*:\s*true\b/.test(source.slice(0, metaEnd));
}

function auditComponent(absPath) {
  const source = fs.readFileSync(absPath, "utf8");
  if (isDocsOnly(source)) return null;
  const relPath = path.relative(ROOT, absPath);
  const explorer = extractBlock(source, "explorer", "{", "}");
  if (!explorer) return null;

  const title = extractTitle(source);
  const component = componentNameFromTitle(title, relPath);
  const baseStory = (explorer.inner.match(/\bbaseStory\s*:\s*['"]([^'"]+)['"]/) || [])[1] || null;
  const rows = parseRows(explorer.inner);
  if (rows.length === 0) return null;

  const issues = [];

  for (const row of rows) {
    // (a) Row name compliance
    if (!isStandardRow(row.label)) {
      issues.push({
        row: row.label,
        issue: "non-standard-row",
        details: `"${row.label}" is not in the standard taxonomy`,
        severity: "info",
      });
    }

    // (b) Mixed row detection
    if (isMixedRow(row.label)) {
      issues.push({
        row: row.label,
        issue: "mixed-row",
        details: `Row label contains "&" or "/" suggesting merged axes`,
        severity: "warning",
      });
    }

    // Track story+args combos for duplicate detection within this row
    const seen = new Map();

    for (const s of row.scenarios) {
      // (c) Aggregate label detection — skip if chip has args (renders a specific variant)
      if (isAggregateLabel(s.label) && !s.hasArgs) {
        issues.push({
          row: row.label,
          issue: "aggregate-label",
          details: `Chip "${s.label}" matches aggregate pattern`,
          severity: "warning",
        });
      }

      // (d) Missing args in baseStory explorer
      if (baseStory && s.story && s.story !== baseStory && !s.hasArgs) {
        issues.push({
          row: row.label,
          issue: "missing-args-in-baseStory",
          details: `Chip "${s.label}" references story "${s.story}" (not baseStory "${baseStory}") without args`,
          severity: "error",
        });
      }

      // (e) Duplicate/overlapping chips
      const fingerprint = `${s.story || ""}::${s.argsFingerprint}`;
      if (seen.has(fingerprint)) {
        issues.push({
          row: row.label,
          issue: "duplicate-chip",
          details: `Chip "${s.label}" duplicates "${seen.get(fingerprint)}" (same story + args)`,
          severity: "warning",
        });
      } else {
        seen.set(fingerprint, s.label);
      }
    }
  }

  return { component, relPath, baseStory: baseStory || null, rows, issues };
}

// ---------------------------------------------------------------------------
// Dedup by component name (prefer src/components over src/stories)
// ---------------------------------------------------------------------------
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
      const aPath = a.relPath.startsWith("src/components/") ? 0 : 1;
      const bPath = b.relPath.startsWith("src/components/") ? 0 : 1;
      if (aPath !== bPath) return aPath - bPath;
      return a.relPath.localeCompare(b.relPath);
    });
    out.push(arr[0]);
  }
  return out.sort((a, b) => a.component.localeCompare(b.component));
}

// ---------------------------------------------------------------------------
// Build report
// ---------------------------------------------------------------------------
function buildReport(records) {
  const totalRows = records.reduce((s, r) => s + r.rows.length, 0);
  const allIssues = records.flatMap((r) => r.issues);
  const totalIssues = allIssues.length;

  // Count by issue type
  const countByType = {};
  const severityByType = {};
  for (const iss of allIssues) {
    countByType[iss.issue] = (countByType[iss.issue] || 0) + 1;
    severityByType[iss.issue] = iss.severity;
  }

  // All row labels used
  const rowLabelCounts = {};
  for (const r of records) {
    for (const row of r.rows) {
      rowLabelCounts[row.label] = (rowLabelCounts[row.label] || 0) + 1;
    }
  }

  const lines = [];
  lines.push("# Explorer Variant Taxonomy Audit");
  lines.push("");
  lines.push(`Summary: ${records.length} components, ${totalRows} rows audited, ${totalIssues} issues found.`);
  lines.push("");

  // Issues by type table
  lines.push("## Issues by Type");
  lines.push("| Issue | Count | Severity |");
  lines.push("|---|---|---|");
  const issueOrder = ["non-standard-row", "mixed-row", "aggregate-label", "missing-args-in-baseStory", "duplicate-chip"];
  for (const type of issueOrder) {
    const count = countByType[type] || 0;
    const sev = severityByType[type] || (type === "missing-args-in-baseStory" ? "error" : type === "non-standard-row" ? "info" : "warning");
    lines.push(`| ${type} | ${count} | ${sev} |`);
  }
  lines.push("");

  // Components with issues
  const withIssues = records.filter((r) => r.issues.length > 0);
  lines.push("## Components with Issues");
  lines.push("");
  if (withIssues.length === 0) {
    lines.push("No issues found.");
    lines.push("");
  } else {
    for (const r of withIssues) {
      lines.push(`### ${r.component}`);
      lines.push(`- Story file: \`${r.relPath}\``);
      lines.push("");
      lines.push("| Row | Issue | Details | Severity |");
      lines.push("|---|---|---|---|");
      for (const iss of r.issues) {
        lines.push(`| ${iss.row} | ${iss.issue} | ${iss.details} | ${iss.severity} |`);
      }
      lines.push("");
    }
  }

  // All row labels used
  lines.push("## All Row Labels Used");
  lines.push("| Row Label | Count | Standard? |");
  lines.push("|---|---|---|");
  const sortedLabels = Object.keys(rowLabelCounts).sort();
  for (const label of sortedLabels) {
    const standard = isStandardRow(label) ? "Yes" : "No";
    lines.push(`| ${label} | ${rowLabelCounts[label]} | ${standard} |`);
  }
  lines.push("");

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const files = Array.from(
    new Set(STORY_GLOBS.flatMap((g) => glob.sync(g, { cwd: ROOT, absolute: true })))
  );
  const scanned = files.map(auditComponent).filter(Boolean);
  const deduped = dedupeByComponent(scanned);
  const report = buildReport(deduped);
  fs.writeFileSync(OUT_PATH, report, "utf8");
  console.log(`Wrote ${path.relative(ROOT, OUT_PATH)} (${deduped.length} components, ${deduped.reduce((s, r) => s + r.issues.length, 0)} issues).`);
}

main();
