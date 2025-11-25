# Component Variant Display Order - Implementation Plan

## Display Strategy

### Standard Components Pattern
1. **Default/Primary** - The most common use case (MD size)
2. **Interactive Demo** - Live interactive example showing controls
3. **Semantic Variants** - Other types (secondary, tertiary, danger, etc.)
4. **Special Features** - Icons, layouts, etc.
5. **Sizes Demo** - All sizes shown together (if applicable)
6. **States Demo** - Disabled, error, etc. shown together (if applicable)

### Form Control Components Pattern (Checkbox, Radio, Switch)
1. **Interactive Demo** - Live interactive example FIRST
2. **Default** - Unchecked/off state
3. **Checked/On** - Selected state
4. **Other States** - Indeterminate, disabled, error, etc.

---

## ATOMS (17 components)

### 1. Avatar
**Display Order:**
1. **Default** - With image (MD size)
2. **Interactive Demo** - Changeable size/image
3. **Placeholder** - Without image (MD size)
4. **Sizes** - All sizes (XXS → XXL) in one demo

---

### 2. Badge
**Display Order:**
1. **Normal** - Default semantic variant (gray)
2. **Interactive Demo** - Changeable variant/icons
3. **Danger** - Error/destructive state
4. **Success** - Positive state
5. **Warning** - Warning state
6. **Neutral** - Info state
7. **With Icons** - Leading, trailing, both in one demo
8. **Interactive** - With border and hover effects

---

### 3. Button
**Display Order:**
1. **Primary** - Default call-to-action button (MD size)
2. **Interactive Demo** - Changeable variant/size/icon
3. **Secondary** - Secondary actions
4. **Tertiary** - Tertiary/subtle actions
5. **Destructive** - Dangerous/delete actions
6. **Text** - Text-only button
7. **Link** - Link-styled button
8. **With Leading Icon** - Icon before text
9. **With Trailing Icon** - Icon after text
10. **Icon Only** - Just icon, no text
11. **Sizes** - All sizes (XS → XXL) in one demo
12. **States** - Normal vs Disabled in one demo
13. **Circular Buttons** - Rounded-full showcase

---

### 4. Checkbox
**Display Order:**
1. **Interactive Demo** - Toggleable checkbox FIRST
2. **Default** - Unchecked state (MD size)
3. **Checked** - Selected state
4. **Indeterminate** - Partial selection
5. **With Description** - Label + helper text
6. **Error** - Error state with message
7. **Disabled** - Non-interactive state
8. **Disabled Checked** - Disabled + selected
9. **Small** - Smaller size variant (if semantic)

---

### 5. Divider
**Display Order:**
1. **Horizontal** - Default orientation
2. **Interactive Demo** - Changeable orientation
3. **Vertical** - Alternative orientation

---

### 6. Illustration
**Display Order:**
1. **Default** - Most common illustration (MD size)
2. **Interactive Demo** - Changeable illustration type
3. **All Types** - Grid showing all illustrations
4. **Sizes** - If multiple sizes exist

---

### 7. Input
**Display Order:**
1. **Default** - Empty input (MD size)
2. **Interactive Demo** - Typeable input with controls
3. **Filled** - With value
4. **Error** - Error state with message
5. **Warning** - Warning state
6. **Success** - Success state
7. **Disabled** - Non-editable state
8. **Sizes** - All sizes in one demo
9. **States** - Default, hover, focused, typing, filled, disabled in one demo
10. **With Label Variants** - Mandatory, optional, with icons

---

### 8. Label
**Display Order:**
1. **Default** - Basic label
2. **Interactive Demo** - Changeable props
3. **With Suffix Icon** - Icon after text
4. **Optional** - Shows "(optional)"
5. **Optional With Icon** - Optional + icon
6. **Mandatory** - Shows "*" or required indicator
7. **Mandatory With Icon** - Mandatory + icon
8. **Custom Icon** - Custom icon example
9. **Long Text** - Text wrapping example

---

### 9. Logos
**Display Order:**
1. **Default** - Primary logo (MD size)
2. **Interactive Demo** - Changeable logo type/size
3. **All Logos** - Grid showing all logo types
4. **Sizes** - If applicable

---

### 10. RadioGroup
**Display Order:**
1. **Interactive Demo** - Selectable radio group FIRST
2. **Default** - Vertical orientation
3. **Horizontal** - Horizontal layout
4. **With Disabled** - Some options disabled
5. **With Description** - Helper text per option

---

### 11. ReadOnly
**Display Order:**
1. **Default** - Basic read-only field
2. **Interactive Demo** - If applicable
3. **With Label** - Label + value
4. **Different Types** - Text, number, date, etc. if applicable

---

### 12. Spacer
**Display Order:**
1. **Default** - Standard spacing (MD)
2. **Interactive Demo** - Adjustable spacing
3. **All Sizes** - All spacing values in one demo

---

### 13. Statistic
**Display Order:**
1. **Default** - Basic number display
2. **Interactive Demo** - Changeable value/trend
3. **With Trend Up** - Positive change indicator
4. **With Trend Down** - Negative change indicator
5. **Different Formats** - Currency, percentage, etc.

---

### 14. SubText
**Display Order:**
1. **Default** - Basic subtext
2. **Interactive Demo** - Changeable variant
3. **Info** - Informational state
4. **Warning** - Warning state
5. **Error** - Error state
6. **Success** - Success state

---

### 15. Switch
**Display Order:**
1. **Interactive Demo** - Toggleable switch FIRST
2. **Unchecked** - Off state
3. **Checked** - On state
4. **Disabled Unchecked** - Off + disabled
5. **Disabled Checked** - On + disabled
6. **Without Label** - Switch only, no text

---

### 16. Text
**Display Order:**
1. **Default** - Body text (MD size)
2. **Interactive Demo** - Changeable size/weight
3. **Sizes** - All text sizes in one demo
4. **Weights** - All font weights in one demo

---

### 17. Typography
**Display Order:**
1. **Headings** - H1 → H6
2. **Interactive Demo** - If applicable
3. **Body Text** - Paragraph styles
4. **Labels** - UI label styles
5. **Code** - Code/monospace styles

---

## MOLECULES (15 components)

### 18. ButtonGroup
**Display Order:**
1. **Horizontal** - Default layout (MD size)
2. **Interactive Demo** - Selectable button group
3. **Vertical** - Stacked layout
4. **Mixed Variants** - Primary + secondary buttons
5. **Icon Buttons** - Icon-only buttons grouped

---

### 19. Chicklet
**Display Order:**
1. **Default** - Basic chicklet
2. **Interactive Demo** - Removable chicklet
3. **With Icon** - Leading icon
4. **Different Variants** - If semantic variants exist
5. **Removable** - With close button

---

### 20. DatePicker
**Display Order:**
1. **Default** - Empty picker (MD size)
2. **Interactive Demo** - Selectable date
3. **With Value** - Pre-selected date
4. **With Error** - Error state
5. **Disabled** - Non-interactive
6. **Sizes** - All sizes in one demo

---

### 21. Dropdown
**Display Order:**
1. **Default** - Empty dropdown (MD size)
2. **Interactive Demo** - Selectable dropdown
3. **With Value** - Selected option
4. **Error** - Error state with message
5. **Disabled** - Non-interactive
6. **Sizes** - All sizes in one demo
7. **States** - Default, hover, open, selected, disabled in one demo

---

### 22. FileValidationCard
**Display Order:**
1. **Success** - Valid file
2. **Interactive Demo** - If applicable
3. **Error** - Invalid file with errors
4. **Warning** - File with warnings

---

### 23. ProgressBar
**Display Order:**
1. **Default** - 50% progress
2. **Interactive Demo** - Adjustable progress
3. **Empty** - 0% progress
4. **Complete** - 100% progress
5. **Success Variant** - Green progress bar
6. **Error Variant** - Red progress bar

---

### 24. ProgressList
**Display Order:**
1. **Default** - Multi-step progress
2. **Interactive Demo** - If applicable
3. **Vertical** - If different from default
4. **Horizontal** - If different from default

---

### 25. RadioSelector
**Display Order:**
1. **Interactive Demo** - Selectable options FIRST
2. **Default** - Unselected state
3. **Selected** - Selected state
4. **Disabled** - Non-interactive
5. **With Description** - Helper text

---

### 26. SegmentedTabs
**Display Order:**
1. **Default** - Basic tabs (first tab active)
2. **Interactive Demo** - Switchable tabs
3. **With Icons** - Icons in tabs
4. **Different Counts** - 2, 3, 4+ tabs

---

### 27. SimpleColumnLayout
**Display Order:**
1. **Two Columns** - 2-column layout
2. **Interactive Demo** - If applicable
3. **Three Columns** - 3-column layout
4. **Four Columns** - 4-column layout

---

### 28. Steps
**Display Order:**
1. **Horizontal** - Default orientation
2. **Interactive Demo** - Changeable current step
3. **Vertical** - Stacked layout
4. **Step States** - Current, complete, incomplete in one demo

---

### 29. Tooltip
**Display Order:**
1. **Top** - Default position
2. **Interactive Demo** - Hoverable tooltips
3. **Right** - Right-aligned
4. **Bottom** - Bottom-aligned
5. **Left** - Left-aligned
6. **With Arrow** - If not default
7. **Without Arrow** - If applicable

---

### 30. UploadButton
**Display Order:**
1. **Default** - No file selected
2. **Interactive Demo** - Clickable upload
3. **With File** - File selected
4. **Error** - Upload error state

---

### 31. UploadItem
**Display Order:**
1. **Default** - File ready to upload
2. **Interactive Demo** - If applicable
3. **Uploading** - Progress indicator
4. **Success** - Upload complete
5. **Error** - Upload failed
6. **Different File Types** - PDF, image, doc, etc.

---

### 32. UploadThumbnail
**Display Order:**
1. **Image** - Image file preview
2. **Interactive Demo** - If applicable
3. **With Progress** - Uploading state
4. **Success** - Upload complete
5. **Error** - Upload failed
6. **Different File Types** - Various thumbnails

---

## ORGANISMS (13 components)

### 33. AppHeader
**Display Order:**
1. **Default** - Basic header
2. **Interactive Demo** - If applicable
3. **With Navigation** - Nav items included
4. **With User Profile** - Profile dropdown
5. **Full Featured** - All elements combined

---

### 34. Card
**Display Order:**
1. **Default** - Basic card
2. **Interactive Demo** - If applicable
3. **With Header** - Title/header section
4. **With Footer** - Footer/actions section
5. **With Image** - Image at top
6. **Interactive** - Clickable/hoverable card

---

### 35. Collapsible
**Display Order:**
1. **Interactive Demo** - Expandable/collapsible FIRST
2. **Expanded** - Default open state
3. **Collapsed** - Closed state

---

### 36. FileCard
**Display Order:**
1. **Default** - Basic file card
2. **Interactive Demo** - If applicable
3. **With Actions** - Action buttons
4. **Different File Types** - PDF, image, doc, etc.

---

### 37. FileThumbnail
**Display Order:**
1. **Image** - Image file
2. **Interactive Demo** - If applicable
3. **PDF** - PDF file
4. **Document** - Doc file
5. **With Overlay** - Hover overlay

---

### 38. FileTypeIcon
**Display Order:**
1. **Default** - Most common type (MD size)
2. **Interactive Demo** - Changeable file type
3. **All File Types** - Grid showing all icons
4. **Sizes** - If applicable

---

### 39. Footer
**Display Order:**
1. **Default** - Basic footer
2. **Interactive Demo** - If applicable
3. **With Multiple Columns** - Multi-column layout
4. **With Social Links** - Social media icons

---

### 40. NavigationLauncher
**Display Order:**
1. **Default** - Inactive state
2. **Interactive Demo** - Clickable launcher
3. **Active** - Selected state

---

### 41. NavigationPopover
**Display Order:**
1. **Interactive Demo** - Openable popover FIRST
2. **Closed** - Default state
3. **Open** - Expanded state
4. **With Multiple Items** - Full nav menu

---

### 42. QuickFilters
**Display Order:**
1. **Default** - No filters selected
2. **Interactive Demo** - Selectable filters
3. **With Selected Filters** - Some filters active
4. **Multiple Active** - Many filters selected

---

### 43. Table
**Display Order:**
1. **Default** - Basic table (MD size)
2. **Interactive Demo** - Sortable/selectable table
3. **With Sorting** - Sorted columns
4. **With Selection** - Checkboxes/selection
5. **With Pagination** - Pagination controls
6. **Full Featured** - All features combined

---

### 44. Tabs
**Display Order:**
1. **Primary** - Primary variant (first tab active)
2. **Interactive Demo** - Switchable tabs
3. **Secondary** - Secondary variant
4. **Tertiary** - Tertiary variant
5. **With Icons** - Icons in tabs
6. **Overflow** - Many tabs with scroll

---

### 45. Upload
**Display Order:**
1. **Default** - Empty upload area
2. **Interactive Demo** - File upload area
3. **With Files** - Files added
4. **Uploading** - Upload in progress
5. **Error** - Upload error

---

### 46. UploadZone
**Display Order:**
1. **Default** - Empty drop zone
2. **Interactive Demo** - Drag and drop area
3. **Drag Active** - During drag over
4. **With Files** - Files dropped
5. **Error** - Invalid files

---

### 47. UserProfile
**Display Order:**
1. **Default** - Basic profile display
2. **Interactive Demo** - If applicable
3. **With Extended Info** - More details shown

---

### 48. UserProfileDropdown
**Display Order:**
1. **Interactive Demo** - Clickable dropdown FIRST
2. **Closed** - Default state
3. **Open** - Expanded menu

---

## Summary by Component Type

### Display Pattern A: Standard Components (Most)
```
1. Default/Primary (MD size)
2. Interactive Demo
3. Other Semantic Variants
4. Special Features
5. Sizes Demo (all sizes together)
6. States Demo (states together)
```

**Applied to:** Avatar, Badge, Button, Divider, Illustration, Input, Label, Logos, ReadOnly, Spacer, Statistic, SubText, Text, Typography, ButtonGroup, Chicklet, DatePicker, Dropdown, FileValidationCard, ProgressBar, ProgressList, SegmentedTabs, SimpleColumnLayout, Steps, Tooltip, UploadButton, UploadItem, UploadThumbnail, AppHeader, Card, FileCard, FileThumbnail, FileTypeIcon, Footer, NavigationLauncher, QuickFilters, Table, Tabs, Upload, UploadZone, UserProfile

### Display Pattern B: Form Controls (Interactive First)
```
1. Interactive Demo (FIRST)
2. Default/Unchecked/Off
3. Checked/On/Selected
4. Other States
```

**Applied to:** Checkbox, RadioGroup, RadioSelector, Switch, Collapsible, NavigationPopover, UserProfileDropdown

---

## Implementation Notes

### Interactive Demo Requirements
- Should be **actually interactive** (changeable via Storybook controls)
- Shows the component responding to user input
- Placed **early** to engage developers
- For form controls, shows **toggling/selection behavior**

### Sizes Demo Format
- Show **all sizes in one view** (XS, SM, MD, LG, XL, XXL)
- Displayed horizontally if possible
- Each size labeled clearly

### States Demo Format
- Show **all states side-by-side** (Normal, Disabled, Error, etc.)
- Easy visual comparison
- Clearly labeled

### MD Size Default
- All individual variant examples use **size="md"**
- Only exception is the "Sizes" demo showing all sizes
