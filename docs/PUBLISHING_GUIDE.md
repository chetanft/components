# Design System Publishing Guide

This guide explains how to publish your design system package so other users can install and use it in their projects.

## Quick Start

### Interactive CLI (Recommended)

Use the interactive publishing CLI for a guided experience:

```bash
npm run publish
```

This will present you with a menu of publishing options and guide you through the process.

## Publishing Options

### 1. 🔍 Package Validation

Before publishing, always validate your package:

```bash
npm run validate:package
```

This checks:
- ✅ Required package.json fields
- ✅ Build output files exist
- ✅ File sizes and exports
- ✅ TypeScript declarations

### 2. 📦 Local Testing

Create a local package for testing:

```bash
npm run publish:local
```

This creates a `.tgz` file that you can test locally:

```bash
# In another project
npm install /path/to/your-design-system-1.0.0.tgz
```

### 3. 🧪 Dry Run

Test the publishing process without actually publishing:

```bash
npm run publish:dry-run
```

### 4. Version Management

#### Patch Version (Bug fixes: 1.0.1 → 1.0.2)
```bash
npm run publish:patch
```

#### Minor Version (New features: 1.0.1 → 1.1.0)
```bash
npm run publish:minor
```

#### Major Version (Breaking changes: 1.0.1 → 2.0.0)
```bash
npm run publish:major
```

#### Beta Version
```bash
npm run publish:beta
```

### 5. Registry Options

#### GitHub Packages (Default)
```bash
npm run publish:github
```

#### Public npm Registry
```bash
npm run publish:npm
```

## Setup for Publishing

### 1. GitHub Packages Setup

Your package is already configured for GitHub Packages. Users need to:

1. Create a `.npmrc` file in their project:
```
@chetanft:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

2. Install your package:
```bash
npm install @chetanft/design_system
```

### 2. npm Registry Setup

To publish to the public npm registry, update your `package.json`:

```json
{
  "publishConfig": {
    "registry": "https://registry.npmjs.org",
    "access": "public"
  }
}
```

## Using the Design System

### Installation

```bash
# From GitHub Packages
npm install @chetanft/design_system

# From npm (if published there)
npm install @chetanft/design_system
```

### Usage in React Projects

```tsx
import { Button, Input, Badge } from '@chetanft/design_system';
import '@chetanft/design_system/dist/styles.css';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter text" />
      <Badge variant="success">New</Badge>
    </div>
  );
}
```

### Usage with TypeScript

The package includes TypeScript declarations, so you get full type safety:

```tsx
import { ButtonProps, InputProps } from '@chetanft/design_system';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Package Contents

Your published package includes:

- ✅ **ESM and CommonJS builds** (`dist/index.esm.js`, `dist/index.js`)
- ✅ **TypeScript declarations** (`dist/index.d.ts`)
- ✅ **Compiled styles** (`dist/styles.css`)
- ✅ **Source maps** for debugging
- ✅ **Tree-shaking support**

## Development Workflow

### 1. Pre-publish Checklist

- [ ] Run tests: `npm test`
- [ ] Type check: `npm run type-check`
- [ ] Lint code: `npm run lint`
- [ ] Build package: `npm run build`
- [ ] Validate package: `npm run validate:package`

### 2. Publishing Flow

```bash
# 1. Validate everything
npm run publish:dry-run

# 2. Publish (using interactive CLI)
npm run publish

# Or directly:
npm run publish:patch  # for bug fixes
npm run publish:minor  # for new features
npm run publish:major  # for breaking changes
```

### 3. Post-publish

- Check published versions: `npm run version:check`
- Update documentation if needed
- Announce the new version to your team

## Troubleshooting

### Common Issues

1. **Authentication Error**
   ```bash
   # Login to npm
   npm login
   
   # For GitHub Packages
   npm login --registry=https://npm.pkg.github.com
   ```

2. **Build Failures**
   ```bash
   # Clean and rebuild
   npm run clean
   npm run build
   ```

3. **Permission Errors**
   - Ensure you have publish permissions for the package
   - Check your npm/GitHub token permissions

### Build Size Optimization

Monitor your package size:

```bash
# Check current build sizes
npm run validate:package

# Analyze bundle
npx bundle-analyzer dist/index.esm.js
```

## Best Practices

### 1. Semantic Versioning

- **Patch** (1.0.1): Bug fixes, no breaking changes
- **Minor** (1.1.0): New features, backward compatible
- **Major** (2.0.0): Breaking changes

### 2. Pre-release Versions

Use beta versions for testing:

```bash
npm run publish:beta
```

Users can install with:
```bash
npm install @chetanft/design_system@beta
```

### 3. Documentation

Always update documentation when:
- Adding new components
- Changing component APIs
- Updating installation instructions

### 4. Testing

Test your package in real projects before publishing:

```bash
# Create local package
npm run publish:local

# Test in another project
cd ../test-project
npm install ../design-system/chetanft-design-system-1.0.1.tgz
```

## Support

For issues with the design system:
- 📝 [Create an issue](https://github.com/chetanft/components/issues)
- 📖 [View documentation](https://github.com/chetanft/components)
- 🎨 [Check Storybook](your-storybook-url)

---

**Happy publishing! 🚀** 