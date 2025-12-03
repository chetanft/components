import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { StatisticTitle } from './StatisticTitle';
import { StatisticValue } from './StatisticValue';

export interface StatisticProps extends ComposableProps<'div'> {
  /**
   * The label text (for declarative API)
   * @deprecated Use StatisticTitle component instead
   */
  label?: string;
  
  /**
   * The statistic value (for declarative API)
   * @deprecated Use StatisticValue component instead
   */
  value?: string;
  
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
 * Supports both composable API (recommended) and declarative API (deprecated).
 *
 * @public
 *
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Statistic>
 *   <StatisticValue>100</StatisticValue>
 *   <StatisticTitle>Users</StatisticTitle>
 * </Statistic>
 * 
 * // Declarative API (deprecated)
 * <Statistic label="Users" value="100" />
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Declarative API is deprecated but still functional for backward compatibility.
 */
export const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>(
  ({
    label = "Label",
    value = "Text",
    labelPlacement = "Below",
    className = '',
    children,
    asChild,
    ...props
  }, ref) => {
    // Check if using composable API (has StatisticTitle or StatisticValue as children)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
        child?.type?.displayName === 'StatisticTitle' || child?.type?.displayName === 'StatisticValue'
    );
    
    const Comp = asChild ? Slot : 'div';
    const containerClasses = cn(
      "content-stretch flex flex-col gap-[8px] items-start justify-center relative size-full",
      className
    );
    
    // If using composable API, render with sub-components
    if (hasComposableChildren) {
        if (process.env.NODE_ENV !== 'production' && (label || value)) {
            console.warn(
                'Statistic: Using deprecated props (label, value) with composable API. ' +
                'Please use StatisticTitle and StatisticValue components instead. ' +
                'See migration guide: docs/migrations/composable-migration.md'
            );
        }
        
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
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && (label || value)) {
        console.warn(
            'Statistic: Declarative API (label, value props) is deprecated. ' +
            'Please migrate to composable API using StatisticTitle and StatisticValue components. ' +
            'See migration guide: docs/migrations/composable-migration.md'
        );
    }
    
    const renderLabel = () => (
      <StatisticTitle>{label}</StatisticTitle>
    );

    const renderValue = () => (
      <StatisticValue>{value}</StatisticValue>
    );

    if (labelPlacement === "Top") {
      return (
        <Comp ref={ref} className={containerClasses} data-name="Label Placement=Top" {...props}>
          {renderLabel()}
          {renderValue()}
        </Comp>
      );
    }

    // Default: Below
    return (
      <Comp ref={ref} className={containerClasses} data-name="Label Placement=Below" {...props}>
        {renderValue()}
        {renderLabel()}
      </Comp>
    );
  }
);

Statistic.displayName = 'Statistic';
