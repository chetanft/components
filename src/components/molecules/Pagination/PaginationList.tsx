"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface PaginationListProps extends ComposableProps<'div'> {
  /**
   * The pagination items.
   */
  children?: React.ReactNode;
}

/**
 * PaginationList Component
 *
 * A composable component that contains PaginationItem components.
 * Provides the container for pagination navigation.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Pagination current={1} total={100}>
 *   <PaginationList>
 *     <PaginationPrevious />
 *     <PaginationItem page={1} />
 *     <PaginationNext />
 *   </PaginationList>
 * </Pagination>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides default spacing between items.
 */
export const PaginationList = React.forwardRef<HTMLDivElement, PaginationListProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex items-center gap-[var(--spacing-x1)]", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

PaginationList.displayName = 'PaginationList';

