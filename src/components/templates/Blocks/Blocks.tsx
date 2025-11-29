"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { AppHeader, type User as AppHeaderUser } from '../../organisms/AppHeader';
import { Card } from '../../organisms/Card';
import { Table, type TableColumn, type TableRow } from '../../organisms/Table';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge';
import { Typography } from '../../atoms/Typography';
import { QuickFilters, type QuickFilter } from '../../organisms/QuickFilters';
import { Input } from '../../atoms/Input';
import { Dropdown, type DropdownOption } from '../../molecules/Dropdown';
import { DatePicker } from '../../molecules/DatePicker';
import { Tabs, type Tab } from '../../organisms/Tabs';
import { SegmentedTabs } from '../../molecules/SegmentedTabs';
import { Checkbox } from '../../atoms/Checkbox';
import { Icon } from '../../atoms/Icons';

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
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'success' : 'neutral'}>
          {value}
        </Badge>
      ),
    },
    { key: 'role', label: 'Role' },
  ], []);

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--x6,24px)' }}>
      <AppHeader user={user} />

      <div style={{ display: 'grid', gap: 'var(--x4,16px)', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <div style={{ padding: 'var(--x4,16px)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
        <div style={{ padding: 'var(--x4,16px)', display: 'flex', flexDirection: 'column', gap: 'var(--x4,16px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body-primary-medium" className="text-[var(--primary)] text-lg">
              Users
            </Typography>
            <Button variant="primary" size="md" onClick={onAddUser}>
              Add User
            </Button>
          </div>
          <Table<DashboardRow> columns={columns} data={rows} />
        </div>
      </Card>
    </div>
  );
};

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

const DEFAULT_LISTING_FILTERS: QuickFilter[] = [
  { id: 'all', label: 'All', selected: true },
  { id: 'active', label: 'Active', count: 1 },
  { id: 'pending', label: 'Pending', count: 1 },
  { id: 'completed', label: 'Completed', count: 1 },
];

export interface ListingBlockProps {
  user?: AppHeaderUser;
  rows?: ListingRow[];
  filters?: QuickFilter[];
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
      render: (value: string) => (
        <Badge
          variant={
            value === 'Active' ? 'success' : value === 'Completed' ? 'neutral' : 'warning'
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'progress',
      label: 'Progress',
      render: (value: number) => `${value}%`,
    },
    { key: 'assignee', label: 'Assignee' },
  ], []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--x5,20px)' }}>
      <AppHeader user={user} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body-primary-medium" className="text-[var(--primary)] text-2xl">
          Projects
        </Typography>
        <Button variant="primary" size="md" onClick={onCreate}>
          New Project
        </Button>
      </div>

      <QuickFilters
        filters={filters.map((filter) => ({ ...filter, selected: filter.id === activeFilter }))}
        onFilterClick={(filterId: string) => setActiveFilter(filterId)}
      />

      <Table<ListingRow> columns={columns} data={filteredRows} />
    </div>
  );
};

export interface LoginBlockProps {
  onSubmit?: () => void;
}

export const LoginBlock: React.FC<LoginBlockProps> = ({ onSubmit }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--x6,24px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--x5,20px)', width: '100%', maxWidth: '360px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--x2,8px)', justifyContent: 'center' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '8px', backgroundColor: 'var(--primary)', color: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
            FT
          </div>
          <Typography variant="body-primary-medium" className="text-[var(--primary)]">
            FT Design System
          </Typography>
        </div>
        <Card>
          <div style={{ padding: 'var(--x5,20px)', display: 'flex', flexDirection: 'column', gap: 'var(--x4,16px)' }}>
            <div>
              <Typography variant="body-primary-medium" className="text-[var(--primary)] text-2xl">
                Welcome back
              </Typography>
              <Typography variant="body-secondary-regular" className="text-[var(--secondary)] text-sm">
                Enter your credentials to access your account
              </Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--x4,16px)' }}>
              <Input label="Email" type="email" placeholder="name@example.com" />
              <Input label="Password" type="password" placeholder="••••••••" />
              <Button variant="primary" size="md" className="w-full" onClick={onSubmit}>
                Sign in
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export interface Journey {
  journey_id: number;
  feed_unique_id: string;
  origin_company_display: string;
  origin_display: string;
  origin_state: string;
  destination_company_display: string;
  destination_display: string;
  destination_state: string;
  sla_status: 'on_time' | 'delayed';
  eta_display: string;
  alert_type: 'long_stoppage' | 'route_deviation' | null;
  trip_type_display: string;
  status: string;
  vehicle_id: string;
  transporter: string;
  sim_number: string;
  tracking_type: string;
  current_status: string;
  current_location: string;
}

const DEFAULT_JOURNEYS: Journey[] = [
  {
    journey_id: 1,
    feed_unique_id: 'PB 09 HH6439',
    origin_company_display: 'MDC Labs,\nAmritsar',
    origin_display: 'Amritsar',
    origin_state: 'Punjab',
    destination_company_display: 'Tata Motors,\nPune',
    destination_display: 'Pune',
    destination_state: 'Maharashtra',
    sla_status: 'on_time',
    eta_display: '15 Sep, 2024',
    alert_type: 'long_stoppage',
    trip_type_display: 'Outbound - Source',
    status: 'in-transit',
    vehicle_id: 'PB09 HH 6439',
    transporter: 'Yonex Transporter',
    sim_number: '84973-47593',
    tracking_type: 'SIM',
    current_status: 'On Road',
    current_location: 'Ambala, Haryana',
  },
  {
    journey_id: 2,
    feed_unique_id: 'KA12 AS 3421',
    origin_company_display: 'MDC Labs,\nAmritsar',
    origin_display: 'Amritsar',
    origin_state: 'Punjab',
    destination_company_display: 'Tata Motors,\nMumbai',
    destination_display: 'Mumbai',
    destination_state: 'Maharashtra',
    sla_status: 'delayed',
    eta_display: '16 Sep, 2024',
    alert_type: 'route_deviation',
    trip_type_display: 'Inbound',
    status: 'in-transit',
    vehicle_id: 'KA12 AS 3421',
    transporter: 'Yonex Transporter',
    sim_number: '84973-47593',
    tracking_type: 'SIM',
    current_status: 'At Drop',
    current_location: 'Mumbai, Maharashtra',
  },
  {
    journey_id: 3,
    feed_unique_id: 'PB 09 CD5678',
    origin_company_display: 'MDC Labs,\nAmritsar',
    origin_display: 'Amritsar',
    origin_state: 'Punjab',
    destination_company_display: 'Tata Motors,\nDelhi',
    destination_display: 'Delhi',
    destination_state: 'Delhi',
    sla_status: 'on_time',
    eta_display: '17 Sep, 2024',
    alert_type: null,
    trip_type_display: 'Outbound - Source',
    status: 'in-transit',
    vehicle_id: 'PB09 CD 5678',
    transporter: 'Yonex Transporter',
    sim_number: '84973-47593',
    tracking_type: 'GPS',
    current_status: 'On Road',
    current_location: 'Delhi, Delhi',
  },
];

const DEFAULT_JOURNEY_FILTERS: QuickFilter[] = [
  { id: 'long-stoppage', label: 'Long Stoppage', count: 19, type: 'alert' },
  { id: 'route-deviation', label: 'Route Deviation', count: 19, type: 'alert' },
  {
    id: 'delayed',
    label: 'Delayed',
    options: [
      { id: '0-6', label: '0-6 hrs', count: 19, type: 'alert' },
      { id: '6-12', label: '6-12 hrs', count: 19, type: 'alert' },
      { id: '12+', label: '12+ hrs', count: 19, type: 'alert' },
    ],
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
  },
];

const JOURNEY_TABS: Tab[] = [
  { label: 'Planned', badge: true, badgeCount: 56 },
  { label: 'En Route to Loading', badge: true, badgeCount: 56 },
  { label: 'At Loading', badge: true, badgeCount: 56 },
  { label: 'In Transit', badge: true, badgeCount: 56 },
  { label: 'At Unloading', badge: true, badgeCount: 56 },
  { label: 'In Return', badge: true, badgeCount: 56 },
  { label: 'Delivered', badge: true, badgeCount: 56 },
];

const JOURNEY_STATUS_MAP: Record<number, string> = {
  0: 'planned',
  1: 'en-route-loading',
  2: 'at-loading',
  3: 'in-transit',
  4: 'at-unloading',
  5: 'in-return',
  6: 'delivered',
};

export interface JourneysBlockProps {
  journeys?: Journey[];
  filters?: QuickFilter[];
  companyOptions?: DropdownOption[];
  directionOptions?: DropdownOption[];
}

export const JourneysBlock: React.FC<JourneysBlockProps> = ({
  journeys = DEFAULT_JOURNEYS,
  filters = DEFAULT_JOURNEY_FILTERS,
  companyOptions = [
    { value: 'mdc-labs', label: 'MDC Labs, Amritsar' },
    { value: 'all', label: 'All Companies' },
  ],
  directionOptions = [
    { value: 'outbound', label: 'Outbound - Source' },
    { value: 'inbound', label: 'Inbound' },
  ],
}) => {
  const [selectedTab, setSelectedTab] = useState(3);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJourneyIds, setSelectedJourneyIds] = useState<number[]>([]);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [dateRangeStart, setDateRangeStart] = useState<string>('2024-08-12');
  const [dateRangeEnd, setDateRangeEnd] = useState<string>('2024-09-12');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredByTab = useMemo(() => {
    const status = JOURNEY_STATUS_MAP[selectedTab];
    if (selectedTab === 3) return journeys;
    if (!status) return journeys;
    return journeys.filter((journey) => journey.status === status);
  }, [journeys, selectedTab]);

  const filteredJourneys = useMemo(() => {
    if (activeFilters.size === 0 && !searchTerm) return filteredByTab;
    return filteredByTab.filter((journey) => {
      const matchesFilter = activeFilters.size === 0 || Array.from(activeFilters).some((filter) => {
        if (filter === 'stoppage') return journey.alert_type === 'long_stoppage';
        if (filter === 'deviation') return journey.alert_type === 'route_deviation';
        return true;
      });
      const matchesSearch = !searchTerm || journey.feed_unique_id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilters, filteredByTab, searchTerm]);

  const tableColumns = useMemo<TableColumn<Journey & TableRow>[]>(() => [
    {
      key: 'checkbox',
      title: '',
      render: (_: any, journey: Journey) => (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedJourneyIds.includes(journey.journey_id)}
            onChange={(event) => {
              const checked = event.target.checked;
              setSelectedJourneyIds((prev) =>
                checked ? [...prev, journey.journey_id] : prev.filter((id) => id !== journey.journey_id)
              );
            }}
          />
          <Icon name="star" style={{ width: '16px', height: '16px', color: 'var(--secondary)' }} />
        </div>
      ),
    },
    {
      key: 'feed_unique_id',
      title: 'Feed Unique ID',
      render: (_: any, journey: Journey) => (
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-sm truncate text-[var(--primary)]">{journey.feed_unique_id}</span>
          <Button
            variant="link"
            size="xs"
            onClick={(e) => {
              e.preventDefault();
              // Handle click action here
            }}
          >
            View ID's
          </Button>
        </div>
      ),
    },
    {
      key: 'from',
      title: 'From',
      render: (_: any, journey: Journey) => (
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-sm font-medium truncate text-[var(--primary)]">
              {journey.origin_display}, {journey.origin_state}
            </span>
            <Badge variant="normal" className="text-xs px-1 py-0 h-5 flex-shrink-0">
              +1P
            </Badge>
          </div>
          <span className="text-xs" style={{ color: 'var(--secondary)' }}>
            {journey.origin_company_display.split(',')[0]}
          </span>
        </div>
      ),
    },
    {
      key: 'to',
      title: 'To',
      render: (_: any, journey: Journey) => (
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-sm font-medium truncate text-[var(--primary)]">
              {journey.destination_display}, {journey.destination_state.substring(0, 4)}...
            </span>
            <Badge variant="normal" className="text-xs px-1 py-0 h-5 flex-shrink-0">
              +3D
            </Badge>
          </div>
          <span className="text-xs" style={{ color: 'var(--secondary)' }}>
            {journey.destination_company_display.split(',')[0].substring(0, 20)}...
          </span>
        </div>
      ),
    },
    {
      key: 'vehicle_info',
      title: 'Vehicle Info',
      render: (_: any, journey: Journey) => (
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-sm font-medium truncate text-[var(--primary)]">{journey.vehicle_id}</span>
            <Icon name={"help-circle" as any} style={{ width: '14px', height: '14px' }} className="flex-shrink-0" />
          </div>
          <span className="text-xs" style={{ color: 'var(--secondary)' }}>
            {journey.transporter} &gt;
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (_: any, journey: Journey) => (
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <Icon
              name="truck"
              style={{
                width: '16px',
                height: '16px',
                color: journey.sla_status === 'delayed' ? 'var(--critical)' : 'var(--primary)',
              }}
              className="flex-shrink-0"
            />
            <span className="text-sm font-medium truncate text-[var(--primary)]">{journey.current_status}</span>
          </div>
          <span className="text-xs" style={{ color: 'var(--secondary)' }}>
            {journey.current_location}
          </span>
        </div>
      ),
    },
    {
      key: 'sla',
      title: 'SLA',
      render: (_: any, journey: Journey) => (
        <div className="flex flex-col gap-1 min-w-0">
          <Badge variant={journey.sla_status === 'on_time' ? 'success' : 'danger'} className="w-fit">
            {journey.sla_status === 'on_time' ? 'On time' : 'Delayed by 13 hr'}
          </Badge>
          <span className="text-xs" style={{ color: 'var(--secondary)' }}>
            ETA: {journey.eta_display}
          </span>
        </div>
      ),
    },
    {
      key: 'alerts',
      title: 'Alerts',
      render: (_: any, journey: Journey) => (
        journey.alert_type ? (
          <div className="flex flex-col gap-1">
            <Badge variant="danger" className="text-xs w-fit">
              {journey.alert_type === 'long_stoppage' ? 'Long Stoppage' : 'Route Deviation'}
            </Badge>
            <span className="text-xs" style={{ color: 'var(--secondary)' }}>
              1 hour ago
            </span>
          </div>
        ) : (
          <span className="text-xs" style={{ color: 'var(--secondary)' }}>-</span>
        )
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: () => (
        <div className="flex items-center gap-2">
          <Button variant="text" icon="more" iconPosition="only" size="md" />
          <Button variant="secondary" icon="chevron-right" iconPosition="only" size="md" />
        </div>
      ),
    },
  ], [selectedJourneyIds]);

  const tableData = filteredJourneys.map((journey) => ({ ...journey, id: journey.journey_id }));

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <AppHeader user={DEFAULT_DASHBOARD_USER} />

      <div style={{ backgroundColor: 'var(--bg-primary)', padding: isMobile ? '12px' : '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--x2,8px)' }}>
            <Icon name="navigator" style={{ width: '28px', height: '28px', color: 'var(--primary)' }} />
            <Typography variant="body-primary-medium" className="text-[var(--primary)] text-2xl">
              My Journeys
            </Typography>
          </div>
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--x4,16px)' }}>
              <Dropdown options={companyOptions} placeholder="Select company" />
              <DatePicker
                range
                startValue={dateRangeStart}
                endValue={dateRangeEnd}
                onStartChange={(value) => setDateRangeStart(value)}
                onEndChange={(value) => setDateRangeEnd(value)}
                placeholder="12 Aug, 2024 → 12 Sep 2024"
              />
              <Dropdown options={directionOptions} placeholder="Direction" />
              <Input
                placeholder="Search My Journeys"
                leadingIcon="search"
                value={searchTerm}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                style={{ width: '280px' }}
              />
              <Button variant="primary" icon="add" size="md">
                Add Journey
              </Button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 'var(--x4,16px)', alignItems: 'center', flexWrap: 'nowrap', marginBottom: '20px', overflowX: 'auto', overflowY: 'hidden' }}>
          <div style={{ flexShrink: 0 }}>
            <Tabs tabs={JOURNEY_TABS} activeTab={selectedTab} onTabChange={setSelectedTab} className="!w-auto" />
          </div>
          {!isMobile && (
            <div style={{ flexShrink: 0 }}>
              <SegmentedTabs
                variant="icon-only"
                items={[
                  { value: 'list', icon: <Icon name="hamburger-menu" style={{ width: '16px', height: '16px' }} /> },
                  { value: 'map', icon: <Icon name="map" style={{ width: '16px', height: '16px' }} /> },
                ]}
                value={viewMode}
                onChange={(value: string) => setViewMode(value as 'list' | 'map')}
              />
            </div>
          )}
        </div>

        {!isMobile && (
          <div className="w-full overflow-hidden">
            <QuickFilters
              scrollable={true}
              filters={filters.map((filter) => {
                if (filter.options && filter.options.length > 0) {
                  // Multi-option filter - check if any option is selected
                  const selectedOption = filter.options.find(opt => {
                    const key = `${filter.id}:${opt.id}`;
                    return activeFilters.has(key);
                  });
                  return {
                    ...filter,
                    selectedOption: selectedOption?.id,
                  };
                } else {
                  // Single filter - check if selected
                  return {
                    ...filter,
                    selected: activeFilters.has(filter.id),
                  };
                }
              })}
              onFilterClick={(filterId: string, optionId?: string) => {
                const key = optionId ? `${filterId}:${optionId}` : filterId;
                setActiveFilters((prev) => {
                  const next = new Set(prev);
                  if (next.has(key)) {
                    next.delete(key);
                  } else {
                    next.add(key);
                  }
                  return next;
                });
              }}
              onFilterRemove={(filterId: string, optionId?: string) => {
                const key = optionId ? `${filterId}:${optionId}` : filterId;
                setActiveFilters((prev) => {
                  const next = new Set(prev);
                  next.delete(key);
                  return next;
                });
              }}
            />
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
          {!isMobile ? (
            <div className="journeys-table-wrapper" style={{ border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <Table columns={tableColumns} data={tableData} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredJourneys.map((journey) => (
                <Card key={journey.journey_id}>
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Typography variant="body-primary-medium" className="text-[var(--primary)]">
                      {journey.feed_unique_id}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <Typography variant="body-secondary-medium" className="text-[var(--secondary)]">
                          {journey.origin_company_display}
                        </Typography>
                        <Typography variant="body-primary-medium" className="text-[var(--primary)]">
                          {journey.origin_display}
                        </Typography>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'right' }}>
                        <Typography variant="body-secondary-medium" className="text-[var(--secondary)]">
                          {journey.destination_company_display}
                        </Typography>
                        <Typography variant="body-primary-medium" className="text-[var(--primary)]">
                          {journey.destination_display}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Badge variant={journey.sla_status === 'on_time' ? 'success' : 'danger'}>
                        {journey.sla_status === 'on_time' ? 'On time' : 'Delayed'}
                      </Badge>
                      <Button variant="secondary" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {isMobile && (
          <Button
            variant="primary"
            icon="add"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
            }}
          />
        )}
      </div>
    </div>
  );
};
