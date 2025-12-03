"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface DescriptionsLabelProps extends ComposableProps<'div'> {
  /**
   * Label text.
   */
  children: React.ReactNode;
}

/**
 * DescriptionsLabel Component
 *
 * A composable component for the label of a description item.
 * Typically used within DescriptionsItem.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DescriptionsItem>
 *   <DescriptionsLabel>Name</DescriptionsLabel>
 *   <DescriptionsValue>John Doe</DescriptionsValue>
 * </DescriptionsItem>
 * ```
 *
 * @remarks
 * - Wraps the Typography component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Uses body-secondary-regular variant for label styling.
 */
export const DescriptionsLabel = React.forwardRef<HTMLDivElement, DescriptionsLabelProps>(
  ({ className, children, asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={className} {...props}>
          <Typography variant="body-secondary-regular">{children}</Typography>
        </Slot>
      );
    }
    
    return (
      <div className={cn("text-[var(--color-secondary)]", className)} ref={ref} {...props}>
        <Typography variant="body-secondary-regular">{children}</Typography>
      </div>
    );
  }
);

DescriptionsLabel.displayName = 'DescriptionsLabel';

