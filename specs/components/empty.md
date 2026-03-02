# Empty Contract

## Path
- `src/components/molecules/Empty`

## API
- Image types: `default`, `simple`, `no-data`, `error` (or custom `React.ReactNode`)
- Props: `description` (ReactNode), `image` (EmptyImage | ReactNode), `imageStyle`
- Preset configs: `EmptyPresets.noResults`, `EmptyPresets.noData`, `EmptyPresets.error`, `EmptyPresets.emptyList`

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
- Built-in SVG illustrations use `var(--border-primary)`, `var(--border-secondary)`, `var(--tertiary)`, `var(--critical)`.
