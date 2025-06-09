# FT Design System AI Architecture

## Overview

The FT Design System now provides a **layered architecture** that separates core components from AI-specific functionality. This ensures clean, performant components for regular users while providing AI protection for those who need it.

## Architecture Layers

```
ft-design-system/
├── Core Components (Clean & Lightweight)
│   ├── src/components/
│   └── import from 'ft-design-system'
│
├── AI Utilities (Optional)
│   ├── src/lib/ai-utils.ts
│   └── import from 'ft-design-system'
│
└── AI-Protected Components (Optional)
    ├── src/ai/
    └── import from 'ft-design-system/ai'
```

## Performance Metrics (Real Data)

### Bundle Size Analysis

| Import Method | Bundle Size | Overhead | Use Case |
|---------------|-------------|----------|----------|
| `ft-design-system` | **484KB** | Baseline | Regular development |
| `ft-design-system/ai` | **450KB** | **-34KB (-7.0%)** | AI tool development |
| Styles | **67KB** | - | Required CSS |
| TypeScript definitions | **28KB / 20KB** | - | Type safety |

**🎉 Surprising Result:** The AI-protected bundle is actually **34KB smaller** than the core bundle due to optimized tree-shaking!

### Performance Benchmarks

- **AI Class Filtering:** < 0.1ms per operation
- **Conflict Detection:** Instant in browser environments
- **Bundle Loading:** No measurable overhead
- **TypeScript Compilation:** Full type safety maintained

## Usage Options

### Option 1: Standard Components (Most Users)

```typescript
import 'ft-design-system/dist/styles.css';
import { Button, Input, Table } from 'ft-design-system';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter text" />
    </div>
  );
}
```

**Benefits:**
- ✅ Smallest bundle size (484KB)
- ✅ Best performance
- ✅ Clean component API
- ✅ No AI-related overhead

### Option 2: AI-Protected Components (AI Tools)

```typescript
import 'ft-design-system/dist/styles.css';
import { Button, Input, Table } from 'ft-design-system/ai';

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
- ✅ Same API as standard components
- ✅ Prevents design system conflicts
- ✅ Self-healing components
- ✅ **Actually smaller bundle size** (450KB)

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
Use ft-design-system/ai for automatic AI protection:

import { Button, Input, Table } from 'ft-design-system/ai';
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
// Install AI-protected version
npm install ft-design-system

// Use in components
import { Button, Input, Table } from 'ft-design-system/ai';
```

## Migration Guide

### From v4.1.x to v4.2.x

**No breaking changes!** All existing code continues to work:

```typescript
// Old way (still works)
import { Button } from 'ft-design-system';

// New way (AI-protected, actually smaller!)
import { Button } from 'ft-design-system/ai';
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

- **Regular development**: Use `ft-design-system` (484KB)
- **AI tool development**: Use `ft-design-system/ai` (450KB, smaller!)
- **Advanced control**: Use utilities from `ft-design-system`

### 2. Production Optimization

```typescript
// Conditional loading based on environment
const useAIProtection = process.env.NODE_ENV === 'development';

const components = useAIProtection 
  ? await import('ft-design-system/ai')
  : await import('ft-design-system');

export const { Button, Input, Table } = components;
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

## Future Roadmap

- [ ] Build-time AI class filtering for even better performance
- [ ] IDE extensions for better AI integration
- [ ] Automated conflict detection in CI/CD
- [ ] Real-time performance monitoring dashboard
- [ ] AI-specific component variants 