"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../Typography';
import { RadioGroupProvider } from './RadioGroupContext';
import { RadioGroupLabel } from './RadioGroupLabel';
import { RadioItem } from './RadioItem';
import { RadioItemInput } from './RadioItemInput';
import { RadioItemLabel } from './RadioItemLabel';
import { RadioGroupHelper } from './RadioGroupHelper';
import { RadioGroupError } from './RadioGroupError';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

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
   * Options array (for declarative API)
   * @deprecated Use RadioItem components instead
   */
  options?: RadioOption[];
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
  /**
   * Error state (for declarative API)
   * @deprecated Use RadioGroupError component instead
   */
  error?: boolean;
  /**
   * Helper text (for declarative API)
   * @deprecated Use RadioGroupHelper component instead
   */
  helperText?: string;
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
 * // Declarative API (deprecated)
 * <RadioGroup name="choice" options={options} value={value} onChange={setValue} />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (RadioItem, RadioItemInput, RadioItemLabel, etc.) support `asChild`
 * - Supports controlled and uncontrolled modes
 * - Automatically generates accessible IDs for labels and error messages
 * - Accessible: includes ARIA attributes and keyboard navigation
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({
  name,
  value,
  defaultValue,
  options = [],
  onChange,
  onValueChange,
  className,
  size = 'md',
  orientation = 'vertical',
  disabled = false,
  error = false,
  helperText,
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

  // Check if using composable API (has children with RadioGroup sub-components)
  const hasComposableChildren = React.Children.toArray(children).some((child: any) =>
    child?.type?.displayName?.startsWith('Radio')
  );

  // If using composable API, wrap with context provider
  if (hasComposableChildren) {
    // Show deprecation warning if using old props with composable API
    if (process.env.NODE_ENV !== 'production' && (options.length > 0 || error || helperText)) {
      console.warn(
        'RadioGroup: Using deprecated props (options, error, helperText) with composable API. ' +
        'Please use RadioItem, RadioItemInput, RadioItemLabel, RadioGroupError, RadioGroupHelper components instead. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }

    const generatedId = React.useId();
    const helperId = helperText ? `radiogroup-${generatedId}-helper` : undefined;
    const errorId = error ? `radiogroup-${generatedId}-error` : undefined;

    return (
      <RadioGroupProvider
        value={{
          name,
          value: currentValue,
          onChange: handleValueChange,
          size,
          orientation,
          disabled,
          hasError: !!error,
          helperId,
          errorId,
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
  }

  // Otherwise use declarative API (deprecated)
  if (process.env.NODE_ENV !== 'production' && options.length > 0) {
    console.warn(
      'RadioGroup: Declarative API (options prop) is deprecated. ' +
      'Please migrate to composable API using RadioItem, RadioItemInput, RadioItemLabel components. ' +
      'See migration guide: docs/migrations/composable-migration.md'
    );
  }

  // Ensure options is always an array
  let optionsArray: RadioOption[] = [];
  if (Array.isArray(options)) {
    optionsArray = options;
  } else if (options && typeof options === 'object' && 'length' in options) {
    optionsArray = Array.from(options as any);
  }

  // If no options provided and no children, render empty state
  if (!optionsArray || optionsArray.length === 0) {
    if (children) {
      const generatedId = React.useId();
      const helperId = helperText ? `radiogroup-${generatedId}-helper` : undefined;
      const errorId = error ? `radiogroup-${generatedId}-error` : undefined;

      return (
        <RadioGroupProvider
          value={{
            name,
            value: currentValue,
            onChange: handleValueChange,
            size,
            orientation,
            disabled,
            hasError: !!error,
            helperId,
            errorId,
          }}
        >
          <div className={cn("flex flex-col gap-4", className)} role="radiogroup">
            {children}
          </div>
        </RadioGroupProvider>
      );
    }
    return null;
  }

  const generatedId = React.useId();
  const helperId = helperText ? `radiogroup-${generatedId}-helper` : undefined;
  const errorId = error ? `radiogroup-${generatedId}-error` : undefined;

  // Size styles - exact Figma specifications
  const sizeStyles = {
    sm: {
      radio: "w-[16px] h-[16px]",
      dot: "w-[6px] h-[6px]",
      gap: "gap-[6px]",
      variant: "body-secondary-regular" as const, // 12px → 14px closest
      groupGap: "gap-[12px]"
    },
    md: {
      radio: "w-[var(--radio-size)] h-[var(--radio-size)]", // 20px from Figma
      dot: "w-[10px] h-[10px]", // 10px inner dot from Figma
      gap: "gap-[var(--radio-gap)]", // 8px spacing
      variant: "body-secondary-medium" as const, // 14px font size from Figma
      groupGap: "gap-[16px]"
    }
  };

  const currentSize = sizeStyles[size];

  // Container styles
  const groupStyles = cn(
    "flex",
    orientation === 'horizontal' ? `flex-row ${currentSize.groupGap}` : `flex-col ${currentSize.groupGap}`,
    className
  );

  // Get Typography color variant based on state
  const getLabelColor = (isDisabled: boolean) => {
    if (isDisabled) return 'muted';
    return 'primary';
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
        hasError: !!error,
        helperId,
        errorId,
      }}
    >
      <div className={groupStyles} role="radiogroup">
        {optionsArray.map((option) => (
          <RadioItem key={option.value} value={option.value} disabled={option.disabled}>
            <RadioItemInput />
            {option.label && <RadioItemLabel>{option.label}</RadioItemLabel>}
          </RadioItem>
        ))}
        {error && <RadioGroupError>Please select an option</RadioGroupError>}
        {helperText && !error && <RadioGroupHelper>{helperText}</RadioGroupHelper>}
      </div>
    </RadioGroupProvider>
  );
});

// Legacy compatibility exports
export const RadioGroupItem = ({ children, ...props }: { children?: React.ReactNode;[key: string]: any }) => {
  console.warn('RadioGroupItem is deprecated. Use RadioGroup with options prop instead.');
  return <div {...props}>{children}</div>;
};

RadioGroup.displayName = 'RadioGroup'; 