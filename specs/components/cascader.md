# Cascader Contract

## Path
- `src/components/molecules/Cascader`

## API
- Sizes: `sm`, `md`, `lg` (via `ComponentSize`)
- Props: `value` (string[]), `defaultValue`, `placeholder`, `allowClear`, `expandTrigger` (`click`|`hover`), `changeOnSelect`, `showSearch`, `label`, `labelMandatory`, `labelOptional`, `error`, `helperText`, `glass` (GlassVariant)
- Composable sub-component: `CascaderOption` (nestable for hierarchy)

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
