"use client";

import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

export interface ContextMenuSubTriggerProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> {
  /**
   * When true, adds left padding to align with items that have indicators.
   * @default false
   */
  inset?: boolean;
  children?: React.ReactNode;
}

/**
 * ContextMenuSubTrigger Component
 *
 * Triggers a sub-menu to open. Displays a chevron icon on the right.
 *
 * @public
 */
const ContextMenuSubTrigger = React.forwardRef<HTMLDivElement, ContextMenuSubTriggerProps>(
  ({ className, inset, children, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.SubTrigger
        ref={ref}
        className={cn(
          'flex cursor-default select-none items-center rounded-[var(--radius-sm)] px-[var(--spacing-x2)] py-[var(--spacing-x1-5)] text-sm outline-none',
          'text-[var(--primary)]',
          'focus:bg-[var(--bg-secondary)] focus:text-[var(--primary)]',
          'data-[state=open]:bg-[var(--bg-secondary)]',
          inset && 'pl-[var(--spacing-x8)]',
          className
        )}
        data-slot="context-menu-sub-trigger"
        {...props}
      >
        {children}
        <Icon
          name="chevron-right"
          size={16}
          className="ml-auto"
        />
      </ContextMenuPrimitive.SubTrigger>
    );
  }
);

ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

export { ContextMenuSubTrigger };
