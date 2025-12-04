#!/usr/bin/env node
/**
 * Component Inventory Script
 * 
 * Discovers all components in src/components and generates an inventory checklist
 * for the composable audit process.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const componentsDir = path.join(rootDir, 'src/components');

interface ComponentInfo {
  name: string;
  path: string;
  type: 'atom' | 'molecule' | 'organism' | 'template' | 'chart';
  mainFile?: string;
  storiesFile?: string;
  testFile?: string;
  hasIndex: boolean;
  apiPattern: 'composable' | 'declarative' | 'mixed' | 'unknown';
  status: 'needs-review' | 'compliant' | 'non-compliant';
}

function getComponentType(dirPath: string): ComponentInfo['type'] {
  const relativePath = path.relative(componentsDir, dirPath);
  if (relativePath.startsWith('atoms/')) return 'atom';
  if (relativePath.startsWith('molecules/')) return 'molecule';
  if (relativePath.startsWith('organisms/')) return 'organism';
  if (relativePath.startsWith('templates/')) return 'template';
  if (relativePath.startsWith('charts/')) return 'chart';
  return 'atom'; // default
}

function findComponentFiles(dirPath: string, componentName: string): {
  mainFile?: string;
  storiesFile?: string;
  testFile?: string;
  hasIndex: boolean;
} {
  const files = fs.readdirSync(dirPath);
  const mainFile = files.find(f => 
    f === `${componentName}.tsx` || 
    f === `index.tsx` ||
    f === `${componentName}.ts`
  );
  const storiesFile = files.find(f => f.endsWith('.stories.tsx'));
  const testFile = files.find(f => f.endsWith('.test.tsx') || f.endsWith('.spec.tsx'));
  const hasIndex = files.includes('index.ts');

  return {
    mainFile: mainFile ? path.join(dirPath, mainFile) : undefined,
    storiesFile: storiesFile ? path.join(dirPath, storiesFile) : undefined,
    testFile: testFile ? path.join(dirPath, testFile) : undefined,
    hasIndex,
  };
}

function detectAPIPattern(mainFile?: string): ComponentInfo['apiPattern'] {
  if (!mainFile || !fs.existsSync(mainFile)) return 'unknown';
  
  const content = fs.readFileSync(mainFile, 'utf-8');
  
  // Check for composable patterns
  const hasSubComponents = /Component\.\w+\s*=/m.test(content) || 
                          /export\s+(const|function)\s+\w+SubComponent/m.test(content);
  const hasAsChild = /asChild\??\s*:/m.test(content);
  const usesSlot = /from\s+['"].*slot['"]/m.test(content) || /Slot/m.test(content);
  
  // Check for declarative patterns
  const hasVariant = /variant\??\s*:/m.test(content);
  const hasBooleanFlags = /(enable|show|hide|display)\w*\??\s*:/m.test(content);
  const hasDataArrays = /(columns|items|data)\??\s*:\s*\w+\[\]/m.test(content);
  
  if (hasSubComponents || (hasAsChild && usesSlot)) {
    if (hasVariant || hasBooleanFlags || hasDataArrays) {
      return 'mixed';
    }
    return 'composable';
  }
  
  if (hasVariant || hasBooleanFlags || hasDataArrays) {
    return 'declarative';
  }
  
  return 'unknown';
}

function scanComponents(): ComponentInfo[] {
  const components: ComponentInfo[] = [];
  
  function scanDirectory(dirPath: string, depth: number = 0) {
    if (depth > 5) return; // Prevent infinite recursion
    
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Check if this looks like a component directory
        const componentName = entry.name;
        const hasComponentFiles = fs.readdirSync(fullPath).some(f => 
          f.endsWith('.tsx') || f.endsWith('.ts')
        );
        
        if (hasComponentFiles) {
          const type = getComponentType(fullPath);
          const files = findComponentFiles(fullPath, componentName);
          const apiPattern = detectAPIPattern(files.mainFile);
          
          components.push({
            name: componentName,
            path: path.relative(rootDir, fullPath),
            type,
            ...files,
            apiPattern,
            status: apiPattern === 'composable' ? 'compliant' : 'needs-review',
          });
        } else {
          // Continue scanning subdirectories
          scanDirectory(fullPath, depth + 1);
        }
      }
    }
  }
  
  // Scan each category
  ['atoms', 'molecules', 'organisms', 'templates', 'charts'].forEach(category => {
    const categoryPath = path.join(componentsDir, category);
    if (fs.existsSync(categoryPath)) {
      scanDirectory(categoryPath);
    }
  });
  
  return components.sort((a, b) => {
    const typeOrder = { atom: 0, molecule: 1, organism: 2, template: 3, chart: 4 };
    const typeDiff = typeOrder[a.type] - typeOrder[b.type];
    if (typeDiff !== 0) return typeDiff;
    return a.name.localeCompare(b.name);
  });
}

function generateMarkdown(components: ComponentInfo[]): string {
  const stats = {
    total: components.length,
    atoms: components.filter(c => c.type === 'atom').length,
    molecules: components.filter(c => c.type === 'molecule').length,
    organisms: components.filter(c => c.type === 'organism').length,
    templates: components.filter(c => c.type === 'template').length,
    charts: components.filter(c => c.type === 'chart').length,
    composable: components.filter(c => c.apiPattern === 'composable').length,
    declarative: components.filter(c => c.apiPattern === 'declarative').length,
    mixed: components.filter(c => c.apiPattern === 'mixed').length,
    unknown: components.filter(c => c.apiPattern === 'unknown').length,
    compliant: components.filter(c => c.status === 'compliant').length,
    needsReview: components.filter(c => c.status === 'needs-review').length,
  };

  let md = `# Composable Audit Inventory

**Generated:** ${new Date().toISOString()}  
**Total Components:** ${stats.total}

## Summary Statistics

| Category | Count |
|----------|-------|
| **Atoms** | ${stats.atoms} |
| **Molecules** | ${stats.molecules} |
| **Organisms** | ${stats.organisms} |
| **Templates** | ${stats.templates} |
| **Charts** | ${stats.charts} |

| API Pattern | Count |
|-------------|-------|
| **Composable** | ${stats.composable} |
| **Declarative** | ${stats.declarative} |
| **Mixed** | ${stats.mixed} |
| **Unknown** | ${stats.unknown} |

| Status | Count |
|--------|-------|
| **✅ Compliant** | ${stats.compliant} |
| **⚠️ Needs Review** | ${stats.needsReview} |

---

## Component Checklist

### Atoms (${stats.atoms} components)

| Component | Path | API Pattern | Status | Files |
|-----------|------|-------------|--------|-------|
`;

  // Group by type
  const byType = {
    atom: components.filter(c => c.type === 'atom'),
    molecule: components.filter(c => c.type === 'molecule'),
    organism: components.filter(c => c.type === 'organism'),
    template: components.filter(c => c.type === 'template'),
    chart: components.filter(c => c.type === 'chart'),
  };

  for (const [type, typeComponents] of Object.entries(byType)) {
    if (typeComponents.length === 0) continue;
    
    md += `\n### ${type.charAt(0).toUpperCase() + type.slice(1)}s (${typeComponents.length} components)\n\n`;
    md += `| Component | Path | API Pattern | Status | Files |\n`;
    md += `|-----------|------|-------------|--------|-------|\n`;
    
    for (const comp of typeComponents) {
      const statusIcon = comp.status === 'compliant' ? '✅' : comp.status === 'non-compliant' ? '❌' : '⚠️';
      const apiBadge = comp.apiPattern === 'composable' ? '🟢 Composable' : 
                      comp.apiPattern === 'declarative' ? '🔴 Declarative' : 
                      comp.apiPattern === 'mixed' ? '🟡 Mixed' : '⚪ Unknown';
      
      const files = [
        comp.mainFile ? '📄' : '',
        comp.storiesFile ? '📚' : '',
        comp.testFile ? '🧪' : '',
        comp.hasIndex ? '📦' : '',
      ].filter(Boolean).join(' ') || '-';
      
      md += `| **${comp.name}** | \`${comp.path}\` | ${apiBadge} | ${statusIcon} ${comp.status} | ${files} |\n`;
    }
  }

  md += `\n---

## Notes

- **API Pattern Detection**: Automated detection based on code patterns. Manual review required for accuracy.
- **Status**: Initial status based on API pattern detection. All components need manual review.
- **Files**: 📄 = Main component file, 📚 = Stories file, 🧪 = Test file, 📦 = Index file

## Next Steps

1. Run automated scanner: \`npm run audit:scan\`
2. Review flagged components manually
3. Update status based on audit rubric
4. Track progress in \`COMPOSABLE_AUDIT_PROGRESS.md\`
`;

  return md;
}

// Main execution
try {
  console.log('Scanning components...');
  const components = scanComponents();
  console.log(`Found ${components.length} components`);
  
  const markdown = generateMarkdown(components);
  const outputPath = path.join(rootDir, 'COMPOSABLE_AUDIT_INVENTORY.md');
  fs.writeFileSync(outputPath, markdown, 'utf-8');
  
  console.log(`✅ Inventory generated: ${outputPath}`);
  console.log(`\nSummary:`);
  console.log(`- Atoms: ${components.filter(c => c.type === 'atom').length}`);
  console.log(`- Molecules: ${components.filter(c => c.type === 'molecule').length}`);
  console.log(`- Organisms: ${components.filter(c => c.type === 'organism').length}`);
  console.log(`- Templates: ${components.filter(c => c.type === 'template').length}`);
  console.log(`- Charts: ${components.filter(c => c.type === 'chart').length}`);
} catch (error) {
  console.error('Error generating inventory:', error);
  process.exit(1);
}

