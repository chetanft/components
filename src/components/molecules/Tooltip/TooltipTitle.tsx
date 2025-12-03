"use client";

import React from 'react';
import { Typography } from '../../atoms/Typography';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface TooltipTitleProps extends ComposableProps<'div'> {
  /**
   * The title text.
   */
  children: React.ReactNode;
}

/**
 * TooltipTitle Component
 *
 * A composable component for the title/heading of a Tooltip.
 * Typically used within TooltipContent.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>...</TooltipTrigger>
 *   <TooltipContent>
 *     <TooltipTitle>Tooltip Title</TooltipTitle>
 *     <TooltipDescription>Description</TooltipDescription>
 *   </TooltipContent>
 * </Tooltip>
 * ```
 *
 * @remarks
 * - Wraps the Typography component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Uses body-secondary-semibold variant for prominent styling.
 */
export const TooltipTitle = React.forwardRef<HTMLDivElement, TooltipTitleProps>(
  ({ className, children, asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={cn("mb-1", className)} {...props}>
          <Typography variant="body-secondary-semibold">
            {children}
          </Typography>
        </Slot>
      );
    }
    
    return (
      <div className={cn("flex justify-between items-center mb-1", className)} {...props}>
        <Typography variant="body-secondary-semibold" ref={ref as any}>
          {children}
        </Typography>
      </div>
    );
  }
);

TooltipTitle.displayName = 'TooltipTitle';

