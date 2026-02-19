import { cn } from './utils';
import { useState, useEffect } from 'react';

export type GlassVariant = boolean | 'subtle' | 'prominent';

/**
 * Returns the appropriate CSS class(es) for a glass prop value.
 * When glass is falsy, returns the solid background + border classes.
 * When glass is truthy, returns the corresponding glass utility class.
 */
export function getGlassClasses(
  glass: GlassVariant | undefined,
  solidBg: string = 'bg-[var(--bg-primary)]',
  solidBorder: string = 'border border-[var(--border-secondary)]'
): string {
  if (!glass) return cn(solidBg, solidBorder);
  if (glass === 'subtle') return 'glass-subtle';
  if (glass === 'prominent') return 'glass-prominent';
  return 'glass';
}

/**
 * Reads the global glass mode from <html> class list.
 * Returns the GlassVariant if a theme-glass* class is present, undefined otherwise.
 */
function getGlobalGlassFromDOM(): GlassVariant | undefined {
  if (typeof document === 'undefined') return undefined;
  const html = document.documentElement;
  if (html.classList.contains('theme-glass-prominent')) return 'prominent';
  if (html.classList.contains('theme-glass-subtle')) return 'subtle';
  if (html.classList.contains('theme-glass')) return true;
  return undefined;
}

/**
 * Resolves the effective glass variant for a component.
 * Component prop takes priority over global glass mode (read from <html> classes).
 * Works without GlassProvider (backward compatible — reads DOM directly).
 */
export function useResolvedGlass(propGlass?: GlassVariant): GlassVariant | undefined {
  const [globalGlass, setGlobalGlass] = useState<GlassVariant | undefined>(() => getGlobalGlassFromDOM());

  useEffect(() => {
    // Sync on mount
    setGlobalGlass(getGlobalGlassFromDOM());

    // Watch for class changes on <html>
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setGlobalGlass(getGlobalGlassFromDOM());
    });
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return propGlass ?? globalGlass;
}

/**
 * Returns background classes for inner surface elements (menu items, list rows, etc.)
 * that sit inside a glass container. When glass is active, inner elements use transparent
 * backgrounds so the glass effect shows through. When glass is off, they use their normal
 * opaque backgrounds.
 *
 * @param glass - The resolved glass variant (from useResolvedGlass)
 * @param solidBg - Opaque background class(es) used when glass is off
 * @param glassBg - Transparent/translucent class(es) used when glass is on (default: 'bg-transparent')
 */
export function getGlassInnerBg(
  glass: GlassVariant | undefined,
  solidBg: string,
  glassBg: string = 'bg-transparent'
): string {
  return glass ? glassBg : solidBg;
}

/**
 * Returns state-layer classes (hover, selected, active) appropriate for glass mode.
 * In glass mode, uses translucent white/black overlays instead of opaque theme colors.
 *
 * @param glass - The resolved glass variant
 * @param solidClass - Opaque class(es) used when glass is off (e.g. 'bg-[var(--color-bg-secondary)]')
 * @param glassClass - Translucent class used when glass is on (default: 'bg-white/10 dark:bg-white/10')
 */
export function getGlassStateLayer(
  glass: GlassVariant | undefined,
  solidClass: string,
  glassClass: string = 'bg-white/10 dark:bg-white/10'
): string {
  return glass ? glassClass : solidClass;
}
