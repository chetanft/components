"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { usePopconfirmContext } from './PopconfirmContext';

export interface PopconfirmArrowProps extends ComposableProps<'div'> {
  /**
   * Arrow content (optional).
   */
  children?: React.ReactNode;
}

/**
 * PopconfirmArrow Component
 *
 * A composable component for the arrow/tip of a Popconfirm.
 * Typically used within PopconfirmContent.
 *
 * @public
 *
 * @example
 * ```tsx
 * <PopconfirmContent>
 *   <PopconfirmTitle>Are you sure?</PopconfirmTitle>
 *   <PopconfirmArrow />
 * </PopconfirmContent>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically positioned based on placement.
 */
export const PopconfirmArrow = React.forwardRef<HTMLDivElement, PopconfirmArrowProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { placement } = usePopconfirmContext();
    
    const arrowStyles = {
      top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--color-bg-primary)] border-l-transparent border-r-transparent border-b-transparent',
      bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--color-bg-primary)] border-l-transparent border-r-transparent border-t-transparent',
      left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--color-bg-primary)] border-t-transparent border-b-transparent border-r-transparent',
      right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--color-bg-primary)] border-t-transparent border-b-transparent border-l-transparent',
    };
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("absolute w-0 h-0 border-[6px]", arrowStyles[placement], className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

PopconfirmArrow.displayName = 'PopconfirmArrow';

