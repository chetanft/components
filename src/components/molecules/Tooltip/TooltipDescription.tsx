"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface TooltipDescriptionProps extends ComposableProps<'div'> {
  /**
   * The description text.
   */
  children: React.ReactNode;
}

/**
 * TooltipDescription Component
 *
 * A composable component for the description/content of a Tooltip.
 * Typically used within TooltipContent.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>...</TooltipTrigger>
 *   <TooltipContent>
 *     <TooltipTitle>Title</TooltipTitle>
 *     <TooltipDescription>Description text</TooltipDescription>
 *   </TooltipContent>
 * </Tooltip>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Uses body text styling.
 */
export const TooltipDescription = React.forwardRef<HTMLDivElement, TooltipDescriptionProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("text-sm-rem", className)}
        style={{ fontSize: 'var(--font-size-sm-rem)' }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

TooltipDescription.displayName = 'TooltipDescription';

