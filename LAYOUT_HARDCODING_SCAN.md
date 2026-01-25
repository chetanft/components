# Layout Hardcoding Scan

This scan flags inline layout literals and px-based Tailwind arbitrary values in component source.

## Summary

- **inline_width_px**: 7
- **inline_height_px**: 2
- **inline_max_width_px**: 0
- **inline_min_width_px**: 0
- **inline_max_height_px**: 0
- **inline_min_height_px**: 1
- **tw_width_px**: 145
- **tw_height_px**: 113
- **tw_gap_px**: 81
- **tw_padding_px**: 124
- **tw_margin_px**: 14

## Top Hits (sample)

### inline_width_px

- `ft-docs/src/app/docs/global-css/page.tsx:223` --component-border-width: 2px;
- `src/components/molecules/FilterSearch/FilterSearch.tsx:57` const isMobile = useMediaQuery('(max-width: 1199px)');
- `src/components/molecules/FilterDropdown/FilterDropdown.tsx:79` const isMobile = useMediaQuery('(max-width: 1199px)');
- `src/components/molecules/FilterDateRange/FilterDateRange.tsx:74` const isMobile = useMediaQuery('(max-width: 1199px)');
- `src/components/atoms/Icons/Tracker.test.tsx:14` expect(iconWrapper).toHaveStyle('width: 24px');
- `src/components/organisms/Drawer/GridDrawer.tsx:111` @media (max-width: 1440px) {
- `src/components/organisms/Drawer/GridDrawer.tsx:118` @media (max-width: 768px) {

### inline_height_px

- `src/components/atoms/Icons/Tracker.test.tsx:15` expect(iconWrapper).toHaveStyle('height: 24px');
- `src/components/organisms/Table/TableHeaderItem.tsx:107` // Base styles from Figma - Responsive height: 40px default, 48px for >= 1440px

### inline_min_height_px

- `ft-docs/src/components/variant-explorer.tsx:188` minHeight: "600px",

### tw_width_px

- `ft-docs/src/app/page.tsx:43` <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-20 bg-gradient-to-tr blur-[100px] -z-10 rounded-full pointer-events-none" style={{ background: 'linear-gradient(to top right, var(--primary), var(--tertiary))' }} />
- `ft-docs/src/components/site-header.tsx:287` <div className="absolute top-full right-0 mt-1 bg-background border border-border rounded-md shadow-lg max-h-96 overflow-y-auto z-[9999] w-full min-w-[300px]">
- `ft-docs/src/components/site-header.tsx:310` <div className="absolute top-full right-0 mt-1 bg-background border border-border rounded-md shadow-lg p-4 z-[9999] w-full min-w-[300px]">
- `ft-docs/src/components/props-table.tsx:143` <code className="text-xs bg-muted/50 px-1.5 py-0.5 rounded font-mono text-muted-foreground break-all max-w-[200px] inline-block">
- `src/components/molecules/TreeSelect/TreeSelect.tsx:397` isMultiple && selectedKeys.length > 0 ? "flex-1 min-w-[120px]" : "w-full"
- `src/components/molecules/Calendar/Calendar.tsx:70` const COMPACT_NAV_BUTTON_CLASS = "min-w-[30px] min-h-[30px] w-fit h-fit flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--tertiary)] hover:bg-[var(--border-secondary)] transition-colors focus:outline-none";
- `src/components/molecules/Calendar/Calendar.tsx:371` className="w-[30px] h-[30px] flex-shrink-0 flex flex-col items-center justify-center p-[var(--spacing-x2)] text-[var(--tertiary)] font-normal"
- `src/components/molecules/Calendar/Calendar.tsx:394` "w-[30px] h-[30px] flex-shrink-0 flex items-center justify-center p-[var(--spacing-x2)] rounded-[var(--radius-sm)] transition-colors",
- `src/components/molecules/Empty/Empty.stories.tsx:164` className="w-[236px] flex-shrink-0"
- `src/components/molecules/Empty/Empty.stories.tsx:179` className="w-[191px] flex-shrink-0"
- `src/components/molecules/Empty/Empty.tsx:217` className="text-[var(--tertiary)] max-w-[256px]"
- `src/components/molecules/Popconfirm/PopconfirmContent.tsx:72` "absolute z-50 min-w-[200px] max-w-[300px]",
- `src/components/molecules/Popconfirm/PopconfirmContent.tsx:72` "absolute z-50 min-w-[200px] max-w-[300px]",
- `src/components/molecules/DatePicker/Calendar.tsx:115` "w-[30px] h-[30px] flex-shrink-0 flex flex-col items-center justify-center p-[var(--spacing-x2)] rounded-[var(--radius-sm)] transition-colors",
- `src/components/molecules/DatePicker/Calendar.tsx:144` true: "w-[170px] h-[331px]",
- `src/components/molecules/DatePicker/Calendar.tsx:418` <div className={cn("flex-1 flex flex-col gap-[var(--spacing-x2)]", range ? "w-[282px] flex-shrink-0" : "w-full")}>
- `src/components/molecules/DatePicker/Calendar.tsx:509` <div key={day} className="w-[30px] h-[30px] flex-shrink-0 flex flex-col items-center justify-center p-[var(--spacing-x2)] text-sm-rem text-[var(--tertiary)] font-normal">
- `src/components/molecules/DatePicker/Calendar.tsx:521` return <div key={`${weekIndex}-${dayIndex}`} className="w-[30px] h-[30px] flex-shrink-0" />;
- `src/components/molecules/DatePicker/Calendar.tsx:623` <div className="relative w-[240px]">
- `src/components/molecules/Transfer/Transfer.tsx:121` <div className="flex flex-col border border-[var(--border-primary)] rounded-md w-[250px] h-[300px] overflow-hidden bg-[var(--color-bg-primary)]">

### tw_height_px

- `ft-docs/src/app/page.tsx:43` <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-20 bg-gradient-to-tr blur-[100px] -z-10 rounded-full pointer-events-none" style={{ background: 'linear-gradient(to top right, var(--primary), var(--tertiary))' }} />
- `ft-docs/src/app/docs/ai-prompts/page.tsx:228` className="p-4 overflow-x-auto font-mono max-h-[500px] overflow-y-auto"
- `ft-docs/src/app/docs/global-css/page.tsx:780` className="p-4 overflow-x-auto font-mono max-h-[600px] overflow-y-auto"
- `ft-docs/src/app/icons/page.tsx:544` <div className="space-y-1 max-h-[400px] overflow-y-auto">
- `ft-docs/src/app/icons/page.tsx:574` <div className="space-y-1 max-h-[400px] overflow-y-auto">
- `ft-docs/src/components/component-preview.tsx:242` <div className="p-10 min-h-[350px] flex items-center justify-center bg-background">
- `src/components/molecules/TreeSelect/TreeSelect.tsx:442` "max-h-[300px] overflow-auto p-[var(--spacing-x2)]"
- `src/components/molecules/Calendar/Calendar.stories.tsx:76` <div className="h-[600px]">
- `src/components/molecules/Calendar/Calendar.stories.tsx:192` <div className="h-[500px]">
- `src/components/molecules/Calendar/Calendar.tsx:70` const COMPACT_NAV_BUTTON_CLASS = "min-w-[30px] min-h-[30px] w-fit h-fit flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--tertiary)] hover:bg-[var(--border-secondary)] transition-colors focus:outline-none";
- `src/components/molecules/Calendar/Calendar.tsx:371` className="w-[30px] h-[30px] flex-shrink-0 flex flex-col items-center justify-center p-[var(--spacing-x2)] text-[var(--tertiary)] font-normal"
- `src/components/molecules/Calendar/Calendar.tsx:394` "w-[30px] h-[30px] flex-shrink-0 flex items-center justify-center p-[var(--spacing-x2)] rounded-[var(--radius-sm)] transition-colors",
- `src/components/molecules/RadioSelector/RadioSelector.tsx:166` : "flex flex-col items-center justify-center p-[var(--spacing-x3)] min-h-[109px]",
- `src/components/molecules/RadioSelector/RadioSelector.tsx:303` : "flex flex-col items-center justify-center p-[var(--spacing-x3)] min-h-[109px]",
- `src/components/molecules/DatePicker/Calendar.tsx:115` "w-[30px] h-[30px] flex-shrink-0 flex flex-col items-center justify-center p-[var(--spacing-x2)] rounded-[var(--radius-sm)] transition-colors",
- `src/components/molecules/DatePicker/Calendar.tsx:144` true: "w-[170px] h-[331px]",
- `src/components/molecules/DatePicker/Calendar.tsx:509` <div key={day} className="w-[30px] h-[30px] flex-shrink-0 flex flex-col items-center justify-center p-[var(--spacing-x2)] text-sm-rem text-[var(--tertiary)] font-normal">
- `src/components/molecules/DatePicker/Calendar.tsx:521` return <div key={`${weekIndex}-${dayIndex}`} className="w-[30px] h-[30px] flex-shrink-0" />;
- `src/components/molecules/Transfer/Transfer.tsx:121` <div className="flex flex-col border border-[var(--border-primary)] rounded-md w-[250px] h-[300px] overflow-hidden bg-[var(--color-bg-primary)]">
- `src/components/molecules/Slider/Slider.stories.tsx:162` className: 'h-[200px]',

### tw_gap_px

- `src/components/molecules/ProgressList/ProgressList.tsx:181` <div key={item.id} className="flex justify-between items-center gap-[-36px] py-[var(--spacing-x4)] w-full">
- `src/components/molecules/ProgressList/ProgressList.tsx:618` <div ref={ref} className={cn("flex justify-between items-center gap-[-36px] py-[var(--spacing-x4)] w-full", className)} {...props}>
- `src/components/molecules/Chicklet/Chicklet.tsx:64` "inline-flex items-center justify-center gap-[8px]",
- `src/components/atoms/RadioGroup/RadioItem.tsx:54` sm: { gap: "gap-[6px]", groupGap: "gap-[12px]" },
- `src/components/atoms/RadioGroup/RadioItem.tsx:54` sm: { gap: "gap-[6px]", groupGap: "gap-[12px]" },
- `src/components/atoms/RadioGroup/RadioItem.tsx:55` md: { gap: "gap-[var(--radio-gap)]", groupGap: "gap-[16px]" }
- `src/components/atoms/RadioGroup/RadioGroup.tsx:248` gap: "gap-[6px]",
- `src/components/atoms/RadioGroup/RadioGroup.tsx:250` groupGap: "gap-[12px]"
- `src/components/atoms/RadioGroup/RadioGroup.tsx:257` groupGap: "gap-[16px]"
- `src/components/atoms/ReadOnly/ReadOnly.tsx:52` "content-stretch flex gap-[8px] items-center relative w-[82px]",
- `src/components/atoms/ReadOnly/ReadOnly.tsx:76` "content-stretch flex gap-[8px] items-center relative w-[102px]",
- `src/components/atoms/ReadOnly/ReadOnly.tsx:110` <div className="box-border content-stretch flex gap-[10px] items-center pb-0 pt-[2px] px-0 relative shrink-0">
- `src/components/atoms/Switch/SwitchInput.tsx:58` gap: "gap-[6px]",
- `src/components/atoms/Switch/SwitchInput.tsx:63` gap: "gap-[8px]",
- `src/components/atoms/SubText/SubText.tsx:26` "content-stretch flex gap-[8px] items-center relative size-full",
- `src/components/atoms/SubText/SubText.tsx:48` "content-stretch flex gap-[10px] items-center justify-center relative size-full",
- `src/components/atoms/Statistic/StatisticTitle.tsx:41` className={cn("content-stretch flex gap-[4px] items-center justify-start relative shrink-0", className)}
- `src/components/atoms/Statistic/StatisticValue.tsx:41` className={cn("content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[57px]", className)}
- `src/components/atoms/Statistic/Statistic.tsx:75` "content-stretch flex flex-col gap-[8px] items-start justify-center relative size-full",
- `src/components/organisms/Tabs/Tabs.tsx:116` "relative flex flex-col gap-[10px] items-start transition-all cursor-pointer flex-shrink-0",

### tw_padding_px

- `src/components/molecules/DatePicker/DatePicker.tsx:371` xxs: "py-[2px]",
- `src/components/molecules/DatePicker/DatePicker.tsx:1006` "inline-block w-auto pr-[12px]"
- `src/components/molecules/DatePicker/DatePicker.tsx:1028` "inline-block w-auto pr-[12px]"
- `src/components/molecules/DatePicker/DatePickerInput.tsx:209` type === 'single' ? "flex-1" : "inline-block w-auto pr-[12px]",
- `src/components/molecules/DatePicker/DatePickerInput.tsx:237` type === 'single' ? "flex-1" : "inline-block w-auto pr-[12px]",
- `src/components/molecules/ProgressList/ProgressList.tsx:181` <div key={item.id} className="flex justify-between items-center gap-[-36px] py-[var(--spacing-x4)] w-full">
- `src/components/molecules/ProgressList/ProgressList.tsx:618` <div ref={ref} className={cn("flex justify-between items-center gap-[-36px] py-[var(--spacing-x4)] w-full", className)} {...props}>
- `src/components/molecules/Chicklet/Chicklet.tsx:64` "inline-flex items-center justify-center gap-[8px]",
- `src/components/molecules/Chicklet/Chicklet.tsx:66` "px-[8px] py-[2px]",
- `src/components/molecules/Chicklet/Chicklet.tsx:66` "px-[8px] py-[2px]",
- `src/components/atoms/RadioGroup/RadioItem.tsx:54` sm: { gap: "gap-[6px]", groupGap: "gap-[12px]" },
- `src/components/atoms/RadioGroup/RadioItem.tsx:54` sm: { gap: "gap-[6px]", groupGap: "gap-[12px]" },
- `src/components/atoms/RadioGroup/RadioItem.tsx:55` md: { gap: "gap-[var(--radio-gap)]", groupGap: "gap-[16px]" }
- `src/components/atoms/RadioGroup/RadioGroup.tsx:248` gap: "gap-[6px]",
- `src/components/atoms/RadioGroup/RadioGroup.tsx:250` groupGap: "gap-[12px]"
- `src/components/atoms/RadioGroup/RadioGroup.tsx:257` groupGap: "gap-[16px]"
- `src/components/atoms/ReadOnly/ReadOnly.tsx:52` "content-stretch flex gap-[8px] items-center relative w-[82px]",
- `src/components/atoms/ReadOnly/ReadOnly.tsx:76` "content-stretch flex gap-[8px] items-center relative w-[102px]",
- `src/components/atoms/ReadOnly/ReadOnly.tsx:110` <div className="box-border content-stretch flex gap-[10px] items-center pb-0 pt-[2px] px-0 relative shrink-0">
- `src/components/atoms/ReadOnly/ReadOnly.tsx:110` <div className="box-border content-stretch flex gap-[10px] items-center pb-0 pt-[2px] px-0 relative shrink-0">

### tw_margin_px

- `src/components/molecules/DropdownMenu/DropdownMenuItem.tsx:305` <div className="text-xs text-[var(--color-tertiary)] truncate mt-[2px]">
- `src/components/molecules/RadioSelector/RadioSelector.tsx:214` <div className="relative shrink-0 mt-[2px]">
- `src/components/molecules/RadioSelector/RadioSelector.tsx:352` <div className="relative shrink-0 mt-[2px]">
- `src/components/molecules/Anchor/Anchor.tsx:175` <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--border-primary)] opacity-50 ml-[1px]" />
- `src/components/molecules/ProgressList/ProgressList.tsx:455` <div className="flex-1 w-full flex flex-col items-center mb-[-8px]">
- `src/components/organisms/FileTypeIcon/FileTypeIcon.tsx:148` xxs: 'bottom-[2px]',
- `src/components/organisms/FileTypeIcon/FileTypeIcon.tsx:149` xs: 'bottom-[3px]',
- `src/components/organisms/FileTypeIcon/FileTypeIcon.tsx:150` sm: 'bottom-[4px]',
- `src/components/organisms/FileTypeIcon/FileTypeIcon.tsx:151` md: 'bottom-[6px]',
- `src/components/organisms/FileTypeIcon/FileTypeIcon.tsx:152` lg: 'bottom-[7px]',
- `src/components/organisms/FileTypeIcon/FileTypeIcon.tsx:153` xl: 'bottom-[8px]',
- `src/components/organisms/FileTypeIcon/FileTypeIcon.tsx:154` xxl: 'bottom-[10px]'
- `src/components/organisms/UserProfileDropdown/UserProfileDropdown.tsx:95` <div className="flex-[1_0_0] h-0 min-h-px min-w-px mr-[-36px] relative shrink-0">
- `src/components/organisms/UserProfileDropdown/UserProfileDropdown.tsx:126` <div className="flex-[1_0_0] h-0 min-h-px min-w-px mr-[-36px] relative shrink-0">
