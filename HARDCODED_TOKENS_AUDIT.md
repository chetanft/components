# Hardcoded Design Tokens Audit Report

Generated: 2025-11-26T12:48:10.145Z

## Summary

- Total files with issues: 89
- Total issues found: 1279

### By Category

- Hex Colors: 168
- RGBA Colors: 14
- Spacing: 837
- Border Radius: 0
- Font Size: 46
- Other PX: 214

## Detailed Findings

### src/components/molecules/Tree/Tree.tsx

#### Hardcoded PX Values (8)

**SPACING:**

- **Line 191**: `24px` → Use: `var(--spacing-x6)`
- **Line 191**: `24px` → Use: `var(--spacing-x6)`
- **Line 195**: `24px` → Use: `var(--spacing-x6)`
- **Line 216**: `24px` → Use: `var(--spacing-x6)`
- **Line 216**: `24px` → Use: `var(--spacing-x6)`

**OTHER:**

- **Line 192**: `6px` - Review if this should use a design token
- **Line 192**: `6px` - Review if this should use a design token
- **Line 307**: `11px` - Review if this should use a design token

---

### src/components/molecules/FloatButton/FloatButton.tsx

#### Hardcoded PX Values (1)

**OTHER:**

- **Line 72**: `10px` - Review if this should use a design token

---

### src/components/molecules/Pagination/Pagination.tsx

#### Hardcoded Hex Colors (3)

- **Line 121**: `#838c9d` → Use: `var(--color-primary)`
- **Line 162**: `#838c9d` → Use: `var(--color-primary)`
- **Line 184**: `#838c9d` → Use: `var(--color-primary)`

#### Hardcoded PX Values (1)

**SPACING:**

- **Line 138**: `32px` → Use: `var(--spacing-x8)`

---

### src/components/molecules/TimePicker/TimePicker.tsx

#### Hardcoded PX Values (1)

**SPACING:**

- **Line 145**: `56px` → Use: `var(--spacing-x14)`

---

### src/components/molecules/Tooltip/Tooltip.tsx

#### Hardcoded PX Values (6)

**SPACING:**

- **Line 54**: `4px` → Use: `var(--spacing-x1)`

**OTHER:**

- **Line 59**: `6px` - Review if this should use a design token
- **Line 65**: `6px` - Review if this should use a design token
- **Line 70**: `6px` - Review if this should use a design token
- **Line 75**: `6px` - Review if this should use a design token
- **Line 80**: `6px` - Review if this should use a design token

---

### src/components/molecules/UploadThumbnail/UploadThumbnail.tsx

#### Hardcoded PX Values (16)

**SPACING:**

- **Line 63**: `4px` → Use: `var(--spacing-x1)`
- **Line 63**: `80px` → Use: `var(--spacing-x20)`
- **Line 69**: `80px` → Use: `var(--spacing-x20)`
- **Line 69**: `80px` → Use: `var(--spacing-x20)`
- **Line 71**: `8px` → Use: `var(--spacing-x2)`
- **Line 85**: `20px` → Use: `var(--spacing-x5)`
- **Line 85**: `20px` → Use: `var(--spacing-x5)`
- **Line 119**: `8px` → Use: `var(--spacing-x2)`
- **Line 128**: `8px` → Use: `var(--spacing-x2)`
- **Line 129**: `80px` → Use: `var(--spacing-x20)`
- **Line 129**: `80px` → Use: `var(--spacing-x20)`
- **Line 129**: `20px` → Use: `var(--spacing-x5)`
- **Line 129**: `12px` → Use: `var(--spacing-x3)`
- **Line 130**: `8px` → Use: `var(--spacing-x2)`

**OTHER:**

- **Line 84**: `3px` - Review if this should use a design token
- **Line 84**: `3px` - Review if this should use a design token

---

### src/components/molecules/Calendar/Calendar.tsx

#### Hardcoded PX Values (24)

**OTHER:**

- **Line 50**: `30px` - Review if this should use a design token
- **Line 50**: `30px` - Review if this should use a design token
- **Line 342**: `30px` - Review if this should use a design token
- **Line 342**: `30px` - Review if this should use a design token
- **Line 364**: `30px` - Review if this should use a design token
- **Line 364**: `30px` - Review if this should use a design token

**SPACING:**

- **Line 50**: `4px` → Use: `var(--spacing-x1)`
- **Line 193**: `16px` → Use: `var(--spacing-x4)`
- **Line 193**: `12px` → Use: `var(--spacing-x3)`
- **Line 194**: `8px` → Use: `var(--spacing-x2)`
- **Line 213**: `4px` → Use: `var(--spacing-x1)`
- **Line 230**: `8px` → Use: `var(--spacing-x2)`
- **Line 337**: `8px` → Use: `var(--spacing-x2)`
- **Line 337**: `16px` → Use: `var(--spacing-x4)`
- **Line 338**: `12px` → Use: `var(--spacing-x3)`
- **Line 342**: `8px` → Use: `var(--spacing-x2)`
- **Line 348**: `12px` → Use: `var(--spacing-x3)`
- **Line 350**: `12px` → Use: `var(--spacing-x3)`
- **Line 364**: `8px` → Use: `var(--spacing-x2)`
- **Line 364**: `4px` → Use: `var(--spacing-x1)`
- **Line 418**: `80px` → Use: `var(--spacing-x20)`

**FONTSIZE:**

- **Line 213**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 342**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 374**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/molecules/ButtonGroup/ButtonGroup.tsx

#### Hardcoded PX Values (1)

**SPACING:**

- **Line 47**: `8px` → Use: `var(--spacing-x2)`

---

### src/components/molecules/DropdownMenu/DropdownMenuItem.tsx

#### Hardcoded PX Values (41)

**SPACING:**

- **Line 34**: `12px` → Use: `var(--spacing-x3)`
- **Line 34**: `8px` → Use: `var(--spacing-x2)`
- **Line 39**: `12px` → Use: `var(--spacing-x3)`
- **Line 39**: `8px` → Use: `var(--spacing-x2)`
- **Line 44**: `12px` → Use: `var(--spacing-x3)`
- **Line 44**: `8px` → Use: `var(--spacing-x2)`
- **Line 48**: `12px` → Use: `var(--spacing-x3)`
- **Line 48**: `12px` → Use: `var(--spacing-x3)`
- **Line 48**: `8px` → Use: `var(--spacing-x2)`
- **Line 52**: `12px` → Use: `var(--spacing-x3)`
- **Line 52**: `12px` → Use: `var(--spacing-x3)`
- **Line 52**: `8px` → Use: `var(--spacing-x2)`
- **Line 57**: `12px` → Use: `var(--spacing-x3)`
- **Line 57**: `8px` → Use: `var(--spacing-x2)`
- **Line 62**: `12px` → Use: `var(--spacing-x3)`
- **Line 62**: `8px` → Use: `var(--spacing-x2)`
- **Line 66**: `12px` → Use: `var(--spacing-x3)`
- **Line 66**: `16px` → Use: `var(--spacing-x4)`
- **Line 66**: `12px` → Use: `var(--spacing-x3)`
- **Line 66**: `8px` → Use: `var(--spacing-x2)`
- **Line 66**: `8px` → Use: `var(--spacing-x2)`
- **Line 149**: `16px` → Use: `var(--spacing-x4)`
- **Line 154**: `16px` → Use: `var(--spacing-x4)`
- **Line 207**: `20px` → Use: `var(--spacing-x5)`
- **Line 210**: `4px` → Use: `var(--spacing-x1)`
- **Line 231**: `8px` → Use: `var(--spacing-x2)`
- **Line 233**: `20px` → Use: `var(--spacing-x5)`
- **Line 246**: `20px` → Use: `var(--spacing-x5)`
- **Line 280**: `16px` → Use: `var(--spacing-x4)`
- **Line 280**: `28px` → Use: `var(--spacing-x7)`
- **Line 280**: `28px` → Use: `var(--spacing-x7)`
- **Line 280**: `16px` → Use: `var(--spacing-x4)`
- **Line 280**: `16px` → Use: `var(--spacing-x4)`
- **Line 304**: `16px` → Use: `var(--spacing-x4)`
- **Line 316**: `16px` → Use: `var(--spacing-x4)`

**OTHER:**

- **Line 39**: `10px` - Review if this should use a design token
- **Line 57**: `10px` - Review if this should use a design token
- **Line 231**: `7px` - Review if this should use a design token
- **Line 231**: `22px` - Review if this should use a design token
- **Line 318**: `6.207px` - Review if this should use a design token
- **Line 318**: `11px` - Review if this should use a design token

---

### src/components/molecules/DropdownMenu/DropdownMenu.tsx

#### Hardcoded PX Values (42)

**SPACING:**

- **Line 9**: `8px` → Use: `var(--spacing-x2)`
- **Line 9**: `8px` → Use: `var(--spacing-x2)`
- **Line 13**: `4px` → Use: `var(--spacing-x1)`
- **Line 14**: `16px` → Use: `var(--spacing-x4)`
- **Line 15**: `16px` → Use: `var(--spacing-x4)`
- **Line 16**: `4px` → Use: `var(--spacing-x1)`
- **Line 17**: `12px` → Use: `var(--spacing-x3)`
- **Line 126**: `8px` → Use: `var(--spacing-x2)`
- **Line 127**: `40px` → Use: `var(--spacing-x10)`
- **Line 127**: `40px` → Use: `var(--spacing-x10)`
- **Line 127**: `12px` → Use: `var(--spacing-x3)`
- **Line 127**: `0px` → Use: `var(--spacing-x0)`
- **Line 127**: `8px` → Use: `var(--spacing-x2)`
- **Line 128**: `4px` → Use: `var(--spacing-x1)`
- **Line 128**: `40px` → Use: `var(--spacing-x10)`
- **Line 128**: `0px` → Use: `var(--spacing-x0)`
- **Line 128**: `20px` → Use: `var(--spacing-x5)`
- **Line 128**: `8px` → Use: `var(--spacing-x2)`
- **Line 140**: `16px` → Use: `var(--spacing-x4)`
- **Line 156**: `4px` → Use: `var(--spacing-x1)`
- **Line 156**: `8px` → Use: `var(--spacing-x2)`
- **Line 156**: `8px` → Use: `var(--spacing-x2)`
- **Line 168**: `36px` → Use: `var(--spacing-x9)`
- **Line 168**: `8px` → Use: `var(--spacing-x2)`
- **Line 169**: `36px` → Use: `var(--spacing-x9)`
- **Line 197**: `12px` → Use: `var(--spacing-x3)`
- **Line 197**: `16px` → Use: `var(--spacing-x4)`
- **Line 197**: `12px` → Use: `var(--spacing-x3)`
- **Line 197**: `8px` → Use: `var(--spacing-x2)`
- **Line 197**: `8px` → Use: `var(--spacing-x2)`
- **Line 208**: `16px` → Use: `var(--spacing-x4)`
- **Line 244**: `16px` → Use: `var(--spacing-x4)`
- **Line 245**: `4px` → Use: `var(--spacing-x1)`
- **Line 276**: `4px` → Use: `var(--spacing-x1)`
- **Line 278**: `12px` → Use: `var(--spacing-x3)`
- **Line 278**: `8px` → Use: `var(--spacing-x2)`
- **Line 278**: `8px` → Use: `var(--spacing-x2)`

**OTHER:**

- **Line 197**: `10px` - Review if this should use a design token
- **Line 221**: `88px` - Review if this should use a design token
- **Line 221**: `6px` - Review if this should use a design token
- **Line 278**: `10px` - Review if this should use a design token

**FONTSIZE:**

- **Line 284**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/molecules/RadioSelector/RadioSelector.tsx

#### Hardcoded RGBA Colors (2)

- **Line 70**: `rgba(206,209,215,1)` - Consider using design token with opacity
- **Line 71**: `rgba(0,0,0,0.25)` - Consider using design token with opacity

---

### src/components/molecules/UploadButton/UploadButton.tsx

#### Hardcoded PX Values (8)

**SPACING:**

- **Line 63**: `8px` → Use: `var(--spacing-x2)`
- **Line 72**: `8px` → Use: `var(--spacing-x2)`
- **Line 73**: `40px` → Use: `var(--spacing-x10)`
- **Line 73**: `20px` → Use: `var(--spacing-x5)`
- **Line 73**: `12px` → Use: `var(--spacing-x3)`
- **Line 74**: `8px` → Use: `var(--spacing-x2)`
- **Line 89**: `16px` → Use: `var(--spacing-x4)`
- **Line 89**: `16px` → Use: `var(--spacing-x4)`

---

### src/components/molecules/DatePicker/DatePicker.tsx

#### Hardcoded PX Values (1)

**SPACING:**

- **Line 382**: `32px` → Use: `var(--spacing-x8)`

---

### src/components/molecules/DatePicker/Calendar.tsx

#### Hardcoded RGBA Colors (1)

- **Line 37**: `rgba(0,0,0,0.16)` - Consider using design token with opacity

#### Hardcoded PX Values (51)

**SPACING:**

- **Line 37**: `8px` → Use: `var(--spacing-x2)`
- **Line 41**: `16px` → Use: `var(--spacing-x4)`
- **Line 41**: `16px` → Use: `var(--spacing-x4)`
- **Line 42**: `16px` → Use: `var(--spacing-x4)`
- **Line 42**: `16px` → Use: `var(--spacing-x4)`
- **Line 52**: `12px` → Use: `var(--spacing-x3)`
- **Line 64**: `4px` → Use: `var(--spacing-x1)`
- **Line 79**: `12px` → Use: `var(--spacing-x3)`
- **Line 91**: `12px` → Use: `var(--spacing-x3)`
- **Line 103**: `8px` → Use: `var(--spacing-x2)`
- **Line 103**: `4px` → Use: `var(--spacing-x1)`
- **Line 128**: `8px` → Use: `var(--spacing-x2)`
- **Line 143**: `12px` → Use: `var(--spacing-x3)`
- **Line 143**: `12px` → Use: `var(--spacing-x3)`
- **Line 143**: `16px` → Use: `var(--spacing-x4)`
- **Line 143**: `8px` → Use: `var(--spacing-x2)`
- **Line 158**: `40px` → Use: `var(--spacing-x10)`
- **Line 158**: `40px` → Use: `var(--spacing-x10)`
- **Line 158**: `12px` → Use: `var(--spacing-x3)`
- **Line 158**: `20px` → Use: `var(--spacing-x5)`
- **Line 158**: `8px` → Use: `var(--spacing-x2)`
- **Line 374**: `8px` → Use: `var(--spacing-x2)`
- **Line 376**: `8px` → Use: `var(--spacing-x2)`
- **Line 421**: `8px` → Use: `var(--spacing-x2)`
- **Line 465**: `8px` → Use: `var(--spacing-x2)`
- **Line 473**: `12px` → Use: `var(--spacing-x3)`
- **Line 583**: `4px` → Use: `var(--spacing-x1)`
- **Line 584**: `16px` → Use: `var(--spacing-x4)`
- **Line 589**: `4px` → Use: `var(--spacing-x1)`
- **Line 624**: `32px` → Use: `var(--spacing-x8)`
- **Line 635**: `20px` → Use: `var(--spacing-x5)`
- **Line 637**: `40px` → Use: `var(--spacing-x10)`
- **Line 637**: `16px` → Use: `var(--spacing-x4)`
- **Line 637**: `12px` → Use: `var(--spacing-x3)`
- **Line 637**: `16px` → Use: `var(--spacing-x4)`
- **Line 642**: `40px` → Use: `var(--spacing-x10)`
- **Line 642**: `16px` → Use: `var(--spacing-x4)`
- **Line 642**: `12px` → Use: `var(--spacing-x3)`
- **Line 642**: `16px` → Use: `var(--spacing-x4)`

**OTHER:**

- **Line 64**: `30px` - Review if this should use a design token
- **Line 64**: `30px` - Review if this should use a design token
- **Line 103**: `30px` - Review if this should use a design token
- **Line 103**: `30px` - Review if this should use a design token
- **Line 465**: `30px` - Review if this should use a design token
- **Line 465**: `30px` - Review if this should use a design token
- **Line 476**: `30px` - Review if this should use a design token
- **Line 476**: `30px` - Review if this should use a design token
- **Line 577**: `10px` - Review if this should use a design token

**FONTSIZE:**

- **Line 420**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 465**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 558**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/molecules/StackedBarChart/StackedBarChart.tsx

#### Hardcoded PX Values (8)

**SPACING:**

- **Line 92**: `12px` → Use: `var(--spacing-x3)`
- **Line 98**: `12px` → Use: `var(--spacing-x3)`
- **Line 103**: `20px` → Use: `var(--spacing-x5)`
- **Line 107**: `8px` → Use: `var(--spacing-x2)`

**OTHER:**

- **Line 110**: `6px` - Review if this should use a design token
- **Line 132**: `10px` - Review if this should use a design token
- **Line 140**: `10px` - Review if this should use a design token
- **Line 144**: `2px` - Review if this should use a design token

---

### src/components/molecules/UploadItem/UploadItem.tsx

#### Hardcoded PX Values (19)

**SPACING:**

- **Line 81**: `8px` → Use: `var(--spacing-x2)`
- **Line 81**: `8px` → Use: `var(--spacing-x2)`
- **Line 82**: `4px` → Use: `var(--spacing-x1)`
- **Line 88**: `8px` → Use: `var(--spacing-x2)`
- **Line 99**: `20px` → Use: `var(--spacing-x5)`
- **Line 99**: `20px` → Use: `var(--spacing-x5)`
- **Line 132**: `8px` → Use: `var(--spacing-x2)`
- **Line 135**: `12px` → Use: `var(--spacing-x3)`
- **Line 138**: `12px` → Use: `var(--spacing-x3)`
- **Line 140**: `20px` → Use: `var(--spacing-x5)`
- **Line 147**: `4px` → Use: `var(--spacing-x1)`
- **Line 148**: `4px` → Use: `var(--spacing-x1)`
- **Line 182**: `16px` → Use: `var(--spacing-x4)`
- **Line 182**: `16px` → Use: `var(--spacing-x4)`
- **Line 192**: `12px` → Use: `var(--spacing-x3)`
- **Line 197**: `12px` → Use: `var(--spacing-x3)`
- **Line 198**: `20px` → Use: `var(--spacing-x5)`
- **Line 206**: `12px` → Use: `var(--spacing-x3)`

**OTHER:**

- **Line 100**: `2px` - Review if this should use a design token

---

### src/components/molecules/Content/Content.tsx

#### Hardcoded PX Values (2)

**SPACING:**

- **Line 24**: `4px` → Use: `var(--spacing-x1)`
- **Line 29**: `4px` → Use: `var(--spacing-x1)`

---

### src/components/molecules/Message/Message.tsx

#### Hardcoded PX Values (2)

**OTHER:**

- **Line 109**: `1px` - Review if this should use a design token
- **Line 334**: `1px` - Review if this should use a design token

---

### src/components/molecules/ProgressBar/ProgressBar.tsx

#### Hardcoded PX Values (10)

**SPACING:**

- **Line 95**: `4px` → Use: `var(--spacing-x1)`
- **Line 96**: `8px` → Use: `var(--spacing-x2)`
- **Line 97**: `12px` → Use: `var(--spacing-x3)`
- **Line 106**: `20px` → Use: `var(--spacing-x5)`
- **Line 112**: `4px` → Use: `var(--spacing-x1)`
- **Line 135**: `8px` → Use: `var(--spacing-x2)`
- **Line 135**: `8px` → Use: `var(--spacing-x2)`
- **Line 137**: `20px` → Use: `var(--spacing-x5)`
- **Line 140**: `8px` → Use: `var(--spacing-x2)`
- **Line 148**: `8px` → Use: `var(--spacing-x2)`

---

### src/components/molecules/Carousel/Carousel.tsx

#### Hardcoded PX Values (3)

**SPACING:**

- **Line 313**: `8px` → Use: `var(--spacing-x2)`
- **Line 313**: `8px` → Use: `var(--spacing-x2)`
- **Line 315**: `24px` → Use: `var(--spacing-x6)`

---

### src/components/molecules/Image/Image.tsx

#### Hardcoded PX Values (1)

**SPACING:**

- **Line 202**: `60px` → Use: `var(--spacing-x15)`

---

### src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.tsx

#### Hardcoded PX Values (19)

**SPACING:**

- **Line 41**: `4px` → Use: `var(--spacing-x1)`
- **Line 89**: `48px` → Use: `var(--spacing-x12)`
- **Line 89**: `8px` → Use: `var(--spacing-x2)`
- **Line 90**: `48px` → Use: `var(--spacing-x12)`
- **Line 90**: `8px` → Use: `var(--spacing-x2)`
- **Line 91**: `4px` → Use: `var(--spacing-x1)`
- **Line 107**: `96px` → Use: `var(--spacing-x24)`
- **Line 107**: `20px` → Use: `var(--spacing-x5)`
- **Line 125**: `8px` → Use: `var(--spacing-x2)`
- **Line 125**: `96px` → Use: `var(--spacing-x24)`
- **Line 125**: `20px` → Use: `var(--spacing-x5)`
- **Line 129**: `8px` → Use: `var(--spacing-x2)`
- **Line 129**: `8px` → Use: `var(--spacing-x2)`
- **Line 130**: `4px` → Use: `var(--spacing-x1)`
- **Line 133**: `4px` → Use: `var(--spacing-x1)`

**OTHER:**

- **Line 89**: `15px` - Review if this should use a design token
- **Line 90**: `10px` - Review if this should use a design token
- **Line 90**: `15px` - Review if this should use a design token
- **Line 91**: `19px` - Review if this should use a design token

---

### src/components/molecules/Watermark/Watermark.tsx

#### Hardcoded RGBA Colors (1)

- **Line 48**: `rgba(0, 0, 0, 0.15)` - Consider using design token with opacity

---

### src/components/molecules/Steps/Steps.tsx

#### Hardcoded PX Values (6)

**SPACING:**

- **Line 47**: `64px` → Use: `var(--spacing-x16)`
- **Line 53**: `8px` → Use: `var(--spacing-x2)`
- **Line 54**: `32px` → Use: `var(--spacing-x8)`
- **Line 61**: `20px` → Use: `var(--spacing-x5)`
- **Line 113**: `12px` → Use: `var(--spacing-x3)`
- **Line 113**: `8px` → Use: `var(--spacing-x2)`

---

### src/components/molecules/ColorPicker/ColorPicker.tsx

#### Hardcoded Hex Colors (2)

- **Line 41**: `#000000` → Use: `var(--color-black)`
- **Line 41**: `#ffffff` → Use: `var(--color-tertiary)`

---

### src/components/molecules/Tour/Tour.tsx

#### Hardcoded RGBA Colors (1)

- **Line 117**: `rgba(0,0,0,0.5)` - Consider using design token with opacity

---

### src/components/molecules/FileValidationCard/FileValidationCard.tsx

#### Hardcoded Hex Colors (3)

- **Line 132**: `#ECF6FF` → Use: `var(--color-neutral)`
- **Line 133**: `#1890FF` → Use: `var(--color-neutral)`
- **Line 137**: `#1890FF` → Use: `var(--color-neutral)`

#### Hardcoded PX Values (36)

**SPACING:**

- **Line 105**: `8px` → Use: `var(--spacing-x2)`
- **Line 108**: `12px` → Use: `var(--spacing-x3)`
- **Line 111**: `12px` → Use: `var(--spacing-x3)`
- **Line 113**: `20px` → Use: `var(--spacing-x5)`
- **Line 120**: `4px` → Use: `var(--spacing-x1)`
- **Line 121**: `12px` → Use: `var(--spacing-x3)`
- **Line 130**: `8px` → Use: `var(--spacing-x2)`
- **Line 132**: `8px` → Use: `var(--spacing-x2)`
- **Line 132**: `8px` → Use: `var(--spacing-x2)`
- **Line 132**: `4px` → Use: `var(--spacing-x1)`
- **Line 163**: `8px` → Use: `var(--spacing-x2)`
- **Line 169**: `32px` → Use: `var(--spacing-x8)`
- **Line 169**: `32px` → Use: `var(--spacing-x8)`
- **Line 169**: `8px` → Use: `var(--spacing-x2)`
- **Line 183**: `32px` → Use: `var(--spacing-x8)`
- **Line 183**: `32px` → Use: `var(--spacing-x8)`
- **Line 183**: `8px` → Use: `var(--spacing-x2)`
- **Line 197**: `32px` → Use: `var(--spacing-x8)`
- **Line 197**: `32px` → Use: `var(--spacing-x8)`
- **Line 197**: `8px` → Use: `var(--spacing-x2)`
- **Line 211**: `16px` → Use: `var(--spacing-x4)`
- **Line 211**: `16px` → Use: `var(--spacing-x4)`
- **Line 222**: `12px` → Use: `var(--spacing-x3)`
- **Line 227**: `12px` → Use: `var(--spacing-x3)`
- **Line 227**: `52px` → Use: `var(--spacing-x13)`
- **Line 230**: `4px` → Use: `var(--spacing-x1)`
- **Line 230**: `8px` → Use: `var(--spacing-x2)`
- **Line 231**: `8px` → Use: `var(--spacing-x2)`
- **Line 249**: `4px` → Use: `var(--spacing-x1)`
- **Line 249**: `8px` → Use: `var(--spacing-x2)`
- **Line 250**: `8px` → Use: `var(--spacing-x2)`
- **Line 268**: `4px` → Use: `var(--spacing-x1)`
- **Line 268**: `8px` → Use: `var(--spacing-x2)`
- **Line 269**: `8px` → Use: `var(--spacing-x2)`
- **Line 286**: `12px` → Use: `var(--spacing-x3)`

**OTHER:**

- **Line 132**: `2px` - Review if this should use a design token

---

### src/components/molecules/Graphs/Graphs.tsx

#### Hardcoded Hex Colors (5)

- **Line 16**: `#5f697b` → Use: `var(--color-primary)`
- **Line 46**: `#434f64` → Use: `var(--color-primary)`
- **Line 67**: `#434f64` → Use: `var(--color-primary)`
- **Line 75**: `#434f64` → Use: `var(--color-primary)`
- **Line 83**: `#434f64` → Use: `var(--color-primary)`

#### Hardcoded PX Values (29)

**SPACING:**

- **Line 16**: `12px` → Use: `var(--spacing-x3)`
- **Line 20**: `12px` → Use: `var(--spacing-x3)`
- **Line 24**: `20px` → Use: `var(--spacing-x5)`
- **Line 28**: `48px` → Use: `var(--spacing-x12)`
- **Line 33**: `36px` → Use: `var(--spacing-x9)`
- **Line 42**: `12px` → Use: `var(--spacing-x3)`
- **Line 46**: `20px` → Use: `var(--spacing-x5)`
- **Line 58**: `20px` → Use: `var(--spacing-x5)`
- **Line 62**: `12px` → Use: `var(--spacing-x3)`
- **Line 63**: `4px` → Use: `var(--spacing-x1)`
- **Line 64**: `12px` → Use: `var(--spacing-x3)`
- **Line 65**: `12px` → Use: `var(--spacing-x3)`
- **Line 71**: `4px` → Use: `var(--spacing-x1)`
- **Line 72**: `12px` → Use: `var(--spacing-x3)`
- **Line 73**: `12px` → Use: `var(--spacing-x3)`
- **Line 79**: `4px` → Use: `var(--spacing-x1)`
- **Line 80**: `12px` → Use: `var(--spacing-x3)`
- **Line 81**: `12px` → Use: `var(--spacing-x3)`

**OTHER:**

- **Line 26**: `27px` - Review if this should use a design token
- **Line 27**: `43px` - Review if this should use a design token
- **Line 31**: `25px` - Review if this should use a design token
- **Line 32**: `35px` - Review if this should use a design token
- **Line 36**: `27px` - Review if this should use a design token
- **Line 37**: `33px` - Review if this should use a design token
- **Line 38**: `23px` - Review if this should use a design token
- **Line 46**: `10px` - Review if this should use a design token
- **Line 67**: `10px` - Review if this should use a design token
- **Line 75**: `10px` - Review if this should use a design token
- **Line 83**: `10px` - Review if this should use a design token

---

### src/components/molecules/Anchor/Anchor.tsx

#### Hardcoded PX Values (1)

**OTHER:**

- **Line 178**: `1px` - Review if this should use a design token

---

### src/components/molecules/SegmentedTabs/SegmentedTabs.tsx

#### Hardcoded RGBA Colors (1)

- **Line 68**: `rgba(0,0,0,0.08)` - Consider using design token with opacity

#### Hardcoded PX Values (15)

**SPACING:**

- **Line 41**: `4px` → Use: `var(--spacing-x1)`
- **Line 41**: `8px` → Use: `var(--spacing-x2)`
- **Line 41**: `8px` → Use: `var(--spacing-x2)`
- **Line 54**: `8px` → Use: `var(--spacing-x2)`
- **Line 54**: `8px` → Use: `var(--spacing-x2)`
- **Line 54**: `32px` → Use: `var(--spacing-x8)`
- **Line 54**: `4px` → Use: `var(--spacing-x1)`
- **Line 59**: `8px` → Use: `var(--spacing-x2)`
- **Line 60**: `16px` → Use: `var(--spacing-x4)`
- **Line 90**: `24px` → Use: `var(--spacing-x6)`
- **Line 90**: `24px` → Use: `var(--spacing-x6)`
- **Line 91**: `16px` → Use: `var(--spacing-x4)`
- **Line 91**: `16px` → Use: `var(--spacing-x4)`

**FONTSIZE:**

- **Line 61**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 62**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/molecules/Breadcrumb/Breadcrumb.tsx

#### Hardcoded Hex Colors (2)

- **Line 33**: `#838c9d` → Use: `var(--color-primary)`
- **Line 80**: `#838c9d` → Use: `var(--color-primary)`

---

### src/components/molecules/Timeline/Timeline.tsx

#### Hardcoded PX Values (12)

**OTHER:**

- **Line 96**: `10px` - Review if this should use a design token
- **Line 96**: `10px` - Review if this should use a design token
- **Line 116**: `6px` - Review if this should use a design token
- **Line 226**: `2px` - Review if this should use a design token
- **Line 227**: `11px` - Review if this should use a design token
- **Line 228**: `11px` - Review if this should use a design token
- **Line 229**: `11px` - Review if this should use a design token
- **Line 230**: `11px` - Review if this should use a design token
- **Line 241**: `6px` - Review if this should use a design token

**SPACING:**

- **Line 115**: `24px` → Use: `var(--spacing-x6)`
- **Line 226**: `20px` → Use: `var(--spacing-x5)`
- **Line 226**: `20px` → Use: `var(--spacing-x5)`

---

### src/components/molecules/ProgressList/ProgressList.tsx

#### Hardcoded Hex Colors (1)

- **Line 139**: `#FFFFFF` → Use: `var(--color-tertiary)`

#### Hardcoded PX Values (16)

**SPACING:**

- **Line 70**: `36px` → Use: `var(--spacing-x9)`
- **Line 185**: `4px` → Use: `var(--spacing-x1)`
- **Line 189**: `4px` → Use: `var(--spacing-x1)`
- **Line 206**: `80px` → Use: `var(--spacing-x20)`
- **Line 312**: `80px` → Use: `var(--spacing-x20)`

**OTHER:**

- **Line 98**: `10px` - Review if this should use a design token
- **Line 133**: `7px` - Review if this should use a design token
- **Line 161**: `10px` - Review if this should use a design token
- **Line 184**: `2px` - Review if this should use a design token
- **Line 184**: `2px` - Review if this should use a design token
- **Line 185**: `2px` - Review if this should use a design token
- **Line 187**: `2px` - Review if this should use a design token
- **Line 187**: `6px` - Review if this should use a design token
- **Line 189**: `2px` - Review if this should use a design token
- **Line 196**: `2px` - Review if this should use a design token

**FONTSIZE:**

- **Line 282**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/molecules/Chicklet/Chicklet.tsx

#### Hardcoded PX Values (12)

**SPACING:**

- **Line 56**: `8px` → Use: `var(--spacing-x2)`
- **Line 57**: `8px` → Use: `var(--spacing-x2)`
- **Line 58**: `8px` → Use: `var(--spacing-x2)`
- **Line 59**: `8px` → Use: `var(--spacing-x2)`
- **Line 66**: `4px` → Use: `var(--spacing-x1)`
- **Line 66**: `4px` → Use: `var(--spacing-x1)`

**OTHER:**

- **Line 58**: `2px` - Review if this should use a design token
- **Line 59**: `2px` - Review if this should use a design token
- **Line 67**: `100px` - Review if this should use a design token
- **Line 67**: `100px` - Review if this should use a design token

**FONTSIZE:**

- **Line 119**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 119**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/atoms/RadioGroup/RadioGroup.tsx

#### Hardcoded Hex Colors (8)

- **Line 117**: `#ced1d7` → Use: `var(--color-secondary)`
- **Line 119**: `#434f64` → Use: `var(--color-primary)`
- **Line 119**: `#f0f1f7` → Use: `var(--color-secondary)`
- **Line 119**: `#434f64` → Use: `var(--color-primary)`
- **Line 120**: `#838c9d` → Use: `var(--color-primary)`
- **Line 120**: `#434f64` → Use: `var(--color-primary)`
- **Line 122**: `#434f64` → Use: `var(--color-primary)`
- **Line 149**: `#434f64` → Use: `var(--color-primary)`

#### Hardcoded PX Values (15)

**SPACING:**

- **Line 73**: `16px` → Use: `var(--spacing-x4)`
- **Line 73**: `16px` → Use: `var(--spacing-x4)`
- **Line 76**: `12px` → Use: `var(--spacing-x3)`
- **Line 77**: `12px` → Use: `var(--spacing-x3)`
- **Line 80**: `20px` → Use: `var(--spacing-x5)`
- **Line 82**: `8px` → Use: `var(--spacing-x2)`
- **Line 84**: `16px` → Use: `var(--spacing-x4)`

**OTHER:**

- **Line 74**: `6px` - Review if this should use a design token
- **Line 74**: `6px` - Review if this should use a design token
- **Line 75**: `6px` - Review if this should use a design token
- **Line 81**: `10px` - Review if this should use a design token
- **Line 81**: `10px` - Review if this should use a design token
- **Line 81**: `10px` - Review if this should use a design token

**FONTSIZE:**

- **Line 76**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 83**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/atoms/ReadOnly/ReadOnly.tsx

#### Hardcoded Hex Colors (2)

- **Line 77**: `#5f697b` → Use: `var(--color-primary)`
- **Line 105**: `#5f697b` → Use: `var(--color-primary)`

#### Hardcoded PX Values (19)

**SPACING:**

- **Line 48**: `8px` → Use: `var(--spacing-x2)`
- **Line 52**: `4px` → Use: `var(--spacing-x1)`
- **Line 57**: `4px` → Use: `var(--spacing-x1)`
- **Line 71**: `8px` → Use: `var(--spacing-x2)`
- **Line 75**: `4px` → Use: `var(--spacing-x1)`
- **Line 76**: `16px` → Use: `var(--spacing-x4)`
- **Line 79**: `4px` → Use: `var(--spacing-x1)`
- **Line 85**: `4px` → Use: `var(--spacing-x1)`
- **Line 99**: `8px` → Use: `var(--spacing-x2)`
- **Line 104**: `16px` → Use: `var(--spacing-x4)`
- **Line 108**: `8px` → Use: `var(--spacing-x2)`
- **Line 109**: `4px` → Use: `var(--spacing-x1)`
- **Line 114**: `4px` → Use: `var(--spacing-x1)`
- **Line 128**: `8px` → Use: `var(--spacing-x2)`
- **Line 132**: `4px` → Use: `var(--spacing-x1)`
- **Line 137**: `4px` → Use: `var(--spacing-x1)`

**OTHER:**

- **Line 48**: `82px` - Review if this should use a design token
- **Line 103**: `10px` - Review if this should use a design token
- **Line 103**: `2px` - Review if this should use a design token

---

### src/components/atoms/Skeleton/Skeleton.tsx

#### Hardcoded RGBA Colors (1)

- **Line 67**: `rgba(255, 255, 255, 0.4)` - Consider using design token with opacity

---

### src/components/atoms/Label/Label.tsx

#### Hardcoded Hex Colors (2)

- **Line 86**: `#FF3533` → Use: `var(--color-danger)`
- **Line 98**: `#838C9D` → Use: `var(--color-primary)`

#### Hardcoded PX Values (5)

**SPACING:**

- **Line 66**: `4px` → Use: `var(--spacing-x1)`
- **Line 95**: `12px` → Use: `var(--spacing-x3)`
- **Line 106**: `16px` → Use: `var(--spacing-x4)`
- **Line 106**: `16px` → Use: `var(--spacing-x4)`

**FONTSIZE:**

- **Line 68**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/atoms/Spacer/Spacer.tsx

#### Hardcoded PX Values (24)

**SPACING:**

- **Line 22**: `4px` → Use: `var(--spacing-x1)`
- **Line 23**: `8px` → Use: `var(--spacing-x2)`
- **Line 24**: `12px` → Use: `var(--spacing-x3)`
- **Line 25**: `16px` → Use: `var(--spacing-x4)`
- **Line 26**: `20px` → Use: `var(--spacing-x5)`
- **Line 27**: `24px` → Use: `var(--spacing-x6)`
- **Line 28**: `28px` → Use: `var(--spacing-x7)`
- **Line 29**: `32px` → Use: `var(--spacing-x8)`
- **Line 30**: `36px` → Use: `var(--spacing-x9)`
- **Line 31**: `40px` → Use: `var(--spacing-x10)`
- **Line 32**: `44px` → Use: `var(--spacing-x11)`
- **Line 33**: `48px` → Use: `var(--spacing-x12)`
- **Line 37**: `4px` → Use: `var(--spacing-x1)`
- **Line 38**: `8px` → Use: `var(--spacing-x2)`
- **Line 39**: `12px` → Use: `var(--spacing-x3)`
- **Line 40**: `16px` → Use: `var(--spacing-x4)`
- **Line 41**: `20px` → Use: `var(--spacing-x5)`
- **Line 42**: `24px` → Use: `var(--spacing-x6)`
- **Line 43**: `28px` → Use: `var(--spacing-x7)`
- **Line 44**: `32px` → Use: `var(--spacing-x8)`
- **Line 45**: `36px` → Use: `var(--spacing-x9)`
- **Line 46**: `40px` → Use: `var(--spacing-x10)`
- **Line 47**: `44px` → Use: `var(--spacing-x11)`
- **Line 48**: `48px` → Use: `var(--spacing-x12)`

---

### src/components/atoms/Textarea/Textarea.tsx

#### Hardcoded Hex Colors (3)

- **Line 117**: `#838c9d` → Use: `var(--color-primary)`
- **Line 136**: `#838c9d` → Use: `var(--color-primary)`
- **Line 160**: `#838c9d` → Use: `var(--color-primary)`

#### Hardcoded PX Values (8)

**SPACING:**

- **Line 48**: `32px` → Use: `var(--spacing-x8)`
- **Line 53**: `40px` → Use: `var(--spacing-x10)`
- **Line 58**: `48px` → Use: `var(--spacing-x12)`
- **Line 63**: `56px` → Use: `var(--spacing-x14)`
- **Line 68**: `64px` → Use: `var(--spacing-x16)`
- **Line 77**: `28px` → Use: `var(--spacing-x7)`
- **Line 78**: `80px` → Use: `var(--spacing-x20)`

**OTHER:**

- **Line 73**: `72px` - Review if this should use a design token

---

### src/components/atoms/Button/Button.tsx

#### Hardcoded PX Values (33)

**SPACING:**

- **Line 47**: `12px` → Use: `var(--spacing-x3)`
- **Line 50**: `16px` → Use: `var(--spacing-x4)`
- **Line 51**: `16px` → Use: `var(--spacing-x4)`
- **Line 58**: `24px` → Use: `var(--spacing-x6)`
- **Line 59**: `24px` → Use: `var(--spacing-x6)`
- **Line 62**: `12px` → Use: `var(--spacing-x3)`
- **Line 63**: `16px` → Use: `var(--spacing-x4)`
- **Line 66**: `32px` → Use: `var(--spacing-x8)`
- **Line 67**: `32px` → Use: `var(--spacing-x8)`
- **Line 70**: `16px` → Use: `var(--spacing-x4)`
- **Line 70**: `12px` → Use: `var(--spacing-x3)`
- **Line 71**: `16px` → Use: `var(--spacing-x4)`
- **Line 74**: `40px` → Use: `var(--spacing-x10)`
- **Line 75**: `40px` → Use: `var(--spacing-x10)`
- **Line 78**: `24px` → Use: `var(--spacing-x6)`
- **Line 78**: `12px` → Use: `var(--spacing-x3)`
- **Line 79**: `20px` → Use: `var(--spacing-x5)`
- **Line 82**: `48px` → Use: `var(--spacing-x12)`
- **Line 83**: `48px` → Use: `var(--spacing-x12)`
- **Line 86**: `24px` → Use: `var(--spacing-x6)`
- **Line 86**: `16px` → Use: `var(--spacing-x4)`
- **Line 87**: `24px` → Use: `var(--spacing-x6)`
- **Line 90**: `56px` → Use: `var(--spacing-x14)`
- **Line 91**: `56px` → Use: `var(--spacing-x14)`
- **Line 94**: `28px` → Use: `var(--spacing-x7)`
- **Line 94**: `20px` → Use: `var(--spacing-x5)`
- **Line 95**: `28px` → Use: `var(--spacing-x7)`
- **Line 95**: `28px` → Use: `var(--spacing-x7)`
- **Line 98**: `64px` → Use: `var(--spacing-x16)`
- **Line 99**: `64px` → Use: `var(--spacing-x16)`
- **Line 132**: `8px` → Use: `var(--spacing-x2)`

**OTHER:**

- **Line 54**: `2px` - Review if this should use a design token

**FONTSIZE:**

- **Line 55**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/atoms/Illustration/Illustration.tsx

#### Hardcoded PX Values (3)

**SPACING:**

- **Line 34**: `12px` → Use: `var(--spacing-x3)`
- **Line 35**: `16px` → Use: `var(--spacing-x4)`
- **Line 36**: `20px` → Use: `var(--spacing-x5)`

---

### src/components/atoms/Colors/Colors.tsx

#### Hardcoded Hex Colors (15)

- **Line 209**: `#1a2330` → Use: `var(--color-primary)`
- **Line 210**: `#2c3547` → Use: `var(--color-primary)`
- **Line 211**: `#434f64` → Use: `var(--color-primary)`
- **Line 212**: `#49556a` → Use: `var(--color-primary)`
- **Line 213**: `#5f697b` → Use: `var(--color-primary)`
- **Line 214**: `#6c7689` → Use: `var(--color-primary)`
- **Line 215**: `#838c9d` → Use: `var(--color-primary)`
- **Line 216**: `#9aa3b2` → Use: `var(--color-primary)`
- **Line 217**: `#c5cad3` → Use: `var(--color-primary)`
- **Line 236**: `#ced1d7` → Use: `var(--color-secondary)`
- **Line 238**: `#f0f1f7` → Use: `var(--color-secondary)`
- **Line 251**: `#1890ff` → Use: `var(--color-neutral)`
- **Line 252**: `#00c637` → Use: `var(--color-positive)`
- **Line 253**: `#ff6c19` → Use: `var(--color-warning)`
- **Line 254**: `#ff3532` → Use: `var(--color-danger)`

#### Hardcoded PX Values (2)

**OTHER:**

- **Line 161**: `10px` - Review if this should use a design token

**SPACING:**

- **Line 176**: `40px` → Use: `var(--spacing-x10)`

---

### src/components/atoms/Divider/Divider.tsx

#### Hardcoded PX Values (5)

**SPACING:**

- **Line 94**: `16px` → Use: `var(--spacing-x4)`
- **Line 112**: `8px` → Use: `var(--spacing-x2)`
- **Line 136**: `24px` → Use: `var(--spacing-x6)`
- **Line 137**: `16px` → Use: `var(--spacing-x4)`

**OTHER:**

- **Line 112**: `2px` - Review if this should use a design token

---

### src/components/atoms/Icons/LoadingSpinner.tsx

#### Hardcoded Hex Colors (1)

- **Line 13**: `#1890FF` → Use: `var(--color-neutral)`

---

### src/components/atoms/Icons/FileIcon.tsx

#### Hardcoded Hex Colors (2)

- **Line 92**: `#838C9D` → Use: `var(--color-primary)`
- **Line 96**: `#5F697B` → Use: `var(--color-primary)`

---

### src/components/atoms/Avatar/Avatar.tsx

#### Hardcoded PX Values (9)

**SPACING:**

- **Line 32**: `16px` → Use: `var(--spacing-x4)`
- **Line 32**: `8px` → Use: `var(--spacing-x2)`
- **Line 33**: `24px` → Use: `var(--spacing-x6)`
- **Line 34**: `32px` → Use: `var(--spacing-x8)`
- **Line 35**: `40px` → Use: `var(--spacing-x10)`
- **Line 36**: `48px` → Use: `var(--spacing-x12)`
- **Line 37**: `56px` → Use: `var(--spacing-x14)`
- **Line 38**: `64px` → Use: `var(--spacing-x16)`

**OTHER:**

- **Line 33**: `10px` - Review if this should use a design token

---

### src/components/atoms/Typography/Typography.tsx

#### Hardcoded PX Values (23)

**SPACING:**

- **Line 10**: `28px` → Use: `var(--spacing-x7)`
- **Line 11**: `24px` → Use: `var(--spacing-x6)`
- **Line 12**: `20px` → Use: `var(--spacing-x5)`
- **Line 13**: `20px` → Use: `var(--spacing-x5)`
- **Line 14**: `16px` → Use: `var(--spacing-x4)`
- **Line 15**: `16px` → Use: `var(--spacing-x4)`
- **Line 16**: `16px` → Use: `var(--spacing-x4)`
- **Line 17**: `16px` → Use: `var(--spacing-x4)`
- **Line 40**: `28px` → Use: `var(--spacing-x7)`
- **Line 41**: `24px` → Use: `var(--spacing-x6)`
- **Line 42**: `20px` → Use: `var(--spacing-x5)`
- **Line 43**: `20px` → Use: `var(--spacing-x5)`
- **Line 44**: `16px` → Use: `var(--spacing-x4)`
- **Line 45**: `16px` → Use: `var(--spacing-x4)`
- **Line 46**: `16px` → Use: `var(--spacing-x4)`
- **Line 47**: `16px` → Use: `var(--spacing-x4)`

**FONTSIZE:**

- **Line 18**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 19**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 20**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 48**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 49**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 50**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

**OTHER:**

- **Line 43**: `0.0264px` - Review if this should use a design token

---

### src/components/atoms/Switch/Switch.tsx

#### Hardcoded Hex Colors (6)

- **Line 42**: `#CED1D7` → Use: `var(--color-secondary)`
- **Line 43**: `#838C9D` → Use: `var(--color-primary)`
- **Line 62**: `#CED1D7` → Use: `var(--color-secondary)`
- **Line 63**: `#F8F8F9` → Use: `var(--color-tertiary)`
- **Line 65**: `#434F64` → Use: `var(--color-primary)`
- **Line 66**: `#FFFFFF` → Use: `var(--color-tertiary)`

#### Hardcoded RGBA Colors (2)

- **Line 40**: `rgba(139, 139, 139, 0.2)` - Consider using design token with opacity
- **Line 52**: `rgba(0,0,0,0.35)` - Consider using design token with opacity

#### Hardcoded PX Values (18)

**OTHER:**

- **Line 17**: `30px` - Review if this should use a design token
- **Line 19**: `6px` - Review if this should use a design token
- **Line 23**: `34px` - Review if this should use a design token
- **Line 57**: `34px` - Review if this should use a design token
- **Line 58**: `3px` - Review if this should use a design token

**SPACING:**

- **Line 17**: `16px` → Use: `var(--spacing-x4)`
- **Line 20**: `12px` → Use: `var(--spacing-x3)`
- **Line 24**: `20px` → Use: `var(--spacing-x5)`
- **Line 24**: `20px` → Use: `var(--spacing-x5)`
- **Line 25**: `8px` → Use: `var(--spacing-x2)`
- **Line 57**: `20px` → Use: `var(--spacing-x5)`

**FONTSIZE:**

- **Line 18**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 18**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 20**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 23**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 26**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 57**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 57**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/atoms/SubText/SubText.tsx

#### Hardcoded Hex Colors (1)

- **Line 32**: `#5f697b` → Use: `var(--color-primary)`

#### Hardcoded PX Values (3)

**SPACING:**

- **Line 26**: `8px` → Use: `var(--spacing-x2)`
- **Line 31**: `16px` → Use: `var(--spacing-x4)`

**OTHER:**

- **Line 48**: `10px` - Review if this should use a design token

---

### src/components/atoms/Text/Text.tsx

#### Hardcoded Hex Colors (1)

- **Line 73**: `#434f64` → Use: `var(--color-primary)`

#### Hardcoded PX Values (24)

**FONTSIZE:**

- **Line 44**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

**SPACING:**

- **Line 46**: `16px` → Use: `var(--spacing-x4)`
- **Line 48**: `16px` → Use: `var(--spacing-x4)`
- **Line 50**: `20px` → Use: `var(--spacing-x5)`
- **Line 52**: `24px` → Use: `var(--spacing-x6)`
- **Line 72**: `16px` → Use: `var(--spacing-x4)`
- **Line 112**: `56px` → Use: `var(--spacing-x14)`
- **Line 114**: `56px` → Use: `var(--spacing-x14)`
- **Line 154**: `8px` → Use: `var(--spacing-x2)`
- **Line 166**: `4px` → Use: `var(--spacing-x1)`

**OTHER:**

- **Line 81**: `68px` - Review if this should use a design token
- **Line 81**: `75px` - Review if this should use a design token
- **Line 81**: `57px` - Review if this should use a design token
- **Line 82**: `58px` - Review if this should use a design token
- **Line 83**: `57px` - Review if this should use a design token
- **Line 93**: `68px` - Review if this should use a design token
- **Line 94**: `75px` - Review if this should use a design token
- **Line 95**: `57px` - Review if this should use a design token
- **Line 100**: `58px` - Review if this should use a design token
- **Line 104**: `57px` - Review if this should use a design token
- **Line 110**: `68px` - Review if this should use a design token
- **Line 111**: `75px` - Review if this should use a design token
- **Line 119**: `10px` - Review if this should use a design token
- **Line 154**: `22px` - Review if this should use a design token

---

### src/components/atoms/Statistic/Statistic.tsx

#### Hardcoded PX Values (4)

**SPACING:**

- **Line 34**: `4px` → Use: `var(--spacing-x1)`
- **Line 42**: `4px` → Use: `var(--spacing-x1)`
- **Line 50**: `8px` → Use: `var(--spacing-x2)`

**OTHER:**

- **Line 42**: `57px` - Review if this should use a design token

---

### src/components/atoms/Badge/Badge.tsx

#### Hardcoded PX Values (4)

**SPACING:**

- **Line 124**: `20px` → Use: `var(--spacing-x5)`
- **Line 125**: `16px` → Use: `var(--spacing-x4)`

**OTHER:**

- **Line 125**: `10px` - Review if this should use a design token
- **Line 142**: `2px` - Review if this should use a design token

---

### src/components/atoms/FigmaBadge/FigmaBadge.tsx

#### Hardcoded Hex Colors (3)

- **Line 19**: `#ffebdc` → Use: `var(--color-warning)`
- **Line 19**: `#ff6c19` → Use: `var(--color-warning)`
- **Line 19**: `#ff6c19` → Use: `var(--color-warning)`

#### Hardcoded PX Values (1)

**OTHER:**

- **Line 26**: `10px` - Review if this should use a design token

---

### src/components/charts/PieChart.tsx

#### Hardcoded Hex Colors (1)

- **Line 42**: `#ffffff` → Use: `var(--color-tertiary)`

---

### src/components/charts/RadialChart.tsx

#### Hardcoded Hex Colors (2)

- **Line 46**: `#ffffff` → Use: `var(--color-tertiary)`
- **Line 54**: `#ffffff` → Use: `var(--color-tertiary)`

#### Hardcoded PX Values (1)

**SPACING:**

- **Line 108**: `24px` → Use: `var(--spacing-x6)`

---

### src/components/charts/GaugeChart.tsx

#### Hardcoded Hex Colors (1)

- **Line 74**: `#434f64` → Use: `var(--color-primary)`

---

### src/components/charts/chartConfig.ts

#### Hardcoded Hex Colors (7)

- **Line 69**: `#434f64` → Use: `var(--color-primary)`
- **Line 70**: `#5f697b` → Use: `var(--color-primary)`
- **Line 71**: `#838c9d` → Use: `var(--color-primary)`
- **Line 74**: `#ced1d7` → Use: `var(--color-secondary)`
- **Line 75**: `#f0f1f7` → Use: `var(--color-secondary)`
- **Line 78**: `#ffffff` → Use: `var(--color-tertiary)`
- **Line 79**: `#f8f8f9` → Use: `var(--color-tertiary)`

---

### src/components/charts/AreaChart.tsx

#### Hardcoded Hex Colors (1)

- **Line 54**: `#ffffff` → Use: `var(--color-tertiary)`

---

### src/components/charts/DoughnutChart.tsx

#### Hardcoded Hex Colors (1)

- **Line 28**: `#ffffff` → Use: `var(--color-tertiary)`

---

### src/components/charts/BaseChart.tsx

#### Hardcoded PX Values (1)

**SPACING:**

- **Line 35**: `16px` → Use: `var(--spacing-x4)`

---

### src/components/charts/PolarAreaChart.tsx

#### Hardcoded Hex Colors (2)

- **Line 39**: `#5f697b` → Use: `var(--color-primary)`
- **Line 46**: `#5f697b` → Use: `var(--color-primary)`

---

### src/components/charts/RadarChart.tsx

#### Hardcoded Hex Colors (4)

- **Line 45**: `#ffffff` → Use: `var(--color-tertiary)`
- **Line 47**: `#ffffff` → Use: `var(--color-tertiary)`
- **Line 81**: `#5f697b` → Use: `var(--color-primary)`
- **Line 88**: `#5f697b` → Use: `var(--color-primary)`

---

### src/components/charts/LineChart.tsx

#### Hardcoded Hex Colors (1)

- **Line 56**: `#ffffff` → Use: `var(--color-tertiary)`

---

### src/components/templates/ListingLayout/ListingLayout.tsx

#### Hardcoded RGBA Colors (1)

- **Line 97**: `rgba(15,23,42,0.08)` - Consider using design token with opacity

#### Hardcoded PX Values (30)

**SPACING:**

- **Line 63**: `12px` → Use: `var(--spacing-x3)`
- **Line 63**: `28px` → Use: `var(--spacing-x7)`
- **Line 63**: `16px` → Use: `var(--spacing-x4)`
- **Line 65**: `8px` → Use: `var(--spacing-x2)`
- **Line 68**: `12px` → Use: `var(--spacing-x3)`
- **Line 68**: `24px` → Use: `var(--spacing-x6)`
- **Line 68**: `12px` → Use: `var(--spacing-x3)`
- **Line 70**: `4px` → Use: `var(--spacing-x1)`
- **Line 71**: `4px` → Use: `var(--spacing-x1)`
- **Line 74**: `8px` → Use: `var(--spacing-x2)`
- **Line 74**: `24px` → Use: `var(--spacing-x6)`
- **Line 74**: `12px` → Use: `var(--spacing-x3)`
- **Line 78**: `12px` → Use: `var(--spacing-x3)`
- **Line 78**: `28px` → Use: `var(--spacing-x7)`
- **Line 78**: `16px` → Use: `var(--spacing-x4)`
- **Line 80**: `16px` → Use: `var(--spacing-x4)`
- **Line 80**: `32px` → Use: `var(--spacing-x8)`
- **Line 84**: `32px` → Use: `var(--spacing-x8)`
- **Line 87**: `16px` → Use: `var(--spacing-x4)`
- **Line 87**: `32px` → Use: `var(--spacing-x8)`
- **Line 91**: `16px` → Use: `var(--spacing-x4)`
- **Line 91**: `32px` → Use: `var(--spacing-x8)`
- **Line 97**: `8px` → Use: `var(--spacing-x2)`
- **Line 97**: `24px` → Use: `var(--spacing-x6)`
- **Line 97**: `16px` → Use: `var(--spacing-x4)`
- **Line 98**: `12px` → Use: `var(--spacing-x3)`
- **Line 99**: `12px` → Use: `var(--spacing-x3)`
- **Line 213**: `12px` → Use: `var(--spacing-x3)`
- **Line 218**: `12px` → Use: `var(--spacing-x3)`
- **Line 268**: `20px` → Use: `var(--spacing-x5)`

---

### src/components/organisms/NavigationMenu/NavigationMenu.tsx

#### Hardcoded Hex Colors (58)

- **Line 46**: `#f8f8f9` → Use: `var(--color-tertiary)`
- **Line 60**: `#434f64` → Use: `var(--color-primary)`
- **Line 66**: `#ced1d7` → Use: `var(--color-secondary)`
- **Line 81**: `#434f64` → Use: `var(--color-primary)`
- **Line 82**: `#434f64` → Use: `var(--color-primary)`
- **Line 97**: `#434f64` → Use: `var(--color-primary)`
- **Line 98**: `#434f64` → Use: `var(--color-primary)`
- **Line 105**: `#f8f8f9` → Use: `var(--color-tertiary)`
- **Line 110**: `#434f64` → Use: `var(--color-primary)`
- **Line 111**: `#434f64` → Use: `var(--color-primary)`
- **Line 115**: `#434f64` → Use: `var(--color-primary)`
- **Line 126**: `#434f64` → Use: `var(--color-primary)`
- **Line 127**: `#434f64` → Use: `var(--color-primary)`
- **Line 131**: `#434f64` → Use: `var(--color-primary)`
- **Line 142**: `#434f64` → Use: `var(--color-primary)`
- **Line 143**: `#434f64` → Use: `var(--color-primary)`
- **Line 157**: `#434f64` → Use: `var(--color-primary)`
- **Line 158**: `#434f64` → Use: `var(--color-primary)`
- **Line 162**: `#434f64` → Use: `var(--color-primary)`
- **Line 173**: `#434f64` → Use: `var(--color-primary)`
- **Line 174**: `#434f64` → Use: `var(--color-primary)`
- **Line 188**: `#434f64` → Use: `var(--color-primary)`
- **Line 189**: `#434f64` → Use: `var(--color-primary)`
- **Line 193**: `#434f64` → Use: `var(--color-primary)`
- **Line 203**: `#434f64` → Use: `var(--color-primary)`
- **Line 204**: `#434f64` → Use: `var(--color-primary)`
- **Line 216**: `#ced1d7` → Use: `var(--color-secondary)`
- **Line 225**: `#838c9d` → Use: `var(--color-primary)`
- **Line 234**: `#434f64` → Use: `var(--color-primary)`
- **Line 235**: `#434f64` → Use: `var(--color-primary)`
- **Line 243**: `#434f64` → Use: `var(--color-primary)`
- **Line 244**: `#434f64` → Use: `var(--color-primary)`
- **Line 254**: `#838c9d` → Use: `var(--color-primary)`
- **Line 260**: `#f8f8f9` → Use: `var(--color-tertiary)`
- **Line 263**: `#434f64` → Use: `var(--color-primary)`
- **Line 264**: `#434f64` → Use: `var(--color-primary)`
- **Line 273**: `#434f64` → Use: `var(--color-primary)`
- **Line 274**: `#434f64` → Use: `var(--color-primary)`
- **Line 283**: `#434f64` → Use: `var(--color-primary)`
- **Line 284**: `#434f64` → Use: `var(--color-primary)`
- **Line 291**: `#838c9d` → Use: `var(--color-primary)`
- **Line 292**: `#838c9d` → Use: `var(--color-primary)`
- **Line 296**: `#838c9d` → Use: `var(--color-primary)`
- **Line 303**: `#434f64` → Use: `var(--color-primary)`
- **Line 304**: `#434f64` → Use: `var(--color-primary)`
- **Line 314**: `#838c9d` → Use: `var(--color-primary)`
- **Line 323**: `#434f64` → Use: `var(--color-primary)`
- **Line 324**: `#434f64` → Use: `var(--color-primary)`
- **Line 333**: `#434f64` → Use: `var(--color-primary)`
- **Line 334**: `#434f64` → Use: `var(--color-primary)`
- **Line 343**: `#434f64` → Use: `var(--color-primary)`
- **Line 344**: `#434f64` → Use: `var(--color-primary)`
- **Line 353**: `#434f64` → Use: `var(--color-primary)`
- **Line 354**: `#434f64` → Use: `var(--color-primary)`
- **Line 364**: `#ced1d7` → Use: `var(--color-secondary)`
- **Line 373**: `#434f64` → Use: `var(--color-primary)`
- **Line 384**: `#1890ff` → Use: `var(--color-neutral)`
- **Line 390**: `#ced1d7` → Use: `var(--color-secondary)`

#### Hardcoded RGBA Colors (1)

- **Line 390**: `rgba(0,0,0,0.1)` - Consider using design token with opacity

#### Hardcoded PX Values (132)

**SPACING:**

- **Line 46**: `20px` → Use: `var(--spacing-x5)`
- **Line 47**: `8px` → Use: `var(--spacing-x2)`
- **Line 47**: `8px` → Use: `var(--spacing-x2)`
- **Line 48**: `16px` → Use: `var(--spacing-x4)`
- **Line 52**: `20px` → Use: `var(--spacing-x5)`
- **Line 53**: `36px` → Use: `var(--spacing-x9)`
- **Line 57**: `24px` → Use: `var(--spacing-x6)`
- **Line 65**: `20px` → Use: `var(--spacing-x5)`
- **Line 65**: `20px` → Use: `var(--spacing-x5)`
- **Line 69**: `12px` → Use: `var(--spacing-x3)`
- **Line 69**: `20px` → Use: `var(--spacing-x5)`
- **Line 70**: `12px` → Use: `var(--spacing-x3)`
- **Line 75**: `12px` → Use: `var(--spacing-x3)`
- **Line 75**: `8px` → Use: `var(--spacing-x2)`
- **Line 82**: `16px` → Use: `var(--spacing-x4)`
- **Line 91**: `12px` → Use: `var(--spacing-x3)`
- **Line 91**: `8px` → Use: `var(--spacing-x2)`
- **Line 98**: `16px` → Use: `var(--spacing-x4)`
- **Line 105**: `12px` → Use: `var(--spacing-x3)`
- **Line 105**: `8px` → Use: `var(--spacing-x2)`
- **Line 111**: `16px` → Use: `var(--spacing-x4)`
- **Line 120**: `12px` → Use: `var(--spacing-x3)`
- **Line 120**: `8px` → Use: `var(--spacing-x2)`
- **Line 127**: `16px` → Use: `var(--spacing-x4)`
- **Line 137**: `12px` → Use: `var(--spacing-x3)`
- **Line 137**: `8px` → Use: `var(--spacing-x2)`
- **Line 143**: `16px` → Use: `var(--spacing-x4)`
- **Line 151**: `12px` → Use: `var(--spacing-x3)`
- **Line 151**: `8px` → Use: `var(--spacing-x2)`
- **Line 158**: `16px` → Use: `var(--spacing-x4)`
- **Line 168**: `12px` → Use: `var(--spacing-x3)`
- **Line 168**: `8px` → Use: `var(--spacing-x2)`
- **Line 174**: `16px` → Use: `var(--spacing-x4)`
- **Line 182**: `12px` → Use: `var(--spacing-x3)`
- **Line 182**: `8px` → Use: `var(--spacing-x2)`
- **Line 189**: `16px` → Use: `var(--spacing-x4)`
- **Line 198**: `12px` → Use: `var(--spacing-x3)`
- **Line 198**: `8px` → Use: `var(--spacing-x2)`
- **Line 204**: `16px` → Use: `var(--spacing-x4)`
- **Line 220**: `32px` → Use: `var(--spacing-x8)`
- **Line 220**: `20px` → Use: `var(--spacing-x5)`
- **Line 220**: `32px` → Use: `var(--spacing-x8)`
- **Line 223**: `16px` → Use: `var(--spacing-x4)`
- **Line 224**: `12px` → Use: `var(--spacing-x3)`
- **Line 229**: `12px` → Use: `var(--spacing-x3)`
- **Line 231**: `12px` → Use: `var(--spacing-x3)`
- **Line 231**: `8px` → Use: `var(--spacing-x2)`
- **Line 235**: `16px` → Use: `var(--spacing-x4)`
- **Line 240**: `12px` → Use: `var(--spacing-x3)`
- **Line 240**: `8px` → Use: `var(--spacing-x2)`
- **Line 244**: `16px` → Use: `var(--spacing-x4)`
- **Line 252**: `16px` → Use: `var(--spacing-x4)`
- **Line 253**: `12px` → Use: `var(--spacing-x3)`
- **Line 258**: `12px` → Use: `var(--spacing-x3)`
- **Line 260**: `12px` → Use: `var(--spacing-x3)`
- **Line 260**: `8px` → Use: `var(--spacing-x2)`
- **Line 264**: `16px` → Use: `var(--spacing-x4)`
- **Line 270**: `12px` → Use: `var(--spacing-x3)`
- **Line 270**: `8px` → Use: `var(--spacing-x2)`
- **Line 274**: `16px` → Use: `var(--spacing-x4)`
- **Line 280**: `12px` → Use: `var(--spacing-x3)`
- **Line 280**: `8px` → Use: `var(--spacing-x2)`
- **Line 284**: `16px` → Use: `var(--spacing-x4)`
- **Line 289**: `12px` → Use: `var(--spacing-x3)`
- **Line 289**: `8px` → Use: `var(--spacing-x2)`
- **Line 292**: `16px` → Use: `var(--spacing-x4)`
- **Line 300**: `12px` → Use: `var(--spacing-x3)`
- **Line 300**: `8px` → Use: `var(--spacing-x2)`
- **Line 304**: `16px` → Use: `var(--spacing-x4)`
- **Line 312**: `16px` → Use: `var(--spacing-x4)`
- **Line 313**: `12px` → Use: `var(--spacing-x3)`
- **Line 318**: `12px` → Use: `var(--spacing-x3)`
- **Line 320**: `12px` → Use: `var(--spacing-x3)`
- **Line 320**: `8px` → Use: `var(--spacing-x2)`
- **Line 324**: `16px` → Use: `var(--spacing-x4)`
- **Line 330**: `12px` → Use: `var(--spacing-x3)`
- **Line 330**: `8px` → Use: `var(--spacing-x2)`
- **Line 334**: `16px` → Use: `var(--spacing-x4)`
- **Line 340**: `12px` → Use: `var(--spacing-x3)`
- **Line 340**: `8px` → Use: `var(--spacing-x2)`
- **Line 344**: `16px` → Use: `var(--spacing-x4)`
- **Line 350**: `12px` → Use: `var(--spacing-x3)`
- **Line 350**: `8px` → Use: `var(--spacing-x2)`
- **Line 354**: `16px` → Use: `var(--spacing-x4)`
- **Line 364**: `16px` → Use: `var(--spacing-x4)`
- **Line 368**: `20px` → Use: `var(--spacing-x5)`
- **Line 368**: `12px` → Use: `var(--spacing-x3)`
- **Line 370**: `8px` → Use: `var(--spacing-x2)`
- **Line 370**: `48px` → Use: `var(--spacing-x12)`
- **Line 370**: `24px` → Use: `var(--spacing-x6)`
- **Line 370**: `12px` → Use: `var(--spacing-x3)`
- **Line 370**: `8px` → Use: `var(--spacing-x2)`
- **Line 373**: `0px` → Use: `var(--spacing-x0)`
- **Line 375**: `20px` → Use: `var(--spacing-x5)`
- **Line 376**: `16px` → Use: `var(--spacing-x4)`
- **Line 381**: `8px` → Use: `var(--spacing-x2)`
- **Line 381**: `8px` → Use: `var(--spacing-x2)`
- **Line 384**: `20px` → Use: `var(--spacing-x5)`
- **Line 390**: `20px` → Use: `var(--spacing-x5)`

**OTHER:**

- **Line 75**: `10px` - Review if this should use a design token
- **Line 88**: `10px` - Review if this should use a design token
- **Line 91**: `10px` - Review if this should use a design token
- **Line 107**: `10px` - Review if this should use a design token
- **Line 125**: `10px` - Review if this should use a design token
- **Line 135**: `10px` - Review if this should use a design token
- **Line 137**: `10px` - Review if this should use a design token
- **Line 156**: `10px` - Review if this should use a design token
- **Line 166**: `10px` - Review if this should use a design token
- **Line 168**: `10px` - Review if this should use a design token
- **Line 187**: `10px` - Review if this should use a design token
- **Line 198**: `10px` - Review if this should use a design token
- **Line 215**: `1px` - Review if this should use a design token
- **Line 216**: `1px` - Review if this should use a design token
- **Line 224**: `10px` - Review if this should use a design token
- **Line 231**: `10px` - Review if this should use a design token
- **Line 240**: `10px` - Review if this should use a design token
- **Line 253**: `10px` - Review if this should use a design token
- **Line 260**: `10px` - Review if this should use a design token
- **Line 270**: `10px` - Review if this should use a design token
- **Line 280**: `10px` - Review if this should use a design token
- **Line 290**: `10px` - Review if this should use a design token
- **Line 300**: `10px` - Review if this should use a design token
- **Line 313**: `10px` - Review if this should use a design token
- **Line 320**: `10px` - Review if this should use a design token
- **Line 330**: `10px` - Review if this should use a design token
- **Line 340**: `10px` - Review if this should use a design token
- **Line 350**: `10px` - Review if this should use a design token
- **Line 373**: `0.0264px` - Review if this should use a design token
- **Line 384**: `0.0264px` - Review if this should use a design token

**FONTSIZE:**

- **Line 225**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 254**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 314**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/organisms/Tabs/Tabs.tsx

#### Hardcoded PX Values (2)

**OTHER:**

- **Line 43**: `22.4px` - Review if this should use a design token
- **Line 133**: `1px` - Review if this should use a design token

---

### src/components/organisms/Drawer/Drawer.tsx

#### Hardcoded Hex Colors (1)

- **Line 159**: `#838c9d` → Use: `var(--color-primary)`

---

### src/components/organisms/QuickFilters/QuickFilters.tsx

#### Hardcoded Hex Colors (19)

- **Line 52**: `#F0F1F7` → Use: `var(--color-secondary)`
- **Line 54**: `#F0F1F7` → Use: `var(--color-secondary)`
- **Line 57**: `#CED1D7` → Use: `var(--color-secondary)`
- **Line 79**: `#FF3533` → Use: `var(--color-danger)`
- **Line 80**: `#FF6C19` → Use: `var(--color-warning)`
- **Line 81**: `#00C638` → Use: `var(--color-positive)`
- **Line 82**: `#1890FF` → Use: `var(--color-neutral)`
- **Line 83**: `#434F64` → Use: `var(--color-primary)`
- **Line 86**: `#F0F1F7` → Use: `var(--color-secondary)`
- **Line 87**: `#FF3533` → Use: `var(--color-danger)`
- **Line 88**: `#FF6C19` → Use: `var(--color-warning)`
- **Line 89**: `#00C638` → Use: `var(--color-positive)`
- **Line 90**: `#1890FF` → Use: `var(--color-neutral)`
- **Line 91**: `#434F64` → Use: `var(--color-primary)`
- **Line 100**: `#434F64` → Use: `var(--color-primary)`
- **Line 127**: `#434F64` → Use: `var(--color-primary)`
- **Line 142**: `#CED1D7` → Use: `var(--color-secondary)`
- **Line 144**: `#F0F1F7` → Use: `var(--color-secondary)`
- **Line 158**: `#CED1D7` → Use: `var(--color-secondary)`

#### Hardcoded PX Values (4)

**SPACING:**

- **Line 74**: `24px` → Use: `var(--spacing-x6)`

**FONTSIZE:**

- **Line 105**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 105**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

**OTHER:**

- **Line 158**: `1px` - Review if this should use a design token

---

### src/components/organisms/Result/Result.tsx

#### Hardcoded PX Values (1)

**OTHER:**

- **Line 117**: `72px` - Review if this should use a design token

---

### src/components/organisms/Card/Card.tsx

#### Hardcoded PX Values (2)

**SPACING:**

- **Line 76**: `24px` → Use: `var(--spacing-x6)`
- **Line 77**: `16px` → Use: `var(--spacing-x4)`

---

### src/components/organisms/FileCard/FileCard.tsx

#### Hardcoded Hex Colors (1)

- **Line 273**: `#FF3533` → Use: `var(--color-danger)`

#### Hardcoded PX Values (19)

**SPACING:**

- **Line 148**: `20px` → Use: `var(--spacing-x5)`
- **Line 149**: `20px` → Use: `var(--spacing-x5)`
- **Line 158**: `12px` → Use: `var(--spacing-x3)`
- **Line 160**: `20px` → Use: `var(--spacing-x5)`
- **Line 169**: `8px` → Use: `var(--spacing-x2)`
- **Line 171**: `20px` → Use: `var(--spacing-x5)`
- **Line 199**: `12px` → Use: `var(--spacing-x3)`
- **Line 282**: `20px` → Use: `var(--spacing-x5)`
- **Line 282**: `64px` → Use: `var(--spacing-x16)`
- **Line 284**: `8px` → Use: `var(--spacing-x2)`
- **Line 284**: `4px` → Use: `var(--spacing-x1)`
- **Line 290**: `8px` → Use: `var(--spacing-x2)`
- **Line 290**: `4px` → Use: `var(--spacing-x1)`
- **Line 296**: `8px` → Use: `var(--spacing-x2)`
- **Line 296**: `4px` → Use: `var(--spacing-x1)`

**OTHER:**

- **Line 270**: `54px` - Review if this should use a design token
- **Line 284**: `74px` - Review if this should use a design token
- **Line 290**: `74px` - Review if this should use a design token
- **Line 296**: `74px` - Review if this should use a design token

---

### src/components/organisms/FileThumbnail/FileThumbnail.tsx

#### Hardcoded RGBA Colors (1)

- **Line 57**: `rgba(67,79,100,0.8)` - Consider using design token with opacity

#### Hardcoded PX Values (15)

**SPACING:**

- **Line 38**: `4px` → Use: `var(--spacing-x1)`
- **Line 38**: `80px` → Use: `var(--spacing-x20)`
- **Line 46**: `80px` → Use: `var(--spacing-x20)`
- **Line 46**: `8px` → Use: `var(--spacing-x2)`
- **Line 53**: `8px` → Use: `var(--spacing-x2)`
- **Line 57**: `8px` → Use: `var(--spacing-x2)`
- **Line 61**: `16px` → Use: `var(--spacing-x4)`
- **Line 79**: `12px` → Use: `var(--spacing-x3)`
- **Line 79**: `20px` → Use: `var(--spacing-x5)`
- **Line 91**: `12px` → Use: `var(--spacing-x3)`
- **Line 91**: `20px` → Use: `var(--spacing-x5)`

**FONTSIZE:**

- **Line 61**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 103**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

**OTHER:**

- **Line 79**: `15px` - Review if this should use a design token
- **Line 91**: `15px` - Review if this should use a design token

---

### src/components/organisms/AppHeader/AppHeader.tsx

#### Hardcoded PX Values (77)

**OTHER:**

- **Line 129**: `1px` - Review if this should use a design token
- **Line 133**: `13px` - Review if this should use a design token
- **Line 136**: `78px` - Review if this should use a design token
- **Line 153**: `100px` - Review if this should use a design token
- **Line 158**: `54px` - Review if this should use a design token
- **Line 159**: `54px` - Review if this should use a design token
- **Line 235**: `1px` - Review if this should use a design token
- **Line 239**: `13px` - Review if this should use a design token
- **Line 259**: `100px` - Review if this should use a design token
- **Line 341**: `1px` - Review if this should use a design token
- **Line 345**: `13px` - Review if this should use a design token
- **Line 365**: `100px` - Review if this should use a design token
- **Line 447**: `1px` - Review if this should use a design token
- **Line 467**: `100px` - Review if this should use a design token
- **Line 531**: `1px` - Review if this should use a design token
- **Line 535**: `13px` - Review if this should use a design token
- **Line 538**: `78px` - Review if this should use a design token
- **Line 552**: `100px` - Review if this should use a design token
- **Line 557**: `54px` - Review if this should use a design token
- **Line 558**: `54px` - Review if this should use a design token

**SPACING:**

- **Line 133**: `20px` → Use: `var(--spacing-x5)`
- **Line 145**: `20px` → Use: `var(--spacing-x5)`
- **Line 154**: `16px` → Use: `var(--spacing-x4)`
- **Line 170**: `28px` → Use: `var(--spacing-x7)`
- **Line 181**: `16px` → Use: `var(--spacing-x4)`
- **Line 187**: `36px` → Use: `var(--spacing-x9)`
- **Line 192**: `24px` → Use: `var(--spacing-x6)`
- **Line 193**: `24px` → Use: `var(--spacing-x6)`
- **Line 208**: `24px` → Use: `var(--spacing-x6)`
- **Line 209**: `24px` → Use: `var(--spacing-x6)`
- **Line 239**: `16px` → Use: `var(--spacing-x4)`
- **Line 242**: `64px` → Use: `var(--spacing-x16)`
- **Line 251**: `20px` → Use: `var(--spacing-x5)`
- **Line 260**: `16px` → Use: `var(--spacing-x4)`
- **Line 264**: `40px` → Use: `var(--spacing-x10)`
- **Line 265**: `40px` → Use: `var(--spacing-x10)`
- **Line 276**: `28px` → Use: `var(--spacing-x7)`
- **Line 287**: `16px` → Use: `var(--spacing-x4)`
- **Line 293**: `36px` → Use: `var(--spacing-x9)`
- **Line 298**: `20px` → Use: `var(--spacing-x5)`
- **Line 299**: `20px` → Use: `var(--spacing-x5)`
- **Line 314**: `20px` → Use: `var(--spacing-x5)`
- **Line 315**: `20px` → Use: `var(--spacing-x5)`
- **Line 345**: `16px` → Use: `var(--spacing-x4)`
- **Line 348**: `48px` → Use: `var(--spacing-x12)`
- **Line 357**: `20px` → Use: `var(--spacing-x5)`
- **Line 366**: `16px` → Use: `var(--spacing-x4)`
- **Line 370**: `32px` → Use: `var(--spacing-x8)`
- **Line 371**: `32px` → Use: `var(--spacing-x8)`
- **Line 393**: `16px` → Use: `var(--spacing-x4)`
- **Line 399**: `36px` → Use: `var(--spacing-x9)`
- **Line 404**: `20px` → Use: `var(--spacing-x5)`
- **Line 405**: `20px` → Use: `var(--spacing-x5)`
- **Line 420**: `20px` → Use: `var(--spacing-x5)`
- **Line 421**: `20px` → Use: `var(--spacing-x5)`
- **Line 435**: `36px` → Use: `var(--spacing-x9)`
- **Line 451**: `12px` → Use: `var(--spacing-x3)`
- **Line 462**: `12px` → Use: `var(--spacing-x3)`
- **Line 468**: `16px` → Use: `var(--spacing-x4)`
- **Line 472**: `32px` → Use: `var(--spacing-x8)`
- **Line 473**: `32px` → Use: `var(--spacing-x8)`
- **Line 483**: `28px` → Use: `var(--spacing-x7)`
- **Line 494**: `8px` → Use: `var(--spacing-x2)`
- **Line 500**: `36px` → Use: `var(--spacing-x9)`
- **Line 505**: `24px` → Use: `var(--spacing-x6)`
- **Line 506**: `24px` → Use: `var(--spacing-x6)`
- **Line 535**: `20px` → Use: `var(--spacing-x5)`
- **Line 547**: `20px` → Use: `var(--spacing-x5)`
- **Line 553**: `16px` → Use: `var(--spacing-x4)`
- **Line 568**: `28px` → Use: `var(--spacing-x7)`
- **Line 579**: `16px` → Use: `var(--spacing-x4)`
- **Line 585**: `36px` → Use: `var(--spacing-x9)`
- **Line 590**: `24px` → Use: `var(--spacing-x6)`
- **Line 591**: `24px` → Use: `var(--spacing-x6)`
- **Line 606**: `24px` → Use: `var(--spacing-x6)`
- **Line 607**: `24px` → Use: `var(--spacing-x6)`

**FONTSIZE:**

- **Line 382**: `18px` → Use: `designTokens.typography.fontSize.tablet.lg`

---

### src/components/organisms/FileTypeIcon/FileTypeIcon.tsx

#### Hardcoded Hex Colors (2)

- **Line 91**: `#CED1D7` → Use: `var(--color-secondary)`
- **Line 185**: `#ff3532` → Use: `var(--color-danger)`

#### Hardcoded PX Values (35)

**OTHER:**

- **Line 49**: `13px` - Review if this should use a design token
- **Line 52**: `33px` - Review if this should use a design token
- **Line 53**: `39px` - Review if this should use a design token
- **Line 54**: `46px` - Review if this should use a design token
- **Line 60**: `6px` - Review if this should use a design token
- **Line 62**: `10px` - Review if this should use a design token
- **Line 63**: `13px` - Review if this should use a design token
- **Line 72**: `10px` - Review if this should use a design token
- **Line 147**: `2px` - Review if this should use a design token
- **Line 148**: `3px` - Review if this should use a design token
- **Line 150**: `6px` - Review if this should use a design token
- **Line 151**: `7px` - Review if this should use a design token
- **Line 153**: `10px` - Review if this should use a design token

**SPACING:**

- **Line 49**: `16px` → Use: `var(--spacing-x4)`
- **Line 50**: `20px` → Use: `var(--spacing-x5)`
- **Line 50**: `24px` → Use: `var(--spacing-x6)`
- **Line 51**: `32px` → Use: `var(--spacing-x8)`
- **Line 52**: `40px` → Use: `var(--spacing-x10)`
- **Line 53**: `48px` → Use: `var(--spacing-x12)`
- **Line 54**: `56px` → Use: `var(--spacing-x14)`
- **Line 55**: `52px` → Use: `var(--spacing-x13)`
- **Line 55**: `64px` → Use: `var(--spacing-x16)`
- **Line 61**: `8px` → Use: `var(--spacing-x2)`
- **Line 64**: `16px` → Use: `var(--spacing-x4)`
- **Line 66**: `20px` → Use: `var(--spacing-x5)`
- **Line 71**: `8px` → Use: `var(--spacing-x2)`
- **Line 73**: `12px` → Use: `var(--spacing-x3)`
- **Line 75**: `16px` → Use: `var(--spacing-x4)`
- **Line 77**: `20px` → Use: `var(--spacing-x5)`
- **Line 149**: `4px` → Use: `var(--spacing-x1)`
- **Line 152**: `8px` → Use: `var(--spacing-x2)`

**FONTSIZE:**

- **Line 51**: `26px` → Use: `designTokens.typography.fontSize.tablet.xxl`
- **Line 65**: `18px` → Use: `designTokens.typography.fontSize.tablet.lg`
- **Line 74**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 76**: `18px` → Use: `designTokens.typography.fontSize.tablet.lg`

---

### src/components/organisms/DisplayBlock/DisplayBlock.tsx

#### Hardcoded Hex Colors (6)

- **Line 102**: `#ffffff` → Use: `var(--color-tertiary)`
- **Line 122**: `#ffffff` → Use: `var(--color-tertiary)`
- **Line 186**: `#ffffff` → Use: `var(--color-tertiary)`
- **Line 190**: `#ffffff` → Use: `var(--color-tertiary)`
- **Line 210**: `#ffffff` → Use: `var(--color-tertiary)`
- **Line 214**: `#ffffff` → Use: `var(--color-tertiary)`

#### Hardcoded PX Values (42)

**SPACING:**

- **Line 40**: `20px` → Use: `var(--spacing-x5)`
- **Line 40**: `0px` → Use: `var(--spacing-x0)`
- **Line 45**: `4px` → Use: `var(--spacing-x1)`
- **Line 56**: `20px` → Use: `var(--spacing-x5)`
- **Line 56**: `20px` → Use: `var(--spacing-x5)`
- **Line 61**: `4px` → Use: `var(--spacing-x1)`
- **Line 64**: `4px` → Use: `var(--spacing-x1)`
- **Line 75**: `20px` → Use: `var(--spacing-x5)`
- **Line 75**: `0px` → Use: `var(--spacing-x0)`
- **Line 80**: `4px` → Use: `var(--spacing-x1)`
- **Line 83**: `4px` → Use: `var(--spacing-x1)`
- **Line 94**: `0px` → Use: `var(--spacing-x0)`
- **Line 94**: `20px` → Use: `var(--spacing-x5)`
- **Line 99**: `4px` → Use: `var(--spacing-x1)`
- **Line 103**: `4px` → Use: `var(--spacing-x1)`
- **Line 114**: `0px` → Use: `var(--spacing-x0)`
- **Line 114**: `0px` → Use: `var(--spacing-x0)`
- **Line 119**: `4px` → Use: `var(--spacing-x1)`
- **Line 123**: `4px` → Use: `var(--spacing-x1)`
- **Line 134**: `20px` → Use: `var(--spacing-x5)`
- **Line 134**: `20px` → Use: `var(--spacing-x5)`
- **Line 139**: `4px` → Use: `var(--spacing-x1)`
- **Line 142**: `4px` → Use: `var(--spacing-x1)`
- **Line 145**: `4px` → Use: `var(--spacing-x1)`
- **Line 156**: `20px` → Use: `var(--spacing-x5)`
- **Line 156**: `0px` → Use: `var(--spacing-x0)`
- **Line 161**: `4px` → Use: `var(--spacing-x1)`
- **Line 164**: `4px` → Use: `var(--spacing-x1)`
- **Line 167**: `4px` → Use: `var(--spacing-x1)`
- **Line 178**: `0px` → Use: `var(--spacing-x0)`
- **Line 178**: `20px` → Use: `var(--spacing-x5)`
- **Line 183**: `4px` → Use: `var(--spacing-x1)`
- **Line 187**: `4px` → Use: `var(--spacing-x1)`
- **Line 191**: `4px` → Use: `var(--spacing-x1)`
- **Line 202**: `0px` → Use: `var(--spacing-x0)`
- **Line 202**: `0px` → Use: `var(--spacing-x0)`
- **Line 207**: `4px` → Use: `var(--spacing-x1)`
- **Line 211**: `4px` → Use: `var(--spacing-x1)`
- **Line 215**: `4px` → Use: `var(--spacing-x1)`
- **Line 226**: `20px` → Use: `var(--spacing-x5)`
- **Line 226**: `20px` → Use: `var(--spacing-x5)`
- **Line 231**: `4px` → Use: `var(--spacing-x1)`

---

### src/components/organisms/NavigationPopover/NavigationPopover.tsx

#### Hardcoded PX Values (49)

**SPACING:**

- **Line 260**: `16px` → Use: `var(--spacing-x4)`
- **Line 260**: `16px` → Use: `var(--spacing-x4)`
- **Line 266**: `8px` → Use: `var(--spacing-x2)`
- **Line 266**: `20px` → Use: `var(--spacing-x5)`
- **Line 266**: `12px` → Use: `var(--spacing-x3)`
- **Line 266**: `8px` → Use: `var(--spacing-x2)`
- **Line 288**: `8px` → Use: `var(--spacing-x2)`
- **Line 288**: `20px` → Use: `var(--spacing-x5)`
- **Line 288**: `12px` → Use: `var(--spacing-x3)`
- **Line 289**: `4px` → Use: `var(--spacing-x1)`
- **Line 304**: `8px` → Use: `var(--spacing-x2)`
- **Line 304**: `20px` → Use: `var(--spacing-x5)`
- **Line 304**: `12px` → Use: `var(--spacing-x3)`
- **Line 304**: `8px` → Use: `var(--spacing-x2)`
- **Line 322**: `16px` → Use: `var(--spacing-x4)`
- **Line 323**: `12px` → Use: `var(--spacing-x3)`
- **Line 327**: `8px` → Use: `var(--spacing-x2)`
- **Line 327**: `12px` → Use: `var(--spacing-x3)`
- **Line 327**: `12px` → Use: `var(--spacing-x3)`
- **Line 334**: `8px` → Use: `var(--spacing-x2)`
- **Line 341**: `8px` → Use: `var(--spacing-x2)`
- **Line 341**: `12px` → Use: `var(--spacing-x3)`
- **Line 341**: `8px` → Use: `var(--spacing-x2)`
- **Line 348**: `4px` → Use: `var(--spacing-x1)`
- **Line 349**: `8px` → Use: `var(--spacing-x2)`
- **Line 397**: `16px` → Use: `var(--spacing-x4)`
- **Line 399**: `12px` → Use: `var(--spacing-x3)`
- **Line 406**: `12px` → Use: `var(--spacing-x3)`
- **Line 465**: `36px` → Use: `var(--spacing-x9)`
- **Line 468**: `8px` → Use: `var(--spacing-x2)`
- **Line 495**: `16px` → Use: `var(--spacing-x4)`
- **Line 508**: `20px` → Use: `var(--spacing-x5)`
- **Line 508**: `8px` → Use: `var(--spacing-x2)`
- **Line 515**: `16px` → Use: `var(--spacing-x4)`
- **Line 516**: `20px` → Use: `var(--spacing-x5)`
- **Line 516**: `20px` → Use: `var(--spacing-x5)`
- **Line 520**: `20px` → Use: `var(--spacing-x5)`
- **Line 520**: `20px` → Use: `var(--spacing-x5)`
- **Line 520**: `20px` → Use: `var(--spacing-x5)`
- **Line 522**: `12px` → Use: `var(--spacing-x3)`
- **Line 532**: `8px` → Use: `var(--spacing-x2)`
- **Line 532**: `12px` → Use: `var(--spacing-x3)`
- **Line 532**: `12px` → Use: `var(--spacing-x3)`
- **Line 539**: `8px` → Use: `var(--spacing-x2)`
- **Line 563**: `20px` → Use: `var(--spacing-x5)`
- **Line 568**: `12px` → Use: `var(--spacing-x3)`
- **Line 587**: `20px` → Use: `var(--spacing-x5)`
- **Line 587**: `12px` → Use: `var(--spacing-x3)`
- **Line 587**: `8px` → Use: `var(--spacing-x2)`

---

### src/components/organisms/NavigationPopover/NavigationLauncher.tsx

#### Hardcoded PX Values (1)

**OTHER:**

- **Line 57**: `10px` - Review if this should use a design token

---

### src/components/organisms/UploadZone/UploadZone.tsx

#### Hardcoded PX Values (7)

**SPACING:**

- **Line 103**: `20px` → Use: `var(--spacing-x5)`
- **Line 104**: `8px` → Use: `var(--spacing-x2)`
- **Line 135**: `16px` → Use: `var(--spacing-x4)`
- **Line 135**: `20px` → Use: `var(--spacing-x5)`

**OTHER:**

- **Line 104**: `1.5px` - Review if this should use a design token
- **Line 124**: `65px` - Review if this should use a design token
- **Line 124**: `62px` - Review if this should use a design token

---

### src/components/organisms/Table/TableCell.tsx

#### Hardcoded PX Values (12)

**SPACING:**

- **Line 50**: `12px` → Use: `var(--spacing-x3)`
- **Line 50**: `16px` → Use: `var(--spacing-x4)`
- **Line 50**: `8px` → Use: `var(--spacing-x2)`
- **Line 51**: `16px` → Use: `var(--spacing-x4)`
- **Line 51**: `16px` → Use: `var(--spacing-x4)`
- **Line 51**: `8px` → Use: `var(--spacing-x2)`
- **Line 52**: `20px` → Use: `var(--spacing-x5)`
- **Line 52**: `20px` → Use: `var(--spacing-x5)`
- **Line 52**: `8px` → Use: `var(--spacing-x2)`
- **Line 71**: `4px` → Use: `var(--spacing-x1)`
- **Line 72**: `8px` → Use: `var(--spacing-x2)`

**OTHER:**

- **Line 74**: `19px` - Review if this should use a design token

---

### src/components/organisms/Table/TableHeaderItem.tsx

#### Hardcoded PX Values (30)

**SPACING:**

- **Line 76**: `12px` → Use: `var(--spacing-x3)`
- **Line 76**: `16px` → Use: `var(--spacing-x4)`
- **Line 76**: `8px` → Use: `var(--spacing-x2)`
- **Line 80**: `12px` → Use: `var(--spacing-x3)`
- **Line 80**: `16px` → Use: `var(--spacing-x4)`
- **Line 80**: `8px` → Use: `var(--spacing-x2)`
- **Line 81**: `16px` → Use: `var(--spacing-x4)`
- **Line 81**: `16px` → Use: `var(--spacing-x4)`
- **Line 81**: `8px` → Use: `var(--spacing-x2)`
- **Line 82**: `20px` → Use: `var(--spacing-x5)`
- **Line 82**: `20px` → Use: `var(--spacing-x5)`
- **Line 82**: `8px` → Use: `var(--spacing-x2)`
- **Line 83**: `12px` → Use: `var(--spacing-x3)`
- **Line 83**: `16px` → Use: `var(--spacing-x4)`
- **Line 83**: `8px` → Use: `var(--spacing-x2)`
- **Line 111**: `8px` → Use: `var(--spacing-x2)`
- **Line 111**: `8px` → Use: `var(--spacing-x2)`
- **Line 133**: `16px` → Use: `var(--spacing-x4)`
- **Line 134**: `16px` → Use: `var(--spacing-x4)`

**OTHER:**

- **Line 91**: `50px` - Review if this should use a design token
- **Line 111**: `2px` - Review if this should use a design token
- **Line 111**: `10px` - Review if this should use a design token
- **Line 112**: `1px` - Review if this should use a design token
- **Line 113**: `1px` - Review if this should use a design token
- **Line 114**: `1px` - Review if this should use a design token
- **Line 130**: `6px` - Review if this should use a design token
- **Line 144**: `10px` - Review if this should use a design token

**FONTSIZE:**

- **Line 133**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 134**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 144**: `14px` → Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/organisms/Table/TableCellItem.tsx

#### Hardcoded PX Values (2)

**SPACING:**

- **Line 27**: `8px` → Use: `var(--spacing-x2)`
- **Line 28**: `8px` → Use: `var(--spacing-x2)`

---

### src/components/organisms/Table/Table.tsx

#### Hardcoded PX Values (7)

**OTHER:**

- **Line 68**: `72px` - Review if this should use a design token
- **Line 69**: `100px` - Review if this should use a design token

**SPACING:**

- **Line 262**: `8px` → Use: `var(--spacing-x2)`
- **Line 301**: `4px` → Use: `var(--spacing-x1)`
- **Line 360**: `8px` → Use: `var(--spacing-x2)`
- **Line 382**: `12px` → Use: `var(--spacing-x3)`
- **Line 382**: `32px` → Use: `var(--spacing-x8)`

---

### src/components/organisms/Collapsible/Collapsible.tsx

#### Hardcoded PX Values (8)

**SPACING:**

- **Line 78**: `16px` → Use: `var(--spacing-x4)`
- **Line 78**: `8px` → Use: `var(--spacing-x2)`
- **Line 93**: `8px` → Use: `var(--spacing-x2)`
- **Line 93**: `20px` → Use: `var(--spacing-x5)`
- **Line 98**: `20px` → Use: `var(--spacing-x5)`
- **Line 98**: `20px` → Use: `var(--spacing-x5)`
- **Line 142**: `20px` → Use: `var(--spacing-x5)`
- **Line 142**: `20px` → Use: `var(--spacing-x5)`

---

### src/components/organisms/UserProfile/UserProfile.tsx

#### Hardcoded PX Values (8)

**SPACING:**

- **Line 19**: `8px` → Use: `var(--spacing-x2)`
- **Line 20**: `12px` → Use: `var(--spacing-x3)`
- **Line 20**: `40px` → Use: `var(--spacing-x10)`
- **Line 36**: `8px` → Use: `var(--spacing-x2)`
- **Line 36**: `8px` → Use: `var(--spacing-x2)`

**OTHER:**

- **Line 36**: `15px` - Review if this should use a design token
- **Line 36**: `10px` - Review if this should use a design token

**FONTSIZE:**

- **Line 54**: `26px` → Use: `designTokens.typography.fontSize.tablet.xxl`

---

### src/components/organisms/UserProfileDropdown/UserProfileDropdown.tsx

#### Hardcoded RGBA Colors (2)

- **Line 52**: `rgba(0,0,0,0.1)` - Consider using design token with opacity
- **Line 52**: `rgba(0,0,0,0.1)` - Consider using design token with opacity

#### Hardcoded PX Values (16)

**SPACING:**

- **Line 43**: `12px` → Use: `var(--spacing-x3)`
- **Line 52**: `20px` → Use: `var(--spacing-x5)`
- **Line 52**: `8px` → Use: `var(--spacing-x2)`
- **Line 56**: `20px` → Use: `var(--spacing-x5)`
- **Line 56**: `20px` → Use: `var(--spacing-x5)`
- **Line 57**: `20px` → Use: `var(--spacing-x5)`
- **Line 62**: `56px` → Use: `var(--spacing-x14)`
- **Line 64**: `8px` → Use: `var(--spacing-x2)`
- **Line 69**: `8px` → Use: `var(--spacing-x2)`
- **Line 69**: `8px` → Use: `var(--spacing-x2)`
- **Line 69**: `4px` → Use: `var(--spacing-x1)`
- **Line 88**: `20px` → Use: `var(--spacing-x5)`
- **Line 93**: `20px` → Use: `var(--spacing-x5)`
- **Line 108**: `20px` → Use: `var(--spacing-x5)`
- **Line 113**: `20px` → Use: `var(--spacing-x5)`

**OTHER:**

- **Line 69**: `2px` - Review if this should use a design token

---

### src/components/organisms/Modal/Modal.tsx

#### Hardcoded Hex Colors (1)

- **Line 132**: `#838c9d` → Use: `var(--color-primary)`

---

### src/components/organisms/Upload/Upload.tsx

#### Hardcoded PX Values (3)

**SPACING:**

- **Line 202**: `16px` → Use: `var(--spacing-x4)`
- **Line 251**: `16px` → Use: `var(--spacing-x4)`
- **Line 263**: `16px` → Use: `var(--spacing-x4)`

---

### src/components/organisms/Grid/Grid.tsx

#### Hardcoded PX Values (1)

**OTHER:**

- **Line 258**: `1px` - Review if this should use a design token

---

