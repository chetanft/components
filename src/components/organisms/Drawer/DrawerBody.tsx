"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * DrawerBody component props
 * 
 * @public
 */
export interface DrawerBodyProps extends ComposableProps<'div'> {
  /**
   * Body content
   */
  children: React.ReactNode;
  
  /**
   * Custom background color class
   */
  background?: string;
}

/**
 * DrawerBody Component
 * 
 * A composable body section for the drawer content.
 * Contains the main content of the drawer.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <DrawerContent>
 *   <DrawerHeader>
 *     <DrawerTitle>Title</DrawerTitle>
 *   </DrawerHeader>
 *   <DrawerBody>
 *     <p>Main content goes here</p>
 *   </DrawerBody>
 * </DrawerContent>
 * ```
 * 
 * @remarks
 * - Provides scrollable content area
 * - Supports `asChild` prop for custom element composition
 * - Use with DrawerHeader and DrawerFooter for complete drawer structure
 */
export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, asChild, background, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex-1 overflow-y-auto px-[var(--spacing-x6)] py-[var(--spacing-x4)]",
          background ? "" : "bg-[var(--bg-secondary)]/30",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

DrawerBody.displayName = 'DrawerBody';

