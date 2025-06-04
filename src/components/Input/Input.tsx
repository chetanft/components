"use client";

import React from 'react';
import { cn } from '../../lib/utils';
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
    style,
    ...props 
  }, ref) => {
    // Size styles - exact Figma specifications
    const sizeStyles = {
      sm: {
        input: "h-[48px] px-[12px] py-[12px] text-[14px]",
        icon: 14,
        gap: "gap-[8px]",
        iconPadding: { left: "pl-[40px]", right: "pr-[40px]" }
      },
      md: {
        input: "h-[var(--input-height)] px-[16px] py-[var(--input-padding-vertical)] text-[16px]", // Fixed font size instead of variable
        icon: 16, // var(--input-icon-size)
        gap: "gap-[var(--input-gap)]", // 4px from Figma
        iconPadding: { left: "pl-[48px]", right: "pr-[48px]" }
      },
      lg: {
        input: "h-[72px] px-[20px] py-[24px] text-[18px]",
        icon: 18,
        gap: "gap-[6px]",
        iconPadding: { left: "pl-[56px]", right: "pr-[56px]" }
      }
    };

    const currentSize = sizeStyles[size];

    // Base input styles using exact Figma specifications
    const inputStyles = cn(
      // Base styles
      "w-full rounded-[var(--input-border-radius)] border-[2px] transition-all duration-200",
      "font-[var(--font-family-primary)] font-[var(--input-font-weight)]",
      "placeholder:text-[var(--input-text-color)]",
      // Size
      currentSize.input,
      // Variant styles
      variant === 'filled' 
        ? "bg-[var(--color-divider)] border-transparent focus:bg-[var(--color-white)] focus:border-[var(--color-dark-25)]"
        : "bg-[var(--input-bg)] border-[var(--color-border)]",
      // State styles using exact Figma colors
      disabled
        ? "bg-[var(--color-divider)] border-[var(--color-border)] text-[var(--color-dark-25)] cursor-not-allowed"
        : error
        ? "border-[var(--color-critical)] focus:border-[var(--color-critical)] focus:ring-2 focus:ring-[var(--color-critical-light)]"
        : "text-[var(--input-text-color)] focus:border-[var(--color-dark-100)] focus:ring-2 focus:ring-[var(--color-neutral-light)]",
      // Focus styles
      "focus:outline-none",
      className
    );

    // Container styles
    const containerStyles = cn(
      "relative inline-flex items-center w-full",
      currentSize.gap
    );

    // Label styles using exact Figma specifications
    const labelStyles = cn(
      "block text-[16px] leading-[1.4] mb-[8px]", // Fixed font size and spacing
      disabled
        ? "text-[var(--color-dark-25)]"
        : error
        ? "text-[var(--color-critical)]"
        : "text-[var(--color-dark-100)]"
    );

    // Helper/error text styles
    const helperStyles = cn(
      "text-[14px] leading-[1.4] mt-[6px]", // Fixed font size
      error
        ? "text-[var(--color-critical)]"
        : "text-[var(--color-dark-25)]"
    );

    // Text color and font styling
    const getTextColor = () => {
      if (disabled) return "#838c9d"; // var(--color-dark-25)
      if (error) return "#434f64"; // var(--color-dark-100) 
      return "#838c9d"; // var(--input-text-color)
    };

    // Create inline style object for better font control
    const inputStyle = {
      color: getTextColor(),
      fontWeight: "400", // Regular weight for input text
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      ...style
    };

    const labelStyle = {
      fontWeight: "500", // Medium weight for labels
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    };

    const helperStyle = {
      fontWeight: "400", // Regular weight for helper text
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    };

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className={labelStyles} style={labelStyle}>
            {label}
          </label>
        )}
        
        {/* Input Container */}
        <div className={containerStyles}>
          {/* Leading Icon */}
          {leadingIcon && (
            <div className="absolute left-[16px] flex items-center justify-center pointer-events-none">
              <Icon 
                name={leadingIcon} 
                size={currentSize.icon} 
                color={disabled ? "var(--color-dark-25)" : "var(--input-text-color)"}
              />
            </div>
          )}
          
          {/* Input */}
          <input
            type={type}
            className={cn(
              inputStyles,
              leadingIcon && currentSize.iconPadding.left, // Use size-specific padding
              trailingIcon && currentSize.iconPadding.right  // Use size-specific padding
            )}
            style={inputStyle}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          
          {/* Trailing Icon */}
          {trailingIcon && (
            <div className="absolute right-[16px] flex items-center justify-center pointer-events-none">
              <Icon 
                name={trailingIcon} 
                size={currentSize.icon} 
                color={disabled ? "var(--color-dark-25)" : "var(--input-text-color)"}
              />
            </div>
          )}
        </div>
        
        {/* Helper Text or Error */}
        {(helperText || error) && (
          <p className={helperStyles} style={helperStyle}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 