# Wave 3 Overlay/Container Codemod

Wave 3 tracks legacy declarative API usage for:
- `Modal`
- `Drawer`
- `Collapsible`
- `Alert`
- `NavigationPopover`
- `PageHeader` / `PageHeader.Tabs`

## Script

- `scripts/codemods/wave3-overlay-container-components.cjs`

## Run

```bash
npm run codemod:wave3:report
```

## What it detects

- `Modal`: `onClose`, `title`, `footer`
- `Drawer`: `onClose`, `title`, `footer`
- `Collapsible`: `header`, `extra`, `showArrow`, `badges`
- `Alert`: `message`, `title`, `icon`, `action`
- `NavigationPopover`: `sections`
- `PageHeader` / `PageHeader.Tabs`: `items`, `onChange`, `variant`

## Notes

- This codemod is report-only by design.
- Runtime component source files are excluded from reporting so the report reflects consumer usage in stories/docs/apps.
