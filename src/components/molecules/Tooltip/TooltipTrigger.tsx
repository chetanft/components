"use client";

import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export interface TooltipTriggerProps {
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
 * - Wraps the Radix Tooltip.Trigger primitive.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles hover and focus events to show/hide tooltip.
 * - Accessible: includes ARIA attributes for tooltip relationships.
 */
export const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ className, children, asChild, ...props }, ref) => {
    return (
      <TooltipPrimitive.Trigger
        ref={ref as React.Ref<HTMLButtonElement>}
        className={className}
        asChild={asChild}
        {...props}
      >
        {children}
      </TooltipPrimitive.Trigger>
    );
  }
);

TooltipTrigger.displayName = 'TooltipTrigger';
