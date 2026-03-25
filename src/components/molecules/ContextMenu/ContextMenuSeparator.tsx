"use client";

import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { cn } from '../../../lib/utils';

export interface ContextMenuSeparatorProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator> {}

/**
 * ContextMenuSeparator Component
 *
 * A visual divider between groups of menu items.
 *
 * @public
 */
const ContextMenuSeparator = React.forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Separator
        ref={ref}
        className={cn(
          '-mx-[var(--spacing-x1)] my-[var(--spacing-x1)] h-px bg-[var(--border-secondary)]',
          className
        )}
        data-slot="context-menu-separator"
        {...props}
      />
    );
  }
);

ContextMenuSeparator.displayName = 'ContextMenuSeparator';

export { ContextMenuSeparator };
