"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useTooltipContext } from './TooltipContext';

export interface TooltipArrowProps extends ComposableProps<'div'> {
  /**
   * Custom arrow content (optional)
   */
  children?: React.ReactNode;
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
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled and positioned based on Tooltip context.
 */
export const TooltipArrow = React.forwardRef<HTMLDivElement, TooltipArrowProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { placement, align, color } = useTooltipContext();
    
    const tipBaseClasses = 'absolute w-0 h-0 border-[var(--spacing-x1)] border-transparent';
    
    const tipPlacementClasses = {
      top: cn(
        tipBaseClasses,
        'bottom-[-var(--spacing-x1)] border-b-0',
        color === 'white' ? 'border-t-[var(--color-bg-primary)]' : 'border-t-[var(--color-primary)]'
      ),
      bottom: cn(
        tipBaseClasses,
        'top-[-var(--spacing-x1)] border-t-0',
        color === 'white' ? 'border-b-surface' : 'border-b-primary'
      ),
      left: cn(
        tipBaseClasses,
        'right-[-var(--spacing-x1)] border-r-0',
        color === 'white' ? 'border-l-surface' : 'border-l-primary'
      ),
      right: cn(
        tipBaseClasses,
        'left-[-var(--spacing-x1)] border-l-0',
        color === 'white' ? 'border-r-surface' : 'border-r-primary'
      ),
    };
    
    const tipAlignClasses = {
      start: placement === 'top' || placement === 'bottom' ? 'left-[var(--spacing-x4)]' : 'top-[var(--spacing-x4)]',
      center: placement === 'top' || placement === 'bottom' ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2',
      end: placement === 'top' || placement === 'bottom' ? 'right-[var(--spacing-x4)] left-auto' : 'bottom-[var(--spacing-x4)] top-auto',
    };
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(tipPlacementClasses[placement], tipAlignClasses[align], className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

TooltipArrow.displayName = 'TooltipArrow';

