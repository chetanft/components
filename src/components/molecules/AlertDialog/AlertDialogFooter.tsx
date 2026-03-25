"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * AlertDialogFooter component props
 *
 * @public
 */
export interface AlertDialogFooterProps extends ComposableProps<'div'> {
  /**
   * Footer content (typically AlertDialogCancel and AlertDialogAction)
   */
  children: React.ReactNode;
}

/**
 * AlertDialogFooter Component
 *
 * A composable footer section for the alert dialog.
 * Typically contains AlertDialogCancel and AlertDialogAction buttons.
 *
 * @public
 *
 * @example
 * ```tsx
 * <AlertDialogContent>
 *   <AlertDialogHeader>...</AlertDialogHeader>
 *   <AlertDialogFooter>
 *     <AlertDialogCancel>Cancel</AlertDialogCancel>
 *     <AlertDialogAction>Delete</AlertDialogAction>
 *   </AlertDialogFooter>
 * </AlertDialogContent>
 * ```
 */
export const AlertDialogFooter = React.forwardRef<HTMLDivElement, AlertDialogFooterProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center justify-end gap-[var(--spacing-x2)] px-[var(--spacing-x6)] py-[var(--spacing-x4)] border-t border-[var(--border-secondary)]",
          className
        )}
        data-slot="alert-dialog-footer"
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

AlertDialogFooter.displayName = 'AlertDialogFooter';
