"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useInputContext } from './InputContext';

export interface InputErrorProps extends ComposableProps<'p'> {
  /**
   * The error message content.
   */
  children: React.ReactNode;
}

/**
 * InputError Component
 *
 * A composable component for displaying error messages below an Input field.
 * Automatically applies error styling and accessibility attributes.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Input>
 *   <InputLabel>Password</InputLabel>
 *   <InputField type="password" />
 *   <InputError>Password must be at least 8 characters</InputError>
 * </Input>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets ID and role for accessibility.
 * - Styled with error color from design system.
 */
export const InputError = React.forwardRef<HTMLParagraphElement, InputErrorProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { errorId } = useInputContext();
    const Comp = asChild ? Slot : 'p';
    
    return (
      <Comp
        ref={ref}
        id={errorId}
        role="alert"
        className={cn("text-sm leading-relaxed mt-1.5 text-critical", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

InputError.displayName = 'InputError';

