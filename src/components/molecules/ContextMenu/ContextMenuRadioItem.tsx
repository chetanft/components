"use client";

import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { cn } from '../../../lib/utils';

export interface ContextMenuRadioItemProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem> {
  children?: React.ReactNode;
}

/**
 * ContextMenuRadioItem Component
 *
 * A radio menu item within a ContextMenuRadioGroup.
 * Displays a dot indicator when selected.
 *
 * @public
 */
const ContextMenuRadioItem = React.forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.RadioItem
        ref={ref}
        className={cn(
          'relative flex cursor-default select-none items-center rounded-[var(--radius-sm)] py-[var(--spacing-x1-5)] pl-[var(--spacing-x8)] pr-[var(--spacing-x2)] text-sm outline-none',
          'text-[var(--primary)]',
          'focus:bg-[var(--bg-secondary)] focus:text-[var(--primary)]',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className
        )}
        data-slot="context-menu-radio-item"
        {...props}
      >
        <span className="absolute left-[var(--spacing-x2)] flex h-3.5 w-3.5 items-center justify-center">
          <ContextMenuPrimitive.ItemIndicator>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="currentColor"
            >
              <circle cx="4" cy="4" r="4" />
            </svg>
          </ContextMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </ContextMenuPrimitive.RadioItem>
    );
  }
);

ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

export { ContextMenuRadioItem };
