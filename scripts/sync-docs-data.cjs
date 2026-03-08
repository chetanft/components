#!/usr/bin/env node
/**
 * Documentation Sync Script
 *
 * Reads source-of-truth files (globals.css, package.json, registry.json)
 * and generates:
 *   - ft-docs/src/data/design-system.generated.ts
 *   - llms.txt (from template)
 *   - AI_CONTEXT.md (from template)
 *
 * Usage: node scripts/sync-docs-data.cjs
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { parseCssTokens } = require('./lib/parse-css-tokens.cjs');
const { generateComponentDesignSpecs } = require('./generate-component-design-specs.cjs');
const { generateCoverage } = require('./generate-machine-mode-coverage.cjs');
const { generateComponentMachineMetadata } = require('./lib/generate-component-machine-metadata.cjs');

const projectRoot = path.join(__dirname, '..');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  reset: '\x1b[0m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// ── Read sources ──────────────────────────────────────────────

function readSources() {
  const cssPath = path.join(projectRoot, 'src/styles/globals.css');
  const pkgPath = path.join(projectRoot, 'package.json');
  const registryPath = path.join(projectRoot, 'registry.json');

  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

  return { cssContent, pkg, registry };
}

// ── Format helpers ────────────────────────────────────────────

function formatSpacingLines(spacingAliases) {
  // Group into lines of 4
  const entries = Object.entries(spacingAliases);
  const lines = [];
  for (let i = 0; i < entries.length; i += 4) {
    const chunk = entries.slice(i, i + 4);
    lines.push(chunk.map(([k, v]) => `--${k}: ${v}`).join(', '));
  }
  return lines.join('\n');
}

function formatHalfStepLines(halfSteps) {
  const entries = Object.entries(halfSteps);
  return 'Half-steps: ' + entries.map(([k, v]) => `--${k}: ${v}`).join(', ');
}

function formatTypographyLines(typography) {
  const entries = Object.entries(typography);
  const lines = [];
  for (let i = 0; i < entries.length; i += 3) {
    const chunk = entries.slice(i, i + 3);
    lines.push(chunk.map(([k, t]) => {
      const shortName = k.replace('font-size-', '').replace('-rem', '');
      return `text-${shortName}-rem=${t.px}`;
    }).join(', '));
  }
  return lines.join('\n');
}

function formatRadiusLines(radius) {
  return Object.entries(radius).map(([k, v]) => `--${k}=${v}`).join(', ');
}

function formatComponentCountLines(summary) {
  return [
    `total: ${summary.total}`,
    `atoms: ${summary.atoms}`,
    `molecules: ${summary.molecules}`,
    `organisms: ${summary.organisms}`,
    `charts: ${summary.charts}`,
  ].join('\n');
}

// For AI_CONTEXT.md (formatted differently with semicolons and newlines in code blocks)
function formatSpacingBlock(spacingAliases) {
  const entries = Object.entries(spacingAliases);
  const lines = [];
  for (let i = 0; i < entries.length; i += 4) {
    const chunk = entries.slice(i, i + 4);
    lines.push(chunk.map(([k, v]) => `--${k}: ${v};`).join(' '));
  }
  return lines.join('\n');
}

function formatHalfStepBlock(halfSteps) {
  return Object.entries(halfSteps).map(([k, v]) => `--${k}: ${v};`).join(' ');
}

function formatRadiusBlock(radius) {
  return Object.entries(radius).map(([k, v]) => `--${k}: ${v};`).join('\n');
}

function formatTypographyBlock(typography) {
  return Object.entries(typography)
    .map(([k, t]) => `--${k}: ${t.value};   /* ${t.px} */`)
    .join('\n');
}

// ── Generate design-system.generated.ts ───────────────────────

function generateTsDataFile(tokens, version, summary) {
  const now = new Date().toISOString();

  // Build spacing summary for prompt builders
  const spacingSummary = formatSpacingLines(tokens.spacingAliases);
  const halfStepSummary = formatHalfStepLines(tokens.halfStepSpacing);
  const typographySummary = formatTypographyLines(tokens.typographyTokens);
  const radiusSummary = formatRadiusLines(tokens.borderRadiusTokens);

  // Escape backtick strings for embedding in TS template literals
  const escapedCss = tokens.globalCssContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

  const lines = [
    '// AUTO-GENERATED — DO NOT EDIT',
    '// Source: scripts/sync-docs-data.cjs',
    `// Generated: ${now}`,
    '',
    `export const SYSTEM_VERSION = ${JSON.stringify(version)};`,
    `export const COMPONENT_COUNT = ${summary.total};`,
    `export const COMPONENT_SUMMARY = ${JSON.stringify(summary)};`,
    `export const GENERATED_AT = ${JSON.stringify(now)};`,
    '',
    `export const SPACING_TOKENS: Record<string, string> = ${JSON.stringify(tokens.spacingTokens, null, 2)};`,
    '',
    `export const SPACING_ALIASES: Record<string, string> = ${JSON.stringify(tokens.spacingAliases, null, 2)};`,
    '',
    `export const HALF_STEP_SPACING: Record<string, string> = ${JSON.stringify(tokens.halfStepSpacing, null, 2)};`,
    '',
    `export const TYPOGRAPHY_TOKENS: Record<string, { value: string; px: string }> = ${JSON.stringify(tokens.typographyTokens, null, 2)};`,
    '',
    `export const BORDER_RADIUS_TOKENS: Record<string, string> = ${JSON.stringify(tokens.borderRadiusTokens, null, 2)};`,
    '',
    `export const SEMANTIC_COLORS: Record<string, { value: string; resolved: string }> = ${JSON.stringify(tokens.semanticColors, null, 2)};`,
    '',
    `export const GLOBAL_CSS_CONTENT = \`${escapedCss}\`;`,
    '',
    '// Pre-formatted summary strings for machine-readable views',
    `export const SPACING_SUMMARY = ${JSON.stringify(spacingSummary)};`,
    `export const HALF_STEP_SUMMARY = ${JSON.stringify(halfStepSummary)};`,
    `export const TYPOGRAPHY_SUMMARY = ${JSON.stringify(typographySummary)};`,
    `export const RADIUS_SUMMARY = ${JSON.stringify(radiusSummary)};`,
    '',
  ];

  return lines.join('\n');
}

// ── Render templates ──────────────────────────────────────────

function renderTemplate(templatePath, replacements) {
  let content = fs.readFileSync(templatePath, 'utf8');
  for (const [key, value] of Object.entries(replacements)) {
    content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
  }
  return content;
}

// ── Write file if changed ─────────────────────────────────────

function writeIfChanged(filePath, content) {
  const relative = path.relative(projectRoot, filePath);
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, 'utf8');
    if (existing === content) {
      log(`   ✅ ${relative} (unchanged)`, 'green');
      return false;
    }
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  log(`   📝 ${relative} (updated)`, 'cyan');
  return true;
}

// ── Main ──────────────────────────────────────────────────────

function syncDocsData() {
  log('\n🔄 Syncing documentation data from sources...\n', 'bold');

  // Step 1: Read sources
  log('1️⃣  Reading source files...', 'blue');
  const { cssContent, pkg, registry } = readSources();
  const version = pkg.version;
  const summary = registry.summary;
  log(`   Version: ${version}, Components: ${summary.total}`, 'cyan');

  // Step 2: Parse CSS tokens
  log('\n2️⃣  Parsing CSS tokens...', 'blue');
  const tokens = parseCssTokens(cssContent);
  log(`   Spacing: ${Object.keys(tokens.spacingAliases).length} tokens`, 'cyan');
  log(`   Typography: ${Object.keys(tokens.typographyTokens).length} sizes`, 'cyan');
  log(`   Border radius: ${Object.keys(tokens.borderRadiusTokens).length} values`, 'cyan');
  log(`   Color scales: ${Object.keys(tokens.colorScales).length} scales`, 'cyan');

  // Step 3: Generate TypeScript data file
  log('\n3️⃣  Generating TypeScript data file...', 'blue');
  const tsContent = generateTsDataFile(tokens, version, summary);
  const tsPath = path.join(projectRoot, 'ft-docs/src/data/design-system.generated.ts');
  writeIfChanged(tsPath, tsContent);

  // Step 4: Render llms.txt from template
  log('\n4️⃣  Generating llms.txt...', 'blue');
  const llmsTemplate = path.join(projectRoot, 'docs/templates/llms.txt.template');
  const llmsReplacements = {
    VERSION: version,
    SPACING_LINES: formatSpacingLines(tokens.spacingAliases),
    HALF_STEP_LINES: formatHalfStepLines(tokens.halfStepSpacing),
    TYPOGRAPHY_LINES: formatTypographyLines(tokens.typographyTokens),
    RADIUS_LINES: formatRadiusLines(tokens.borderRadiusTokens),
    COMPONENT_COUNT_LINES: formatComponentCountLines(summary),
  };
  const llmsContent = renderTemplate(llmsTemplate, llmsReplacements);
  writeIfChanged(path.join(projectRoot, 'llms.txt'), llmsContent);

  // Also copy llms.txt into ft-docs/public so Netlify serves it
  log('   Copying llms.txt to ft-docs/public...', 'cyan');
  writeIfChanged(path.join(projectRoot, 'ft-docs/public/llms.txt'), llmsContent);
  writeIfChanged(path.join(projectRoot, 'ft-docs/public/.well-known/llms.txt'), llmsContent);

  // Step 5: Render AI_CONTEXT.md from template
  log('\n5️⃣  Generating AI_CONTEXT.md...', 'blue');
  const aiTemplate = path.join(projectRoot, 'docs/templates/AI_CONTEXT.md.template');
  const today = new Date().toISOString().split('T')[0];
  const aiReplacements = {
    VERSION: version,
    DATE: today,
    SPACING_BLOCK: formatSpacingBlock(tokens.spacingAliases),
    HALF_STEP_BLOCK: formatHalfStepBlock(tokens.halfStepSpacing),
    TYPOGRAPHY_BLOCK: formatTypographyBlock(tokens.typographyTokens),
    RADIUS_BLOCK: formatRadiusBlock(tokens.borderRadiusTokens),
  };
  const aiContent = renderTemplate(aiTemplate, aiReplacements);
  writeIfChanged(path.join(projectRoot, 'AI_CONTEXT.md'), aiContent);

  // Step 6: Generate component design specs (JSON + Markdown)
  log('\n6️⃣  Generating component design specs...', 'blue');
  const specResult = generateComponentDesignSpecs();
  log(
    `   ${path.relative(projectRoot, specResult.jsonOut)} ${specResult.jsonChanged ? '(updated)' : '(unchanged)'}`,
    'cyan'
  );
  log(
    `   ${path.relative(projectRoot, specResult.mdOut)} ${specResult.mdChanged ? '(updated)' : '(unchanged)'}`,
    'cyan'
  );

  log('\n7️⃣  Generating component machine metadata...', 'blue');
  const machineMetadataResult = generateComponentMachineMetadata(projectRoot);
  log(`   ${path.relative(projectRoot, machineMetadataResult.tsPath)} (${machineMetadataResult.count} components)`, 'cyan');

  log('\n8️⃣  Generating machine mode coverage...', 'blue');
  const coverageResult = generateCoverage();
  log(`   Covered: ${coverageResult.summary.covered}/${coverageResult.summary.total}`, 'cyan');

  log('\n✅ Documentation sync complete!', 'green');
  return { version, summary };
}

// Run if called directly
if (require.main === module) {
  try {
    syncDocsData();
    process.exit(0);
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    console.error(error.stack);
    process.exit(1);
  }
}

module.exports = { syncDocsData };
