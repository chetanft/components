"use client";

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../../lib/utils';
import { type ComposableProps } from '../../../lib/slot';

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
 * Provides accessible heading semantics with auto-generated unique IDs.
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
 * - Renders as an h2 element by default via Radix Dialog.Title
 * - Supports `asChild` prop for custom element composition
 * - Automatically receives proper ARIA attributes with unique IDs
 * - Use within DrawerHeader for consistent styling
 */
export const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ children, className, asChild, ...props }, ref) => {
    return (
      <DialogPrimitive.Title
        ref={ref}
        asChild={asChild}
        className={cn(
          "text-[length:var(--font-size-xl-rem)] font-semibold text-[var(--primary)]",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Title>
    );
  }
);

DrawerTitle.displayName = 'DrawerTitle';
