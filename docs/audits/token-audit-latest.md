# Hardcoded Design Tokens Audit Report

Generated: 2026-03-02T19:03:30.492Z

## Summary

- Total files with issues: 14
- Total issues found: 23

### By Category

- Hex Colors: 6
- RGBA Colors: 17
- Spacing: 0
- Border Radius: 0
- Font Size: 0
- Other PX: 0

## Detailed Findings

### src/components/atoms/Skeleton/Skeleton.tsx

#### Hardcoded RGBA Colors (2)

- **Line 75**: `rgba(255, 255, 255, 0.4)` - Consider using design token with opacity
- **Line 134**: `rgba(255, 255, 255, 0.4)` - Consider using design token with opacity

---

### src/components/atoms/Switch/SwitchInput.tsx

#### Hardcoded RGBA Colors (1)

- **Line 84**: `rgba(0,0,0,0.35)` - Consider using design token with opacity

---

### src/components/charts/chartConfig.ts

#### Hardcoded Hex Colors (2)

- **Line 96**: `#1a2330` -> Use: `var(--color-primary)`
- **Line 100**: `#c5cad3` -> Use: `var(--color-primary)`

---

### src/components/molecules/ColorPicker/ColorPicker.tsx

#### Hardcoded Hex Colors (4)

- **Line 92**: `#000000` -> Use: `var(--color-black)`
- **Line 92**: `#ffffff` -> Use: `var(--color-tertiary)`
- **Line 100**: `#000000` -> Use: `var(--color-black)`
- **Line 100**: `#ffffff` -> Use: `var(--color-tertiary)`

#### Hardcoded RGBA Colors (1)

- **Line 73**: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` - Consider using design token with opacity

---

### src/components/molecules/DatePicker/Calendar.tsx

#### Hardcoded RGBA Colors (1)

- **Line 62**: `rgba(0,0,0,0.16)` - Consider using design token with opacity

---

### src/components/molecules/RadioSelector/RadioSelector.tsx

#### Hardcoded RGBA Colors (2)

- **Line 166**: `rgba(206,209,215,1)` - Consider using design token with opacity
- **Line 167**: `rgba(0,0,0,0.25)` - Consider using design token with opacity

---

### src/components/molecules/SegmentedTabs/SegmentedTabs.tsx

#### Hardcoded RGBA Colors (1)

- **Line 140**: `rgba(0,0,0,0.08)` - Consider using design token with opacity

---

### src/components/molecules/Tour/Tour.tsx

#### Hardcoded RGBA Colors (1)

- **Line 151**: `rgba(0,0,0,0.5)` - Consider using design token with opacity

---

### src/components/molecules/Watermark/Watermark.tsx

#### Hardcoded RGBA Colors (1)

- **Line 56**: `rgba(0, 0, 0, 0.15)` - Consider using design token with opacity

---

### src/components/organisms/Card/Card.tsx

#### Hardcoded RGBA Colors (1)

- **Line 475**: `rgba(0,0,0,0.1)` - Consider using design token with opacity

---

### src/components/organisms/Drawer/GridDrawer.tsx

#### Hardcoded RGBA Colors (2)

- **Line 156**: `rgba(0, 0, 0, 0.45)` - Consider using design token with opacity
- **Line 170**: `rgba(0, 0, 0, 0.1)` - Consider using design token with opacity

---

### src/components/organisms/FileThumbnail/FileThumbnail.tsx

#### Hardcoded RGBA Colors (1)

- **Line 67**: `rgba(67,79,100,0.8)` - Consider using design token with opacity

---

### src/components/organisms/UserProfileDropdown/UserProfileDropdown.tsx

#### Hardcoded RGBA Colors (2)

- **Line 68**: `rgba(0,0,0,0.1)` - Consider using design token with opacity
- **Line 68**: `rgba(0,0,0,0.1)` - Consider using design token with opacity

---

### src/components/templates/ListingLayout/ListingLayout.tsx

#### Hardcoded RGBA Colors (1)

- **Line 98**: `rgba(15,23,42,0.08)` - Consider using design token with opacity

---

