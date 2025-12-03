"use client";

import React from 'react';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ListItemTitleProps extends ComposableProps<'div'> {
  /**
   * Title text.
   */
  children: React.ReactNode;
}

/**
 * ListItemTitle Component
 *
 * A composable component for the title of a list item.
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
 * - Uses body-primary-semibold variant for prominent styling.
 */
export const ListItemTitle = React.forwardRef<HTMLDivElement, ListItemTitleProps>(
  ({ className, children, asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={className} {...props}>
          <Typography variant="body-primary-semibold">
            {children}
          </Typography>
        </Slot>
      );
    }
    
    return (
      <Typography variant="body-primary-semibold" ref={ref as any} className={className} {...props}>
        {children}
      </Typography>
    );
  }
);

ListItemTitle.displayName = 'ListItemTitle';

