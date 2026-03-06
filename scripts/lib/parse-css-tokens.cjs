#!/usr/bin/env node
/**
 * CSS Token Parser
 *
 * Parses :root, .dark, and .night blocks from globals.css
 * and extracts structured design token data.
 *
 * Usage: const { parseCssTokens } = require('./parse-css-tokens.cjs');
 */

'use strict';

/**
 * Extract a CSS block by selector (e.g. ':root', '.dark', '.night')
 * Returns the content between the outermost { }
 */
function extractBlock(css, selector) {
  // Match the selector followed by { ... } handling nested braces
  const selectorEscaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`${selectorEscaped}\\s*\\{`, 'g');
  const match = regex.exec(css);
  if (!match) return '';

  let depth = 1;
  let i = match.index + match[0].length;
  const start = i;
  while (i < css.length && depth > 0) {
    if (css[i] === '{') depth++;
    if (css[i] === '}') depth--;
    i++;
  }
  return css.slice(start, i - 1);
}

/**
 * Parse CSS custom properties from a block string.
 * Returns a Map of { varName -> value }
 */
function parseProperties(blockContent) {
  const props = new Map();
  const regex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = regex.exec(blockContent)) !== null) {
    props.set(m[1], m[2].trim());
  }
  return props;
}

/**
 * Resolve a var() reference to its final value within a property map.
 * e.g. "var(--primary-700)" => "#434f64"
 */
function resolveVar(value, props, depth = 0) {
  if (depth > 5) return value;
  const varMatch = value.match(/var\(--([\w-]+)\)/);
  if (!varMatch) return value;
  const refName = varMatch[1];
  const refValue = props.get(refName);
  if (!refValue) return value;
  return resolveVar(refValue, props, depth + 1);
}

const COLOR_SCALE_NAMES = ['primary', 'secondary', 'tertiary', 'neutral', 'positive', 'warning', 'danger'];
const SHADES = ['900', '800', '700', '600', '500', '400', '300', '200', '100', '0'];

/**
 * Main parser function.
 * @param {string} cssContent - Raw CSS file content
 * @returns {object} Structured token data
 */
function parseCssTokens(cssContent) {
  const rootBlock = extractBlock(cssContent, ':root');
  const darkBlock = extractBlock(cssContent, '.dark');
  const nightBlock = extractBlock(cssContent, '.night');

  const rootProps = parseProperties(rootBlock);
  const darkProps = parseProperties(darkBlock);
  const nightProps = parseProperties(nightBlock);

  // --- Color Scales ---
  const colorScales = {};
  for (const scale of COLOR_SCALE_NAMES) {
    colorScales[scale] = {};
    for (const shade of SHADES) {
      const key = `${scale}-${shade}`;
      if (rootProps.has(key)) {
        colorScales[scale][shade] = rootProps.get(key);
      }
    }
  }

  // --- Semantic Colors ---
  const semanticColorNames = [
    'primary', 'secondary', 'tertiary',
    'border-primary', 'border-secondary',
    'bg-primary', 'bg-secondary', 'bg-tertiary',
    'text-primary', 'text-secondary', 'text-tertiary', 'text-placeholder', 'text-disabled',
    'color-divider', 'color-primary-light', 'primary-bg-subtle',
    'critical', 'critical-dark', 'critical-light',
    'warning', 'warning-dark', 'warning-light',
    'positive', 'positive-dark', 'positive-light',
    'neutral', 'neutral-dark', 'neutral-light',
  ];
  const semanticColors = {};
  for (const name of semanticColorNames) {
    if (rootProps.has(name)) {
      semanticColors[name] = {
        value: rootProps.get(name),
        resolved: resolveVar(rootProps.get(name), rootProps),
      };
    }
  }

  // --- Spacing (legacy --x* names with their px values) ---
  const spacingTokens = {};
  const spacingAliases = {};
  for (const [key, value] of rootProps) {
    // Legacy --x0 through --x38
    if (/^x\d+$/.test(key)) {
      spacingTokens[key] = value;
    }
    // Canonical --spacing-x* aliases
    if (/^spacing-x\d+$/.test(key)) {
      // Resolve var(--xN) to the actual px value
      spacingAliases[key] = resolveVar(value, rootProps);
    }
  }

  // --- Half-step spacing ---
  const halfStepSpacing = {};
  for (const [key, value] of rootProps) {
    if (/^spacing-x\d+-\d+$/.test(key)) {
      halfStepSpacing[key] = value;
    }
  }

  // --- Typography ---
  const typographyCommentPx = {};
  const typographyCommentRegex = /--(font-size-[\w-]+-rem)\s*:\s*[\d.]+rem\s*;\s*\/\*\s*([\d.]+)px/gm;
  let typographyCommentMatch;
  while ((typographyCommentMatch = typographyCommentRegex.exec(rootBlock)) !== null) {
    typographyCommentPx[typographyCommentMatch[1]] = `${typographyCommentMatch[2]}px`;
  }

  const typographyTokens = {};
  for (const [key, value] of rootProps) {
    if (/^font-size-[\w-]+-rem$/.test(key)) {
      // Calculate px from rem when no explicit pixel comment exists.
      const remMatch = value.match(/([\d.]+)rem/);
      let pxValue = '';
      if (typographyCommentPx[key]) {
        pxValue = typographyCommentPx[key];
      } else if (remMatch) {
        pxValue = Math.round(parseFloat(remMatch[1]) * 14) + 'px';
      }
      typographyTokens[key] = {
        value: value.split('/')[0].trim(), // Just the rem value
        px: pxValue,
      };
    }
  }

  // --- Border Radius ---
  const borderRadiusTokens = {};
  for (const [key, value] of rootProps) {
    if (/^radius-/.test(key)) {
      borderRadiusTokens[key] = value;
    }
  }

  // --- Build the full CSS content for download (stripped @tailwind) ---
  // Keep everything from the first comment block through the end
  let globalCssContent = cssContent;
  // Strip @tailwind directives and @custom-variant for the downloadable version
  globalCssContent = globalCssContent
    .replace(/@tailwind\s+\w+;\s*/g, '')
    .replace(/@custom-variant[^;]+;\s*/g, '')
    .trim();

  // Prepend usage instructions
  globalCssContent = `/* =====================================================
   FT DESIGN SYSTEM - COMPREHENSIVE GLOBAL CSS
   =====================================================

   Copy this file to your project and import it in your root layout/app.
   Usage: import './globals.css' or import '@/styles/globals.css'
*/

@tailwind base;
@tailwind components;
@tailwind utilities;

@custom-variant dark (&:is(.dark *));

${globalCssContent}`;

  return {
    colorScales,
    semanticColors,
    spacingTokens,
    spacingAliases,
    halfStepSpacing,
    typographyTokens,
    borderRadiusTokens,
    globalCssContent,
    darkProps: Object.fromEntries(darkProps),
    nightProps: Object.fromEntries(nightProps),
  };
}

module.exports = { parseCssTokens };
