"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useTextareaContext } from './TextareaContext';

export interface TextareaHelperProps extends ComposableProps<'p'> {
  /**
   * The helper text content.
   */
  children: React.ReactNode;
}

/**
 * TextareaHelper Component
 *
 * A composable component for displaying helper text below a Textarea field.
 * Provides additional context or instructions for the user.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Textarea>
 *   <TextareaLabel>Description</TextareaLabel>
 *   <TextareaField />
 *   <TextareaHelper>Provide a detailed description</TextareaHelper>
 * </Textarea>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets ID for accessibility.
 * - Styled with helper text color from design system.
 */
export const TextareaHelper = React.forwardRef<HTMLParagraphElement, TextareaHelperProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { helperId } = useTextareaContext();
    const Comp = asChild ? Slot : 'p';
    
    return (
      <Comp
        ref={ref}
        id={helperId}
        className={cn("mt-1 text-sm text-[#838c9d]", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

TextareaHelper.displayName = 'TextareaHelper';

