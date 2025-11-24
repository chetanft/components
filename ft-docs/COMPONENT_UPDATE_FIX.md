# Component Update Fix - Next.js Configuration

## Problem
When updating components in `src/components/` (which builds the npm package), the docs site breaks because:
1. **Next.js doesn't watch parent directories** by default
2. **Next.js doesn't transpile parent directories** automatically
3. **File system events** may not trigger rebuilds for parent directory changes
4. **TypeScript compilation** may not include parent directory files

## Solution Implemented

### 1. Updated `next.config.ts`
- ✅ Added `webpack.watchOptions` to watch parent `src/` directory
- ✅ Added polling (1000ms) to detect file changes reliably
- ✅ Added parent directory to module resolution paths
- ✅ Configured to watch for changes in `../src/`

### 2. Updated `tsconfig.json`
- ✅ Added `../src/**/*.ts` and `../src/**/*.tsx` to `include` array
- ✅ Ensures TypeScript compiles parent directory files
- ✅ Proper type checking for components imported from `../../src`

## How It Works

### Before
```
Component Update in src/components/Button.tsx
  ↓
Next.js doesn't detect change (not watching parent)
  ↓
Docs shows old/cached version
  ↓
Errors occur
```

### After
```
Component Update in src/components/Button.tsx
  ↓
Next.js detects change (watching parent with polling)
  ↓
Next.js recompiles parent directory files
  ↓
Docs updates automatically
  ↓
No errors
```

## Configuration Details

### Webpack Watch Options
- **Polling**: Checks for changes every 1000ms
- **Ignored**: Only ignores `node_modules` and `.next`, watches everything else
- **Module Resolution**: Includes parent `src/` directory

### TypeScript Include
- Includes all `.ts` and `.tsx` files from `../src/`
- Ensures proper type checking and compilation

## Testing

After updating a component:
1. Edit `src/components/Button/Button.tsx`
2. Save the file
3. Docs should automatically reload with changes
4. No manual restart needed

## Troubleshooting

If changes still don't appear:

1. **Clear Next.js cache**:
   ```bash
   cd ft-docs
   rm -rf .next
   npm run dev
   ```

2. **Check file watching**:
   - Ensure you're saving files (not just editing)
   - Check console for webpack compilation messages

3. **Manual restart**:
   ```bash
   # Stop dev server (Ctrl+C)
   npm run dev
   ```

4. **Verify paths**:
   - Ensure `registry.tsx` imports from `../../src`
   - Check that component files exist in `src/components/`

## Benefits

✅ **Automatic Updates**: Component changes appear in docs immediately  
✅ **No Manual Restart**: Dev server picks up changes automatically  
✅ **Type Safety**: TypeScript properly checks parent directory files  
✅ **Reliable**: Polling ensures changes are detected even if file system events fail  

