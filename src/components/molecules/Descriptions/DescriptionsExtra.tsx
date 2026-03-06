"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useDescriptionsContext } from './Descriptions';

export interface DescriptionsExtraProps extends ComposableProps<'div'> {
  /**
   * Extra content (e.g., action buttons).
   */
  children?: React.ReactNode;
}

/**
 * DescriptionsExtra Component
 *
 * A composable component for extra content in the Descriptions header.
 * Typically used alongside DescriptionsTitle.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Descriptions>
 *   <DescriptionsTitle>Details</DescriptionsTitle>
 *   <DescriptionsExtra>
 *     <Button size="sm">Edit</Button>
 *   </DescriptionsExtra>
 *   <DescriptionsItem>...</DescriptionsItem>
 * </Descriptions>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 */
export const DescriptionsExtra = React.forwardRef<HTMLDivElement, DescriptionsExtraProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { bordered } = useDescriptionsContext();
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp ref={ref} className={cn(bordered && "px-[var(--spacing-x4)] pt-[var(--spacing-x3)] pb-[var(--spacing-x2)] flex items-center justify-end", className)} {...props}>
        {children}
      </Comp>
    );
  }
);

DescriptionsExtra.displayName = 'DescriptionsExtra';

