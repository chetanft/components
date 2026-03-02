# Textarea Contract

## Path
- `src/components/atoms/Textarea`

## API
- Sizes: `sm`, `md`, `lg` (via `ComponentSize`)
- Props: `size`, `disabled`, `id`, `rows` (default 4); extends `TextareaHTMLAttributes`
- Composable sub-components: `TextareaLabel`, `TextareaField`, `TextareaError`, `TextareaHelper`, `TextareaWrapper`

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
