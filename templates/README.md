# FT Design System Starter Templates

Pre-configured starter templates for popular React frameworks with FT Design System already set up.

## Available Templates

- **Next.js App Router** (`nextjs-app-router/`) - Next.js 14+ with App Router
- **Next.js Pages Router** (`nextjs-pages-router/`) - Next.js 13+ with Pages Router
- **Vite + React** (`vite-react/`) - Vite with React
- **Create React App** (`create-react-app/`) - CRA with React

## Usage

### Option 1: Copy Template Files

1. Choose a template directory
2. Copy all files to your new project directory
3. Install dependencies: `npm install`
4. Start development: `npm run dev` (or `npm start` for CRA)

### Option 2: Use Setup Script

The FT Design System setup script can automatically configure your existing project:

```bash
npx ft-design-system setup
```

## What's Included

Each template includes:

- ✅ CSS import in correct location
- ✅ Tailwind config with FT DS content paths
- ✅ Example component usage
- ✅ TypeScript configuration (where applicable)
- ✅ README with framework-specific notes

## Framework-Specific Notes

### Next.js App Router
- CSS imported in `app/layout.tsx`
- Uses App Router file structure

### Next.js Pages Router
- CSS imported in `pages/_app.tsx`
- Uses Pages Router file structure

### Vite + React
- CSS imported in `src/main.tsx`
- Vite config optimized for FT DS

### Create React App
- CSS imported in `src/index.tsx`
- Compatible with CRA 5.x

## Next Steps

After using a template:

1. Import components: `import { Button, Input } from 'ft-design-system';`
2. Customize the example page with your content
3. Add more components and pages
4. See [Integration Guide](../../docs/INTEGRATION_GUIDE.md) for detailed usage

