"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useDropdownMenuContext } from './DropdownMenuContext';

export interface DropdownMenuSearchProps extends ComposableProps<'div'> {
  /**
   * Search placeholder
   * @default 'Search'
   */
  placeholder?: string;
  /**
   * Custom search input (when using asChild)
   */
  children?: React.ReactNode;
}

/**
 * DropdownMenuSearch Component
 *
 * A composable component for search input in a DropdownMenu.
 * Typically used at the top of DropdownMenu when property is 'search' or 'search-segmented'.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DropdownMenu property="search">
 *   <DropdownMenuSearch />
 *   <DropdownMenuList>
 *     <DropdownMenuItem value="1">Option 1</DropdownMenuItem>
 *   </DropdownMenuList>
 * </DropdownMenu>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically filters options based on search query.
 */
export const DropdownMenuSearch = React.forwardRef<HTMLDivElement, DropdownMenuSearchProps>(
  ({ className, placeholder = 'Search', children, asChild, ...props }, ref) => {
    const { searchQuery, setSearchQuery, property } = useDropdownMenuContext();
    
    const isSearch = property === 'search' || property === 'search-segmented';
    
    if (!isSearch) return null;
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(
            "content-stretch flex flex-col gap-[var(--spacing-x2)] isolate items-start relative shrink-0 w-full",
            className
          )}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "content-stretch flex flex-col gap-[var(--spacing-x2)] isolate items-start relative shrink-0 w-full",
          className
        )}
        {...props}
      >
        {children || (
          <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] border-solid box-border content-stretch flex h-[var(--spacing-x10)] items-center justify-between min-h-[var(--spacing-x10)] px-[var(--spacing-x3)] py-[var(--spacing-x0)] relative rounded-[var(--radius-md)] shrink-0 w-full z-[1]">
            <div className="box-border content-stretch flex flex-[1_0_0] gap-[var(--spacing-x1)] h-[var(--spacing-x10)] items-center min-h-px min-w-px px-[var(--spacing-x0)] py-[var(--spacing-x5)] relative rounded-[var(--radius-md)] shrink-0">
              <Icon
                name="search"
                size={16}
                className="relative shrink-0"
                color="var(--color-tertiary)"
              />
              <input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-[1_0_0] font-normal leading-[1.4] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[var(--color-tertiary)] whitespace-nowrap bg-transparent border-none outline-none"
                style={{
                  fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
                  fontWeight: 'var(--font-weight-regular, 400)',
                  fontSize: 'var(--font-size-md-rem)',
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

DropdownMenuSearch.displayName = 'DropdownMenuSearch';

