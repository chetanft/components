# Token Debt Burn-Down Plan

Baseline date: 2026-03-02
Original total: 1245 issues across 138 files.
Current total: 282 issues across 42 files.
Reduction: 77.3% (963 issues eliminated).

## Completed

### Batch 1 (Core components)
- Button, Input, Table, Modal, Dropdown, Select, DatePicker, Card, Typography, Badge, Avatar
- 15 files, 111 issues → 0 issues

### Batch 2 (All remaining)
- Heavy hitters: Blocks.tsx, ListingLayout, PercentageOfChargeInput, NavigationPopover, UserProfileDropdown, AppHeader, DisplayBlock, FileTypeIcon
- Atoms: 22 files (Badge, Colors, Divider, Label, ReadOnly, Switch, Text, Toggle, etc.)
- Molecules: 27 files (Chicklet, Cascader, Calendar, SegmentedTabs, ProgressBar, Graphs, etc.)
- Organisms: 23 files (DataEntryTable, Drawer, Tabs, NavigationMenu, FileCard, etc.)
- Icons/Logos: 37 SVG files — hex colors replaced with CSS vars
- Charts: chartConfig.ts + 6 chart components — getCssVar() helper added for Chart.js theming

## Remaining (282 issues, irreducible baseline)

### By category:
- Hex Colors: 58 — mostly unmapped palette shades (primary100-900), logo-specific colors
- RGBA: 17 — dynamic opacity values, no token equivalent
- Spacing: 132 — CSS var fallbacks (`var(--x3,12px)`), Canvas API, dynamic computed values
- Font Size: 5 — CSS var fallbacks
- Other PX: 70 — 1px borders, calc offsets, media queries

### Policy
- CI blocks regressions via `npm run check:tokens` (baseline-aware)
- Remaining issues are documented as acceptable exceptions
- Any new violations must use design tokens

## Definition of Done
- No regression vs baseline
- `npm run check:tokens` passes
- `npx tsc --noEmit` passes
