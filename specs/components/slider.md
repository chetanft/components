# Slider Contract

## Path
- `src/components/molecules/Slider`

## API
- Variants: single value or range (via `range` boolean)
- Orientations: horizontal (default), vertical (via `vertical` boolean)
- Props: `value`, `defaultValue`, `min`, `max`, `step`, `disabled`, `tooltip` (boolean or `{ formatter }`)
- Composable sub-components: `SliderTrack`, `SliderRange`, `SliderThumb`, `SliderLabel`

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
- Track color uses `var(--primary)`; rail color uses `var(--border-secondary)`.
