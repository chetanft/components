"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useSwitchContext } from './SwitchContext';

export interface SwitchHelperProps extends ComposableProps<'p'> {
  /**
   * The helper text content.
   */
  children: React.ReactNode;
}

/**
 * SwitchHelper Component
 *
 * A composable component for displaying helper text below a Switch.
 * Provides additional context or instructions for the user.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Switch>
 *   <SwitchInput />
 *   <SwitchLabel>Enable notifications</SwitchLabel>
 *   <SwitchHelper>You can change this later</SwitchHelper>
 * </Switch>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets ID for accessibility.
 * - Styled with helper text color from design system.
 */
export const SwitchHelper = React.forwardRef<HTMLParagraphElement, SwitchHelperProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { helperId } = useSwitchContext();
    const Comp = asChild ? Slot : 'p';
    
    return (
      <Comp
        ref={ref}
        id={helperId}
        className={cn("mt-1 text-sm text-[var(--secondary)]", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

SwitchHelper.displayName = 'SwitchHelper';

