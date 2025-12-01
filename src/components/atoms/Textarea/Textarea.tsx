"use client";

import React from 'react';
import { cn, type ComponentSize } from '../../../lib/utils';
import { Label } from '../Label/Label';
import { FigmaBadge } from '../FigmaBadge';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  labelMandatory?: boolean;
  labelOptional?: boolean;
  error?: string;
  helperText?: string;
  size?: ComponentSize;
  showFigmaBadge?: boolean;
}

/**
 * Textarea component built using FT Design System tokens.
 * Figma design not available - component created based on design system specifications.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label,
    labelMandatory = false,
    labelOptional = false,
    error, 
    helperText, 
    size = 'md', 
    disabled,
    id,
    showFigmaBadge = true,
    rows = 4,
    ...props 
  }, ref) => {
    const generatedId = React.useId();
    // Generate IDs for accessibility (ensure consistent hook usage)
    const textareaId = id ?? `textarea-${generatedId}`;
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperId = helperText ? `${textareaId}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

    // Size-based styling using FT Design System tokens
    const sizeStyles = {
      xxs: {
        padding: 'px-1.5 py-1',
        fontSize: 'text-xs-rem', // 12px → 0.857rem (responsive)
        minHeight: 'min-h-[32px]',
      },
      xs: {
        padding: 'px-2 py-1.5',
        fontSize: 'text-sm-rem', // 14px → 1rem (responsive)
        minHeight: 'min-h-[40px]',
      },
      sm: {
        padding: 'px-3 py-2',
        fontSize: 'text-sm-rem', // 14px → 1rem (responsive)
        minHeight: 'min-h-[48px]',
      },
      md: {
        padding: 'px-3 py-2',
        fontSize: 'text-sm-rem', // 14px → 1rem (responsive)
        minHeight: 'min-h-[56px]',
      },
      lg: {
        padding: 'px-5 py-4',
        fontSize: 'text-lg-rem', // 20px → 1.429rem (responsive)
        minHeight: 'min-h-[64px]',
      },
      xl: {
        padding: 'px-6 py-5',
        fontSize: 'text-xl-rem', // 24px → 1.714rem (responsive)
        minHeight: 'min-h-[72px]',
      },
      xxl: {
        padding: 'px-7 py-6',
        fontSize: 'text-xxl-rem', // 28px → 2rem (responsive)
        minHeight: 'min-h-[80px]',
      },
    };

    const currentSize = sizeStyles[size];

    return (
      <div className="w-full">
        {showFigmaBadge && (
          <div className="mb-2">
            <FigmaBadge />
          </div>
        )}
        {label && (
          <Label
            htmlFor={textareaId}
            mandatory={labelMandatory}
            optional={labelOptional}
            className="mb-2"
          >
            {label}
          </Label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            disabled={disabled}
            aria-describedby={describedBy}
            aria-invalid={error ? 'true' : undefined}
            className={cn(
              // Base styles using FT Design System tokens
              "w-full resize-y",
              "font-normal",
              "text-[var(--color-primary)]",
              "bg-[var(--color-bg-primary)]",
              "border border-[var(--color-border-primary)]",
              "rounded-sm",
              "placeholder:text-[#838c9d]",
              "transition-all duration-[var(--transition-normal)]",
              
              // Size styles
              currentSize.padding,
              currentSize.fontSize,
              currentSize.minHeight,
              
              // Focus styles
              "focus:outline-none",
              "focus:ring-2 focus:ring-[var(--color-neutral)] focus:ring-opacity-20",
              "focus:border-[var(--color-neutral)]",
              
              // Error styles
              error && "border-[var(--color-critical)]",
              error && "focus:border-[var(--color-critical)] focus:ring-[var(--color-critical)] focus:ring-opacity-20",
              
              // Disabled styles
              disabled && "bg-[var(--color-bg-secondary)]",
              disabled && "text-[#838c9d]",
              disabled && "cursor-not-allowed",
              disabled && "opacity-60",
              
              // Hover styles
              !disabled && "hover:border-[var(--color-tertiary)]",
              
              className
            )}
            style={{
              fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
              ...props.style,
            }}
            {...props}
          />
        </div>
        {error && (
          <p
            id={errorId}
            className="mt-1 text-sm text-[var(--color-critical)]"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={helperId}
            className="mt-1 text-sm text-[#838c9d]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
