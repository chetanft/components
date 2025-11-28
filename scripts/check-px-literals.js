#!/usr/bin/env node

/**
 * PX Literal Detection Script
 *
 * This script scans the codebase for pixel literals that should be replaced with FT design tokens.
 * It allows certain patterns (like 1px borders) but fails the build for other px values.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Checking for px literals in the codebase...');

// Allowed px patterns (these are OK to keep)
const ALLOWED_PATTERNS = [
  /1px\s+solid/,  // 1px borders
  /1px\s*\]/,     // 1px in arbitrary values
  /border-\[1px/, // 1px border classes
  /border-width.*1px/, // 1px border widths
  /box-shadow.*1px/, // 1px in box shadows
  /1px\s+inset/, // 1px inset shadows
];

// Files/directories to exclude from checking
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /dist/,
  /build/,
  /\.next/,
  /coverage/,
  /scripts/, // Exclude this script itself
  /.*\.test\.tsx?$/, // Exclude test files
  /.*\.stories\.tsx?$/, // Exclude story files (they may have demo px values)
];

try {
  // Run grep to find px literals
  const output = execSync('grep -r "[0-9]\\+px" src/ --include="*.ts" --include="*.tsx" --line-number || true', {
    encoding: 'utf8',
    stdio: 'pipe'
  });

  const lines = output.trim() ? output.trim().split('\n').filter(line => line.trim()) : [];

  let violations = [];

  for (const line of lines) {
    const [filePath, lineNum, ...contentParts] = line.split(':');
    const content = contentParts.join(':');

    // Skip excluded files
    if (EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath))) {
      continue;
    }

    // Check if this matches allowed patterns
    const isAllowed = ALLOWED_PATTERNS.some(pattern => pattern.test(content));

    if (!isAllowed) {
      violations.push({
        file: filePath,
        line: lineNum,
        content: content.trim()
      });
    }
  }

  if (violations.length > 0) {
    console.error('❌ Found px literals that should be replaced with FT design tokens:');
    console.error('');

    violations.forEach(({ file, line, content }) => {
      console.error(`  ${file}:${line}`);
      console.error(`    ${content}`);
      console.error('');
    });

    console.error('💡 Replace these with appropriate FT design tokens:');
    console.error('  - Spacing: var(--spacing-xN)');
    console.error('  - Widths: calc(var(--spacing-xN) * multiplier)');
    console.error('  - Heights: var(--component-height-*)');
    console.error('  - Borders: 1px is allowed, but consider var(--border-width)');
    console.error('');
    console.error('If this is a legitimate exception, add the pattern to ALLOWED_PATTERNS in scripts/check-px-literals.js');

    process.exit(1);
  } else {
    console.log('✅ No px literal violations found!');
  }

} catch (error) {
  // If rg exits with code 1, it means no matches found (which is good)
  if (error.status === 1) {
    console.log('✅ No px literals found in the codebase!');
  } else {
    console.error('❌ Error running px literal check:', error.message);
    process.exit(1);
  }
}
