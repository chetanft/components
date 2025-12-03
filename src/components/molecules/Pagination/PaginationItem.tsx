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
export const PaginationItem = React.forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, page, children, asChild, onClick, ...props }, ref) => {
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
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(page);
      onClick?.(e as any);
    };
    
    // Filter out incompatible props from ComposableProps<'div'>
    const { onCopy, onCut, onPaste, ...buttonProps } = props as any;
    
    return (
      <Button
        ref={ref}
        variant={isActive ? 'primary' : 'secondary'}
        size="sm"
        onClick={handleClick}
        className={cn(
          "min-w-[var(--spacing-x8)]",
          isActive && "font-semibold",
          className
        )}
        aria-label={`Page ${page}`}
        aria-current={isActive ? 'page' : undefined}
        {...buttonProps}
      >
        {children || page}
      </Button>
    );
  }
);

PaginationItem.displayName = 'PaginationItem';

