"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * DrawerFooter component props
 * 
 * @public
 */
export interface DrawerFooterProps extends ComposableProps<'div'> {
  /**
   * Footer content (typically action buttons)
   */
  children: React.ReactNode;
}

/**
 * DrawerFooter Component
 * 
 * A composable footer section for the drawer.
 * Typically contains action buttons.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <DrawerContent>
 *   <DrawerHeader>
 *     <DrawerTitle>Confirm</DrawerTitle>
 *   </DrawerHeader>
 *   <DrawerBody>Content</DrawerBody>
 *   <DrawerFooter>
 *     <Button variant="secondary">Cancel</Button>
 *     <Button variant="primary">Confirm</Button>
 *   </DrawerFooter>
 * </DrawerContent>
 * ```
 * 
 * @remarks
 * - Provides consistent footer styling
 * - Supports `asChild` prop for custom element composition
 * - Use with Button components for actions
 */
export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex-shrink-0 px-[var(--spacing-x6)] py-[var(--spacing-x4)] border-t border-[var(--color-border-secondary)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

DrawerFooter.displayName = 'DrawerFooter';

