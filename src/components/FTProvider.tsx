"use client";

import * as React from 'react';

/**
 * FT Design System Provider Props
 */
export interface FTProviderProps {
  /**
   * Child components to wrap
   */
  children: React.ReactNode;
  
  /**
   * Theme mode to use
   * @default 'light'
   */
  theme?: 'light' | 'dark' | 'night' | 'system';
  
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
}

/**
 * Check if CSS is already loaded
 */
function isCSSLoaded(): boolean {
  if (typeof document === 'undefined') return true;
  
  // Check for existing stylesheet
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  for (const sheet of stylesheets) {
    const href = sheet.getAttribute('href') || '';
    if (href.includes('ft-design-system') || href.includes('ftds')) {
      return true;
    }
  }
  
  // Check for CSS variables being defined
  const root = document.documentElement;
  const style = getComputedStyle(root);
  const primary = style.getPropertyValue('--primary').trim();
  
  return primary !== '';
}

/**
 * Inject CSS dynamically
 */
function injectCSSLink(url: string): void {
  if (typeof document === 'undefined') return;
  if (isCSSLoaded()) return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.id = 'ft-design-system-styles';
  document.head.appendChild(link);
}

/**
 * Get system theme preference
 */
function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * FT Design System Provider
 * 
 * Wraps your application to provide:
 * - Automatic CSS injection (optional)
 * - Theme management (light/dark/night/system)
 * - Design system context
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Basic usage - handles CSS automatically
 * import { FTProvider } from 'ft-design-system';
 * 
 * function App() {
 *   return (
 *     <FTProvider>
 *       <YourApp />
 *     </FTProvider>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // With theme and custom CSS URL
 * import { FTProvider } from 'ft-design-system';
 * 
 * function App() {
 *   return (
 *     <FTProvider 
 *       theme="dark" 
 *       injectCSS={true}
 *       cssUrl="/styles/ft-design-system.css"
 *     >
 *       <YourApp />
 *     </FTProvider>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // System theme (auto light/dark)
 * <FTProvider theme="system">
 *   <YourApp />
 * </FTProvider>
 * ```
 * 
 * @remarks
 * - If you've already imported the CSS, set `injectCSS={false}`
 * - The provider adds theme class to wrapper div for CSS variable switching
 * - Use `theme="system"` to automatically follow user's OS preference
 */
export const FTProvider: React.FC<FTProviderProps> = ({
  children,
  theme = 'light',
  injectCSS = true,
  cssUrl = 'https://unpkg.com/ft-design-system@latest/dist/styles.css',
  className,
}) => {
  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark' | 'night'>(() => {
    if (theme === 'system') {
      return getSystemTheme();
    }
    return theme;
  });
  
  // Inject CSS on mount
  React.useEffect(() => {
    if (injectCSS) {
      injectCSSLink(cssUrl);
    }
  }, [injectCSS, cssUrl]);
  
  // Handle system theme changes
  React.useEffect(() => {
    if (theme !== 'system') {
      setResolvedTheme(theme);
      return;
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? 'dark' : 'light');
    };
    
    // Set initial value
    setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);
  
  // Apply theme class to html element for global CSS variable switching
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const html = document.documentElement;
    
    // Remove all theme classes
    html.classList.remove('light', 'dark', 'night');
    
    // Add current theme class
    if (resolvedTheme !== 'light') {
      html.classList.add(resolvedTheme);
    }
    
    // Set data attribute for CSS selectors
    html.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);
  
  return (
    <div 
      className={className}
      data-ft-design-system="true"
      data-ft-theme={resolvedTheme}
    >
      {children}
    </div>
  );
};

FTProvider.displayName = 'FTProvider';

/**
 * Hook to access current theme
 */
export function useFTTheme() {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'night'>('light');
  
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') as 'light' | 'dark' | 'night' || 'light';
    setTheme(currentTheme);
    
    // Watch for changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = html.getAttribute('data-theme') as 'light' | 'dark' | 'night' || 'light';
          setTheme(newTheme);
        }
      }
    });
    
    observer.observe(html, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  return theme;
}

export default FTProvider;
