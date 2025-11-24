# Component Source-First Architecture

## Overview

The FT Design System follows a **component source-first architecture** where component source code is the single source of truth. All downstream artifacts (docs, Storybook, npm package) automatically sync from component changes with synchronized versions.

## Architecture Diagram

```
Component Source (src/components/) ← Single Source of Truth
    ↓ (automatic sync via scripts & hooks)
    ├── Docs (ft-docs/) - Version synced
    ├── Storybook (src/stories/) - Version synced  
    └── NPM Package (dist/) - Version synced
```

## Key Principles

1. **Single Source of Truth**: Component source code (`src/components/`) drives everything
2. **Automatic Synchronization**: Pre-commit hooks and build scripts ensure consistency
3. **Version Alignment**: All three outputs (docs, storybook, npm) share the same version number
4. **Source-First Flow**: Component updates flow downstream, never upstream

## Version Synchronization

### Single Source of Truth

The root `package.json` is the **single source of truth** for version numbers:

```json
{
  "version": "4.13.9"
}
```

### Synchronized Locations

When the version changes, it automatically syncs to:

1. **ft-docs/package.json** - Documentation site version
2. **CHANGELOG.md** - Version tracking (informational check)
3. **Storybook metadata** - Component showcase version

### Version Sync Scripts

#### `npm run sync:version`

Manually syncs versions across all packages:

```bash
npm run sync:version
```

This script:
- Reads version from root `package.json`
- Updates `ft-docs/package.json` version
- Validates version consistency
- Checks CHANGELOG.md alignment

#### `npm run sync:all`

Complete sync workflow that orchestrates:

1. Version synchronization
2. Component export validation
3. Docs sync
4. Storybook validation
5. NPM package build

```bash
npm run sync:all
```

## Component Update Workflow

### Source-First Flow

When component source is updated, changes flow downstream automatically:

```
Component Source (src/components/) ← Single Source of Truth
    ↓ (direct imports, no generation)
    ├── Docs (ft-docs/) - Imports directly from ../../src
    ├── Storybook - Imports directly from ./Component
    └── NPM Package (dist/) - Built from src/
```

### Standard Workflow

1. **Update Component Source** (`src/components/`)
   - Make changes to component files
   - Update component exports if needed
   - Update Storybook stories if needed

2. **Docs Auto-Updates** (no sync needed)
   - Docs imports directly from `../../src`
   - Component metadata generated on-demand from TypeScript and stories
   - No components.json file needed

3. **Build NPM Package** (`npm run build`)
   - Syncs versions across packages
   - Validates component exports
   - Builds npm package from source

3. **Automatic Sync** (via pre-commit hook)
   - Versions are synchronized
   - Component exports are validated
   - Changes are staged if needed

4. **Build** (`npm run build`)
   - Versions synced automatically
   - Component exports validated
   - NPM package built

5. **Publish** (`npm run publish`)
   - Versions validated before publishing
   - All artifacts stay in sync

### Pre-Commit Hook

The git pre-commit hook (`.git/hooks/pre-commit`) automatically:

- Syncs versions before allowing commits
- Validates component exports
- Ensures version consistency
- Prevents commits if versions are out of sync

### Manual Sync

If you need to manually sync everything:

```bash
# Sync versions only
npm run sync:version

# Sync component source to docs and npm package
npm run sync:source-to-docs

# Complete sync (versions + docs + storybook + build)
npm run sync:all

# Sync Storybook metadata to component source (EXPERIMENTAL)
npm run sync:storybook-to-source
```

**Source-to-Docs Flow**: When component source is updated:
- Docs automatically reflects changes (direct imports from source)
- Component metadata is generated on-demand from TypeScript and Storybook stories
- No manual sync needed - single source of truth ensures consistency
- Run `npm run build` to build npm package when ready

**⚠️ Warning**: The `sync:storybook-to-source` script is experimental and may corrupt files. Always commit your changes before running it, and review changes carefully.

## File Structure

```
components/
├── src/
│   ├── components/          # Component source (single source of truth)
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   └── stories/             # Storybook stories
├── ft-docs/                 # Documentation site (version synced)
│   └── package.json        # Auto-synced version
├── dist/                    # Built NPM package (version synced)
├── package.json             # Version source of truth
├── scripts/
│   ├── sync-version.cjs     # Version sync script
│   ├── sync-all.cjs         # Complete sync workflow
│   ├── sync-docs-to-package.cjs  # Docs sync (enhanced)
│   └── publish-cli.js      # Publish CLI (enhanced)
└── .git/hooks/
    └── pre-commit           # Pre-commit hook
```

## Version Management

### Updating Versions

**Never manually edit versions in:**
- `ft-docs/package.json`
- Other version locations

**Always update version in:**
- Root `package.json` (single source of truth)

Then run:
```bash
npm run sync:version
```

Or use npm version commands (they auto-sync):
```bash
npm version patch   # 4.13.9 → 4.13.10
npm version minor   # 4.13.9 → 4.14.0
npm version major   # 4.13.9 → 5.0.0
```

### Version Validation

The system validates version consistency:

- ✅ All `package.json` files have matching versions
- ✅ CHANGELOG.md alignment checked (informational)
- ✅ Pre-commit hook prevents version mismatches

## Build Process

### Standard Build

```bash
npm run build
```

This automatically:
1. Syncs versions (`sync:version`)
2. Validates component exports (`validate:docs`)
3. Builds the package (`rollup -c`)

### Publish Process

```bash
npm run publish
```

Or use version-specific commands:
```bash
npm run publish:patch   # Auto-syncs versions
npm run publish:minor   # Auto-syncs versions
npm run publish:major   # Auto-syncs versions
```

All publish commands:
1. Sync versions before publishing
2. Validate component exports
3. Build the package
4. Publish to registry

## Scripts Reference

### Version Management

- `sync:version` - Sync version across all packages
- `sync:all` - Complete sync workflow (versions + docs + storybook + build)

### Build & Publish

- `build` - Build with version sync and validation
- `publish:prepare` - Prepare for publish (sync + validate + build)
- `publish:patch` - Publish patch version (auto-syncs)
- `publish:minor` - Publish minor version (auto-syncs)
- `publish:major` - Publish major version (auto-syncs)

### Validation

- `validate:docs` - Validate component exports match source
- `validate:figma` - Validate component props match Figma designs (optional)
- `validate:package` - Validate built package

## Benefits

1. **Consistency**: All artifacts always have matching versions
2. **Automation**: Pre-commit hooks prevent version drift
3. **Simplicity**: Single source of truth eliminates confusion
4. **Reliability**: Automated validation catches issues early
5. **Developer Experience**: Update components, rest happens automatically

## Troubleshooting

### Versions Out of Sync

If versions are out of sync:

```bash
npm run sync:version
```

This will:
- Read root `package.json` version
- Update `ft-docs/package.json`
- Validate consistency
- Report any issues

### Pre-Commit Hook Not Working

Check if the hook is executable:

```bash
chmod +x .git/hooks/pre-commit
```

### Manual Override

If you need to bypass the pre-commit hook (not recommended):

```bash
git commit --no-verify
```

**Warning**: This bypasses version sync checks and can cause version mismatches.

## Best Practices

1. **Always update root `package.json`** for version changes
2. **Let scripts handle syncing** - don't manually edit `ft-docs/package.json`
3. **Run `sync:all`** after major component changes
4. **Check version consistency** before publishing
5. **Use npm version commands** for semantic versioning

## Migration Notes

### From Previous Architecture

If you're migrating from a manual version management system:

1. Ensure root `package.json` has the correct version
2. Run `npm run sync:version` to sync all locations
3. Verify versions are aligned
4. Enable pre-commit hook (already set up)

### Component Updates

When updating components:

1. Edit component source files
2. Commit changes (pre-commit hook handles sync)
3. Build and test
4. Publish when ready

The system handles version synchronization automatically.

