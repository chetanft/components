"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface DescriptionsItemProps extends ComposableProps<'div'> {
  /**
   * Item content (typically DescriptionsLabel and DescriptionsValue).
   */
  children?: React.ReactNode;
  /**
   * Column span for grid layout
   * @default 1
   */
  span?: number;
}

/**
 * DescriptionsItem Component
 *
 * A composable component for individual description items.
 * Typically wraps DescriptionsLabel and DescriptionsValue.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Descriptions>
 *   <DescriptionsItem span={2}>
 *     <DescriptionsLabel>Name</DescriptionsLabel>
 *     <DescriptionsValue>John Doe</DescriptionsValue>
 *   </DescriptionsItem>
 * </Descriptions>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Supports column span for grid layouts.
 */
export const DescriptionsItem = React.forwardRef<HTMLDivElement, DescriptionsItemProps>(
  ({ className, children, span = 1, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex flex-col",
          className
        )}
        style={{
          gridColumn: `span ${span}`,
        }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

DescriptionsItem.displayName = 'DescriptionsItem';

