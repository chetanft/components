# Issue: Missing Rem-Based Text Size Utility Classes in ft-design-system Package

## Summary

Components in this codebase reference rem-based text size utility classes (`text-xs-rem`, `text-sm-rem`, `text-md-rem`, `text-lg-rem`, `text-xl-rem`, `text-xxl-rem`) that are not included in the `ft-design-system` package's distributed CSS bundle.

## Problem

### Current State
- CSS variables for rem-based font sizes **are** defined in the package: `--font-size-xs-rem`, `--font-size-sm-rem`, etc.
- Tailwind utility classes that reference these variables **are not** included in the package CSS
- Components expect these classes to work out-of-the-box without requiring Tailwind configuration

### Impact
- Components fail to render correctly when using the package without local workarounds
- Consumers must either:
  1. Configure Tailwind with these utilities (not documented)
  2. Add local CSS overrides (current workaround)
  3. Modify component code to use CSS variables directly

## Components Affected

The following components reference rem-based text size classes:

### Atoms
- **Button** (`src/components/atoms/Button/Button.tsx`)
  - Uses: `text-xs-rem`, `text-sm-rem`, `text-md-rem`, `text-lg-rem`, `text-xl-rem`, `text-xxl-rem`
  - Used in: Size variants (xxs, xs, sm, md, lg, xl, xxl)

- **Badge** (`src/components/atoms/Badge/Badge.tsx`)
  - Uses: `text-xs-rem`, `text-sm-rem`
  - Used in: Badge text and dot variants

- **Typography** (`src/components/atoms/Typography/Typography.tsx`)
  - Uses: `text-xs-rem`, `text-sm-rem`, `text-md-rem`, `text-lg-rem`, `text-xl-rem`, `text-xxl-rem`
  - Used in: All typography variants (title-primary, title-secondary, body-primary-*, body-secondary-*)

- **Select** (`src/components/atoms/Select/Select.tsx`)
  - Uses: `text-sm-rem`
  - Used in: Select trigger and menu items

- **Textarea** (`src/components/atoms/Textarea/Textarea.tsx`, `TextareaField.tsx`)
  - Uses: `text-xs-rem`, `text-sm-rem`, `text-lg-rem`, `text-xl-rem`, `text-xxl-rem`
  - Used in: Size variants

### Molecules
- **Dropdown** (`src/components/molecules/Dropdown/Dropdown.tsx`, `DropdownTrigger.tsx`)
  - Uses: `text-xs-rem`, `text-sm-rem`, `text-md-rem`, `text-lg-rem`
  - Used in: Size variants and helper text

- **Select** (`src/components/molecules/Select/SelectTrigger.tsx`, `SelectValue.tsx`)
  - Uses: `text-xs-rem`, `text-sm-rem`, `text-md-rem`, `text-lg-rem`
  - Used in: Size variants

- **Steps** (`src/components/molecules/Steps/StepTitle.tsx`, `StepDescription.tsx`)
  - Uses: `text-lg-rem`, `text-md-rem`
  - Used in: Step title and description

- **SegmentedTabs** (`src/components/molecules/SegmentedTabs/SegmentedTabs.tsx`)
  - Uses: `text-sm-rem`
  - Used in: Tab labels

- **Alert** (`src/components/molecules/Alert/AlertTitle.tsx`, `AlertDescription.tsx`)
  - Uses: `text-md-rem`, `text-sm-rem`
  - Used in: Alert title and description

- **Tooltip** (`src/components/molecules/Tooltip/TooltipDescription.tsx`)
  - Uses: `text-sm-rem`
  - Used in: Tooltip description

- **ProgressList** (`src/components/molecules/ProgressList/ProgressList.tsx`)
  - Uses: `text-sm-rem`
  - Used in: Progress item labels

- **StackedBarChart** (`src/components/molecules/StackedBarChart/StackedBarChart.tsx`)
  - Uses: `text-xs-rem`
  - Used in: Chart labels

### Organisms
- **PageHeader** (`src/components/organisms/PageHeader/PageHeaderTabs.tsx`, `PageHeaderSubcomponents.tsx`)
  - Uses: `text-sm-rem`, `text-md-rem`, `text-xl-rem`
  - Used in: Page header tabs and subcomponents

- **FileTypeIcon** (`src/components/organisms/FileTypeIcon/FileTypeIcon.tsx`)
  - Uses: `text-xs-rem`, `text-sm-rem`, `text-md-rem`, `text-lg-rem`
  - Used in: Size variants

- **FileThumbnail** (`src/components/organisms/FileThumbnail/FileThumbnail.tsx`)
  - Uses: `text-sm-rem`
  - Used in: File name display

## Missing Classes

The following utility classes are referenced but not included in the package CSS:

```css
.text-xs-rem   /* Should map to: font-size: var(--font-size-xs-rem); */
.text-sm-rem   /* Should map to: font-size: var(--font-size-sm-rem); */
.text-md-rem   /* Should map to: font-size: var(--font-size-md-rem); */
.text-lg-rem   /* Should map to: font-size: var(--font-size-lg-rem); */
.text-xl-rem   /* Should map to: font-size: var(--font-size-xl-rem); */
.text-xxl-rem  /* Should map to: font-size: var(--font-size-xxl-rem); */
```

## CSS Variables Available

The package **does** define these CSS variables:

```css
--font-size-xs-rem: 0.857rem;   /* 12px / 14px */
--font-size-sm-rem: 1rem;       /* 14px / 14px */
--font-size-md-rem: 1.143rem;   /* 16px / 14px */
--font-size-lg-rem: 1.429rem;   /* 20px / 14px */
--font-size-xl-rem: 1.714rem;   /* 24px / 14px */
--font-size-xxl-rem: 2rem;      /* 28px / 14px */
```

## Proposed Solutions

### Option 1: Add Utility Classes to Package CSS (Recommended)

Add these utility classes to the package's CSS output (e.g., in `dist/styles.css` or `globals.css`):

```css
/* Rem-based text size utilities */
.text-xs-rem {
  font-size: var(--font-size-xs-rem);
}

.text-sm-rem {
  font-size: var(--font-size-sm-rem);
}

.text-md-rem {
  font-size: var(--font-size-md-rem);
}

.text-lg-rem {
  font-size: var(--font-size-lg-rem);
}

.text-xl-rem {
  font-size: var(--font-size-xl-rem);
}

.text-xxl-rem {
  font-size: var(--font-size-xxl-rem);
}
```

**Pros:**
- Components work out-of-the-box
- No breaking changes
- Consistent with existing utility class pattern (`.text-primary`, `.bg-primary`, etc.)
- No dependency on Tailwind configuration

**Cons:**
- Adds ~150 bytes to CSS bundle

### Option 2: Update Components to Use Pixel-Based Classes

Replace rem-based classes with pixel-based equivalents:
- `text-xs-rem` → `text-xs` (12px)
- `text-sm-rem` → `text-sm` (14px)
- `text-md-rem` → `text-md` (16px)
- `text-lg-rem` → `text-lg` (20px)
- `text-xl-rem` → `text-xl` (24px)
- `text-xxl-rem` → `text-xxl` (28px)

**Pros:**
- Uses existing classes already in package
- Smaller CSS bundle

**Cons:**
- Loses responsive scaling (rem values scale with root font-size)
- Breaking change for components expecting rem-based scaling
- Requires updating ~30+ component files

### Option 3: Document Tailwind Configuration Requirement

Document that consumers must add these to their `tailwind.config.js`:

```js
fontSize: {
  'xs-rem': 'var(--font-size-xs-rem)',
  'sm-rem': 'var(--font-size-sm-rem)',
  'md-rem': 'var(--font-size-md-rem)',
  'lg-rem': 'var(--font-size-lg-rem)',
  'xl-rem': 'var(--font-size-xl-rem)',
  'xxl-rem': 'var(--font-size-xxl-rem)',
}
```

**Pros:**
- No package changes needed
- Flexible for consumers

**Cons:**
- Requires Tailwind setup (not all consumers use Tailwind)
- Not discoverable
- Components fail silently if not configured

## Recommendation

**Option 1** is recommended because:
1. It maintains the responsive rem-based scaling behavior
2. Components work without additional configuration
3. Consistent with existing utility class pattern in the package
4. Minimal bundle size impact
5. No breaking changes

## Current Workaround

Until the package is fixed, this codebase includes a local workaround in `src/styles/globals.css`:

```css
/* TEMPORARY WORKAROUND: These classes are missing from ft-design-system package. */
.text-xs-rem { font-size: var(--font-size-xs-rem); }
.text-sm-rem { font-size: var(--font-size-sm-rem); }
.text-md-rem { font-size: var(--font-size-md-rem); }
.text-lg-rem { font-size: var(--font-size-lg-rem); }
.text-xl-rem { font-size: var(--font-size-xl-rem); }
.text-xxl-rem { font-size: var(--font-size-xxl-rem); }
```

This workaround will be removed once the package includes these utilities.

## Testing

To verify the fix:
1. Remove local workaround from `globals.css`
2. Import only the `ft-design-system` package CSS
3. Verify all affected components render with correct font sizes
4. Test responsive behavior (rem values should scale with root font-size)

## Related Files

- Package CSS: `node_modules/ft-design-system/dist/dist/styles.css` (or equivalent)
- Local workaround: `src/styles/globals.css` (lines 1087-1111)
- Tailwind config: `tailwind.config.js` (lines 373-378)

## Next Steps

1. **ft-design-system team**: Review and decide on preferred solution
2. **If Option 1**: Add utility classes to package CSS and publish new version
3. **This codebase**: Remove local workaround once package is updated
4. **Documentation**: Update package docs to include rem-based typography utilities

