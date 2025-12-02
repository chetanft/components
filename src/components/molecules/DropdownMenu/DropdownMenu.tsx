"use client";
import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { DropdownMenuItem, type DropdownMenuItemProps } from './DropdownMenuItem';
import { Icon } from '../../atoms/Icons';
import { SegmentedTabs, type SegmentedTabItem } from '../SegmentedTabs';

const dropdownMenuVariants = cva(
  'bg-[var(--color-bg-primary)] border border-solid border-[var(--color-border-primary)] box-border flex flex-col items-start overflow-clip p-[var(--spacing-x2)] relative rounded-[var(--radius-md)] shadow-lg',
  {
    variants: {
      property: {
        default: 'gap-[var(--spacing-x1)] w-[calc(var(--spacing-x10)*7.5)]',
        search: 'gap-[var(--spacing-x4)] w-[calc(var(--spacing-x10)*7.5)]',
        'search-segmented': 'gap-[var(--spacing-x4)] w-[calc(var(--spacing-x10)*7.5)]',
        'disabled-info': 'gap-[var(--spacing-x1)] w-[calc(var(--spacing-x10)*7.5+var(--spacing-x1))]',
        groups: 'gap-[var(--spacing-x3)] w-[calc(var(--spacing-x10)*7.5+var(--spacing-x1))]',
      },
    },
    defaultVariants: {
      property: 'default',
    },
  }
);

export interface DropdownMenuOption extends Omit<DropdownMenuItemProps, 'children'> {
  value: string;
  label: React.ReactNode;
  searchValue?: string;
  group?: string;
}

export interface DropdownMenuProps
  extends VariantProps<typeof dropdownMenuVariants> {
  options?: DropdownMenuOption[];
  showScrollBar?: boolean;
  className?: string;
  onSelect?: (value: string) => void;
  segments?: SegmentedTabItem[];
  selectedSegment?: string;
  onSegmentChange?: (value: string) => void;
}

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      property = 'default',
      showScrollBar = false,
      options = [],
      className,
      onSelect,
      segments,
      selectedSegment,
      onSegmentChange,
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedValue, setSelectedValue] = useState<string | undefined>();
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

    const isSearch = property === 'search' || property === 'search-segmented';
    const isGroups = property === 'groups';
    // Filter options based on search query
    const filteredOptions = isSearch
      ? options.filter((option) => {
        const searchTarget = option.searchValue || (typeof option.label === 'string' ? option.label : option.value);
        return searchTarget.toLowerCase().includes(searchQuery.toLowerCase());
      })
      : options;

    // Group options if groups property
    const groupedOptions = isGroups
      ? filteredOptions.reduce(
        (acc, option) => {
          const group = option.group || 'Ungrouped';
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(option);
          return acc;
        },
        {} as Record<string, DropdownMenuOption[]>
      )
      : {};

    const handleSelect = (value: string) => {
      setSelectedValue(value);
      onSelect?.(value);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      const allOptions = filteredOptions.length > 0 ? filteredOptions : options;
      const totalItems = allOptions.length;

      if (totalItems === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = focusedIndex === null ? 0 : Math.min(focusedIndex + 1, totalItems - 1);
        setFocusedIndex(nextIndex);
        itemRefs.current[nextIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = focusedIndex === null ? totalItems - 1 : Math.max(focusedIndex - 1, 0);
        setFocusedIndex(prevIndex);
        itemRefs.current[prevIndex]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setFocusedIndex(0);
        itemRefs.current[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        setFocusedIndex(totalItems - 1);
        itemRefs.current[totalItems - 1]?.focus();
      }
    };

    const renderSearchBar = () => {
      if (!isSearch) return null;

      return (
        <div className="content-stretch flex flex-col gap-[var(--spacing-x2)] isolate items-start relative shrink-0 w-full">
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
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-[1_0_0] font-normal leading-[1.4] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[var(--color-tertiary)] whitespace-nowrap bg-transparent border-none outline-none"
                style={{
                  fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
                  fontWeight: 'var(--font-weight-regular, 400)',
                  fontSize: 'var(--font-size-md-rem)', // 16px → 1.143rem (responsive)
                }}
              />
            </div>
          </div>
        </div>
      );
    };

    const renderSegmentedControl = () => {
      if (property !== 'search-segmented' || !segments) return null;

      return (
        <SegmentedTabs
          items={segments}
          value={selectedSegment}
          onChange={onSegmentChange}
          className="w-full"
        />
      );
    };

    const renderDivider = () => (
      <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[calc(var(--spacing-x4)*2)] py-[var(--spacing-x2)] relative shrink-0 w-full">
        <div className="flex-1 h-px bg-[var(--color-border-primary)]" />
      </div>
    );

    const renderInfoItem = () => {
      if (property !== 'disabled-info') return null;

      return (
        <div className="bg-[var(--color-bg-primary)] border-[var(--color-border-primary)] border-b-0 border-l-0 border-r-0 border-solid border-t box-border content-stretch flex gap-[calc(var(--spacing-x2)+var(--spacing-x1)/2)] items-center py-[var(--spacing-x5)] px-[var(--spacing-x3)] relative rounded-bl-[var(--radius-md)] rounded-br-[var(--radius-md)] shrink-0 w-full">
          <Icon
            name="data-stack"
            size={16}
            className="overflow-clip relative shrink-0"
            color="var(--color-primary)"
          />
          <p
            className="flex-[1_0_0] font-normal italic leading-[1.4] min-h-px min-w-px relative shrink-0 text-[var(--color-primary)] whitespace-pre-wrap"
            style={{
              fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
              fontSize: 'var(--font-size-md-rem)', // 16px → 1.143rem (responsive)
            }}
          >
            Select rows first to use bulk actions
          </p>
        </div>
      );
    };

    const renderScrollBar = () => {
      if (!showScrollBar) return null;

      return (
        <div className="h-[calc(var(--spacing-x11)+var(--spacing-x1))] relative shrink-0 w-[var(--spacing-x1)]">
          <div className="w-full h-full bg-[var(--color-border-secondary)] rounded-full">
            <div className="w-full h-[40%] bg-[var(--color-border-primary)] rounded-full" />
          </div>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        role="menu"
        className={cn(dropdownMenuVariants({ property }), className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Segmented Control */}
        {renderSegmentedControl()}

        {/* Search Bar */}
        {renderSearchBar()}

        {/* List Container */}
        <div className="content-stretch flex gap-[var(--spacing-x4)] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-x1)] items-start min-h-px min-w-px relative shrink-0">
            {/* Default/Disabled-Info layout */}
            {(property === 'default' || property === 'disabled-info') && (
              <>
                {filteredOptions.map((option, index) => (
                  <React.Fragment key={option.value || index}>
                    <DropdownMenuItem
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      {...option}
                      state={selectedValue === option.value ? 'selected' : option.state || 'default'}
                      onClick={() => handleSelect(option.value)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                    {/* Add divider after 6th item in default mode */}
                    {property === 'default' && index === 5 && renderDivider()}
                  </React.Fragment>
                ))}
                {renderInfoItem()}
              </>
            )}

            {/* Groups layout */}
            {isGroups &&
              (() => {
                let itemIndex = 0;
                return Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                  <div
                    key={groupName}
                    className="content-stretch flex flex-col gap-[var(--spacing-x1)] items-start relative shrink-0 w-full"
                  >
                    <div className="bg-[var(--color-bg-primary)] box-border content-stretch flex gap-[calc(var(--spacing-x2)+var(--spacing-x1)/2)] items-center px-[var(--spacing-x3)] py-[var(--spacing-x2)] relative rounded-[var(--radius-md)] shrink-0 w-full">
                      <p
                        className="font-medium leading-[1.4] relative shrink-0 text-[var(--color-tertiary)]"
                        style={{
                          fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
                          fontWeight: 'var(--font-weight-medium, 500)',
                          fontSize: 'var(--font-size-sm-rem)', // 14px → 1rem (responsive)
                        }}
                      >
                        {groupName}
                      </p>
                    </div>
                    {groupOptions.map((option, localIndex) => {
                      const currentIndex = itemIndex++;
                      return (
                        <DropdownMenuItem
                          key={option.value || localIndex}
                          ref={(el) => {
                            itemRefs.current[currentIndex] = el;
                          }}
                          {...option}
                          state={selectedValue === option.value ? 'selected' : option.state || 'default'}
                          onClick={() => handleSelect(option.value)}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                ));
              })()}

            {/* Search layout */}
            {isSearch && (
              <>
                {filteredOptions.map((option, index) => (
                  <DropdownMenuItem
                    key={option.value || index}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    {...option}
                    state={selectedValue === option.value ? 'selected' : option.state || 'default'}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </>
            )}
          </div>

          {/* Scroll Bar */}
          {renderScrollBar()}
        </div>
      </div>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';
