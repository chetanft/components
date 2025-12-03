"use client";

import React from 'react';
import { Button } from '../../atoms/Button/Button';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { usePaginationContext } from './PaginationContext';

export interface PaginationNextProps extends ComposableProps<'button'> {
  /**
   * Custom content (optional, defaults to chevron-right icon)
   */
  children?: React.ReactNode;
}

/**
 * PaginationNext Component
 *
 * A composable component for the next page button in Pagination.
 * Automatically disabled when on last page.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Pagination current={1} total={100}>
 *   <PaginationList>
 *     <PaginationItem page={1} />
 *     <PaginationNext />
 *   </PaginationList>
 * </Pagination>
 * ```
 *
 * @remarks
 * - Wraps a Button component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically disabled on last page.
 * - Accessible: includes ARIA label.
 */
export const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNextProps>(
  ({ className, children, asChild, onClick, ...props }, ref) => {
    const { current, totalPages, onPageChange } = usePaginationContext();
    const isDisabled = current === totalPages;
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        onPageChange(current + 1);
        onClick?.(e);
      }
    };
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          onClick={handleClick}
          disabled={isDisabled}
          aria-label="Next page"
          className={className}
          {...props}
        >
          {children || (
            <Button
              variant="secondary"
              size="sm"
              icon="chevron-right"
              iconPosition="only"
              disabled={isDisabled}
            />
          )}
        </Slot>
      );
    }
    
    return (
      <Button
        ref={ref}
        variant="secondary"
        size="sm"
        icon="chevron-right"
        iconPosition="only"
        onClick={handleClick}
        disabled={isDisabled}
        className={className}
        aria-label="Next page"
        {...props}
      >
        {children}
      </Button>
    );
  }
);

PaginationNext.displayName = 'PaginationNext';

