# Why There Are Syntax Errors in Documentation

## Root Cause

The syntax errors you're seeing in the component documentation are caused by **function-based story exports in Storybook being incorrectly transpiled to JavaScript**.

## The Problem Flow

### 1. **Story Files Have Function-Based Exports**
In files like `Button.stories.tsx` and `Badge.stories.tsx`, you have function-based exports:

```typescript
// Button.stories.tsx
export function VariantsSecondary() {
  return (
    <div className="p-6">
      <Button variant="secondary" size="md">Secondary</Button>
    </div>
  );
}
```

### 2. **Documentation Generator Extracts These Functions**
The file `/ft-docs/src/lib/component-metadata.ts` contains a function called `extractExamplesFromStory` that:
- Reads your `.stories.tsx` files
- Finds all exported functions
- Extracts their code
- Tries to convert TypeScript to JavaScript

### 3. **TypeScript Transpilation Fails**
The `transpileTypeScript` function (lines 418-460 in `component-metadata.ts`) uses **regex-based type stripping** to convert TypeScript to JavaScript:

```typescript
function transpileTypeScript(tsCode: string): string {
  let jsCode = tsCode;
  
  // Remove type annotations using regex
  jsCode = jsCode
    .replace(/:\s*Array<[^>]+>/g, '')
    .replace(/:\s*['"][^'"]+['"](\\s*\\|\\s*['"][^'"]+['"]+)/g, '')
    .replace(/:\s*\w+<[^>]+>/g, '')
    .replace(/:\s*React\.\w+/g, '')
    // ... more regex replacements
    
  return jsCode;
}
```

**This is fragile and fails for complex TypeScript syntax**, resulting in malformed JavaScript.

### 4. **React-Live Can't Execute the Malformed Code**
The generated JavaScript is passed to `react-live` (in `/ft-docs/src/components/component-preview.tsx`):

```typescript
<LiveProvider code={wrappedCode} scope={registry}>
  <LivePreview />
  <LiveError /> {/* Shows errors when code fails */}
</LiveProvider>
```

When `react-live` tries to execute the malformed JavaScript, it throws syntax errors, which are displayed in the `<LiveError>` component.

## Examples of What Goes Wrong

### Example 1: Type Annotations Not Fully Removed
**Original TypeScript:**
```typescript
const items: string[] = ['one', 'two'];
```

**After regex transpilation (WRONG):**
```javascript
const items: string = ['one', 'two']; // Still has type annotation!
```

### Example 2: JSX Attributes Mangled
**Original TypeScript:**
```typescript
<Button variant="secondary" size="md">Text</Button>
```

**After regex transpilation (WRONG):**
```javascript
<Button variant="secondary"size="md">Text</Button> // Missing space!
```

### Example 3: Return Statement Issues
**Original TypeScript:**
```typescript
export function VariantsSecondary() {
  return (
    <div className="p-6">
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}
```

**After extraction and wrapping (WRONG):**
```javascript
function Preview() {
  return (
    // Malformed code here due to transpilation issues
    <div className="p-6">
      <Button variant="secondary">Secondary</Button>
    </div>
  )
}
```

The wrapping logic tries to extract the JSX and create a proper function, but the transpilation errors cause it to fail.

## Why Only Some Stories Work

### ✅ **Args-Based Stories Work Correctly**
These stories work fine because they don't require TypeScript transpilation:

```typescript
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
  },
};
```

The documentation generator simply extracts the `args` object and converts it to JSX:
```jsx
<Button variant="primary" size="md">Button</Button>
```

This is straightforward and doesn't involve TypeScript transpilation.

### ❌ **Function-Based Stories Fail**
These stories require full TypeScript-to-JavaScript transpilation:

```typescript
export function VariantsSecondary() {
  return (
    <div className="p-6">
      <Button variant="secondary" size="md">Secondary</Button>
    </div>
  );
}
```

The regex-based transpiler can't reliably handle this, resulting in syntax errors.

## The Solution

There are two main approaches:

### **Option 1: Convert Function Stories to Args Stories (RECOMMENDED)**

Replace function-based stories with args-based stories:

```typescript
// ❌ REMOVE THIS
export function VariantsSecondary() {
  return (
    <div className="p-6">
      <Button variant="secondary" size="md">Secondary</Button>
    </div>
  );
}

// ✅ USE THIS INSTEAD
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Secondary',
  },
};
```

**Pros:**
- Simple and reliable
- Works perfectly with the current documentation generator
- Follows Storybook best practices
- No TypeScript transpilation needed

**Cons:**
- Can't show complex demos with multiple components
- Limited to single component instances

### **Option 2: Improve TypeScript Transpilation (COMPLEX)**

Replace the regex-based `transpileTypeScript` function with a proper transpiler like Babel or SWC:

```typescript
import { transformSync } from '@babel/core';

function transpileTypeScript(tsCode: string): string {
  const result = transformSync(tsCode, {
    presets: [
      ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
      '@babel/preset-react'
    ],
    filename: 'story.tsx',
  });
  
  return result?.code || tsCode;
}
```

**Pros:**
- Can handle complex TypeScript syntax
- More robust and reliable
- Supports advanced scenarios

**Cons:**
- Requires additional dependencies (@babel/core, presets)
- More complex to maintain
- Babel transforms JSX to React.createElement, which react-live might not handle well
- Larger bundle size

## Recommendation

**Use Option 1** (Convert to Args-Based Stories) for the following reasons:

1. ✅ **Simpler and more maintainable**
2. ✅ **Already working in your codebase** (Primary, Secondary stories work)
3. ✅ **Follows Storybook conventions**
4. ✅ **No additional dependencies**
5. ✅ **Better for documentation** (clearer props, easier to understand)

**Keep function-based stories only for:**
- Complex demos showing multiple variants together (e.g., `Sizes`, `States`, `IconPositions`)
- Interactive demos with state management (e.g., `InteractiveDemo`, `Controlled`)

These consolidated demos are valuable for developers to see all options at once, and the syntax errors can be fixed by improving the transpilation for just these specific cases.

## Summary

**The syntax errors occur because:**
1. Function-based story exports require TypeScript-to-JavaScript transpilation
2. The current transpiler uses fragile regex-based type stripping
3. The transpilation fails for complex syntax, creating malformed JavaScript
4. React-live can't execute the malformed code and throws errors

**The fix is:**
- Convert individual variant stories to args-based format
- Keep function-based stories only for consolidated multi-variant demos
- This eliminates most transpilation issues and follows best practices
