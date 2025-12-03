"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ListFooterProps extends ComposableProps<'div'> {
  /**
   * Footer content.
   */
  children?: React.ReactNode;
}

/**
 * ListFooter Component
 *
 * A composable component for the footer section of a List.
 * Typically used at the bottom of a List.
 *
 * @public
 *
 * @example
 * ```tsx
 * <List>
 *   <ListBody>
 *     <ListItem>...</ListItem>
 *   </ListBody>
 *   <ListFooter>
 *     <Button>Load More</Button>
 *   </ListFooter>
 * </List>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled with border and padding.
 */
export const ListFooter = React.forwardRef<HTMLDivElement, ListFooterProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "border-t border-[var(--color-border-secondary)] py-[var(--spacing-x3)] px-[var(--spacing-x4)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ListFooter.displayName = 'ListFooter';

