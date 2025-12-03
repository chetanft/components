"use client";

import React from 'react';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useTooltipContext } from './TooltipContext';

export interface TooltipTriggerProps extends ComposableProps<'div'> {
  /**
   * The trigger element content.
   */
  children?: React.ReactNode;
}

/**
 * TooltipTrigger Component
 *
 * A composable component that triggers the display of a Tooltip.
 * Wraps the element that should show the tooltip on hover/focus.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     <TooltipTitle>Tooltip Title</TooltipTitle>
 *     <TooltipDescription>Tooltip description</TooltipDescription>
 *   </TooltipContent>
 * </Tooltip>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles hover and focus events to show/hide tooltip.
 * - Accessible: includes ARIA attributes for tooltip relationships.
 */
export const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ className, children, asChild, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
    const { setOpen } = useTooltipContext();
    
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setOpen(true);
      onMouseEnter?.(e);
    };
    
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setOpen(false);
      onMouseLeave?.(e);
    };
    
    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
      setOpen(true);
      onFocus?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      setOpen(false);
      onBlur?.(e);
    };
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

TooltipTrigger.displayName = 'TooltipTrigger';

