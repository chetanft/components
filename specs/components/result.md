# Result Contract

## Path
- `src/components/organisms/Result`

## API
- Statuses: `success`, `error`, `info`, `warning`, `404`, `403`, `500`
- Props: `status`, `glass` (GlassVariant)
- Composable sub-components: `ResultIcon`, `ResultTitle`, `ResultSubtitle`, `ResultExtra`
- Helper: `ResultStatusIcon` renders the default icon for a given status

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
- Status colors map to `var(--positive)`, `var(--critical)`, `var(--neutral)`, `var(--warning)`, `var(--tertiary)`.
