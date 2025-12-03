"use client";

import React from 'react';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useDrawerContext } from './DrawerContext';

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
  ({ children, asChild, onClick, ...props }, ref) => {
    const { setOpen } = useDrawerContext();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(true);
      onClick?.(e);
    };
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    
    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DrawerTrigger.displayName = 'DrawerTrigger';

