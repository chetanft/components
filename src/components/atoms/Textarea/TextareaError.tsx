"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useTextareaContext } from './TextareaContext';

export interface TextareaErrorProps extends ComposableProps<'p'> {
  /**
   * The error message content.
   */
  children: React.ReactNode;
}

/**
 * TextareaError Component
 *
 * A composable component for displaying error messages below a Textarea field.
 * Automatically applies error styling and accessibility attributes.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Textarea>
 *   <TextareaLabel>Description</TextareaLabel>
 *   <TextareaField />
 *   <TextareaError>Description is required</TextareaError>
 * </Textarea>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets ID and role for accessibility.
 * - Styled with error color from design system.
 */
export const TextareaError = React.forwardRef<HTMLParagraphElement, TextareaErrorProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { errorId } = useTextareaContext();
    const Comp = asChild ? Slot : 'p';
    
    return (
      <Comp
        ref={ref}
        id={errorId}
        role="alert"
        className={cn("mt-1 text-sm text-[var(--color-critical)]", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

TextareaError.displayName = 'TextareaError';

