"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { usePaginationContext } from './PaginationContext';

export interface PaginationItemProps extends ComposableProps<'div'> {
  /**
   * Page number for this item
   */
  page: number;
  /**
   * Custom content (optional, defaults to page number)
   */
  children?: React.ReactNode;
}

/**
 * PaginationItem Component
 *
 * A composable component for individual page items in Pagination.
 * Automatically handles active state and page changes.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Pagination current={1} total={100}>
 *   <PaginationList>
 *     <PaginationItem page={1} />
 *     <PaginationItem page={2} />
 *   </PaginationList>
 * </Pagination>
 * ```
 *
 * @remarks
 * - Wraps a Button component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically applies active state styling.
 * - Accessible: includes ARIA attributes.
 */
export const PaginationItem = React.forwardRef<HTMLDivElement, PaginationItemProps>(
  ({ className, page, children, asChild, ...props }, ref) => {
    const { current, onPageChange } = usePaginationContext();
    const isActive = page === current;
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          onClick={() => onPageChange(page)}
          className={cn(
            "min-w-[var(--spacing-x8)]",
            isActive && "font-semibold",
            className
          )}
          aria-label={`Page ${page}`}
          aria-current={isActive ? 'page' : undefined}
          {...props}
        >
          {children || (
            <Button
              variant={isActive ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          )}
        </Slot>
      );
    }
    
    return (
      <Button
        ref={ref as any}
        variant={isActive ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => onPageChange(page)}
        className={cn(
          "min-w-[var(--spacing-x8)]",
          isActive && "font-semibold",
          className
        )}
        aria-label={`Page ${page}`}
        aria-current={isActive ? 'page' : undefined}
        {...props}
      >
        {children || page}
      </Button>
    );
  }
);

PaginationItem.displayName = 'PaginationItem';

