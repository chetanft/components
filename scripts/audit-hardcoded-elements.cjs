#!/usr/bin/env node

/**
 * Audit: Find hardcoded values and rebuilt elements
 * 
 * Finds:
 * 1. Hardcoded font sizes (fontSize: '16px', etc.)
 * 2. Hardcoded font families (fontFamily: 'Inter')
 * 3. Components that build own dropdowns instead of using DropdownMenu
 * 4. Components that don't use design tokens
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'components');

const results = {
  hardcodedFontSizes: [],
  hardcodedFontFamilies: [],
  customDropdowns: [],
  hardcodedColors: [],
};

// Patterns to find
const patterns = {
  // Hardcoded font sizes in style objects
  fontSizeStyle: /fontSize:\s*['"]?(\d+px)['"]?/g,
  // Hardcoded font families
  fontFamilyHardcoded: /fontFamily:\s*['"](?!var\()([^'"]+)['"]/g,
  // Custom portal/dropdown implementations
  customPortal: /createPortal\(|ReactDOM\.createPortal/g,
  // Hardcoded hex colors
  hexColors: /#[0-9A-Fa-f]{3,6}(?![0-9A-Fa-f])/g,
  // Hardcoded rgb colors
  rgbColors: /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/g,
};

function analyzeFile(filePath, relativePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  
  // Skip test and story files
  if (fileName.includes('.test.') || fileName.includes('.stories.') || fileName.includes('.spec.')) {
    return;
  }
  
  // Check for hardcoded font sizes
  const fontSizeMatches = content.matchAll(patterns.fontSizeStyle);
  for (const match of fontSizeMatches) {
    results.hardcodedFontSizes.push({
      file: relativePath,
      value: match[1],
      context: content.substring(Math.max(0, match.index - 50), match.index + 80).replace(/\n/g, ' ').trim(),
    });
  }
  
  // Check for hardcoded font families (not using var())
  const fontFamilyMatches = content.matchAll(patterns.fontFamilyHardcoded);
  for (const match of fontFamilyMatches) {
    if (!match[1].includes('var(')) {
      results.hardcodedFontFamilies.push({
        file: relativePath,
        value: match[1],
      });
    }
  }
  
  // Check for custom dropdown implementations (excluding the actual Dropdown component)
  if (!relativePath.includes('Dropdown/') && !relativePath.includes('Select/') && 
      !relativePath.includes('Modal/') && !relativePath.includes('Drawer/')) {
    const portalMatches = content.match(patterns.customPortal);
    if (portalMatches) {
      // Check if it's building a dropdown-like UI
      if (content.includes('dropdown') || content.includes('menu') || content.includes('options') ||
          content.includes('overflow-y-auto') || content.includes('z-[999')) {
        results.customDropdowns.push({
          file: relativePath,
          portalCount: portalMatches.length,
          likelyDropdown: true,
        });
      }
    }
  }
  
  // Check for hardcoded colors (excluding CSS variable definitions)
  if (!relativePath.includes('globals.css') && !relativePath.includes('design-tokens')) {
    const hexMatches = content.matchAll(patterns.hexColors);
    for (const match of hexMatches) {
      // Skip common non-color uses
      if (match.index > 0) {
        const before = content.substring(Math.max(0, match.index - 20), match.index);
        // Skip if it's in a comment or console log
        if (before.includes('//') || before.includes('console')) continue;
        // Skip if it's a variable reference already
        if (before.includes('var(--')) continue;
        
        results.hardcodedColors.push({
          file: relativePath,
          value: match[0],
        });
      }
    }
  }
}

function scanDirectory(dir, basePath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);
    
    if (entry.isDirectory()) {
      scanDirectory(fullPath, relativePath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      analyzeFile(fullPath, relativePath);
    }
  }
}

console.log('🔍 Auditing for hardcoded values and rebuilt elements...\n');
scanDirectory(componentsDir);

// Report results
console.log('='.repeat(60));
console.log('📊 AUDIT RESULTS');
console.log('='.repeat(60));

// Hardcoded font sizes
console.log('\n🔤 HARDCODED FONT SIZES (should use CSS variables or tokens)');
console.log('-'.repeat(60));
if (results.hardcodedFontSizes.length === 0) {
  console.log('✅ None found');
} else {
  const byFile = {};
  for (const item of results.hardcodedFontSizes) {
    if (!byFile[item.file]) byFile[item.file] = [];
    byFile[item.file].push(item.value);
  }
  for (const [file, values] of Object.entries(byFile)) {
    console.log(`\n📁 ${file}`);
    console.log(`   Values: ${[...new Set(values)].join(', ')}`);
  }
  console.log(`\n   Total: ${results.hardcodedFontSizes.length} occurrences in ${Object.keys(byFile).length} files`);
}

// Custom dropdowns
console.log('\n\n📋 CUSTOM DROPDOWN IMPLEMENTATIONS (should use DropdownMenu)');
console.log('-'.repeat(60));
if (results.customDropdowns.length === 0) {
  console.log('✅ None found');
} else {
  for (const item of results.customDropdowns) {
    console.log(`\n📁 ${item.file}`);
    console.log(`   Portal usage: ${item.portalCount}x`);
    console.log(`   ⚠️  Should consider using DropdownMenu component`);
  }
  console.log(`\n   Total: ${results.customDropdowns.length} components with custom dropdowns`);
}

// Hardcoded colors
console.log('\n\n🎨 HARDCODED COLORS (should use CSS variables)');
console.log('-'.repeat(60));
if (results.hardcodedColors.length === 0) {
  console.log('✅ None found');
} else {
  const byFile = {};
  for (const item of results.hardcodedColors) {
    if (!byFile[item.file]) byFile[item.file] = new Set();
    byFile[item.file].add(item.value);
  }
  const sorted = Object.entries(byFile).sort((a, b) => b[1].size - a[1].size);
  for (const [file, values] of sorted.slice(0, 15)) {
    console.log(`\n📁 ${file}`);
    console.log(`   Colors: ${[...values].slice(0, 5).join(', ')}${values.size > 5 ? '...' : ''}`);
  }
  if (sorted.length > 15) {
    console.log(`\n   ... and ${sorted.length - 15} more files`);
  }
  console.log(`\n   Total: ${results.hardcodedColors.length} hardcoded colors in ${sorted.length} files`);
}

// Summary
console.log('\n\n' + '='.repeat(60));
console.log('📋 SUMMARY');
console.log('='.repeat(60));
console.log(`\n   Hardcoded font sizes:    ${results.hardcodedFontSizes.length}`);
console.log(`   Custom dropdowns:        ${results.customDropdowns.length}`);
console.log(`   Hardcoded colors:        ${results.hardcodedColors.length}`);
console.log('\n');
