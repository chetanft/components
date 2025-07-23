import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'night';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isLight: boolean;
  isDark: boolean;
  isNight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  storageKey = 'ft-theme'
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Try to load theme from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey) as Theme;
      if (stored && ['light', 'dark', 'night'].includes(stored)) {
        return stored;
      }
    }
    return defaultTheme;
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'night');
    
    // Add current theme class
    root.classList.add(theme);
    
    // For dark mode compatibility, also add 'dark' class when night mode is active
    if (theme === 'night') {
      root.classList.add('dark');
    }
  }, [theme]);

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark',
    isNight: theme === 'night',
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export types
export type { ThemeContextType, ThemeProviderProps }; 