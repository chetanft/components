"use client";

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { type ComposableProps } from '../../../lib/slot';

/**
 * DrawerTrigger component props
 *
 * @public
 */
export interface DrawerTriggerProps extends ComposableProps<'button'> {
  /**
   * Trigger content
   */
  children: React.ReactNode;
}

/**
 * DrawerTrigger Component
 *
 * A composable trigger button that opens the drawer when clicked.
 * Must be used within a Drawer component.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Drawer>
 *   <DrawerTrigger>
 *     <Button>Open Drawer</Button>
 *   </DrawerTrigger>
 *   <DrawerContent>
 *     // drawer content
 *   </DrawerContent>
 * </Drawer>
 * ```
 *
 * @remarks
 * - Automatically handles opening the drawer on click
 * - Supports `asChild` prop to merge props with child element
 * - Use with Button or any clickable element
 */
export const DrawerTrigger = React.forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ children, asChild, ...props }, ref) => {
    return (
      <DialogPrimitive.Trigger
        ref={ref}
        asChild={asChild}
        {...props}
      >
        {children}
      </DialogPrimitive.Trigger>
    );
  }
);

DrawerTrigger.displayName = 'DrawerTrigger';
