# Wave 2 Medium Components Codemod

Scope:
- `Tabs`
- `FormItem`
- `DatePicker`
- `HoverCard`
- `Badge`
- `Checkbox`
- `RadioGroup`
- `Tooltip`
- `TimelineItem`

Script:
- `scripts/codemods/wave2-medium-components.cjs`

## Commands

Report-only (recommended first):

```bash
npm run codemod:wave2:report
```

Apply safe transforms:

```bash
npm run codemod:wave2:write
```

Run on specific paths:

```bash
node scripts/codemods/wave2-medium-components.cjs src/stories ft-docs --write
```

## What it does

1. Scans JSX/MDX files for deprecated Wave 2 patterns.
2. Prints:
   - file-level locations (`pattern@line`)
   - aggregate counts by pattern
3. In `--write` mode, applies only safe automatic transforms:
   - `<Badge size="default" />` -> `<Badge size="md" />`
   - `<Badge size="small" />` -> `<Badge size="sm" />`
   - brace-string variants of the same.

## What still needs manual migration

These require composable refactors and are intentionally **report-only**:
- `Tabs tabs=...`, `Tabs showLine=...`
- `FormItem label/help`
- `DatePicker label/showTime`
- `HoverCard content=...`
- `Badge color/showZero`
- `Checkbox label/error/description`
- `RadioGroup options/error/helperText`
- `Tooltip heading/primaryActionText/secondaryActionText`
- `TimelineItem color/dot/label`

## Suggested workflow

1. Run report.
2. Apply safe writes.
3. Open remaining report entries and migrate manually to composable API.
4. Re-run report until only intentional legacy test coverage remains.
