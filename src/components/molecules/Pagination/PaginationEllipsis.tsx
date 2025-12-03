"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface PaginationEllipsisProps extends ComposableProps<'span'> {
  /**
   * Custom content (optional, defaults to "...")
   */
  children?: React.ReactNode;
}

/**
 * PaginationEllipsis Component
 *
 * A composable component for ellipsis indicators in Pagination.
 * Used to indicate skipped pages.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Pagination current={5} total={100}>
 *   <PaginationList>
 *     <PaginationItem page={1} />
 *     <PaginationEllipsis />
 *     <PaginationItem page={5} />
 *   </PaginationList>
 * </Pagination>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<span>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides visual indication of skipped pages.
 */
export const PaginationEllipsis = React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp
        ref={ref}
        className={cn("px-[var(--spacing-x2)] text-[var(--color-tertiary)]", className)}
        {...props}
      >
        {children || '...'}
      </Comp>
    );
  }
);

PaginationEllipsis.displayName = 'PaginationEllipsis';

