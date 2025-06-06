"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

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

  // If using legacy children pattern, render children instead
  if (children && (!options || options.length === 0)) {
    return (
      <div className={cn("flex flex-col gap-4", className)} role="radiogroup">
        {children}
      </div>
    );
  }

  // Size styles - exact Figma specifications
  const sizeStyles = {
    sm: {
      radio: "w-[16px] h-[16px]",
      dot: "w-[6px] h-[6px]",
      gap: "gap-[6px]",
      text: "text-[12px]",
      groupGap: "gap-[12px]"
    },
    md: {
      radio: "w-[var(--radio-size)] h-[var(--radio-size)]", // 20px from Figma
      dot: "w-[10px] h-[10px]", // 10px inner dot from Figma
      gap: "gap-[var(--radio-gap)]", // 8px spacing
      text: "text-[14px]", // 14px font size from Figma
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

  // Font styling for consistent design system
  const getLabelColor = (isSelected: boolean, isDisabled: boolean) => {
    if (isDisabled) return "#ced1d7"; // var(--radio-disabled-label)
    return isSelected ? "#434f64" : "#434f64"; // var(--radio-selected-label) for both states
  };

  const labelStyle = {
    fontWeight: "500", // Medium weight matching checkbox pattern
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  };

  return (
    <div className={groupStyles} role="radiogroup">
      {options.map((option) => {
        const isSelected = currentValue === option.value;
        const isDisabled = option.disabled;

        // Radio button styles using exact Figma specifications
        const radioStyles = cn(
          // Base styles
          "relative shrink-0 rounded-full border-2 transition-all duration-200 cursor-pointer",
          // Size
          currentSize.radio,
          // State styles using exact Figma colors - direct color values for reliability
          isDisabled
            ? "bg-transparent border-[#ced1d7] cursor-not-allowed"
            : isSelected
            ? "bg-transparent border-[#434f64] hover:bg-[#ced1d7] hover:border-[#434f64]"
            : "bg-transparent border-[#838c9d] hover:bg-[#ced1d7] hover:border-[#838c9d]",
          // Focus styles
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-[#434f64] focus-within:ring-offset-2"
        );

        // Label styles using exact Figma specifications
        const labelStyles = cn(
          "leading-[1.4] cursor-pointer", // Remove font-weight from class, use inline style
          currentSize.text,
          isDisabled
            ? "cursor-not-allowed"
            : ""
        );

        // Container styles for each radio option
        const optionStyles = cn(
          "inline-flex items-center",
          currentSize.gap
        );

        // Individual label style with proper color
        const individualLabelStyle = {
          ...labelStyle,
          color: getLabelColor(isSelected, !!isDisabled),
        };

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
                {/* Radio dot - exact Figma color and positioning */}
                {isSelected && !isDisabled && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div 
                      className={cn(
                        "rounded-full bg-[#434f64]", // Direct color value
                        currentSize.dot
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
            {option.label && (
              <span className={labelStyles} style={individualLabelStyle}>
                {option.label}
              </span>
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