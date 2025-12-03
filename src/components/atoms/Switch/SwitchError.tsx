"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useSwitchContext } from './SwitchContext';

export interface SwitchErrorProps extends ComposableProps<'p'> {
  /**
   * The error message content.
   */
  children: React.ReactNode;
}

/**
 * SwitchError Component
 *
 * A composable component for displaying error messages below a Switch.
 * Automatically applies error styling and accessibility attributes.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Switch>
 *   <SwitchInput />
 *   <SwitchLabel>Accept terms</SwitchLabel>
 *   <SwitchError>You must accept the terms</SwitchError>
 * </Switch>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets ID and role for accessibility.
 * - Styled with error color from design system.
 */
export const SwitchError = React.forwardRef<HTMLParagraphElement, SwitchErrorProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { errorId } = useSwitchContext();
    const Comp = asChild ? Slot : 'p';
    
    return (
      <Comp
        ref={ref}
        id={errorId}
        role="alert"
        className={cn("mt-1 text-sm text-critical", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

SwitchError.displayName = 'SwitchError';

