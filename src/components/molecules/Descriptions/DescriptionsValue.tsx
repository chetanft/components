"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface DescriptionsValueProps extends ComposableProps<'div'> {
  /**
   * Value content.
   */
  children: React.ReactNode;
}

/**
 * DescriptionsValue Component
 *
 * A composable component for the value of a description item.
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
 * - Uses body-primary-regular variant for value styling.
 */
export const DescriptionsValue = React.forwardRef<HTMLDivElement, DescriptionsValueProps>(
  ({ className, children, asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={className} {...props}>
          <Typography variant="body-primary-regular" className="whitespace-pre-wrap" style={{ color: 'var(--primary-500)' }}>
            {children}
          </Typography>
        </Slot>
      );
    }
    
    return (
      <div className={cn("flex-1", className)} ref={ref} {...props}>
        {React.isValidElement(children) ? (
          children
        ) : (
          <Typography variant="body-primary-regular" className="whitespace-pre-wrap" style={{ color: 'var(--primary-500)' }}>
            {children}
          </Typography>
        )}
      </div>
    );
  }
);

DescriptionsValue.displayName = 'DescriptionsValue';

