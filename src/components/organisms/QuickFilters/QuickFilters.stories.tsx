import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QuickFilters, type QuickFilter } from './QuickFilters';

const meta: Meta<typeof QuickFilters> = {
  title: 'UI Components/QuickFilters',
  component: QuickFilters,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible filter component that displays quick filter chips with optional counts, types, and multi-option support. Supports single filters and filters with multiple options.',
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof QuickFilters>;

// Single filters - default state
export function SingleFilters() {
  const filters: QuickFilter[] = [
    { id: 'filter-1', label: 'All Items' },
    { id: 'filter-2', label: 'Active', count: 12 },
    { id: 'filter-3', label: 'Pending', count: 5 },
    { id: 'filter-4', label: 'Completed', count: 23 },
  ];

  return (
    <div className="p-6">
      <QuickFilters
        filters={filters}
        onFilterClick={(id) => console.log('Clicked:', id)}
        onFilterRemove={(id) => console.log('Removed:', id)}
      />
    </div>
  );
}

// Single filters with types
export function SingleFiltersWithTypes() {
  const filters: QuickFilter[] = [
    { id: 'filter-1', label: 'Alert', count: 19, type: 'alert' },
    { id: 'filter-2', label: 'Warning', count: 5, type: 'warning' },
    { id: 'filter-3', label: 'Success', count: 42, type: 'success' },
    { id: 'filter-4', label: 'Neutral', count: 8, type: 'neutral' },
    { id: 'filter-5', label: 'Normal', count: 15 },
  ];

  return (
    <div className="p-6">
      <QuickFilters
        filters={filters}
        onFilterClick={(id) => console.log('Clicked:', id)}
        onFilterRemove={(id) => console.log('Removed:', id)}
      />
    </div>
  );
}

// Selected filters
export function SelectedFilters() {
  const filters: QuickFilter[] = [
    { id: 'filter-1', label: 'All Items', selected: true },
    { id: 'filter-2', label: 'Active', count: 12, selected: true },
    { id: 'filter-3', label: 'Pending', count: 5 },
    { id: 'filter-4', label: 'Completed', count: 23 },
  ];

  return (
    <div className="p-6">
      <QuickFilters
        filters={filters}
        onFilterClick={(id) => console.log('Clicked:', id)}
        onFilterRemove={(id) => console.log('Removed:', id)}
      />
    </div>
  );
}

// Multi-option filters
export function MultiOptionFilters() {
  const filters: QuickFilter[] = [
    {
      id: 'duration',
      label: 'Duration',
      options: [
        { id: '0-6', label: '0-6 hrs' },
        { id: '6-12', label: '6-12 hrs' },
        { id: '12+', label: '12+ hrs' },
      ],
      selectedOption: '0-6',
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        { id: 'active', label: 'Active', count: 12 },
        { id: 'pending', label: 'Pending', count: 5 },
        { id: 'completed', label: 'Completed', count: 23 },
      ],
    },
  ];

  return (
    <div className="p-6">
      <QuickFilters
        filters={filters}
        onFilterClick={(id, optionId) => console.log('Clicked:', id, optionId)}
        onFilterRemove={(id, optionId) => console.log('Removed:', id, optionId)}
      />
    </div>
  );
}

// Mixed filters (single + multi-option)
export function MixedFilters() {
  const filters: QuickFilter[] = [
    { id: 'long-stoppage', label: 'Long Stoppage', count: 19, type: 'alert', selected: true },
    { id: 'route-deviation', label: 'Route Deviation', count: 19, type: 'warning' },
    { id: 'delayed', label: 'Delayed', count: 51, type: 'warning' },
    {
      id: 'duration',
      label: 'Duration',
      options: [
        { id: '0-6', label: '0-6 hrs' },
        { id: '6-12', label: '6-12 hrs' },
        { id: '12+', label: '12+ hrs' },
      ],
      selectedOption: '0-6',
    },
  ];

  return (
    <div className="p-6">
      <QuickFilters
        filters={filters}
        onFilterClick={(id, optionId) => console.log('Clicked:', id, optionId)}
        onFilterRemove={(id, optionId) => console.log('Removed:', id, optionId)}
      />
    </div>
  );
}

// Multi-option with types
export function MultiOptionWithTypes() {
  const filters: QuickFilter[] = [
    {
      id: 'alerts',
      label: 'Alerts',
      options: [
        { id: 'critical', label: 'Critical', count: 5, type: 'alert' },
        { id: 'warning', label: 'Warning', count: 12, type: 'warning' },
        { id: 'info', label: 'Info', count: 8, type: 'neutral' },
      ],
      selectedOption: 'critical',
    },
  ];

  return (
    <div className="p-6">
      <QuickFilters
        filters={filters}
        onFilterClick={(id, optionId) => console.log('Clicked:', id, optionId)}
        onFilterRemove={(id, optionId) => console.log('Removed:', id, optionId)}
      />
    </div>
  );
}

// Interactive example
export function Interactive() {
  const [filters, setFilters] = React.useState<QuickFilter[]>([
    { id: 'filter-1', label: 'All Items', selected: true },
    { id: 'filter-2', label: 'Active', count: 12 },
    { id: 'filter-3', label: 'Pending', count: 5 },
    {
      id: 'duration',
      label: 'Duration',
      options: [
        { id: '0-6', label: '0-6 hrs' },
        { id: '6-12', label: '6-12 hrs' },
        { id: '12+', label: '12+ hrs' },
      ],
    },
  ]);

  const handleFilterClick = (filterId: string, optionId?: string) => {
    setFilters(prev => prev.map(filter => {
      if (filter.id === filterId) {
        if (optionId) {
          // Multi-option filter
          return {
            ...filter,
            selectedOption: filter.selectedOption === optionId ? undefined : optionId,
          };
        } else {
          // Single filter
          return {
            ...filter,
            selected: !filter.selected,
          };
        }
      }
      return filter;
    }));
  };

  const handleFilterRemove = (filterId: string, optionId?: string) => {
    setFilters(prev => prev.map(filter => {
      if (filter.id === filterId) {
        if (optionId) {
          return {
            ...filter,
            selectedOption: undefined,
          };
        } else {
          return {
            ...filter,
            selected: false,
          };
        }
      }
      return filter;
    }));
  };

  return (
    <div className="p-6">
      <QuickFilters
        filters={filters}
        onFilterClick={handleFilterClick}
        onFilterRemove={handleFilterRemove}
      />
    </div>
  );
}

// Figma design example with horizontal scroll
export function FigmaDesignExample() {
  const [filters, setFilters] = React.useState<QuickFilter[]>([
    { id: 'long-stoppage', label: 'Long Stoppage', count: 19, type: 'alert', selected: true },
    { id: 'route-deviation', label: 'Route Deviation', count: 19, type: 'alert' },
    {
      id: 'delayed',
      label: 'Delayed',
      options: [
        { id: '0-6', label: '0-6 hrs', count: 19, type: 'alert' },
        { id: '6-12', label: '6-12 hrs', count: 19, type: 'alert' },
        { id: '12+', label: '12+ hrs', count: 19, type: 'alert' },
      ],
      selectedOption: '0-6',
    },
    {
      id: 'eway',
      label: 'E Way bill',
      options: [
        { id: 'expiring', label: 'Expiring in 3 hrs', count: 19, type: 'warning' },
        { id: 'expired', label: 'Expired', count: 19, type: 'alert' },
      ],
    },
    {
      id: 'eta',
      label: 'ETA',
      options: [
        { id: '0-6', label: '0-6 hrs', count: 19 },
        { id: '6-12', label: '6-12 hrs', count: 19 },
        { id: '12+', label: '12+ hrs', count: 19 },
      ],
      selectedOption: '0-6',
    },
  ]);

  const handleFilterClick = (filterId: string, optionId?: string) => {
    setFilters(prev => prev.map(filter => {
      if (filter.id === filterId) {
        if (optionId) {
          // Multi-option filter
          return {
            ...filter,
            selectedOption: filter.selectedOption === optionId ? undefined : optionId,
          };
        } else {
          // Single filter
          return {
            ...filter,
            selected: !filter.selected,
          };
        }
      }
      return filter;
    }));
  };

  const handleFilterRemove = (filterId: string, optionId?: string) => {
    setFilters(prev => prev.map(filter => {
      if (filter.id === filterId) {
        if (optionId) {
          return {
            ...filter,
            selectedOption: undefined,
          };
        } else {
          return {
            ...filter,
            selected: false,
          };
        }
      }
      return filter;
    }));
  };

  return (
    <div className="w-full overflow-hidden">
      <QuickFilters
        filters={filters}
        scrollable={true}
        onFilterClick={handleFilterClick}
        onFilterRemove={handleFilterRemove}
      />
    </div>
  );
}

