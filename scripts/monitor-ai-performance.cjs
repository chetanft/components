#!/usr/bin/env node

/**
 * Performance monitoring script for FT Design System AI architecture
 */

const fs = require('fs');
const path = require('path');

console.log('📊 FT Design System AI Performance Monitor\n');

// Bundle size analysis
function analyzeBundleSizes() {
  console.log('🔍 Bundle Size Analysis');
  console.log('========================');
  
  const files = [
    { name: 'Core Bundle (CJS)', path: './dist/index.js' },
    { name: 'Core Bundle (ESM)', path: './dist/index.esm.js' },
    { name: 'Core Bundle (UMD)', path: './dist/index.umd.js' },
    { name: 'AI Bundle (CJS)', path: './dist/ai/index.js' },
    { name: 'AI Bundle (ESM)', path: './dist/ai/index.esm.js' },
    { name: 'Styles', path: './dist/styles.css' },
    { name: 'Core Types', path: './dist/index.d.ts' },
    { name: 'AI Types', path: './dist/ai/index.d.ts' },
  ];
  
  const sizes = {};
  
  files.forEach(file => {
    try {
      const stats = fs.statSync(file.path);
      const sizeKB = Math.round(stats.size / 1024);
      sizes[file.name] = sizeKB;
      console.log(`${file.name.padEnd(20)} ${sizeKB.toString().padStart(6)}KB`);
    } catch (error) {
      console.log(`${file.name.padEnd(20)} ${' MISSING'.padStart(6)}`);
    }
  });
  
  console.log('\n📈 Bundle Comparison:');
  if (sizes['Core Bundle (ESM)'] && sizes['AI Bundle (ESM)']) {
    const overhead = sizes['AI Bundle (ESM)'] - sizes['Core Bundle (ESM)'];
    const overheadPercent = ((overhead / sizes['Core Bundle (ESM)']) * 100).toFixed(1);
    console.log(`AI Protection Overhead: ${overhead}KB (${overheadPercent}%)`);
  }
  
  return sizes;
}

// Performance benchmarks
function runPerformanceBenchmarks() {
  console.log('\n⚡ Performance Benchmarks');
  console.log('==========================');
  
  try {
    // Test AI utilities performance (if available)
    const aiUtilsPath = './dist/ai/index.js';
    if (fs.existsSync(aiUtilsPath)) {
      console.log('✅ AI utilities available for testing');
      
      // Simulate class filtering performance
      const testCases = [
        'h-10 bg-[#123456] w-full',
        'h-10 bg-[#123456] w-full flex items-center rounded-lg px-4 py-2',
        'h-10 bg-[#123456] w-full flex items-center rounded-lg px-4 py-2 text-white font-bold shadow-lg border-2 border-solid',
      ];
      
      console.log('🧪 Simulated filtering performance:');
      testCases.forEach((testCase, index) => {
        const start = process.hrtime.bigint();
        // Simulate filtering logic
        const filtered = testCase.split(' ').filter(cls => 
          !cls.match(/^h-\d+$/) && 
          !cls.match(/^bg-\[#/) && 
          !cls.match(/^rounded/)
        ).join(' ');
        const end = process.hrtime.bigint();
        const duration = Number(end - start) / 1000000; // Convert to milliseconds
        
        console.log(`  Test ${index + 1}: ${duration.toFixed(3)}ms (${testCase.length} chars)`);
      });
    } else {
      console.log('⚠️  AI utilities not built yet');
    }
  } catch (error) {
    console.log('❌ Performance benchmark failed:', error.message);
  }
}

// Type definitions analysis
function analyzeTypeDefinitions() {
  console.log('\n📝 TypeScript Definitions Analysis');
  console.log('===================================');
  
  const typeFiles = [
    { name: 'Core Types', path: './dist/index.d.ts' },
    { name: 'AI Types', path: './dist/ai/index.d.ts' },
  ];
  
  typeFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file.path, 'utf8');
      const lines = content.split('\n').length;
      const exports = (content.match(/export/g) || []).length;
      const interfaces = (content.match(/interface/g) || []).length;
      const types = (content.match(/type\s+\w+/g) || []).length;
      
      console.log(`${file.name}:`);
      console.log(`  Lines: ${lines}`);
      console.log(`  Exports: ${exports}`);
      console.log(`  Interfaces: ${interfaces}`);
      console.log(`  Type aliases: ${types}`);
      console.log('');
    } catch (error) {
      console.log(`${file.name}: Not found`);
    }
  });
}

// Package.json validation
function validatePackageConfig() {
  console.log('📦 Package Configuration Validation');
  console.log('====================================');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    
    // Check exports
    const exports = packageJson.exports;
    if (exports) {
      console.log('✅ Package exports configured:');
      Object.keys(exports).forEach(key => {
        console.log(`  ${key} → ${exports[key].import || exports[key]}`);
      });
    } else {
      console.log('❌ Package exports not configured');
    }
    
    // Check scripts
    const scripts = packageJson.scripts;
    const aiScripts = Object.keys(scripts).filter(key => key.includes('ai'));
    if (aiScripts.length > 0) {
      console.log('\n✅ AI-related scripts:');
      aiScripts.forEach(script => {
        console.log(`  ${script}: ${scripts[script]}`);
      });
    }
    
    // Check dependencies
    const deps = packageJson.dependencies || {};
    const devDeps = packageJson.devDependencies || {};
    const totalDeps = Object.keys(deps).length + Object.keys(devDeps).length;
    
    console.log(`\n📊 Dependencies: ${Object.keys(deps).length} runtime, ${Object.keys(devDeps).length} dev (${totalDeps} total)`);
    
  } catch (error) {
    console.log('❌ Package.json validation failed:', error.message);
  }
}

// Build artifacts validation
function validateBuildArtifacts() {
  console.log('\n🏗️  Build Artifacts Validation');
  console.log('==============================');
  
  const requiredFiles = [
    './dist/index.js',
    './dist/index.esm.js',
    './dist/index.d.ts',
    './dist/ai/index.js',
    './dist/ai/index.esm.js',
    './dist/ai/index.d.ts',
    './dist/styles.css',
  ];
  
  let allPresent = true;
  
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} (missing)`);
      allPresent = false;
    }
  });
  
  if (allPresent) {
    console.log('\n🎉 All required build artifacts present!');
  } else {
    console.log('\n⚠️  Some build artifacts are missing. Run `npm run build` first.');
  }
  
  return allPresent;
}

// Generate performance report
function generateReport(sizes) {
  console.log('\n📋 Performance Report Summary');
  console.log('==============================');
  
  const timestamp = new Date().toISOString();
  const report = {
    timestamp,
    bundleSizes: sizes,
    recommendations: []
  };
  
  // Add recommendations based on analysis
  if (sizes['AI Bundle (ESM)'] && sizes['Core Bundle (ESM)']) {
    const overhead = sizes['AI Bundle (ESM)'] - sizes['Core Bundle (ESM)'];
    if (overhead > 50) {
      report.recommendations.push('Consider optimizing AI utilities to reduce bundle overhead');
    } else {
      report.recommendations.push('AI bundle overhead is acceptable');
    }
  }
  
  if (sizes['Styles'] > 100) {
    report.recommendations.push('Consider CSS optimization to reduce stylesheet size');
  }
  
  // Save report
  try {
    fs.writeFileSync('./performance-report.json', JSON.stringify(report, null, 2));
    console.log('✅ Performance report saved to performance-report.json');
  } catch (error) {
    console.log('⚠️  Could not save performance report:', error.message);
  }
  
  // Display recommendations
  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });
  }
  
  return report;
}

// Main execution
async function main() {
  try {
    const artifactsValid = validateBuildArtifacts();
    
    if (!artifactsValid) {
      console.log('\n🔧 Run `npm run build` to generate all artifacts first.');
      process.exit(1);
    }
    
    const sizes = analyzeBundleSizes();
    runPerformanceBenchmarks();
    analyzeTypeDefinitions();
    validatePackageConfig();
    generateReport(sizes);
    
    console.log('\n✨ Performance monitoring complete!');
    
  } catch (error) {
    console.error('❌ Performance monitoring failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  analyzeBundleSizes,
  runPerformanceBenchmarks,
  analyzeTypeDefinitions,
  validatePackageConfig,
  validateBuildArtifacts,
  generateReport
}; 