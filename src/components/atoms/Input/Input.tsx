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
  variant?: 'default' | 'filled' | 'outlined';
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
      xxs: "left-1.5 right-1.5",
      xs: "left-2 right-2",
      sm: "left-3 right-3",
      md: "left-4 right-4", 
      lg: "left-5 right-5",
      xl: "left-6 right-6",
      xxl: "left-7 right-7"
    };
    
    const iconPaddingMap = {
      xxs: { left: "pl-6", right: "pr-6" },
      xs: { left: "pl-7", right: "pr-7" },
      sm: { left: "pl-9", right: "pr-9" },
      md: { left: "pl-11", right: "pr-11" },
      lg: { left: "pl-12", right: "pr-12" },
      xl: { left: "pl-14", right: "pr-14" },
      xxl: { left: "pl-16", right: "pr-16" }
    };

    const currentIconOffset = iconOffsetMap[size];
    const currentIconPadding = iconPaddingMap[size];

    // Input styles using unified design system
    const inputStyles = cn(
      // Base styles
      "w-full transition-all duration-200",
      "font-sans font-normal",
      "placeholder:text-placeholder dark:placeholder:text-placeholder-dark",
      // Unified component styles
      componentStyles.height,
      componentStyles.fontSize,
      componentStyles.borderRadius,
      componentStyles.padding,
      // Variant styles with dark mode
      variant === 'filled' 
        ? "bg-surface-alt dark:bg-surface-alt-dark border-2 border-transparent focus:bg-surface dark:focus:bg-surface-dark focus:border-border-alt dark:focus:border-border-alt-dark"
        : variant === 'outlined'
        ? "bg-transparent border border-border dark:border-border-dark hover:border-[var(--primary)] dark:hover:border-[var(--primary)] focus:border-primary"
        : "bg-surface dark:bg-surface-dark border-2 border-border dark:border-border-dark hover:border-[var(--primary)] dark:hover:border-[var(--primary)]",
      // State styles with dark mode support
      disabled
        ? "bg-surface-alt dark:bg-surface-alt-dark border-border-disabled dark:border-border-disabled-dark text-input-disabled dark:text-input-disabled-dark cursor-not-allowed"
        : error
        ? "border-critical text-input dark:text-input-dark focus:border-critical"
        : "text-input dark:text-input-dark focus:border-primary dark:focus:border-primary-dark",
      // Focus styles
      "focus:outline-none",
      className
    );

    // Helper/error text styles with dark mode
    const helperStyles = cn(
      "text-sm leading-relaxed mt-1.5",
      error
        ? "text-critical"
        : "text-helper dark:text-helper-dark"
    );

    return (
      <div className="w-full space-y-2">
        {/* Label */}
        {label && (
          <div>
            <Label 
              htmlFor={inputId}
              mandatory={labelMandatory}
              optional={labelOptional}
              suffixIcon={labelSuffixIcon}
              icon={labelIcon}
            >
              {label}
            </Label>
          </div>
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
                    ? "text-input-disabled dark:text-input-disabled-dark" 
                    : error
                    ? "text-critical"
                    : "text-icon dark:text-icon-dark"
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
                    ? "text-input-disabled dark:text-input-disabled-dark" 
                    : error
                    ? "text-critical"
                    : "text-icon dark:text-icon-dark"
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