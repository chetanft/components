import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { QuickFilters, QuickFilter } from '../components/QuickFilters/QuickFilters';

const meta = {
  title: 'Components/QuickFilters',
  component: QuickFilters,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuickFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive component wrapper
const InteractiveQuickFilters: React.FC<{ initialFilters: QuickFilter[] }> = ({ initialFilters }) => {
  const [filters, setFilters] = useState<QuickFilter[]>(initialFilters);

  const handleFilterClick = (filterId: string, optionId?: string) => {
    setFilters(prev => prev.map(filter => {
      if (filter.id === filterId) {
        if (optionId) {
          // Multi-option filter
          return {
            ...filter,
            selectedOption: filter.selectedOption === optionId ? undefined : optionId
          };
        } else {
          // Single option filter
          return {
            ...filter,
            selected: !filter.selected
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
          // Remove specific option selection
          return {
            ...filter,
            selectedOption: undefined
          };
        } else {
          // Remove single filter selection
          return {
            ...filter,
            selected: false
          };
        }
      }
      return filter;
    }));
  };

  return (
    <QuickFilters
      filters={filters}
      onFilterClick={handleFilterClick}
      onFilterRemove={handleFilterRemove}
    />
  );
};

// Default story with basic functionality
export const Default: Story = {
  args: {
    filters: [
      {
        id: 'simple',
        label: 'Long Stoppage',
        selected: false,
      },
      {
        id: 'with-count',
        label: 'Long Stoppage',
        count: 19,
        selected: false,
      },
    ],
  },
};

// Single option filters
export const SingleOptions: Story = {
  render: () => {
    const filters: QuickFilter[] = [
      {
        id: 'simple',
        label: 'Long Stoppage',
        selected: false,
      },
      {
        id: 'with-count',
        label: 'Long Stoppage',
        count: 19,
        selected: false,
      },
      {
        id: 'alert-type',
        label: 'Long Stoppage',
        count: 19,
        type: 'alert',
        selected: false,
      },
    ];

    return <InteractiveQuickFilters initialFilters={filters} />;
  },
};

// Multi-option filters (2 options)
export const TwoOptions: Story = {
  render: () => {
    const filters: QuickFilter[] = [
      {
        id: 'eway-normal',
        label: 'E Way bill',
        type: 'normal',
        options: [
          { id: 'expiring', label: 'Expiring in 3 hrs', count: 28 },
          { id: 'expired', label: 'Expired', count: 18 },
        ],
      },
      {
        id: 'eway-alert',
        label: 'E Way bill',
        type: 'alert',
        options: [
          { id: 'expiring-alert', label: 'Expiring in 3 hrs', count: 28, type: 'alert' },
          { id: 'expired-alert', label: 'Expired', count: 18, type: 'alert' },
        ],
      },
    ];

    return <InteractiveQuickFilters initialFilters={filters} />;
  },
};

// Multi-option filters (3 options)
export const ThreeOptions: Story = {
  render: () => {
    const filters: QuickFilter[] = [
      {
        id: 'delayed-normal',
        label: 'Delayed',
        count: 51,
        type: 'normal',
        options: [
          { id: '0-6hrs', label: '0-6 hrs', count: 28 },
          { id: '6-12hrs', label: '6-12 hrs', count: 18 },
          { id: '12plus', label: '12+ hrs', count: 5 },
        ],
      },
      {
        id: 'delayed-alert',
        label: 'Delayed',
        count: 51,
        type: 'alert',
        options: [
          { id: '0-6hrs-alert', label: '0-6 hrs', count: 28, type: 'alert' },
          { id: '6-12hrs-alert', label: '6-12 hrs', count: 18, type: 'alert' },
          { id: '12plus-alert', label: '12+ hrs', count: 5, type: 'alert' },
        ],
      },
    ];

    return <InteractiveQuickFilters initialFilters={filters} />;
  },
};

// Mixed filter types
export const MixedFilters: Story = {
  render: () => {
    const filters: QuickFilter[] = [
      {
        id: 'single-1',
        label: 'Long Stoppage',
        count: 19,
        selected: true,
      },
      {
        id: 'single-2',
        label: 'Short Delay',
        count: 5,
        type: 'alert',
        selected: false,
      },
      {
        id: 'multi-2',
        label: 'E Way bill',
        type: 'normal',
        selectedOption: 'expiring',
        options: [
          { id: 'expiring', label: 'Expiring in 3 hrs', count: 28 },
          { id: 'expired', label: 'Expired', count: 18 },
        ],
      },
      {
        id: 'multi-3',
        label: 'Delayed',
        count: 51,
        type: 'alert',
        selectedOption: '6-12hrs',
        options: [
          { id: '0-6hrs', label: '0-6 hrs', count: 28, type: 'alert' },
          { id: '6-12hrs', label: '6-12 hrs', count: 18, type: 'alert' },
          { id: '12plus', label: '12+ hrs', count: 5, type: 'alert' },
        ],
      },
      {
        id: 'single-3',
        label: 'Route Issues',
        selected: false,
      },
    ];

    return <InteractiveQuickFilters initialFilters={filters} />;
  },
};

// All states demonstration
export const AllStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Single Option Filters</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2 text-gray-600">Default States</h4>
            <QuickFilters
              filters={[
                { id: '1', label: 'Long Stoppage', selected: false },
                { id: '2', label: 'Long Stoppage', count: 19, selected: false },
                { id: '3', label: 'Long Stoppage', count: 19, type: 'alert', selected: false },
              ]}
            />
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2 text-gray-600">Selected States</h4>
            <QuickFilters
              filters={[
                { id: '4', label: 'Long Stoppage', selected: true },
                { id: '5', label: 'Long Stoppage', count: 19, selected: true },
                { id: '6', label: 'Long Stoppage', count: 19, type: 'alert', selected: true },
              ]}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Multi-Option Filters</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2 text-gray-600">2 Options - Normal</h4>
            <QuickFilters
              filters={[
                {
                  id: '7',
                  label: 'E Way bill',
                  type: 'normal',
                  options: [
                    { id: 'exp1', label: 'Expiring in 3 hrs', count: 28 },
                    { id: 'exp2', label: 'Expired', count: 18 },
                  ],
                },
                {
                  id: '8',
                  label: 'E Way bill',
                  type: 'normal',
                  selectedOption: 'exp3',
                  options: [
                    { id: 'exp3', label: 'Expiring in 3 hrs', count: 28 },
                    { id: 'exp4', label: 'Expired', count: 18 },
                  ],
                },
              ]}
            />
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2 text-gray-600">2 Options - Alert</h4>
            <QuickFilters
              filters={[
                {
                  id: '7a',
                  label: 'E Way bill',
                  type: 'alert',
                  options: [
                    { id: 'exp1a', label: 'Expiring in 3 hrs', count: 28, type: 'alert' },
                    { id: 'exp2a', label: 'Expired', count: 18, type: 'alert' },
                  ],
                },
                {
                  id: '8a',
                  label: 'E Way bill',
                  type: 'alert',
                  selectedOption: 'exp3a',
                  options: [
                    { id: 'exp3a', label: 'Expiring in 3 hrs', count: 28, type: 'alert' },
                    { id: 'exp4a', label: 'Expired', count: 18, type: 'alert' },
                  ],
                },
              ]}
            />
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2 text-gray-600">3 Options - Normal</h4>
            <QuickFilters
              filters={[
                {
                  id: '9',
                  label: 'Delayed',
                  count: 51,
                  type: 'normal',
                  options: [
                    { id: 'del1', label: '0-6 hrs', count: 28 },
                    { id: 'del2', label: '6-12 hrs', count: 18 },
                    { id: 'del3', label: '12+ hrs', count: 5 },
                  ],
                },
                {
                  id: '10',
                  label: 'Delayed',
                  count: 51,
                  type: 'normal',
                  selectedOption: 'del5',
                  options: [
                    { id: 'del4', label: '0-6 hrs', count: 28 },
                    { id: 'del5', label: '6-12 hrs', count: 18 },
                    { id: 'del6', label: '12+ hrs', count: 5 },
                  ],
                },
              ]}
            />
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2 text-gray-600">3 Options - Alert</h4>
            <QuickFilters
              filters={[
                {
                  id: '9a',
                  label: 'Delayed',
                  count: 51,
                  type: 'alert',
                  options: [
                    { id: 'del1a', label: '0-6 hrs', count: 28, type: 'alert' },
                    { id: 'del2a', label: '6-12 hrs', count: 18, type: 'alert' },
                    { id: 'del3a', label: '12+ hrs', count: 5, type: 'alert' },
                  ],
                },
                {
                  id: '10a',
                  label: 'Delayed',
                  count: 51,
                  type: 'alert',
                  selectedOption: 'del5a',
                  options: [
                    { id: 'del4a', label: '0-6 hrs', count: 28, type: 'alert' },
                    { id: 'del5a', label: '6-12 hrs', count: 18, type: 'alert' },
                    { id: 'del6a', label: '12+ hrs', count: 5, type: 'alert' },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  ),
}; 