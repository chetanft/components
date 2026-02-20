"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../contexts/ThemeContext';
import { SegmentedTabs } from '../SegmentedTabs/SegmentedTabs';
import type { SegmentedTabItem } from '../SegmentedTabs/SegmentedTabs';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

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
  const resolvedGlass = useResolvedGlass(glass);

  const themeItems: SegmentedTabItem[] = [
    {
      label: showLabels ? 'Light' : '☀️',
      value: 'light'
    },
    {
      label: showLabels ? 'Dark' : '🌙',
      value: 'dark'
    },
    {
      label: showLabels ? 'Night' : '🌃',
      value: 'night'
    }
  ];

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === 'light' || newTheme === 'dark' || newTheme === 'night') {
      setTheme(newTheme);
    }
  };

  if (variant === 'segmented') {
    return (
      <SegmentedTabs
        items={themeItems}
        value={theme}
        onChange={handleThemeChange}
        className={cn(getGlassClasses(resolvedGlass, '', ''), className)}
      />
    );
  }

  // Future: Could add dropdown variant here
  return null;
};

export default ThemeSwitch; 