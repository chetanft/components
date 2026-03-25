"use client";

import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../../lib/utils';

export interface PopoverArrowProps {
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Arrow width in pixels.
   * @default 10
   */
  width?: number;
  /**
   * Arrow height in pixels.
   * @default 5
   */
  height?: number;
}

/**
 * PopoverArrow Component
 *
 * An optional arrow pointing from the popover to the trigger.
 * Automatically positioned based on popover side and alignment.
 *
 * @public
 *
 * @example
 * ```tsx
 * <PopoverContent>
 *   <p>Content here</p>
 *   <PopoverArrow />
 * </PopoverContent>
 * ```
 *
 * @remarks
 * - Uses Radix Popover.Arrow primitive for automatic positioning.
 * - Must be rendered inside PopoverContent.
 */
export const PopoverArrow = React.forwardRef<SVGSVGElement, PopoverArrowProps>(
  ({ className, width = 10, height = 5, ...props }, ref) => {
    return (
      <PopoverPrimitive.Arrow
        ref={ref}
        className={cn(
          'fill-[var(--bg-primary)]',
          className
        )}
        width={width}
        height={height}
        data-slot="popover-arrow"
        {...props}
      />
    );
  }
);

PopoverArrow.displayName = 'PopoverArrow';
