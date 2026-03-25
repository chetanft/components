"use client";

import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../../../lib/utils';
import { useTooltipContext } from './TooltipContext';

export interface TooltipArrowProps {
  /**
   * Custom arrow content (optional)
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
 * TooltipArrow Component
 *
 * A composable component for the arrow/tip of a Tooltip.
 * Automatically positioned based on Tooltip placement and alignment.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>...</TooltipTrigger>
 *   <TooltipContent>
 *     <TooltipTitle>Title</TooltipTitle>
 *     <TooltipArrow />
 *   </TooltipContent>
 * </Tooltip>
 * ```
 *
 * @remarks
 * - Uses Radix Tooltip.Arrow primitive for automatic positioning.
 * - Automatically styled based on the Tooltip color context.
 */
export const TooltipArrow = React.forwardRef<HTMLDivElement, TooltipArrowProps>(
  ({ className, children: _children, asChild: _asChild }, ref) => {
    const { color } = useTooltipContext();

    return (
      <TooltipPrimitive.Arrow
        ref={ref as React.Ref<SVGSVGElement>}
        className={cn(
          color === 'white' ? 'fill-[var(--bg-primary)]' : 'fill-[var(--primary)]',
          className
        )}
        width={10}
        height={5}
      />
    );
  }
);

TooltipArrow.displayName = 'TooltipArrow';
