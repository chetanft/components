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
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey) as Theme;
      return stored || defaultTheme;
    }
    return defaultTheme;
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
      // Remove all theme classes first, then add the new one
      document.documentElement.classList.remove('light', 'dark', 'night');
      document.documentElement.classList.add(newTheme);
    }
  };

  useEffect(() => {
    // Remove all theme classes first, then add the current one
    document.documentElement.classList.remove('light', 'dark', 'night');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark',
    isNight: theme === 'night',
  };

  return (
    <ThemeContext.Provider value={value}>
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