"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../contexts/ThemeContext';
import { SegmentedTabs, SegmentedTabItem } from '../SegmentedTabs/SegmentedTabs';
import { type GlassVariant } from '../../../lib/glass';

export interface ThemeSwitchProps {
  className?: string;
  variant?: 'segmented' | 'dropdown';
  showLabels?: boolean;
  /** Glass morphism variant */
  glass?: GlassVariant;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  className,
  variant = 'segmented',
  showLabels = true,
  glass
}) => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === 'light' || newTheme === 'dark' || newTheme === 'night') {
      setTheme(newTheme);
    }
  };

  if (variant === 'segmented') {
    return (
      <SegmentedTabs
        value={theme}
        onChange={handleThemeChange}
        className={cn(className)}
      >
        <SegmentedTabItem value="light">{showLabels ? 'Light' : '☀️'}</SegmentedTabItem>
        <SegmentedTabItem value="dark">{showLabels ? 'Dark' : '🌙'}</SegmentedTabItem>
        <SegmentedTabItem value="night">{showLabels ? 'Night' : '🌃'}</SegmentedTabItem>
      </SegmentedTabs>
    );
  }

  // Future: Could add dropdown variant here
  return null;
};

export default ThemeSwitch; 