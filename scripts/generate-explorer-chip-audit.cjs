#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "docs/EXPLORER_CHIP_CONNECTION_AUDIT.md");
const STORY_GLOBS = ["src/components/**/*.stories.tsx", "src/stories/*.stories.tsx"];

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
  const baseStory = (explorer.inner.match(/\bbaseStory\s*:\s*['"]([^'"]+)['"]/) || [])[1];
  const exports = extractExports(source);
  const rows = parseRows(explorer.inner);

  const chips = [];
  rows.forEach((row, rowIndex) => {
    row.scenarios.forEach((s) => {
      const exportInfo = s.story ? exports.get(s.story) : undefined;
      const exportExists = Boolean(exportInfo);
      let connection = "unknown";
      let severity = "ok";

      const exportHasArgs = Boolean(exportInfo?.hasArgs);

      if (s.hasArgs) {
        connection = "connected-via-args";
      } else if (s.story && exportExists && exportHasArgs) {
        connection = "connected-via-selected-story-args";
      } else if (!s.story) {
        connection = "no-story-no-args";
        severity = "error";
      } else if (!exportExists) {
        connection = "missing-story-export";
        severity = "error";
      } else if (baseStory) {
        if (s.story === baseStory) {
          connection = "baseStory-selected (no args)";
          severity = rowIndex === 0 ? "ok" : "warn";
        } else {
          connection = "story-only-ignored (baseStory fixed)";
          severity = "error";
        }
      } else if (rowIndex === 0) {
        connection = "connected-via-first-row-story";
      } else {
        connection = "story-only-nonfirst (not connected in matrix)";
        severity = "error";
      }

      chips.push({
        rowIndex,
        rowId: row.id,
        rowLabel: row.label,
        chipId: s.id,
        chipLabel: s.label,
        story: s.story || "—",
        hasArgs: s.hasArgs,
        exportKind: exportInfo?.kind || "—",
        connection,
        severity,
      });
    });
  });

  return { component, relPath, baseStory: baseStory || "—", rows, chips };
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
      const aCfg = a.rows.length > 0 ? 0 : 1;
      const bCfg = b.rows.length > 0 ? 0 : 1;
      if (aCfg !== bCfg) return aCfg - bCfg;
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
  let totalChips = 0;
  let errorChips = 0;
  let warnChips = 0;
  for (const r of records) {
    totalChips += r.chips.length;
    errorChips += r.chips.filter((c) => c.severity === "error").length;
    warnChips += r.chips.filter((c) => c.severity === "warn").length;
  }

  const lines = [];
  lines.push("# Explorer Chip Connection Audit");
  lines.push("");
  lines.push("Purpose: Verify that explorer chips are connected to the matrix preview correctly under the current `ExplorerMatrix` behavior.");
  lines.push("");
  lines.push("Connection rules audited:");
  lines.push("- `connected-via-args`: chip contributes `scenario.args` (works across rows)");
  lines.push("- `connected-via-selected-story-args`: chip points to a story export with `args` (or `render` + `args`); matrix now merges those args");
  lines.push("- `connected-via-first-row-story`: first-row chip selects base story when no `baseStory` is configured");
  lines.push("- `story-only-nonfirst (not connected in matrix)`: chip points to a story in a non-first row without args (preview will not change)");
  lines.push("- `story-only-ignored (baseStory fixed)`: `baseStory` is configured and chip points to a different story without args");
  lines.push("");
  lines.push(`Summary: ${records.length} components with explorer config, ${totalChips} chips audited, ${errorChips} error chips, ${warnChips} warning chips.`);
  lines.push("");

  for (const r of records) {
    const componentErrors = r.chips.filter((c) => c.severity === "error").length;
    const componentWarns = r.chips.filter((c) => c.severity === "warn").length;
    lines.push(`## ${r.component}`);
    lines.push(`- Story file: \`${r.relPath}\``);
    lines.push(`- baseStory: \`${r.baseStory}\``);
    lines.push(`- Rows: ${r.rows.length}`);
    lines.push(`- Chip issues: ${componentErrors} error, ${componentWarns} warning`);
    lines.push("");
    lines.push("| Row | Chip | Story | Args | Export Kind | Connection | Status |");
    lines.push("|---|---|---|---|---|---|---|");
    for (const c of r.chips) {
      const status = c.severity === "error" ? "ERROR" : c.severity === "warn" ? "WARN" : "OK";
      lines.push(
        `| ${c.rowLabel} | ${c.chipLabel} | ${c.story} | ${c.hasArgs ? "Yes" : "No"} | ${c.exportKind} | ${c.connection} | ${status} |`
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}

function main() {
  const files = Array.from(new Set(STORY_GLOBS.flatMap((g) => glob.sync(g, { cwd: ROOT, absolute: true }))));
  const scanned = files.map(scanFile).filter(Boolean);
  const withExplorer = scanned.filter((r) => r.rows.length > 0);
  const deduped = dedupeByComponent(withExplorer);
  const doc = buildDoc(deduped);
  fs.writeFileSync(OUT_PATH, doc, "utf8");
  console.log(`Wrote ${path.relative(ROOT, OUT_PATH)} (${deduped.length} components with explorer config).`);
}

main();
