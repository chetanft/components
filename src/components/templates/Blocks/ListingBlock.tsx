"use client";

import React, { useMemo, useState } from 'react';
import { AppHeader, type User as AppHeaderUser } from '../../organisms/AppHeader';
import type { TableColumn } from '../../organisms/Table';
import type { QuickFilterType } from '../../organisms/QuickFilters';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge';
import { Typography } from '../../atoms/Typography';
import { ComposableDataTable } from './shared/ComposableDataTable';
import { renderQuickFilters } from './shared/renderQuickFilters';

const DEFAULT_LISTING_USER: AppHeaderUser = {
  name: 'John Doe',
  role: 'Admin',
  location: 'Mumbai',
  badge: 'Admin',
};

const DEFAULT_LISTING_ROWS = [
  { id: 1, name: 'Project Alpha', status: 'Active', progress: 75, assignee: 'John Doe' },
  { id: 2, name: 'Project Beta', status: 'Pending', progress: 30, assignee: 'Jane Smith' },
  { id: 3, name: 'Project Gamma', status: 'Completed', progress: 100, assignee: 'Bob Johnson' },
];

type ListingRow = typeof DEFAULT_LISTING_ROWS[number];

const DEFAULT_LISTING_FILTERS: QuickFilterType[] = [
  { id: 'all', label: 'All', selected: true },
  { id: 'active', label: 'Active', count: 1 },
  { id: 'pending', label: 'Pending', count: 1 },
  { id: 'completed', label: 'Completed', count: 1 },
];

export interface ListingBlockProps {
  user?: AppHeaderUser;
  rows?: ListingRow[];
  filters?: QuickFilterType[];
  onCreate?: () => void;
}

export const ListingBlock: React.FC<ListingBlockProps> = ({
  user = DEFAULT_LISTING_USER,
  rows = DEFAULT_LISTING_ROWS,
  filters = DEFAULT_LISTING_FILTERS,
  onCreate,
}) => {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.id || 'all');

  const filteredRows = useMemo(() => {
    if (activeFilter === 'all') return rows;
    return rows.filter((row) => row.status.toLowerCase() === activeFilter);
  }, [activeFilter, rows]);

  const columns = useMemo<TableColumn<ListingRow>[]>(() => [
    { key: 'name', label: 'Project Name' },
    {
      key: 'status',
      label: 'Status',
      render: (value: unknown) => (
        <Badge
          variant={
            value === 'Active' ? 'success' : value === 'Completed' ? 'neutral' : 'warning'
          }
        >
          {value as string}
        </Badge>
      ),
    },
    {
      key: 'progress',
      label: 'Progress',
      render: (value: unknown) => `${value as number}%`,
    },
    { key: 'assignee', label: 'Assignee' },
  ], []);

  return (
    <div className="flex flex-col gap-[var(--spacing-x5)]">
      <AppHeader user={user} />

      <div className="flex items-center justify-between">
        <Typography variant="body-primary-medium" className="text-[var(--primary)] text-2xl">
          Projects
        </Typography>
        <Button variant="primary" size="md" onClick={onCreate}>
          New Project
        </Button>
      </div>

      {renderQuickFilters(
        filters.map((filter) => ({ ...filter, selected: filter.id === activeFilter })),
        (filterId: string) => setActiveFilter(filterId)
      )}

      <ComposableDataTable<ListingRow> columns={columns} data={filteredRows} />
    </div>
  );
};
