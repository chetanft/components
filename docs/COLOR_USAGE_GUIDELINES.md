# 🎨 **Color Usage Guidelines**

## **FT Design System - Semantic Color Reference**

This guide provides clear direction on when and how to use each color in the FT Design System. All colors follow semantic naming for consistency and maintainability.

---

## 📋 **Quick Reference**

| **Color** | **Hex Value** | **CSS Variable** | **Tailwind Class** | **Purpose** |
|-----------|---------------|-------------------|---------------------|-------------|
| **Primary** | `#434f64` | `--primary` | `text-primary`, `bg-primary` | Main text, primary actions |
| **Secondary** | `#5f697b` | `--secondary` | `text-secondary`, `bg-secondary` | Secondary text, muted content |
| **Tertiary** | `#838c9d` | `--tertiary` | `text-tertiary`, `bg-tertiary` | Subtle text, disabled states |
| **Border/Primary** | `#ced1d7` | `--border-primary` | `border-border-primary` | Form borders, dividers |
| **Border/Secondary** | `#f0f1f7` | `--border-secondary` | `border-border-secondary` | Subtle separators |
| **BG/Primary** | `#ffffff` | `--bg-primary` | `bg-bg-primary` | Cards, surfaces |
| **BG/Secondary** | `#f8f8f9` | `--bg-secondary` | `bg-bg-secondary` | Page backgrounds |

---

## 🎯 **Color Roles & Usage**

### **Text Colors**

#### **Primary** - `#434f64`
- **Use for**: Main headings, body text, primary navigation
- **Examples**: Page titles, article content, button labels
- **Don't use for**: Error states, success messages
```css
color: var(--primary);
/* or */
class="text-primary"
```

#### **Secondary** - `#5f697b` 
- **Use for**: Supporting text, secondary information, subtitles
- **Examples**: Descriptions, metadata, secondary navigation
- **Don't use for**: Primary content, calls-to-action
```css
color: var(--secondary);
/* or */
class="text-secondary"
```

#### **Tertiary** - `#838c9d`
- **Use for**: Placeholder text, disabled states, fine print
- **Examples**: Input placeholders, inactive tabs, help text
- **Don't use for**: Important information, clickable elements
```css
color: var(--tertiary);
/* or */
class="text-tertiary"
```

### **Border Colors**

#### **Border/Primary** - `#ced1d7`
- **Use for**: Form elements, cards, defined boundaries
- **Examples**: Input borders, button outlines, table borders
- **Don't use for**: Subtle separators, page sections
```css
border-color: var(--border-primary);
/* or */
class="border-border-primary"
```

#### **Border/Secondary** - `#f0f1f7`
- **Use for**: Subtle dividers, section separators, list items
- **Examples**: HR elements, table row separators, sidebar dividers
- **Don't use for**: Interactive elements, form borders
```css
border-color: var(--border-secondary);
/* or */
class="border-border-secondary"
```

### **Background Colors**

#### **BG/Primary** - `#ffffff`
- **Use for**: Cards, modals, main content areas, surfaces
- **Examples**: Article cards, dialog boxes, form backgrounds
- **Don't use for**: Page backgrounds, subtle fills
```css
background-color: var(--bg-primary);
/* or */
class="bg-bg-primary"
```

#### **BG/Secondary** - `#f8f8f9`
- **Use for**: Page backgrounds, subtle highlights, disabled states
- **Examples**: Body background, inactive tabs, disabled buttons
- **Don't use for**: Content cards, important surfaces
```css
background-color: var(--bg-secondary);
/* or */
class="bg-bg-secondary"
```

---

## ⚡ **Status Colors** (Unchanged)

### **Critical** - Red Palette
- **Dark**: `#b80100` - Critical text on light backgrounds
- **Default**: `#ff3532` (`--danger-500`) - Error states, destructive actions, Alert danger variant text and icon
- **Light**: `#ffeafa` (`--danger-100`) - Error background, Alert danger variant background
- **Alert Danger Variant**: Uses `--danger-100` for background, `--danger-500` for border, text, and icon

### **Warning** - Orange Palette  
- **Dark**: `#dd6a00` - Warning text on light backgrounds
- **Default**: `#ff6c19` - Warning states, caution messages
- **Light**: `#ffebdc` - Warning background, caution alerts

### **Positive** - Green Palette
- **Dark**: `#00763d` - Success text on light backgrounds  
- **Default**: `#00c638` - Success states, confirmations
- **Light**: `#dfffe8` - Success background, positive alerts

### **Neutral** - Blue Palette
- **Dark**: `#006ed3` - Info text on light backgrounds
- **Default**: `#1890ff` - Info states, neutral actions  
- **Light**: `#ecf6ff` - Info background, neutral alerts

---

## 🚫 **Don'ts - Common Mistakes**

### **Text Colors**
❌ Don't use `tertiary` for important content  
❌ Don't use `secondary` for primary headings  
❌ Don't use status colors for regular text  

### **Backgrounds**
❌ Don't use `bg-primary` for page backgrounds  
❌ Don't use `bg-secondary` for cards  
❌ Don't mix primary and secondary backgrounds unnecessarily  

### **Borders**
❌ Don't use `border-secondary` for form elements  
❌ Don't use `border-primary` for subtle dividers  
❌ Don't use status colors for neutral borders  

---

## ✅ **Best Practices**

### **Consistency**
- Use the same color for similar UI elements across the app
- Follow the semantic meaning - don't use colors arbitrarily
- Maintain proper contrast ratios for accessibility

### **Hierarchy**
- Primary → Secondary → Tertiary creates natural reading flow
- Use color to reinforce information hierarchy
- Combine with typography weights for emphasis

### **Accessibility** 
- All color combinations meet WCAG AA standards
- Don't rely solely on color to convey information
- Test with color blindness simulators

### **Dark Mode**
- All colors automatically adapt in dark mode
- Color relationships remain consistent
- No need for manual dark mode color selection

---

## 🛠️ **Implementation Examples**

### **Component Structure**
```tsx
// ✅ Good - Semantic color usage
<Card className="bg-bg-primary border border-border-primary">
  <h2 className="text-primary">Main Heading</h2>
  <p className="text-secondary">Supporting description text</p>
  <span className="text-tertiary">Last updated 2 hours ago</span>
</Card>
```

### **Form Elements**
```tsx
// ✅ Good - Form with proper color hierarchy
<form className="bg-bg-primary p-6 border border-border-primary rounded-lg">
  <label className="text-primary font-medium">Email Address</label>
  <input 
    className="border border-border-primary bg-bg-primary text-primary"
    placeholder="Enter your email" // Uses tertiary color automatically
  />
  <p className="text-tertiary text-sm">We'll never share your email</p>
</form>
```

### **Navigation**
```tsx
// ✅ Good - Navigation with clear hierarchy
<nav className="bg-bg-primary border-b border-border-secondary">
  <ul>
    <li><a className="text-primary font-medium">Active Section</a></li>
    <li><a className="text-secondary">Inactive Section</a></li>
    <li><a className="text-tertiary">Disabled Section</a></li>
  </ul>
</nav>
```

---

## 🔄 **Migration Guide**

If you're updating from the old color system:

| **Old Name** | **New Name** | **Action Required** |
|--------------|--------------|---------------------|
| `dark-100` | `primary` | Update class names and CSS variables |
| `dark-50` | `secondary` | Update class names and CSS variables |
| `dark-25` | `tertiary` | Update class names and CSS variables |
| `box-border` | `border-primary` | Update class names and CSS variables |
| `divider` | `border-secondary` | Update class names and CSS variables |
| `bg` | `bg-secondary` | Update class names and CSS variables |
| `white` | `bg-primary` | Update class names and CSS variables |

### **CSS Variable Migration**
```css
/* Old */
color: var(--dark-100);
border-color: var(--box-border);
background: var(--white);

/* New */
color: var(--primary);
border-color: var(--border-primary);  
background: var(--bg-primary);
```

### **Tailwind Class Migration**
```tsx
/* Old */
<div className="text-dark-100 border-box-border bg-white">

/* New */
<div className="text-primary border-border-primary bg-bg-primary">
```

---

## 📞 **Support**

For questions about color usage or implementation:
- Check the component library examples
- Review Figma design files
- Ask in #design-system Slack channel

**Remember**: Colors should enhance usability, not distract from content. When in doubt, choose the more subtle option. 