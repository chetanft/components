"use client";

import React from 'react';
import type { ComponentSize } from '../../../lib/utils';
import { TextareaProvider } from './TextareaContext';
import { TextareaWrapper } from './TextareaWrapper';
import { TextareaLabel } from './TextareaLabel';
import { TextareaField } from './TextareaField';
import { TextareaHelper } from './TextareaHelper';
import { TextareaError } from './TextareaError';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /**
   * Textarea content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Label text displayed above the textarea (for declarative API)
   * @deprecated Use TextareaLabel component instead
   */
  label?: string;
  /**
   * Shows mandatory indicator (*) next to label (for declarative API)
   * @deprecated Use TextareaLabel component with mandatory prop instead
   */
  labelMandatory?: boolean;
  /**
   * Shows optional indicator next to label (for declarative API)
   * @deprecated Use TextareaLabel component with optional prop instead
   */
  labelOptional?: boolean;
  /**
   * Error message displayed below textarea (for declarative API)
   * @deprecated Use TextareaError component instead
   */
  error?: string;
  /**
   * Helper text displayed below textarea (for declarative API)
   * @deprecated Use TextareaHelper component instead
   */
  helperText?: string;
  /**
   * Textarea size
   * @default 'md'
   */
  size?: ComponentSize;
}

/**
 * Textarea Component
 * 
 * A versatile textarea component with label, validation states, and helper text.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Textarea size="md">
 *   <TextareaLabel mandatory>Description</TextareaLabel>
 *   <TextareaField rows={6} placeholder="Enter description" />
 *   <TextareaError>Description is required</TextareaError>
 * </Textarea>
 * 
 * // Declarative API (deprecated)
 * <Textarea label="Description" rows={4} error="Required" />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (TextareaLabel, TextareaField, TextareaError, etc.) support `asChild`
 * - Automatically generates accessible IDs for labels and error messages
 * - Supports validation states: error
 * - Accessible: includes ARIA attributes and keyboard navigation
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    children,
    label,
    labelMandatory = false,
    labelOptional = false,
    error,
    helperText,
    size = 'md',
    disabled,
    id,
    rows = 4,
    ...props
  }, ref) => {
    // Check if using composable API (has children with Textarea sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
      child?.type?.displayName?.startsWith('Textarea')
    );
    
    // If using composable API, wrap with context provider
    if (hasComposableChildren) {
      // Show deprecation warning if using old props with composable API
      if (process.env.NODE_ENV !== 'production' && (label || error || helperText)) {
              }
      
      const generatedId = React.useId();
      const textareaId = id ?? `textarea-${generatedId}`;
      const errorId = error ? `${textareaId}-error` : undefined;
      const helperId = helperText ? `${textareaId}-helper` : undefined;
      
      return (
        <TextareaProvider
          value={{
            textareaId,
            size,
            disabled,
            hasError: !!error,
            errorId,
            helperId,
          }}
        >
          <TextareaWrapper className={className}>
            {children}
          </TextareaWrapper>
        </TextareaProvider>
      );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production') {
          }
    
    const generatedId = React.useId();
    // Generate IDs for accessibility (ensure consistent hook usage)
    const textareaId = id ?? `textarea-${generatedId}`;
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperId = helperText ? `${textareaId}-helper` : undefined;
    const _describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

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

    const _currentSize = sizeStyles[size];

    return (
      <TextareaProvider
        value={{
          textareaId,
          size,
          disabled,
          hasError: !!error,
          errorId,
          helperId,
        }}
      >
        <TextareaWrapper className={className}>
          {label && (
            <TextareaLabel
              mandatory={labelMandatory}
              optional={labelOptional}
            >
              {label}
            </TextareaLabel>
          )}
          <TextareaField
            ref={ref}
            rows={rows}
            disabled={disabled}
            {...props}
          />
          {error && <TextareaError>{error}</TextareaError>}
          {helperText && !error && <TextareaHelper>{helperText}</TextareaHelper>}
        </TextareaWrapper>
      </TextareaProvider>
    );
  }
);

Textarea.displayName = 'Textarea';
