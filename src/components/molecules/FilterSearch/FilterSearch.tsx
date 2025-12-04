"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Input, InputField } from '../../atoms/Input';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icons';
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface FilterSearchProps extends Omit<ComposableProps<'div'>, 'onChange'> {
  /**
   * Search value
   */
  value?: string;
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Callback when search expands
   */
  onExpand?: () => void;
  /**
   * Callback when search collapses
   */
  onCollapse?: () => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * FilterSearch Component
 * 
 * A responsive search filter that shows full input on desktop (≥1200px)
 * and icon button that expands inline to input field on mobile (<1200px).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <FilterSearch
 *   value={searchTerm}
 *   onChange={setSearchTerm}
 *   placeholder="Search My Journeys"
 * />
 * ```
 */
export const FilterSearch = React.forwardRef<HTMLDivElement, FilterSearchProps>(
  ({ value, onChange, placeholder = 'Search', onExpand, onCollapse, className, asChild, ...props }, ref) => {
    const isMobile = useMediaQuery('(max-width: 1199px)');
    const [isExpanded, setIsExpanded] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input when expanded
    useEffect(() => {
      if (isExpanded && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isExpanded]);

    // Handle keyboard
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isExpanded) {
          handleCollapse();
        }
      };

      if (isExpanded) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isExpanded]);

    // Close when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          inputRef.current &&
          !inputRef.current.contains(event.target as Node) &&
          !(event.target as HTMLElement)?.closest('.filter-search-container')
        ) {
          // Only collapse if input is empty or user clicked outside
          if (!value || value.trim() === '') {
            handleCollapse();
          }
        }
      };

      if (isExpanded) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isExpanded, value]);

    const handleExpand = () => {
      setIsExpanded(true);
      onExpand?.();
    };

    const handleCollapse = () => {
      setIsExpanded(false);
      onCollapse?.();
    };

    const handleBlur = () => {
      // Only collapse if input is empty
      if (!value || value.trim() === '') {
        handleCollapse();
      }
    };

    const Comp = asChild ? Slot : 'div';
    
    // Desktop: render full input
    if (!isMobile) {
      return (
        <Comp ref={ref} className={cn('w-full', className)} {...props}>
          <Input size="md" variant="default">
            <InputField
              type="text"
              leadingIcon="search"
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
            />
          </Input>
        </Comp>
      );
    }

    // Mobile: render icon button that expands inline
    return (
      <Comp
        ref={ref}
        className={cn(
          'filter-search-container flex items-center gap-[var(--x2,8px)] transition-all duration-200',
          isExpanded ? 'flex-1' : '',
          className
        )}
        {...props}
      >
        {!isExpanded ? (
          <Button
            variant="secondary"
            size="md"
            icon="search"
            iconPosition="only"
            onClick={handleExpand}
            className="size-[40px] rounded-[var(--x2,8px)] shrink-0"
            aria-label="Search"
          />
        ) : (
          <div className="flex-1 min-w-0">
            <Input size="md" variant="default">
              <InputField
                ref={inputRef}
                type="text"
                leadingIcon="search"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                onBlur={handleBlur}
                className="w-full"
              />
            </Input>
          </div>
        )}
      </Comp>
    );
  }
);

FilterSearch.displayName = 'FilterSearch';

