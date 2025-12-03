"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useInputContext } from './InputContext';

export interface InputHelperProps extends ComposableProps<'p'> {
  /**
   * The helper text content.
   */
  children: React.ReactNode;
}

/**
 * InputHelper Component
 *
 * A composable component for displaying helper text below an Input field.
 * Provides additional context or instructions for the user.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Input>
 *   <InputLabel>Username</InputLabel>
 *   <InputField />
 *   <InputHelper>Choose a unique username</InputHelper>
 * </Input>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets ID for accessibility.
 * - Styled with helper text color from design system.
 */
export const InputHelper = React.forwardRef<HTMLParagraphElement, InputHelperProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { helperId } = useInputContext();
    const Comp = asChild ? Slot : 'p';
    
    return (
      <Comp
        ref={ref}
        id={helperId}
        className={cn("text-sm leading-relaxed mt-1.5 text-helper dark:text-helper-dark", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

InputHelper.displayName = 'InputHelper';

