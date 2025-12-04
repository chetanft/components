# Composable Audit Scripts

Scripts for auditing component composability patterns.

## Scripts

### `inventory-components.ts`

Generates a comprehensive inventory of all components in the design system.

**Usage**:
```bash
npm run audit:inventory
```

**Output**: `COMPOSABLE_AUDIT_INVENTORY.md`

**What it does**:
- Scans `src/components` for all component files
- Categorizes by type (atom/molecule/organism/template/chart)
- Detects API patterns (composable/declarative/mixed/unknown)
- Generates markdown checklist

---

### `scan-composable-patterns.ts`

Automatically scans components for non-composable patterns.

**Usage**:
```bash
npm run audit:scan
```

**Output**: `COMPOSABLE_AUDIT_SCAN_RESULTS.json`

**What it scans for**:
- Boolean flags (`enable*`, `show*`, `hide*`, `display*`)
- Variant props (`variant?:`)
- Array props (`columns`, `items`, `data`)
- Missing `asChild` support
- Missing JSDoc `@example` tags

**Output format**:
```json
{
  "generated": "2025-01-01T00:00:00.000Z",
  "totalScanned": 100,
  "summary": {
    "totalIssues": 50,
    "byType": { ... },
    "bySeverity": { ... }
  },
  "components": [
    {
      "path": "src/components/organisms/Table/Table.tsx",
      "name": "Table",
      "issues": [ ... ],
      "hasAsChild": false,
      "hasJSDocExample": false
    }
  ]
}
```

---

## Prerequisites

- Node.js 18+
- TypeScript
- `tsx` package (installed as devDependency)

## Installation

First, install the `tsx` package:

```bash
npm install --save-dev tsx
```

Then run the scripts:

```bash
npm run audit:inventory
npm run audit:scan
```

**Note**: If you get an error about `tsx` not being found, make sure to run `npm install` first to install all dependencies.

---

## Workflow

1. **Generate Inventory**: `npm run audit:inventory`
   - Creates component checklist
   - Identifies components needing review

2. **Run Automated Scan**: `npm run audit:scan`
   - Flags potential issues
   - Generates JSON report

3. **Manual Review**: Review flagged components
   - Check `COMPOSABLE_AUDIT_SCAN_RESULTS.json`
   - Review component code, stories, tests
   - Document findings in `COMPOSABLE_AUDIT_FINDINGS.md`

4. **Update Progress**: Update `COMPOSABLE_AUDIT_PROGRESS.md`
   - Mark components as compliant/partial/non-compliant
   - Track refactoring progress

---

## Related Documentation

- [Composable Audit Rubric](../../docs/standards/composable-audit-rubric.md)
- [Component Inventory](../../COMPOSABLE_AUDIT_INVENTORY.md)
- [Progress Tracking](../../COMPOSABLE_AUDIT_PROGRESS.md)
- [Findings](../../COMPOSABLE_AUDIT_FINDINGS.md)
- [Migration Guide](../../docs/migrations/composable-migration-guide.md)

