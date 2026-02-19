# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.21.0] - 2025-02-19

### Added
- **Glassmorphism Support**: Added glass/glassmorphism design tokens, CSS utilities, and `glass` prop across 80+ components
  - Light, dark, and night mode glass tokens (background, border, shadow, blur, saturate)
  - CSS utility classes: `.glass`, `.glass-subtle`, `.glass-prominent`
  - `GlassContext` provider for app-wide glass mode control
  - Graceful degradation for browsers without `backdrop-filter`
  - Respects `prefers-reduced-transparency` media query

## [4.15.0] - 2025-01-XX

### Added
- **Composable Architecture**: Complete refactor to Shadcn-style composable components
  - All components now support composable API with sub-components
  - Full `asChild` prop support via Radix UI Slot for maximum flexibility
  - Comprehensive JSDoc documentation with usage examples for AI tooling
  - All components support `forwardRef` for proper ref forwarding
  
- **DataEntryTable Composable API**: Refactored to composable primitives
  - `DataEntryTableHeader`, `DataEntryTableHeaderRow`, `DataEntryTableHeaderCell`
  - `DataEntryTableBody`, `DataEntryTableRow`, `DataEntryTableRowCell`, `DataEntryTableRowCheckbox`
  - Context-based state management for selection, focus, hover, and resizing
  - Backward compatible with declarative API (deprecated)

- **Form Controls Composable API**: Enhanced form components with composable primitives
  - `Input`: `InputWrapper`, `InputLabel`, `InputField`, `InputLeadingIcon`, `InputTrailingIcon`, `InputHelper`, `InputError`, `InputWarning`, `InputSuccess`
  - `Textarea`: `TextareaWrapper`, `TextareaLabel`, `TextareaField`, `TextareaHelper`, `TextareaError`
  - `Checkbox`: `CheckboxWrapper`, `CheckboxInput`, `CheckboxLabel`, `CheckboxHelper`, `CheckboxError`
  - `RadioGroup`: `RadioGroupLabel`, `RadioItem`, `RadioItemInput`, `RadioItemLabel`, `RadioGroupHelper`, `RadioGroupError`
  - `Switch`: `SwitchWrapper`, `SwitchInput`, `SwitchLabel`, `SwitchHelper`, `SwitchError`

- **Complex Organisms Composable API**: Refactored complex components
  - `Card`: `CardHeader`, `CardTitle`, `CardDescription`, `CardMeta`, `CardBody`, `CardFooter`, `CardActions`, `CardEyebrow`, `CardStatistic`
  - `Tabs`: `TabsList`, `TabsTrigger`, `TabsContent`, `TabsBadge`, `TabsIcon`
  - `Form`: `FormLabel`, `FormControl`, `FormHelper`, `FormError`, `FormDescription`
  - `Collapsible`: `CollapsibleTrigger`, `CollapsibleHeader`, `CollapsibleTitle`, `CollapsibleExtra`, `CollapsibleContent`, `CollapsibleIcon`

- **Feedback Components Composable API**: Refactored feedback components
  - `Alert`: `AlertIcon`, `AlertTitle`, `AlertDescription`, `AlertAction`, `AlertClose`
  - `Breadcrumb`: `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`, `BreadcrumbIcon`
  - `Pagination`: `PaginationList`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`
  - `Tooltip`: `TooltipTrigger`, `TooltipContent`, `TooltipTitle`, `TooltipDescription`, `TooltipArrow`

- **Data Display Components Composable API**: Refactored data display components
  - `List`: `ListItem`, `ListItemIcon`, `ListItemContent`, `ListItemTitle`, `ListItemDescription`, `ListItemAction`, `ListHeader`, `ListFooter`, `ListBody`
  - `Descriptions`: `DescriptionsTitle`, `DescriptionsExtra`, `DescriptionsItem`, `DescriptionsLabel`, `DescriptionsValue`
  - `Steps`: `StepsList`, `StepItem`, `StepIcon`, `StepContent`, `StepTitle`, `StepDescription`

- **Input Extensions Composable API**: Refactored input extension components
  - `Rate`: `RateItem`, `RateIcon`
  - `InputNumber`: `InputNumberWrapper`, `InputNumberField`, `InputNumberControls`, `InputNumberButton`, `InputNumberPrefix`, `InputNumberSuffix`
  - `Slider`: `SliderTrack`, `SliderRange`, `SliderThumb`, `SliderLabel`
  - `DatePicker`: `DatePickerTrigger`, `DatePickerInput`, `DatePickerCalendar`

- **Overlay Components Composable API**: Refactored overlay components
  - `Dropdown`: `DropdownTrigger`, `DropdownContent`
  - `DropdownMenu`: `DropdownMenuList`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuLabel`, `DropdownMenuSearch`
  - `Popconfirm`: `PopconfirmTrigger`, `PopconfirmContent`, `PopconfirmTitle`, `PopconfirmDescription`, `PopconfirmActions`, `PopconfirmIcon`, `PopconfirmArrow`
  - `HoverCard`: `HoverCardTrigger`, `HoverCardContent`

- **Remaining Components Composable API**: Refactored remaining components
  - `Upload`: `UploadTrigger`, `UploadList`
  - `Tree`: `TreeNode`, `TreeNodeSwitcher`, `TreeNodeCheckbox`, `TreeNodeIcon`, `TreeNodeContent`, `TreeNodeChildren`
  - `Timeline`: `TimelineDot`, `TimelineContent`, `TimelineLabel`
  - `Avatar`: `AvatarImage`, `AvatarFallback`
  - `Skeleton`: `SkeletonText`, `SkeletonImage`
  - `Statistic`: `StatisticTitle`, `StatisticValue`

### Changed
- **Backward Compatibility**: All declarative APIs are deprecated but still functional
  - Deprecation warnings shown in development mode
  - Migration guides available in `docs/migrations/composable-migration.md`
  - Old APIs will be removed in a future major version

### Fixed
- **TypeScript Errors**: Fixed all critical TypeScript compilation errors
  - Fixed duplicate property definitions in `TableCell`
  - Fixed type inference issues in `Table` component
  - Fixed missing imports (`cn` utility) in multiple components
  - Fixed undefined variables in `Timeline` and `DatePicker` components
  - Fixed `displayName` assignment issues

- **Build Errors**: Resolved all build-blocking errors
  - Fixed duplicate export conflicts (e.g., `TreeNode` type vs component)
  - Fixed JSX parsing errors in `.ts` files
  - Fixed context provider type mismatches

## [4.14.0] - 2025-12-02

### Added
- **Table Composable API**: Added Shadcn-compatible composable Table components
  - `TableHeader`, `TableHead`, `TableBody`, `TableRow` components now exported
  - Full control over table structure and styling
  - Supports both declarative (`columns` + `data`) and composable APIs
  - `TableCell` already supports `React.ReactNode` children for complex content

- **Select Composable API**: Complete Shadcn-compatible Select component suite
  - `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`
  - `SelectGroup`, `SelectLabel`, `SelectSeparator` for advanced layouts
  - Context-based state management
  - Portal rendering for proper z-index management
  - Backward compatible with legacy `SelectLegacy` component

- **Input Custom Icon Support**: Enhanced Input component with custom icon components
  - `leadingIcon` and `trailingIcon` now accept `IconName | React.ReactNode`
  - Added `leadingIconSize`, `trailingIconSize` props for custom sizing
  - Added `leadingIconClassName`, `trailingIconClassName` props for custom styling
  - Full backward compatibility with string-based icon names

- **Button Custom Icon Support**: Added custom React component icon support to Button
  - `icon` prop now accepts `IconName | React.ReactNode`
  - Added `iconSize` and `iconClassName` props for custom icon styling
  - Maintains backward compatibility with string icon names
  - Supports custom icon components in all icon positions (leading, trailing, only)

- **Drawer Background Customization**: Added `background` prop to Drawer component
  - Allows custom background color via className string
  - `className` prop can override default background styles

### Fixed
- **Input className Prop**: Fixed className prop not being merged into input element
  - className now properly applied to input element via `cn()` utility
  - Enables full Tailwind CSS customization

- **Cascader Padding Alignment**: Fixed padding mismatch between Cascader trigger and dropdown items
  - Changed trigger padding from `pl-[var(--spacing-x3)] pr-[var(--spacing-x8)]` to `px-[var(--spacing-x3)]` to match dropdown items
  - Refactored layout from absolute positioning to flexbox with `justify-between` for proper icon positioning
  - Ensures consistent visual alignment where trigger text and dropdown items share the same horizontal padding

### Improved
- **Cascader Layout**: Improved Cascader component layout consistency
  - Switched to flexbox layout pattern matching other dropdown components (Dropdown, TreeSelect)
  - Better icon positioning without affecting text content padding
  - Enhanced visual consistency across all dropdown-style components

- **Component Exports**: Updated exports to include all new composable components
  - Table composable components exported from `Table/index.ts`
  - Select composable components exported from `Select/index.ts`
  - All components available via main library entry point

- **TypeScript Types**: Improved type exports and compatibility
  - `TableRow` type renamed to `TableRowData` to avoid conflict with component
  - All component prop types properly exported
  - Full TypeScript support for composable APIs

### Testing
- Added comprehensive unit tests for composable Table components
- Added unit tests for Input custom icon support
- Added unit tests for composable Select components
- Added unit tests for Button custom icon support

### Documentation
- Added Storybook stories for composable Table API
- Added Storybook stories for Input custom icons
- Added Storybook stories for composable Select API
- Added Storybook examples for Drawer background customization

## [1.0.3] - 2024-12-19

### Added
- **UMD Build**: Added UMD build for proper CDN support via rollup configuration
- **CDN Integration Guide**: Comprehensive guide for solving `window.FTDesignSystem` undefined issues
- **Robust CDN Loading**: Added timeout handling and fallback patterns for CDN integration
- **Platform-Specific Solutions**: Dedicated solutions for Lovable.dev, Bolt.new, and other AI tools

### Fixed
- **CDN Loading Issues**: Fixed `window.FTDesignSystem` undefined errors with robust loading patterns
- **Export Paths**: Fixed incorrect import paths in main index.ts (now uses atomic design structure)
- **Build Process**: Successfully generates UMD, ESM, and CommonJS builds with proper externals

### Changed
- **CDN Documentation**: Updated all CDN usage examples to include proper error handling
- **AI Tool Prompts**: Updated General.stories.tsx with robust CDN loading instructions
- **Export Structure**: Simplified main index.ts to re-export from components/index.ts

### Technical
- **UMD Global**: CDN now properly exposes `window.FTDesignSystem` with all components
- **Build Size**: UMD build is 485KB (includes all components and styles)
- **External Dependencies**: React and ReactDOM properly externalized in UMD build

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