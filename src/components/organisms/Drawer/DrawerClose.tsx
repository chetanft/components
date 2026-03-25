"use client";

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

/**
 * DrawerClose component props
 *
 * @public
 */
export interface DrawerCloseProps extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>, 'children'> {
  /**
   * Custom close button content (optional)
   * If not provided, uses default close icon
   */
  children?: React.ReactNode;

  /**
   * Use child element as the rendered element, merging props
   */
  asChild?: boolean;
}

/**
 * DrawerClose Component
 *
 * A composable close button for the drawer header.
 * Automatically closes the drawer when clicked.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DrawerHeader>
 *   <DrawerTitle>Title</DrawerTitle>
 *   <DrawerClose />
 * </DrawerHeader>
 *
 * // Custom close button
 * <DrawerClose asChild>
 *   <Button variant="ghost" size="sm">Close</Button>
 * </DrawerClose>
 * ```
 *
 * @remarks
 * - Automatically handles closing the drawer
 * - Supports `asChild` prop to merge with custom button
 * - Uses default close icon if no children provided
 * - Accessible: includes proper ARIA labels
 */
export const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ className, asChild, children, ...props }, ref) => {
    if (asChild) {
      return (
        <DialogPrimitive.Close
          ref={ref}
          asChild
          {...props}
        >
          {children}
        </DialogPrimitive.Close>
      );
    }

    return (
      <DialogPrimitive.Close
        ref={ref}
        className={cn(
          "p-[var(--spacing-x1)] rounded-[var(--radius-sm)]",
          "hover:bg-[var(--bg-secondary)]",
          "transition-colors duration-[var(--transition-fast)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--neutral)] focus:ring-opacity-20",
          className
        )}
        aria-label="Close drawer"
        {...props}
      >
        {children || (
          <Icon name="cross" size={20} className="text-[var(--tertiary)]" />
        )}
      </DialogPrimitive.Close>
    );
  }
);

DrawerClose.displayName = 'DrawerClose';
