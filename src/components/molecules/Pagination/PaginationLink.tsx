"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { usePaginationContext } from './PaginationContext';

export interface PaginationLinkProps extends ComposableProps<'button'> {
  /**
   * Page number for this link
   */
  page: number;
  /**
   * The link content (typically page number).
   */
  children?: React.ReactNode;
}

/**
 * PaginationLink Component
 *
 * A composable component for page links in Pagination.
 * Similar to PaginationItem but provides more control over rendering.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Pagination current={1} total={100}>
 *   <PaginationList>
 *     <PaginationLink page={1}>First</PaginationLink>
 *   </PaginationList>
 * </Pagination>
 * ```
 *
 * @remarks
 * - Wraps a Button component by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles page changes.
 */
export const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, page, children, asChild, onClick, ...props }, ref) => {
    const { current, onPageChange } = usePaginationContext();
    const isActive = page === current;
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(page);
      onClick?.(e);
    };
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          onClick={handleClick}
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
            >
              {page}
            </Button>
          )}
        </Slot>
      );
    }
    
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
        {...props}
      >
        {children || page}
      </Button>
    );
  }
);

PaginationLink.displayName = 'PaginationLink';

