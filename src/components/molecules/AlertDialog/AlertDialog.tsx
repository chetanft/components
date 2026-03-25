"use client";

import React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

/**
 * AlertDialog component props
 *
 * @public
 */
export interface AlertDialogProps {
  /**
   * Whether the alert dialog is open/visible
   */
  open?: boolean;

  /**
   * Callback when alert dialog open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Alert dialog content
   * @required
   */
  children: React.ReactNode;
}

/**
 * AlertDialog Component
 *
 * A composable alert dialog component for confirmations and destructive actions.
 * Unlike Modal, AlertDialog cannot be dismissed by clicking outside or pressing ESC.
 *
 * @public
 *
 * @example
 * ```tsx
 * <AlertDialog open={open} onOpenChange={setOpen}>
 *   <AlertDialogTrigger>
 *     <Button variant="destructive">Delete</Button>
 *   </AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
 *       <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction>Delete</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(({
  open,
  onOpenChange,
  children,
}, _ref) => {
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </AlertDialogPrimitive.Root>
  );
});

AlertDialog.displayName = 'AlertDialog';
