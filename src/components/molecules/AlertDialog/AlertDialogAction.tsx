"use client";

import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '../../../lib/utils';
import type { ComposableProps } from '../../../lib/slot';

/**
 * AlertDialogAction component props
 *
 * @public
 */
export interface AlertDialogActionProps extends ComposableProps<'button'> {
  /**
   * Action button content
   */
  children: React.ReactNode;
}

/**
 * AlertDialogAction Component
 *
 * The confirm/action button for the alert dialog.
 * Styled as a destructive button by default.
 * Closes the alert dialog when clicked.
 *
 * @public
 *
 * @example
 * ```tsx
 * <AlertDialogFooter>
 *   <AlertDialogCancel>Cancel</AlertDialogCancel>
 *   <AlertDialogAction>Delete</AlertDialogAction>
 * </AlertDialogFooter>
 * ```
 */
export const AlertDialogAction = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ children, className, asChild, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Action
        ref={ref}
        asChild={asChild}
        className={cn(
          "inline-flex items-center justify-center",
          "h-component-md text-component-md",
          "rounded-component px-4 py-2",
          "font-medium",
          "bg-[var(--critical)] text-white",
          "hover:bg-[var(--critical-dark)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--critical)] focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-component",
          className
        )}
        data-slot="alert-dialog-action"
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Action>
    );
  }
);

AlertDialogAction.displayName = 'AlertDialogAction';
