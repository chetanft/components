"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { PaginationProvider } from './PaginationContext';

export interface PaginationProps extends Omit<ComposableProps<'div'>, 'onChange'> {
  /**
   * Pagination content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Current page number
   */
  current: number;
  /**
   * Total number of items
   */
  total: number;
  /**
   * Items per page
   * @default 10
   */
  pageSize?: number;
  /**
   * Callback when page changes
   */
  onChange?: (page: number, pageSize?: number) => void;
  /**
   * Callback when page size changes
   */
  onShowSizeChange?: (current: number, size: number) => void;
  /**
   * Pagination variant
   * @default 'default'
   */
  variant?: 'default' | 'compact';
  /**
   * Apply glassmorphism effect to the pagination container
   */
  glass?: GlassVariant;
}

/**
 * Pagination Component
 * 
 * A versatile pagination component for navigating through pages of content.
 * Supports composable API with sub-components for maximum flexibility.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Pagination current={1} total={100} pageSize={10}>
 *   <PaginationList>
 *     <PaginationPrevious />
 *     <PaginationItem page={1} />
 *     <PaginationEllipsis />
 *     <PaginationItem page={5} />
 *     <PaginationNext />
 *   </PaginationList>
 * </Pagination>
 * 
 * // Compact variant
 * <Pagination
 *   current={1}
 *   total={100}
 *   pageSize={10}
 *   variant="compact"
 *   onChange={(page) => handlePageChange(page)}
 * />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (PaginationList, PaginationItem, etc.) support `asChild`
 * - Supports default and compact variants
 * - Accessible: includes ARIA attributes and keyboard navigation
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({
    children,
    current,
    total,
    pageSize = 10,
    onChange,
    onShowSizeChange,
    variant = 'default',
    glass,
    className,
    asChild,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);
    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== current) {
        onChange?.(page, pageSize);
      }
    };

    const Comp = asChild ? Slot : 'div';
    return (
      <PaginationProvider
        value={{
          current,
          total,
          pageSize,
          totalPages,
          onPageChange: handlePageChange,
          onShowSizeChange,
          variant,
        }}
      >
        <Comp
          ref={ref}
          className={cn(
            getGlassClasses(resolvedGlass, '', ''),
            resolvedGlass && 'rounded-[var(--radius-md)] px-[var(--spacing-x3)] py-[var(--spacing-x2)]',
            "flex items-center gap-[var(--spacing-x2)] flex-wrap",
            className
          )}
          {...props}
        >
          {children}
        </Comp>
      </PaginationProvider>
    );
  }
);

Pagination.displayName = 'Pagination';
