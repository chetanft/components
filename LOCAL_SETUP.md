# 🚀 FT Design System - Local Development Setup

## Running Servers

The project is now running with two active servers:

### 1. **Storybook** (Main Interface)
- **URL**: http://localhost:6006
- **Port**: 6006
- **Status**: ✅ Running
- **Purpose**: View all components, stories, and documentation
- **Contains**: 785+ examples from 122 story files

### 2. **Rollup Dev Build** (Background)
- **Purpose**: Watches and builds components in real-time
- **Output**: `dist/` folder with ESM, CommonJS, and UMD bundles

---

## New AI-Ready Features Implemented

### 📦 Component Registry System
```bash
npm run generate:registry
```
- **File**: `registry.json` (69KB)
- **Contents**: All 124 components with dependencies, paths, metadata
- **Usage**: `ft-design-system/registry.json`
- **CLI**: `npx ftds add <component>`

### 📚 Component Schema
```bash
npm run generate:schema
```
- **File**: `component-schema.json` (166KB)
- **Contents**: Component props, types, descriptions, examples
- **Usage**: `ft-design-system/schema`
- **Purpose**: AI tools understand component APIs

### 💡 Examples & Snippets
```bash
npm run generate:examples
```
- **File**: `examples.json` (274KB)
- **Contents**: 785 code examples extracted from stories
- **Usage**: `ft-design-system/examples`
- **Purpose**: AI reference for common patterns

### 🎨 Tailwind Preset
```bash
npm run build
```
- **File**: `tailwind-preset.js` (11KB)
- **Usage**: `presets: [require('ft-design-system/tailwind-preset')]`
- **Features**: All design tokens as Tailwind theme extension

### 🛡️ AI Protection Layer
- **Import**: `ft-design-system`
- **Features**: Auto-filters bad AI-generated classes
- **Coverage**: All 100+ components wrapped

### 🔧 FTProvider Component
```tsx
import { FTProvider } from 'ft-design-system';

<FTProvider theme="dark">
  <App />
</FTProvider>
```
- Automatic CSS injection
- Theme management (light/dark/night/system)
- Global context setup

### 📝 LLM Context File
- **File**: `AI_CONTEXT.md` (11KB)
- **Purpose**: Single file for AI tools to understand the system
- **Contents**: Quick start, component reference, tokens, examples

### 📡 CDN Documentation
- **File**: `docs/CDN_USAGE.md`
- **Purpose**: Use from CDN without npm installation
- **Supports**: unpkg, jsDelivr, esm.sh

---

## CLI Commands

### Setup & Add Components
```bash
# Setup in your project
npx ftds setup

# Add specific components
npx ftds add button input table

# Add all components
npx ftds add --all

# List available components
npx ftds list
npx ftds list --category atoms
```

### Development
```bash
# Start watching/building
npm run dev

# Start Storybook (already running)
npm run storybook

# Build for production
npm run build

# Type checking
npm run type-check
```

### Code Quality
```bash
# Lint code
npm run lint

# Find arbitrary Tailwind classes
npm run find:arbitrary-classes
```

### Generate Metadata
```bash
# Generate all metadata
npm run generate:registry
npm run generate:schema
npm run generate:examples

# Or run individually
npm run generate:registry
npm run generate:schema
npm run generate:examples
```

---

## Package Exports

You can now import from multiple entry points:

```tsx
// Main components
import { Button, Input, Table } from 'ft-design-system';

// AI-protected versions
import { Button, Input, Table } from 'ft-design-system';

// CSS styles
import 'ft-design-system/styles';

// Tailwind preset
const preset = require('ft-design-system/tailwind-preset');

// Metadata for AI tools
import registry from 'ft-design-system/registry.json';
import schema from 'ft-design-system/schema';
import examples from 'ft-design-system/examples';

// Utilities
import { cn, filterAIClasses } from 'ft-design-system';
import { FTProvider, useFTTheme } from 'ft-design-system';
```

---

## Project Structure

```
/Users/user/Documents/components/
├── src/
│   ├── components/          # All UI components
│   │   ├── atoms/          # 25 base components
│   │   ├── molecules/      # 57 combinations
│   │   ├── organisms/      # 24 complex components
│   │   ├── charts/         # 16 chart types
│   │   └── FTProvider.tsx  # NEW: Provider component
│   ├── ai/
│   │   └── index.ts        # UPDATED: All 100+ components wrapped
│   ├── lib/
│   │   ├── ai-utils.ts     # AI protection utilities
│   │   └── utils.ts        # General utilities (cn, etc)
│   ├── tokens/
│   │   └── design-tokens.ts # Design system tokens
│   └── styles/
│       └── globals.css      # Global styles & CSS variables
├── scripts/
│   ├── setup-ftds.cjs      # UPDATED: CLI with add command
│   ├── generate-registry.cjs  # NEW
│   ├── generate-component-schema.cjs  # NEW
│   ├── generate-examples.cjs  # NEW
│   └── find-arbitrary-classes.cjs  # NEW
├── docs/
│   ├── CDN_USAGE.md        # NEW: CDN setup guide
│   ├── components.json     # UPDATED: Version & naming
│   └── ...
├── tailwind-preset.js      # NEW: Tailwind preset
├── registry.json           # NEW: Component registry
├── registry.min.json       # NEW: Minimal registry
├── component-schema.json   # NEW: Component schema
├── examples.json           # NEW: Code examples
├── AI_CONTEXT.md           # NEW: LLM context file
└── package.json            # UPDATED: Exports & scripts
```

---

## Key Improvements for AI Tools

### Before
❌ No component registry  
❌ No way to add individual components  
❌ CSS setup confusing  
❌ Some components unprotected  
❌ No metadata for AI consumption  
❌ Arbitrary Tailwind values  

### After
✅ Full component registry with `npx ftds add`  
✅ FTProvider for automatic setup  
✅ All 100+ components AI-protected  
✅ Machine-readable schema & registry  
✅ 785+ code examples  
✅ Tailwind preset with theme classes  
✅ CDN-ready UMD bundle  
✅ Single LLM context file  

---

## Next Steps

1. **Verify in Storybook**: http://localhost:6006
2. **Test CLI**: `npx ftds list` or `npx ftds add button`
3. **Check exports**: `import registry from 'ft-design-system/registry.json'`
4. **Build for npm**: `npm run publish:prepare`

---

## Troubleshooting

### Storybook not loading?
```bash
pkill -f storybook
npm run storybook
```

### Build errors?
```bash
npm run clean
npm install
npm run dev
```

### Port conflicts?
```bash
lsof -i :6006
kill -9 <PID>
npm run storybook
```

---

## Commands Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Watch & build components |
| `npm run storybook` | Start Storybook (port 6006) |
| `npm run build` | Build for production |
| `npm run lint` | Check code quality |
| `npm run type-check` | TypeScript validation |
| `npm run generate:registry` | Create registry.json |
| `npm run generate:schema` | Create component-schema.json |
| `npm run generate:examples` | Create examples.json |
| `npm run find:arbitrary-classes` | Find Tailwind arbitrary values |
| `npx ftds setup` | Setup in new project |
| `npx ftds add button` | Add specific component |
| `npx ftds list` | List all components |

---

## Files Generated Today

- ✅ `registry.json` - 124 components with metadata
- ✅ `registry.min.json` - Lightweight version
- ✅ `component-schema.json` - Props & types
- ✅ `examples.json` - 785 code snippets
- ✅ `tailwind-preset.js` - Tailwind theme
- ✅ `AI_CONTEXT.md` - Single-file reference
- ✅ `FTProvider.tsx` - Provider component
- ✅ `docs/CDN_USAGE.md` - CDN setup guide
- ✅ All package exports updated
- ✅ CLI commands implemented

---

**Status**: ✅ All systems running  
**Storybook**: http://localhost:6006  
**Ready for**: Development, testing, npm publishing

