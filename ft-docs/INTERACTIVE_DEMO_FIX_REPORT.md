# Interactive Demo Fix - Status Report

## Problem
Interactive demos and function-based stories (like `Sizes`, `States`, `InteractiveDemo`) were not visible in the component documentation and were causing syntax errors like:
- "SyntaxError: Unexpected token (36:1)" on Checkbox page
- "SyntaxError: Unexpected token (80:1)" on Input page

## Root Cause
The `component-metadata.ts` extraction logic was attempting to extract and display function-based story exports like:
```typescript
export function Sizes() {
  const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'> = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  return (
    <div className="p-6 space-y-4">
      {sizes.map(size => (
        <div key={size}>
          <Input label={`Size: ${size.toUpperCase()}`} placeholder="Value" size={size} variant="default" />
        </div>
      ))}
    </div>
  );
}
```

The `ComponentPreview` component uses `react-live` to render code examples, which expects either:
1. Raw JSX (e.g., `<Button label="Click me" />`)
2. A complete function component definition

However, the extracted function bodies contained:
- TypeScript type annotations (`Array<'xs' | 'sm' | ...>`)
- Variable declarations (`const sizes = ...`)
- Return statements

When ComponentPreview tried to wrap this code for react-live, it created invalid JavaScript that couldn't parse.

## Attempted Fixes (All Failed)
1. **Wrapping in arrow function**: `() => { ...function body... }` - Still had syntax errors
2. **Wrapping in component definition**: `const Example = () => { ...body... }; <Example />` - Still failed
3. **Stripping TS types and return statements**: Basic regex to clean code - Still had issues
4. **Special handling in ComponentPreview**: Added logic to detect and wrap different code patterns - Still failed

All attempts failed because the extracted code was fundamentally incompatible with react-live's execution environment.

## Current Solution (TEMPORARY)
**Modified `/Users/user/Documents/components/ft-docs/src/lib/component-metadata.ts`** to **skip all function-based stories**.

The extraction logic now:
1. Detects if a story export is a function (either arrow function or function declaration)
2. Skips it entirely with `continue`
3. Only processes stories that use the `args` pattern:
   ```typescript
   export const Default: Story = {
     args: {
       label: 'Accept terms',
       size: 'md'
     }
   }
   ```

## Current State
✅ **Fixed**: Syntax errors are gone from component pages
❌ **Limitation**: Function-based stories are not displayed, including:
   - `InteractiveDemo` - interactive examples with useState
   - `Sizes` - all size variants in one view
   - `States` - all states in one view
   - `NormalStates`, `WithDescriptions`, `ErrorState`, `DisabledStates`, etc.

## What You'll See Now
- **Checkbox page**: Only shows "Default" example
- **Input page**: Only shows stories with `args` pattern (if any)
- **No syntax errors**: Pages render cleanly

## Next Steps for Full Fix
To properly support function-based stories, we need to:

### Option 1: Convert Stories to Args Pattern
Change all function-based stories in `.stories.tsx` files to use the `args` pattern:
```typescript
// Instead of:
export function Sizes() {
  return <div>...</div>
}

// Use:
export const SmallSize: Story = {
  args: {
    size: 'sm',
    label: 'Small checkbox'
  }
};

export const MediumSize: Story = {
  args: {
    size: 'md',
    label: 'Medium checkbox'
  }
};
```

### Option 2: Implement Proper Function Story Rendering
Create a new rendering mode in `ComponentPreview.tsx` that:
1. Detects function-based code
2. Strips TypeScript types completely (not just basic Array<>)
3. Transforms the code into a valid react-live component
4. Handles hooks like `useState` properly

This would require:
- A TypeScript-to-JavaScript transpiler (like Babel or SWC)
- Better code parsing to extract just the JSX return value
- Proper handling of React hooks in the react-live environment

### Recommendation
**Option 1 is simpler and more maintainable**. The `args` pattern is the standard Storybook approach and works perfectly with the current documentation system. Converting the function-based stories would take a few hours but result in a cleaner, more sustainable solution.

## Files Modified
- `/Users/user/Documents/components/ft-docs/src/lib/component-metadata.ts` - Added function export detection and skip logic
- `/Users/user/Documents/components/ft-docs/src/components/component-preview.tsx` - Reverted to original state (no custom handling needed with current approach)

## Testing
To verify the fix:
```bash
# Check Checkbox page (should have no errors, only "Default" example)
curl -s http://localhost:3000/docs/components/checkbox | grep  -i "syntaxerror"

# Check Input page (should have no errors)
curl -s http://localhost:3000/docs/components/input | grep -i "syntaxerror"
```

Both commands should return no output (no syntax errors found).
