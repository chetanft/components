# Icon System - Quick Start Guide

## 🎉 Success! Your Icon System is Ready

✅ **116 Icons** successfully implemented  
✅ **TypeScript Support** with autocomplete  
✅ **Storybook Integration** for browsing icons  
✅ **React-Compatible** SVG components  

## 🚀 Quick Usage

### Basic Icon Usage
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
  className="hover:text-blue-500"
  style={{ transition: 'color 0.2s' }}
/>
```

### Individual Icon Components
```tsx
import { Check, Star, Search, Logout } from '../components/Icons';

<Check />
<Star />
<Search />
<Logout />
```

## 📂 Available Icon Categories

- **Navigation**: chevron-up, chevron-down, chevron-left, chevron-right, arrows
- **Actions**: add, edit, delete, save, copy, share, download
- **Status**: check, cross, success, loading, alerts
- **Brand**: google-colour, airtel, jio, vodafone, ft-colour
- **Business**: gps, organisation, warehouse, vehicle, weight
- **UI**: search, filter, settings, more, preview
- **Files**: document, upload, excel, file-alt
- **Communication**: mail, phone, comment, send

## 🎨 View All Icons

Run Storybook to browse all available icons:
```bash
npm run storybook
```

Then navigate to **UI → Icon** to see all 116 icons with interactive controls.

## 🔧 Adding New Icons

1. Add SVG files to `src/components/Icons/assets/`
2. Run: `node scripts/generateIcons.js`
3. Icons will be automatically generated and added to the system

## ✨ Features

- **Themeable**: Icons inherit parent color by default
- **Scalable**: Any size supported (16px default)
- **TypeScript**: Full autocomplete for icon names
- **Performance**: Tree-shakeable individual imports
- **Consistent**: All icons follow the same 16x16 viewBox 