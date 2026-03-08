#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function read(relPath) {
  return fs.readFileSync(path.join(projectRoot, relPath), 'utf8');
}

/**
 * Extract the content of a top-level CSS block that starts with `selector {`
 * and return all `--custom-prop: value;` definitions inside it.
 * Returns a Set of property names (e.g. "--primary-900").
 */
function extractTokensFromBlock(css, selector) {
  // Build a regex that finds the selector at the start of a line
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const startRe = new RegExp('(?:^|\\n)' + escapedSelector + '\\s*\\{');
  const match = startRe.exec(css);
  if (!match) return new Set();

  // Walk forward from the opening brace to find matching closing brace
  const startIdx = css.indexOf('{', match.index) + 1;
  let depth = 1;
  let i = startIdx;
  while (i < css.length && depth > 0) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') depth--;
    i++;
  }
  const blockContent = css.slice(startIdx, i - 1);

  const tokens = new Set();
  const propRe = /^\s*(--[\w-]+)\s*:/gm;
  let m;
  while ((m = propRe.exec(blockContent)) !== null) {
    tokens.add(m[1]);
  }
  return tokens;
}

/**
 * Scan component files for hardcoded hex colors outside comments/imports.
 * Returns an array of { file, line, match } objects.
 */
function scanForHardcodedHex(dirs) {
  const hits = [];
  for (const dir of dirs) {
    const absDir = path.join(projectRoot, dir);
    if (!fs.existsSync(absDir)) continue;
    const files = fs.readdirSync(absDir).filter((f) => /\.tsx?$/.test(f));
    for (const file of files) {
      const absFile = path.join(absDir, file);
      const lines = fs.readFileSync(absFile, 'utf8').split('\n');
      for (let idx = 0; idx < lines.length; idx++) {
        const line = lines[idx];
        // Skip import lines
        if (/^\s*import\s/.test(line)) continue;
        // Skip full-line comments
        if (/^\s*\/\//.test(line)) continue;
        if (/^\s*\/?\*/.test(line)) continue;
        // Look for hex color patterns (#RGB, #RRGGBB, #RRGGBBAA)
        const hexRe = /#(?:[0-9a-fA-F]{3,4}){1,2}\b/g;
        let hm;
        while ((hm = hexRe.exec(line)) !== null) {
          // Skip if it appears inside a comment on this line
          const before = line.slice(0, hm.index);
          if (before.includes('//') || before.includes('/*')) continue;
          hits.push({
            file: path.relative(projectRoot, absFile),
            line: idx + 1,
            match: hm[0],
          });
        }
      }
    }
  }
  return hits;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function checkThemeTokenConsistency() {
  const css = read('src/styles/globals.css');

  const themes = {
    ':root': extractTokensFromBlock(css, ':root'),
    '.dark': extractTokensFromBlock(css, '.dark'),
    '.night': extractTokensFromBlock(css, '.night'),
  };

  const themeNames = Object.keys(themes);
  const allTokens = new Set();
  for (const tokens of Object.values(themes)) {
    for (const t of tokens) allTokens.add(t);
  }

  const failures = [];

  // Theme-invariant token prefixes — these are intentionally only in :root
  // and do not need dark/night overrides (typography, spacing, layout, z-index, etc.)
  const themeInvariantPatterns = [
    /^--font-/,
    /^--text-(xs|sm|base|md|lg|xl|2xl|3xl|4xl|5xl|6xl)/,
    /^--spacing-/,
    /^--radius-/,
    /^--z-index-/,
    /^--line-height-/,
    /^--letter-spacing-/,
    /^--lh-/,               // line-height aliases
    /^--transition-/,
    /^--shadow-/,
    /^--badge-border-radius$/,
    /^--badge-font-size$/,
    /^--badge-font-weight$/,
    /^--color-/,            // alias bridge tokens
    /^--radio-(size|gap)$/,
    /^--component-/,        // component sizing/structure tokens
    /^--x\d+$/,             // spacing scale (x0-x38)
    /^--table-(header-height|header-padding|cell-padding)/,
    /^--breakpoint-/,
    /^--grid-/,
    /^--container-/,
    /^--primary-bg-subtle$/, // structural alias
  ];

  function isThemeInvariant(token) {
    return themeInvariantPatterns.some((p) => p.test(token));
  }

  // ---- (a) Completeness: every theme-variant token in every theme ----
  const missingByTheme = {};
  for (const name of themeNames) {
    const missing = [];
    for (const token of allTokens) {
      if (isThemeInvariant(token)) continue;
      if (!themes[name].has(token)) missing.push(token);
    }
    missingByTheme[name] = missing;
    if (missing.length > 0) {
      failures.push({
        check: 'completeness',
        theme: name,
        count: missing.length,
        tokens: missing,
      });
    }
  }

  // ---- (b-d) Category-specific checks ----
  const categories = [
    { name: 'button', pattern: /^--button-/ },
    { name: 'badge', pattern: /^--badge-/ },
    {
      name: 'form',
      pattern: /^--(surface|input|placeholder|helper|border|focus)/,
    },
  ];

  for (const cat of categories) {
    const categoryTokens = [...allTokens].filter((t) => cat.pattern.test(t));
    for (const name of themeNames) {
      const missing = categoryTokens.filter((t) => !themes[name].has(t));
      if (missing.length > 0) {
        failures.push({
          check: `${cat.name}-tokens`,
          theme: name,
          count: missing.length,
          tokens: missing,
        });
      }
    }
  }

  // ---- (e) No hardcoded hex in protected component files ----
  const protectedDirs = [
    'src/components/atoms/Button',
    'src/components/atoms/Badge',
    'src/components/atoms/Input',
  ];
  const hexHits = scanForHardcodedHex(protectedDirs);
  if (hexHits.length > 0) {
    failures.push({
      check: 'no-hardcoded-hex',
      count: hexHits.length,
      hits: hexHits,
    });
  }

  return { themes, allTokens, failures, hexHits, missingByTheme };
}

function printReport(result) {
  const { themes, allTokens, failures, hexHits, missingByTheme } = result;
  const themeNames = Object.keys(themes);

  console.log('');
  console.log('=== Theme Token Consistency Report ===');
  console.log('');

  // Summary table
  console.log('Theme          | Tokens | Missing');
  console.log('-------------- | ------ | -------');
  for (const name of themeNames) {
    const count = themes[name].size;
    const missing = missingByTheme[name].length;
    console.log(
      `${name.padEnd(14)} | ${String(count).padStart(6)} | ${String(missing).padStart(7)}`
    );
  }
  console.log(`${'(union)'.padEnd(14)} | ${String(allTokens.size).padStart(6)} |`);
  console.log('');

  // Completeness details
  for (const name of themeNames) {
    if (missingByTheme[name].length > 0) {
      console.log(`Missing in ${name} (${missingByTheme[name].length}):`);
      for (const t of missingByTheme[name].slice(0, 20)) {
        console.log(`  - ${t}`);
      }
      if (missingByTheme[name].length > 20) {
        console.log(`  ... and ${missingByTheme[name].length - 20} more`);
      }
      console.log('');
    }
  }

  // Category failures
  const catFailures = failures.filter(
    (f) => f.check !== 'completeness' && f.check !== 'no-hardcoded-hex'
  );
  if (catFailures.length > 0) {
    console.log('Category token gaps:');
    for (const f of catFailures) {
      console.log(`  [${f.check}] ${f.theme}: missing ${f.count} token(s)`);
      for (const t of f.tokens.slice(0, 10)) {
        console.log(`    - ${t}`);
      }
      if (f.tokens.length > 10) {
        console.log(`    ... and ${f.tokens.length - 10} more`);
      }
    }
    console.log('');
  }

  // Hardcoded hex
  if (hexHits.length > 0) {
    console.log(`Hardcoded hex colors in protected files (${hexHits.length}):`);
    for (const h of hexHits.slice(0, 20)) {
      console.log(`  ${h.file}:${h.line}  ${h.match}`);
    }
    if (hexHits.length > 20) {
      console.log(`  ... and ${hexHits.length - 20} more`);
    }
    console.log('');
  }

  // Final status
  if (failures.length === 0) {
    console.log('All checks passed.');
  } else {
    console.log(`${failures.length} check(s) failed.`);
  }
  console.log('');
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

if (require.main === module) {
  const strict = process.argv.includes('--strict');
  const result = checkThemeTokenConsistency();
  printReport(result);
  if (strict && result.failures.length > 0) {
    console.error(
      `Theme token consistency failed: ${result.failures.length} check(s) failed.`
    );
    process.exit(1);
  }
}

module.exports = { checkThemeTokenConsistency };
