"use client";

import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '../../../lib/utils';
import type { ComposableProps } from '../../../lib/slot';

/**
 * AlertDialogCancel component props
 *
 * @public
 */
export interface AlertDialogCancelProps extends ComposableProps<'button'> {
  /**
   * Cancel button content
   */
  children: React.ReactNode;
}

/**
 * AlertDialogCancel Component
 *
 * The cancel button for the alert dialog.
 * Styled as a secondary/outline button by default.
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
export const AlertDialogCancel = React.forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  ({ children, className, asChild, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Cancel
        ref={ref}
        asChild={asChild}
        className={cn(
          "inline-flex items-center justify-center",
          "h-component-md text-component-md",
          "rounded-component px-4 py-2",
          "font-medium",
          "border border-[var(--border-primary)]",
          "bg-transparent text-[var(--primary)]",
          "hover:bg-[var(--bg-secondary)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-component",
          className
        )}
        data-slot="alert-dialog-cancel"
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Cancel>
    );
  }
);

AlertDialogCancel.displayName = 'AlertDialogCancel';
