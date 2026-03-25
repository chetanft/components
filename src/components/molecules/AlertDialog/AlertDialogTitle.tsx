"use client";

import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '../../../lib/utils';
import type { ComposableProps } from '../../../lib/slot';

/**
 * AlertDialogTitle component props
 *
 * @public
 */
export interface AlertDialogTitleProps extends ComposableProps<'h2'> {
  /**
   * Title text
   */
  children: React.ReactNode;
}

/**
 * AlertDialogTitle Component
 *
 * A composable title component for the alert dialog header.
 * Provides accessible heading semantics via Radix auto-IDs.
 *
 * @public
 *
 * @example
 * ```tsx
 * <AlertDialogHeader>
 *   <AlertDialogTitle>Are you sure?</AlertDialogTitle>
 * </AlertDialogHeader>
 * ```
 */
export const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  ({ children, className, asChild, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Title
        ref={ref}
        asChild={asChild}
        className={cn(
          "text-[length:var(--font-size-xl-rem)] font-semibold text-[var(--primary)]",
          className
        )}
        data-slot="alert-dialog-title"
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Title>
    );
  }
);

AlertDialogTitle.displayName = 'AlertDialogTitle';
