#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "docs/EXPLORER_VARIANT_CONTRACTS.md");
const STORY_GLOBS = ["src/components/**/*.stories.tsx", "src/stories/*.stories.tsx"];

// ---------------------------------------------------------------------------
// Variant-relevant prop names (the props we care about for coverage analysis)
// ---------------------------------------------------------------------------
const VARIANT_PROP_NAMES = new Set([
  "variant",
  "type",
  "size",
  "color",
  "tone",
  "disabled",
  "shape",
  "style",
  "mode",
  "radius",
  "status",
  "placement",
  "direction",
  "orientation",
  "align",
  "position",
  "loading",
]);

// ---------------------------------------------------------------------------
// Parsing helpers (shared with other explorer scripts)
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

        // Extract args object
        const argsValues = extractArgsValues(sBlock);

        scenarios.push({ id: sId, label: sLabel, args: argsValues });
        j = sEnd;
      }
    }
    rows.push({ id: rowId, label: rowLabel, scenarios });
    i = rowEnd;
  }
  return rows;
}

/**
 * Extract key-value pairs from an args: { ... } object in a scenario block.
 * Returns a Map<propName, Set<string>> of values found.
 */
function extractArgsValues(sBlock) {
  const argsMatch = sBlock.match(/\bargs\s*:\s*\{/);
  if (!argsMatch) return {};
  const argsIdx = argsMatch.index;
  const argsOpen = sBlock.indexOf("{", argsIdx);
  if (argsOpen === -1) return {};
  const argsClose = findMatching(sBlock, argsOpen, "{", "}");
  if (argsClose === -1) return {};
  const argsInner = sBlock.slice(argsOpen + 1, argsClose);

  const result = {};
  // Match patterns like: propName: 'value', propName: "value", propName: true, propName: false, propName: undefined
  const propRe = /(\w+)\s*:\s*(?:'([^']*)'|"([^"]*)"|(\btrue\b|\bfalse\b|\bundefined\b|\bnull\b)|(\d+(?:\.\d+)?))/g;
  let m;
  while ((m = propRe.exec(argsInner)) !== null) {
    const propName = m[1];
    const value = m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4] !== undefined ? m[4] : m[5];
    if (value !== undefined && value !== "undefined" && value !== "null") {
      result[propName] = value;
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Extract argTypes options from story meta (another source of prop values)
// ---------------------------------------------------------------------------
function extractArgTypesOptions(source) {
  const result = new Map(); // propName -> string[]
  const argTypesBlock = extractBlock(source, "argTypes", "{", "}");
  if (!argTypesBlock) return result;

  // Find each prop in argTypes
  const propRe = /(\w+)\s*:\s*\{/g;
  let m;
  while ((m = propRe.exec(argTypesBlock.inner)) !== null) {
    const propName = m[1];
    if (propName === "control" || propName === "type" || propName === "description") continue;

    const propStart = m.index + m[0].length - 1;
    const propEnd = findMatching(argTypesBlock.inner, propStart, "{", "}");
    if (propEnd === -1) continue;
    const propBlock = argTypesBlock.inner.slice(propStart, propEnd + 1);

    // Look for options: [...]
    const optionsMatch = propBlock.match(/options\s*:\s*\[/);
    if (!optionsMatch) continue;
    const optStart = propBlock.indexOf("[", optionsMatch.index);
    const optEnd = findMatching(propBlock, optStart, "[", "]");
    if (optEnd === -1) continue;
    const optInner = propBlock.slice(optStart + 1, optEnd);

    const values = [];
    const valRe = /['"]([^'"]+)['"]|(\btrue\b|\bfalse\b)/g;
    let vm;
    while ((vm = valRe.exec(optInner)) !== null) {
      values.push(vm[1] || vm[2]);
    }
    if (values.length > 0) {
      result.set(propName, values);
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Find component source file and extract prop type unions via regex
// ---------------------------------------------------------------------------
function findComponentSource(storyAbsPath, componentName) {
  const dir = path.dirname(storyAbsPath);

  // Try common patterns
  const candidates = [
    path.join(dir, `${componentName}.tsx`),
    path.join(dir, `${componentName}.ts`),
    path.join(dir, `${componentName}.types.ts`),
    path.join(dir, `${componentName}.types.tsx`),
    path.join(dir, "index.tsx"),
    path.join(dir, "index.ts"),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }

  // For stories in src/stories/, try to find the component in src/components/
  const relPath = path.relative(ROOT, storyAbsPath);
  if (relPath.startsWith("src/stories/")) {
    const baseName = componentName.replace(/\s+/g, "");
    const searchPatterns = [
      `src/components/**/${baseName}.tsx`,
      `src/components/**/${baseName}/${baseName}.tsx`,
    ];
    for (const pattern of searchPatterns) {
      const found = glob.sync(pattern, { cwd: ROOT, absolute: true });
      if (found.length > 0) return found[0];
    }
  }

  return null;
}

/**
 * Extract variant prop union types from a component source file.
 * Returns Map<propName, string[]> for recognized variant props.
 */
function extractPropsFromSource(sourcePath) {
  const result = new Map();
  if (!sourcePath) return result;

  let source;
  try {
    source = fs.readFileSync(sourcePath, "utf8");
  } catch {
    return result;
  }

  // Also read .types.ts file if it exists
  const typesPath = sourcePath.replace(/\.tsx?$/, ".types.ts");
  if (fs.existsSync(typesPath) && typesPath !== sourcePath) {
    try {
      source += "\n" + fs.readFileSync(typesPath, "utf8");
    } catch {}
  }

  // Strategy 1: Find type alias unions like: export type ButtonVariant = 'primary' | 'secondary' | ...
  const typeAliasRe = /export\s+type\s+\w*(?:Variant|Size|Shape|Style|Type|Color|Tone|Mode|Radius|Status|Placement|Direction|Orientation|Align|Position)\s*=\s*([^;]+);/g;
  let m;
  while ((m = typeAliasRe.exec(source)) !== null) {
    const unionStr = m[1].trim();
    const values = extractUnionValues(unionStr);
    if (values.length > 0) {
      // Derive prop name from type alias name
      const typeNameMatch = m[0].match(/type\s+(\w+)/);
      if (typeNameMatch) {
        const typeName = typeNameMatch[1];
        // E.g. ButtonVariant -> variant, AlertRadius -> radius
        const propName = typeName.replace(/^[A-Z][a-z]+/, "").toLowerCase();
        if (propName) result.set(propName, values);
      }
    }
  }

  // Strategy 2: Find inline union types in interface props like: variant?: 'primary' | 'secondary' | ...
  const inlinePropRe = /(\w+)\??\s*:\s*((?:'[^']*'\s*\|\s*)*'[^']*')\s*[;,\n]/g;
  while ((m = inlinePropRe.exec(source)) !== null) {
    const propName = m[1];
    const unionStr = m[2];
    const values = extractUnionValues(unionStr);
    if (values.length > 0 && isVariantProp(propName)) {
      // Only override if we don't already have it or this has more values
      if (!result.has(propName) || result.get(propName).length < values.length) {
        result.set(propName, values);
      }
    }
  }

  // Strategy 3: Find ComponentSize or other imported type references
  if (source.includes("ComponentSize") && !result.has("size")) {
    result.set("size", ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"]);
  }

  return result;
}

function extractUnionValues(unionStr) {
  const values = [];
  const re = /'([^']*)'/g;
  let m;
  while ((m = re.exec(unionStr)) !== null) {
    values.push(m[1]);
  }
  return values;
}

function isVariantProp(name) {
  return VARIANT_PROP_NAMES.has(name.toLowerCase());
}

// ---------------------------------------------------------------------------
// Determine which prop each explorer row maps to
// ---------------------------------------------------------------------------
const ROW_LABEL_TO_PROP = {
  "Style": "variant",
  "Type": "variant",
  "Variant": "variant",
  "Size": "size",
  "Shape": "shape",
  "State": null, // multi-prop, handle specially
  "Tone": "tone",
  "Color": "color",
  "Theme": null,
  "Content": null,
  "Behavior": null,
  "Layout": null,
  "Features": null,
  "Brand": null,
  "Branding": null,
  "Format": null,
  "Data": null,
  "Grid": null,
  "States": null,
};

/**
 * Given a row and its scenarios, infer which prop it primarily controls
 * by looking at the args keys that change across scenarios.
 */
function inferRowProp(row) {
  // Check explicit mapping first
  if (ROW_LABEL_TO_PROP[row.label] !== undefined) {
    return ROW_LABEL_TO_PROP[row.label];
  }

  // Infer from args: find the prop that varies across scenarios
  const propCounts = {};
  for (const s of row.scenarios) {
    for (const key of Object.keys(s.args)) {
      propCounts[key] = (propCounts[key] || 0) + 1;
    }
  }

  // The prop that appears in most scenarios and is a variant-like prop
  let bestProp = null;
  let bestCount = 0;
  for (const [prop, count] of Object.entries(propCounts)) {
    if (isVariantProp(prop) && count > bestCount) {
      bestProp = prop;
      bestCount = count;
    }
  }

  return bestProp;
}

/**
 * Collect all distinct values for a given prop from explorer scenario args.
 */
function collectExplorerValues(rows, propName) {
  const values = new Set();
  for (const row of rows) {
    for (const s of row.scenarios) {
      if (s.args[propName] !== undefined) {
        values.add(String(s.args[propName]));
      }
    }
  }
  return Array.from(values).sort();
}

// ---------------------------------------------------------------------------
// Process a single component
// ---------------------------------------------------------------------------
function isDocsOnly(source) {
  // Only check meta-level parameters (before export default), not individual stories
  const metaEnd = source.indexOf("export default meta");
  if (metaEnd === -1) return false;
  return /\bdocsOnly\s*:\s*true\b/.test(source.slice(0, metaEnd));
}

function processComponent(absPath) {
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

  // Find component source
  const componentSource = findComponentSource(absPath, component);
  const componentRelPath = componentSource ? path.relative(ROOT, componentSource) : null;

  // Extract props from source file
  const sourceProps = extractPropsFromSource(componentSource);

  // Extract argTypes options from story
  const argTypesOptions = extractArgTypesOptions(source);

  // Merge: prefer source props, fall back to argTypes
  const allApiProps = new Map();
  for (const [prop, values] of sourceProps) {
    allApiProps.set(prop, values);
  }
  for (const [prop, values] of argTypesOptions) {
    if (!allApiProps.has(prop) || allApiProps.get(prop).length < values.length) {
      allApiProps.set(prop, values);
    }
  }

  // Build per-row axis analysis
  const axes = [];
  for (const row of rows) {
    const prop = inferRowProp(row);
    const chipLabels = row.scenarios.map((s) => s.label);

    let explorerValues = [];
    let apiValues = null;

    if (prop) {
      explorerValues = collectExplorerValues([row], prop);
      apiValues = allApiProps.get(prop) || null;
    } else {
      // For rows with no clear single prop (State, Features, etc.),
      // list the chip labels as the explorer values
      explorerValues = chipLabels;
    }

    axes.push({
      label: row.label,
      prop: prop || "—",
      apiValues: apiValues ? apiValues : null,
      explorerValues,
      chipCount: row.scenarios.length,
    });
  }

  return {
    component,
    relPath,
    componentRelPath,
    baseStory,
    rows,
    axes,
    allApiProps,
  };
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
// Coverage calculation
// ---------------------------------------------------------------------------
function computeCoverage(axis) {
  if (!axis.apiValues || axis.apiValues.length === 0) {
    return { covered: axis.explorerValues.length, total: null, pct: null };
  }
  const apiSet = new Set(axis.apiValues.map(String));
  const covered = axis.explorerValues.filter((v) => apiSet.has(v)).length;
  return {
    covered,
    total: axis.apiValues.length,
    pct: Math.round((covered / axis.apiValues.length) * 100),
  };
}

function computeComponentCoverage(record) {
  let totalCovered = 0;
  let totalApi = 0;
  let hasMeasurable = false;
  for (const axis of record.axes) {
    const cov = computeCoverage(axis);
    if (cov.total !== null) {
      totalCovered += cov.covered;
      totalApi += cov.total;
      hasMeasurable = true;
    }
  }
  if (!hasMeasurable) return null;
  return { covered: totalCovered, total: totalApi, pct: Math.round((totalCovered / totalApi) * 100) };
}

// ---------------------------------------------------------------------------
// Build report
// ---------------------------------------------------------------------------
function buildReport(records) {
  const timestamp = new Date().toISOString().replace("T", " ").replace(/\.\d+Z$/, " UTC");

  // Compute per-component coverage
  const coverageData = records.map((r) => ({
    record: r,
    coverage: computeComponentCoverage(r),
  }));

  // Totals
  let totalPropValues = 0;
  let totalCovered = 0;
  let measurableCount = 0;
  for (const { coverage } of coverageData) {
    if (coverage) {
      totalPropValues += coverage.total;
      totalCovered += coverage.covered;
      measurableCount++;
    }
  }
  const overallPct = totalPropValues > 0 ? Math.round((totalCovered / totalPropValues) * 100) : 0;

  const lines = [];

  // Header
  lines.push("# Explorer Variant Contracts");
  lines.push("");
  lines.push(`Generated: ${timestamp}`);
  lines.push(`Summary: ${records.length} components, ${totalPropValues} total prop values, ${overallPct}% coverage`);
  lines.push("");

  // Summary table
  lines.push("## Coverage Summary");
  lines.push("");
  lines.push("| Component | Source | Axes | Covered / Total | Coverage |");
  lines.push("|---|---|---|---|---|");
  for (const { record, coverage } of coverageData) {
    const src = record.componentRelPath ? `\`${record.componentRelPath}\`` : "?";
    const axisCount = record.axes.length;
    if (coverage) {
      lines.push(`| ${record.component} | ${src} | ${axisCount} | ${coverage.covered}/${coverage.total} | ${coverage.pct}% |`);
    } else {
      lines.push(`| ${record.component} | ${src} | ${axisCount} | — | — |`);
    }
  }
  lines.push("");

  // Per-component detail
  lines.push("## Component Details");
  lines.push("");

  for (const { record, coverage } of coverageData) {
    lines.push(`### ${record.component}`);
    lines.push(`- Story: \`${record.relPath}\``);
    lines.push(`- Source: ${record.componentRelPath ? `\`${record.componentRelPath}\`` : "not found"}`);
    lines.push(`- Base story: ${record.baseStory || "—"}`);
    if (coverage) {
      lines.push(`- Overall coverage: ${coverage.covered}/${coverage.total} (${coverage.pct}%)`);
    }
    lines.push("");

    lines.push("| Axis | Prop | Values in API | Exposed in Explorer | Coverage |");
    lines.push("|---|---|---|---|---|");

    for (const axis of record.axes) {
      const cov = computeCoverage(axis);
      const apiStr = axis.apiValues ? axis.apiValues.join(", ") : "?";
      const explorerStr = axis.explorerValues.join(", ");
      let covStr;
      if (cov.total !== null) {
        covStr = `${cov.covered}/${cov.total} (${cov.pct}%)`;
      } else {
        covStr = `${cov.covered} chips`;
      }
      lines.push(`| ${axis.label} | ${axis.prop} | ${apiStr} | ${explorerStr} | ${covStr} |`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const files = Array.from(
    new Set(STORY_GLOBS.flatMap((g) => glob.sync(g, { cwd: ROOT, absolute: true })))
  );

  const scanned = files.map(processComponent).filter(Boolean);
  const deduped = dedupeByComponent(scanned);
  const report = buildReport(deduped);

  fs.writeFileSync(OUT_PATH, report, "utf8");

  // Console summary
  const coverageData = deduped.map((r) => ({
    component: r.component,
    coverage: computeComponentCoverage(r),
  }));

  let totalPropValues = 0;
  let totalCovered = 0;
  for (const { coverage } of coverageData) {
    if (coverage) {
      totalPropValues += coverage.total;
      totalCovered += coverage.covered;
    }
  }
  const overallPct = totalPropValues > 0 ? Math.round((totalCovered / totalPropValues) * 100) : 0;

  console.log(`Wrote ${path.relative(ROOT, OUT_PATH)}`);
  console.log(`  ${deduped.length} components scanned`);
  console.log(`  ${totalPropValues} total API prop values across measurable axes`);
  console.log(`  ${totalCovered} covered by explorer chips (${overallPct}%)`);
  console.log("");

  // Per-component summary
  for (const { component, coverage } of coverageData) {
    if (coverage) {
      console.log(`  ${component}: ${coverage.covered}/${coverage.total} (${coverage.pct}%)`);
    } else {
      console.log(`  ${component}: no measurable props`);
    }
  }
}

main();
