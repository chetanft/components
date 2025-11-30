# Missing Components from FT Design System

This document lists all components that are available in **shadcn/ui** and **Ant Design** but are **missing** from the FT Design System.

---

## 🔴 Critical Missing Components (High Priority)

### Feedback & Confirmation
1. **Popconfirm** - Confirmation popover

### Data Display & Content Presentation
2. **List** - List component with multiple layouts
3. **Descriptions** - Description/summary list
4. **QRCode** - QR code generator and renderer
5. **Hover Card** - Hover-triggered detail card

### Command & Navigation Surfaces
6. **Command Palette** - Spotlight-style command launcher
7. **Context Menu** - Right-click contextual actions
8. **Menubar** - Horizontal application menu bar
9. **Sheet** - Overlay sheet/docked panel
10. **Scroll Area** - Custom scrollable container

### Form Controls
11. **Toggle** - Toggle button component
12. **Toggle Group** - Segmented toggle set

---

## 🟡 Nice-to-Have Components (Medium Priority)

### Form Controls
1. **Input OTP** - One-time password input (shadcn)
2. **AutoComplete** - Autocomplete input (Ant Design)

### Layout & Display
3. **Aspect Ratio** - Aspect ratio container (shadcn)
4. **Resizable** - Resizable panels (shadcn)

### Charts
5. **Heatmap** - Heatmap chart (Ant Design)
6. **Funnel** - Funnel chart (Ant Design)

---

## 📊 Summary

### By Priority
- **Critical Missing**: 12 components
- **Nice-to-Have**: 6 components
- **Total Missing**: 18 components

### By Category
- **Form Controls**: 4 missing (2 critical, 2 nice-to-have)
- **Feedback Components**: 1 missing (critical)
- **Navigation & Command Surfaces**: 4 missing (all critical)
- **Data Display & Content**: 4 missing (all critical)
- **Layout Utilities**: 3 missing (1 critical, 2 nice-to-have)
- **Charts**: 2 missing (all nice-to-have)

---

## 🎯 Recommended Implementation Priority

### Phase 1: Confirmation & Data Surfaces (Q1)
Establish parity for core flows that rely on confirmations and structured content.

1. **Popconfirm** – Reuse Modal/Tooltip primitives, add two-button confirmation API, and wire tokens for status states.
2. **List** – Build flexible list wrapper with grid, vertical, and virtualized modes plus empty state slot.
3. **Descriptions** – Compose responsive label/value pairs with support for bordered layout and custom spans.
4. **QRCode** – Leverage lightweight QR encoder library, expose size/error-correction props, and add download hook.
5. **Hover Card** – Extend Tooltip trigger logic with focus/hover delays, include heading, description, and CTA slots.

### Phase 2: Command Surfaces & Toggles (Q2)
Unlock productivity patterns and navigation affordances.

6. **Command Palette** – Backed by Combobox primitives; support fuzzy search, sections, keyboard shortcuts, and async results.
7. **Context Menu** – Wrap DropdownMenu foundation with right-click trigger, nested menu support, and disabled item states.
8. **Menubar** – Provide desktop-style horizontal menus with keyboard navigation and submenu alignment controls.
9. **Sheet** – Reuse Drawer/Motion system for left/right/bottom docking plus focus trapping and overlay stacking.
10. **Scroll Area** – Create accessible scroll containers with custom scrollbars, sticky headers, and auto-resize observers.
11. **Toggle** – Lightweight pressed-state button with ARIA pressed semantics and semantic color tokens.
12. **Toggle Group** – Compose Toggles into single/multi-select groups with roving tabindex and controlled/uncontrolled APIs.

### Phase 3: Advanced Layout & Visualization (Q3)
Cover specialized use cases and data storytelling.

13. **Input OTP** – Multi-field PIN input with auto-advance, paste handling, and digit masking.
14. **AutoComplete** – Async-ready Combobox with filtering, loading indicators, and custom option rendering.
15. **Aspect Ratio** – Utility wrapper enforcing ratios for media and cards, responsive breakpoint overrides.
16. **Resizable** – Panel splitter with keyboard resizing, collision detection, and persistence hooks.
17. **Heatmap** – Chart.js plugin layer or custom canvas to visualize matrix data with legends and tooltips.
18. **Funnel** – SVG/canvas funnel chart with percentage calculations, step annotations, and comparison mode.

---

## 📝 Notes

- Components marked with **(shadcn)** are primarily available in shadcn/ui
- Components marked with **(Ant Design)** are primarily available in Ant Design
- Components without marks are available in both libraries
- This list is based on comparison with shadcn/ui and Ant Design 5.x as of 2024
