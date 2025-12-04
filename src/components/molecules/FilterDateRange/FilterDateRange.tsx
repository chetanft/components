"use client";

import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../../lib/utils';
import { DatePicker } from '../DatePicker/DatePicker';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icons';
import { usePageHeaderFilters } from '../PageHeaderFilters/PageHeaderFiltersContext';
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface FilterDateRangeProps extends ComposableProps<'div'> {
  /**
   * Unique identifier for this filter (used for context management)
   */
  id: string;
  /**
   * Start date value (ISO string)
   */
  startValue?: string;
  /**
   * End date value (ISO string)
   */
  endValue?: string;
  /**
   * Callback when start date changes
   */
  onStartChange?: (value: string) => void;
  /**
   * Callback when end date changes
   */
  onEndChange?: (value: string) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * FilterDateRange Component
 * 
 * A responsive date range filter that shows full date picker on desktop (≥1200px)
 * and icon button with date picker dropdown on mobile (<1200px).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <FilterDateRange
 *   id="date-filter"
 *   startValue={startDate}
 *   endValue={endDate}
 *   onStartChange={setStartDate}
 *   onEndChange={setEndDate}
 *   placeholder="12 Aug, 2024 → 12 Sep 2024"
 * />
 * ```
 */
export const FilterDateRange = React.forwardRef<HTMLDivElement, FilterDateRangeProps>(
  ({ id, startValue, endValue, onStartChange, onEndChange, placeholder, className, asChild, ...props }, ref) => {
    const isMobile = useMediaQuery('(max-width: 1199px)');
    const { openFilterId, setOpenFilterId } = usePageHeaderFilters();
    const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

    const isFilterOpen = openFilterId === id;

    // Create portal container on mount
    useEffect(() => {
      if (typeof document !== 'undefined') {
        const container = document.createElement('div');
        document.body.appendChild(container);
        setPortalContainer(container);
        return () => {
          document.body.removeChild(container);
        };
      }
    }, []);

    // Calculate menu position when it opens
    useEffect(() => {
      const updateMenuPosition = () => {
        if (isFilterOpen && buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const top = rect.bottom + 8;
          const left = rect.left;
          const width = Math.max(rect.width, 300);
          setMenuPosition({ top, left, width });
        }
      };

      updateMenuPosition();

      if (isFilterOpen) {
        window.addEventListener('scroll', updateMenuPosition, true);
        window.addEventListener('resize', updateMenuPosition);
      }

      return () => {
        window.removeEventListener('scroll', updateMenuPosition, true);
        window.removeEventListener('resize', updateMenuPosition);
      };
    }, [isFilterOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node) &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setOpenFilterId(null);
        }
      };

      if (isFilterOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isFilterOpen, setOpenFilterId]);

    // Handle keyboard
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isFilterOpen) {
          setIsOpen(false);
          setOpenFilterId(null);
        }
      };

      if (isFilterOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isFilterOpen, setOpenFilterId]);

    const handleButtonClick = () => {
      if (isFilterOpen) {
        setIsOpen(false);
        setOpenFilterId(null);
      } else {
        setIsOpen(true);
        setOpenFilterId(id);
      }
    };

    // Format date range for display
    const formatDateRange = (start?: string, end?: string): string => {
      if (!start && !end) return placeholder || 'Select date range';
      if (!start) return `→ ${formatDate(end!)}`;
      if (!end) return `${formatDate(start)} →`;
      return `${formatDate(start)} → ${formatDate(end)}`;
    };

    const formatDate = (isoString: string): string => {
      try {
        const date = new Date(isoString);
        // Match Figma format: "12 Aug, 2024" or "12 Sep 2024"
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
      } catch {
        return isoString;
      }
    };

    const Comp = asChild ? Slot : 'div';

    // Desktop: render full date picker
    if (!isMobile) {
      return (
        <Comp ref={ref} className={cn('w-full', className)} {...props}>
          <DatePicker
            range
            startValue={startValue}
            endValue={endValue}
            onStartChange={onStartChange}
            onEndChange={onEndChange}
            placeholder={placeholder || 'Select date range'}
            size="m"
          />
        </Comp>
      );
    }

    // Mobile: render icon button with date picker dropdown
    return (
      <>
        <Button
          ref={buttonRef}
          variant="secondary"
          size="md"
          icon="calendar"
          iconPosition="only"
          onClick={handleButtonClick}
          className={cn(
            'size-[40px] rounded-[var(--x2,8px)]',
            isFilterOpen && 'bg-[var(--bg-secondary)]'
          )}
          aria-label="Date range filter"
          aria-expanded={isFilterOpen}
        />
        {isFilterOpen && portalContainer && (
          <>
            {ReactDOM.createPortal(
              <div
                ref={menuRef}
                style={{
                  position: 'fixed',
                  top: menuPosition.top,
                  left: menuPosition.left,
                  width: menuPosition.width,
                  zIndex: 9999,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <DatePicker
                  range
                  startValue={startValue}
                  endValue={endValue}
                  onStartChange={(value) => {
                    onStartChange?.(value);
                  }}
                  onEndChange={(value) => {
                    onEndChange?.(value);
                  }}
                  placeholder={placeholder || 'Select date range'}
                  size="m"
                  includeDropdown
                />
              </div>,
              portalContainer
            )}
          </>
        )}
      </>
    );
  }
);

FilterDateRange.displayName = 'FilterDateRange';

