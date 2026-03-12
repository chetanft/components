import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QuickFilters, QuickFilter, FilterOption } from './QuickFilters';

const meta: Meta<typeof QuickFilters> = {
  title: 'UI Components/QuickFilters',
  component: QuickFilters,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible filter component that displays quick filter chips with optional counts, types, and multi-option support. Supports both composable API (recommended) and declarative API (deprecated).',
      },
    },
    explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                  },
                                                                                                                                                                                                },
      mode: 'matrix' as const,
      baseStory: 'ExplorerBase',
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Filter Type',
          scenarios: [
            { id: 'single', label: 'Single Filters', story: 'ExplorerBase', args: { filterType: 'single' } },
            { id: 'multi', label: 'Multi-option', story: 'ExplorerBase', args: { filterType: 'multi' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { selectionMode: 'default' } },
            { id: 'selected', label: 'Selected', story: 'ExplorerBase', args: { selectionMode: 'selected' } },
            { id: 'mixed', label: 'Mixed Selection', story: 'ExplorerBase', args: { selectionMode: 'mixed' } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'single',
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    scrollable: {
      control: 'boolean',
      description: 'Whether filters are horizontally scrollable.',
    },
    glass: {
      control: 'select',
      options: [undefined, true, 'subtle', 'prominent'],
      description: 'Glass morphism variant for filter chips.',
    },
    chipClassName: {
      control: 'text',
      description: 'Additional className for filter chip wrapper.',
    },
    labelClassName: {
      control: 'text',
      description: 'Additional className for chip label text.',
    },
    countClassName: {
      control: 'text',
      description: 'Additional className for count badge text.',
    },
    children: {
      control: false,
      description: 'Filter components (composable API).',
    },
    onFilterClick: {
      control: false,
      description: 'Callback when a filter is clicked.',
    },
    onFilterRemove: {
      control: false,
      description: 'Callback when a filter is removed.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuickFilters>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const filterType = args.filterType ?? 'single';
    const selectionMode = args.selectionMode ?? 'default';

    if (filterType === 'multi') {
      return (
        <div className="p-6">
          <QuickFilters onFilterClick={() => {}} onFilterRemove={() => {}}>
            <QuickFilter id="duration" label="Duration" selectedOption={selectionMode !== 'default' ? '0-6' : undefined}>
              <FilterOption id="0-6" label="0-6 hrs" />
              <FilterOption id="6-12" label="6-12 hrs" />
              <FilterOption id="12+" label="12+ hrs" />
            </QuickFilter>
            <QuickFilter id="status" label="Status">
              <FilterOption id="active" label="Active" count={12} />
              <FilterOption id="pending" label="Pending" count={5} />
            </QuickFilter>
          </QuickFilters>
        </div>
      );
    }

    const items =
      selectionMode === 'selected'
        ? [
            { id: 'f1', label: 'Filter A', count: 10, selected: true },
            { id: 'f2', label: 'Filter B', count: 5, selected: true },
          ]
        : selectionMode === 'mixed'
          ? [
              { id: 'f1', label: 'Filter A', count: 10, selected: false },
              { id: 'f2', label: 'Filter B', count: 5, selected: true },
              { id: 'f3', label: 'Filter C', count: 7, selected: false },
            ]
          : [
              { id: 'f1', label: 'All Items', count: undefined, selected: false },
              { id: 'f2', label: 'Active', count: 12, selected: false },
              { id: 'f3', label: 'Pending', count: 5, selected: false },
              { id: 'f4', label: 'Completed', count: 23, selected: false },
            ];

    return (
      <div className="p-6">
        <QuickFilters onFilterClick={() => {}} onFilterRemove={() => {}}>
          {items.map((item) => (
            <QuickFilter
              key={item.id}
              id={item.id}
              label={item.label}
              count={item.count as any}
              selected={item.selected}
            />
          ))}
        </QuickFilters>
      </div>
    );
  },
};

// Composable API - Single filters
export function Default() {
  return (
    <div className="p-6">
      <QuickFilters
        onFilterClick={(id) => console.log('Clicked:', id)}
        onFilterRemove={(id) => console.log('Removed:', id)}
      >
        <QuickFilter id="filter-1" label="All Items" />
        <QuickFilter id="filter-2" label="Active" count={12} />
        <QuickFilter id="filter-3" label="Pending" count={5} />
        <QuickFilter id="filter-4" label="Completed" count={23} />
      </QuickFilters>
    </div>
  );
}

// Composable API - Multi-option filters
export function MultiOptionFilters() {
  return (
    <div className="p-6">
      <QuickFilters
        onFilterClick={(id, optionId) => console.log('Clicked:', id, optionId)}
        onFilterRemove={(id, optionId) => console.log('Removed:', id, optionId)}
      >
        <QuickFilter id="duration" label="Duration" selectedOption="0-6">
          <FilterOption id="0-6" label="0-6 hrs" />
          <FilterOption id="6-12" label="6-12 hrs" />
          <FilterOption id="12+" label="12+ hrs" />
        </QuickFilter>
        <QuickFilter id="status" label="Status">
          <FilterOption id="active" label="Active" count={12} />
          <FilterOption id="pending" label="Pending" count={5} />
          <FilterOption id="completed" label="Completed" count={23} />
        </QuickFilter>
      </QuickFilters>
    </div>
  );
}

export function DocsVariants() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Single Filters</p>
        <QuickFilters
          onFilterClick={(id) => console.log('Clicked:', id)}
          onFilterRemove={(id) => console.log('Removed:', id)}
        >
          <QuickFilter id="f-1" label="All Items" />
          <QuickFilter id="f-2" label="Active" count={12} />
          <QuickFilter id="f-3" label="Pending" count={5} />
        </QuickFilters>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">With Types (alert, warning, success, neutral)</p>
        <QuickFilters
          onFilterClick={(id) => console.log('Clicked:', id)}
          onFilterRemove={(id) => console.log('Removed:', id)}
        >
          <QuickFilter id="f-a" label="Alert" count={19} type="alert" />
          <QuickFilter id="f-w" label="Warning" count={5} type="warning" />
          <QuickFilter id="f-s" label="Success" count={42} type="success" />
          <QuickFilter id="f-n" label="Neutral" count={8} type="neutral" />
        </QuickFilters>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Multi-option Filters</p>
        <QuickFilters
          onFilterClick={(id, optionId) => console.log('Clicked:', id, optionId)}
          onFilterRemove={(id, optionId) => console.log('Removed:', id, optionId)}
        >
          <QuickFilter id="duration" label="Duration" selectedOption="0-6">
            <FilterOption id="0-6" label="0-6 hrs" />
            <FilterOption id="6-12" label="6-12 hrs" />
            <FilterOption id="12+" label="12+ hrs" />
          </QuickFilter>
          <QuickFilter id="status" label="Status">
            <FilterOption id="active" label="Active" count={12} />
            <FilterOption id="pending" label="Pending" count={5} />
          </QuickFilter>
        </QuickFilters>
      </div>
    </div>
  );
}

export function DocsStates() {
  const [filters, setFilters] = React.useState([
    { id: 'f1', selected: false },
    { id: 'f2', selected: true },
    { id: 'f3', selected: false },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Default (unselected)</p>
        <QuickFilters onFilterClick={() => {}} onFilterRemove={() => {}}>
          <QuickFilter id="s-1" label="Filter A" count={10} />
          <QuickFilter id="s-2" label="Filter B" count={5} />
        </QuickFilters>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Selected</p>
        <QuickFilters onFilterClick={() => {}} onFilterRemove={() => {}}>
          <QuickFilter id="s-3" label="Filter A" count={10} selected />
          <QuickFilter id="s-4" label="Filter B" count={5} selected />
        </QuickFilters>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Mixed selection (interactive)</p>
        <QuickFilters
          onFilterClick={(id) => {
            setFilters(prev => prev.map(f => f.id === id ? { ...f, selected: !f.selected } : f));
          }}
          onFilterRemove={(id) => {
            setFilters(prev => prev.map(f => f.id === id ? { ...f, selected: false } : f));
          }}
        >
          {filters.map(f => (
            <QuickFilter key={f.id} id={f.id} label={`Filter ${f.id}`} count={Math.floor(Math.random() * 20)} selected={f.selected} />
          ))}
        </QuickFilters>
      </div>
    </div>
  );
}

export function SelectedState() {
  return (
    <div className="p-6">
      <QuickFilters onFilterClick={() => {}} onFilterRemove={() => {}}>
        <QuickFilter id="s-3" label="Filter A" count={10} selected />
        <QuickFilter id="s-4" label="Filter B" count={5} selected />
      </QuickFilters>
    </div>
  );
}

export function MixedSelection() {
  const [filters, setFilters] = React.useState([
    { id: 'f1', selected: false },
    { id: 'f2', selected: true },
    { id: 'f3', selected: false },
  ]);

  return (
    <div className="p-6">
      <QuickFilters
        onFilterClick={(id) => {
          setFilters(prev => prev.map(f => f.id === id ? { ...f, selected: !f.selected } : f));
        }}
        onFilterRemove={(id) => {
          setFilters(prev => prev.map(f => f.id === id ? { ...f, selected: false } : f));
        }}
      >
        {filters.map(f => (
          <QuickFilter key={f.id} id={f.id} label={`Filter ${f.id}`} count={10} selected={f.selected} />
        ))}
      </QuickFilters>
    </div>
  );
}
