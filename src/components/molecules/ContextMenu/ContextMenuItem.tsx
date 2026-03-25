"use client";

import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { cn } from '../../../lib/utils';

export interface ContextMenuItemProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> {
  /**
   * When true, adds left padding to align with items that have indicators (checkbox/radio).
   * @default false
   */
  inset?: boolean;
}

/**
 * ContextMenuItem Component
 *
 * A single actionable item within the context menu.
 *
 * @public
 */
const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, inset, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Item
        ref={ref}
        className={cn(
          'relative flex cursor-default select-none items-center rounded-[var(--radius-sm)] px-[var(--spacing-x2)] py-[var(--spacing-x1-5)] text-sm outline-none',
          'text-[var(--primary)]',
          'focus:bg-[var(--bg-secondary)] focus:text-[var(--primary)]',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          inset && 'pl-[var(--spacing-x8)]',
          className
        )}
        data-slot="context-menu-item"
        {...props}
      />
    );
  }
);

ContextMenuItem.displayName = 'ContextMenuItem';

export { ContextMenuItem };
