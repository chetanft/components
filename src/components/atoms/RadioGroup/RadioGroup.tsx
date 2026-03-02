"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { RadioGroupProvider } from './RadioGroupContext';

export interface RadioGroupProps {
  /**
   * Radio group name (required for form submission)
   */
  name: string;
  /**
   * Controlled value
   */
  value?: string;
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string;
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void;
  /**
   * Callback when value changes (alias for onChange)
   */
  onValueChange?: (value: string) => void;
  /**
   * Radio group content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Radio group size
   * @default 'md'
   */
  size?: 'sm' | 'md';
  /**
   * Orientation of radio items
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Disable all radio items
   * @default false
   */
  disabled?: boolean;
}

/**
 * RadioGroup Component
 * 
 * A versatile radio group component that allows users to select one option from a set.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <RadioGroup name="choice" value={value} onValueChange={setValue} size="md">
 *   <RadioGroupLabel>Select an option</RadioGroupLabel>
 *   <RadioItem value="option1">
 *     <RadioItemInput />
 *     <RadioItemLabel>Option 1</RadioItemLabel>
 *   </RadioItem>
 *   <RadioItem value="option2">
 *     <RadioItemInput />
 *     <RadioItemLabel>Option 2</RadioItemLabel>
 *   </RadioItem>
 *   <RadioGroupError>Please select an option</RadioGroupError>
 * </RadioGroup>
 * 
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (RadioItem, RadioItemInput, RadioItemLabel, etc.) support `asChild`
 * - Supports controlled and uncontrolled modes
 * - Automatically generates accessible IDs for labels and error messages
 * - Accessible: includes ARIA attributes and keyboard navigation
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({
  name,
  value,
  defaultValue,
  onChange,
  onValueChange,
  className,
  size = 'md',
  orientation = 'vertical',
  disabled = false,
  children,
}, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const currentValue = value !== undefined ? value : internalValue;
  const handleChange = onValueChange || onChange;

  const handleValueChange = (optionValue: string) => {
    if (value === undefined) {
      setInternalValue(optionValue);
    }
    handleChange?.(optionValue);
  };

  return (
    <RadioGroupProvider
      value={{
        name,
        value: currentValue,
        onChange: handleValueChange,
        size,
        orientation,
        disabled,
        hasError: false,
        helperId: undefined,
        errorId: undefined,
      }}
    >
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === 'horizontal' ? "flex-row gap-[var(--spacing-x4)]" : "flex-col gap-[var(--spacing-x4)]",
          className
        )}
        role="radiogroup"
      >
        {children}
      </div>
    </RadioGroupProvider>
  );
});

// Legacy compatibility exports
export const RadioGroupItem = ({ children, ...props }: { children?: React.ReactNode;[key: string]: any }) => {
    return <div {...props}>{children}</div>;
};

RadioGroup.displayName = 'RadioGroup'; 