"use client";

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../../lib/utils';
import { type ComposableProps } from '../../../lib/slot';

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
 * Provides accessible description text for screen readers with auto-generated unique IDs.
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
 * - Renders as a paragraph element by default via Radix Dialog.Description
 * - Supports `asChild` prop for custom element composition
 * - Automatically receives proper ARIA attributes with unique IDs
 * - Use within DrawerHeader for consistent styling
 */
export const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ children, className, asChild, ...props }, ref) => {
    return (
      <DialogPrimitive.Description
        ref={ref}
        asChild={asChild}
        className={cn(
          "text-[length:var(--font-size-sm-rem)] text-[var(--tertiary)] mt-[var(--spacing-x1)]",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Description>
    );
  }
);

DrawerDescription.displayName = 'DrawerDescription';
