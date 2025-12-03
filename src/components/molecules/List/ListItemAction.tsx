"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ListItemActionProps extends ComposableProps<'div'> {
  /**
   * Action content (e.g., buttons, icons).
   */
  children?: React.ReactNode;
}

/**
 * ListItemAction Component
 *
 * A composable component for action elements within list items.
 * Typically used within ListItem.
 *
 * @public
 *
 * @example
 * ```tsx
 * <ListItem>
 *   <ListItemContent>
 *     <ListItemTitle>Item Title</ListItemTitle>
 *   </ListItemContent>
 *   <ListItemAction>
 *     <Button size="sm">Action</Button>
 *   </ListItemAction>
 * </ListItem>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled with proper spacing.
 */
export const ListItemAction = React.forwardRef<HTMLDivElement, ListItemActionProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center gap-[var(--spacing-x2)] flex-shrink-0",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ListItemAction.displayName = 'ListItemAction';

