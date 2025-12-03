"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * DrawerHeader component props
 * 
 * @public
 */
export interface DrawerHeaderProps extends ComposableProps<'div'> {
  /**
   * Header content (typically DrawerTitle and DrawerDescription)
   */
  children: React.ReactNode;
}

/**
 * DrawerHeader Component
 * 
 * A composable header section for the drawer.
 * Typically contains DrawerTitle and DrawerDescription.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <DrawerContent>
 *   <DrawerHeader>
 *     <DrawerTitle>Settings</DrawerTitle>
 *     <DrawerDescription>
 *       Configure your preferences
 *     </DrawerDescription>
 *   </DrawerHeader>
 *   <DrawerBody>Content</DrawerBody>
 * </DrawerContent>
 * ```
 * 
 * @remarks
 * - Wraps header content with consistent styling
 * - Supports `asChild` prop for custom element composition
 * - Use with DrawerTitle and DrawerDescription for best results
 */
export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center justify-between px-[var(--spacing-x6)] py-[var(--spacing-x4)] border-b border-[var(--color-border-secondary)] flex-shrink-0",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

DrawerHeader.displayName = 'DrawerHeader';

