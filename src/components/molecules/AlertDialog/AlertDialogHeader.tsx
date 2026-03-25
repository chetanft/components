"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * AlertDialogHeader component props
 *
 * @public
 */
export interface AlertDialogHeaderProps extends ComposableProps<'div'> {
  /**
   * Header content (typically AlertDialogTitle and AlertDialogDescription)
   */
  children: React.ReactNode;
}

/**
 * AlertDialogHeader Component
 *
 * A composable header section for the alert dialog.
 * Typically contains AlertDialogTitle and AlertDialogDescription.
 *
 * @public
 *
 * @example
 * ```tsx
 * <AlertDialogContent>
 *   <AlertDialogHeader>
 *     <AlertDialogTitle>Are you sure?</AlertDialogTitle>
 *     <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
 *   </AlertDialogHeader>
 * </AlertDialogContent>
 * ```
 */
export const AlertDialogHeader = React.forwardRef<HTMLDivElement, AlertDialogHeaderProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(
          "flex flex-col gap-[var(--spacing-x2)] px-[var(--spacing-x6)] py-[var(--spacing-x4)]",
          className
        )}
        data-slot="alert-dialog-header"
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

AlertDialogHeader.displayName = 'AlertDialogHeader';
