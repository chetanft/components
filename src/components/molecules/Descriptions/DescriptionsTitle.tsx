"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface DescriptionsTitleProps extends ComposableProps<'div'> {
  /**
   * Title text.
   */
  children: React.ReactNode;
}

/**
 * DescriptionsTitle Component
 *
 * A composable component for the title of a Descriptions component.
 * Typically used at the top of Descriptions.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Descriptions>
 *   <DescriptionsTitle>Details</DescriptionsTitle>
 *   <DescriptionsItem>
 *     <DescriptionsLabel>Name</DescriptionsLabel>
 *     <DescriptionsValue>John Doe</DescriptionsValue>
 *   </DescriptionsItem>
 * </Descriptions>
 * ```
 *
 * @remarks
 * - Wraps the Typography component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Uses title-secondary variant for prominent styling.
 */
export const DescriptionsTitle = React.forwardRef<HTMLDivElement, DescriptionsTitleProps>(
  ({ className, children, asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={className} {...props}>
          <Typography variant="title-secondary" className="font-semibold text-[var(--color-primary)]">
            {children}
          </Typography>
        </Slot>
      );
    }
    
    return (
      <Typography variant="title-secondary" className={cn("font-semibold text-[var(--color-primary)]", className)} ref={ref as any} {...props}>
        {children}
      </Typography>
    );
  }
);

DescriptionsTitle.displayName = 'DescriptionsTitle';

