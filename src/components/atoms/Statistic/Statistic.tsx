import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface StatisticProps extends ComposableProps<'div'> {
  /**
   * Label placement relative to value
   * @default "Below"
   */
  labelPlacement?: "Below" | "Top";

  /**
   * Statistic content (for composable API)
   */
  children?: React.ReactNode;
}

/**
 * Statistic Component
 *
 * A composable component for displaying statistics with labels and values.
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
export const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>(
  ({
    labelPlacement = "Below",
    className = '',
    children,
    asChild,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : 'div';
    const containerClasses = cn(
      "content-stretch flex flex-col gap-[8px] items-start justify-center relative size-full",
      className
    );

    // Determine order based on labelPlacement
    const orderedChildren = labelPlacement === "Top"
        ? React.Children.toArray(children).reverse()
        : React.Children.toArray(children);
    // Cast children to exclude bigint which Slot doesn't accept
    const safeChildren = orderedChildren as Exclude<React.ReactNode, bigint>[];

    return (
        <Comp
            ref={ref}
            className={containerClasses}
            data-name={`Label Placement=${labelPlacement}`}
            {...props}
        >
            {safeChildren}
        </Comp>
    );
  }
);

Statistic.displayName = 'Statistic';
