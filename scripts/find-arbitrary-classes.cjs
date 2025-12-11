#!/usr/bin/env node

/**
 * Find Arbitrary Tailwind Classes
 * 
 * Scans component files for arbitrary Tailwind value classes like:
 * - bg-[var(--x)]
 * - text-[var(--x)]
 * - border-[var(--x)]
 * 
 * These should be replaced with theme extension classes.
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'components');

// Patterns to find
const patterns = [
  /bg-\[var\(--[^\]]+\)\]/g,
  /text-\[var\(--[^\]]+\)\]/g,
  /border-\[var\(--[^\]]+\)\]/g,
  /ring-\[var\(--[^\]]+\)\]/g,
  /shadow-\[var\(--[^\]]+\)\]/g,
  /p[xytblr]?-\[var\(--[^\]]+\)\]/g,
  /m[xytblr]?-\[var\(--[^\]]+\)\]/g,
  /gap-\[var\(--[^\]]+\)\]/g,
  /w-\[var\(--[^\]]+\)\]/g,
  /h-\[var\(--[^\]]+\)\]/g,
  /rounded-\[var\(--[^\]]+\)\]/g,
];

const results = [];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = [];
  
  for (const pattern of patterns) {
    const found = content.match(pattern);
    if (found) {
      matches.push(...found);
    }
  }
  
  if (matches.length > 0) {
    results.push({
      file: path.relative(process.cwd(), filePath),
      matches: [...new Set(matches)], // Unique matches
      count: matches.length,
    });
  }
}

function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.name.endsWith('.tsx') && !entry.name.includes('.stories.') && !entry.name.includes('.test.')) {
      scanFile(fullPath);
    }
  }
}

console.log('🔍 Scanning for arbitrary Tailwind classes...\n');
scanDirectory(componentsDir);

// Sort by count
results.sort((a, b) => b.count - a.count);

if (results.length === 0) {
  console.log('✅ No arbitrary Tailwind classes found!');
} else {
  console.log(`Found ${results.length} files with arbitrary classes:\n`);
  
  let totalMatches = 0;
  for (const result of results) {
    console.log(`📁 ${result.file} (${result.count} occurrences)`);
    for (const match of result.matches.slice(0, 5)) {
      console.log(`   ${match}`);
    }
    if (result.matches.length > 5) {
      console.log(`   ... and ${result.matches.length - 5} more`);
    }
    console.log('');
    totalMatches += result.count;
  }
  
  console.log('─'.repeat(50));
  console.log(`Total: ${totalMatches} occurrences in ${results.length} files`);
  console.log('\n💡 Replace these with theme extension classes from tailwind-preset.js');
  console.log('   Example: bg-[var(--primary-700)] → bg-primary-700');
}
