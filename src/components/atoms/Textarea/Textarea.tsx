"use client";

import React from 'react';
import type { ComponentSize } from '../../../lib/utils';
import { TextareaProvider } from './TextareaContext';
import { TextareaWrapper } from './TextareaWrapper';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /**
   * Textarea content (for composable API)
   */
  children?: React.ReactNode;
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
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (TextareaLabel, TextareaField, TextareaError, etc.) support `asChild`
 * - Automatically generates accessible IDs for labels and error messages
 * - Supports validation states: error
 * - Accessible: includes ARIA attributes and keyboard navigation
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    children,
    size = 'md',
    disabled,
    id,
    rows = 4,
    ...props
  }, ref) => {
    const generatedId = React.useId();
    const textareaId = id ?? `textarea-${generatedId}`;

    return (
      <TextareaProvider
        value={{
          textareaId,
          size,
          disabled,
          hasError: false,
          errorId: undefined,
          helperId: undefined,
        }}
      >
        <TextareaWrapper className={className}>
          {children}
        </TextareaWrapper>
      </TextareaProvider>
    );
  }
);

Textarea.displayName = 'Textarea';
