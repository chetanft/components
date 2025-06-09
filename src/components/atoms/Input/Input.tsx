"use client";

import React from 'react';
import { cn, getComponentStyles, type ComponentSize } from '../../../lib/utils';
import { Icon, IconName } from '../Icons';
import { Label } from '../Label/Label';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  labelMandatory?: boolean;
  labelOptional?: boolean;
  labelSuffixIcon?: boolean;
  labelIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  size?: ComponentSize; // Use unified sizing
  variant?: 'default' | 'filled';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text', 
    label,
    labelMandatory = false,
    labelOptional = false,
    labelSuffixIcon = false,
    labelIcon,
    error, 
    helperText, 
    leadingIcon, 
    trailingIcon, 
    size = 'md', 
    variant = 'default',
    disabled,
    id,
    'aria-describedby': ariaDescribedBy,
    ...props 
  }, ref) => {
    // Core component - no AI filtering (use ft-design-system/ai for AI protection)
    const componentStyles = getComponentStyles(size);
    
    // Generate IDs for accessibility
    const inputId = id || `input-${React.useId()}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const describedBy = [errorId, helperId, ariaDescribedBy].filter(Boolean).join(' ') || undefined;

    // Icon positioning based on unified sizing
    const iconOffsetMap = {
      sm: "left-3 right-3",
      md: "left-4 right-4", 
      lg: "left-5 right-5",
      xl: "left-6 right-6"
    };
    
    const iconPaddingMap = {
      sm: { left: "pl-9", right: "pr-9" },
      md: { left: "pl-11", right: "pr-11" },
      lg: { left: "pl-12", right: "pr-12" },
      xl: { left: "pl-14", right: "pr-14" }
    };

    const currentIconOffset = iconOffsetMap[size];
    const currentIconPadding = iconPaddingMap[size];

    // Input styles using unified design system
    const inputStyles = cn(
      // Base styles
      "w-full border-2 transition-all duration-200",
      "font-sans font-normal",
      "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
      // Unified component styles
      componentStyles.height,
      componentStyles.fontSize,
      componentStyles.borderRadius,
      componentStyles.padding,
      // Variant styles with dark mode
      variant === 'filled' 
        ? "bg-neutral-50 dark:bg-neutral-800 border-transparent focus:bg-white dark:focus:bg-neutral-900 focus:border-neutral-200 dark:focus:border-neutral-600"
        : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700",
      // State styles with dark mode support
      disabled
        ? "bg-neutral-50 dark:bg-neutral-800 border-neutral-100 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
        : error
        ? "border-critical text-neutral-900 dark:text-neutral-100 focus:border-critical focus:ring-2 focus:ring-critical/20"
        : "text-neutral-900 dark:text-neutral-100 focus:border-neutral-400 dark:focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700",
      // Focus styles
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900",
      className
    );

    // No longer needed - using Label component

    // Helper/error text styles with dark mode
    const helperStyles = cn(
      "text-sm leading-relaxed mt-1.5",
      error
        ? "text-critical"
        : "text-neutral-600 dark:text-neutral-400"
    );

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <Label 
            htmlFor={inputId}
            mandatory={labelMandatory}
            optional={labelOptional}
            suffixIcon={labelSuffixIcon}
            icon={labelIcon}
          >
            {label}
          </Label>
        )}
        
        {/* Input Container */}
        <div className="relative">
          {/* Leading Icon */}
          {leadingIcon && (
            <div className={cn("absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none", currentIconOffset.split(' ')[0])}>
              <Icon 
                name={leadingIcon} 
                size={componentStyles.iconSize}
                className={cn(
                  "transition-colors",
                  disabled 
                    ? "text-neutral-400 dark:text-neutral-500" 
                    : error
                    ? "text-critical"
                    : "text-neutral-500 dark:text-neutral-400"
                )}
                aria-hidden="true"
              />
            </div>
          )}
          
          {/* Input */}
          <input
            id={inputId}
            type={type}
            className={cn(
              inputStyles,
              leadingIcon && currentIconPadding.left,
              trailingIcon && currentIconPadding.right
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            data-size={size}
            {...props}
          />
          
          {/* Trailing Icon */}
          {trailingIcon && (
            <div className={cn("absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none", currentIconOffset.split(' ')[1])}>
              <Icon 
                name={trailingIcon} 
                size={componentStyles.iconSize}
                className={cn(
                  "transition-colors",
                  disabled 
                    ? "text-neutral-400 dark:text-neutral-500" 
                    : error
                    ? "text-critical"
                    : "text-neutral-500 dark:text-neutral-400"
                )}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        
        {/* Helper Text or Error */}
        {(helperText || error) && (
          <p 
            id={error ? errorId : helperId}
            className={helperStyles}
            role={error ? 'alert' : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 