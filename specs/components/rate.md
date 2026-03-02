# Rate Contract

## Path
- `src/components/molecules/Rate`

## API
- Sizes: `sm`, `md`, `lg`, `xl`
- Props: `value`, `defaultValue`, `count` (default 5), `allowHalf`, `allowClear`, `disabled`, `readOnly`, `character`, `tooltips` (string[])
- Composable sub-components: `RateItem`, `RateIcon`

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
- Active color defaults to `var(--warning)`; inactive to `var(--border-primary)`.
