"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * DrawerDescription component props
 * 
 * @public
 */
export interface DrawerDescriptionProps extends ComposableProps<'p'> {
  /**
   * Description text
   */
  children: React.ReactNode;
}

/**
 * DrawerDescription Component
 * 
 * A composable description component for the drawer header.
 * Provides accessible description text for screen readers.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <DrawerHeader>
 *   <DrawerTitle>Settings</DrawerTitle>
 *   <DrawerDescription>
 *     Configure your application preferences
 *   </DrawerDescription>
 * </DrawerHeader>
 * ```
 * 
 * @remarks
 * - Renders as a paragraph element by default
 * - Supports `asChild` prop for custom element composition
 * - Automatically receives proper ARIA attributes
 * - Use within DrawerHeader for consistent styling
 */
export const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    
    return (
      <Comp
        ref={ref}
        id="drawer-description"
        className={cn(
          "text-sm text-[var(--tertiary)] mt-[var(--spacing-x1)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

DrawerDescription.displayName = 'DrawerDescription';

