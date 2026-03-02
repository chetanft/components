# ProgressBar Contract

## Path
- `src/components/molecules/ProgressBar`

## API
- Types: `line`, `circle`, `dashboard`
- Variants: `primary`, `success`, `warning`, `danger`, `active`
- Sizes (line only): `sm`, `md`, `lg`
- Props: `value` (0–100), `animated` (boolean), `steps` (number), `gapDegree` (0–295, dashboard only), `gapPosition` (`top`|`bottom`|`left`|`right`), `format` (function)
- Also exported as `Progress` alias

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
- Color variants map to `var(--primary)`, `var(--positive)`, `var(--warning)`, `var(--critical)`, `var(--neutral)`.
