# Single Source of Truth Development Workflow

## Overview
Component source code (`src/components/`) is the single source of truth. Docs, Storybook, and npm package all import directly from source - no intermediate files or generation needed.

## Development Flow

### 1. Update Component Source
- Edit components in `src/components/`
- Update Storybook stories in `src/components/*/Component.stories.tsx`
- Test in docs: `cd ft-docs && npm run dev`
- Components auto-update via HMR (direct imports from source)

### 2. Build NPM Package
After making changes:

```bash
# From root directory
npm run build
```

This will:
- ✅ Sync versions across packages
- ✅ Validate component exports match source
- ✅ Build npm package from source

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
- ✅ **Single Source of Truth**: `src/components/` drives everything
- ✅ Docs imports directly from `../../src` (source)
- ✅ Storybook imports directly from `./Component` (source)
- ✅ npm package builds from same `src/` directory
- ✅ Component metadata generated on-demand from TypeScript and stories
- ✅ No components.json file - eliminated duplication
- ✅ Always validate before building: `npm run validate:docs`
- ✅ Components in docs = Components in Storybook = Components in npm package

## Commands Reference

### Development
```bash
# Start docs dev server
cd ft-docs && npm run dev

# Validate docs components are exported
npm run validate:docs

# Build npm package (includes validation)
npm run build
```

### Building & Publishing
```bash
# Build (includes validation)
npm run build

# Publish (includes validation + build)
npm run publish
```

