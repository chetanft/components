"use client";

import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { cn } from '../../../lib/utils';

export interface ContextMenuLabelProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> {
  /**
   * When true, adds left padding to align with items that have indicators.
   * @default false
   */
  inset?: boolean;
}

/**
 * ContextMenuLabel Component
 *
 * A non-interactive label used to title a section of menu items.
 *
 * @public
 */
const ContextMenuLabel = React.forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ className, inset, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Label
        ref={ref}
        className={cn(
          'px-[var(--spacing-x2)] py-[var(--spacing-x1-5)] text-sm font-semibold text-[var(--primary)]',
          inset && 'pl-[var(--spacing-x8)]',
          className
        )}
        data-slot="context-menu-label"
        {...props}
      />
    );
  }
);

ContextMenuLabel.displayName = 'ContextMenuLabel';

export { ContextMenuLabel };
