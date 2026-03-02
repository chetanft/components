# Wave 4 Data-heavy Components Codemod

Wave 4 tracks declarative usage of:
- `Table`
- `DataEntryTable`
- `List`

## Script

- `scripts/codemods/wave4-data-heavy-components.cjs`

## Run

```bash
npm run codemod:wave4:report
```

## What it detects

- `Table`: `columns`, `data`, `header`, `label`, `prefixIcon`, `suffixIcon`
- `DataEntryTable`: `columns`, `data`
- `List`: `dataSource`, `renderItem`, `grid`, `header`, `footer`

## Notes

- Report-only scanner by design.
- Runtime implementation files are excluded so output focuses on consumer usage in stories/docs/apps.
