"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { useSelectContext } from './SelectContext';

export interface SelectValueProps {
  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string;
  
  /**
   * Custom className
   */
  className?: string;
}

/**
 * SelectValue Component
 * 
 * Shadcn-compatible select value display component.
 * Shows the selected value or placeholder.
 * 
 * @public
 */
export const SelectValue: React.FC<SelectValueProps> = ({
  placeholder = 'Select an option',
  className
}) => {
  const { value, selectedLabel, size = 'md' } = useSelectContext();

  // Map size to responsive font size classes (matching SelectTrigger's sizeStyles)
  const fontSizeMap: Record<string, string> = {
    xxs: 'text-xs-rem',
    xs: 'text-xs-rem',
    sm: 'text-sm-rem',
    md: 'text-md-rem',
    lg: 'text-md-rem',
    xl: 'text-md-rem',
    xxl: 'text-lg-rem',
  };

  return (
    <span className={cn(
      selectedLabel || value ? "text-[var(--primary)]" : "text-[var(--tertiary)]",
      fontSizeMap[size] || fontSizeMap.md,
      className
    )}>
      {selectedLabel || value || placeholder}
    </span>
  );
};

SelectValue.displayName = 'SelectValue';

