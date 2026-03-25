"use client";

import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import type { ComposableProps } from '../../../lib/slot';

/**
 * AlertDialogTrigger component props
 *
 * @public
 */
export interface AlertDialogTriggerProps extends ComposableProps<'button'> {
  /**
   * Trigger content
   */
  children: React.ReactNode;
}

/**
 * AlertDialogTrigger Component
 *
 * A composable trigger button that opens the alert dialog when clicked.
 * Must be used within an AlertDialog component.
 *
 * @public
 *
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger>
 *     <Button variant="destructive">Delete</Button>
 *   </AlertDialogTrigger>
 *   <AlertDialogContent>...</AlertDialogContent>
 * </AlertDialog>
 * ```
 */
export const AlertDialogTrigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  ({ children, asChild, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Trigger
        ref={ref}
        asChild={asChild}
        data-slot="alert-dialog-trigger"
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Trigger>
    );
  }
);

AlertDialogTrigger.displayName = 'AlertDialogTrigger';
