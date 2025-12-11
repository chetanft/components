# FT Design System AI Architecture

## Overview

The FT Design System now provides a **layered architecture** that separates core components from AI-specific functionality. This ensures clean, performant components for regular users while providing AI protection for those who need it.

## Architecture Layers

```
ft-design-system/
├── AI-Protected Components (Default & Recommended)
│   ├── src/index.ts
│   └── import from 'ft-design-system'
│
├── AI Utilities (Included)
│   ├── src/lib/ai-utils.ts
│   └── import from 'ft-design-system'
│
└── Core Components (Escape Hatch)
    ├── src/core/
    └── import from 'ft-design-system/core'
```

## Performance Metrics (Real Data)

### Bundle Size Analysis

| Import Method | Bundle Size | Use Case |
|---------------|-------------|----------|
| `ft-design-system` | **450KB** | AI-protected (default) |
| `ft-design-system/core` | **484KB** | Unprotected (escape hatch) |
| Styles | **67KB** | Required CSS |
| TypeScript definitions | **28KB / 20KB** | Type safety |

**Note:** AI-protected version is actually **34KB smaller** due to optimized tree-shaking!

### Performance Benchmarks

- **AI Class Filtering:** < 0.1ms per operation
- **Conflict Detection:** Instant in browser environments
- **Bundle Loading:** No measurable overhead
- **TypeScript Compilation:** Full type safety maintained

## Usage Options

### Option 1: AI-Protected Components (Default & Recommended)

```typescript
import 'ft-design-system/styles.css';
import { Button, Input, Table } from 'ft-design-system';

function App() {
  return (
    <div>
      {/* AI can add h-10, bg-[#123456], etc. - automatically filtered */}
      <Button variant="primary" className="h-10 bg-[#123456] rounded-xl">
        Click me
      </Button>
    </div>
  );
}
```

**Benefits:**
- ✅ Automatic filtering of problematic AI classes
- ✅ Prevents design system conflicts
- ✅ Self-healing components
- ✅ Smaller bundle size (450KB)
- ✅ Zero-config AI protection

### Option 2: Unprotected Components (Advanced Use Only)

```typescript
import 'ft-design-system/styles.css';
import { Button, Input, Table } from 'ft-design-system/core';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter text" />
    </div>
  );
}
```

**Use when:**
- You need direct access to components without AI filtering
- You're handling class filtering manually
- Advanced debugging or customization required

### Option 3: Manual AI Protection (Advanced)

```typescript
import { Button, filterAIClasses, debugDesignSystemConflicts } from 'ft-design-system';

// Run development checks
debugDesignSystemConflicts();

function App() {
  const aiGeneratedClasses = "h-10 bg-[#123456] rounded-xl px-4";
  
  return (
    <Button 
      variant="primary" 
      className={filterAIClasses(aiGeneratedClasses)}
    >
      Click me
    </Button>
  );
}
```

**Benefits:**
- ✅ Full control over filtering
- ✅ Debugging utilities
- ✅ Conflict detection
- ✅ Development helpers

## AI Utilities Reference

### `filterAIClasses(className: string)`

Removes problematic classes that break design system consistency:

```typescript
import { filterAIClasses } from 'ft-design-system';

// Input: "h-10 bg-[#123456] w-full flex items-center"
// Output: "w-full flex items-center"
const safeClasses = filterAIClasses(aiGeneratedClasses);
```

**Performance:** < 0.1ms per operation

**Filtered classes:**
- Height overrides: `h-10`, `h-[40px]`
- Border radius: `rounded-lg`, `rounded-[8px]`
- Color overrides: `bg-[#123456]`, `text-[#abcdef]`
- Padding overrides: `px-4`, `py-[12px]`
- Width overrides: `w-32` (except `w-full`)

### `detectDesignSystemConflicts()`

Detects conflicting design systems in the environment:

```typescript
import { detectDesignSystemConflicts } from 'ft-design-system';

const conflicts = detectDesignSystemConflicts();
// Returns: ['Material-UI', 'Ant Design', 'shadcn/ui']
```

### `runAIDevelopmentChecks()`

Comprehensive development helper:

```typescript
import { runAIDevelopmentChecks } from 'ft-design-system';

// Call once in your app during development
runAIDevelopmentChecks();
// Validates FT Design System, checks conflicts, logs available components
```

## AI Tool Integration

### For Cursor/VS Code

```typescript
// .cursor/rules/ft-design-system.md
Use ft-design-system for automatic AI protection (default):

import { Button, Input, Table } from 'ft-design-system';
```

### For Bolt.new/CodeSandbox

```html
<!-- Add to HTML head -->
<link rel="stylesheet" href="https://unpkg.com/ft-design-system@latest/dist/styles.css">
<script src="https://unpkg.com/ft-design-system@latest/dist/index.umd.js"></script>

<script>
// Use AI-protected components
const { Button, Input, Table } = window.FTDesignSystem;
</script>
```

### For Lovable.dev

```typescript
// Install (AI-protected by default)
npm install ft-design-system

// Use in components
import { Button, Input, Table } from 'ft-design-system';
```

## Migration Guide

### From v4.1.x to v4.2.x

**No breaking changes!** All existing code continues to work:

```typescript
// Default (AI-protected, recommended)
import { Button } from 'ft-design-system';

// Escape hatch (unprotected, advanced use only)
import { Button } from 'ft-design-system/core';
```

## Performance Monitoring

### Built-in Monitoring

```bash
# Run performance analysis
npm run monitor:performance

# Expected output:
# Core Bundle: 484KB
# AI Bundle: 450KB (-34KB, -7.0%)
# Filtering: < 0.1ms per operation
```

### Development Workflow

```typescript
// Add to your main App.tsx during development
import { runAIDevelopmentChecks } from 'ft-design-system';

function App() {
  // Only runs in development
  runAIDevelopmentChecks();
  
  return <YourApp />;
}
```

## Best Practices

### 1. Choose the Right Layer

- **Default (recommended)**: Use `ft-design-system` (450KB, AI-protected)
- **Advanced use only**: Use `ft-design-system/core` (484KB, unprotected)
- **AI utilities**: Available in both imports

### 2. Production Optimization

```typescript
// Components are AI-protected by default
import { Button, Input, Table } from 'ft-design-system';

// Use /core only if you need unprotected versions
import { Button } from 'ft-design-system/core';
```

### 3. Bundle Analysis

```bash
# Monitor bundle sizes
npm run build
npm run monitor:performance

# Check for regressions
npm run test:ai-architecture
```

## Troubleshooting

### Components Not Working

```typescript
// Check if FT Design System is loaded
import { validateFTDesignSystem } from 'ft-design-system';
validateFTDesignSystem();
```

### Styling Conflicts

```typescript
// Debug design system conflicts
import { debugDesignSystemConflicts } from 'ft-design-system';
debugDesignSystemConflicts();
```

### Performance Issues

```typescript
// Monitor filtering performance
import { filterAIClasses } from 'ft-design-system';

console.time('AI filtering');
const result = filterAIClasses('h-10 bg-[#123456] w-full');
console.timeEnd('AI filtering'); // Should be < 0.1ms
```

## Contributing

When adding new components:

1. **Core component** goes in `src/components/`
2. **AI protection** is automatically added via `src/ai/index.ts`
3. **Update exports** in both `src/index.ts` and `src/ai/index.ts`
4. **Test both versions** work correctly
5. **Run performance monitoring** to check bundle impact

## Color System Architecture (v4.9.2+)

The FT Design System now features a **hierarchical color architecture** that provides both flexibility and consistency:

### Color System Structure

```
Design System/Colors/
├── Base Colors/          # Foundation color scales (67 colors × 3 themes)
│   ├── Light Mode       # Primary, Secondary, Tertiary, Neutral, Status scales
│   ├── Dark Mode        # Adapted for dark theme
│   └── Night Mode       # High contrast for accessibility
│
└── Color System/        # Selected colors from base scales
    ├── Light Mode       # Primary, Secondary, Tertiary, Borders, Backgrounds, Semantic
    ├── Dark Mode        # Theme-adapted selected colors
    └── Night Mode       # High contrast selected colors
```

### Color Usage in AI Tools

**✅ Recommended for AI Tools:**
```typescript
// Use semantic color variables (automatically adapt to themes)
<Button className="bg-primary text-primary border-primary" />
<div className="bg-secondary text-secondary" />
<Alert className="bg-critical text-critical" />
```

**❌ Avoid in AI Tools:**
```typescript
// Don't use hardcoded colors or arbitrary values
<Button className="bg-[#434f64] text-[#1a2330]" />
<div className="bg-blue-500 text-gray-900" />
```

### AI-Safe Color Classes

The AI protection automatically filters problematic color classes:

```typescript
import { filterAIClasses } from 'ft-design-system';

// Input: "bg-[#123456] text-[#abcdef] bg-primary text-secondary"
// Output: "bg-primary text-secondary"
const safeClasses = filterAIClasses(aiGeneratedClasses);
```

**Filtered color patterns:**
- Arbitrary color values: `bg-[#123456]`, `text-[rgb(255,0,0)]`
- Hardcoded Tailwind colors: `bg-blue-500`, `text-red-600`
- Border color overrides: `border-[#abcdef]`

**Preserved semantic colors:**
- Design system colors: `bg-primary`, `text-secondary`, `border-tertiary`
- Status colors: `bg-critical`, `text-positive`, `border-warning`
- Background colors: `bg-primary`, `bg-secondary`

### Color System Integration

```typescript
// AI-protected by default
import { Button, Alert, Card } from 'ft-design-system';

function AIGeneratedComponent() {
  return (
    <div>
      {/* AI can safely use semantic colors */}
      <Button variant="primary" className="bg-primary text-primary">
        Primary Action
      </Button>
      
      {/* Status colors work across all themes */}
      <Alert variant="critical" className="bg-critical text-critical">
        Error message
      </Alert>
      
      {/* Arbitrary colors are automatically filtered out */}
      <Card className="bg-[#123456] bg-secondary text-secondary">
        Safe card with design system colors
      </Card>
    </div>
  );
}
```

## Future Roadmap

- [ ] Build-time AI class filtering for even better performance
- [ ] IDE extensions for better AI integration
- [ ] Automated conflict detection in CI/CD
- [ ] Real-time performance monitoring dashboard
- [ ] AI-specific component variants
- [ ] Automatic color theme detection and adaptation
- [ ] AI-powered color accessibility validation 