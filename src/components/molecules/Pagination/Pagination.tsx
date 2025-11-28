"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { FigmaBadge } from '../../atoms/FigmaBadge';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  current: number;
  total: number;
  pageSize?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  onChange?: (page: number, pageSize?: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  showFigmaBadge?: boolean;
}

/**
 * Pagination component built using FT Design System tokens.
 * Figma design not available - component created based on design system specifications.
 */
export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({
    current,
    total,
    pageSize = 10,
    showSizeChanger = false,
    showQuickJumper = false,
    onChange,
    onShowSizeChange,
    showFigmaBadge = true,
    className,
    ...props
  }, ref) => {
    const totalPages = Math.ceil(total / pageSize);
    const [jumperValue, setJumperValue] = React.useState('');

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== current) {
        onChange?.(page, pageSize);
      }
    };

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

    if (totalPages <= 1 && !showSizeChanger) {
      return null;
    }

    return (
      <div ref={ref} className={cn("flex items-center gap-2 flex-wrap", className)} {...props}>
        {showFigmaBadge && (
          <div className="mr-4">
            <FigmaBadge />
          </div>
        )}
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            size="sm"
            icon="chevron-left"
            iconPosition="only"
            onClick={() => handlePageChange(current - 1)}
            disabled={current === 1}
            aria-label="Previous page"
          />
          
          {getPageNumbers().map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-[var(--color-tertiary)]"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === current;

            return (
              <Button
                key={pageNum}
                variant={isActive ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handlePageChange(pageNum)}
                className={cn(
                  "min-w-[var(--spacing-x8)]",
                  isActive && "font-semibold"
                )}
                aria-label={`Page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="secondary"
            size="sm"
            icon="chevron-right"
            iconPosition="only"
            onClick={() => handlePageChange(current + 1)}
            disabled={current === totalPages}
            aria-label="Next page"
          />
        </div>

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
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
