#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { parseCssTokens } = require('./lib/parse-css-tokens.cjs');

const projectRoot = path.join(__dirname, '..');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readJsonIfExists(filePath, fallback = {}) {
  if (!fs.existsSync(filePath)) return fallback;
  return readJson(filePath);
}

function writeIfChanged(filePath, content) {
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, 'utf8');
    if (existing === content) return false;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function toAnchor(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function groupComponents(components) {
  const grouped = {
    atoms: [],
    molecules: [],
    organisms: [],
    charts: [],
    templates: [],
  };

  for (const component of components) {
    if (!grouped[component.category]) continue;
    grouped[component.category].push(component);
  }

  for (const key of Object.keys(grouped)) {
    grouped[key].sort((a, b) => a.name.localeCompare(b.name));
  }

  return grouped;
}

function tokenTable(rows, headers) {
  const head = `| ${headers.join(' | ')} |`;
  const sep = `|${headers.map(() => '---').join('|')}|`;
  const body = rows.map((row) => `| ${row.join(' | ')} |`).join('\n');
  return `${head}\n${sep}\n${body}`;
}

function findMatchingBrace(input, openIndex) {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;
  for (let i = openIndex; i < input.length; i += 1) {
    const ch = input[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      escaped = true;
      continue;
    }
    if (!inDouble && !inTemplate && ch === '\'' && !inSingle) {
      inSingle = true;
      continue;
    }
    if (inSingle && ch === '\'') {
      inSingle = false;
      continue;
    }
    if (!inSingle && !inTemplate && ch === '"' && !inDouble) {
      inDouble = true;
      continue;
    }
    if (inDouble && ch === '"') {
      inDouble = false;
      continue;
    }
    if (!inSingle && !inDouble && ch === '`' && !inTemplate) {
      inTemplate = true;
      continue;
    }
    if (inTemplate && ch === '`') {
      inTemplate = false;
      continue;
    }
    if (inSingle || inDouble || inTemplate) continue;

    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function splitTopLevelEntries(input) {
  const out = [];
  let current = '';
  let depthCurly = 0;
  let depthSquare = 0;
  let depthParen = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;

  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    current += ch;

    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      escaped = true;
      continue;
    }

    if (!inDouble && !inTemplate && ch === '\'' && !inSingle) {
      inSingle = true;
      continue;
    }
    if (inSingle && ch === '\'') {
      inSingle = false;
      continue;
    }
    if (!inSingle && !inTemplate && ch === '"' && !inDouble) {
      inDouble = true;
      continue;
    }
    if (inDouble && ch === '"') {
      inDouble = false;
      continue;
    }
    if (!inSingle && !inDouble && ch === '`' && !inTemplate) {
      inTemplate = true;
      continue;
    }
    if (inTemplate && ch === '`') {
      inTemplate = false;
      continue;
    }
    if (inSingle || inDouble || inTemplate) continue;

    if (ch === '{') depthCurly += 1;
    else if (ch === '}') depthCurly -= 1;
    else if (ch === '[') depthSquare += 1;
    else if (ch === ']') depthSquare -= 1;
    else if (ch === '(') depthParen += 1;
    else if (ch === ')') depthParen -= 1;

    if (ch === ',' && depthCurly === 0 && depthSquare === 0 && depthParen === 0) {
      out.push(current.slice(0, -1).trim());
      current = '';
    }
  }

  if (current.trim()) out.push(current.trim());
  return out.filter(Boolean);
}

function parseObjectEntries(objBlock) {
  const trimmed = objBlock.trim();
  const inner = trimmed.startsWith('{') && trimmed.endsWith('}')
    ? trimmed.slice(1, -1)
    : trimmed;
  const entries = splitTopLevelEntries(inner);
  return entries
    .map((entry) => {
      const idx = entry.indexOf(':');
      if (idx === -1) return null;
      const rawKey = entry.slice(0, idx).trim();
      const value = entry.slice(idx + 1).trim();
      const key = rawKey.replace(/^['"`]/, '').replace(/['"`]$/, '');
      return { key, value };
    })
    .filter(Boolean);
}

function extractTokensFromValue(value) {
  const tokenSet = new Set();
  const varRe = /var\(--([a-zA-Z0-9-_]+)\)/g;
  let m;
  while ((m = varRe.exec(value)) !== null) {
    tokenSet.add(`--${m[1]}`);
  }
  const remClassRe = /\btext-[a-zA-Z0-9_]+-rem\b/g;
  while ((m = remClassRe.exec(value)) !== null) {
    tokenSet.add(m[0]);
  }
  return Array.from(tokenSet).sort();
}

function looksLikeVariantMapName(name) {
  return /(variant|variants|size|sizes|sizing|scale|state|status|type|shape|tone|intent|appearance|radius|style|styles|map|config|classes)$/i.test(name);
}

function extractVariantTokenSpecsFromContent(content, sourceFile) {
  const rows = [];

  // 1) cva(... { variants: { ... } })
  const variantsRe = /\bvariants\s*:\s*\{/g;
  let match;
  while ((match = variantsRe.exec(content)) !== null) {
    const braceIdx = content.indexOf('{', match.index);
    if (braceIdx === -1) continue;
    const endIdx = findMatchingBrace(content, braceIdx);
    if (endIdx === -1) continue;
    const variantsBlock = content.slice(braceIdx, endIdx + 1);
    const dimensions = parseObjectEntries(variantsBlock);
    for (const dimension of dimensions) {
      if (!dimension || !dimension.value || !dimension.value.trim().startsWith('{')) continue;
      if (dimension.key.includes('\n') || dimension.key.startsWith('//')) continue;
      const options = parseObjectEntries(dimension.value);
      for (const option of options) {
        if (!option) continue;
        if (option.key.includes('\n') || option.key.startsWith('//')) continue;
        const tokens = extractTokensFromValue(option.value);
        rows.push({
          source: sourceFile,
          dimension: dimension.key,
          variant: option.key,
          tokens,
          detector: 'cva.variants',
        });
      }
    }
    variantsRe.lastIndex = endIdx + 1;
  }

  // 2) Generic const fooStyles/fooVariants = { sm: "...", md: "..." }
  const assignRe = /\b(?:const|let)\s+([A-Za-z0-9_]+)\s*(?::[\s\S]{0,120}?)?=\s*\{/g;
  let m;
  while ((m = assignRe.exec(content)) !== null) {
    const mapName = m[1];
    if (!looksLikeVariantMapName(mapName)) continue;
    const open = content.indexOf('{', m.index);
    if (open === -1) continue;
    const close = findMatchingBrace(content, open);
    if (close === -1) continue;
    const block = content.slice(open, close + 1);
    const entries = parseObjectEntries(block);
    if (entries.length < 2) continue;

    let matchedVariantish = 0;
    for (const entry of entries) {
      if (/^(xxs|xs|sm|md|lg|xl|xxl|default|primary|secondary|tertiary|solid|outline|ghost|link|success|warning|danger|error|info|normal|true|false)$/i.test(entry.key)) {
        matchedVariantish += 1;
      }
    }
    if (matchedVariantish === 0) continue;

    const dimension = mapName
      .replace(/(Styles|Variants|Variant|Map|Config|Classes)$/, '')
      .replace(/^[A-Z]/, (s) => s.toLowerCase());

    const candidateRows = [];
    for (const entry of entries) {
      if (entry.key.includes('\n') || entry.key.startsWith('//')) continue;
      const tokens = extractTokensFromValue(entry.value);
      candidateRows.push({
        source: sourceFile,
        dimension: dimension || mapName,
        variant: entry.key,
        tokens,
        detector: 'object.map',
      });
    }
    if (candidateRows.some((row) => row.tokens.length > 0)) {
      rows.push(...candidateRows);
    }
  }

  return rows;
}

function extractFileLevelTokens(content) {
  return extractTokensFromValue(content);
}

function collectComponentVariantTokens(components) {
  const result = {};

  for (const component of components) {
    const componentKey = `${component.category}/${component.name}`;
    const componentDir = path.join(projectRoot, component.path || '');
    if (!componentDir || !fs.existsSync(componentDir)) {
      result[componentKey] = {
        rows: [],
        status: 'missing-path',
        name: component.name,
        category: component.category,
      };
      continue;
    }

    const sourceFiles = (component.files || [])
      .filter((file) => /\.(ts|tsx)$/.test(file))
      .filter((file) => !/\.stories\.|\.test\.|\.spec\./.test(file))
      .filter((file) => file !== 'index.ts' && file !== 'index.tsx')
      .map((file) => path.join(componentDir, file))
      .filter((full) => fs.existsSync(full));

    const rows = [];
    const fallbackRows = [];
    for (const fullPath of sourceFiles) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const rel = path.relative(projectRoot, fullPath).replace(/\\/g, '/');
      rows.push(...extractVariantTokenSpecsFromContent(content, rel));

      // Fallback baseline tokens per file, used only if no variant rows are found.
      const fileTokens = extractFileLevelTokens(content);
      if (fileTokens.length > 0) {
        fallbackRows.push({
          source: rel,
          dimension: 'base',
          variant: 'default',
          tokens: fileTokens,
          detector: 'fallback.file',
        });
      }
    }

    if (rows.length > 0) {
      const dedup = new Map();
      for (const row of rows) {
        const key = `${row.source}|${row.dimension}|${row.variant}|${row.tokens.join(',')}|${row.detector}`;
        dedup.set(key, row);
      }
      result[componentKey] = {
        rows: Array.from(dedup.values())
          .sort((a, b) => (
            a.source.localeCompare(b.source) ||
            a.dimension.localeCompare(b.dimension) ||
            a.variant.localeCompare(b.variant)
          )),
        status: 'variant-detected',
        name: component.name,
        category: component.category,
      };
      continue;
    }

    if (fallbackRows.length > 0) {
      const mergedTokens = Array.from(new Set(fallbackRows.flatMap((row) => row.tokens))).sort();
      const primarySource = fallbackRows[0].source;
      result[componentKey] = {
        rows: [{
          source: primarySource,
          dimension: 'base',
          variant: 'default',
          tokens: mergedTokens,
          detector: 'fallback.file',
        }],
        status: 'fallback-default',
        name: component.name,
        category: component.category,
      };
      continue;
    }

    result[componentKey] = {
      rows: [{
        source: sourceFiles.length > 0
          ? path.relative(projectRoot, sourceFiles[0]).replace(/\\/g, '/')
          : component.path,
        dimension: 'base',
        variant: 'default',
        tokens: [],
        detector: 'no-token-match',
      }],
      status: 'no-token-match',
      name: component.name,
      category: component.category,
    };
  }

  return result;
}

function applyManualOverrides(matrix, overrides) {
  const out = { ...matrix };
  for (const [componentKey, override] of Object.entries(overrides || {})) {
    if (!override || !Array.isArray(override.rows)) continue;
    const existing = out[componentKey] || {};
    const normalizedRows = override.rows
      .filter((row) => row && typeof row === 'object')
      .map((row) => ({
        source: row.source || existing.path || componentKey,
        dimension: row.dimension || 'base',
        variant: row.variant || 'default',
        tokens: Array.isArray(row.tokens) ? Array.from(new Set(row.tokens)).sort() : [],
        detector: 'manual.override',
      }));
    out[componentKey] = {
      ...existing,
      rows: normalizedRows,
      status: 'manual-override',
      name: existing.name || componentKey.split('/')[1] || componentKey,
      category: existing.category || componentKey.split('/')[0] || 'unknown',
    };
  }
  return out;
}

function buildMarkdown({ version, summary, grouped, tokens, generatedAt, components }) {
  const spacingRows = Object.entries(tokens.spacingTokens)
    .sort((a, b) => {
      const na = Number(a[0].replace('x', ''));
      const nb = Number(b[0].replace('x', ''));
      return na - nb;
    })
    .map(([k, v]) => [`--${k}`, v]);

  const spacingAliasRows = Object.entries(tokens.spacingAliases)
    .sort((a, b) => {
      const na = Number(a[0].replace('spacing-x', ''));
      const nb = Number(b[0].replace('spacing-x', ''));
      return na - nb;
    })
    .map(([k, v]) => [`--${k}`, v]);

  const typographyRows = Object.entries(tokens.typographyTokens)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, t]) => [`--${k}`, t.px, t.value]);

  const radiusRows = Object.entries(tokens.borderRadiusTokens)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, v]) => [`--${k}`, v]);

  const lines = [];
  lines.push('# FT Design System - Component Design Specifications');
  lines.push('');
  lines.push('> Auto-generated from `src/styles/globals.css` + `registry.json`.');
  lines.push(`> Version: ${version} | Generated: ${generatedAt}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Purpose');
  lines.push('');
  lines.push('This document is the source-generated design spec reference for token values and component coverage.');
  lines.push('For variant-level drift and regression checks, use `npm run check:consistency` and the generated reports under `docs/audits/`.');
  lines.push('');
  lines.push('## Workflow');
  lines.push('');
  lines.push('1. Update component code/tokens.');
  lines.push('2. Run `npm run sync:docs` (regenerates this file).');
  lines.push('3. Run `npm run check:consistency` before commit/PR.');
  lines.push('4. Run `npm run check:size-contract` before commit/PR for component size/variant updates.');
  lines.push('5. Run `npm run check:spacing-structure:report` to detect structural spacing/layout issues.');
  lines.push('6. Run `npm run check:spacing-structure` before commit/PR to enforce baseline-aware structural checks.');
  lines.push('7. Use `npm run check:consistency:baseline` only when intentionally accepting debt changes.');
  lines.push('');
  lines.push('## Table of Contents');
  lines.push('');
  lines.push('- [Foundation Tokens](#foundation-tokens)');
  lines.push('- [Component Coverage](#component-coverage)');
  lines.push('- [Component Variant Token Matrix](#component-variant-token-matrix)');
  lines.push('- [Consistency Gate Commands](#consistency-gate-commands)');
  lines.push('- [Size Contract Gate Commands](#size-contract-gate-commands)');
  lines.push('- [Structural Spacing Gate Commands](#structural-spacing-gate-commands)');
  lines.push('');
  lines.push('## Foundation Tokens');
  lines.push('');
  lines.push('### Spacing Scale (Legacy `--x*`)');
  lines.push('');
  lines.push(tokenTable(spacingRows, ['Token', 'Value']));
  lines.push('');
  lines.push('### Spacing Aliases (Canonical `--spacing-x*`)');
  lines.push('');
  lines.push(tokenTable(spacingAliasRows, ['Token', 'Resolved Value']));
  lines.push('');
  if (Object.keys(tokens.halfStepSpacing).length > 0) {
    const halfStepRows = Object.entries(tokens.halfStepSpacing)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([k, v]) => [`--${k}`, v]);
    lines.push('### Half-Step Spacing');
    lines.push('');
    lines.push(tokenTable(halfStepRows, ['Token', 'Value']));
    lines.push('');
  }
  lines.push('### Typography Tokens');
  lines.push('');
  lines.push(tokenTable(typographyRows, ['Token', 'px', 'rem']));
  lines.push('');
  lines.push('### Border Radius Tokens');
  lines.push('');
  lines.push(tokenTable(radiusRows, ['Token', 'Value']));
  lines.push('');
  lines.push('## Component Coverage');
  lines.push('');
  lines.push(`- Total: **${summary.total}**`);
  lines.push(`- Atoms: **${summary.atoms}**`);
  lines.push(`- Molecules: **${summary.molecules}**`);
  lines.push(`- Organisms: **${summary.organisms}**`);
  lines.push(`- Charts: **${summary.charts}**`);
  lines.push(`- Templates: **${summary.templates}**`);
  lines.push('');

  const sectionOrder = ['atoms', 'molecules', 'organisms', 'charts', 'templates'];
  for (const section of sectionOrder) {
    const title = section.charAt(0).toUpperCase() + section.slice(1);
    lines.push(`### ${title}`);
    lines.push('');
    const items = grouped[section] || [];
    if (items.length === 0) {
      lines.push('- _No components found_');
      lines.push('');
      continue;
    }
    for (const item of items) {
      const sub = (item.subComponents || []).length ? ` (sub: ${(item.subComponents || []).length})` : '';
      lines.push(`- **${item.name}**${sub}`);
    }
    lines.push('');
  }

  lines.push('## Component Variant Token Matrix');
  lines.push('');
  lines.push('> Auto-detected from source variant/config objects (`cva variants` and `*Styles/*Variants/*Map` patterns).');
  lines.push('> This is best-effort static extraction and may omit runtime-computed classes.');
  lines.push('');
  const componentNames = (components || [])
    .map((component) => component.name)
    .sort((a, b) => a.localeCompare(b));
  if (componentNames.length === 0) {
    lines.push('_No variant-token rows detected._');
    lines.push('');
  } else {
    const stats = {
      manual: 0,
      detected: 0,
      fallback: 0,
      noToken: 0,
      missingPath: 0,
    };
    for (const component of (components || [])) {
      const key = `${component.category}/${component.name}`;
      const entry = (tokens.componentVariantTokens || {})[key];
      const status = entry?.status;
      if (status === 'manual-override') stats.manual += 1;
      else if (status === 'variant-detected') stats.detected += 1;
      else if (status === 'fallback-default') stats.fallback += 1;
      else if (status === 'no-token-match') stats.noToken += 1;
      else if (status === 'missing-path') stats.missingPath += 1;
    }
    lines.push(`Coverage: **${componentNames.length} / ${componentNames.length} components listed**`);
    lines.push(`- Manual-override: **${stats.manual}**`);
    lines.push(`- Variant-detected: **${stats.detected}**`);
    lines.push(`- Fallback-default: **${stats.fallback}**`);
    lines.push(`- No-token-match: **${stats.noToken}**`);
    lines.push(`- Missing-path: **${stats.missingPath}**`);
    lines.push('');

    for (const component of (components || [])) {
      const componentName = component.name;
      const key = `${component.category}/${component.name}`;
      const entry = (tokens.componentVariantTokens || {})[key] || { rows: [], status: 'missing-path' };
      const rows = Array.isArray(entry.rows) ? entry.rows : [];
      lines.push(`### ${componentName} (${component.category})`);
      lines.push('');
      lines.push(`Status: \`${entry.status}\``);
      lines.push('');
      const tableRows = rows.map((row) => [
        row.source,
        row.dimension,
        row.variant,
        row.tokens.length ? `\`${row.tokens.join('`, `')}\`` : '_none detected_',
      ]);
      lines.push(tokenTable(tableRows, ['Source', 'Dimension', 'Variant', 'Tokens']));
      lines.push('');
    }
  }

  lines.push('## Consistency Gate Commands');
  lines.push('');
  lines.push('- `npm run check:consistency:report` -> Phase 1 report-only (never fails).');
  lines.push('- `npm run check:consistency:baseline` -> Phase 2 baseline capture/update.');
  lines.push('- `npm run check:consistency` -> Phase 3 CI regression gate against baseline.');
  lines.push('');
  lines.push('## Size Contract Gate Commands');
  lines.push('');
  lines.push('- `npm run check:size-contract` -> CI gate for canonical component size/variant token contracts.');
  lines.push('');

  lines.push('## Structural Spacing Gate Commands');
  lines.push('');
  lines.push('- `npm run check:spacing-structure:report` -> report-only structural spacing audit (missing direct padding, spacer-in-flex-col).');
  lines.push('- `npm run check:spacing-structure` -> CI regression gate against `docs/audits/spacing-structure-baseline-2026-03-03.json`.');
  lines.push('');

  return `${lines.join('\n').trim()}\n`;
}

function generateComponentDesignSpecs() {
  const cssPath = path.join(projectRoot, 'src/styles/globals.css');
  const registryPath = path.join(projectRoot, 'registry.json');
  const pkgPath = path.join(projectRoot, 'package.json');
  const overridePath = path.join(projectRoot, 'docs/component-variant-token-overrides.json');

  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const registry = readJson(registryPath);
  const pkg = readJson(pkgPath);
  const tokens = parseCssTokens(cssContent);

  const components = Array.isArray(registry.components) ? registry.components : [];
  const grouped = groupComponents(components);
  const autoVariantTokenMatrix = collectComponentVariantTokens(components);
  const overrides = readJsonIfExists(overridePath, {});
  const variantTokenMatrix = applyManualOverrides(autoVariantTokenMatrix, overrides);
  const generatedAt = new Date().toISOString();

  const machineData = {
    generatedAt,
    version: pkg.version,
    summary: registry.summary,
    tokens: {
      spacingTokens: tokens.spacingTokens,
      spacingAliases: tokens.spacingAliases,
      halfStepSpacing: tokens.halfStepSpacing,
      typographyTokens: tokens.typographyTokens,
      borderRadiusTokens: tokens.borderRadiusTokens,
      componentVariantTokens: variantTokenMatrix,
    },
    components: grouped,
  };

  const markdown = buildMarkdown({
    version: pkg.version,
    summary: registry.summary,
    grouped,
    tokens: {
      ...tokens,
      componentVariantTokens: variantTokenMatrix,
    },
    generatedAt,
    components,
  });

  const jsonOut = path.join(projectRoot, 'docs/generated/component-design-specs.json');
  const mdOut = path.join(projectRoot, 'docs/component-design-specs.md');

  const jsonChanged = writeIfChanged(jsonOut, `${JSON.stringify(machineData, null, 2)}\n`);
  const mdChanged = writeIfChanged(mdOut, markdown);

  return { jsonOut, mdOut, jsonChanged, mdChanged };
}

if (require.main === module) {
  try {
    const result = generateComponentDesignSpecs();
    console.log('✅ Generated component design specs');
    console.log(`   - ${path.relative(projectRoot, result.jsonOut)} ${result.jsonChanged ? '(updated)' : '(unchanged)'}`);
    console.log(`   - ${path.relative(projectRoot, result.mdOut)} ${result.mdChanged ? '(updated)' : '(unchanged)'}`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Failed to generate component design specs: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { generateComponentDesignSpecs };
