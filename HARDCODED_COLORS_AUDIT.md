# Hardcoded Colors Audit Report

## Issue Summary
Several components in the FT Design System are using hardcoded Tailwind color utilities (like `bg-white`, `text-black`, `bg-neutral-100`, etc.) instead of the FT Design System tokens (like `bg-surface`, `text-primary`, `border-border`, etc.). This causes the components to not respect the design system's theming.

## Fixed Components

### ✅ Checkbox Component
**File:** `/src/components/atoms/Checkbox/Checkbox.tsx`

**Changes Made:**
- Replaced `bg-neutral-100 dark:bg-neutral-800` with `bg-surface-alt`
- Replaced `border-neutral-200 dark:border-neutral-700` with `border-border-secondary`
- Replaced `bg-white dark:bg-neutral-900` with `bg-surface`
- Replaced `border-neutral-300 dark:border-neutral-600` with `border-border`
- Replaced `bg-neutral-50 dark:hover:bg-neutral-800` with `hover:bg-surface-alt`
- Replaced `border-neutral-400 dark:hover:border-neutral-500` with `hover:border-border-hover`
- Replaced `text-neutral-400 dark:text-neutral-500` with `text-secondary`
- Replaced `text-neutral-600 dark:text-neutral-400` with `text-secondary`

## Components Needing Fixes

The following components have hardcoded colors that should be replaced:

### 1. Modal Component
**File:** `/src/components/organisms/Modal/Modal.tsx`
- Line 83: `bg-black/50` → should use proper overlay token

### 2. NavigationMenu Component  
**File:** `/src/components/organisms/NavigationMenu/NavigationMenu.tsx`
- Multiple instances of `bg-white` → should use `bg-surface`
- Multiple instances of `hover:bg-gray-50` → should use `hover:bg-surface-alt`

### 3. FileCard Component
**File:** `/src/components/organisms/FileCard/FileCard.tsx`
- Line 148: `bg-white` → should use `bg-surface`

### 4. FileThumbnail Component
**File:** `/src/components/organisms/FileThumbnail/FileThumbnail.tsx`
- Lines 82, 94: `text-white` → context needed (may be intentional for overlays)

### 5. Drawer Component
**File:** `/src/components/organisms/Drawer/Drawer.tsx`
- Line 109: `bg-black/50` → should use proper overlay token

### 6. FileTypeIcon Component
**File:** `/src/components/organisms/FileTypeIcon/FileTypeIcon.tsx`
- Line 183: `text-white` → context needed

### 7. Footer Component
**File:** `/src/components/organisms/Footer/Footer.tsx`
- Line 134: `bg-white` → should use `bg-surface`

### 8. Tabs Component
**File:** `/src/components/organisms/Tabs/Tabs.tsx`
- Line 49: `!bg-white` → should use `!bg-surface`

### 9. Card Component
**File:** `/src/components/organisms/Card/Card.tsx`
- Line 147: `text-white` → context needed (icon color in add button)

### 10. QuickFilters Component
**File:** `/src/components/organisms/QuickFilters/QuickFilters.tsx`
- Lines 55, 78, 142: `bg-white` → should use `bg-surface`

### 11. ProgressList Component
**File:** `/src/components/molecules/ProgressList/ProgressList.tsx`
- Multiple instances of `bg-white` → should use `bg-surface`
- Multiple instances of `text-white` → context needed

### 12. SimpleColumnLayout Component
**File:** `/src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.tsx`
- Lines 94, 100: `text-white` → context needed

### 13. DatePicker Component
**File:** `/src/components/molecules/DatePicker/DatePicker.tsx`
- Line 807: `bg-black/5` → should use proper overlay token

### 14. Alert Component
**File:** `/src/components/molecules/Alert/Alert.tsx`
- Line 124: `hover:bg-black/5` → should use proper hover token

### 15. Tooltip Component
**File:** `/src/components/molecules/Tooltip/Tooltip.tsx`
- Line 55: Uses `bg-white` and `text-white` conditionally → needs token review

### 16. Dropdown Component
**File:** `/src/components/molecules/Dropdown/Dropdown.tsx`
- Line 11: `bg-white dark:bg-surface-dark` → should use `bg-surface`

## Recommended FT Design System Token Replacements

| Hardcoded Color | FT Token | Usage |
|----------------|----------|-------|
| `bg-white` | `bg-surface` | Primary surface background |
| `bg-black` | `bg-surface-dark` | Dark surface (use sparingly) |
| `bg-neutral-50` | `bg-surface-alt` | Alternative surface |
| `bg-neutral-100` | `bg-surface-alt` | Alternative surface |
| `bg-neutral-900` | `bg-surface-dark` | Dark surface |
| `text-white` | `text-on-primary` | Text on primary background |
| `text-black` | `text-primary` | Primary text color |
| `text-neutral-400` | `text-secondary` | Secondary text |
| `text-neutral-600` | `text-secondary` | Secondary text |
| `border-neutral-200` | `border-border-secondary` | Secondary borders |
| `border-neutral-300` | `border-border` | Primary borders |
| `border-neutral-600` | `border-border` | Primary borders (dark) |
| `bg-black/50` | Use dedicated overlay token | Overlays/modals |

## Notes

1. **Context-Specific Colors**: Some uses of `text-white` may be intentional for specific contexts (e.g., text on colored backgrounds, icons in buttons). These should be reviewed case-by-case.

2. **Overlay Colors**: Modal/Drawer overlays using `bg-black/50` should ideally use a dedicated overlay token in the design system.

3. **Testing Required**: After making these changes, thoroughly test both light and dark modes to ensure proper theming.

4. **Priority**: Components in `atoms` and `molecules` should be fixed first as they're the most fundamental building blocks.

## Action Items

1. ✅ Fix Checkbox component (COMPLETED)
2. ⬜ Create overlay token for modals/drawers
3. ⬜ Fix remaining atomic components (atoms)
4. ⬜ Fix molecular components (molecules)
5. ⬜ Fix organism components (organisms)
6. ⬜ Update tests to reflect new class names
7. ⬜ Test in both light and dark modes
