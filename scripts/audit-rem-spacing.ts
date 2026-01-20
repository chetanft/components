#!/usr/bin/env tsx
/**
 * Component Audit: Rem Spacing Migration
 * 
 * Audits components to identify spacing that could benefit from rem-based tokens
 * instead of pixel-based tokens. Provides recommendations for migration.
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface SpacingUsage {
  file: string;
  line: number;
  value: string;
  context: string;
  recommendation: 'keep-px' | 'migrate-to-rem' | 'review';
  reason: string;
}

interface ComponentAudit {
  component: string;
  file: string;
  spacingUsages: SpacingUsage[];
  migrationPriority: 'high' | 'medium' | 'low';
  migrationComplexity: 'simple' | 'moderate' | 'complex';
}

const COMPONENT_DIR = path.join(process.cwd(), 'src/components');
const SPACING_PATTERNS = [
  /var\(--spacing-x\d+\)/g, // CSS variable usage
  /var\(--x\d+\)/g, // Base spacing variable
  /\d+px/g, // Hardcoded pixel values
];

const REM_SPACING_TOKENS = [
  '--spacing-x0-rem',
  '--spacing-x1-rem',
  '--spacing-x2-rem',
  '--spacing-x3-rem',
  '--spacing-x4-rem',
  '--spacing-x5-rem',
  '--spacing-x6-rem',
  '--spacing-x7-rem',
  '--spacing-x8-rem',
  '--spacing-x9-rem',
  '--spacing-x10-rem',
  '--spacing-x11-rem',
  '--spacing-x12-rem',
  '--spacing-x13-rem',
  '--spacing-x14-rem',
  '--spacing-x15-rem',
  '--spacing-x16-rem',
  '--spacing-x20-rem',
  '--spacing-x24-rem',
  '--spacing-x38-rem',
];

function shouldMigrateToRem(
  value: string,
  context: string,
  property: string
): { recommendation: 'keep-px' | 'migrate-to-rem' | 'review'; reason: string } {
  const lowerContext = context.toLowerCase();
  const lowerProperty = property.toLowerCase();

  // Keep px for borders, icons, fixed dimensions
  if (
    lowerProperty.includes('border') ||
    lowerProperty.includes('width') ||
    lowerProperty.includes('height') ||
    lowerProperty.includes('icon') ||
    lowerContext.includes('border') ||
    lowerContext.includes('icon')
  ) {
    return {
      recommendation: 'keep-px',
      reason: 'Pixel precision required for borders, icons, and fixed dimensions',
    };
  }

  // Migrate to rem for padding, margins, gaps (typography-relative spacing)
  if (
    lowerProperty.includes('padding') ||
    lowerProperty.includes('margin') ||
    lowerProperty.includes('gap') ||
    lowerContext.includes('padding') ||
    lowerContext.includes('margin') ||
    lowerContext.includes('gap') ||
    lowerContext.includes('spacing')
  ) {
    return {
      recommendation: 'migrate-to-rem',
      reason: 'Spacing should scale with typography for better responsiveness',
    };
  }

  // Review other cases
  return {
    recommendation: 'review',
    reason: 'Case-by-case evaluation needed',
  };
}

function extractSpacingUsages(filePath: string): SpacingUsage[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const usages: SpacingUsage[] = [];

  lines.forEach((line, index) => {
    // Check for CSS variable usage
    const varMatches = line.matchAll(/var\((--(?:spacing-)?x\d+)\)/g);
    for (const match of varMatches) {
      const value = match[1];
      const context = line.trim();
      
      // Extract property name (padding, margin, etc.)
      const propertyMatch = line.match(/(\w+)\s*[:=]\s*var\(/);
      const property = propertyMatch ? propertyMatch[1] : 'unknown';

      const { recommendation, reason } = shouldMigrateToRem(value, context, property);

      usages.push({
        file: filePath,
        line: index + 1,
        value,
        context,
        recommendation,
        reason,
      });
    }

    // Check for hardcoded pixel values (potential candidates)
    const pxMatches = line.matchAll(/(\w+)\s*[:=]\s*(\d+)px/g);
    for (const match of pxMatches) {
      const property = match[1];
      const pxValue = parseInt(match[2], 10);
      
      // Only flag common spacing values (multiples of 4)
      if (pxValue > 0 && pxValue % 4 === 0 && pxValue <= 152) {
        const context = line.trim();
        const { recommendation, reason } = shouldMigrateToRem(
          `${pxValue}px`,
          context,
          property
        );

        if (recommendation !== 'keep-px') {
          usages.push({
            file: filePath,
            line: index + 1,
            value: `${pxValue}px`,
            context,
            recommendation,
            reason: `${reason} (hardcoded value, consider using token)`,
          });
        }
      }
    }
  });

  return usages;
}

function calculateMigrationPriority(usages: SpacingUsage[]): 'high' | 'medium' | 'low' {
  const remCandidates = usages.filter((u) => u.recommendation === 'migrate-to-rem');
  const reviewCandidates = usages.filter((u) => u.recommendation === 'review');

  if (remCandidates.length >= 5) return 'high';
  if (remCandidates.length >= 2 || reviewCandidates.length >= 3) return 'medium';
  return 'low';
}

function calculateMigrationComplexity(usages: SpacingUsage[]): 'simple' | 'moderate' | 'complex' {
  const hasHardcodedPx = usages.some((u) => u.value.includes('px') && !u.value.includes('var'));
  const hasMultipleProperties = new Set(usages.map((u) => u.context.split(':')[0])).size > 3;

  if (hasHardcodedPx && hasMultipleProperties) return 'complex';
  if (hasHardcodedPx || hasMultipleProperties) return 'moderate';
  return 'simple';
}

async function auditComponents(): Promise<ComponentAudit[]> {
  const componentFiles = await glob('**/*.{tsx,ts}', {
    cwd: COMPONENT_DIR,
    ignore: ['**/*.test.{tsx,ts}', '**/*.stories.{tsx,ts}', '**/index.ts'],
  });

  const audits: ComponentAudit[] = [];

  for (const file of componentFiles) {
    const filePath = path.join(COMPONENT_DIR, file);
    const spacingUsages = extractSpacingUsages(filePath);

    if (spacingUsages.length > 0) {
      const componentName = path.basename(file, path.extname(file));
      audits.push({
        component: componentName,
        file,
        spacingUsages,
        migrationPriority: calculateMigrationPriority(spacingUsages),
        migrationComplexity: calculateMigrationComplexity(spacingUsages),
      });
    }
  }

  return audits.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.migrationPriority] - priorityOrder[a.migrationPriority];
  });
}

function generateReport(audits: ComponentAudit[]): string {
  let report = '# Rem Spacing Migration Audit Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;
  report += `## Summary\n\n`;
  report += `- Total components audited: ${audits.length}\n`;
  
  const highPriority = audits.filter((a) => a.migrationPriority === 'high').length;
  const mediumPriority = audits.filter((a) => a.migrationPriority === 'medium').length;
  const lowPriority = audits.filter((a) => a.migrationPriority === 'low').length;
  
  report += `- High priority migrations: ${highPriority}\n`;
  report += `- Medium priority migrations: ${mediumPriority}\n`;
  report += `- Low priority migrations: ${lowPriority}\n\n`;

  const totalRemCandidates = audits.reduce(
    (sum, a) => sum + a.spacingUsages.filter((u) => u.recommendation === 'migrate-to-rem').length,
    0
  );
  report += `- Total rem migration candidates: ${totalRemCandidates}\n\n`;

  report += `## High Priority Components\n\n`;
  const highPriorityAudits = audits.filter((a) => a.migrationPriority === 'high');
  
  if (highPriorityAudits.length === 0) {
    report += `No high priority migrations found.\n\n`;
  } else {
    highPriorityAudits.forEach((audit) => {
      report += `### ${audit.component}\n\n`;
      report += `- **File**: \`${audit.file}\`\n`;
      report += `- **Priority**: ${audit.migrationPriority}\n`;
      report += `- **Complexity**: ${audit.migrationComplexity}\n`;
      report += `- **Rem candidates**: ${
        audit.spacingUsages.filter((u) => u.recommendation === 'migrate-to-rem').length
      }\n\n`;

      const remCandidates = audit.spacingUsages.filter(
        (u) => u.recommendation === 'migrate-to-rem'
      );
      if (remCandidates.length > 0) {
        report += `**Recommended migrations:**\n\n`;
        remCandidates.slice(0, 5).forEach((usage) => {
          const remToken = usage.value.replace('--spacing-x', '--spacing-x').replace(')', '-rem)');
          report += `- Line ${usage.line}: \`${usage.value}\` → \`${remToken}\`\n`;
          report += `  - Reason: ${usage.reason}\n`;
        });
        if (remCandidates.length > 5) {
          report += `- ... and ${remCandidates.length - 5} more\n`;
        }
        report += `\n`;
      }
    });
  }

  report += `## Migration Guide\n\n`;
  report += `### When to Migrate to Rem\n\n`;
  report += `- ✅ **Migrate**: Padding, margins, gaps (typography-relative spacing)\n`;
  report += `- ❌ **Keep px**: Borders, icons, fixed widths/heights\n\n`;
  report += `### Migration Example\n\n`;
  report += `\`\`\`tsx\n`;
  report += `// Before (px token)\n`;
  report += `<div style={{ padding: 'var(--spacing-x4)' }}>\n`;
  report += `  Content\n`;
  report += `</div>\n\n`;
  report += `// After (rem token)\n`;
  report += `<div style={{ padding: 'var(--spacing-x4-rem)' }}>\n`;
  report += `  Content\n`;
  report += `</div>\n`;
  report += `\`\`\`\n`;

  return report;
}

async function main() {
  console.log('Auditing components for rem spacing migration...\n');
  
  const audits = await auditComponents();
  const report = generateReport(audits);
  
  const reportPath = path.join(process.cwd(), 'REM_SPACING_AUDIT.md');
  fs.writeFileSync(reportPath, report);
  
  console.log(`✅ Audit complete! Report saved to: ${reportPath}\n`);
  console.log(`Summary:`);
  console.log(`- Components audited: ${audits.length}`);
  console.log(`- High priority: ${audits.filter((a) => a.migrationPriority === 'high').length}`);
  console.log(`- Medium priority: ${audits.filter((a) => a.migrationPriority === 'medium').length}`);
  console.log(`- Low priority: ${audits.filter((a) => a.migrationPriority === 'low').length}`);
}

main().catch(console.error);
