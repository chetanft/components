"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface StatisticTitleProps extends ComposableProps<'div'> {
  /**
   * Title text
   */
  children: React.ReactNode;
}

/**
 * StatisticTitle Component
 *
 * A composable component for the title/label of a statistic.
 * Typically used within Statistic.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Statistic>
 *   <StatisticValue>100</StatisticValue>
 *   <StatisticTitle>Users</StatisticTitle>
 * </Statistic>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 */
export const StatisticTitle = React.forwardRef<HTMLDivElement, StatisticTitleProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("content-stretch flex gap-[4px] items-center justify-start relative shrink-0", className)}
        {...props}
      >
        <Typography variant="body-secondary-medium" color="secondary" className="relative shrink-0 text-nowrap whitespace-pre">
          {children}
        </Typography>
      </Comp>
    );
  }
);

StatisticTitle.displayName = 'StatisticTitle';

