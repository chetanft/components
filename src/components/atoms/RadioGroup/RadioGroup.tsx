"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../Typography';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  options?: RadioOption[];
  onChange?: (value: string) => void;
  className?: string;
  size?: 'sm' | 'md';
  orientation?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  defaultValue,
  options = [],
  onChange,
  className,
  size = 'md',
  orientation = 'vertical',
  children,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (optionValue: string) => {
    if (value === undefined) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
  };

  // Ensure options is always an array
  // Handle edge cases: undefined, null, or non-array values
  let optionsArray: RadioOption[] = [];
  if (Array.isArray(options)) {
    optionsArray = options;
  } else if (options && typeof options === 'object' && 'length' in options) {
    // Handle array-like objects
    optionsArray = Array.from(options as any);
  }

  // If using legacy children pattern, render children instead
  if (children && (!optionsArray || optionsArray.length === 0)) {
    return (
      <div className={cn("flex flex-col gap-4", className)} role="radiogroup">
        {children}
      </div>
    );
  }

  // If no options provided and no children, render empty state
  if (!optionsArray || optionsArray.length === 0) {
    return null;
  }

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
    <div className={groupStyles} role="radiogroup">
      {optionsArray.map((option) => {
        const isSelected = currentValue === option.value;
        const isDisabled = option.disabled;

        // Radio button styles using exact Figma specifications
        const radioStyles = cn(
          // Base styles
          "relative shrink-0 rounded-full border-2 transition-all duration-200 cursor-pointer",
          // Size
          currentSize.radio,
          // State styles with explicit colors for visibility
          isDisabled
            ? "bg-transparent border-[#ced1d7] cursor-not-allowed opacity-50"
            : isSelected
            ? "bg-transparent border-[#434f64] hover:bg-[#f0f1f7] hover:border-[#434f64]"
            : "bg-transparent border-[#838c9d] hover:border-[#434f64]",
          // Focus styles
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-[#434f64] focus-within:ring-offset-2"
        );

        // Container styles for each radio option
        const optionStyles = cn(
          "inline-flex items-center",
          currentSize.gap
        );

        return (
          <label key={option.value} className={optionStyles}>
            <div className="relative">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => handleChange(option.value)}
                className="sr-only"
              />
              <div className={radioStyles}>
                {/* Radio dot */}
                {isSelected && !isDisabled && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div 
                      className={cn(
                        "rounded-full bg-[#434f64]", // --primary
                        currentSize.dot
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
            {option.label && (
              <Typography
                variant={currentSize.variant}
                color={getLabelColor(!!isDisabled)}
                as="span"
                className={isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
              >
                {option.label}
              </Typography>
            )}
          </label>
        );
      })}
    </div>
  );
};

// Legacy compatibility exports
export const RadioGroupItem = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => {
  console.warn('RadioGroupItem is deprecated. Use RadioGroup with options prop instead.');
  return <div {...props}>{children}</div>;
};

RadioGroup.displayName = 'RadioGroup'; 