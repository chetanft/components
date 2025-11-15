# Design Tokens Integration Guide

This document outlines the design tokens that have been applied to the component library based on the Figma design system export.

## Overview

All components have been updated to use a centralized design token system that provides:

- Consistent colors across all variants
- Responsive typography scaling
- Standardized spacing values
- Border radius consistency  
- Global CSS custom properties

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
- Critical: `--color-critical` (#ff3533), `--color-critical-dark` (#b80100), `--color-critical-light` (#ffeaea)
- Warning: `--color-warning` (#ff6c19), `--color-warning-dark` (#dd6a00), `--color-warning-light` (#ffebdc)  
- Positive: `--color-positive` (#00c638), `--color-positive-dark` (#00763d), `--color-positive-light` (#dfffe8)
- Neutral: `--color-neutral` (#1890ff), `--color-neutral-dark` (#006ed3), `--color-neutral-light` (#ecf6ff)

### Typography

**Font Family:**
- `--font-family-primary`: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

**Typography Variants (Figma Spec)**
- Title Primary: 28px / 140%, regular weight
- Title Secondary: 24px / 140%, semibold
- Display Primary: 20px / 140%, semibold
- Button: 20px / 140%, medium with 0.0264px tracking
- Body Primary: 16px / 140% (semibold, medium, italic, regular)
- Body Secondary: 14px / 140% (semibold, medium, regular)

### Spacing (Responsive)

Desktop spacing uses 4px base unit:
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
2. **Use semantic color tokens** (critical, warning, positive, neutral) instead of specific colors
3. **Follow the spacing scale** - use increments of the x-scale (x1, x2, x3, etc.)
4. **Use built icons** from the icon system instead of external libraries
5. **Test responsive behavior** across different screen sizes

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