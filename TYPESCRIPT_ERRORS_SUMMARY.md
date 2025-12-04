# TypeScript Errors Summary

Found **71 TypeScript errors** across the codebase. Here's a detailed breakdown:

## Error Types Distribution
- **TS2322** (Type assignment errors): 33 errors
- **TS2339** (Property doesn't exist): 28 errors  
- **TS2741** (Missing required property): 7 errors
- **TS2552** (Cannot find name): 2 errors
- **TS2749** (Type/value confusion): 1 error

## Errors by File

### 1. `Dropdown.stories.tsx` - 28 errors
**Issue:** Missing subcomponents on DropdownMenu type
- `DropdownMenuItem` doesn't exist
- `DropdownMenuLabel` doesn't exist  
- `DropdownMenuSeparator` doesn't exist
**Fix:** Similar to PageHeader - need to attach subcomponents to DropdownMenu export

### 2. `DataEntryTable.stories.tsx` - 15 errors
**Issues:**
- Missing `cellType` prop (should be `type` prop)
- Missing `rowId` prop on `DataEntryTableRowCheckbox`
- Missing `children` prop on `DataEntryTableHeaderCell`
- Invalid `cellType: "text"` (should use proper DataEntryCellType)
- Type mismatch: `Element` not assignable to `string | number | undefined`

### 3. `DropdownMenu.stories.tsx` - 9 errors
**Issue:** Missing `value` prop on `DropdownMenuItem` component
- Property `value` does not exist on `DropdownMenuItemProps`

### 4. `Table.stories.tsx` - 3 errors
**Issue:** Missing required `columns` prop on `TableHeader`
- Lines: 1204, 1273, 1324

### 5. `Tree.stories.tsx` - 6 errors
**Issues:**
- Invalid icon name `"folder"` (not in allowed icon types) - 5 errors
- `TreeNode` used as type instead of `typeof TreeNode` - 1 error

### 6. `Grid.tsx` - 2 errors
**Issue:** ReactNode type assignment issues
- Lines: 99, 229
- Type 'ReactNode' is not assignable to expected type

### 7. `Skeleton.stories.tsx` - 2 errors
**Issue:** Missing `variant` prop on `SkeletonImage`
- Property `variant` does not exist on `SkeletonImageProps`
- Lines: 62, 86

### 8. `Slider.stories.tsx` - 2 errors
**Issue:** Missing required `type` prop on `SliderThumb`
- Lines: 39, 80

### 9. Other Files - 4 errors
- `Card.stories.tsx` - `AvatarImage` doesn't exist on `Avatar` type
- `RadioSelector.stories.tsx` - `ComposableControlledComponent` not found
- `StackedBarChart.stories.tsx` - `Default` export not found
- `List.stories.tsx` - Invalid icon name `"alert"`

## Priority Fixes

### 🔴 High Priority (Build Blockers)
1. **Dropdown subcomponents** (28 errors) - Similar to PageHeader fix needed
2. **Table.stories.tsx** (3 errors) - Missing required `columns` prop
3. **DataEntryTable** (15 errors) - Multiple missing required props

### 🟡 Medium Priority  
4. **DropdownMenu** (9 errors) - Missing `value` prop definition
5. **Skeleton** (2 errors) - Missing `variant` prop definition
6. **Slider** (2 errors) - Missing `type` prop definition
7. **Grid** (2 errors) - ReactNode type issues

### 🟢 Low Priority (Story files only)
8. Invalid icon names in stories (Tree, List)
9. Missing component exports in stories (Card, RadioSelector, StackedBarChart)
10. TreeNode type issue in Tree.stories.tsx

## Next Steps

1. ✅ Fix Dropdown subcomponents export (similar to PageHeader) - **HIGHEST PRIORITY**
2. Fix DataEntryTable prop issues - Add missing props or fix prop names
3. Add missing prop definitions to component interfaces (DropdownMenuItem.value, SkeletonImage.variant, SliderThumb.type)
4. Fix Table.stories.tsx - Add required `columns` prop
5. Fix Grid.tsx ReactNode type issues
6. Fix invalid icon names in stories
7. Fix TreeNode type issue
8. Add missing component exports

