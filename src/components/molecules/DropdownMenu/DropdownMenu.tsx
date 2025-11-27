import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { DropdownMenuItem, type DropdownMenuItemProps } from './DropdownMenuItem';
import { Icon } from '../../atoms/Icons';
import { SegmentedTabs, type SegmentedTabItem } from '../SegmentedTabs';

const dropdownMenuVariants = cva(
  'bg-[var(--bg-primary)] border border-solid border-[var(--border-primary)] box-border flex flex-col items-start overflow-clip p-[var(--x2,8px)] relative rounded-[var(--x2,8px)] shadow-lg',
  {
    variants: {
      property: {
        default: 'gap-[4px] w-[300px]',
        search: 'gap-[var(--x4,16px)] w-[300px]',
        'search-segmented': 'gap-[var(--x4,16px)] w-[300px]',
        'disabled-info': 'gap-[4px] w-[311px]',
        groups: 'gap-[var(--x3,12px)] w-[311px]',
      },
    },
    defaultVariants: {
      property: 'default',
    },
  }
);

export interface DropdownMenuOption extends Omit<DropdownMenuItemProps, 'children'> {
  value: string;
  label: string;
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
    const isDisabledInfo = property === 'disabled-info';

    // Filter options based on search query
    const filteredOptions = isSearch
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
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
        <div className="content-stretch flex flex-col gap-[var(--x2,8px)] isolate items-start relative shrink-0 w-full">
          <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] border-solid box-border content-stretch flex h-[40px] items-center justify-between min-h-[40px] px-[var(--x3,12px)] py-[var(--x0,0px)] relative rounded-[var(--x2,8px)] shrink-0 w-full z-[1]">
            <div className="box-border content-stretch flex flex-[1_0_0] gap-[var(--x1,4px)] h-[40px] items-center min-h-px min-w-px px-[var(--x0,0px)] py-[var(--x5,20px)] relative rounded-[var(--x2,8px)] shrink-0">
              <Icon
                name="search"
                size={16}
                className="relative shrink-0"
                color="var(--tertiary)"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-[1_0_0] font-normal leading-[1.4] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-[var(--tertiary)] whitespace-nowrap bg-transparent border-none outline-none"
                style={{
                  fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
                  fontWeight: '400',
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

    const renderDivider = () => {
      return (
        <div className="box-border content-stretch flex items-center justify-between pl-0 pr-[36px] py-[var(--x2,8px)] relative shrink-0 w-full">
          <div className="flex-[1_0_0] h-0 min-h-px min-w-px mr-[-36px] relative shrink-0">
            <div className="absolute inset-[-0.5px_-0.18%]">
              <svg
                width="100%"
                height="1"
                viewBox="0 0 264 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0"
                  y1="0.5"
                  x2="264"
                  y2="0.5"
                  stroke="var(--border-primary)"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        </div>
      );
    };

    const renderInfoItem = () => {
      if (property !== 'disabled-info') return null;

      return (
        <div className="bg-[var(--bg-primary)] border-[var(--border-primary)] border-b-0 border-l-0 border-r-0 border-solid border-t box-border content-stretch flex gap-[10px] items-center pb-[var(--x3,12px)] pt-[var(--x4,16px)] px-[var(--x3,12px)] relative rounded-bl-[var(--x2,8px)] rounded-br-[var(--x2,8px)] shrink-0 w-full">
          <Icon
            name="data-stack"
            size={16}
            className="overflow-clip relative shrink-0"
            color="var(--primary)"
          />
          <p
            className="flex-[1_0_0] font-normal italic leading-[1.4] min-h-px min-w-px relative shrink-0 text-[var(--primary)] whitespace-pre-wrap"
            style={{
              fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
              fontSize: '16px',
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
        <div className="h-[88px] relative shrink-0 w-[6px]">
          <div className="w-full h-full bg-[var(--border-secondary)] rounded-full">
            <div className="w-full h-[40%] bg-[var(--border-primary)] rounded-full" />
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
        <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative shrink-0">
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
                    className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full"
                  >
                    <div className="bg-[var(--bg-primary)] box-border content-stretch flex gap-[10px] items-center px-[var(--x3,12px)] py-[var(--x2,8px)] relative rounded-[var(--x2,8px)] shrink-0 w-full">
                      <p
                        className="font-medium leading-[1.4] relative shrink-0 text-[var(--tertiary)]"
                        style={{
                          fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
                          fontWeight: '500',
                          fontSize: '14px',
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

