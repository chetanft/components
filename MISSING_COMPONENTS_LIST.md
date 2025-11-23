# Missing Components from FT Design System

This document lists all components that are available in **shadcn/ui** and **Ant Design** but are **missing** from the FT Design System.

---

## 🔴 Critical Missing Components (High Priority)

### Form Controls
1. **Textarea** - Multi-line text input component
2. **TimePicker** - Time selection component
3. **InputNumber** - Numeric input with increment/decrement controls
4. **Slider** - Range slider input component
5. **Rate** - Star rating component
6. **ColorPicker** - Color selection component

### Feedback Components
7. **Alert** - Alert/notification banners
8. **Message** - Inline message component
9. **Notification** - Toast notification system
10. **Modal/Dialog** - Modal dialog component
11. **Drawer** - Side drawer/panel component
12. **Popconfirm** - Confirmation popover
13. **Skeleton** - Loading skeleton screens
14. **Spin** - Loading spinner component

### Navigation
15. **Breadcrumb** - Breadcrumb navigation component
16. **Pagination** - Pagination controls
17. **Anchor** - Anchor links for long pages
18. **BackTop** - Back to top button

### Data Display
19. **List** - List component with various layouts
20. **Descriptions** - Description list component
21. **Empty** - Empty state component
22. **Timeline** - Timeline component
23. **Tree** - Tree view component
24. **Image** - Image component with preview
25. **QRCode** - QR code generator component
26. **Watermark** - Watermark component

### Media
27. **Carousel** - Image/content carousel component

### Other Components
28. **Command Palette** - Command palette/search component
29. **Context Menu** - Right-click context menu
30. **Hover Card** - Hover card component
31. **Menubar** - Menu bar component
32. **Sheet** - Side sheet component
33. **Toggle** - Toggle button component
34. **Toggle Group** - Toggle button group
35. **Scroll Area** - Custom scroll area component
36. **FloatButton** - Floating action button
37. **Tour** - User onboarding tour component

---

## 🟡 Nice-to-Have Components (Medium Priority)

### Form Controls
1. **Input OTP** - One-time password input (shadcn)
2. **Cascader** - Cascading select component (Ant Design)
3. **Mentions** - @mention input component (Ant Design)
4. **AutoComplete** - Autocomplete input (Ant Design)
5. **TreeSelect** - Tree select component (Ant Design)
6. **Transfer** - Transfer list component (Ant Design)

### Layout & Display
7. **Aspect Ratio** - Aspect ratio container (shadcn)
8. **Resizable** - Resizable panels (shadcn)
9. **Grid** - Grid layout system (Ant Design)
10. **Affix** - Affix/sticky component (Ant Design)
11. **PageHeader** - Page header component (Ant Design)
12. **Result** - Result page component (Ant Design)

### Charts
13. **AreaChart** - Area chart variant
14. **Heatmap** - Heatmap chart (Ant Design)
15. **Gauge** - Gauge chart (Ant Design)
16. **Funnel** - Funnel chart (Ant Design)
17. **Waterfall** - Waterfall chart (Ant Design)

---

## 📊 Summary

### By Priority
- **Critical Missing**: 37 components
- **Nice-to-Have**: 17 components
- **Total Missing**: 54 components

### By Category
- **Form Controls**: 12 missing (6 critical, 6 nice-to-have)
- **Feedback Components**: 8 missing (all critical)
- **Navigation**: 4 missing (all critical)
- **Data Display**: 8 missing (7 critical, 1 nice-to-have)
- **Media**: 1 missing (critical)
- **Layout**: 3 missing (all nice-to-have)
- **Charts**: 5 missing (all nice-to-have)
- **Other**: 13 missing (12 critical, 1 nice-to-have)

---

## 🎯 Recommended Implementation Priority

### Phase 1: Critical Components (Q1)
Focus on components that are essential for most applications:

1. Modal/Dialog
2. Alert
3. Notification/Toast
4. Textarea
5. Breadcrumb
6. Pagination
7. Drawer
8. Skeleton

### Phase 2: Important Components (Q2)
Components that enhance user experience:

9. Empty
10. Slider
11. Carousel
12. List
13. TimePicker
14. InputNumber

### Phase 3: Enhanced Features (Q3)
Advanced components for specialized use cases:

15. Rate
16. Timeline
17. Tree
18. Image (with preview)
19. ColorPicker
20. Command Palette

---

## 📝 Notes

- Components marked with **(shadcn)** are primarily available in shadcn/ui
- Components marked with **(Ant Design)** are primarily available in Ant Design
- Components without marks are available in both libraries
- This list is based on comparison with shadcn/ui and Ant Design 5.x as of 2024

