"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ListItemProps extends ComposableProps<'li'> {
  /**
   * List item content.
   */
  children?: React.ReactNode;
}

/**
 * ListItem Component
 *
 * A composable component for individual list items.
 * Typically used within ListBody.
 *
 * @public
 *
 * @example
 * ```tsx
 * <List>
 *   <ListBody>
 *     <ListItem>
 *       <ListItemContent>
 *         <ListItemTitle>Item Title</ListItemTitle>
 *         <ListItemDescription>Item description</ListItemDescription>
 *       </ListItemContent>
 *     </ListItem>
 *   </ListBody>
 * </List>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<li>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled with proper spacing and borders.
 */
export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'li';
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center justify-between",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ListItem.displayName = 'ListItem';

