"use client";

import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

export interface PopoverTriggerProps {
  /**
   * The trigger element content.
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Merge props onto the child element instead of wrapping.
   */
  asChild?: boolean;
}

/**
 * PopoverTrigger Component
 *
 * A composable component that triggers the display of a Popover.
 * Wraps the element that should toggle the popover on click.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button>Open popover</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>...</PopoverContent>
 * </Popover>
 * ```
 *
 * @remarks
 * - Wraps the Radix Popover.Trigger primitive.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles click events to show/hide popover.
 * - Accessible: includes ARIA attributes for popover relationships.
 */
export const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ className, children, asChild, ...props }, ref) => {
    return (
      <PopoverPrimitive.Trigger
        ref={ref}
        className={className}
        asChild={asChild}
        data-slot="popover-trigger"
        {...props}
      >
        {children}
      </PopoverPrimitive.Trigger>
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';
