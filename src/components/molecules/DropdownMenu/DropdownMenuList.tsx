"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useDropdownMenuContext } from './DropdownMenuContext';

export interface DropdownMenuListProps extends ComposableProps<'div'> {
  /**
   * List content (typically DropdownMenuItem components).
   */
  children: React.ReactNode;
}

/**
 * DropdownMenuList Component
 *
 * A composable component for the list container of a DropdownMenu.
 * Typically wraps DropdownMenuItem components.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuList>
 *     <DropdownMenuItem value="1">Option 1</DropdownMenuItem>
 *     <DropdownMenuItem value="2">Option 2</DropdownMenuItem>
 *   </DropdownMenuList>
 * </DropdownMenu>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles keyboard navigation and focus management.
 */
export const DropdownMenuList = React.forwardRef<HTMLDivElement, DropdownMenuListProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-x1)] items-start min-h-px min-w-px relative shrink-0",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

DropdownMenuList.displayName = 'DropdownMenuList';

