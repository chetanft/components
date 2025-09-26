# FT Design System Documentation Website

A shadcn/ui inspired documentation website for the FT Design System component library.

## 🚀 Features

- **shadcn/ui Clone**: Exact UI/UX replication of shadcn/ui website
- **Component Showcase**: Interactive previews of all FT Design System components  
- **Copy-Paste Ready**: One-click code copying for easy integration
- **Responsive Design**: Mobile-friendly documentation
- **Component Registry**: Structured component metadata and examples
- **Search & Navigation**: Easy component discovery

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **ft-design-system** (the actual component library)
- **Lucide React** (icons)
- **MDX** (documentation)

## 📦 Installation

```bash
cd website
npm install
npm run dev
```

Visit `http://localhost:3000` to see the documentation site.

## 🏗️ Project Structure

```
website/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── docs/              # Documentation pages
│   │   │   └── components/    # Individual component pages
│   │   └── page.tsx          # Homepage
│   ├── components/            # Site components
│   │   ├── ui/               # Site UI components
│   │   └── component-preview.tsx # Component preview system
│   ├── registry/             # Component registry
│   └── lib/                  # Utilities
├── public/                   # Static assets
└── README.md
```

## 🎯 Key Features Implemented

### ✅ Phase 1: Foundation (Completed)
- [x] Next.js 14 setup with TypeScript and Tailwind
- [x] shadcn/ui inspired styling and layout
- [x] Component registry mapping ft-design-system components
- [x] Homepage clone with FT Design System branding
- [x] Navigation and responsive layout

### ✅ Phase 2: Core Components (Completed)  
- [x] Component preview system with code copying
- [x] Documentation pages for key components (Button, Input, Card)
- [x] Props tables and examples
- [x] Installation instructions

### 🚧 Phase 3: Remaining Work
- [ ] Complete all component pages (Badge, Checkbox, Switch, Table, etc.)
- [ ] Examples page with full app templates
- [ ] CLI tool for component installation
- [ ] Search functionality
- [ ] Dark mode toggle
- [ ] Mobile navigation improvements

## 🧩 Component Registry

The registry maps your ft-design-system components to shadcn/ui format:

```typescript
// registry/index.ts
export const registry: Registry = {
  "button": {
    name: "button",
    type: "components:ui",
    dependencies: ["ft-design-system"],
    files: [{
      name: "button.tsx",
      content: `import { Button } from "ft-design-system"\nexport { Button }`
    }]
  },
  // ... more components
}
```

## 🎨 Styling

The website uses the exact same CSS variables and styling approach as shadcn/ui:

- CSS custom properties for theming
- Tailwind CSS for utility classes
- Your ft-design-system styles imported globally
- Consistent spacing, typography, and color system

## 📝 Adding New Component Pages

1. Create a new page in `src/app/docs/components/[component-name]/page.tsx`
2. Add the component to the navigation in `src/components/ui/docs-nav.tsx`
3. Add preview logic to `src/components/component-preview.tsx`
4. Update the registry in `src/registry/index.ts`

## 🚀 Deployment

The website is ready for deployment on Vercel, Netlify, or any static hosting platform:

```bash
npm run build
npm start
```

## 🔗 Links

- [FT Design System Package](https://www.npmjs.com/package/ft-design-system)
- [GitHub Repository](https://github.com/chetanft/components)
- [Original shadcn/ui](https://ui.shadcn.com) (inspiration)

---

**Status**: 🟡 MVP Complete - Ready for enhancement and additional component pages