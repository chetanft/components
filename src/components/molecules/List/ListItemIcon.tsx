"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ListItemIconProps extends ComposableProps<'div'> {
  /**
   * Icon content.
   */
  children?: React.ReactNode;
}

/**
 * ListItemIcon Component
 *
 * A composable component for icons within list items.
 * Typically used within ListItem.
 *
 * @public
 *
 * @example
 * ```tsx
 * <ListItem>
 *   <ListItemIcon>
 *     <Icon name="check" />
 *   </ListItemIcon>
 *   <ListItemContent>
 *     <ListItemTitle>Item Title</ListItemTitle>
 *   </ListItemContent>
 * </ListItem>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled with proper spacing.
 */
export const ListItemIcon = React.forwardRef<HTMLDivElement, ListItemIconProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center justify-center flex-shrink-0",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ListItemIcon.displayName = 'ListItemIcon';

