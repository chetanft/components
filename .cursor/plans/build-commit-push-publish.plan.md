# Build, Commit, Push, and Publish Plan

## Overview

Execute the complete release workflow:
1. Build the project (runs type-check, validation, and rollup build)
2. Stage and commit all changes (including new scripts and reports)
3. Push to git remote
4. Publish to npm registry

## Current Changes

### Modified Files
- `CUSTOMIZATION_GAP_REPORT.md` - Updated to reflect all gaps fixed
- `package.json` - Added new npm scripts (`scan:customization-gaps`, `inventory:comprehensive`)
- Chart components (13 files) - Added `defaultColors` prop support
- `src/components/molecules/DatePicker/Calendar.tsx` - Already has quickSelectOptions
- `src/components/molecules/Transfer/Transfer.tsx` - Modified
- `src/components/organisms/Table/Table.tsx` - Modified
- `src/stories/LineChart.stories.tsx` - Added CustomDefaultColors story
- `src/components/charts/LineChart.test.tsx` - New test file

### New Files
- `scripts/inventory-components-comprehensive.cjs` - Comprehensive inventory script
- `scripts/scan-customization-gaps.cjs` - Customization gap scanner
- `COMPONENT_INVENTORY.json` - Inventory data (should be gitignored)
- `COMPONENT_INVENTORY_REPORT.md` - Inventory report (documentation)
- `COMPONENT_FIX_BACKLOG.md` - Prioritized backlog (documentation)
- `CUSTOMIZATION_GAP_SCAN_REPORT.md` - Gap scan report (documentation)
- `CUSTOMIZATION_GAP_SCAN_RESULTS.json` - Gap scan results (should be gitignored)

## Execution Steps

### Step 1: Update .gitignore
Add generated report files to `.gitignore`:
- `COMPONENT_INVENTORY.json` (generated data)
- `CUSTOMIZATION_GAP_SCAN_RESULTS.json` (generated data)
- Keep markdown reports (human-readable documentation)

### Step 2: Build Project
Run: `npm run build`
- This executes: `sync:version` → `validate:docs` → `generate:token-reference` → `generate:registry` → `rollup -c`
- Validates TypeScript types
- Validates component exports
- Builds distribution files

### Step 3: Run Tests (Optional but Recommended)
Run: `npm test`
- Verify all tests pass, especially new `LineChart.test.tsx`

### Step 4: Stage Changes
```bash
git add .
```
Or selectively:
- `git add scripts/` (new scripts)
- `git add src/components/charts/` (chart updates)
- `git add src/stories/LineChart.stories.tsx`
- `git add src/components/charts/LineChart.test.tsx`
- `git add package.json`
- `git add CUSTOMIZATION_GAP_REPORT.md`
- `git add COMPONENT_INVENTORY_REPORT.md`
- `git add COMPONENT_FIX_BACKLOG.md`
- `git add CUSTOMIZATION_GAP_SCAN_REPORT.md`

### Step 5: Commit Changes
Create a descriptive commit message:
```
feat: Add customization gap scanner and comprehensive component inventory

- Add scan-customization-gaps.cjs script for automated gap detection
- Add inventory-components-comprehensive.cjs for full component audit
- Implement defaultColors prop for all chart components
- Add tests and stories for chart defaultColors customization
- Update CUSTOMIZATION_GAP_REPORT.md with all fixes completed
- Generate component inventory reports and prioritized backlog

Breaking changes: None (all new props are optional with defaults)
```

### Step 6: Push to Git
```bash
git push origin main
```
Or if on a different branch:
```bash
git push origin <branch-name>
```

### Step 7: Determine Version Bump
Based on changes:
- **Patch** (4.15.23 → 4.15.24): Bug fixes, minor improvements
- **Minor** (4.15.23 → 4.16.0): New features (defaultColors prop, new scripts)
- **Major** (4.15.23 → 5.0.0): Breaking changes (none in this case)

**Recommendation**: **Minor version** (4.16.0) because:
- New feature: `defaultColors` prop for chart components
- New scripts: inventory and gap scanning tools
- No breaking changes

### Step 8: Publish to npm
Option A - Use interactive CLI (recommended):
```bash
npm run publish
```
Then select "minor" version option.

Option B - Direct publish:
```bash
npm run publish:minor
```
This will:
1. Bump version to 4.16.0
2. Sync versions across packages
3. Validate docs
4. Type-check
5. Build
6. Publish to npm

## Verification Steps

After publishing:
1. Verify package on npm: `npm view @chetanft/design_system versions`
2. Test installation: `npm install @chetanft/design_system@4.16.0`
3. Verify new props are available in TypeScript types
4. Check that stories work in Storybook

## Files to Update

1. **Update `.gitignore`** to exclude generated JSON files:
   ```
   # Generated inventory/scan data
   COMPONENT_INVENTORY.json
   CUSTOMIZATION_GAP_SCAN_RESULTS.json
   ```

2. **Keep markdown reports** (they're documentation, not generated data)

## Risk Assessment

- **Low Risk**: All changes are additive (optional props, new scripts)
- **No Breaking Changes**: Existing API unchanged
- **Tests Added**: New test coverage for chart defaultColors
- **Build Should Pass**: TypeScript types are correct

## Rollback Plan

If issues occur:
1. Revert commit: `git revert <commit-hash>`
2. Unpublish version (if needed): `npm unpublish @chetanft/design_system@4.16.0 --force`
3. Fix issues and republish

## Notes

- The `publish:minor` command automatically handles version bumping and syncing
- Generated JSON files should be gitignored but markdown reports are documentation
- All chart components now support `defaultColors` prop
- Comprehensive inventory system is ready for ongoing audits
