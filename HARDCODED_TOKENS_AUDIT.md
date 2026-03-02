# Hardcoded Design Tokens Audit Report

Generated: 2026-03-02T18:13:41.459Z

## Summary

- Total files with issues: 42
- Total issues found: 282

### By Category

- Hex Colors: 58
- RGBA Colors: 17
- Spacing: 132
- Border Radius: 0
- Font Size: 5
- Other PX: 70

## Detailed Findings

### src/components/atoms/Badge/Badge.tsx

#### Hardcoded PX Values (2)

- **Line 276** [other]: `1px` - Review if this should use a design token
- **Line 416** [other]: `1px` - Review if this should use a design token

---

### src/components/atoms/Colors/Colors.tsx

#### Hardcoded Hex Colors (15)

- **Line 117**: `#1a2330` -> Use: `var(--color-primary)`
- **Line 118**: `#2c3547` -> Use: `var(--color-primary)`
- **Line 119**: `#434f64` -> Use: `var(--color-primary)`
- **Line 120**: `#49556a` -> Use: `var(--color-primary)`
- **Line 121**: `#5f697b` -> Use: `var(--color-primary)`
- **Line 122**: `#6c7689` -> Use: `var(--color-primary)`
- **Line 123**: `#838c9d` -> Use: `var(--color-primary)`
- **Line 124**: `#9aa3b2` -> Use: `var(--color-primary)`
- **Line 125**: `#c5cad3` -> Use: `var(--color-primary)`
- **Line 144**: `#ced1d7` -> Use: `var(--color-secondary)`
- **Line 146**: `#f0f1f7` -> Use: `var(--color-secondary)`
- **Line 159**: `#1890ff` -> Use: `var(--color-neutral)`
- **Line 160**: `#00c637` -> Use: `var(--color-positive)`
- **Line 161**: `#ff6c19` -> Use: `var(--color-warning)`
- **Line 162**: `#ff3532` -> Use: `var(--color-danger)`

---

### src/components/atoms/Divider/Divider.tsx

#### Hardcoded PX Values (2)

- **Line 115** [spacing]: `16px` -> Use: `var(--spacing-x4)`
- **Line 162** [spacing]: `16px` -> Use: `var(--spacing-x4)`

---

### src/components/atoms/Icons/LoadingSpinner.tsx

#### Hardcoded Hex Colors (1)

- **Line 13**: `#1890FF` -> Use: `var(--color-neutral)`

---

### src/components/atoms/Logos/DiageoWhiteLogo.tsx

#### Hardcoded Hex Colors (1)

- **Line 23**: `#FFFFFF` -> Use: `var(--color-tertiary)`

---

### src/components/atoms/Logos/FTLogoWhite.tsx

#### Hardcoded Hex Colors (14)

- **Line 23**: `#FFFFFF` -> Use: `var(--color-tertiary)`
- **Line 24**: `#FFFFFF` -> Use: `var(--color-tertiary)`
- **Line 27**: `#FFFFFF` -> Use: `var(--color-tertiary)`
- **Line 28**: `#FFFFFF` -> Use: `var(--color-tertiary)`
- **Line 29**: `#FFFFFF` -> Use: `var(--color-tertiary)`
- **Line 30**: `#FFFFFF` -> Use: `var(--color-tertiary)`
- **Line 31**: `#FFFFFF` -> Use: `var(--color-tertiary)`
- **Line 32**: `#FFFFFF` -> Use: `var(--color-tertiary)`
- **Line 33**: `#FFFFFF` -> Use: `var(--color-tertiary)`
- **Line 34**: `#FFFFFF` -> Use: `var(--color-tertiary)`
- **Line 35**: `#FFFFFF` -> Use: `var(--color-tertiary)`
- **Line 36**: `#FFFFFF` -> Use: `var(--color-tertiary)`
- **Line 37**: `#FFFFFF` -> Use: `var(--color-tertiary)`
- **Line 38**: `#FFFFFF` -> Use: `var(--color-tertiary)`

---

### src/components/atoms/ReadOnly/ReadOnly.tsx

#### Hardcoded PX Values (12)

- **Line 57** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 62** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 81** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 85** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 91** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 105** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 115** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 116** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 121** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 135** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 140** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 145** [spacing]: `4px` -> Use: `var(--spacing-x1)`

---

### src/components/atoms/Skeleton/Skeleton.tsx

#### Hardcoded RGBA Colors (2)

- **Line 75**: `rgba(255, 255, 255, 0.4)` - Consider using design token with opacity
- **Line 134**: `rgba(255, 255, 255, 0.4)` - Consider using design token with opacity

---

### src/components/atoms/Spacer/Spacer.tsx

#### Hardcoded PX Values (24)

- **Line 23** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 24** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 25** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 26** [spacing]: `16px` -> Use: `var(--spacing-x4)`
- **Line 27** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 28** [spacing]: `24px` -> Use: `var(--spacing-x6)`
- **Line 29** [spacing]: `28px` -> Use: `var(--spacing-x7)`
- **Line 30** [spacing]: `32px` -> Use: `var(--spacing-x8)`
- **Line 31** [spacing]: `36px` -> Use: `var(--spacing-x9)`
- **Line 32** [spacing]: `40px` -> Use: `var(--spacing-x10)`
- **Line 33** [spacing]: `44px` -> Use: `var(--spacing-x11)`
- **Line 34** [spacing]: `48px` -> Use: `var(--spacing-x12)`
- **Line 38** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 39** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 40** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 41** [spacing]: `16px` -> Use: `var(--spacing-x4)`
- **Line 42** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 43** [spacing]: `24px` -> Use: `var(--spacing-x6)`
- **Line 44** [spacing]: `28px` -> Use: `var(--spacing-x7)`
- **Line 45** [spacing]: `32px` -> Use: `var(--spacing-x8)`
- **Line 46** [spacing]: `36px` -> Use: `var(--spacing-x9)`
- **Line 47** [spacing]: `40px` -> Use: `var(--spacing-x10)`
- **Line 48** [spacing]: `44px` -> Use: `var(--spacing-x11)`
- **Line 49** [spacing]: `48px` -> Use: `var(--spacing-x12)`

---

### src/components/atoms/Switch/SwitchInput.tsx

#### Hardcoded RGBA Colors (1)

- **Line 84**: `rgba(0,0,0,0.35)` - Consider using design token with opacity

---

### src/components/charts/chartConfig.ts

#### Hardcoded Hex Colors (22)

- **Line 81**: `#00c638` -> Use: `var(--color-positive)`
- **Line 82**: `#ff6c19` -> Use: `var(--color-warning)`
- **Line 83**: `#ff3533` -> Use: `var(--color-danger)`
- **Line 84**: `#1890ff` -> Use: `var(--color-neutral)`
- **Line 96**: `#1a2330` -> Use: `var(--color-primary)`
- **Line 97**: `#434f64` -> Use: `var(--color-primary)`
- **Line 98**: `#5f697b` -> Use: `var(--color-primary)`
- **Line 99**: `#838c9d` -> Use: `var(--color-primary)`
- **Line 100**: `#c5cad3` -> Use: `var(--color-primary)`
- **Line 107**: `#1890ff` -> Use: `var(--color-neutral)`
- **Line 109**: `#ecf6ff` -> Use: `var(--color-neutral)`
- **Line 116**: `#00c637` -> Use: `var(--color-positive)`
- **Line 124**: `#dd6a00` -> Use: `var(--color-warning)`
- **Line 125**: `#ff6c19` -> Use: `var(--color-warning)`
- **Line 134**: `#ff3532` -> Use: `var(--color-danger)`
- **Line 142**: `#434f64` -> Use: `var(--color-primary)`
- **Line 143**: `#5f697b` -> Use: `var(--color-primary)`
- **Line 144**: `#838c9d` -> Use: `var(--color-primary)`
- **Line 147**: `#ced1d7` -> Use: `var(--color-secondary)`
- **Line 148**: `#f0f1f7` -> Use: `var(--color-secondary)`
- **Line 151**: `#ffffff` -> Use: `var(--color-tertiary)`
- **Line 152**: `#f8f8f9` -> Use: `var(--color-tertiary)`

---

### src/components/molecules/Calendar/Calendar.tsx

#### Hardcoded PX Values (3)

- **Line 248** [fontSize]: `14px` -> Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 378** [fontSize]: `14px` -> Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`
- **Line 415** [fontSize]: `14px` -> Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/molecules/Cascader/Cascader.tsx

#### Hardcoded PX Values (8)

- **Line 154** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 154** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 507** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 508** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 524** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 524** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 539** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 539** [spacing]: `16px` -> Use: `var(--spacing-x4)`

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

### src/components/molecules/DatePicker/DatePicker.figma.tsx

#### Hardcoded PX Values (1)

- **Line 8** [spacing]: `52px` -> Use: `var(--spacing-x13)`

---

### src/components/molecules/DropdownMenu/DropdownMenuItem.tsx

#### Hardcoded PX Values (2)

- **Line 156** [spacing]: `16px` -> Use: `var(--spacing-x4)`
- **Line 161** [spacing]: `16px` -> Use: `var(--spacing-x4)`

---

### src/components/molecules/FilterDateRange/FilterDateRange.tsx

#### Hardcoded PX Values (1)

- **Line 229** [spacing]: `8px` -> Use: `var(--spacing-x2)`

---

### src/components/molecules/FilterDropdown/FilterDropdown.tsx

#### Hardcoded PX Values (1)

- **Line 251** [spacing]: `8px` -> Use: `var(--spacing-x2)`

---

### src/components/molecules/FilterSearch/FilterSearch.tsx

#### Hardcoded PX Values (2)

- **Line 153** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 167** [spacing]: `8px` -> Use: `var(--spacing-x2)`

---

### src/components/molecules/Loader/Loader.tsx

#### Hardcoded PX Values (1)

- **Line 104** [spacing]: `20px` -> Use: `var(--spacing-x5)`

---

### src/components/molecules/Mentions/Mentions.tsx

#### Hardcoded PX Values (1)

- **Line 157** [fontSize]: `14px` -> Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/molecules/Message/Message.tsx

#### Hardcoded PX Values (2)

- **Line 114** [other]: `1px` - Review if this should use a design token
- **Line 343** [other]: `1px` - Review if this should use a design token

---

### src/components/molecules/PageHeaderFilters/PageHeaderFilters.tsx

#### Hardcoded PX Values (4)

- **Line 62** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 69** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 69** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 81** [spacing]: `8px` -> Use: `var(--spacing-x2)`

---

### src/components/molecules/PercentageOfChargeInput/PercentageOfChargeInput.tsx

#### Hardcoded PX Values (7)

- **Line 205** [other]: `1px` - Review if this should use a design token
- **Line 206** [other]: `1px` - Review if this should use a design token
- **Line 219** [other]: `1px` - Review if this should use a design token
- **Line 259** [other]: `1px` - Review if this should use a design token
- **Line 294** [other]: `1px` - Review if this should use a design token
- **Line 314** [other]: `1px` - Review if this should use a design token
- **Line 368** [other]: `1px` - Review if this should use a design token

---

### src/components/molecules/ProgressBar/ProgressBar.tsx

#### Hardcoded PX Values (2)

- **Line 102** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 131** [spacing]: `20px` -> Use: `var(--spacing-x5)`

---

### src/components/molecules/ProgressList/ProgressList.tsx

#### Hardcoded PX Values (1)

- **Line 304** [other]: `1px` - Review if this should use a design token

---

### src/components/molecules/RadioSelector/RadioSelector.tsx

#### Hardcoded RGBA Colors (2)

- **Line 166**: `rgba(206,209,215,1)` - Consider using design token with opacity
- **Line 167**: `rgba(0,0,0,0.25)` - Consider using design token with opacity

---

### src/components/molecules/SegmentedTabs/SegmentedTabs.tsx

#### Hardcoded RGBA Colors (1)

- **Line 140**: `rgba(0,0,0,0.08)` - Consider using design token with opacity

#### Hardcoded PX Values (9)

- **Line 77** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 77** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 77** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 126** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 126** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 126** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 131** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 132** [spacing]: `16px` -> Use: `var(--spacing-x4)`
- **Line 133** [fontSize]: `14px` -> Use: `designTokens.typography.fontSize.desktop.sm / tablet.md`

---

### src/components/molecules/StackedBarChart/StackedBarChart.tsx

#### Hardcoded PX Values (4)

- **Line 160** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 167** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 172** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 176** [spacing]: `8px` -> Use: `var(--spacing-x2)`

---

### src/components/molecules/Tour/Tour.tsx

#### Hardcoded RGBA Colors (1)

- **Line 151**: `rgba(0,0,0,0.5)` - Consider using design token with opacity

---

### src/components/molecules/Tree/TreeNodeChildren.tsx

#### Hardcoded PX Values (1)

- **Line 54** [other]: `1px` - Review if this should use a design token

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

### src/components/organisms/NavigationMenu/NavigationMenu.tsx

#### Hardcoded PX Values (2)

- **Line 216** [other]: `1px` - Review if this should use a design token
- **Line 217** [other]: `1px` - Review if this should use a design token

---

### src/components/organisms/NavigationPopover/NavigationPopover.tsx

#### Hardcoded PX Values (48)

- **Line 397** [spacing]: `16px` -> Use: `var(--spacing-x4)`
- **Line 397** [spacing]: `16px` -> Use: `var(--spacing-x4)`
- **Line 403** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 403** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 403** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 403** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 425** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 425** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 425** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 426** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 441** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 441** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 441** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 441** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 459** [spacing]: `16px` -> Use: `var(--spacing-x4)`
- **Line 460** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 464** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 464** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 464** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 471** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 478** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 478** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 478** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 485** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 486** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 534** [spacing]: `16px` -> Use: `var(--spacing-x4)`
- **Line 536** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 543** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 709** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 751** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 751** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 752** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 752** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 759** [spacing]: `16px` -> Use: `var(--spacing-x4)`
- **Line 760** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 760** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 764** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 764** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 764** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 776** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 776** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 776** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 783** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 807** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 812** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 831** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 831** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 831** [spacing]: `8px` -> Use: `var(--spacing-x2)`

---

### src/components/organisms/Table/TableCellText.tsx

#### Hardcoded Hex Colors (1)

- **Line 124**: `#5f697b` -> Use: `var(--color-primary)`

---

### src/components/organisms/UserProfileDropdown/UserProfileDropdown.tsx

#### Hardcoded RGBA Colors (2)

- **Line 68**: `rgba(0,0,0,0.1)` - Consider using design token with opacity
- **Line 68**: `rgba(0,0,0,0.1)` - Consider using design token with opacity

#### Hardcoded PX Values (14)

- **Line 68** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 75** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 76** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 83** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 88** [spacing]: `4px` -> Use: `var(--spacing-x1)`
- **Line 107** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 109** [other]: `1px` - Review if this should use a design token
- **Line 114** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 119** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 119** [spacing]: `8px` -> Use: `var(--spacing-x2)`
- **Line 138** [spacing]: `20px` -> Use: `var(--spacing-x5)`
- **Line 140** [other]: `1px` - Review if this should use a design token
- **Line 147** [spacing]: `12px` -> Use: `var(--spacing-x3)`
- **Line 147** [spacing]: `8px` -> Use: `var(--spacing-x2)`

---

### src/components/templates/Blocks/Blocks.tsx

#### Hardcoded PX Values (53)

- **Line 950** [other]: `1px` - Review if this should use a design token
- **Line 971** [other]: `1px` - Review if this should use a design token
- **Line 2128** [other]: `1px` - Review if this should use a design token
- **Line 2246** [other]: `1px` - Review if this should use a design token
- **Line 2296** [other]: `1px` - Review if this should use a design token
- **Line 2360** [other]: `1px` - Review if this should use a design token
- **Line 2418** [other]: `1px` - Review if this should use a design token
- **Line 2458** [other]: `1px` - Review if this should use a design token
- **Line 2608** [other]: `1px` - Review if this should use a design token
- **Line 2640** [other]: `1px` - Review if this should use a design token
- **Line 2652** [other]: `1px` - Review if this should use a design token
- **Line 2675** [other]: `1px` - Review if this should use a design token
- **Line 2701** [other]: `1px` - Review if this should use a design token
- **Line 2712** [other]: `1px` - Review if this should use a design token
- **Line 2742** [other]: `1px` - Review if this should use a design token
- **Line 2823** [other]: `1px` - Review if this should use a design token
- **Line 2853** [other]: `1px` - Review if this should use a design token
- **Line 2895** [other]: `1px` - Review if this should use a design token
- **Line 2971** [other]: `1px` - Review if this should use a design token
- **Line 3007** [other]: `1px` - Review if this should use a design token
- **Line 3034** [other]: `1px` - Review if this should use a design token
- **Line 3068** [other]: `1px` - Review if this should use a design token
- **Line 3086** [other]: `1px` - Review if this should use a design token
- **Line 3117** [other]: `1px` - Review if this should use a design token
- **Line 3143** [other]: `1px` - Review if this should use a design token
- **Line 3209** [other]: `1px` - Review if this should use a design token
- **Line 3258** [other]: `1px` - Review if this should use a design token
- **Line 3283** [other]: `1px` - Review if this should use a design token
- **Line 3284** [other]: `1px` - Review if this should use a design token
- **Line 3328** [other]: `1px` - Review if this should use a design token
- **Line 3365** [other]: `1px` - Review if this should use a design token
- **Line 3392** [other]: `1px` - Review if this should use a design token
- **Line 3402** [other]: `1px` - Review if this should use a design token
- **Line 3424** [other]: `1px` - Review if this should use a design token
- **Line 3446** [other]: `1px` - Review if this should use a design token
- **Line 3469** [other]: `1px` - Review if this should use a design token
- **Line 3491** [other]: `1px` - Review if this should use a design token
- **Line 3532** [other]: `1px` - Review if this should use a design token
- **Line 3559** [other]: `1px` - Review if this should use a design token
- **Line 3591** [other]: `1px` - Review if this should use a design token
- **Line 3686** [other]: `1px` - Review if this should use a design token
- **Line 3697** [other]: `1px` - Review if this should use a design token
- **Line 3714** [other]: `1px` - Review if this should use a design token
- **Line 3813** [other]: `1px` - Review if this should use a design token
- **Line 3845** [other]: `1px` - Review if this should use a design token
- **Line 3876** [other]: `1px` - Review if this should use a design token
- **Line 3913** [other]: `1px` - Review if this should use a design token
- **Line 3932** [other]: `1px` - Review if this should use a design token
- **Line 3986** [other]: `1px` - Review if this should use a design token
- **Line 4008** [other]: `1px` - Review if this should use a design token
- **Line 4049** [other]: `1px` - Review if this should use a design token
- **Line 4063** [other]: `1px` - Review if this should use a design token
- **Line 4083** [other]: `1px` - Review if this should use a design token

---

### src/components/templates/ListingLayout/ListingLayout.tsx

#### Hardcoded RGBA Colors (1)

- **Line 98**: `rgba(15,23,42,0.08)` - Consider using design token with opacity

---

