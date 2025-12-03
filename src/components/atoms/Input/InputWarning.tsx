"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useInputContext } from './InputContext';

export interface InputWarningProps extends ComposableProps<'p'> {
  /**
   * The warning message content.
   */
  children: React.ReactNode;
}

/**
 * InputWarning Component
 *
 * A composable component for displaying warning messages below an Input field.
 * Automatically applies warning styling and accessibility attributes.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Input>
 *   <InputLabel>Email</InputLabel>
 *   <InputField type="email" />
 *   <InputWarning>Please verify your email address</InputWarning>
 * </Input>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets ID and role for accessibility.
 * - Styled with warning color from design system.
 */
export const InputWarning = React.forwardRef<HTMLParagraphElement, InputWarningProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { warningId } = useInputContext();
    const Comp = asChild ? Slot : 'p';
    
    return (
      <Comp
        ref={ref}
        id={warningId}
        role="alert"
        className={cn("text-sm leading-relaxed mt-1.5 text-warning", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

InputWarning.displayName = 'InputWarning';

