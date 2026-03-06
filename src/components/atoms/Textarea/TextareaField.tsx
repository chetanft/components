"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useTextareaContext } from './TextareaContext';

export interface TextareaFieldProps extends Omit<ComposableProps<'textarea'>, 'size'> {
  /**
   * Number of visible text lines
   * @default 4
   */
  rows?: number;
}

/**
 * TextareaField Component
 *
 * A composable textarea field component that wraps the HTML `<textarea>` element.
 * Supports validation states and all standard textarea attributes.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Textarea>
 *   <TextareaLabel>Description</TextareaLabel>
 *   <TextareaField rows={6} placeholder="Enter description" />
 * </Textarea>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<textarea>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically applies validation state styling based on context.
 * - Accessible: includes ARIA attributes and keyboard navigation.
 */
export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({
    className,
    rows = 4,
    asChild,
    disabled,
    ...props
  }, ref) => {
    const { textareaId, size, disabled: contextDisabled, hasError, errorId, helperId } = useTextareaContext();
    const isDisabled = disabled ?? contextDisabled;
    
    const sizeStyles = {
      xxs: {
        padding: 'px-[var(--spacing-x1-5)] py-[var(--spacing-x0-5)]',
        fontSize: 'text-xs-rem',
        minHeight: 'min-h-[var(--spacing-x8)]',
      },
      xs: {
        padding: 'px-[var(--spacing-x2)] py-[var(--spacing-x1)]',
        fontSize: 'text-xs-rem',
        minHeight: 'min-h-[var(--spacing-x10)]',
      },
      sm: {
        padding: 'px-[var(--spacing-x3)] py-[var(--spacing-x2)]',
        fontSize: 'text-sm-rem',
        minHeight: 'min-h-[var(--spacing-x12)]',
      },
      md: {
        padding: 'px-[var(--spacing-x4)] py-[var(--spacing-x3)]',
        fontSize: 'text-sm-rem',
        minHeight: 'min-h-[3.5rem]',
      },
      lg: {
        padding: 'px-[var(--spacing-x5)] py-[var(--spacing-x4)]',
        fontSize: 'text-md-rem',
        minHeight: 'min-h-[var(--spacing-x16)]',
      },
      xl: {
        padding: 'px-[var(--spacing-x6)] py-[var(--spacing-x5)]',
        fontSize: 'text-md-rem',
        minHeight: 'min-h-[4.5rem]',
      },
      xxl: {
        padding: 'px-[var(--spacing-x7)] py-[var(--spacing-x6)]',
        fontSize: 'text-lg-rem',
        minHeight: 'min-h-[var(--spacing-x20)]',
      },
    };

    const currentSize = sizeStyles[size];
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

    const textareaStyles = cn(
      "w-full resize-y",
      "font-normal",
      "text-[var(--color-primary)]",
      "bg-[var(--bg-primary)]",
      "border border-[var(--border-primary)]",
      "rounded-md",
      "placeholder:text-[var(--text-placeholder)]",
      "transition-all duration-[var(--transition-normal)]",
      currentSize.padding,
      currentSize.fontSize,
      currentSize.minHeight,
      "focus:outline-none",
      "focus:ring-2 focus:ring-[var(--color-neutral)] focus:ring-opacity-20",
      "focus:border-[var(--color-neutral)]",
      hasError && "border-[var(--color-critical)]",
      hasError && "focus:border-[var(--color-critical)] focus:ring-[var(--color-critical)] focus:ring-opacity-20",
      isDisabled && "bg-[var(--bg-secondary)]",
      isDisabled && "text-[var(--text-disabled)]",
      isDisabled && "cursor-not-allowed",
      isDisabled && "opacity-60",
      !isDisabled && "hover:border-[var(--color-tertiary)]",
      className
    );

    if (asChild) {
      return (
        <div className="relative">
          <Slot
            ref={ref}
            id={textareaId}
            {...({ rows } as any)}
            disabled={isDisabled}
            aria-describedby={describedBy}
            aria-invalid={hasError ? 'true' : undefined}
            className={textareaStyles}
            style={{
              fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
              ...props.style,
            }}
            {...props}
          />
        </div>
      );
    }

    return (
      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={isDisabled}
          aria-describedby={describedBy}
          aria-invalid={hasError ? 'true' : undefined}
          className={textareaStyles}
          style={{
            fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
            ...props.style,
          }}
          {...props}
        />
      </div>
    );
  }
);

TextareaField.displayName = 'TextareaField';
