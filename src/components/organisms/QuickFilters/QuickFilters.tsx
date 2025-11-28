import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

export type FilterType = 'normal' | 'alert' | 'warning' | 'success' | 'neutral';
export type FilterState = 'default' | 'selected';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  type?: FilterType;
}

export interface QuickFilter {
  id: string;
  label: string;
  count?: number;
  type?: FilterType;
  options?: FilterOption[];
  selected?: boolean;
  selectedOption?: string;
}

export interface QuickFiltersProps {
  filters: QuickFilter[];
  onFilterClick?: (filterId: string, optionId?: string) => void;
  onFilterRemove?: (filterId: string, optionId?: string) => void;
  className?: string;
  scrollable?: boolean;
}

const FilterChip: React.FC<{
  filter: QuickFilter;
  option?: FilterOption;
  isSelected: boolean;
  onSelect: () => void;
  onRemove?: () => void;
  showBorder?: boolean;
  isMainLabel?: boolean;
}> = ({ filter, option, isSelected, onSelect, onRemove, showBorder = true, isMainLabel = false }) => {
  const displayLabel = option?.label || filter.label;
  const displayCount = option?.count || filter.count;
  const displayType = option?.type || filter.type || 'normal';

  return (
    <div
      className={cn(
        "inline-flex items-center gap-[var(--spacing-x2)] px-[var(--spacing-x2)] h-[var(--spacing-x9)] rounded-[var(--radius-md)] cursor-pointer transition-all duration-200",
        "text-sm font-semibold font-inter",
        // Background based on Figma design
        isMainLabel
          ? "bg-[var(--color-bg-secondary)]" // Main labels in multi-option always have gray background
          : isSelected
            ? "bg-[var(--color-bg-secondary)]"
            : "bg-[var(--color-bg-primary)]",
        // Border: always show border except for main labels without border
        showBorder && !isMainLabel ? "border border-[var(--color-border-primary)]" : ""
      )}
      onClick={!isMainLabel ? onSelect : undefined}
      role={!isMainLabel ? "button" : undefined}
      tabIndex={!isMainLabel ? 0 : undefined}
      aria-pressed={!isMainLabel ? isSelected : undefined}
      onKeyDown={!isMainLabel ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      } : undefined}
    >
      {/* Count badge - shows before label when present */}
      {displayCount !== undefined && (
        <span
          className={cn(
            "inline-flex items-center justify-center px-[var(--spacing-x2)] py-[var(--spacing-x1)] text-sm font-semibold min-w-[var(--spacing-x6)] h-[var(--spacing-x5)]",
            // Count badge border radius
            "rounded-[var(--radius-full)]",
            // Count badge styling based on state and type
            isSelected
              ? cn(
                "bg-[var(--color-bg-primary)]",
                displayType === 'alert' ? "text-[var(--color-critical)]" :
                  displayType === 'warning' ? "text-[var(--color-warning)]" :
                    displayType === 'success' ? "text-[var(--color-positive)]" :
                      displayType === 'neutral' ? "text-[var(--color-neutral)]" :
                        "text-[var(--color-primary)]"
              )
              : cn(
                "bg-[var(--color-bg-secondary)]",
                displayType === 'alert' ? "text-[var(--color-critical)]" :
                  displayType === 'warning' ? "text-[var(--color-warning)]" :
                    displayType === 'success' ? "text-[var(--color-positive)]" :
                      displayType === 'neutral' ? "text-[var(--color-neutral)]" :
                        "text-[var(--color-primary)]"
              )
          )}
        >
          {displayCount}
        </span>
      )}

      {/* Label */}
      <span className="text-[var(--color-primary)]">
        {displayLabel}
      </span>

      {/* Space for tick icon - only show when not a main label */}
      {!isMainLabel && (
        <div className="flex items-center justify-center w-[14px] h-full ml-[var(--spacing-x1)]">
          {isSelected && onRemove && (
            <div
              className="cursor-pointer flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              role="button"
              tabIndex={0}
              aria-label={`Remove ${displayLabel} filter`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onRemove();
                }
              }}
            >
              <Icon
                name="check-alt"
                size={14}
                className="text-[var(--color-primary)]"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MultiOptionFilter: React.FC<{
  filter: QuickFilter;
  onFilterClick: (filterId: string, optionId?: string) => void;
  onFilterRemove: (filterId: string, optionId?: string) => void;
}> = ({ filter, onFilterClick, onFilterRemove }) => {
  return (
    <div className="inline-flex items-center h-[var(--spacing-x9)] bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-[var(--radius-md)] overflow-hidden">
      {/* Main filter section - non-clickable label with gray background */}
      <div className="bg-[var(--color-bg-secondary)] h-full flex items-center px-[var(--spacing-x2)]">
        <FilterChip
          filter={filter}
          isSelected={false}
          onSelect={() => { }}
          onRemove={undefined}
          showBorder={false}
          isMainLabel={true}
        />
      </div>

      {/* Options section with separators */}
      {filter.options?.map((option, index) => (
        <React.Fragment key={option.id}>
          {index > 0 && <div className="w-px h-[var(--spacing-x9)] bg-[var(--color-border-primary)]" />}
          <div className="px-[var(--spacing-x1)] h-full flex items-center">
            <FilterChip
              filter={filter}
              option={option}
              isSelected={filter.selectedOption === option.id}
              onSelect={() => onFilterClick(filter.id, option.id)}
              onRemove={filter.selectedOption === option.id ?
                () => onFilterRemove(filter.id, option.id) : undefined
              }
              showBorder={false}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export const QuickFilters: React.FC<QuickFiltersProps> = ({
  filters,
  onFilterClick = () => { },
  onFilterRemove = () => { },
  className,
  scrollable = false,
}) => {
  return (
    <div
      className={cn(
        'flex gap-[var(--spacing-x2)]',
        scrollable ? 'overflow-x-auto overflow-y-hidden flex-nowrap' : 'flex-wrap',
        className
      )}
      role="group"
      aria-label="Quick filters"
      style={scrollable ? {
        scrollbarWidth: 'thin',
        WebkitOverflowScrolling: 'touch',
      } : undefined}
    >
      {filters.map((filter) => {
        if (filter.options && filter.options.length > 0) {
          // Multi-option filter
          return (
            <div key={filter.id} className={scrollable ? 'flex-shrink-0' : ''}>
              <MultiOptionFilter
                filter={filter}
                onFilterClick={onFilterClick}
                onFilterRemove={onFilterRemove}
              />
            </div>
          );
        } else {
          // Single option filter - wrap FilterChip in 36px container
          return (
            <div
              key={filter.id}
              className={cn(
                "h-[var(--spacing-x9)] flex items-center p-[var(--spacing-x1)] rounded-[var(--radius-md)]",
                filter.selected
                  ? "bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)]"
                  : "bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)]",
                scrollable ? 'flex-shrink-0' : ''
              )}
            >
              <FilterChip
                filter={filter}
                isSelected={filter.selected || false}
                onSelect={() => onFilterClick(filter.id)}
                onRemove={filter.selected ? () => onFilterRemove(filter.id) : undefined}
                showBorder={false}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

QuickFilters.displayName = 'QuickFilters'; 
