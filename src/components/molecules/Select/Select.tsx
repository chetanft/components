"use client";

import React from 'react';
import { SelectContextProvider } from './SelectContext';
import type { GlassVariant } from '../../../lib/glass';

export interface SelectProps {
  /**
   * Selected value
   */
  value?: string;

  /**
   * Callback when value changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Select content
   */
  children: React.ReactNode;

  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string;

  /**
   * Apply glassmorphism effect
   */
  glass?: GlassVariant;
}

/**
 * Select Component
 * 
 * Shadcn-compatible composable select component.
 * Provides context for SelectTrigger, SelectValue, SelectContent, and SelectItem components.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Select value={value} onValueChange={setValue}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select option" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="1">Option 1</SelectItem>
 *     <SelectItem value="2">Option 2</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  children,
  defaultValue,
  glass,
}) => {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = React.useCallback((newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  }, [isControlled, onValueChange]);

  return (
    <SelectContextProvider
      value={currentValue}
      onValueChange={handleValueChange}
      glass={glass}
    >
      {children}
    </SelectContextProvider>
  );
};

Select.displayName = 'Select';
