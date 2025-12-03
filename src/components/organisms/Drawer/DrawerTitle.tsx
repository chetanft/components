"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * DrawerTitle component props
 * 
 * @public
 */
export interface DrawerTitleProps extends ComposableProps<'h2'> {
  /**
   * Title text
   */
  children: React.ReactNode;
}

/**
 * DrawerTitle Component
 * 
 * A composable title component for the drawer header.
 * Provides accessible heading semantics.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <DrawerHeader>
 *   <DrawerTitle>Settings</DrawerTitle>
 *   <DrawerClose />
 * </DrawerHeader>
 * ```
 * 
 * @remarks
 * - Renders as an h2 element by default
 * - Supports `asChild` prop for custom element composition
 * - Automatically receives proper ARIA attributes
 * - Use within DrawerHeader for consistent styling
 */
export const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h2';
    
    return (
      <Comp
        ref={ref}
        id="drawer-title"
        className={cn(
          "text-xl font-semibold text-[var(--color-primary)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

DrawerTitle.displayName = 'DrawerTitle';

