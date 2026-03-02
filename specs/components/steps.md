# Steps Contract

## Path
- `src/components/molecules/Steps`

## API
- Types: `default`, `dot`, `navigation`
- Directions: `horizontal`, `vertical`
- Devices: `desktop`, `mobile`
- Props: `currentStep` (number, 1-based), `glass` (GlassVariant)
- Composable sub-components: `StepsList`, `StepItem`, `StepIcon`, `StepContent`, `StepTitle`, `StepDescription`

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
