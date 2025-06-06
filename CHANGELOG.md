# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2024-12-19

### Changed
- **Button Typography**: Updated Button component font size to 20px (text-xl) to match Figma design specifications
- **Button Font Weight**: Updated Button component to use font-weight 500 (Medium) to match Figma design specifications
- **Button Letter Spacing**: Added proper letter spacing (tracking-wide) to match Figma design specifications
- **Icon Sizing**: Updated Button icon sizes to be proportional to new font size: SM(16px), MD(20px), LG(24px)

### Fixed
- **Typography Consistency**: Button component now perfectly matches Figma typography specifications (20px font, 500 weight)
- **Design System Alignment**: All Button variants and sizes now use consistent 20px font size
- **Component Tests**: Updated all Button component tests to reflect new font size expectations

### Technical
- **Automatic Propagation**: Font size changes automatically propagate to all molecules and organisms using Button atom
- **Test Coverage**: Maintained 100% test coverage with updated font size expectations
- **Figma Integration**: Used Figma MCP server to extract exact typography specifications from design files

## [Previous Unreleased]

### Added
- **MAJOR**: Atomic Design Structure - Reorganized components into atoms/, molecules/, organisms/, and templates/
- **MAJOR**: Complete design token system using 8-point grid with 20px special unit
- **MAJOR**: Systematic dark mode support with comprehensive color palette
- Enhanced accessibility features with ARIA attributes and keyboard navigation
- Comprehensive shadow, spacing, border radius, and opacity token systems
- Focus management and improved focus indicators
- Backward compatibility exports for smooth migration

### Changed
- **BREAKING**: Component import paths now follow atomic design structure
- **BREAKING**: Dark mode implementation replaces previous approach
- Updated Tailwind configuration with complete design token system
- Improved component APIs with better TypeScript support
- Enhanced Button component with design tokens instead of hardcoded values

### Deprecated
- Legacy component exports (ButtonLegacy, InputLegacy, BadgeLegacy) - will be removed in v2.0.0
- RadioGroupItem component - use RadioGroup with options prop instead

### Security
- Enhanced input validation and sanitization
- Improved ARIA attributes for better screen reader support

## [1.0.1] - 2024-01-15

### Fixed
- Minor bug fixes in component exports
- Improved TypeScript definitions

### Added
- Initial Storybook documentation
- Basic component structure

## [1.0.0] - 2024-01-01

### Added
- Initial release of the design system
- Core components: Button, Input, Badge, Checkbox, Radio, Switch
- Form components: Dropdown, DatePicker, RadioSelector
- Complex components: Table, AppHeader, Footer, UserProfile
- File management components: UploadZone, FileCard, FileThumbnail
- Navigation components: Tabs, SegmentedTabs, Steps
- Layout components: Collapsible, QuickFilters
- Utility components: Icons, Typography, Colors, ProgressBar
- Figma Code Connect integration
- Rollup build system with ESM and CJS outputs
- TypeScript support with strict mode
- Storybook documentation

### Technical
- React 18+ support
- TypeScript 5+ support
- Tailwind CSS integration
- CSS variable-based theming
- Tree-shaking support
- NPM package ready

## [Recent Updates] - 2024-12-XX

### Fixed
- **Tertiary Tabs**: Fixed oval shape issue by implementing proper pill shape (`rounded-pill` instead of `rounded-full`)
- **Circular Buttons**: Fixed oval shape issue for icon-only buttons by ensuring perfect circles with equal width/height
- **Button Font Sizes**: Corrected font sizes to match Figma specifications (16px base instead of 20px)
- **Button Sizing**: Updated medium and large button font sizes for better visual hierarchy
- **Icon Alignment**: Fixed icon cropping and misalignment issues in buttons and containers
- **Icon Color Inheritance**: Fixed icons using hardcoded colors (CrossIcon, Edit) to use `currentColor` for proper theming
- **FileCard Buttons**: Updated FileCard action buttons to use standard Button sizing (44px) instead of fixed 40px

### Improved
- **Design Tokens**: Enhanced border radius system with proper `pill` and `circle` radius tokens
- **Component Documentation**: Updated Storybook examples to demonstrate correct circular button usage
- **Molecules & Organisms**: Updated all molecules and organisms to use the latest atom implementations
- **Icon Component**: Enhanced with better flexbox centering to prevent cropping and improve alignment
- **Button Component**: Automatic circular button handling when `rounded-full` class is used
- **Icon Stories**: Added comprehensive icon alignment test stories to verify proper centering

### Technical Improvements
- **Icon Container**: Changed from `inline-block` to `flex` layout for better centering
- **Button Circular Logic**: Improved automatic width/height matching for circular buttons
- **Icon Sizing**: Adjusted icon sizes per button size (sm: 14px, md: 16px, lg: 20px)
- **Manual Overrides**: Removed manual sizing overrides from components in favor of automatic handling

## [1.0.1] - 2024-12-18

### Fixed
- Minor bug fixes in component exports
- Improved TypeScript definitions

### Added
- Initial Storybook documentation
- Basic component structure

---

## Migration Guide

### From v1.0.x to v2.0.0 (Upcoming)

#### Import Path Changes
```typescript
// Before (v1.0.x)
import { Button } from '@ft/design-system';

// After (v2.0.0) - Recommended
import { Button } from '@ft/design-system'; // Still works via re-exports

// Or use atomic imports for smaller bundle sizes
import { Button } from '@ft/design-system/atoms';
```

#### Dark Mode Changes
```typescript
// Before (v1.0.x)
// Limited dark mode support

// After (v2.0.0)
import { ThemeProvider } from '@ft/design-system';

<ThemeProvider theme="dark">
  <App />
</ThemeProvider>
```

#### Component Updates
- RadioGroupItem is deprecated, use RadioGroup with options prop
- All components now support dark mode out of the box
- Enhanced accessibility features are enabled by default
- Focus indicators follow new design system standards

#### Design Tokens
```css
/* Before (v1.0.x) */
padding: 24px;

/* After (v2.0.0) */
padding: var(--space-6); /* 24px via design tokens */
```

### Breaking Changes Summary
1. **Import Paths**: Components moved to atomic structure (backward compatible via re-exports)
2. **Dark Mode**: Complete overhaul of dark mode system
3. **Design Tokens**: All hardcoded values replaced with design tokens
4. **Accessibility**: New ARIA attributes and keyboard navigation (non-breaking enhancement)
5. **Focus States**: New focus indicator design (visual change only)

### Deprecated Features
- `RadioGroupItem` component (use `RadioGroup` with `options` prop)
- Legacy export names (`ButtonLegacy`, `InputLegacy`, `BadgeLegacy`)

For detailed migration assistance, please refer to our [Migration Guide](./docs/MIGRATION.md). 