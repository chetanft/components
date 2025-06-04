"use client";

import React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from '../Icons';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  indeterminate?: boolean;
  size?: 'sm' | 'md';
  variant?: 'on-light' | 'on-dark';
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, indeterminate, size = 'md', variant = 'on-light', disabled, ...props }, ref) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null);
    
    React.useImperativeHandle(ref, () => checkboxRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

    // Size styles - exact Figma specifications
    const sizeStyles = {
      sm: {
        checkbox: "w-[16px] h-[16px]",
        icon: 12,
        gap: "gap-[6px]",
        text: "text-[12px]"
      },
      md: {
        checkbox: "w-[20px] h-[20px]", // Fixed 20px from Figma
        icon: 16,
        gap: "gap-[8px]", // Fixed 8px from Figma
        text: "text-[14px]" // Fixed 14px from Figma
      }
    };

    const currentSize = sizeStyles[size];

    // Variant-specific colors from Figma
    const getVariantStyles = () => {
      if (disabled) {
        return variant === 'on-dark' 
          ? {
              bg: "#F8F8F9", // Light gray for disabled on dark
              border: "#F8F8F9",
              checkmark: "#434F64", // Dark checkmark
              label: "#F8F8F9"
            }
          : {
              bg: "#CED1D7", // Light gray for disabled on light
              border: "#CED1D7", 
              checkmark: "#FFFFFF", // White checkmark
              label: "#CED1D7"
            };
      }

      if (props.checked || indeterminate) {
        return variant === 'on-dark'
          ? {
              bg: "#FFFFFF", // White background for selected on dark
              border: "#FFFFFF",
              checkmark: "#434F64", // Dark checkmark on white
              label: "#FFFFFF",
              hoverBg: "#F8F8F9",
              hoverBorder: "#F8F8F9"
            }
          : {
              bg: "#434F64", // Dark background for selected on light
              border: "#434F64",
              checkmark: "#FFFFFF", // White checkmark on dark
              label: "#434F64",
              hoverBg: "#1D2A38",
              hoverBorder: "#1D2A38"
            };
      }

      // Unselected state
      return variant === 'on-dark'
        ? {
            bg: "transparent",
            border: "#FFFFFF", // White border on dark
            checkmark: "#434F64",
            label: "#FFFFFF",
            hoverBg: "#F8F8F9",
            hoverBorder: "#FFFFFF"
          }
        : {
            bg: "transparent", 
            border: "#838C9D", // Gray border on light
            checkmark: "#FFFFFF",
            label: "#838C9D",
            hoverBg: "#CED1D7",
            hoverBorder: "#838C9D"
          };
    };

    const variantStyles = getVariantStyles();

    // Base checkbox styles using exact Figma specifications
    const checkboxStyles = cn(
      // Base styles
      "relative shrink-0 rounded-[4px] border-2 transition-all duration-200 cursor-pointer",
      // Size
      currentSize.checkbox,
      // Dynamic styles based on state and variant
      disabled
        ? `bg-[${variantStyles.bg}] border-[${variantStyles.border}] cursor-not-allowed`
        : props.checked || indeterminate
        ? `bg-[${variantStyles.bg}] border-[${variantStyles.border}] hover:bg-[${variantStyles.hoverBg}] hover:border-[${variantStyles.hoverBorder}]`
        : `bg-[${variantStyles.bg}] border-[${variantStyles.border}] hover:bg-[${variantStyles.hoverBg}] hover:border-[${variantStyles.hoverBorder}]`,
      // Focus styles
      `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[${variant === 'on-dark' ? '#FFFFFF' : '#434F64'}] focus-visible:ring-offset-2`,
      className
    );

    // Label styles using exact Figma specifications
    const labelStyles = cn(
      "font-medium leading-[1.4] cursor-pointer", // 500 weight from Figma
      currentSize.text,
      `text-[${variantStyles.label}]`,
      disabled && "cursor-not-allowed"
    );

    // Container styles
    const containerStyles = cn(
      "inline-flex items-center",
      currentSize.gap
    );

    return (
      <label className={containerStyles}>
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            ref={checkboxRef}
            disabled={disabled}
            {...props}
          />
          <div className={checkboxStyles}>
            {/* Checkmark icon - exact Figma color */}
            {(props.checked || indeterminate) && !disabled && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon 
                  name={indeterminate ? "subtract" : "check-alt"} 
                  size={currentSize.icon} 
                  color={variantStyles.checkmark}
                />
              </div>
            )}
          </div>
        </div>
        {label && <span className={labelStyles}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox'; 