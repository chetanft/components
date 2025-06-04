# Icon Component System

A comprehensive icon library built from Figma designs with 117+ SVG icons converted to React components.

## Overview

The Icon system provides two ways to use icons:
1. **Dynamic Icon Component** - Use the `Icon` component with a name prop
2. **Individual Icon Components** - Import specific icon components directly

## Usage

### Dynamic Icon Component (Recommended)

```tsx
import { Icon } from '../components/Icons';

// Basic usage
<Icon name="check" />

// With custom size
<Icon name="star" size={24} />

// With custom color
<Icon name="heart" color="#ef4444" />

// With custom styling
<Icon 
  name="search" 
  size={20} 
  color="currentColor"
  className="hover:text-blue-500"
  style={{ transition: 'color 0.2s' }}
/>
```

### Individual Icon Components

```tsx
import { Check, Star, Heart } from '../components/Icons';

<Check />
<Star />
<Heart />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `IconName` | required | The name of the icon to display |
| `size` | `number \| string` | `16` | Size of the icon in pixels or CSS units |
| `color` | `string` | `'currentColor'` | Color of the icon |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | `{}` | Inline styles |

## Available Icons

### Navigation Icons
- `chevron-up`, `chevron-down`, `chevron-left`, `chevron-right`
- `arrow-up`, `arrow-down`, `arrow-top-left`, `arrow-top-right`, `arrow-bottom-left`, `arrow-down-right`

### Action Icons
- `add`, `subtract`, `edit`, `delete`, `save`, `copy`, `share`, `download`
- `search`, `filter`, `sort`, `refresh`, `settings`

### Status Icons
- `check`, `cross`, `alert-critical`, `alert-informational`, `success`, `loading`
- `bell`, `notification`, `star`

### File & Document Icons
- `file`, `file-alt`, `file-upload`, `file-uploader`, `document`, `document-reuse`
- `excel`, `export-file`

### Communication Icons
- `mail`, `phone`, `phone-alt`, `comment`, `send`

### Location & Navigation
- `location`, `multiple-location`, `gps`, `map`, `navigator`, `road`

### Business & Logistics
- `warehouse`, `vehicle`, `ship`, `train`, `aeroplane`
- `weight`, `multiple-weight`, `time`, `multiple-time`
- `organisation`, `user`, `shake-hand`

### Temperature & Environment
- `temperature-cold`, `temperature-default`, `temperature-hot`
- `plant`, `plant-alt`, `light-bulb`

### Brand Icons
- `google-colour`, `google-gray`, `ft-colour`, `ft-gray`
- `airtel`, `jio`, `vodafone`, `bsnl`, `mtnl`, `tata`

### UI & System
- `eye-invisible`, `password`, `lock`, `cursor-pointer`
- `drag`, `expand`, `more`, `three-dot-menu`, `hamburger-menu`
- `preview`, `preview-fill`, `bulk-actions`

### Financial & Commerce
- `rupee-coin`, `cheap`, `recommended`, `rocket`

### Utility
- `clock`, `calendar`, `calendar-clock`
- `data-stack`, `division`, `portable-tracking`
- `sim`, `link`, `logout`, `log-out`

## TypeScript Support

Full TypeScript support with autocomplete for icon names:

```tsx
import { Icon, IconName } from '../components/Icons';

const iconName: IconName = 'check'; // Autocomplete available
<Icon name={iconName} />
```

## Theming

Icons use `currentColor` by default, making them inherit the text color of their parent:

```tsx
<div className="text-blue-500">
  <Icon name="check" /> {/* Will be blue */}
</div>

<div className="text-red-500">
  <Icon name="cross" /> {/* Will be red */}
</div>
```

## Best Practices

1. **Use semantic names**: Choose icon names that clearly represent their purpose
2. **Consistent sizing**: Use standard sizes (16, 20, 24, 32) for consistency
3. **Color inheritance**: Let icons inherit color from parent elements when possible
4. **Accessibility**: Provide appropriate `aria-label` or `title` when icons convey important information

```tsx
// Good
<button className="text-green-500">
  <Icon name="check" size={16} />
  Save
</button>

// Better with accessibility
<button 
  className="text-green-500"
  aria-label="Save document"
>
  <Icon name="check" size={16} />
  Save
</button>
```

## Adding New Icons

To add new icons to the system:

1. Add SVG files to `src/components/Icons/assets/`
2. Run the generation script: `node scripts/generateIcons.js`
3. The script will automatically:
   - Convert SVG files to React components
   - Update the iconMap
   - Generate exports in index.ts

## File Structure

```
src/components/Icons/
├── assets/           # SVG source files
├── [IconName].tsx    # Generated React components
├── Icon.tsx          # Main Icon component
├── iconMap.ts        # Icon name to component mapping
├── index.ts          # All exports
└── README.md         # This documentation
``` 