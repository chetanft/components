# Scripts

This directory contains utility scripts for the FT Design System.

## PX Literal Detection (`check-px-literals.js`)

This script automatically scans the codebase for pixel literals that should be replaced with FT design system tokens.

### Usage

```bash
npm run check:px
```

### What it does

- Scans all TypeScript/TypeScript React files in the `src/` directory
- Identifies pixel literals (e.g., `16px`, `100px`)
- Allows certain patterns that are acceptable (like `1px` borders)
- Fails the build if unauthorized px values are found

### Allowed Patterns

The following px patterns are allowed and won't trigger failures:

- `1px solid` - Standard border widths
- `1px` in arbitrary Tailwind classes (e.g., `border-[1px]`)
- `1px` in box shadows
- `1px inset` - For inset shadows

### Adding Exceptions

If you need to allow a new px pattern (for legitimate reasons), add it to the `ALLOWED_PATTERNS` array in `check-px-literals.js`:

```javascript
const ALLOWED_PATTERNS = [
  /1px\s+solid/,  // 1px borders
  /1px\s*\]/,     // 1px in arbitrary values
  /your-new-pattern/, // Add your pattern here
];
```

### Excluded Files

The script excludes certain file types and directories:

- Test files (`*.test.tsx?`)
- Story files (`*.stories.tsx?`)
- Node modules
- Build outputs

### CI Integration

This script runs automatically in CI via `.github/workflows/ci.yml`. Pull requests will fail if unauthorized px literals are detected.

### Token Recommendations

When replacing px values, use these FT design system tokens:

- **Spacing**: `var(--spacing-xN)` where N is the spacing scale
- **Widths/Heights**: `calc(var(--spacing-xN) * multiplier)`
- **Component dimensions**: `var(--component-height-*)`, `var(--component-width-*)`
- **Container max-width**: `var(--container-max-width)`
- **Borders**: `1px` is acceptable, but consider `var(--border-width)` for consistency
