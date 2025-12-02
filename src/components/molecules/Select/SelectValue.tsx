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
  const { value, selectedLabel } = useSelectContext();

  return (
    <span className={cn(
      selectedLabel || value ? "text-[var(--primary)]" : "text-[var(--tertiary)]",
      "text-md-rem",
      className
    )}>
      {selectedLabel || value || placeholder}
    </span>
  );
};

SelectValue.displayName = 'SelectValue';

