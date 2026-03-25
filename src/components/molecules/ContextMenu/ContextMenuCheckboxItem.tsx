"use client";

import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { cn } from '../../../lib/utils';

export interface ContextMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem> {
  children?: React.ReactNode;
}

/**
 * ContextMenuCheckboxItem Component
 *
 * A menu item that can be toggled on/off with a check indicator.
 *
 * @public
 */
const ContextMenuCheckboxItem = React.forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ className, children, checked, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.CheckboxItem
        ref={ref}
        className={cn(
          'relative flex cursor-default select-none items-center rounded-[var(--radius-sm)] py-[var(--spacing-x1-5)] pl-[var(--spacing-x8)] pr-[var(--spacing-x2)] text-sm outline-none',
          'text-[var(--primary)]',
          'focus:bg-[var(--bg-secondary)] focus:text-[var(--primary)]',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className
        )}
        checked={checked}
        data-slot="context-menu-checkbox-item"
        {...props}
      >
        <span className="absolute left-[var(--spacing-x2)] flex h-3.5 w-3.5 items-center justify-center">
          <ContextMenuPrimitive.ItemIndicator>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </ContextMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </ContextMenuPrimitive.CheckboxItem>
    );
  }
);

ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

export { ContextMenuCheckboxItem };
