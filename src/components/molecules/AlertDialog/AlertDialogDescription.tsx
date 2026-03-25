"use client";

import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '../../../lib/utils';
import type { ComposableProps } from '../../../lib/slot';

/**
 * AlertDialogDescription component props
 *
 * @public
 */
export interface AlertDialogDescriptionProps extends ComposableProps<'p'> {
  /**
   * Description text
   */
  children: React.ReactNode;
}

/**
 * AlertDialogDescription Component
 *
 * A composable description component for the alert dialog header.
 * Provides accessible description text for screen readers via Radix auto-IDs.
 *
 * @public
 *
 * @example
 * ```tsx
 * <AlertDialogHeader>
 *   <AlertDialogTitle>Are you sure?</AlertDialogTitle>
 *   <AlertDialogDescription>
 *     This action cannot be undone.
 *   </AlertDialogDescription>
 * </AlertDialogHeader>
 * ```
 */
export const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  ({ children, className, asChild, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Description
        ref={ref}
        asChild={asChild}
        className={cn(
          "text-[length:var(--font-size-sm-rem)] text-[var(--tertiary)] mt-[var(--spacing-x1)]",
          className
        )}
        data-slot="alert-dialog-description"
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Description>
    );
  }
);

AlertDialogDescription.displayName = 'AlertDialogDescription';
