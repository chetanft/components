"use client";

import React, { useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { AppHeader, type User as AppHeaderUser } from '../../organisms/AppHeader';
import { Card } from '../../organisms/Card';
import type { TableColumn } from '../../organisms/Table';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge';
import { Typography } from '../../atoms/Typography';
import { ComposableDataTable } from './shared/ComposableDataTable';

const DEFAULT_DASHBOARD_USER: AppHeaderUser = {
  name: 'John Doe',
  role: 'Admin',
  location: 'Mumbai',
  badge: 'Admin',
};

const DEFAULT_DASHBOARD_METRICS = [
  { id: 'users', label: 'Total Users', value: '1,234' },
  { id: 'sessions', label: 'Active Sessions', value: '567' },
  { id: 'revenue', label: 'Revenue', value: '$12,345' },
];

const DEFAULT_DASHBOARD_ROWS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', role: 'User' },
];

type DashboardRow = typeof DEFAULT_DASHBOARD_ROWS[number];

export interface DashboardBlockProps {
  user?: AppHeaderUser;
  metrics?: { id: string; label: string; value: string }[];
  rows?: DashboardRow[];
  onAddUser?: () => void;
  className?: string;
}

export const DashboardBlock: React.FC<DashboardBlockProps> = ({
  user = DEFAULT_DASHBOARD_USER,
  metrics = DEFAULT_DASHBOARD_METRICS,
  rows = DEFAULT_DASHBOARD_ROWS,
  onAddUser,
  className,
}) => {
  const columns = useMemo<TableColumn<DashboardRow>[]>(() => [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'status',
      label: 'Status',
      render: (value: unknown) => (
        <Badge variant={value === 'Active' ? 'success' : 'neutral'}>
          {value as string}
        </Badge>
      ),
    },
    { key: 'role', label: 'Role' },
  ], []);

  return (
    <div className={cn("flex flex-col gap-[var(--spacing-x6)]", className)}>
      <AppHeader user={user} />

      <div className="grid gap-[var(--spacing-x4)] grid-cols-[repeat(auto-fit,minmax(13.75rem,1fr))]">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <div className="p-[var(--spacing-x4)] flex flex-col gap-[var(--spacing-x1-5)]">
              <Typography variant="body-secondary-medium" className="text-[var(--secondary)]">
                {metric.label}
              </Typography>
              <Typography variant="display-primary" className="text-[var(--primary)]">
                {metric.value}
              </Typography>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="p-[var(--spacing-x4)] flex flex-col gap-[var(--spacing-x4)]">
          <div className="flex items-center justify-between">
            <Typography variant="body-primary-medium" className="text-[var(--primary)] text-lg">
              Users
            </Typography>
            <Button variant="primary" size="md" onClick={onAddUser}>
              Add User
            </Button>
          </div>
          <ComposableDataTable<DashboardRow> columns={columns} data={rows} />
        </div>
      </Card>
    </div>
  );
};
