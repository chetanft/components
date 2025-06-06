# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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