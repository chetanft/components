# Design Tokens Integration Guide

This document outlines the design tokens that have been applied to the component library based on the Figma design system export.

> **📖 Complete Token Reference:** For a comprehensive, auto-generated reference of all tokens, see [`docs/DESIGN_TOKENS_REFERENCE.md`](./docs/DESIGN_TOKENS_REFERENCE.md).  
> The token reference is automatically generated from CSS source and includes all available tokens with usage examples.

## Overview

All components have been updated to use a centralized design token system that provides:

- Consistent colors across all variants
- Responsive typography scaling (rem-based)
- Standardized spacing values (px for precision, rem for scalability)
- Border radius consistency  
- Global CSS custom properties

> **📐 Rem Unit Policy:** The design system uses **rem units** for typography and optional rem-based spacing. See [`docs/REM_POLICY.md`](./docs/REM_POLICY.md) for detailed guidelines on when to use rem vs px.

## How to Use

### 1. Import Global Styles

First, import the global CSS file in your application's root:

```tsx
// In your main App.tsx or _app.tsx
import '@your-package/components/styles/globals.css';
```

### 2. Using Design Tokens in Code

```tsx
import { designTokens } from '@your-package/components';

// Access tokens programmatically
const primaryColor = designTokens.colors.primary.default; // #434f64
const mediumSpacing = designTokens.spacing.desktop.x6; // 24px
```

### 3. Using CSS Custom Properties

All design tokens are available as CSS custom properties:

```css
.my-component {
  color: var(--color-neutral);
  font-size: 16px;
  padding: var(--spacing-x4);
  border-radius: var(--radius-md);
}
```

## Design Token Categories

### Colors

**Neutrals:**
- `--color-dark-100`: #434f64 (Primary text)
- `--color-dark-50`: #5f697b (Secondary text)  
- `--color-dark-25`: #838c9d (Placeholder text)
- `--color-border`: #ced1d7 (Borders)
- `--color-divider`: #f0f1f7 (Dividers)
- `--color-background`: #f8f8f9 (Backgrounds)
- `--color-white`: #ffffff

**Status Colors:**
- Critical: `--color-critical` (#ff3532), `--color-critical-dark` (#b80100), `--color-critical-light` (#ffeaea)
- Warning: `--color-warning` (#ff6c19), `--color-warning-dark` (#dd6a00), `--color-warning-light` (#ffebdc)  
- Positive: `--color-positive` (#00c638), `--color-positive-dark` (#00763d), `--color-positive-light` (#dfffe8)
- Neutral: `--color-neutral` (#1890ff), `--color-neutral-dark` (#006ed3), `--color-neutral-light` (#ecf6ff)

**Danger Scale (for Alert component):**
- `--danger-500` (#ff3532) - Alert danger variant border, text, and icon
- `--danger-100` (#ffeafa) - Alert danger variant background

### Typography

**Font Family:**
- `--font-family-primary`: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

**Typography Tokens (Rem-Based - Responsive)**

All typography uses rem units for responsive scaling. The root font-size is 14px (base) and scales to 16px at screens >1440px.

| Token | Rem Value | Base (14px) | Scaled (16px) | Utility Class |
|-------|-----------|-------------|---------------|---------------|
| `--font-size-xs-rem` | `0.857rem` | 12px | 13.71px | `.text-xs-rem` |
| `--font-size-sm-rem` | `1rem` | 14px | 16px | `.text-sm-rem` |
| `--font-size-md-rem` | `1.143rem` | 16px | 18.29px | `.text-md-rem` |
| `--font-size-lg-rem` | `1.429rem` | 20px | 22.86px | `.text-lg-rem` |
| `--font-size-xl-rem` | `1.714rem` | 24px | 27.43px | `.text-xl-rem` |
| `--font-size-xxl-rem` | `2rem` | 28px | 32px | `.text-xxl-rem` |

**Typography Variants (Figma Spec)**
- Title Primary: 28px → `2rem` (`.text-xxl-rem`) / 140%, regular weight
- Title Secondary: 24px → `1.714rem` (`.text-xl-rem`) / 140%, semibold
- Display Primary: 20px → `1.429rem` (`.text-lg-rem`) / 140%, semibold
- Button: 20px → `1.429rem` (`.text-lg-rem`) / 140%, medium with 0.0264px tracking
- Body Primary: 16px → `1.143rem` (`.text-md-rem`) / 140% (semibold, medium, italic, regular)
- Body Secondary: 14px → `1rem` (`.text-sm-rem`) / 140% (semibold, medium, regular)

**Usage:**
```tsx
// ✅ Correct - Using rem utility class
<Typography variant="body-primary-regular" className="text-md-rem">
  Responsive text
</Typography>

// ✅ Correct - Using rem CSS variable
<div style={{ fontSize: 'var(--font-size-md-rem)' }}>
  Also responsive
</div>
```

### Spacing (Hybrid: px for precision, rem for scalability)

Spacing uses an 8-point grid system (4px base unit). Two token sets are available:

**Pixel-Based Tokens (Precise Spacing)**
Use for borders, icons, grid alignment, and other cases where pixel precision matters:

- `--spacing-x0`: 0px
- `--spacing-x1`: 4px
- `--spacing-x2`: 8px
- `--spacing-x3`: 12px
- `--spacing-x4`: 16px
- `--spacing-x5`: 20px
- `--spacing-x6`: 24px
- `--spacing-x7`: 28px
- `--spacing-x8`: 32px
- `--spacing-x9`: 36px
- `--spacing-x10`: 40px
- `--spacing-x11`: 44px
- `--spacing-x12`: 48px
- `--spacing-x13`: 52px
- `--spacing-x14`: 56px
- `--spacing-x15`: 60px
- `--spacing-x16`: 64px
- `--spacing-x20`: 80px
- `--spacing-x24`: 96px
- `--spacing-x38`: 152px

**Rem-Based Tokens (Scalable Spacing)**
Use for component padding, margins between text elements, and other spacing that should scale with typography:

- `--spacing-x0-rem`: 0rem
- `--spacing-x1-rem`: 0.286rem (4px base, 4.57px scaled)
- `--spacing-x2-rem`: 0.571rem (8px base, 9.14px scaled)
- `--spacing-x3-rem`: 0.857rem (12px base, 13.71px scaled)
- `--spacing-x4-rem`: 1.143rem (16px base, 18.29px scaled)
- `--spacing-x5-rem`: 1.429rem (20px base, 22.86px scaled)
- `--spacing-x6-rem`: 1.714rem (24px base, 27.43px scaled)
- `--spacing-x7-rem`: 2rem (28px base, 32px scaled)
- `--spacing-x8-rem`: 2.286rem (32px base, 36.57px scaled)
- `--spacing-x9-rem`: 2.571rem (36px base, 41.14px scaled)
- `--spacing-x10-rem`: 2.857rem (40px base, 45.71px scaled)
- `--spacing-x11-rem`: 3.143rem (44px base, 50.29px scaled)
- `--spacing-x12-rem`: 3.429rem (48px base, 54.86px scaled)
- `--spacing-x13-rem`: 3.714rem (52px base, 59.43px scaled)
- `--spacing-x14-rem`: 4rem (56px base, 64px scaled)
- `--spacing-x15-rem`: 4.286rem (60px base, 68.57px scaled)
- `--spacing-x16-rem`: 4.571rem (64px base, 73.14px scaled)
- `--spacing-x20-rem`: 5.714rem (80px base, 91.43px scaled)
- `--spacing-x24-rem`: 6.857rem (96px base, 109.71px scaled)
- `--spacing-x38-rem`: 10.857rem (152px base, 173.71px scaled)

**Decision Guide:**
- **Use px tokens** (`--spacing-x4`) for: borders, icons, fixed layouts, grid alignment
- **Use rem tokens** (`--spacing-x4-rem`) for: component padding, margins between text elements, spacing that should scale with typography

**Usage:**
```css
/* Precise spacing (border) */
.component {
  border-width: var(--spacing-x1); /* 4px - fixed */
}

/* Scalable spacing (padding) */
.component {
  padding: var(--spacing-x4-rem); /* 1.143rem - scales with root font-size */
}
```

### Layout & Grid System

**Breakpoints**
- `--breakpoint-xxl`: 1600px (ultra-wide)
- `--breakpoint-xl`: 1440px (desktop container)
- `--breakpoint-lg`: 1280px (large laptop)
- `--breakpoint-md`: 1024px (tablet)
- `--breakpoint-sm`: 768px (small tablet)
- `--breakpoint-xs`: 480px (mobile)

**Column Grid**

| Viewport | Columns | Margin | Gutter |
| --- | --- | --- | --- |
| >1440px | `--grid-desktop-columns` = 24 | `--grid-desktop-margin` = 20px | `--grid-desktop-gutter` = 20px |
| ≤1440px | `--grid-laptop-columns` = 24 | `--grid-laptop-margin` = 16px | `--grid-laptop-gutter` = 16px |
| ≤768px  | `--grid-mobile-columns` = 4 | `--grid-mobile-margin` = 16px | `--grid-mobile-gutter` = 16px |

Runtime tokens (`--grid-columns`, `--grid-gutter`, `--grid-margin`, `--container-max-width`) react to these breakpoints so layout code can stay token-based:

```tsx
<section className="ft-container">
  <div className="ft-grid">
    <article style={{ gridColumn: 'span 8' }}>...</article>
  </div>
</section>
```

### Border Radius

- `--radius-none`: 0px
- `--radius-sm`: 4px  
- `--radius-md`: 8px
- `--radius-lg`: 16px
- `--radius-full`: 100px

## Component Updates

### Button Component
- ✅ Uses `--color-neutral` for primary variant
- ✅ Uses `--color-critical` for destructive variant  
- ✅ Uses `--color-warning` for warning variant
- ✅ Uses `--color-positive` for success variant
- ✅ Uses responsive font sizes and spacing
- ✅ Uses built `add` icon instead of inline SVG

### Badge Component  
- ✅ Uses semantic color tokens for all variants
- ✅ Uses 14px body-secondary typography with proper weights
- ✅ Uses `--spacing-x2` for consistent padding
- ✅ Uses `--radius-sm` for border radius

### Input Component
- ✅ Uses `--color-border` for default borders
- ✅ Uses status colors for error/warning states
- ✅ Uses `--color-dark-100` for text
- ✅ Uses `--color-dark-25` for placeholders
- ✅ Uses built `search` icon instead of Lucide

### DatePicker Component
- ✅ Uses design tokens for all color variants
- ✅ Uses built `calendar` and `clock` icons
- ✅ Uses responsive spacing and typography
- ✅ Consistent focus ring styling

### Dropdown Component  
- ✅ Uses design tokens for borders and backgrounds
- ✅ Uses built `chevron-down` and `chevron-up` icons
- ✅ Consistent hover and focus states
- ✅ Responsive sizing and spacing

### Checkbox Component
- ✅ Uses `--color-dark-25` for default border
- ✅ Uses `--color-dark-100` for checked state
- ✅ Uses built `check` icon instead of Lucide
- ✅ Uses `--radius-sm` for consistent rounding

### Typography Component
- ✅ Documents the eleven Figma-aligned variants (`title-primary`, `body-secondary-medium`, etc.)
- ✅ Uses direct pixel values (28px, 24px, 20px, 16px, 14px) with 140% line-height
- ✅ Shows semantic color usage through the `color` prop

### Alert Component
- ✅ Uses `--danger-100` for danger variant background
- ✅ Uses `--danger-500` for danger variant border, text, and icon
- ✅ Uses semantic color tokens for all variants (info, success, warning, danger)
- ✅ Configurable radius prop: `none`, `sm` (`--radius-sm`), `md` (`--radius-md`), `lg` (`--radius-lg`)
- ✅ Default radius: `md` for regular alerts, `none` for banner alerts
- ✅ Uses built `alert-critical` icon for danger variant

## Icon System Integration

All components now use the built icon system instead of external libraries:

- **Button**: `add` icon
- **Input**: `search` icon  
- **DatePicker**: `calendar` and `clock` icons
- **Dropdown**: `chevron-down` and `chevron-up` icons
- **Badge**: `chevron-right` icon for trailing
- **Checkbox**: `check` icon

## Responsive Behavior

The design token system automatically handles responsive typography and spacing:

```css
/* Desktop by default */
.component {
  font-size: 16px;
  padding: var(--spacing-x4); /* 16px */
}

/* Automatically adjusts on tablet */
@media (max-width: 1440px) {
  .component {
    font-size: 14px;
    padding: var(--spacing-x4); /* 12px */
  }
}
```

## Best Practices

1. **Always use CSS custom properties** instead of hardcoded values
2. **Use rem units for typography** - all font sizes should use rem tokens or rem utility classes
3. **Choose spacing units wisely** - use px tokens for precise spacing (borders, icons), rem tokens for typography-relative spacing (padding, margins)
4. **Use semantic color tokens** (critical, warning, positive, neutral) instead of specific colors
5. **Follow the spacing scale** - use increments of the x-scale (x1, x2, x3, etc.)
6. **Use built icons** from the icon system instead of external libraries
7. **Test responsive behavior** across different screen sizes and browser zoom levels
8. **Respect accessibility** - rem units automatically respect browser zoom and OS font scaling

## Rem Unit Policy

For detailed guidelines on rem usage, scaling strategy, and cross-platform considerations, see:

- **[Rem Policy Guide](./docs/REM_POLICY.md)** - Complete rem unit policy and best practices
- **[Platform Mapping Guide](./docs/PLATFORM_MAPPING.md)** - Cross-platform unit conversion (Web, iOS, Android)

## Migration from Hardcoded Values

If you have existing components using hardcoded values, update them as follows:

```css
/* Before */
.old-component {
  color: #434f64;
  font-size: 16px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ced1d7;
}

/* After */  
.new-component {
  color: var(--color-dark-100);
  font-size: 16px;
  padding: var(--spacing-x4);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}
```

This ensures your components will automatically benefit from future design token updates and maintain consistency across the entire system.

---

## 📖 Complete Token Reference

For a comprehensive, searchable reference of all design tokens, see:

**[`docs/DESIGN_TOKENS_REFERENCE.md`](./docs/DESIGN_TOKENS_REFERENCE.md)**

The complete token reference includes:
- All color scales (primary, secondary, tertiary, neutral, positive, warning, danger)
- Semantic colors and status colors
- Complete spacing system (8-point grid)
- Typography tokens (font families, sizes, weights)
- Shadows, transitions, and border radius tokens
- Breakpoints and grid system tokens
- Component-specific tokens
- Usage examples (CSS, JavaScript, React)

The reference is auto-generated from `src/styles/globals.css` and stays in sync with the design system. 
