"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface DropdownMenuSeparatorProps extends ComposableProps<'div'> {
  /**
   * Separator content (optional).
   */
  children?: React.ReactNode;
}

/**
 * DropdownMenuSeparator Component
 *
 * A composable component for visual separators in a DropdownMenu.
 * Typically used between groups of items.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DropdownMenuList>
 *   <DropdownMenuItem value="1">Option 1</DropdownMenuItem>
 *   <DropdownMenuSeparator />
 *   <DropdownMenuItem value="2">Option 2</DropdownMenuItem>
 * </DropdownMenuList>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled as a horizontal divider.
 */
export const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "box-border content-stretch flex items-center justify-between pl-0 pr-[calc(var(--spacing-x4)*2)] py-[var(--spacing-x2)] relative shrink-0 w-full",
          className
        )}
        {...props}
      >
        {children || <div className="flex-1 h-px bg-[var(--color-border-primary)]" />}
      </Comp>
    );
  }
);

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

