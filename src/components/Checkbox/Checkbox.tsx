"use client";

import React from 'react';
import { cn } from '../../lib/utils';
import { Icon } from '../Icons';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  indeterminate?: boolean;
  size?: 'sm' | 'md';
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, indeterminate, size = 'md', disabled, ...props }, ref) => {
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
        checkbox: "w-[var(--checkbox-size)] h-[var(--checkbox-size)]", // 20px from Figma
        icon: 16,
        gap: "gap-[var(--checkbox-gap)]", // 8px from Figma
        text: "text-[var(--checkbox-font-size)]" // 14px from Figma
      }
    };

    const currentSize = sizeStyles[size];

    // Base checkbox styles using exact Figma specifications
    const checkboxStyles = cn(
      // Base styles
      "relative shrink-0 rounded-[var(--checkbox-border-radius)] border-2 transition-all duration-200 cursor-pointer",
      // Size
      currentSize.checkbox,
      // State styles using exact Figma colors
      disabled
        ? "bg-[var(--checkbox-disabled-bg)] border-[var(--checkbox-disabled-border)] cursor-not-allowed"
        : props.checked || indeterminate
        ? "bg-[var(--checkbox-selected-bg)] border-[var(--checkbox-selected-bg)] hover:bg-[var(--checkbox-hover-selected-bg)] hover:border-[var(--checkbox-hover-selected-border)]"
        : "bg-[var(--checkbox-unselected-bg)] border-[var(--checkbox-unselected-border)] hover:bg-[var(--checkbox-hover-unselected-bg)] hover:border-[var(--checkbox-hover-unselected-border)]",
      // Focus styles
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--checkbox-selected-bg)] focus-visible:ring-offset-2",
      className
    );

    // Label styles using exact Figma specifications
    const labelStyles = cn(
      "font-[var(--checkbox-font-weight)] leading-[1.4] cursor-pointer", // 500 weight from Figma
      currentSize.text,
      disabled
        ? "text-[var(--checkbox-disabled-label)] cursor-not-allowed"
        : props.checked || indeterminate
        ? "text-[var(--checkbox-selected-label)]"
        : "text-[var(--checkbox-unselected-label)]"
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
                  color="var(--checkbox-selected-checkmark)" // #ffffff from Figma
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