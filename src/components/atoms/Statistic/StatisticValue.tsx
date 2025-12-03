"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface StatisticValueProps extends ComposableProps<'div'> {
  /**
   * Value text
   */
  children: React.ReactNode;
}

/**
 * StatisticValue Component
 *
 * A composable component for the value of a statistic.
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
export const StatisticValue = React.forwardRef<HTMLDivElement, StatisticValueProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[57px]", className)}
        {...props}
      >
        <Typography variant="body-primary-regular" color="primary" className="relative shrink-0 text-nowrap whitespace-pre">
          {children}
        </Typography>
      </Comp>
    );
  }
);

StatisticValue.displayName = 'StatisticValue';

