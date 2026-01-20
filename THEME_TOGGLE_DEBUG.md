# Theme Toggle Debug Guide

## Issue
Theme toggle button exists but colors aren't changing in dark/night mode.

## Root Cause
The docs CSS variables reference FT design tokens, but the cascade wasn't working correctly because:
1. Both main `globals.css` and docs `globals.css` define variables with `.dark` and `.night` selectors
2. The docs variables were trying to reference FT tokens that hadn't updated yet

## Solution Applied

### 1. Fixed CSS Variable Cascade
Updated `ft-docs/src/app/globals.css` to properly reference FT tokens that update automatically:

**Dark Mode:**
- Changed from hardcoded token references to semantic FT tokens
- `--docs-background: var(--bg-secondary)` (was `var(--primary-900)`)
- `--docs-card: var(--bg-primary)` (was `var(--primary-800)`)
- All other variables now reference base FT tokens

**Night Mode:**
- Already using correct FT token references
- Will automatically update when `.night` class is applied

### 2. Theme Toggle Implementation
The theme toggle button is in `site-header.tsx` (lines 315-331):
- Uses `useTheme()` from next-themes
- Cycles through: light → dark → night
- Shows Sun/Moon/MoonStar icons
- Manually applies classes as fallback

## Testing Steps

1. **Check if button is visible:**
   - Look in the header next to the search box
   - Should see a Sun icon (light mode)

2. **Click the button:**
   - First click: Should switch to dark mode (Moon icon)
   - Second click: Should switch to night mode (MoonStar icon)
   - Third click: Back to light mode (Sun icon)

3. **Verify colors change:**
   - Background should change from white → dark gray → black
   - Text should change from dark → light → white
   - All UI elements should adapt

## If Still Not Working

### Check Browser Console
Open DevTools and check:
```javascript
// Check if class is applied
document.documentElement.className

// Check localStorage
localStorage.getItem('theme')

// Check computed styles
getComputedStyle(document.documentElement).getPropertyValue('--docs-background')
getComputedStyle(document.documentElement).getPropertyValue('--primary')
```

### Manual Test
Run in browser console:
```javascript
// Force dark mode
document.documentElement.classList.remove('light', 'dark', 'night')
document.documentElement.classList.add('dark')
localStorage.setItem('theme', 'dark')

// Check if colors changed
getComputedStyle(document.body).backgroundColor
```

### Check CSS Loading
1. Open DevTools → Network tab
2. Refresh page
3. Verify both CSS files load:
   - `globals.css` (main FT design system)
   - `globals.css` (docs-specific)

### Verify Theme Provider
Check that ThemeProvider is wrapping the app:
- Should be in `layout.tsx`
- Should have `themes={['light', 'dark', 'night']}`
- Should have `attribute="class"`

## Common Issues

### Issue: Button not visible
**Solution:** Check if `mounted` state is true. Button is disabled until component mounts.

### Issue: Button visible but not clickable
**Solution:** Check browser console for JavaScript errors.

### Issue: Button clicks but nothing happens
**Solution:** 
1. Check if `setTheme` is being called
2. Check if localStorage is updating
3. Check if HTML class is being applied

### Issue: Class applied but colors don't change
**Solution:** 
1. Verify CSS files are loading
2. Check CSS variable cascade in DevTools
3. Ensure FT design tokens are defined for `.dark` and `.night`

## Files Modified

1. `ft-docs/src/components/site-header.tsx` - Theme toggle button
2. `ft-docs/src/app/layout.tsx` - ThemeProvider setup
3. `ft-docs/src/app/globals.css` - Fixed CSS variable references
4. `ft-docs/src/app/colors/page.tsx` - Fixed hardcoded colors
5. `ft-docs/src/app/icons/page.tsx` - Fixed hardcoded colors
6. `ft-docs/src/app/blocks/page.tsx` - Fixed hardcoded colors
