# Documentation Simplification Plan

## Executive Summary

**Problem Statement:**
1. Current documentation shows every component size and state variant separately, creating visual clutter
2. Syntax errors exist for function-based story variants (VariantsSecondary, Sizes, States, etc.)
3. Need to show only MD size by default with meaningful variants (not state variants like hover, clicked)

**Root Cause of Syntax Errors:**
The function-based stories (export function VariantsSecondary() {...}) are being incorrectly transpiled to JavaScript by the ComponentPreview component. The transpileTypeScript function is not handling all TypeScript syntax correctly, causing react-live to fail.

## Solution Strategy

### Part 1: Fix Syntax Errors (HIGH PRIORITY)
**Why it's happening:** The `transpileTypeScript` function in `/ft-docs/src/lib/component-metadata.ts` is using regex-based type stripping which fails for complex function bodies. The wrapped code sent to react-live has syntax issues.

**Solution Options:**
1. **Convert function-based stories to args-based stories** (RECOMMENDED)
   - Most reliable solution
   - Ensures consistency across all components
   - Follows Storybook best practices
   
2. **Improve TypeScript transpilation** (Alternative)
   - Use Babel or SWC for proper transpilation
   - More complex, may still have edge cases

### Part 2: Simplify Documentation Display

**New Display Strategy:**
- Show only **MD size** (default) for component demonstrations
- Show meaningful **semantic variants** only (primary, secondary, tertiary, danger, link)
- Hide **state variants** (hover, clicked, disabled) - these should only be in interactive demos
- Group related variants (e.g., "Icon Positions" showing leading/trailing/only in one demo)

---

## Detailed Component-by-Component Plan

### **ATOMS**

#### 1. **Avatar**
**Current Issues:** None (already uses args-based stories correctly)
**Meaningful Variants to Show:**
- Default (MD size with image)
- Placeholder (MD size without image)
**What to Hide:**
- All individual size variants (XXS, XS, SM, LG, XL, XXL)
- Keep "AllSizes" demo to show size range
**Action Required:** ✅ No changes needed

---

#### 2. **Badge**
**Current Issues:** Syntax errors in function-based variant stories
**Meaningful Variants to Show:**
- Normal (default semantic variant)
- Danger (semantic variant)
- Success (semantic variant)
- Warning (semantic variant)
- Neutral (semantic variant)
- With Icons (showing leading, trailing, both in one demo)
- Interactive (showing interaction state)
**What to Hide:**
- Individual VariantsNormal, VariantsDanger, etc. function exports
**Recommended Changes:**
```typescript
// REMOVE these function-based exports:
export function VariantsNormal() { ... }
export function VariantsDanger() { ... }
export function VariantsSuccess() { ... }
export function VariantsWarning() { ... }
export function VariantsNeutral() { ... }

// REPLACE with args-based stories:
export const Normal: Story = { args: { variant: 'normal', children: 'Normal' } }
export const Danger: Story = { args: { variant: 'danger', children: 'Error' } }
export const Success: Story = { args: { variant: 'success', children: 'Success' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Warning' } }
export const Neutral: Story = { args: { variant: 'neutral', children: 'Info' } }

// KEEP these function-based stories (they work correctly):
export function WithIcons() { ... } // Shows multiple icon combinations
export function Interactive() { ... }
```

---

#### 3. **Button**
**Current Issues:** Syntax errors in function-based variant stories (VariantsSecondary, VariantsTertiary, etc.)
**Meaningful Variants to Show:**
- Primary (default semantic variant, MD size)
- Secondary (semantic variant, MD size)
- Tertiary (semantic variant, MD size)
- Destructive (semantic variant, MD size)
- Text (semantic variant, MD size)
- Link (semantic variant, MD size)
- With Leading Icon (icon position variant)
- With Trailing Icon (icon position variant)
- Icon Only (icon position variant)
- Circular Buttons (special showcase)
**What to Hide:**
- Individual size variants (XS, SM, LG, XL, XXL)
- Disabled state (show in "States" demo)
- Individual VariantsPrimary, VariantsSecondary, etc. function exports
**Recommended Changes:**
```typescript
// REMOVE these function-based exports:
export function VariantsPrimary() { ... }
export function VariantsSecondary() { ... }
export function VariantsTertiary() { ... }
export function VariantsDestructive() { ... }
export function VariantsText() { ... }
export function VariantsLink() { ... }

// KEEP these args-based stories (they already exist):
export const Primary: Story = { args: { variant: 'primary', size: 'md', children: 'Button' } }
export const Secondary: Story = { args: { variant: 'secondary', size: 'md', children: 'Button' } }
export const Destructive: Story = { args: { variant: 'destructive', size: 'md', children: 'Button' } }
export const Text: Story = { args: { variant: 'text', size: 'md', children: 'Button' } }
export const Link: Story = { args: { variant: 'link', size: 'md', children: 'Button' } }
export const WithLeadingIcon: Story = { args: { ... } }
export const WithTrailingIcon: Story = { args: { ... } }
export const IconOnly: Story = { args: { ... } }

// KEEP these function-based stories (consolidated demos):
export function Sizes() { ... } // Shows all sizes in one view
export function States() { ... } // Shows normal vs disabled
export function IconPositions() { ... } // Shows all icon positions
export function CircularButtons() { ... } // Special showcase
```

---

#### 4. **Checkbox**
**Current Issues:** Need to check for syntax errors
**Meaningful Variants to Show:**
- Default (unchecked, MD size)
- Checked (MD size)
- Indeterminate (MD size)
- With Description (shows label + description)
- Error (shows error state)
- Disabled (shows disabled state)
- Disabled Checked (shows combination)
**What to Hide:**
- Small size variant (unless it's a semantic variant)
- Hover/focus states
**Action Required:** Review stories file and convert function-based to args-based if needed

---

#### 5. **Divider**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Horizontal (default orientation)
- Vertical (alternative orientation)
**What to Hide:**
- N/A
**Action Required:** Review stories file

---

#### 6. **Illustration**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- All illustration types (MD size)
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 7. **Label**
**Current Issues:** Need to check for syntax errors
**Meaningful Variants to Show:**
- Default
- With Suffix Icon
- Optional
- Optional With Icon
- Mandatory
- Mandatory With Icon
- Custom Icon
- Long Text
**What to Hide:**
- Size variants (should always be one size)
- State variants (focus, hover)
**Action Required:** Review stories file and convert function-based to args-based if needed

---

#### 8. **RadioGroup**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default (vertical orientation)
- Horizontal
- Controlled (interactive demo)
**What to Hide:**
- Individual size variants
- State variants
**Action Required:** Review stories file

---

#### 9. **Spacer**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Different spacing values (in one demo)
**What to Hide:**
- N/A
**Action Required:** Review stories file

---

#### 10. **Statistic**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default
- With trend indicator
- Different formats
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 11. **SubText**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Different semantic states (info, warning, error, success)
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 12. **Switch**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Checked (default state)
- Unchecked
- Disabled Checked
- Disabled Unchecked
- Without Label
**What to Hide:**
- Size variants
- Hover/focus states
**Action Required:** Review stories file and convert function-based to args-based if needed

---

#### 13. **Text**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Different text sizes (in one demo)
- Different weights (in one demo)
**What to Hide:**
- Individual size variants
**Action Required:** Review stories file

---

#### 14. **Typography**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- All typography styles (headings, body, labels, etc.)
**What to Hide:**
- N/A
**Action Required:** Review stories file

---

### **MOLECULES**

#### 15. **ButtonGroup**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Horizontal (default)
- Vertical
- With different button variants
**What to Hide:**
- Size variants (use MD)
**Action Required:** Review stories file

---

#### 16. **Chicklet**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Different semantic variants
- With icons
**What to Hide:**
- Size variants
- State variants
**Action Required:** Review stories file

---

#### 17. **DatePicker**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default (empty, MD size)
- With Value (selected date, MD size)
- With Error (error state, MD size)
- Disabled (MD size)
**What to Hide:**
- Individual size variants (XXS, XS, SM, LG, etc.)
- Keep "AllSizes" or "Sizes" demo
**Action Required:** Review stories file

---

#### 18. **Dropdown**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default (MD size)
- With Value (selected, MD size)
- Error (MD size)
- Disabled (MD size)
**What to Hide:**
- Individual size variants
- State variants (hover, focused) except interactive demo
**Action Required:** Review stories file

---

#### 19. **FileValidationCard**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Success state
- Error state
- Warning state
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 20. **ProgressBar**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Different progress states (0%, 50%, 100%)
- Different semantic variants (default, success, error)
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 21. **ProgressList**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default
- With multiple steps
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 22. **RadioSelector**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default
- Selected
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 23. **SegmentedTabs**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default
- With icons
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 24. **SimpleColumnLayout**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- 2 columns
- 3 columns
- 4 columns
**What to Hide:**
- N/A
**Action Required:** Review stories file

---

#### 25. **Steps**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Horizontal
- Vertical
- Different step states (current, complete, incomplete)
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 26. **Tooltip**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Different positions (top, right, bottom, left)
- With arrow
- Without arrow
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 27. **UploadButton**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default
- With file
- Error state
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 28. **UploadItem**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Different file types
- Progress states
- Error state
- Success state
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 29. **UploadThumbnail**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Different file types
- With progress
- Success
- Error
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

### **ORGANISMS**

#### 30. **AppHeader**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default
- With navigation
- With user profile
**What to Hide:**
- State variants
**Action Required:** Review stories file

---

#### 31. **Card**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default
- With header
- With footer
- With image
- Interactive
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 32. **Collapsible**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Expanded (default)
- Collapsed
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 33. **FileCard**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Different file types
- With actions
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 34. **FileThumbnail**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Different file types
- With overlay
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 35. **FileTypeIcon**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- All supported file types
**What to Hide:**
- Size variants (use MD)
**Action Required:** Review stories file

---

#### 36. **Footer**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default
- With multiple columns
**What to Hide:**
- N/A
**Action Required:** Review stories file

---

#### 37. **NavigationLauncher**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default
- Active state
**What to Hide:**
- Hover/focus states
**Action Required:** Review stories file

---

#### 38. **NavigationPopover**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default
- With multiple items
**What to Hide:**
- N/A
**Action Required:** Review stories file

---

#### 39. **QuickFilters**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default
- With selected filters
**What to Hide:**
- N/A
**Action Required:** Review stories file

---

#### 40. **Table**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default
- With sorting
- With selection
- With pagination
**What to Hide:**
- N/A
**Action Required:** Review stories file

---

#### 41. **Tabs**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Primary variant
- Secondary variant
- Tertiary variant
- With icons
**What to Hide:**
- State variants (selected, hover)
- Size variants
**Action Required:** Review stories file

---

#### 42. **Upload**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default (empty)
- With files
- Uploading
- Error
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 43. **UploadZone**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default (empty)
- Drag active
- With files
- Error
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 44. **UserProfile**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Default
- With extended info
**What to Hide:**
- Size variants
**Action Required:** Review stories file

---

#### 45. **UserProfileDropdown**
**Current Issues:** Need to check
**Meaningful Variants to Show:**
- Closed (default)
- Open
**What to Hide:**
- N/A
**Action Required:** Review stories file

---

## Implementation Steps

### Phase 1: Fix Syntax Errors (Week 1)
1. **Badge Component** - Convert function-based variant stories to args-based
2. **Button Component** - Convert function-based variant stories to args-based
3. **Checkbox Component** - Review and convert if needed
4. **Label Component** - Review and convert if needed
5. **Switch Component** - Review and convert if needed

### Phase 2: Update Remaining Atoms (Week 2)
6. Review and update all remaining atom components
7. Ensure all use args-based stories with MD size as default

### Phase 3: Update Molecules (Week 3)
8. Review and update all molecule components
9. Ensure all use args-based stories with MD size as default

### Phase 4: Update Organisms (Week 4)
10. Review and update all organism components
11. Final testing and documentation review

### Phase 5: Update Documentation Generator (Ongoing)
12. Update `component-metadata.ts` to prioritize args-based stories
13. Add filtering logic to exclude size-only variants from display
14. Ensure "Sizes" demo stories are recognized and shown as consolidated views

---

## Success Criteria

✅ No syntax errors in component documentation
✅ Only MD size shown by default for all components
✅ Only meaningful semantic variants shown (primary, secondary, danger, etc.)
✅ State variants (hover, clicked, disabled) only in interactive demos
✅ All components use args-based stories for individual variants
✅ Function-based stories only for consolidated demos (Sizes, States, IconPositions, etc.)
✅ Documentation site loads without errors
✅ All component previews render correctly

---

## Notes

- **Args-based stories** are more reliable and work better with Storybook's controls
- **Function-based stories** should only be used for complex demos that show multiple variants together
- The current `transpileTypeScript` function in `component-metadata.ts` is fragile and should be avoided when possible
- Consider using Babel or SWC for proper TypeScript transpilation if function-based stories are absolutely necessary
