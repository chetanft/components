"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useInputContext } from './InputContext';

export interface InputSuccessProps extends ComposableProps<'p'> {
  /**
   * The success message content.
   */
  children: React.ReactNode;
}

/**
 * InputSuccess Component
 *
 * A composable component for displaying success messages below an Input field.
 * Automatically applies success styling and accessibility attributes.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Input>
 *   <InputLabel>Email</InputLabel>
 *   <InputField type="email" />
 *   <InputSuccess>Email verified successfully</InputSuccess>
 * </Input>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets ID and role for accessibility.
 * - Styled with success color from design system.
 */
export const InputSuccess = React.forwardRef<HTMLParagraphElement, InputSuccessProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { successId } = useInputContext();
    const Comp = asChild ? Slot : 'p';
    
    return (
      <Comp
        ref={ref}
        id={successId}
        role="alert"
        className={cn("text-sm leading-relaxed mt-1.5 text-positive", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

InputSuccess.displayName = 'InputSuccess';

