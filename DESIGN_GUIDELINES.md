# FT Design System - Design Guidelines

## Overview

This document provides essential guidelines for designers creating components that integrate seamlessly with the FT Design System. Following these rules ensures visual consistency, proper sizing, and optimal developer experience.

## 🎯 Core Design Principles

### 1. Unified Component Sizing
All interactive components must follow our standardized size system:

| Size | Height | Font Size | Padding (H×V) | Icon Size | Border Radius |
|------|--------|-----------|---------------|-----------|---------------|
| **sm** | 36px | 14px | 12px × 8px | 16px | 6px |
| **md** | 44px | 16px | 16px × 12px | 20px | 8px |
| **lg** | 52px | 16px | 20px × 16px | 24px | 8px |
| **xl** | 64px | 16px | 24px × 20px | 28px | 12px |

**Default Size:** Medium (md) - 44px height

### 2. Visual Consistency Rules

#### ✅ DO:
- Use the exact heights specified above
- Maintain consistent padding ratios
- Apply uniform border radius within size categories
- Use standardized icon sizes
- Follow the color system hierarchy

#### ❌ DON'T:
- Create custom heights (38px, 42px, etc.)
- Mix different padding styles within the same size
- Use arbitrary border radius values
- Scale icons independently from component size

## 🎨 Color System

### Primary Colors
- **Primary:** #434f64 (Brand color)
- **Primary Dark:** #363f52
- **Primary Light:** #5a6b7d

### Semantic Colors
- **Success:** #10b981
- **Warning:** #f59e0b
- **Error:** #ef4444
- **Info:** #3b82f6

### Neutral Colors
- **Text Primary:** #1f2937
- **Text Secondary:** #6b7280
- **Text Muted:** #9ca3af
- **Border:** #d1d5db
- **Background:** #f9fafb

## 📐 Component Specifications

### Buttons
- **Heights:** 36px (sm), 44px (md), 52px (lg)
- **Font Weight:** Medium (500)
- **Border Radius:** 6px (sm), 8px (md/lg)
- **States:** Default, Hover, Active, Disabled, Loading

### Form Controls (Input, Dropdown, DatePicker)
- **Must match Button heights exactly**
- **Border:** 1px solid #d1d5db
- **Focus State:** 2px border with primary color
- **Placeholder:** Text muted color

### Icons
- **Sizes:** 16px (sm), 20px (md), 24px (lg), 28px (xl)
- **Stroke Width:** 1.5px for outline icons
- **Alignment:** Center-aligned within component

## 🔧 Technical Requirements

### Figma Design Specs

#### Component Variants
Create variants for each size:
```
Button/Primary/Medium
Button/Primary/Small  
Button/Primary/Large
Button/Secondary/Medium
Button/Secondary/Small
Button/Secondary/Large
```

#### Auto Layout Settings
- **Direction:** Horizontal
- **Spacing:** 8px (sm), 12px (md), 16px (lg)
- **Padding:** Follow the unified padding system
- **Alignment:** Center

#### Constraints
- **Horizontal:** Left & Right (for full-width components)
- **Vertical:** Top (for fixed height components)

### Component States
Design all interactive states:
1. **Default** - Normal appearance
2. **Hover** - Subtle background/border change
3. **Active/Pressed** - Darker appearance
4. **Focus** - Visible focus ring
5. **Disabled** - Reduced opacity (0.5)
6. **Loading** - With spinner/skeleton

## 📱 Responsive Considerations

### Breakpoints
- **Mobile:** < 768px (use sm/md sizes)
- **Tablet:** 768px - 1024px (use md/lg sizes)
- **Desktop:** > 1024px (use md/lg/xl sizes)

### Mobile-First Approach
- Start with smallest size (sm)
- Scale up for larger screens
- Maintain touch targets (minimum 44px)

## 🎯 Component-Specific Guidelines

### Buttons
- **Primary:** Use brand color (#434f64)
- **Secondary:** Outline with brand color
- **Destructive:** Use error color (#ef4444)
- **Ghost:** Transparent background, colored text

### Form Controls
- **Labels:** Always above the input, 14px font size
- **Error States:** Red border + error message below
- **Success States:** Green border (optional)
- **Required Fields:** Red asterisk (*) after label

### Data Display
- **Tables:** 44px row height minimum
- **Cards:** 8px border radius, consistent padding
- **Lists:** Match form control heights

## 🚀 Developer Handoff

### Figma Specifications
Include in your designs:
- **Exact pixel measurements**
- **Color hex codes**
- **Font sizes and weights**
- **Spacing values**
- **Border radius values**
- **Shadow specifications**

### Component Properties
Define clear properties:
```
size: 'sm' | 'md' | 'lg' | 'xl'
variant: 'primary' | 'secondary' | 'ghost'
state: 'default' | 'hover' | 'active' | 'disabled'
```

### Design Tokens
Use design tokens for:
- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Transitions

## ✅ Design Checklist

Before finalizing any component design:

### Visual Consistency
- [ ] Heights match the unified size system
- [ ] Padding follows the standardized ratios
- [ ] Colors use the defined palette
- [ ] Typography uses system fonts and sizes
- [ ] Icons are properly sized and aligned

### Functionality
- [ ] All interactive states are designed
- [ ] Focus states are clearly visible
- [ ] Error states are intuitive
- [ ] Loading states are smooth
- [ ] Disabled states are obvious

### Accessibility
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] Touch targets are minimum 44px
- [ ] Text is readable at all sizes
- [ ] Icons have proper alt text considerations

### Technical Readiness
- [ ] Components are properly named
- [ ] Variants are clearly organized
- [ ] Properties are well-defined
- [ ] Measurements are exact
- [ ] Handoff specs are complete

## 🔍 Common Mistakes to Avoid

### Size Inconsistencies
❌ **Wrong:** Button 40px, Input 36px, Dropdown 38px
✅ **Correct:** All components 44px (md size)

### Custom Measurements
❌ **Wrong:** 42px height, 15px padding, 7px border radius
✅ **Correct:** Use standardized measurements from the size system

### Color Deviations
❌ **Wrong:** #1890ff for primary actions
✅ **Correct:** #434f64 (brand primary color)

### Inconsistent States
❌ **Wrong:** Different hover effects across similar components
✅ **Correct:** Consistent state changes following the system

## 📚 Resources

### Design Files
- **Figma Component Library:** [Link to Figma file]
- **Design Tokens:** Available in design system documentation
- **Icon Library:** Standardized icon set with proper sizing

### Documentation
- **Component Specifications:** Detailed technical specs
- **Color Palette:** Complete color system with usage guidelines
- **Typography Scale:** Font sizes, weights, and line heights

### Tools
- **Figma Plugins:** Design system checker plugins
- **Color Contrast Checker:** Ensure accessibility compliance
- **Measurement Tools:** Verify exact specifications

## 🤝 Collaboration

### Design Reviews
- Present designs using the unified size system
- Highlight any deviations and justify them
- Ensure all team members understand the guidelines

### Developer Handoff
- Use consistent naming conventions
- Provide complete specifications
- Include interaction details
- Document any special requirements

### Feedback Loop
- Gather feedback on design system usage
- Iterate on guidelines based on real-world usage
- Update documentation regularly

---

## 📞 Support

For questions about these guidelines or the FT Design System:
- **Design Team:** [Contact information]
- **Development Team:** [Contact information]
- **Documentation:** [Link to full documentation]

**Remember:** These guidelines ensure that every component integrates seamlessly with the FT Design System, providing a consistent user experience and optimal developer workflow. 