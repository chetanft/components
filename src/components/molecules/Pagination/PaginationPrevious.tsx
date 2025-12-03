"use client";

import React from 'react';
import { Button } from '../../atoms/Button/Button';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { usePaginationContext } from './PaginationContext';

export interface PaginationPreviousProps extends ComposableProps<'button'> {
  /**
   * Custom content (optional, defaults to chevron-left icon)
   */
  children?: React.ReactNode;
}

/**
 * PaginationPrevious Component
 *
 * A composable component for the previous page button in Pagination.
 * Automatically disabled when on first page.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Pagination current={2} total={100}>
 *   <PaginationList>
 *     <PaginationPrevious />
 *     <PaginationItem page={1} />
 *   </PaginationList>
 * </Pagination>
 * ```
 *
 * @remarks
 * - Wraps a Button component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically disabled on first page.
 * - Accessible: includes ARIA label.
 */
export const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  ({ className, children, asChild, onClick, ...props }, ref) => {
    const { current, onPageChange } = usePaginationContext();
    const isDisabled = current === 1;
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        onPageChange(current - 1);
        onClick?.(e);
      }
    };
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          onClick={handleClick}
          disabled={isDisabled}
          aria-label="Previous page"
          className={className}
          {...props}
        >
          {children || (
            <Button
              variant="secondary"
              size="sm"
              icon="chevron-left"
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
        icon="chevron-left"
        iconPosition="only"
        onClick={handleClick}
        disabled={isDisabled}
        className={className}
        aria-label="Previous page"
        {...props}
      >
        {children}
      </Button>
    );
  }
);

PaginationPrevious.displayName = 'PaginationPrevious';

