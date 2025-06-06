"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../Icons';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text', 
    label, 
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
    
    // Generate IDs for accessibility
    const inputId = id || `input-${React.useId()}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const describedBy = [errorId, helperId, ariaDescribedBy].filter(Boolean).join(' ') || undefined;

    // Size configuration using design tokens
    const sizeConfig = {
      sm: {
        input: "h-12 px-3 py-3 text-sm",
        icon: 16,
        iconOffset: "left-3 right-3",
        iconPadding: { left: "pl-10", right: "pr-10" }
      },
      md: {
        input: "h-input px-4 py-input-y text-base",
        icon: 20,
        iconOffset: "left-4 right-4", 
        iconPadding: { left: "pl-12", right: "pr-12" }
      },
      lg: {
        input: "h-18 px-5 py-6 text-lg",
        icon: 24,
        iconOffset: "left-5 right-5",
        iconPadding: { left: "pl-14", right: "pr-14" }
      }
    };

    const currentSize = sizeConfig[size];

    // Input styles using design tokens and dark mode
    const inputStyles = cn(
      // Base styles
      "w-full rounded-border-radius border-2 transition-all duration-200",
      "font-sans font-normal",
      "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
      // Size
      currentSize.input,
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

    // Label styles with dark mode
    const labelStyles = cn(
      "block text-base font-medium leading-relaxed mb-2",
      disabled
        ? "text-neutral-400 dark:text-neutral-500"
        : error
        ? "text-critical"
        : "text-neutral-900 dark:text-neutral-100"
    );

    // Helper/error text styles with dark mode
    const helperStyles = cn(
      "text-sm leading-relaxed mt-1.5",
      error
        ? "text-critical"
        : "text-neutral-600 dark:text-neutral-400"
    );

    // Icon color based on state and theme
    const getIconColor = () => {
      if (disabled) return "currentColor";
      return "currentColor";
    };

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label 
            htmlFor={inputId}
            className={labelStyles}
          >
            {label}
          </label>
        )}
        
        {/* Input Container */}
        <div className="relative">
          {/* Leading Icon */}
          {leadingIcon && (
            <div className={cn("absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none", currentSize.iconOffset.split(' ')[0])}>
              <Icon 
                name={leadingIcon} 
                size={currentSize.icon}
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
              leadingIcon && currentSize.iconPadding.left,
              trailingIcon && currentSize.iconPadding.right
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            {...props}
          />
          
          {/* Trailing Icon */}
          {trailingIcon && (
            <div className={cn("absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none", currentSize.iconOffset.split(' ')[1])}>
              <Icon 
                name={trailingIcon} 
                size={currentSize.icon}
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