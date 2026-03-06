# Structural Spacing Audit Report

Generated: 2026-03-06T02:59:15.553Z

## Summary

- Files with issues: 110
- Total issues: 387
- Missing direct padding: 375
- Spacer in flex-col context: 12

## Findings

### src/components/atoms/Avatar/Avatar.tsx

#### Missing Direct Padding (3)

- Line 182: `cursor-pointer bg-[var(--bg-tertiary)]`
- Line 96: `bg-[var(--bg-secondary)] text-[var(--secondary)]`
- Line 122: `bg-[var(--bg-secondary)] text-[var(--secondary)]`

---

### src/components/atoms/Badge/BadgeCount.tsx

#### Missing Direct Padding (1)

- Line 51: `bg-[var(--danger)] text-white`

---

### src/components/atoms/Colors/Colors.tsx

#### Missing Direct Padding (2)

- Line 51: `w-12 h-12 border border-gray-300 flex items-center justify-center`
- Line 58: `w-6 h-6 rounded-full border-2`

---

### src/components/atoms/Divider/Divider.tsx

#### Missing Direct Padding (10)

- Line 95: `inline-block w-px h-[0.9em] mx-[var(--spacing-x2)] align-middle border-l`
- Line 98: `border-dashed`
- Line 113: `box-border flex items-center justify-between w-full m-0 p-0`
- Line 126: `h-px flex-1 border-t`
- Line 127: `border-[var(--border-primary)]`
- Line 148: `h-px flex-1 border-t`
- Line 149: `border-[var(--border-primary)]`
- Line 160: `box-border flex items-center w-full m-0 p-0`
- Line 168: `h-px w-full border-t`
- Line 171: `border-dashed`

---

### src/components/atoms/FigmaBadge/FigmaBadge.tsx

#### Missing Direct Padding (1)

- Line 21: `bg-[var(--color-warning-light)] text-[var(--color-warning)] border border-[var(--color-warning)]`

---

### src/components/atoms/Illustration/Illustration.tsx

#### Missing Direct Padding (3)

- Line 56: `overflow-hidden border border-[var(--border-primary)] flex items-center justify-center`
- Line 58: `bg-[var(--bg-secondary)]`
- Line 58: `bg-transparent`

---

### src/components/atoms/RadioGroup/RadioItemInput.tsx

#### Missing Direct Padding (2)

- Line 136: `rounded-full bg-[var(--primary)]`
- Line 176: `rounded-full bg-[var(--primary)]`

---

### src/components/atoms/Select/Select.tsx

#### Missing Direct Padding (2)

- Line 78: `relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--primary)] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
- Line 143: `-mx-[var(--spacing-x1)] my-[var(--spacing-x1)] h-px bg-[var(--border-secondary)]`

---

### src/components/atoms/Skeleton/SkeletonText.tsx

#### Missing Direct Padding (1)

- Line 56: `h-4 bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)]`

---

### src/components/atoms/Spin/Spin.tsx

#### Missing Direct Padding (2)

- Line 150: `absolute inset-0 flex items-center justify-center bg-[var(--bg-primary)]/50`
- Line 106: `bg-[var(--bg-primary)]/80 backdrop-blur-sm`

---

### src/components/molecules/Alert/Alert.tsx

#### Missing Direct Padding (2)

- Line 138: `border border-solid`
- Line 139: `border-b`

---

### src/components/molecules/Alert/AlertClose.tsx

#### Missing Direct Padding (1)

- Line 57: `hover:bg-black/5`

---

### src/components/molecules/Anchor/Anchor.tsx

#### Missing Direct Padding (2)

- Line 181: `absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--border-primary)] opacity-50 ml-px`
- Line 53: `text-[var(--primary)] font-medium bg-[var(--primary-bg-subtle)]`

---

### src/components/molecules/BackTop/BackTop.tsx

#### Missing Direct Padding (1)

- Line 74: `bg-transparent border-0`

---

### src/components/molecules/Calendar/Calendar.tsx

#### Missing Direct Padding (14)

- Line 400: `bg-[var(--bg-primary)]`
- Line 401: `hover:bg-[var(--border-primary)]`
- Line 402: `bg-[var(--border-secondary)]`
- Line 403: `border border-[var(--border-primary)]`
- Line 411: `text-[var(--border-secondary)]`
- Line 456: `bg-[var(--primary)] text-[var(--bg-primary)]`
- Line 457: `border border-[var(--primary)]`
- Line 458: `hover:bg-[var(--bg-secondary)]`
- Line 501: `bg-[var(--primary)] text-[var(--bg-primary)]`
- Line 502: `hover:bg-[var(--bg-secondary)]`
- Line 545: `bg-[var(--primary)] text-[var(--bg-primary)]`
- Line 546: `hover:bg-[var(--bg-secondary)]`
- Line 563: `bg-[var(--bg-primary)]`
- Line 563: `border border-[var(--border-secondary)]`

---

### src/components/molecules/Carousel/Carousel.tsx

#### Missing Direct Padding (2)

- Line 347: `bg-[var(--color-primary)] w-[var(--spacing-x6)]`
- Line 348: `bg-[var(--color-border-primary)] hover:bg-[var(--color-border-secondary)]`

---

### src/components/molecules/Cascader/Cascader.tsx

#### Missing Direct Padding (10)

- Line 144: `min-w-[calc(var(--spacing-x20)*2)] max-h-[calc(var(--spacing-x16)*4)] overflow-y-auto border-r border-solid border-[var(--border-primary)] last:border-r-0`
- Line 456: `w-full bg-transparent border-none outline-none`
- Line 153: `box-border flex items-center relative transition-colors duration-200`
- Line 155: `bg-[var(--bg-secondary)]`
- Line 156: `hover:bg-[var(--border-secondary)] cursor-pointer`
- Line 157: `bg-[var(--bg-primary)] cursor-not-allowed opacity-60`
- Line 506: `bg-[var(--bg-primary)]`
- Line 506: `border border-solid border-[var(--border-primary)]`
- Line 523: `box-border flex items-center relative transition-colors duration-200`
- Line 525: `hover:bg-[var(--border-secondary)] cursor-pointer`

---

### src/components/molecules/Chicklet/Chicklet.tsx

#### Missing Direct Padding (1)

- Line 118: `border-0 bg-transparent p-0 m-0`

---

### src/components/molecules/ColorPicker/ColorPicker.tsx

#### Missing Direct Padding (5)

- Line 147: `w-5 h-5 rounded border border-[var(--border-secondary)] shadow-sm`
- Line 140: `cursor-not-allowed opacity-50 bg-[var(--color-bg-secondary)]`
- Line 157: `bg-[var(--color-bg-primary)]`
- Line 157: `border border-[var(--border-primary)]`
- Line 163: `w-6 h-6 rounded border border-transparent hover:scale-110 transition-transform`

---

### src/components/molecules/DatePicker/DatePicker.tsx

#### Missing Direct Padding (5)

- Line 1017: `flex-1 bg-transparent border-none outline-none text-base font-normal leading-[1.4] text-[var(--primary)] dark:text-[var(--primary)] placeholder:text-placeholder dark:placeholder:text-placeholder-dark`
- Line 1050: `fixed inset-0 bg-overlay z-[9998]`
- Line 969: `bg-transparent border-none outline-none text-base font-normal leading-[1.4]`
- Line 991: `bg-transparent border-none outline-none text-base font-normal leading-[1.4]`
- Line 1058: `bg-[var(--bg-primary)]`

---

### src/components/molecules/DatePicker/DatePickerCalendar.tsx

#### Missing Direct Padding (1)

- Line 103: `fixed inset-0 bg-overlay z-[9998]`

---

### src/components/molecules/DatePicker/DatePickerInput.tsx

#### Missing Direct Padding (2)

- Line 170: `bg-transparent border-none outline-none text-base font-normal leading-[1.4]`
- Line 198: `bg-transparent border-none outline-none text-base font-normal leading-[1.4]`

---

### src/components/molecules/Dropdown/DropdownTrigger.tsx

#### Missing Direct Padding (6)

- Line 90: `relative w-full border transition-all duration-200 font-sans font-normal text-[var(--primary)]`
- Line 92: `bg-surface`
- Line 92: `border border-[var(--border-primary)]`
- Line 98: `border-[var(--border-primary)] dark:border-border-dark hover:border-[var(--primary)] dark:hover:border-[var(--primary)] focus-within:border-primary dark:focus-within:border-primary-dark`
- Line 99: `border-critical focus-within:border-critical`
- Line 100: `bg-surface-alt dark:bg-surface-alt-dark border-border-disabled dark:border-border-disabled-dark text-input-disabled dark:text-input-disabled-dark cursor-not-allowed pointer-events-none`

---

### src/components/molecules/DropdownMenu/DropdownMenu.tsx

#### Missing Direct Padding (4)

- Line 162: `w-full h-full bg-[var(--color-border-secondary)] rounded-full`
- Line 163: `w-full h-[40%] bg-[var(--color-border-primary)] rounded-full`
- Line 174: `bg-[var(--color-bg-primary)]`
- Line 174: `border border-solid border-[var(--color-border-primary)]`

---

### src/components/molecules/DropdownMenu/DropdownMenuItem.tsx

#### Missing Direct Padding (6)

- Line 203: `!bg-transparent`
- Line 204: `!bg-[var(--glass-selected)]`
- Line 205: `!bg-[var(--glass-hover)]`
- Line 206: `!bg-[var(--glass-hover)]`
- Line 207: `!bg-transparent opacity-50`
- Line 208: `!bg-transparent`

---

### src/components/molecules/DropdownMenu/DropdownMenuLabel.tsx

#### Missing Direct Padding (2)

- Line 45: `bg-[var(--color-bg-primary)]`
- Line 45: `bg-transparent`

---

### src/components/molecules/DropdownMenu/DropdownMenuSearch.tsx

#### Missing Direct Padding (3)

- Line 94: `flex-1 font-normal leading-[1.4] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[var(--color-tertiary)] whitespace-nowrap bg-transparent border-none outline-none`
- Line 79: `bg-[var(--color-bg-primary)]`
- Line 79: `bg-transparent`

---

### src/components/molecules/DropdownMenu/DropdownMenuSeparator.tsx

#### Missing Direct Padding (1)

- Line 48: `flex-1 h-px bg-[var(--color-border-primary)]`

---

### src/components/molecules/FileValidationCard/FileValidationCard.tsx

#### Missing Direct Padding (5)

- Line 110: `bg-[var(--bg-primary)]`
- Line 110: `border border-[var(--border-secondary)]`
- Line 177: `hover:bg-[var(--bg-secondary)]`
- Line 191: `hover:bg-[var(--bg-secondary)]`
- Line 205: `hover:bg-[var(--critical-light)]`

---

### src/components/molecules/FilterDateRange/FilterDateRange.tsx

#### Missing Direct Padding (1)

- Line 230: `bg-[var(--bg-secondary)]`

---

### src/components/molecules/FilterDropdown/FilterDropdown.tsx

#### Missing Direct Padding (1)

- Line 252: `bg-[var(--bg-secondary)]`

---

### src/components/molecules/Graphs/Graphs.tsx

#### Spacer In Flex-Col (2)

- Line 24: `<Spacer size="x3" className="w-full shrink-0" data-name="Spacer" data-node-id="4337:17057" />`
- Line 46: `<Spacer size="x3" className="w-full shrink-0" data-name="Spacer" data-node-id="4337:17142" />`

---

### src/components/molecules/HoverCard/HoverCardContent.tsx

#### Missing Direct Padding (2)

- Line 86: `bg-[var(--color-bg-primary)]`
- Line 86: `border border-[var(--color-border-secondary)]`

---

### src/components/molecules/Image/Image.tsx

#### Missing Direct Padding (7)

- Line 218: `w-px h-6 bg-[var(--overlay-control-divider)] mx-[var(--spacing-x2)]`
- Line 237: `w-px h-6 bg-[var(--overlay-control-divider)] mx-[var(--spacing-x2)]`
- Line 179: `bg-black/80`
- Line 188: `bg-gradient-to-b from-[var(--overlay-strong)] to-transparent`
- Line 381: `bg-[var(--color-bg-secondary)]`
- Line 393: `bg-[var(--color-bg-secondary)] text-[var(--color-tertiary)]`
- Line 424: `bg-transparent hover:bg-[var(--overlay-control-bg-hover)] transition-colors`

---

### src/components/molecules/InputNumber/InputNumberButton.tsx

#### Missing Direct Padding (8)

- Line 81: `hover:bg-[var(--border-secondary)]`
- Line 82: `disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent`
- Line 84: `border-l border-[var(--border-primary)]`
- Line 87: `border-b border-[var(--border-primary)] flex-1`
- Line 116: `hover:bg-[var(--border-secondary)]`
- Line 117: `disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent`
- Line 119: `border-l border-[var(--border-primary)]`
- Line 122: `border-b border-[var(--border-primary)] flex-1`

---

### src/components/molecules/InputNumber/InputNumberControls.tsx

#### Missing Direct Padding (1)

- Line 72: `flex flex-col h-full border-l border-[var(--border-primary)]`

---

### src/components/molecules/InputNumber/InputNumberField.tsx

#### Missing Direct Padding (2)

- Line 123: `flex-1 min-w-0 bg-transparent border-none outline-none`
- Line 150: `flex-1 min-w-0 bg-transparent border-none outline-none`

---

### src/components/molecules/InputNumber/InputNumberWrapper.tsx

#### Missing Direct Padding (6)

- Line 59: `border-2 rounded-[var(--radius-md)]`
- Line 60: `bg-[var(--bg-primary)]`
- Line 65: `border-[var(--critical)]`
- Line 67: `border-[var(--primary)]`
- Line 68: `border-[var(--border-primary)] hover:border-[var(--primary)]`
- Line 69: `bg-[var(--border-secondary)] cursor-not-allowed opacity-60`

---

### src/components/molecules/Mentions/Mentions.tsx

#### Missing Direct Padding (5)

- Line 150: `flex w-full rounded-[var(--radius-md)] border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]`
- Line 154: `border-[var(--color-critical)] focus:ring-[var(--color-critical)]`
- Line 155: `border-[var(--color-warning)] focus:ring-[var(--color-warning)]`
- Line 163: `bg-[var(--color-bg-primary)]`
- Line 163: `border border-[var(--color-border-primary)]`

---

### src/components/molecules/Pagination/PaginationQuickJumper.tsx

#### Missing Direct Padding (2)

- Line 84: `border border-[var(--border-primary)]`
- Line 87: `bg-[var(--bg-primary)]`

---

### src/components/molecules/PercentageOfChargeInput/PercentageOfChargeInput.tsx

#### Missing Direct Padding (2)

- Line 227: `h-full border-0 rounded-none focus:ring-0 focus:ring-offset-0`
- Line 230: `w-full h-full border-0 rounded-none focus:ring-0 focus:ring-offset-0`

---

### src/components/molecules/Popconfirm/PopconfirmArrow.tsx

#### Missing Direct Padding (1)

- Line 51: `absolute w-0 h-0 border-[var(--spacing-x1-5)]`

---

### src/components/molecules/Popconfirm/PopconfirmContent.tsx

#### Missing Direct Padding (2)

- Line 80: `bg-[var(--color-bg-primary)]`
- Line 80: `border border-[var(--color-border-secondary)]`

---

### src/components/molecules/ProgressList/ProgressList.tsx

#### Missing Direct Padding (22)

- Line 186: `flex-1 h-px border-b border-[var(--border-primary)]`
- Line 196: `flex-1 h-px border-b border-[var(--border-primary)]`
- Line 212: `flex items-center justify-center w-[var(--spacing-x4)] h-[var(--spacing-x4)] rounded-full bg-[var(--primary)]`
- Line 213: `text-[var(--color-bg-primary)] text-xxs-rem font-medium leading-none text-center`
- Line 370: `flex-1 h-0 border-b border-[var(--tertiary)]`
- Line 577: `flex-1 h-px border-b border-[var(--border-primary)]`
- Line 587: `flex-1 h-px border-b border-[var(--border-primary)]`
- Line 187: `bg-[var(--color-bg-primary)]`
- Line 187: `bg-[var(--glass-hover)]`
- Line 230: `flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200`
- Line 232: `bg-[var(--color-bg-primary)]`
- Line 232: `bg-[var(--glass-hover)]`
- Line 232: `border-[var(--primary)]`
- Line 233: `bg-[var(--color-bg-primary)]`
- Line 233: `bg-[var(--glass-hover)]`
- Line 233: `border-[var(--border-primary)]`
- Line 234: `cursor-pointer hover:border-[var(--secondary)] hover:scale-105`
- Line 265: `w-3 h-3 rounded-full border-4`
- Line 266: `bg-[var(--color-bg-primary)]`
- Line 266: `bg-[var(--glass-hover)]`
- Line 267: `border-[var(--primary)]`
- Line 267: `border-[var(--border-primary)]`

---

### src/components/molecules/RadioSelector/RadioSelector.tsx

#### Missing Direct Padding (1)

- Line 211: `size-[0.625rem] rounded-full bg-[var(--primary)]`

---

### src/components/molecules/Select/SelectContent.tsx

#### Missing Direct Padding (2)

- Line 109: `bg-[var(--bg-primary)]`
- Line 109: `border border-[var(--border-primary)]`

---

### src/components/molecules/Select/SelectItem.tsx

#### Missing Direct Padding (3)

- Line 69: `focus:bg-[var(--bg-secondary)] focus:text-[var(--primary)]`
- Line 73: `hover:bg-[var(--bg-secondary)] hover:text-[var(--primary)]`
- Line 74: `bg-[var(--bg-secondary)]`

---

### src/components/molecules/Select/SelectSeparator.tsx

#### Missing Direct Padding (1)

- Line 27: `-mx-[var(--spacing-x1)] my-[var(--spacing-x1)] h-px bg-[var(--border-primary)]`

---

### src/components/molecules/Select/SelectTrigger.tsx

#### Missing Direct Padding (2)

- Line 106: `relative w-full border transition-all duration-200 font-sans font-normal`
- Line 108: `bg-surface`

---

### src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.tsx

#### Missing Direct Padding (1)

- Line 127: `border-0 rounded-none`

---

### src/components/molecules/Slider/Slider.tsx

#### Missing Direct Padding (2)

- Line 315: `rounded-full bg-[var(--bg-primary)]`
- Line 316: `border-2 border-[var(--primary)]`

---

### src/components/molecules/Slider/SliderThumb.tsx

#### Missing Direct Padding (2)

- Line 86: `rounded-full bg-[var(--bg-primary)]`
- Line 87: `border-2 border-[var(--primary)]`

---

### src/components/molecules/Steps/StepIcon.tsx

#### Missing Direct Padding (2)

- Line 58: `bg-[var(--primary)]`
- Line 59: `bg-[var(--tertiary)]`

---

### src/components/molecules/Timeline/Timeline.tsx

#### Missing Direct Padding (2)

- Line 134: `border-l border-dashed border-[var(--color-border-primary)]`
- Line 135: `bg-[var(--color-border-primary)]`

---

### src/components/molecules/Timeline/TimelineDot.tsx

#### Missing Direct Padding (3)

- Line 49: `flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-bg-primary)] border-2`
- Line 69: `flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-bg-primary)] border-2`
- Line 84: `w-2.5 h-2.5 rounded-full border-2`

---

### src/components/molecules/TimePicker/TimePicker.tsx

#### Missing Direct Padding (6)

- Line 144: `flex flex-col h-[calc(var(--spacing-x10)*5)] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-border-primary)]`
- Line 145: `border-r border-[var(--color-border-secondary)] last:border-r-0`
- Line 161: `text-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)]`
- Line 162: `bg-[var(--color-primary)] text-[var(--color-bg-primary)] hover:bg-[var(--color-primary)]`
- Line 497: `bg-[var(--color-bg-primary)]`
- Line 497: `border border-[var(--color-border-secondary)]`

---

### src/components/molecules/ToggleGroup/ToggleGroup.tsx

#### Missing Direct Padding (1)

- Line 78: `bg-[var(--color-bg-primary)]`

---

### src/components/molecules/Tour/Tour.tsx

#### Missing Direct Padding (5)

- Line 142: `absolute inset-0 bg-overlay transition-all duration-300`
- Line 151: `absolute transition-all duration-300 pointer-events-none border-2 border-[var(--primary)] rounded-md shadow-[0_0_0_9999px_var(--overlay-medium)]`
- Line 166: `bg-[var(--color-bg-primary)]`
- Line 192: `bg-[var(--primary)]`
- Line 192: `bg-[var(--neutral-200)]`

---

### src/components/molecules/Transfer/Transfer.tsx

#### Missing Direct Padding (7)

- Line 116: `bg-[var(--color-bg-primary)]`
- Line 116: `border border-[var(--border-primary)]`
- Line 117: `bg-[var(--color-bg-secondary)]`
- Line 117: `bg-transparent`
- Line 150: `bg-[var(--color-bg-secondary)]`
- Line 176: `bg-[var(--color-bg-secondary)]`
- Line 176: `bg-transparent`

---

### src/components/molecules/Tree/TreeNode.tsx

#### Missing Direct Padding (4)

- Line 127: `bg-[var(--color-primary-light)]`
- Line 127: `bg-[var(--glass-selected)]`
- Line 128: `hover:bg-[var(--glass-hover)]`
- Line 128: `hover:bg-[var(--color-bg-secondary)]`

---

### src/components/molecules/Tree/TreeNodeChildren.tsx

#### Missing Direct Padding (1)

- Line 54: `border-l border-[var(--color-border-secondary)] ml-[calc(var(--spacing-x3)-1px)]`

---

### src/components/molecules/Tree/TreeNodeSwitcher.tsx

#### Missing Direct Padding (2)

- Line 70: `w-[calc((var(--spacing-x2)+var(--spacing-x1))/2)] h-[calc((var(--spacing-x2)+var(--spacing-x1))/2)] rounded-full bg-[var(--color-border-primary)]`
- Line 94: `hover:bg-[var(--color-bg-secondary)] rounded transition-colors`

---

### src/components/molecules/TreeSelect/TreeSelect.tsx

#### Missing Direct Padding (3)

- Line 393: `bg-transparent border-none outline-none`
- Line 438: `bg-[var(--color-bg-primary)]`
- Line 438: `border border-[var(--color-border-secondary)]`

---

### src/components/molecules/UploadButton/UploadButton.tsx

#### Missing Direct Padding (6)

- Line 83: `border border-solid`
- Line 88: `bg-transparent`
- Line 88: `border-[var(--border-primary)]`
- Line 90: `hover:border-[var(--primary)]`
- Line 94: `border-[var(--primary)]`
- Line 111: `text-[var(--border-primary)]`

---

### src/components/molecules/UploadItem/UploadItem.tsx

#### Missing Direct Padding (2)

- Line 139: `bg-[var(--bg-primary)]`
- Line 139: `border border-[var(--border-secondary)]`

---

### src/components/molecules/UploadThumbnail/UploadThumbnail.tsx

#### Missing Direct Padding (8)

- Line 93: `bg-[var(--color-bg-secondary)] rounded-[var(--radius-full)]`
- Line 96: `hover:bg-[var(--color-critical-light)]`
- Line 138: `border border-solid`
- Line 143: `bg-transparent`
- Line 143: `border-[var(--color-border-primary)]`
- Line 145: `hover:border-[var(--color-primary)]`
- Line 149: `border-[var(--color-primary)]`
- Line 158: `text-[var(--color-border-primary)]`

---

### src/components/organisms/AppHeader/AppHeader.tsx

#### Missing Direct Padding (10)

- Line 220: `bg-[var(--bg-secondary)]`
- Line 220: `border-b border-[var(--border-primary)]`
- Line 299: `bg-[var(--bg-secondary)]`
- Line 299: `border-b border-[var(--border-primary)]`
- Line 387: `bg-[var(--bg-secondary)]`
- Line 387: `border-b border-[var(--border-primary)]`
- Line 485: `bg-[var(--bg-secondary)]`
- Line 485: `border-b border-[var(--border-primary)]`
- Line 546: `bg-[var(--bg-secondary)]`
- Line 546: `border-b border-[var(--border-primary)]`

---

### src/components/organisms/Card/Card.tsx

#### Missing Direct Padding (10)

- Line 278: `border border-[var(--border-secondary)] border-solid flex flex-col justify-center relative w-full`
- Line 281: `bg-[var(--bg-secondary)] h-[10.9375rem] items-center`
- Line 285: `bg-[var(--bg-primary)] items-center justify-center`
- Line 288: `bg-[var(--bg-primary)] items-start`
- Line 437: `bg-[var(--bg-primary)]`
- Line 437: `border border-[var(--border-secondary)] border-solid`
- Line 469: `bg-[var(--bg-primary)]`
- Line 469: `border border-[var(--border-secondary)] border-solid`
- Line 553: `bg-[var(--color-bg-primary)]`
- Line 553: `border border-[var(--border-primary)]`

#### Spacer In Flex-Col (2)

- Line 480: `<Spacer size="x5" />`
- Line 485: `<Spacer size="x5" />`

---

### src/components/organisms/Card/sub-components/CardImage.tsx

#### Missing Direct Padding (1)

- Line 81: `bg-[var(--bg-secondary)]`

---

### src/components/organisms/Collapsible/Collapse.tsx

#### Missing Direct Padding (4)

- Line 75: `bg-transparent`
- Line 75: `bg-transparent`
- Line 76: `border-0`
- Line 87: `bg-transparent border-0`

---

### src/components/organisms/Collapsible/CollapsibleIcon.tsx

#### Missing Direct Padding (1)

- Line 64: `!w-[var(--spacing-x10)] !h-[var(--spacing-x10)] !p-0 flex items-center justify-center rounded-lg shrink-0 border border-[var(--border-primary)] pointer-events-none`

---

### src/components/organisms/Collapsible/CollapsibleTrigger.tsx

#### Missing Direct Padding (6)

- Line 62: `border-b transition-[border-color] duration-200 ease-in-out`
- Line 63: `bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent`
- Line 65: `appearance-none border-0 border-b`
- Line 67: `will-change-[border-color]`
- Line 70: `border-[var(--border-primary)]`
- Line 70: `border-transparent`

---

### src/components/organisms/DataEntryTable/DataEntryTable.tsx

#### Missing Direct Padding (1)

- Line 158: `w-full border-collapse`

---

### src/components/organisms/DataEntryTable/DataEntryTableCell.tsx

#### Missing Direct Padding (1)

- Line 58: `bg-[var(--bg-primary)] border border-[var(--border-secondary)] border-solid box-border`

---

### src/components/organisms/DataEntryTable/DataEntryTableCellActions.tsx

#### Missing Direct Padding (2)

- Line 26: `bg-[var(--bg-primary)] border border-[var(--border-secondary)] border-solid box-border`
- Line 53: `bg-[var(--bg-primary)] border border-[var(--border-secondary)] border-solid box-border`

---

### src/components/organisms/DataEntryTable/DataEntryTableCellAmount.tsx

#### Missing Direct Padding (2)

- Line 137: `bg-[var(--bg-primary)] border border-[var(--border-secondary)] border-solid box-border`
- Line 182: `flex-1 border-0 bg-transparent outline-none text-right min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 whitespace-nowrap`

---

### src/components/organisms/DataEntryTable/DataEntryTableCellContextMenu.tsx

#### Missing Direct Padding (4)

- Line 53: `bg-[var(--bg-primary)]`
- Line 54: `border border-[var(--border-primary)]`
- Line 77: `hover:bg-[var(--bg-secondary)]`
- Line 79: `border-0 bg-transparent cursor-pointer`

---

### src/components/organisms/DataEntryTable/DataEntryTableCellDropdown.tsx

#### Missing Direct Padding (5)

- Line 212: `bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-[var(--radius-md)] shadow-lg overflow-y-auto`
- Line 157: `bg-[var(--bg-primary)] border border-[var(--border-secondary)] border-solid box-border`
- Line 227: `hover:bg-[var(--bg-secondary)]`
- Line 229: `border-0 bg-transparent cursor-pointer`
- Line 231: `bg-[var(--bg-secondary)]`

---

### src/components/organisms/DataEntryTable/DataEntryTableCellInput.tsx

#### Missing Direct Padding (2)

- Line 133: `bg-[var(--bg-primary)] border border-[var(--border-secondary)] border-solid box-border`
- Line 163: `flex-1 border-0 bg-transparent outline-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 whitespace-nowrap`

---

### src/components/organisms/DataEntryTable/DataEntryTableHeaderCell.tsx

#### Missing Direct Padding (2)

- Line 111: `bg-transparent p-0 cursor-col-resize relative group`
- Line 122: `group-hover:bg-[var(--primary)]`

---

### src/components/organisms/DataEntryTable/DataEntryTableRow.tsx

#### Missing Direct Padding (2)

- Line 53: `bg-[var(--border-secondary)]`
- Line 54: `bg-[var(--bg-secondary)]`

---

### src/components/organisms/DataEntryTable/DataEntryTableRowCell.tsx

#### Missing Direct Padding (1)

- Line 223: `bg-transparent p-0`

---

### src/components/organisms/DisplayBlock/DisplayBlock.tsx

#### Spacer In Flex-Col (6)

- Line 119: `<Spacer size="x5" className={getGlassInnerBg(resolvedGlass, "bg-[var(--color-bg-primary)]")} />`
- Line 140: `<Spacer size="x5" className={getGlassInnerBg(resolvedGlass, "bg-[var(--color-bg-primary)]")} />`
- Line 207: `<Spacer size="x5" className={getGlassInnerBg(resolvedGlass, "bg-[var(--color-bg-primary)]")} />`
- Line 211: `<Spacer size="x5" className={getGlassInnerBg(resolvedGlass, "bg-[var(--color-bg-primary)]")} />`
- Line 232: `<Spacer size="x5" className={getGlassInnerBg(resolvedGlass, "bg-[var(--color-bg-primary)]")} />`
- Line 236: `<Spacer size="x5" className={getGlassInnerBg(resolvedGlass, "bg-[var(--color-bg-primary)]")} />`

---

### src/components/organisms/Drawer/DrawerClose.tsx

#### Missing Direct Padding (1)

- Line 78: `hover:bg-[var(--color-bg-secondary)]`

---

### src/components/organisms/Drawer/DrawerContent.tsx

#### Missing Direct Padding (2)

- Line 184: `absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity`
- Line 194: `bg-[var(--bg-primary)]`

---

### src/components/organisms/FileCard/FileCard.tsx

#### Missing Direct Padding (8)

- Line 159: `bg-surface`
- Line 159: `border border-border-secondary`
- Line 296: `bg-[var(--bg-secondary)]`
- Line 296: `bg-[var(--glass-hover)]`
- Line 302: `bg-[var(--bg-secondary)]`
- Line 302: `bg-[var(--glass-hover)]`
- Line 308: `bg-[var(--bg-secondary)]`
- Line 308: `bg-[var(--glass-hover)]`

---

### src/components/organisms/FileThumbnail/FileThumbnail.tsx

#### Missing Direct Padding (1)

- Line 67: `absolute inset-0 bg-[var(--overlay-strong)] rounded-[var(--spacing-x2)] pointer-events-none`

---

### src/components/organisms/FileTypeIcon/FileTypeIcon.tsx

#### Missing Direct Padding (1)

- Line 186: `text-[var(--color-bg-primary)] font-semibold`

---

### src/components/organisms/Footer/Footer.tsx

#### Missing Direct Padding (1)

- Line 59: `bg-surface`

---

### src/components/organisms/Form/Form.tsx

#### Missing Direct Padding (2)

- Line 195: `bg-[var(--bg-primary)]`
- Line 195: `border border-[var(--border-secondary)]`

---

### src/components/organisms/Modal/ModalClose.tsx

#### Missing Direct Padding (1)

- Line 85: `hover:bg-[var(--bg-secondary)]`

---

### src/components/organisms/Modal/ModalContent.tsx

#### Missing Direct Padding (3)

- Line 164: `absolute inset-0 bg-overlay backdrop-blur-sm`
- Line 177: `bg-[var(--bg-primary)]`
- Line 177: `border border-[var(--border-primary)]`

---

### src/components/organisms/NavigationMenu/NavigationMenu.tsx

#### Missing Direct Padding (10)

- Line 56: `bg-[var(--color-bg-primary)] h-[35.5rem] relative rounded-[var(--radius-xl)] shrink-0 w-full`
- Line 74: `absolute border-[var(--color-border-primary)] border-[1px_0_0] border-solid inset-0 pointer-events-none`
- Line 211: `bg-[var(--color-bg-primary)]`
- Line 217: `h-full w-[1px] bg-[var(--color-border-primary)]`
- Line 224: `basis-0 bg-[var(--color-bg-primary)] content-stretch flex flex-col gap-[var(--spacing-x4)] grow items-start justify-start min-h-px min-w-px overflow-clip relative shrink-0`
- Line 256: `basis-0 bg-[var(--color-bg-primary)] content-stretch flex flex-col gap-[var(--spacing-x4)] grow items-start justify-start min-h-px min-w-px overflow-clip relative shrink-0`
- Line 322: `basis-0 bg-[var(--color-bg-primary)] content-stretch flex flex-col gap-[var(--spacing-x4)] grow items-start justify-start min-h-px min-w-px overflow-clip relative shrink-0`
- Line 379: `absolute border border-[var(--color-border-primary)] border-solid inset-0 pointer-events-none rounded-[var(--radius-xl)]`
- Line 408: `absolute border border-[var(--color-border-primary)] border-solid inset-0 pointer-events-none rounded-[var(--radius-xl)]`
- Line 54: `bg-[var(--color-bg-secondary)]`

#### Spacer In Flex-Col (1)

- Line 211: `<Spacer size="x5" className="bg-[var(--color-bg-primary)]" />`

---

### src/components/organisms/NavigationPopover/NavigationLauncher.tsx

#### Missing Direct Padding (2)

- Line 82: `bg-[var(--bg-secondary)]`
- Line 82: `bg-transparent`

---

### src/components/organisms/NavigationPopover/NavigationPopover.tsx

#### Missing Direct Padding (11)

- Line 434: `w-10 h-10 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--primary)]`
- Line 488: `w-6 h-6 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--primary)]`
- Line 715: `w-6 h-6 rounded-full border border-transparent hover:border-[var(--border-primary)] flex items-center justify-center text-[var(--primary)]`
- Line 759: `bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-[var(--spacing-x4)] flex flex-col`
- Line 784: `w-6 h-6 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--primary)]`
- Line 799: `hidden lg:block w-px bg-[var(--border-primary)] rounded-full`
- Line 829: `bg-[var(--bg-secondary)] rounded-b-[inherit]`
- Line 480: `bg-[var(--bg-secondary)]`
- Line 481: `bg-[var(--bg-primary)] hover:bg-[var(--border-secondary)]`
- Line 778: `bg-[var(--bg-secondary)]`
- Line 779: `bg-[var(--bg-primary)] hover:bg-[var(--border-secondary)]`

#### Spacer In Flex-Col (1)

- Line 795: `<Spacer size="x5" aria-hidden="true" />`

---

### src/components/organisms/PageHeader/PageHeader.tsx

#### Missing Direct Padding (1)

- Line 85: `bg-[var(--bg-primary)]`

---

### src/components/organisms/PageHeader/PageHeaderSubcomponents.tsx

#### Missing Direct Padding (1)

- Line 188: `transition-colors hover:bg-[var(--bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2`

---

### src/components/organisms/PageHeader/PageHeaderTabs.tsx

#### Missing Direct Padding (1)

- Line 157: `relative flex w-full items-end gap-[var(--spacing-x1)] border-b border-[var(--border-secondary)]`

---

### src/components/organisms/QuickFilters/QuickFilters.tsx

#### Missing Direct Padding (19)

- Line 252: `w-px h-[2.25rem] bg-[var(--color-border-primary)]`
- Line 132: `bg-[var(--color-border-secondary)]`
- Line 132: `bg-[var(--glass-selected)]`
- Line 134: `bg-[var(--color-border-secondary)]`
- Line 134: `bg-[var(--glass-selected)]`
- Line 135: `bg-[var(--color-bg-primary)]`
- Line 137: `box-border border border-[var(--color-border-primary)]`
- Line 161: `bg-[var(--color-bg-primary)]`
- Line 169: `bg-[var(--color-bg-secondary)]`
- Line 232: `bg-[var(--color-bg-primary)]`
- Line 232: `border border-[var(--color-border-primary)]`
- Line 234: `bg-[var(--color-border-secondary)]`
- Line 234: `bg-[var(--glass-selected)]`
- Line 359: `border border-solid`
- Line 361: `bg-[var(--color-border-secondary)]`
- Line 361: `bg-[var(--glass-selected)]`
- Line 361: `border-[var(--color-border-primary)]`
- Line 362: `bg-[var(--color-bg-primary)]`
- Line 362: `border-[var(--color-border-primary)]`

---

### src/components/organisms/Table/SkeletonRow.tsx

#### Missing Direct Padding (1)

- Line 17: `h-4 bg-[var(--color-border-secondary)] rounded`

---

### src/components/organisms/Table/Table.tsx

#### Missing Direct Padding (3)

- Line 252: `w-full border-collapse`
- Line 248: `bg-[var(--bg-primary)]`
- Line 248: `border border-[var(--border-primary)]`

---

### src/components/organisms/Table/TableCell.tsx

#### Missing Direct Padding (1)

- Line 169: `transition-colors duration-200 border-b border-[var(--border-primary)]`

---

### src/components/organisms/Table/TableHeader.tsx

#### Missing Direct Padding (1)

- Line 213: `border-t-2 border-t-[var(--primary)]`

---

### src/components/organisms/Table/TableHeaderItem.tsx

#### Missing Direct Padding (7)

- Line 107: `text-left transition-colors box-border`
- Line 143: `bg-[var(--bg-primary)]`
- Line 143: `bg-[var(--secondary)]`
- Line 144: `bg-[var(--bg-primary)]`
- Line 144: `bg-[var(--secondary)]`
- Line 145: `bg-[var(--bg-primary)]`
- Line 145: `bg-[var(--secondary)]`

---

### src/components/organisms/Tabs/Tabs.tsx

#### Missing Direct Padding (1)

- Line 72: `absolute inset-0 bg-[var(--critical)] rounded-full`

---

### src/components/organisms/Tabs/TabsTrigger.tsx

#### Missing Direct Padding (2)

- Line 187: `absolute inset-0 bg-[var(--critical)] rounded-full`
- Line 233: `absolute inset-0 bg-[var(--critical)] rounded-full`

---

### src/components/organisms/UploadZone/UploadZone.tsx

#### Missing Direct Padding (8)

- Line 111: `border-dashed rounded-[var(--radius-md)]`
- Line 114: `bg-[var(--bg-secondary)]`
- Line 114: `border border-[var(--border-primary)]`
- Line 116: `border-[var(--primary)]`
- Line 118: `border-[var(--border-primary)] opacity-50 cursor-not-allowed`
- Line 161: `text-[var(--border-primary)]`
- Line 167: `text-[var(--border-primary)]`
- Line 180: `text-[var(--border-primary)]`

---

### src/components/organisms/UserProfileDropdown/UserProfileDropdown.tsx

#### Missing Direct Padding (1)

- Line 67: `bg-[var(--bg-primary)]`

---

### src/components/templates/Blocks/JourneysBlock/JourneysBlock.tsx

#### Missing Direct Padding (2)

- Line 161: `bg-[var(--bg-secondary)] w-full rounded-[var(--radius-lg)] overflow-hidden`
- Line 164: `bg-[var(--bg-primary)]`

---

### src/components/templates/Blocks/LoginBlock.tsx

#### Missing Direct Padding (1)

- Line 18: `w-6 h-6 rounded-lg bg-[var(--primary)] text-[var(--bg-primary)] flex items-center justify-center font-semibold`

---
