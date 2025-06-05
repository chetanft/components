import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from '../Icons';

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
  
  // Color configurations based on Figma
  const getColors = () => {
    if (isSelected) {
      return {
        background: '#F0F1F7',
        text: '#434F64',
        count: displayType === 'alert' ? '#E43634' : '#434F64',
      };
    } else {
      return {
        background: '#FFFFFF',
        text: '#434F64', 
        count: displayType === 'alert' ? '#E43634' : '#434F64',
        border: '#CED1D7',
      };
    }
  };

  const colors = getColors();
  
  const chipStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: isSubOption ? '0 8px' : '0 12px',
    height: isSubOption ? '28px' : '36px',
    backgroundColor: colors.background,
    border: isSelected ? 'none' : (isSubOption ? 'none' : `1px solid ${colors.border}`),
    borderRadius: isSubOption ? (isSelected ? '8px' : '0') : '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.4,
    color: colors.text,
    userSelect: 'none',
    whiteSpace: 'nowrap',
    minWidth: 'fit-content',
  };

  const countStyles: React.CSSProperties = {
    fontSize: isSubOption ? '14px' : '16px',
    fontWeight: 600,
    color: colors.count,
    lineHeight: isSubOption ? 1.21 : 1.21,
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={chipStyles} onClick={onSelect}>
      {displayCount && (
        <span style={countStyles}>{displayCount}</span>
      )}
      <span style={{ display: 'flex', alignItems: 'center' }}>{displayLabel}</span>
      {isSelected && onRemove && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <Icon
            name="close-filled"
            size={14}
            color={colors.text}
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
  const hasSelectedOption = filter.selectedOption;
  
  const containerStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: '1px solid #CED1D7',
    borderRadius: '8px',
    overflow: 'hidden',
    height: '36px',
  };

  const mainSectionStyles: React.CSSProperties = {
    backgroundColor: '#F0F1F7',
    borderRadius: '8px 0 0 8px',
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    height: '100%',
    minWidth: 'fit-content',
  };

  const optionsSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    padding: '4px 8px 4px 12px',
    height: '100%',
  };

  const separatorStyles: React.CSSProperties = {
    width: '1px',
    height: '26px',
    backgroundColor: '#F0F1F7',
  };

  return (
    <div style={containerStyles}>
      {/* Main filter section */}
      <div style={mainSectionStyles}>
        {filter.count && (
          <span style={{
            fontSize: '16px',
            fontWeight: 600,
            color: filter.type === 'alert' ? '#E43634' : '#434F64',
            lineHeight: 1.21,
            display: 'flex',
            alignItems: 'center',
          }}>
            {filter.count}
          </span>
        )}
        <span style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#434F64',
          lineHeight: 1.4,
          display: 'flex',
          alignItems: 'center',
        }}>
          {filter.label}
        </span>
      </div>

      {/* Options section */}
      <div style={optionsSectionStyles}>
        {filter.options?.map((option, index) => (
          <React.Fragment key={option.id}>
            {index > 0 && <div style={separatorStyles} />}
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
    <div className={cn('flex flex-wrap gap-3', className)}>
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