"use client";

import React from 'react';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ListItemDescriptionProps extends ComposableProps<'div'> {
  /**
   * Description text.
   */
  children: React.ReactNode;
}

/**
 * ListItemDescription Component
 *
 * A composable component for the description of a list item.
 * Typically used within ListItemContent.
 *
 * @public
 *
 * @example
 * ```tsx
 * <ListItemContent>
 *   <ListItemTitle>Item Title</ListItemTitle>
 *   <ListItemDescription>Item description</ListItemDescription>
 * </ListItemContent>
 * ```
 *
 * @remarks
 * - Wraps the Typography component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Uses body-secondary-regular variant for secondary text.
 */
export const ListItemDescription = React.forwardRef<HTMLDivElement, ListItemDescriptionProps>(
  ({ className, children, asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={className} {...props}>
          <Typography variant="body-secondary-regular">
            {children}
          </Typography>
        </Slot>
      );
    }
    
    return (
      <Typography variant="body-secondary-regular" ref={ref as any} className={className} {...props}>
        {children}
      </Typography>
    );
  }
);

ListItemDescription.displayName = 'ListItemDescription';

