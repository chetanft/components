"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ListItemContentProps extends ComposableProps<'div'> {
  /**
   * Content wrapper for list item.
   */
  children?: React.ReactNode;
}

/**
 * ListItemContent Component
 *
 * A composable component for the main content area of a list item.
 * Typically wraps ListItemTitle and ListItemDescription.
 *
 * @public
 *
 * @example
 * ```tsx
 * <ListItem>
 *   <ListItemContent>
 *     <ListItemTitle>Item Title</ListItemTitle>
 *     <ListItemDescription>Item description</ListItemDescription>
 *   </ListItemContent>
 * </ListItem>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled with flex layout.
 */
export const ListItemContent = React.forwardRef<HTMLDivElement, ListItemContentProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex-1 flex flex-col",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ListItemContent.displayName = 'ListItemContent';

