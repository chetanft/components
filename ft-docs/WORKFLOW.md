# Docs-First Development Workflow

## Overview
Docs is the primary interface. All component development happens here, then syncs to npm package.

## Development Flow

### 1. Update Components in Docs
- Edit components in `src/components/`
- Test in docs: `cd ft-docs && npm run dev`
- Components auto-update via HMR

### 2. Sync to NPM Package
After making changes in docs:

```bash
# From root directory
npm run sync:docs-to-package
```

This will:
- ✅ Validate all docs components are exported
- ✅ Update components.json from Storybook
- ✅ Build npm package

### 3. Publish NPM Package
```bash
npm run publish
```

## File Structure
```
components/
├── src/components/     # Source components (docs imports from here)
├── ft-docs/            # Docs site (primary interface)
│   └── src/registry.tsx # Imports from ../../src
└── dist/               # Built npm package (from src/)
```

## Key Points
- ✅ Docs imports directly from `../../src` (source)
- ✅ npm package builds from same `src/` directory
- ✅ Always validate before building: `npm run validate:docs`
- ✅ Components in docs = Components in npm package

## Commands Reference

### Development
```bash
# Start docs dev server
cd ft-docs && npm run dev

# Validate docs components are exported
npm run validate:docs

# Sync docs changes to npm package
npm run sync:docs-to-package
```

### Building & Publishing
```bash
# Build (includes validation)
npm run build

# Publish (includes validation + build)
npm run publish
```

