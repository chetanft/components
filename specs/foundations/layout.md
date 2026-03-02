# Foundations: Layout

## Spacing System
- Use tokenized spacing scale (`--spacing-x*`).
- 8-point rhythm is default; 4-point increments are acceptable where tokenized.

## Breakpoints
- Use design token breakpoints (`--breakpoint-*`) for responsive behavior.
- Avoid raw media-query pixel literals in component logic unless unavoidable.

## Sizing
- Prefer semantic size props (`sm`, `md`, `lg`, etc.).
- Avoid ad hoc width/height literals in components.
