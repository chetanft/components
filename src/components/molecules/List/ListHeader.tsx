"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ListHeaderProps extends ComposableProps<'div'> {
  /**
   * Header content.
   */
  children?: React.ReactNode;
}

/**
 * ListHeader Component
 *
 * A composable component for the header section of a List.
 * Typically used at the top of a List.
 *
 * @public
 *
 * @example
 * ```tsx
 * <List>
 *   <ListHeader>
 *     <Typography variant="title-secondary">List Header</Typography>
 *   </ListHeader>
 *   <ListBody>
 *     <ListItem>...</ListItem>
 *   </ListBody>
 * </List>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled with border and padding.
 */
export const ListHeader = React.forwardRef<HTMLDivElement, ListHeaderProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "border-b border-[var(--color-border-secondary)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ListHeader.displayName = 'ListHeader';

