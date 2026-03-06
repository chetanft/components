"use client";

import React from 'react';
import { QuickFilters, QuickFilter, FilterOption, type QuickFilterType } from '../../../organisms/QuickFilters';

export const renderQuickFilters = (
  filters: QuickFilterType[],
  onFilterClick?: (filterId: string, optionId?: string) => void,
  onFilterRemove?: (filterId: string, optionId?: string) => void,
  options?: { scrollable?: boolean }
) => (
  <QuickFilters
    scrollable={options?.scrollable}
    onFilterClick={onFilterClick}
    onFilterRemove={onFilterRemove}
  >
    {filters.map((filter) => (
      <QuickFilter
        key={filter.id}
        id={filter.id}
        label={filter.label}
        count={filter.count}
        type={filter.type}
        selected={filter.selected}
        selectedOption={filter.selectedOption}
      >
        {filter.options?.map((option) => (
          <FilterOption
            key={option.id}
            id={option.id}
            label={option.label}
            count={option.count}
            type={option.type}
          />
        ))}
      </QuickFilter>
    ))}
  </QuickFilters>
);
