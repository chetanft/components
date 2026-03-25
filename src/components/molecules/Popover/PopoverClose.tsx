"use client";

import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../../lib/utils';
import type { ComposableProps } from '../../../lib/slot';
import { Icon } from '../../atoms/Icons';

/**
 * PopoverClose component props
 *
 * @public
 */
export interface PopoverCloseProps extends Omit<ComposableProps<'button'>, 'children'> {
  /**
   * Custom close button content (optional)
   * If not provided, uses default close icon
   */
  children?: React.ReactNode;
}

/**
 * PopoverClose Component
 *
 * A composable close button for the popover.
 * Automatically closes the popover when clicked.
 *
 * @public
 *
 * @example
 * ```tsx
 * <PopoverContent>
 *   <PopoverClose />
 *   <p>Popover content</p>
 * </PopoverContent>
 *
 * // Custom close button
 * <PopoverClose asChild>
 *   <Button variant="ghost" size="sm">Close</Button>
 * </PopoverClose>
 * ```
 *
 * @remarks
 * - Automatically handles closing the popover
 * - Supports `asChild` prop to merge with custom button
 * - Uses default close icon if no children provided
 * - Accessible: includes proper ARIA labels
 */
export const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ className, asChild, children, ...props }, ref) => {
    if (asChild) {
      return (
        <PopoverPrimitive.Close
          ref={ref}
          asChild
          data-slot="popover-close"
          {...props}
        >
          {children}
        </PopoverPrimitive.Close>
      );
    }

    return (
      <PopoverPrimitive.Close
        ref={ref}
        className={cn(
          "rounded-[var(--radius-sm)]",
          "flex items-center justify-center",
          "transition-colors duration-[var(--transition-fast)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--neutral)] focus:ring-offset-2",
          "cursor-pointer",
          "absolute top-[var(--spacing-x2)] right-[var(--spacing-x2)]",
          "w-[var(--spacing-x7)] h-[var(--spacing-x7)] p-0 m-0",
          "hover:bg-[var(--bg-secondary)]",
          className
        )}
        aria-label="Close popover"
        data-slot="popover-close"
        {...props}
      >
        {children || (
          <Icon
            name="cross"
            size="md"
            className="text-[var(--tertiary)] pointer-events-none flex items-center justify-center m-0 p-0"
          />
        )}
      </PopoverPrimitive.Close>
    );
  }
);

PopoverClose.displayName = 'PopoverClose';
