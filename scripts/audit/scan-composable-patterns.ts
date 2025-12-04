#!/usr/bin/env node
/**
 * Composable Patterns Scanner
 * 
 * Automatically scans components for non-composable patterns:
 * - Boolean props (enable*, show*, hide*, display*)
 * - Variant props
 * - Array props (columns, items, data)
 * - Missing asChild support
 * - Missing JSDoc examples
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const componentsDir = path.join(rootDir, 'src/components');

interface ScanIssue {
  type: 'boolean-flag' | 'variant-prop' | 'array-prop' | 'missing-aschild' | 'missing-jsdoc';
  severity: 'high' | 'medium' | 'low';
  message: string;
  line?: number;
  code?: string;
}

interface ComponentScanResult {
  componentPath: string;
  componentName: string;
  issues: ScanIssue[];
  hasAsChild: boolean;
  hasJSDocExample: boolean;
}

function scanFile(filePath: string): ScanIssue[] {
  if (!fs.existsSync(filePath)) return [];
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const issues: ScanIssue[] = [];
  
  // Scan for boolean flags
  const booleanFlagPattern = /\b(enable|show|hide|display)\w*\??\s*:/g;
  lines.forEach((line, index) => {
    const matches = line.match(booleanFlagPattern);
    if (matches) {
      // Check if it's a form state (acceptable)
      const isFormState = /\b(disabled|readOnly|checked|open|expanded)\b/.test(line);
      if (!isFormState) {
        issues.push({
          type: 'boolean-flag',
          severity: 'medium',
          message: `Boolean flag prop found: ${matches[0]}`,
          line: index + 1,
          code: line.trim(),
        });
      }
    }
  });
  
  // Scan for variant props
  const variantPattern = /variant\??\s*:\s*['"`]?\w+/g;
  lines.forEach((line, index) => {
    if (variantPattern.test(line)) {
      // Check if it's in a comment or string
      if (!line.trim().startsWith('//') && !line.includes('@deprecated')) {
        issues.push({
          type: 'variant-prop',
          severity: 'high',
          message: 'Variant prop found (consider using composition instead)',
          line: index + 1,
          code: line.trim(),
        });
      }
    }
  });
  
  // Scan for array props (columns, items, data)
  const arrayPropPattern = /\b(columns|items|data)\??\s*:\s*\w+\[\]/g;
  lines.forEach((line, index) => {
    if (arrayPropPattern.test(line)) {
      // Check if it's a form option or chart data (acceptable exceptions)
      const isException = /\b(options|dataPoints|chartData)\b/.test(line);
      if (!isException) {
        issues.push({
          type: 'array-prop',
          severity: 'high',
          message: `Array prop found: ${line.match(arrayPropPattern)?.[0]} (consider using children composition)`,
          line: index + 1,
          code: line.trim(),
        });
      }
    }
  });
  
  return issues;
}

function checkAsChildSupport(filePath: string): boolean {
  if (!fs.existsSync(filePath)) return false;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Check for asChild prop
  const hasAsChildProp = /\basChild\??\s*:/m.test(content);
  
  // Check for Slot usage
  const usesSlot = /from\s+['"].*slot['"]/m.test(content) || 
                   /\bSlot\b/m.test(content) ||
                   /@radix-ui\/react-slot/m.test(content);
  
  return hasAsChildProp && usesSlot;
}

function checkJSDocExample(filePath: string): boolean {
  if (!fs.existsSync(filePath)) return false;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Check for JSDoc with @example
  const hasJSDoc = /\/\*\*[\s\S]*?\*\//.test(content);
  const hasExample = /@example/.test(content);
  
  return hasJSDoc && hasExample;
}

function scanComponent(componentPath: string): ComponentScanResult | null {
  const fullPath = path.join(rootDir, componentPath);
  
  if (!fs.existsSync(fullPath)) return null;
  
  const componentName = path.basename(componentPath, path.extname(componentPath));
  const dirPath = path.dirname(fullPath);
  
  // Find main component file
  const possibleFiles = [
    path.join(dirPath, `${componentName}.tsx`),
    path.join(dirPath, 'index.tsx'),
    path.join(dirPath, `${componentName}.ts`),
    fullPath,
  ];
  
  const mainFile = possibleFiles.find(f => fs.existsSync(f));
  if (!mainFile) return null;
  
  const issues = scanFile(mainFile);
  
  // Check for missing asChild (only flag if component should have it)
  const hasAsChild = checkAsChildSupport(mainFile);
  if (!hasAsChild && mainFile.endsWith('.tsx')) {
    // Only flag if it's a component that could benefit from asChild
    const content = fs.readFileSync(mainFile, 'utf-8');
    const isComponent = /export\s+(const|function)\s+\w+\s*=\s*(React\.)?(forwardRef|memo)?/m.test(content) ||
                       /export\s+(default\s+)?(function|const)\s+\w+/.test(content);
    
    // Check if component uses ComposableProps (which includes asChild)
    const usesComposableProps = /ComposableProps/.test(content) || 
                                /extends\s+ComposableProps/.test(content) ||
                                /Omit<ComposableProps/.test(content);
    
    // Don't flag if component uses ComposableProps (already supports asChild)
    if (isComponent && !usesComposableProps) {
      issues.push({
        type: 'missing-aschild',
        severity: 'low',
        message: 'Component does not support asChild prop (consider adding for better composition)',
      });
    }
  }
  
  // Check for missing JSDoc example
  const hasJSDocExample = checkJSDocExample(mainFile);
  if (!hasJSDocExample) {
    issues.push({
      type: 'missing-jsdoc',
      severity: 'low',
      message: 'Missing JSDoc @example showing composable usage',
    });
  }
  
  return {
    componentPath,
    componentName,
    issues,
    hasAsChild,
    hasJSDocExample,
  };
}

function scanAllComponents(): ComponentScanResult[] {
  const results: ComponentScanResult[] = [];
  
  function scanDirectory(dirPath: string, relativePath: string = '') {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const newRelativePath = path.join(relativePath, entry.name);
      
      if (entry.isDirectory()) {
        scanDirectory(fullPath, newRelativePath);
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
        // Skip stories and tests
        if (entry.name.includes('.stories.') || entry.name.includes('.test.') || entry.name.includes('.spec.')) {
          continue;
        }
        
        const result = scanComponent(path.join('src/components', newRelativePath));
        if (result && result.issues.length > 0) {
          results.push(result);
        }
      }
    }
  }
  
  scanDirectory(componentsDir);
  
  return results;
}

function generateReport(results: ComponentScanResult[]): any {
  const report = {
    generated: new Date().toISOString(),
    totalScanned: results.length,
    summary: {
      totalIssues: results.reduce((sum, r) => sum + r.issues.length, 0),
      byType: {
        'boolean-flag': results.reduce((sum, r) => sum + r.issues.filter(i => i.type === 'boolean-flag').length, 0),
        'variant-prop': results.reduce((sum, r) => sum + r.issues.filter(i => i.type === 'variant-prop').length, 0),
        'array-prop': results.reduce((sum, r) => sum + r.issues.filter(i => i.type === 'array-prop').length, 0),
        'missing-aschild': results.reduce((sum, r) => sum + r.issues.filter(i => i.type === 'missing-aschild').length, 0),
        'missing-jsdoc': results.reduce((sum, r) => sum + r.issues.filter(i => i.type === 'missing-jsdoc').length, 0),
      },
      bySeverity: {
        high: results.reduce((sum, r) => sum + r.issues.filter(i => i.severity === 'high').length, 0),
        medium: results.reduce((sum, r) => sum + r.issues.filter(i => i.severity === 'medium').length, 0),
        low: results.reduce((sum, r) => sum + r.issues.filter(i => i.severity === 'low').length, 0),
      },
    },
    components: results.map(r => ({
      path: r.componentPath,
      name: r.componentName,
      issues: r.issues,
      hasAsChild: r.hasAsChild,
      hasJSDocExample: r.hasJSDocExample,
    })),
  };
  
  return report;
}

// Main execution
try {
  console.log('Scanning components for non-composable patterns...');
  const results = scanAllComponents();
  console.log(`Scanned ${results.length} components`);
  
  const report = generateReport(results);
  const outputPath = path.join(rootDir, 'COMPOSABLE_AUDIT_SCAN_RESULTS.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');
  
  console.log(`✅ Scan complete: ${outputPath}`);
  console.log(`\nSummary:`);
  console.log(`- Total components scanned: ${report.totalScanned}`);
  console.log(`- Total issues found: ${report.summary.totalIssues}`);
  console.log(`- High severity: ${report.summary.bySeverity.high}`);
  console.log(`- Medium severity: ${report.summary.bySeverity.medium}`);
  console.log(`- Low severity: ${report.summary.bySeverity.low}`);
  console.log(`\nIssue breakdown:`);
  console.log(`- Boolean flags: ${report.summary.byType['boolean-flag']}`);
  console.log(`- Variant props: ${report.summary.byType['variant-prop']}`);
  console.log(`- Array props: ${report.summary.byType['array-prop']}`);
  console.log(`- Missing asChild: ${report.summary.byType['missing-aschild']}`);
  console.log(`- Missing JSDoc: ${report.summary.byType['missing-jsdoc']}`);
} catch (error) {
  console.error('Error scanning components:', error);
  process.exit(1);
}

