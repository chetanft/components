"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography, type TypographyColor } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useDescriptionsContext } from './Descriptions';

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
  ({ className, children, asChild, color: _color, ...props }, ref) => {
    const { bordered } = useDescriptionsContext();
    const paddingClass = bordered ? "px-[var(--spacing-x4)] pt-[var(--spacing-x3)] pb-[var(--spacing-x2)]" : "";
    if (asChild) {
      return (
        <Slot ref={ref} className={cn(paddingClass, className)} {...props}>
          <Typography variant="title-secondary" className="font-semibold text-[var(--primary)]">
            {children}
          </Typography>
        </Slot>
      );
    }

    return (
      <Typography variant="title-secondary" className={cn("font-semibold text-[var(--primary)]", paddingClass, className)} ref={ref} {...props}>
        {children}
      </Typography>
    );
  }
);

DescriptionsTitle.displayName = 'DescriptionsTitle';

