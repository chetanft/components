"use client";

import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import type { ComposableProps } from '../../../lib/slot';

/**
 * AlertDialogContent component props
 *
 * @public
 */
export interface AlertDialogContentProps extends ComposableProps<'div'> {
  /**
   * Content children
   */
  children: React.ReactNode;

  /**
   * Apply glassmorphism effect to the alert dialog surface.
   * @default false
   */
  glass?: GlassVariant;
}

/**
 * AlertDialogContent Component
 *
 * The main content wrapper for the alert dialog.
 * Handles backdrop, positioning, and animations.
 * Unlike Modal, AlertDialog cannot be dismissed by clicking outside or pressing ESC.
 *
 * @public
 *
 * @example
 * ```tsx
 * <AlertDialog>
 *   <AlertDialogTrigger>Open</AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Title</AlertDialogTitle>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction>Confirm</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
export const AlertDialogContent = React.forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({
    children,
    className,
    asChild,
    glass,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);

    return (
      <AlertDialogPrimitive.Portal>
        {/* Backdrop / Overlay */}
        <AlertDialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-overlay backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
          data-slot="alert-dialog-overlay"
        />

        {/* Alert Dialog Content */}
        <AlertDialogPrimitive.Content
          ref={ref}
          asChild={asChild}
          className={cn(
            "fixed z-50",
            "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
            "rounded-[var(--radius-lg)]",
            "w-full max-w-[32.5rem] max-h-[90vh]",
            "flex flex-col",
            getGlassClasses(resolvedGlass, "bg-[var(--bg-primary)]", "border border-[var(--border-primary)]"),
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "focus:outline-none",
            className
          )}
          style={{
            boxShadow: 'var(--shadow-xl)',
          }}
          data-slot="alert-dialog-content"
          {...props}
        >
          {children}
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    );
  }
);

AlertDialogContent.displayName = 'AlertDialogContent';
