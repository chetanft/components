import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

export type FilterType = 'normal' | 'alert';
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
  isSubOption?: boolean;
  onSelect: () => void;
  onRemove?: () => void;
}> = ({ filter, option, isSelected, isSubOption = false, onSelect, onRemove }) => {
  const displayLabel = option?.label || filter.label;
  const displayCount = option?.count || filter.count;
  const displayType = option?.type || filter.type || 'normal';
  
  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2",
        isSubOption ? "px-2" : "px-3",
        isSubOption ? "h-7" : "h-9",
        isSelected 
          ? "bg-[#F0F1F7] border-0" 
          : isSubOption 
            ? "bg-white border-0" 
            : "bg-white border border-[#CED1D7]",
        isSubOption 
          ? isSelected ? "rounded-lg" : "rounded-none" 
          : "rounded-lg",
        "cursor-pointer transition-all duration-200",
        "font-sans text-sm font-semibold text-[#434F64]",
        "whitespace-nowrap"
      )}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {displayCount !== undefined && (
        <span 
          className={cn(
            "font-semibold",
            isSubOption ? "text-sm" : "text-base",
            displayType === 'alert' ? "text-[#FF3533]" : "text-[#434F64]",
            "leading-[1.21]"
          )}
        >
          {displayCount}
        </span>
      )}
      <span className="flex items-center">{displayLabel}</span>
      {isSelected && onRemove && (
        <span
          className="flex items-center justify-center cursor-pointer flex-shrink-0"
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
            name="close-filled"
            size={14}
            className="text-[#434F64]"
          />
        </span>
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
    <div className="inline-flex items-center bg-white border border-[#CED1D7] rounded-lg overflow-hidden h-9">
      {/* Main filter section */}
      <div className="bg-[#F0F1F7] h-full flex items-center gap-2 px-3">
        {filter.count !== undefined && (
          <span className={cn(
            "text-base font-semibold leading-[1.21]",
            filter.type === 'alert' ? "text-[#FF3533]" : "text-[#434F64]"
          )}>
            {filter.count}
          </span>
        )}
        <span className="text-sm font-semibold text-[#434F64]">
          {filter.label}
        </span>
      </div>

      {/* Options section */}
      <div className="flex items-center px-3 py-1 h-full">
        {filter.options?.map((option, index) => (
          <React.Fragment key={option.id}>
            {index > 0 && (
              <div className="w-px h-[26px] bg-[#F0F1F7] mx-1" aria-hidden="true" />
            )}
            <FilterChip
              filter={filter}
              option={option}
              isSelected={filter.selectedOption === option.id}
              isSubOption={true}
              onSelect={() => onFilterClick(filter.id, option.id)}
              onRemove={filter.selectedOption === option.id ? 
                () => onFilterRemove(filter.id, option.id) : undefined
              }
            />
          </React.Fragment>
        ))}
      </div>
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
    <div className={cn('flex flex-wrap gap-3', className)} role="group" aria-label="Quick filters">
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