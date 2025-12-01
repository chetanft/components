# FT Design System - For Designers

A comprehensive guide for designers creating components for the FT Design System. Follow these guidelines to ensure your designs are implementable, maintainable, and consistent.

---

## 🎨 Design Tokens

All component designs must use **design tokens** instead of hardcoded values.

### Color Tokens

#### Semantic Colors
Use semantic color names, not specific hex values:

✅ **DO**
- Text: `primary`, `secondary`, `tertiary`
- Backgrounds: `bg-primary`, `bg-secondary`
- Borders: `border-primary`, `border-secondary`

❌ **DON'T**
- Hardcode: `#434f64`, `#ffffff`, `#ced1d7`

#### Color Scales
For specific shades, use numbered scales (100-900):
- `primary-500`, `danger-700`, `neutral-300`
- Available families: primary, secondary, tertiary, neutral, positive, warning, danger

#### Status Colors
- Success: `positive` or `positive-500`
- Warning: `warning` or `warning-500`
- Error: `danger` or `critical`
- Info: `neutral` or `neutral-500`

---

## 📏 Component Sizing

### Standard Size Scale

Components must use the **standard 7-size scale**:

| Size | Height | Use Case |
|------|--------|----------|
| `xxs` | 16px | Compact UI, dense tables |
| `xs` | 24px | Small buttons, tight spaces |
| `sm` | 32px | Secondary actions |
| `md` | 40px | **Default** - Primary actions |
| `lg` | 48px | Prominent CTAs |
| `xl` | 56px | Hero sections |
| `xxl` | 64px | Extra large displays |

✅ **DO**: Design with md (40px) as default
❌ **DON'T**: Create custom sizes like 35px or 42px

### Prop Naming

When specifying size variants:

✅ **DO**
```
size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
```

❌ **DON'T**
```
size?: 'small' | 'default' | 'large'
size?: 'tiny' | 'normal' | 'big'
```

---

## 📱 Responsive Breakpoints

Design for these standard breakpoints:

```
xs: 0px      (mobile)
sm: 640px    (large mobile)
md: 768px    (tablet)
lg: 1024px   (laptop)
xl: 1280px   (desktop)
2xl: 1536px  (large desktop)
```

### Responsive Design Checklist

- [ ] Component works on mobile (320px width)
- [ ] Layout adapts at tablet breakpoint (768px)
- [ ] Desktop version optimized (1280px+)
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Text remains readable at all sizes

---

## 🎯 Variant Naming Standards

Use **standardized variant names** based on component type:

### Interactive Components (Button, Link)
```
variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'outline' | 'ghost' | 'link'
```

✅ **DO**: `variant="primary"`, `variant="destructive"`
❌ **DON'T**: `variant="red"`, `variant="filled"`

### Status Components (Badge, Alert, Tag)
```
variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
```

✅ **DO**: `variant="error"`, `variant="success"`
❌ **DON'T**: `variant="danger"`, `variant="normal"` (deprecated)

### Container Components (Card, Panel)
```
variant?: 'default' | 'bordered' | 'elevated' | 'outlined'
```

---

## 📐 Spacing System

Use the **8-point grid system**:

| Token | Value | Use Case |
|-------|-------|----------|
| `x0` | 0px | No spacing |
| `x1` | 4px | Tight spacing |
| `x2` | 8px | Small gaps |
| `x3` | 12px | Medium gaps |
| `x4` | 16px | **Default** padding |
| `x5` | 20px | Large gaps |
| `x6` | 24px | Section spacing |
| `x8` | 32px | Major sections |
| `x12` | 48px | Page sections |

✅ **DO**: Use increments of 4px (8-point grid)
❌ **DON'T**: Use arbitrary values like 13px, 17px, 21px

### Padding Recommendations
- **Small components**: `x2` (8px) or `x3` (12px)
- **Medium components**: `x4` (16px)
- **Large components**: `x6` (24px)

---

## 🔤 Typography

### Font Sizes

| Size | Value | Use Case |
|------|-------|----------|
| `xs` | 12px | Captions, metadata |
| `sm` | 14px | Body text, descriptions |
| `md` | 16px | **Default** body |
| `lg` | 20px | Subheadings |
| `xl` | 24px | Headings |
| `xxl` | 28px | Large headings |

### Font Weights
- `regular`: 400 (body text)
- `medium`: 500 (emphasis)
- `semibold`: 600 (subheadings)
- `bold`: 700 (headings)

✅ **DO**: Use semantic font sizes
❌ **DON'T**: Specify exact pixel values in designs

---

## 🎭 State Variants

Design these interaction states for all interactive components:

### Required States
1. **Default**: Normal, non-interactive state
2. **Hover**: Mouse over (subtle background change)
3. **Focus**: Keyboard focus (prominent ring)
4. **Active**: Mouse down / pressed
5. **Disabled**: Non-interactive (reduced opacity)

### Optional States
6. **Loading**: Show spinner or skeleton
7. **Error**: Form validation errors
8. **Success**: Successful completion

---

## 🎨 Border Radius

Use standard radius tokens:

| Token | Value | Use Case |
|-------|-------|----------|
| `sm` | 4px | Small elements |
| `md` | 8px | **Default** |
| `lg` | 12px | Cards, modals |
| `xl` | 16px | Large containers |
| `pill` | 9999px | Pill-shaped buttons |
| `full` | 9999px | Circles, avatars |

---

## 🌗 Shadow / Elevation

Design with elevation levels:

| Level | Use Case |
|-------|----------|
| `shadow-sm` | Cards, panels (subtle) |
| `shadow-md` | Dropdowns, popovers |
| `shadow-lg` | Modals, dialogs (default) |
| `shadow-xl` | Full-screen overlays |

**Important**: Shadows should be subtle. Avoid heavy drop shadows.

---

## ♿ Accessibility Requirements

### Color Contrast
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18px+): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 for boundaries

**Tool**: Use WebAIM Contrast Checker

### Touch Targets
- **Minimum size**: 44x44px on mobile
- **Ideal size**: 48x48px
- **Spacing**: 8px between targets

### Focus Indicators
- **Always visible** on keyboard focus
- **3px ring** minimum thickness
- **High contrast** against background

---

## 📋 Component Design Checklist

Before handing off designs to developers:

### Structure
- [ ] Uses design tokens (no hardcoded values)
- [ ] Follows standard size scale (xxs-xxl)
- [ ] Respects 8-point grid spacing
- [ ] Includes all interaction states

### Variants
- [ ] Uses standardized variant names
- [ ] Clearly labeled in Figma
- [ ] Documented behavior for each variant

### Responsive
- [ ] Mobile (320px) version designed
- [ ] Tablet (768px) breakpoint considered
- [ ] Desktop (1280px+) optimized

### Accessibility
- [ ] Color contrast verified (4.5:1 minimum)
- [ ] Touch targets 44x44px minimum
- [ ] Focus states clearly visible
- [ ] Labels and descriptions provided

### Documentation
- [ ] Component purpose documented
- [ ] Prop values specified
- [ ] Edge cases addressed
- [ ] Example usage shown

---

## 🚫 Common Mistakes to Avoid

### ❌ Don't Do This

1. **Custom Sizes**: Creating 35px, 42px, or other non-standard sizes
2. **Hardcoded Colors**: Using `#ff0000` instead of `danger`
3. **Random Spacing**: Using 13px, 17px instead of 8-point grid
4. **Inconsistent Naming**: `variant="big"` instead of `size="lg"`
5. **Missing States**: Only designing default state, forgetting hover/focus
6. **Low Contrast**: Text with 3:1 contrast ratio
7. **Tiny Touch Targets**: Buttons smaller than 44x44px on mobile

### ✅ Do This Instead

1. Use standard size scale (md = 40px)
2. Use color tokens (`danger`, `primary-500`)
3. Stick to 8-point grid (8px, 16px, 24px)
4. Follow naming standards (`size="lg"`)
5. Design all states (default, hover, focus, disabled)
6. Ensure 4.5:1 contrast minimum
7. Make touch targets 44x44px minimum

---

## 🔗 Resources

### Design Tools
- **Figma**: FT Design System library
- **Contrast Checker**: WebAIM Contrast Checker
- **Spacing**: 8-Point Grid Plugin

### Documentation
- [Tailwind Integration Guide](./tailwind-integration.md)
- [Prop Conventions](./standards/prop-conventions.md)
- [Color Guidelines](./COLOR_USAGE_GUIDELINES.md)

### Examples
- **Well-designed**: Modal, Button, Badge (follow these patterns)
- **Migration guides**: See `/docs/migrations/` for API examples

---

## 💡 Pro Tips

1. **Start with tokens**: Build from the design system, don't create new values
2. **Think responsive**: Design mobile-first, scale up
3. **Document everything**: Future developers will thank you
4. **Test accessibility**: Run contrast checks early
5. **Follow patterns**: Consistency is better than creativity
6. **Ask questions**: Unclear on a token? Ask the dev team!

---

## Need Help?

- **Token questions**: Check design system documentation
- **Variant naming**: See implementation plan
- **Technical constraints**: Consult with development team
- **Accessibility**: Review WCAG 2.1 AA guidelines
