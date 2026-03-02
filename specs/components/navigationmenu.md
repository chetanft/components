# NavigationMenu Contract

## Path
- `src/components/organisms/NavigationMenu`

## API
- Variants: none (single layout, hardcoded navigation structure for FT logistics app)
- Props: `glass` (GlassVariant), `onClose`, `onNavigate` (itemLabel: string), `onFooterButtonClick` (`announcement`|`releases`)
- Note: Navigation items and submenu columns are hardcoded (Summary Page, Planning, Full Truck Load, Part Truck Load, Control Tower, Dashboard, Reports, Onboarding, Support). Consumers control behavior via callbacks only.

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
