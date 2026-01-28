"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ListBodyProps extends ComposableProps<'ul'> {
  /**
   * List body content (typically ListItem components).
   */
  children?: React.ReactNode;
}

/**
 * ListBody Component
 *
 * A composable component for the body section of a List.
 * Typically wraps ListItem components.
 *
 * @public
 *
 * @example
 * ```tsx
 * <List>
 *   <ListBody>
 *     <ListItem>
 *       <ListItemContent>
 *         <ListItemTitle>Item 1</ListItemTitle>
 *       </ListItemContent>
 *     </ListItem>
 *   </ListBody>
 * </List>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<ul>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled with list reset styles.
 */
export const ListBody = React.forwardRef<HTMLUListElement, ListBodyProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'ul';
    return (
      <Comp
        ref={ref}
        className={cn(
          "m-0 p-0 list-none",
          "flex flex-col gap-3 pt-2 pb-2 px-4",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ListBody.displayName = 'ListBody';

