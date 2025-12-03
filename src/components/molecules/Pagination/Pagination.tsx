"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icons/Icon';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { PaginationProvider } from './PaginationContext';
import { PaginationList } from './PaginationList';
import { PaginationItem } from './PaginationItem';
import { PaginationPrevious } from './PaginationPrevious';
import { PaginationNext } from './PaginationNext';
import { PaginationEllipsis } from './PaginationEllipsis';

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
   * Show page size changer (for declarative API)
   * @default false
   */
  showSizeChanger?: boolean;
  /**
   * Show quick jumper (for declarative API)
   * @default false
   */
  showQuickJumper?: boolean;
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
}

/**
 * Pagination Component
 * 
 * A versatile pagination component for navigating through pages of content.
 * Supports both composable API (recommended) and declarative API (deprecated).
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
 * 
 * // Declarative API (deprecated)
 * <Pagination current={1} total={100} onChange={handleChange} />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (PaginationList, PaginationItem, etc.) support `asChild`
 * - Supports default and compact variants
 * - Accessible: includes ARIA attributes and keyboard navigation
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({
    children,
    current,
    total,
    pageSize = 10,
    showSizeChanger = false,
    showQuickJumper = false,
    onChange,
    onShowSizeChange,
    variant = 'default',
    className,
    asChild,
    ...props
  }, ref) => {
    const totalPages = Math.ceil(total / pageSize);
    
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== current) {
        onChange?.(page, pageSize);
      }
    };
    
    // Check if using composable API (has children with Pagination sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
      child?.type?.displayName?.startsWith('Pagination')
    );
    
    // If using composable API, wrap with context provider
    if (hasComposableChildren) {
      // Show deprecation warning if using old props with composable API
      if (process.env.NODE_ENV !== 'production' && (showSizeChanger || showQuickJumper)) {
        console.warn(
          'Pagination: Using deprecated props (showSizeChanger, showQuickJumper) with composable API. ' +
          'Please use PaginationList, PaginationItem, PaginationPrevious, PaginationNext components instead. ' +
          'See migration guide: docs/migrations/composable-migration.md'
        );
      }
      
      const Comp = asChild ? Slot : 'div';
      return (
        <PaginationProvider
          value={{
            current,
            total,
            pageSize,
            totalPages,
            onPageChange: handlePageChange,
            variant,
          }}
        >
          <Comp
            ref={ref}
            className={cn("flex items-center gap-[var(--spacing-x2)] flex-wrap", className)}
            {...props}
          >
            {children}
          </Comp>
        </PaginationProvider>
      );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'Pagination: Declarative API is deprecated. ' +
        'Please migrate to composable API using PaginationList, PaginationItem, PaginationPrevious, PaginationNext components. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }
    const [jumperValue, setJumperValue] = React.useState('');

    const handleSizeChange = (newSize: number) => {
      onShowSizeChange?.(current, newSize);
      onChange?.(1, newSize);
    };

    const handleJump = () => {
      const page = parseInt(jumperValue, 10);
      if (page >= 1 && page <= totalPages) {
        handlePageChange(page);
        setJumperValue('');
      }
    };

    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      const maxVisible = 7;

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
          pages.push('ellipsis');
          pages.push(totalPages);
        } else if (current >= totalPages - 3) {
          pages.push(1);
          pages.push('ellipsis');
          for (let i = totalPages - 4; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('ellipsis');
          for (let i = current - 1; i <= current + 1; i++) {
            pages.push(i);
          }
          pages.push('ellipsis');
          pages.push(totalPages);
        }
      }

      return pages;
    };

    if (totalPages <= 1 && !showSizeChanger && variant !== 'compact') {
      return null;
    }

    // Compact variant - single container with chevrons and current page
    if (variant === 'compact') {
      return (
        <div ref={ref} className={cn("inline-flex", className)} {...props}>
          <div
            className={cn(
              "flex items-center justify-between",
              "border border-solid border-[var(--border-primary)]",
              "bg-[var(--bg-primary)]",
              "rounded-[var(--x2,8px)]",
              "px-[var(--x3,12px)] py-0",
              "h-[var(--spacing-x10)]",
              "box-border"
            )}
          >
            <div className="flex items-center gap-[var(--x1,4px)] flex-1 h-full min-w-0 min-h-0 px-0 py-0">
              <button
                onClick={() => handlePageChange(current - 1)}
                disabled={current === 1}
                className={cn(
                  "flex items-center justify-center",
                  "shrink-0 size-4",
                  "text-[var(--tertiary)]",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "hover:text-[var(--primary)] transition-colors",
                  "cursor-pointer"
                )}
                aria-label="Previous page"
              >
                <Icon name="chevron-left" className="size-4" />
              </button>

              <p
                className={cn(
                  "flex-1 text-center",
                  "text-base",
                  "font-normal",
                  "leading-[1.4]",
                  "text-[var(--tertiary)]",
                  "whitespace-nowrap",
                  "min-w-0",
                  "overflow-hidden overflow-ellipsis"
                )}
              >
                {current}
              </p>

              <button
                onClick={() => handlePageChange(current + 1)}
                disabled={current === totalPages}
                className={cn(
                  "flex items-center justify-center",
                  "shrink-0 size-4",
                  "text-[var(--tertiary)]",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "hover:text-[var(--primary)] transition-colors",
                  "cursor-pointer"
                )}
                aria-label="Next page"
              >
                <Icon name="chevron-right" className="size-4" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Default variant - full pagination with page numbers
    const Comp = asChild ? Slot : 'div';
    return (
      <PaginationProvider
        value={{
          current,
          total,
          pageSize,
          totalPages,
          onPageChange: handlePageChange,
          variant,
        }}
      >
        <Comp ref={ref} className={cn("flex items-center gap-[var(--spacing-x2)] flex-wrap", className)} {...props}>
          <PaginationList>
            <PaginationPrevious />

            {getPageNumbers().map((page, index) => {
              if (page === 'ellipsis') {
                return <PaginationEllipsis key={`ellipsis-${index}`} />;
              }

              const pageNum = page as number;
              return <PaginationItem key={pageNum} page={pageNum} />;
            })}

            <PaginationNext />
          </PaginationList>

        {showSizeChanger && (
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-[var(--color-tertiary)]">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              className={cn(
                "px-3 py-1.5 rounded-[var(--radius-md)]",
                "border border-[var(--color-border-primary)]",
                "text-sm",
                "focus:outline-none focus:ring-2 focus:ring-[var(--color-neutral)] focus:ring-opacity-20",
                "bg-[var(--color-bg-primary)]"
              )}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        )}

        {showQuickJumper && (
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-[var(--color-tertiary)]">Go to:</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumperValue}
              onChange={(e) => setJumperValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleJump();
                }
              }}
              className={cn(
                "w-16 px-2 py-1.5 rounded-[var(--radius-md)]",
                "border border-[var(--color-border-primary)]",
                "text-sm",
                "focus:outline-none focus:ring-2 focus:ring-[var(--color-neutral)] focus:ring-opacity-20",
                "bg-[var(--color-bg-primary)]"
              )}
              placeholder="Page"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleJump}
            >
              Go
            </Button>
          </div>
        )}
        </Comp>
      </PaginationProvider>
    );
  }
);

Pagination.displayName = 'Pagination';
