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
        "inline-flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer transition-all duration-200",
        "text-sm font-semibold font-inter",
        // Background based on Figma design
        isMainLabel 
          ? "bg-[#F0F1F7]" // Main labels in multi-option always have gray background
          : isSelected 
            ? "bg-[#F0F1F7]" 
            : "bg-white",
        // Border for default state (not main labels)
        showBorder && !isSelected && !isMainLabel ? "border border-[#CED1D7]" : ""
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
            "inline-flex items-center justify-center px-2 py-0.5 rounded-full text-sm font-semibold min-w-[24px] h-5",
            // Count badge styling based on state and type
            isSelected 
              ? cn(
                  "bg-white",
                  displayType === 'alert' ? "text-[#FF3533]" :
                  displayType === 'warning' ? "text-[#FF6C19]" :
                  displayType === 'success' ? "text-[#00C638]" :
                  displayType === 'neutral' ? "text-[#1890FF]" :
                  "text-[#434F64]"
                )
              : cn(
                  "bg-[#F0F1F7]",
                  displayType === 'alert' ? "text-[#FF3533]" :
                  displayType === 'warning' ? "text-[#FF6C19]" :
                  displayType === 'success' ? "text-[#00C638]" :
                  displayType === 'neutral' ? "text-[#1890FF]" :
                  "text-[#434F64]"
                )
          )}
        >
          {displayCount}
        </span>
      )}
      
      {/* Label */}
      <span className="text-[#434F64]">
        {displayLabel}
      </span>
      
      {/* Space for tick icon - always present to prevent layout shift */}
      <div className="flex items-center justify-center w-[14px] h-[14px] ml-1">
        {isSelected && onRemove && !isMainLabel && (
          <div
            className="cursor-pointer"
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
              className="text-[#434F64]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const MultiOptionFilter: React.FC<{
  filter: QuickFilter;
  onFilterClick: (filterId: string, optionId?: string) => void;
  onFilterRemove: (filterId: string, optionId?: string) => void;
}> = ({ filter, onFilterClick, onFilterRemove }) => {
  return (
    <div className="inline-flex items-center bg-white border border-[#CED1D7] rounded-lg overflow-hidden">
      {/* Main filter section - non-clickable label with gray background */}
      <div className="bg-[#F0F1F7] px-2 py-1">
        <FilterChip
          filter={filter}
          isSelected={false}
          onSelect={() => {}}
          onRemove={undefined}
          showBorder={false}
          isMainLabel={true}
        />
      </div>

      {/* Options section with separators */}
      {filter.options?.map((option, index) => (
        <React.Fragment key={option.id}>
          {index > 0 && <div className="w-[1px] h-6 bg-[#CED1D7]" />}
          <div className="px-1">
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
  onFilterClick = () => {},
  onFilterRemove = () => {},
  className,
}) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)} role="group" aria-label="Quick filters">
      {filters.map((filter) => {
        if (filter.options && filter.options.length > 0) {
          // Multi-option filter
          return (
            <MultiOptionFilter
              key={filter.id}
              filter={filter}
              onFilterClick={onFilterClick}
              onFilterRemove={onFilterRemove}
            />
          );
        } else {
          // Single option filter
          return (
            <FilterChip
              key={filter.id}
              filter={filter}
              isSelected={filter.selected || false}
              onSelect={() => onFilterClick(filter.id)}
              onRemove={filter.selected ? () => onFilterRemove(filter.id) : undefined}
            />
          );
        }
      })}
    </div>
  );
};

QuickFilters.displayName = 'QuickFilters'; 