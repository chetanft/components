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
        padding: 'px-1.5 py-1',
        fontSize: 'text-xs-rem',
        minHeight: 'min-h-[32px]',
      },
      xs: {
        padding: 'px-2 py-1.5',
        fontSize: 'text-sm-rem',
        minHeight: 'min-h-[40px]',
      },
      sm: {
        padding: 'px-3 py-2',
        fontSize: 'text-sm-rem',
        minHeight: 'min-h-[48px]',
      },
      md: {
        padding: 'px-3 py-2',
        fontSize: 'text-sm-rem',
        minHeight: 'min-h-[56px]',
      },
      lg: {
        padding: 'px-5 py-4',
        fontSize: 'text-lg-rem',
        minHeight: 'min-h-[64px]',
      },
      xl: {
        padding: 'px-6 py-5',
        fontSize: 'text-xl-rem',
        minHeight: 'min-h-[72px]',
      },
      xxl: {
        padding: 'px-7 py-6',
        fontSize: 'text-xxl-rem',
        minHeight: 'min-h-[80px]',
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

