"use client";

import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Theme = 'light' | 'dark' | 'night' | 'origin-ui';
export type ThemeInput = Theme | 'system';
export type GlassMode = false | 'subtle' | true | 'prominent' | 'liquid';

export interface FTProviderProps {
  /**
   * Child components to wrap
   */
  children: React.ReactNode;

  /**
   * Theme mode to use. Pass `'system'` to follow the OS preference.
   * @default 'system'
   */
  theme?: ThemeInput;

  /**
   * Glassmorphism mode
   * @default false
   */
  glass?: GlassMode;

  /**
   * Whether to automatically inject CSS
   * When true, injects styles via a <link> tag if not already present
   * @default true
   */
  injectCSS?: boolean;

  /**
   * CDN URL for CSS (used when injectCSS is true)
   * @default 'https://unpkg.com/ft-design-system@latest/dist/styles.css'
   */
  cssUrl?: string;

  /**
   * Additional class names to apply to the wrapper
   */
  className?: string;

  /**
   * localStorage key used to persist the theme
   * @default 'ft-theme'
   */
  themeStorageKey?: string;

  /**
   * localStorage key used to persist the glass mode
   * @default 'ft-glass-mode'
   */
  glassStorageKey?: string;
}

// ---------------------------------------------------------------------------
// Context value types
// ---------------------------------------------------------------------------

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isLight: boolean;
  isDark: boolean;
  isNight: boolean;
  isOriginUi: boolean;
}

export interface GlassContextType {
  glassMode: GlassMode;
  setGlassMode: (mode: GlassMode) => void;
}

export interface FTThemeContextType extends ThemeContextType, GlassContextType {}

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

const FTThemeContext = React.createContext<FTThemeContextType | undefined>(undefined);

// ---------------------------------------------------------------------------
// CSS injection helpers
// ---------------------------------------------------------------------------

function isCSSLoaded(): boolean {
  if (typeof document === 'undefined') return true;

  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  for (const sheet of stylesheets) {
    const href = sheet.getAttribute('href') || '';
    if (href.includes('ft-design-system') || href.includes('ftds')) {
      return true;
    }
  }

  const root = document.documentElement;
  const style = getComputedStyle(root);
  const primary = style.getPropertyValue('--primary').trim();
  return primary !== '';
}

function injectCSSLink(url: string): void {
  if (typeof document === 'undefined') return;
  if (isCSSLoaded()) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.id = 'ft-design-system-styles';
  document.head.appendChild(link);
}

// ---------------------------------------------------------------------------
// System theme helpers
// ---------------------------------------------------------------------------

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// ---------------------------------------------------------------------------
// Glass helpers
// ---------------------------------------------------------------------------

const GLASS_CLASSES = ['theme-glass', 'theme-glass-subtle', 'theme-glass-prominent', 'theme-glass-liquid'] as const;

function applyGlassClass(mode: GlassMode) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  html.classList.remove(...GLASS_CLASSES);
  if (mode === true) {
    html.classList.add('theme-glass');
  } else if (mode === 'subtle') {
    html.classList.add('theme-glass-subtle');
  } else if (mode === 'prominent') {
    html.classList.add('theme-glass-prominent');
  } else if (mode === 'liquid') {
    html.classList.add('theme-glass-liquid');
  }
}

function deserializeGlassMode(value: string | null): GlassMode {
  if (value === 'true') return true;
  if (value === 'subtle') return 'subtle';
  if (value === 'prominent') return 'prominent';
  if (value === 'liquid') return 'liquid';
  return false;
}

function serializeGlassMode(mode: GlassMode): string {
  if (mode === true) return 'true';
  if (mode === false) return 'false';
  return mode;
}

// ---------------------------------------------------------------------------
// FTProvider
// ---------------------------------------------------------------------------

/**
 * FT Design System Provider
 *
 * Unified provider that handles:
 * - Automatic CSS injection (optional)
 * - Theme management (light/dark/night/system) with localStorage persistence
 * - Glassmorphism mode with localStorage persistence
 * - Theme class on `<html>` element
 * - System theme detection and media-query listener
 *
 * @public
 *
 * @example
 * ```tsx
 * import { FTProvider } from 'ft-design-system';
 *
 * function App() {
 *   return (
 *     <FTProvider theme="system" glass="subtle">
 *       <YourApp />
 *     </FTProvider>
 *   );
 * }
 * ```
 */
export const FTProvider: React.FC<FTProviderProps> = ({
  children,
  theme: themeProp = 'system',
  glass: glassProp = false,
  injectCSS = true,
  cssUrl = 'https://unpkg.com/ft-design-system@latest/dist/styles.css',
  className,
  themeStorageKey = 'ft-theme',
  glassStorageKey = 'ft-glass-mode',
}) => {
  // ---- Theme state -------------------------------------------------------

  const [resolvedTheme, setResolvedTheme] = React.useState<Theme>(() => {
    // On the server (or first client render) use the prop directly to stay
    // deterministic with SSR.  localStorage is read in a post-mount effect.
    if (themeProp === 'system') return getSystemTheme();
    return themeProp;
  });

  // Whether the consumer chose 'system' — if so, we listen for OS changes.
  const [isSystemMode, setIsSystemMode] = React.useState(themeProp === 'system');

  // Hydrate from localStorage after mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(themeStorageKey) as Theme | null;
    if (stored && (stored === 'light' || stored === 'dark' || stored === 'night')) {
      setResolvedTheme(stored);
      setIsSystemMode(false);
    }
  }, [themeStorageKey]);

  // When the prop changes externally, respect it
  React.useEffect(() => {
    if (themeProp === 'system') {
      // Only switch to system if there is no persisted override
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(themeStorageKey);
        if (!stored) {
          setIsSystemMode(true);
          setResolvedTheme(getSystemTheme());
        }
      }
    } else {
      setIsSystemMode(false);
      setResolvedTheme(themeProp);
    }
  }, [themeProp, themeStorageKey]);

  // System media-query listener
  React.useEffect(() => {
    if (!isSystemMode) return;
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? 'dark' : 'light');
    };
    setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isSystemMode]);

  const setTheme = React.useCallback(
    (newTheme: Theme) => {
      setResolvedTheme(newTheme);
      setIsSystemMode(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem(themeStorageKey, newTheme);
        // Apply immediately to <html>
        const html = document.documentElement;
        html.classList.remove('light', 'dark', 'night', 'origin-ui');
        html.classList.add(newTheme);
        html.setAttribute('data-theme', newTheme);
      }
    },
    [themeStorageKey],
  );

  // Apply theme class to <html>
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;
    html.classList.remove('light', 'dark', 'night', 'origin-ui');
    html.classList.add(resolvedTheme);
    html.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  // ---- Glass state -------------------------------------------------------

  const [glassMode, setGlassModeState] = React.useState<GlassMode>(glassProp);

  // Hydrate glass from localStorage after mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(glassStorageKey);
    if (stored !== null) {
      setGlassModeState(deserializeGlassMode(stored));
    }
  }, [glassStorageKey]);

  // When glassProp changes externally, respect it (unless localStorage overrides)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(glassStorageKey);
      if (stored === null) {
        setGlassModeState(glassProp);
      }
    }
  }, [glassProp, glassStorageKey]);

  const setGlassMode = React.useCallback(
    (mode: GlassMode) => {
      setGlassModeState(mode);
      if (typeof window !== 'undefined') {
        localStorage.setItem(glassStorageKey, serializeGlassMode(mode));
        applyGlassClass(mode);
      }
    },
    [glassStorageKey],
  );

  // Apply glass class to <html>
  React.useEffect(() => {
    applyGlassClass(glassMode);
  }, [glassMode]);

  // ---- CSS injection -----------------------------------------------------

  React.useEffect(() => {
    if (injectCSS) injectCSSLink(cssUrl);
  }, [injectCSS, cssUrl]);

  // ---- Context value -----------------------------------------------------

  const contextValue = React.useMemo<FTThemeContextType>(
    () => ({
      theme: resolvedTheme,
      setTheme,
      isLight: resolvedTheme === 'light',
      isDark: resolvedTheme === 'dark',
      isNight: resolvedTheme === 'night',
      isOriginUi: resolvedTheme === 'origin-ui',
      glassMode,
      setGlassMode,
    }),
    [resolvedTheme, setTheme, glassMode, setGlassMode],
  );

  return (
    <FTThemeContext.Provider value={contextValue}>
      <div
        className={className}
        data-ft-design-system="true"
        data-ft-theme={resolvedTheme}
      >
        {children}
      </div>
    </FTThemeContext.Provider>
  );
};

FTProvider.displayName = 'FTProvider';

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * Unified hook — returns theme + glass state.
 */
/**
 * Default context value for when hooks are used outside FTProvider.
 * Uses DOM-based detection so components still respond to the actual theme class.
 */
const defaultContext: FTThemeContextType = {
  theme: 'light',
  setTheme: () => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('useFTTheme: setTheme called outside <FTProvider>. Wrap your app in <FTProvider> for theme switching.');
    }
  },
  get isLight() {
    if (typeof document === 'undefined') return true;
    return !document.documentElement.classList.contains('dark') && !document.documentElement.classList.contains('night') && !document.documentElement.classList.contains('origin-ui');
  },
  get isDark() {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  },
  get isNight() {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('night');
  },
  get isOriginUi() {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('origin-ui');
  },
  glassMode: false,
  setGlassMode: () => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('useFTTheme: setGlassMode called outside <FTProvider>. Wrap your app in <FTProvider> for glass mode.');
    }
  },
};

/**
 * Unified hook — returns theme + glass state.
 * Works safely outside FTProvider (returns DOM-based defaults with dev warnings).
 */
export function useFTTheme(): FTThemeContextType {
  const context = React.useContext(FTThemeContext);
  return context ?? defaultContext;
}

/**
 * Backward-compatible hook matching the old ThemeContext shape.
 */
export function useTheme(): ThemeContextType {
  const context = React.useContext(FTThemeContext);
  const resolved = context ?? defaultContext;
  const { theme, setTheme, isLight, isDark, isNight, isOriginUi } = resolved;
  return { theme, setTheme, isLight, isDark, isNight, isOriginUi };
}

/**
 * Backward-compatible hook matching the old GlassContext shape.
 */
export function useGlass(): GlassContextType {
  const context = React.useContext(FTThemeContext);
  const resolved = context ?? defaultContext;
  const { glassMode, setGlassMode } = resolved;
  return { glassMode, setGlassMode };
}

// ---------------------------------------------------------------------------
// Deprecated wrapper providers (backward compatibility)
// ---------------------------------------------------------------------------

/** @deprecated Use `<FTProvider>` instead. */
export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

/**
 * @deprecated Use `<FTProvider>` instead. This component wraps FTProvider for
 * backward compatibility only.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  storageKey = 'ft-theme',
}) => {
  return (
    <FTProvider theme={defaultTheme} themeStorageKey={storageKey} injectCSS={false}>
      {children}
    </FTProvider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';

/** @deprecated Use `<FTProvider>` instead. */
export interface GlassProviderProps {
  children: React.ReactNode;
  defaultGlass?: GlassMode;
  storageKey?: string;
}

/**
 * @deprecated Use `<FTProvider>` instead. This component wraps FTProvider for
 * backward compatibility only.
 */
export const GlassProvider: React.FC<GlassProviderProps> = ({
  children,
  defaultGlass = false,
  storageKey = 'ft-glass-mode',
}) => {
  return (
    <FTProvider glass={defaultGlass} glassStorageKey={storageKey} injectCSS={false}>
      {children}
    </FTProvider>
  );
};

GlassProvider.displayName = 'GlassProvider';

export default FTProvider;
