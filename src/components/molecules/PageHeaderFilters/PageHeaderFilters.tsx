"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Icon, IconName } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { PageHeaderFiltersProvider } from './PageHeaderFiltersContext';

export interface PrimaryActionConfig {
  label: string;
  icon?: IconName | React.ReactNode;
  onClick?: () => void;
}

export interface PageHeaderFiltersProps extends ComposableProps<'div'> {
  /**
   * Filter components (FilterDropdown, FilterDateRange, FilterSearch)
   */
  children: React.ReactNode;
  /**
   * Primary action button configuration
   */
  primaryAction?: PrimaryActionConfig;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * PageHeaderFilters Component
 * 
 * Container component that manages filter layout and responsive behavior.
 * On desktop (≥1200px), filters are displayed in a horizontal row.
 * On mobile (<1200px), filters convert to icon buttons with dropdown menus.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <PageHeaderFilters primaryAction={{ label: 'Add Journey', icon: 'add', onClick: handleAdd }}>
 *   <FilterDropdown id="location" ... />
 *   <FilterDateRange id="dates" ... />
 *   <FilterSearch ... />
 * </PageHeaderFilters>
 * ```
 */
export const PageHeaderFilters = React.forwardRef<HTMLDivElement, PageHeaderFiltersProps>(
  ({ children, primaryAction, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    
    return (
      <PageHeaderFiltersProvider>
        <Comp
          ref={ref}
          className={cn(
            'content-stretch flex gap-[var(--x5,20px)] items-center relative shrink-0',
            className
          )}
          {...props}
        >
          {/* Filter Container */}
          <div className="content-stretch flex gap-[var(--x3,12px)] items-center overflow-clip relative rounded-[var(--x2,8px)] shrink-0">
            {children}
          </div>

          {/* Primary Action Button */}
          {primaryAction && (
            <Button
              variant="primary"
              size="md"
              icon={primaryAction.icon || 'add'}
              iconPosition="leading"
              onClick={primaryAction.onClick}
              className="rounded-[var(--x2,8px)] shrink-0"
            >
              {primaryAction.label}
            </Button>
          )}
        </Comp>
      </PageHeaderFiltersProvider>
    );
  }
);

PageHeaderFilters.displayName = 'PageHeaderFilters';

