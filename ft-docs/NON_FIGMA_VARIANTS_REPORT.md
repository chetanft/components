# Non-Figma Variants Report

## Summary

Found and removed **425 non-Figma variants** across **58 components**.

## Components with Non-Figma Variants Removed

### High Count (10+ variants removed)
- **Icon**: 42 variants removed (ActionIcons, BrandIcons, Colors, NavigationIcons, Sizes, StatusIcons, etc.)
- **Typography**: 52 variants removed (Body variants, Display variants, Title variants, etc.)
- **Chicklet**: 30 variants removed (Rectangular, Rounded variants with numbers)
- **FileTypeIcon**: 23 variants removed (File type examples, Variant 1-10, sizes)
- **Statistic**: 20 variants removed (Usage examples like "Active Users", "Revenue", etc.)
- **ReadOnly**: 19 variants removed (Label 1-11, usage examples)
- **FileCard**: 14 variants removed (Status examples like "Uploading", "Validating", etc.)
- **Switch**: 14 variants removed (Usage examples like "Dark mode", "Email notifications")
- **Text**: 14 variants removed (Size-only variants)
- **AppHeader**: 12 variants removed (User variations, size examples)
- **Badge**: 10 variants removed (Duplicate variant names)
- **Checkbox**: 11 variants removed (Usage examples, size variants)
- **Steps**: 11 variants removed (DeviceVariants, ProgressStates, StepCounts)
- **DatePicker**: 11 variants removed (Size-only variants, usage examples)

### Medium Count (5-9 variants removed)
- **Avatar**: 8 variants removed (Size-only variants)
- **NavigationPopover**: 8 variants removed (Usage examples)
- **QuickFilters**: 8 variants removed (Variant 1-6, alert label)
- **RadioGroup**: 8 variants removed (Size variants, usage examples)
- **Label**: 7 variants removed (Usage examples, custom examples)
- **FileThumbnail**: 7 variants removed (Variant 1-3, usage examples)
- **Tooltip**: 7 variants removed (Placement examples)
- **Input**: 9 variants removed (Usage examples like "Email Address", "Phone Number")
- **SegmentedTabs**: 6 variants removed (Usage examples)
- **Card**: 6 variants removed (Variant 1-3, Basic, Advanced, Minimal)
- **Footer**: 5 variants removed (Button count variations)
- **FileValidationCard**: 5 variants removed (Status examples)
- **RadioSelector**: 4 variants removed (Variant 1-2, usage examples)
- **ProgressList**: 4 variants removed (Usage examples with dates)
- **Upload**: 4 variants removed (Usage type examples)
- **Button**: 5 variants removed (Size-only variants like "Medium", "Large")

### Low Count (1-4 variants removed)
- **Alert, Breadcrumb, Charts, Drawer, FigmaBadge, Illustration, Logo, Logos, Modal, NavigationLauncher, Notification, Pagination, ProgressBar, Skeleton, Spacer, StackedBarChart, Textarea, UploadButton, UploadItem, UploadThumbnail, UploadZone, UserProfile, UserProfileDropdown, iconMap**: 1-3 variants each

## Figma Variants Kept

The following components have explicit Figma variants that were kept:

- **Table**: FigmaVariants (explicit Figma story)
- **Tabs**: FigmaVariants, FigmaVariants 1-6 (explicit Figma stories)
- **ProgressList**: FigmaTimelineWithTime, FigmaTimelineNoTime (explicit Figma stories)
- **QuickFilters**: FigmaDesignElements, FigmaDesignContainer (explicit Figma stories)
- **Footer**: Variants matching Figma patterns (Single Button, Two Buttons, etc.)

## Components with Only Figma Variants

These components now only show Figma design variants:
- Button (25 variants kept)
- Badge (11 variants kept)
- Tabs (14 variants kept)
- Checkbox (5 variants kept)
- Switch (1 variant kept)
- Text (6 variants kept)
- SubText (3 variants kept)
- RadioGroup (1 variant kept)
- And others following Figma naming patterns

## Components with No Examples

Some components ended up with 0 examples because they had no Figma variants:
- Alert
- Breadcrumb
- Charts
- Drawer
- FigmaBadge
- Tooltip
- UserProfileDropdown
- And others

These components may need Figma variants added to their Storybook stories.

## Recommendation

1. ✅ **Architecture Updated**: components.json has been eliminated - docs now import directly from source
2. ✅ **Figma Variants Only**: Storybook stories now use FigmaVariants naming convention
3. 📝 **Update Storybook**: Add FigmaVariants stories for components that need them
4. 🔍 **Review**: Manually review components with 0 examples to ensure they have at least one Figma variant
5. 🎨 **Figma Sync**: Ensure all component variants match Figma design specifications

## New Architecture

Components now use a single source of truth:
- **Source**: `src/components/` - Component TypeScript files
- **Docs**: Imports directly from source, metadata generated on-demand
- **Storybook**: Imports directly from source
- **NPM Package**: Built from source

No components.json file needed - eliminates duplication and sync issues.

