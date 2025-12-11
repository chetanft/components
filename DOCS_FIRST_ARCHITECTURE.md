# Docs-First Architecture

## Overview

This project follows a **docs-first architecture** where the documentation site (`ft-docs`) is the primary development interface. Components are developed and tested in docs, then synced to the npm package.

## Architecture Flow

```
┌─────────────────┐
│   ft-docs/      │  ← Primary Interface (Development)
│   (Next.js)     │     - Edit components here
│                 │     - Test in browser
│  imports from   │
│   ../../src     │
└────────┬────────┘
         │
         │ (same source)
         │
┌────────▼────────┐
│   src/          │  ← Single Source of Truth
│   components/   │     - All components live here
│                 │     - Exported via src/index.ts
└────────┬────────┘
         │
         │ (builds from)
         │
┌────────▼────────┐
│   dist/         │  ← NPM Package (Production)
│   (built)       │     - Built from src/
│                 │     - Published to npm
└─────────────────┘
```

## Key Principles

1. **Docs is Primary**: All component development happens in `ft-docs`
2. **Single Source**: Components live in `src/components/` (imported by both docs and package)
3. **Validation**: Scripts ensure docs components are properly exported before building
4. **Sync Workflow**: Changes in docs → validate → build → publish

## File Structure

```
components/
├── src/
│   ├── components/        # Component source code
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   └── index.ts          # Main exports
│
├── ft-docs/               # Documentation site (PRIMARY)
│   ├── src/
│   │   └── registry.tsx  # Imports from ../../src
│   └── WORKFLOW.md        # Detailed workflow guide
│
├── dist/                  # Built npm package
│
└── scripts/
    ├── validate-docs-exports.cjs    # Validates exports
    └── sync-docs-to-package.cjs     # Syncs docs to package
```

## Development Workflow

### 1. Develop Components in Docs

```bash
cd ft-docs
npm run dev
```

- Edit components in `src/components/`
- Changes appear immediately in docs (HMR)
- Test components interactively

### 2. Validate Before Building

```bash
npm run validate:docs
```

This ensures:
- ✅ All components used in docs are exported
- ✅ No missing exports
- ✅ Docs and package stay in sync

### 3. Sync to NPM Package

```bash
npm run sync:docs-to-package
```

This will:
1. Validate component exports
2. Update components.json (if Python script available)
3. Build npm package

### 4. Publish

```bash
npm run publish
```

## Commands Reference

| Command | Description |
|---------|-------------|
| `npm run validate:docs` | Validate docs components are exported |
| `npm run sync:docs-to-package` | Sync docs changes to npm package |
| `npm run build` | Build package (includes validation) |
| `npm run publish` | Publish to npm (includes validation + build) |

## Benefits

✅ **Single Source of Truth**: Components live in one place (`src/`)  
✅ **Docs-First**: Develop and test in docs, then publish  
✅ **Automatic Validation**: Prevents sync issues  
✅ **Simple Workflow**: Clear steps from development to production  
✅ **No Duplication**: Docs and package use same source code  

## Important Notes

- **Docs imports from source**: `ft-docs/src/registry.tsx` imports from `../../src`
- **Package builds from source**: `rollup.config.js` builds from `src/index.ts`
- **Always validate**: Run `npm run validate:docs` before building
- **Storybook is optional**: Not required for docs-first workflow

## Troubleshooting

### "Missing exports" error
- Check `src/components/index.ts` - ensure component is exported
- Check `src/index.ts` - ensure it re-exports from components

### Build fails after validation
- Check TypeScript errors: `npm run type-check`
- Check component imports in `src/index.ts`

### Docs not updating
- Ensure docs imports from `../../src` (not npm package)
- Restart docs dev server if needed


















