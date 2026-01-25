"use client";

import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { AppHeader, type User as AppHeaderUser } from '../../organisms/AppHeader';
import { Card } from '../../organisms/Card';
import { Table } from '../../organisms/Table';
import type { TableColumn, TableRowData } from '../../organisms/Table';
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
import type { IconName } from '../../atoms/Icons';
import { PercentageOfChargeInput } from '../../molecules/PercentageOfChargeInput';
import ReactDOM from 'react-dom';

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
    <div className={cn("flex flex-col gap-6", className)}>
      <AppHeader user={user} />

      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <div className="p-4 flex flex-col gap-1.5">
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
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
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
    <div className="flex flex-col gap-5">
      <AppHeader user={user} />

      <div className="flex items-center justify-between">
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
    <div className="flex justify-center p-6">
      <div className="flex flex-col gap-5 w-full max-w-[360px]">
        <div className="flex items-center gap-2 justify-center">
          <div className="w-6 h-6 rounded-lg bg-[var(--primary)] text-[var(--bg-primary)] flex items-center justify-center font-semibold">
            FT
          </div>
          <Typography variant="body-primary-medium" className="text-[var(--primary)]">
            FT Design System
          </Typography>
        </div>
        <Card>
          <div className="p-5 flex flex-col gap-4">
            <div>
              <Typography variant="body-primary-medium" className="text-[var(--primary)] text-2xl">
                Welcome back
              </Typography>
              <Typography variant="body-secondary-regular" className="text-[var(--secondary)] text-sm">
                Enter your credentials to access your account
              </Typography>
            </div>
            <div className="flex flex-col gap-4">
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

type CompactFilterType = 'company' | 'dates' | 'direction' | 'search';

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
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1920));
  const [activeCompactFilter, setActiveCompactFilter] = useState<CompactFilterType | null>(null);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth <= 800;
  const isCompactHeader = viewportWidth < 1440;

  useEffect(() => {
    if (!isCompactHeader) {
      setActiveCompactFilter(null);
    }
  }, [isCompactHeader]);

  const toggleCompactFilter = (filter: CompactFilterType) => {
    setActiveCompactFilter((previous) => (previous === filter ? null : filter));
  };

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

  const tableColumns = useMemo<TableColumn<Journey & TableRowData>[]>(() => [
    {
      key: 'checkbox',
      title: '',
      render: (_: unknown, journey: Journey) => (
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
      render: (_: unknown, journey: Journey) => (
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
            View IDs
          </Button>
        </div>
      ),
    },
    {
      key: 'from',
      title: 'From',
      render: (_: unknown, journey: Journey) => (
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
      render: (_: unknown, journey: Journey) => (
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
      render: (_: unknown, journey: Journey) => (
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
      render: (_: unknown, journey: Journey) => (
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
      render: (_: unknown, journey: Journey) => (
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
      render: (_: unknown, journey: Journey) => (
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
          <Button variant="secondary" size="md" className="rounded-full" icon="more" iconPosition="only" />
          <Button variant="secondary" size="md" className="rounded-full" icon="chevron-right" iconPosition="only" />
        </div>
      ),
    },
  ], [selectedJourneyIds]);

  const tableData = filteredJourneys.map((journey) => ({ ...journey, id: journey.journey_id }));

  const compactFilterConfig: { key: CompactFilterType; icon: IconName; label: string }[] = [
    { key: 'company', icon: 'organisation', label: 'Select company' },
    { key: 'dates', icon: 'calendar', label: 'Select date range' },
    { key: 'direction', icon: 'outbound', label: 'Select direction' },
    { key: 'search', icon: 'search', label: 'Search My Journeys' },
  ];

  const renderCompactFilterContent = () => {
    switch (activeCompactFilter) {
      case 'company':
        return (
          <Dropdown
            options={companyOptions}
            placeholder="Select company"
          />
        );
      case 'dates':
        return (
          <DatePicker
            range
            startValue={dateRangeStart}
            endValue={dateRangeEnd}
            onStartChange={(value) => setDateRangeStart(value)}
            onEndChange={(value) => setDateRangeEnd(value)}
            placeholder="12 Aug, 2024 → 12 Sep 2024"
          />
        );
      case 'direction':
        return (
          <Dropdown
            options={directionOptions}
            placeholder="Direction"
          />
        );
      case 'search':
        return (
          <Input
            placeholder="Search My Journeys"
            leadingIcon="search"
            value={searchTerm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
            style={{ width: '100%' }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[var(--bg-secondary)] w-full rounded-[var(--radius-lg)] overflow-hidden">
      <AppHeader user={DEFAULT_DASHBOARD_USER} />

      <div className={cn("bg-[var(--bg-primary)]", isMobile ? "p-3" : "p-5")}>
        <div className="flex justify-between items-center pb-5 gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Icon name="my-trip" className="w-7 h-7 text-[var(--primary)]" />
            <Typography variant="body-primary-medium" className="text-[var(--primary)] text-2xl">
              My Journeys
            </Typography>
          </div>
          {!isMobile && (
            <div className="flex flex-col items-end gap-2 flex-1">
              {isCompactHeader ? (
                <>
                  <div className="flex items-center gap-3 flex-wrap justify-end">
                    <div className="flex items-center gap-2 flex-wrap">
                      {compactFilterConfig.map(({ key, icon, label }) => (
                        <Button
                          key={key}
                          variant={activeCompactFilter === key ? 'primary' : 'secondary'}
                          size="md"
                          icon={icon}
                          iconPosition="only"
                          onClick={() => toggleCompactFilter(key)}
                          aria-label={label}
                          aria-pressed={activeCompactFilter === key}
                          className="rounded-[8px]"
                        />
                      ))}
                    </div>
                    <Button
                      variant="primary"
                      size="md"
                      icon="add"
                      iconPosition="leading"
                      className="rounded-[8px]"
                    >
                      Add Journey
                    </Button>
                  </div>
                  {activeCompactFilter && (
                    <div className="w-full max-w-[360px] mt-2">
                      {renderCompactFilterContent()}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-4">
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
                    className="w-[280px]"
                  />
                  <Button variant="primary" icon="add" size="md">
                    Add Journey
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-4 items-center flex-nowrap mb-5 overflow-hidden">
          <div className="flex-1 min-w-0">
            <Tabs
              tabs={JOURNEY_TABS}
              activeTab={selectedTab}
              onTabChange={setSelectedTab}
              overflowBehavior="dropdown"
            />
          </div>
          {!isMobile && (
            <div className="shrink-0">
              <SegmentedTabs
                variant="icon-only"
                items={[
                  { value: 'list', label: 'List view', icon: <Icon name="hamburger-menu" className="w-4 h-4" /> },
                  { value: 'map', label: 'Map view', icon: <Icon name="map" className="w-4 h-4" /> },
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

        {/* Journey count and action buttons line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--x3,12px)' }}>
            <Typography variant="body-primary-semibold" className="text-[var(--primary)]">
              {filteredJourneys.length} Journeys available
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <Button variant="text" size="md" icon="star" iconPosition="only" />
            <Button variant="text" size="md" icon="bundle" iconPosition="only" />
            <Button variant="text" size="md" icon="chevron-down" iconPosition="only" />
            <Button variant="text" size="md" icon="more" iconPosition="only" />
            <Button variant="text" size="md" icon="add" iconPosition="only" />
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--x2,8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '40px',
              width: '100px',
              padding: '0 var(--x3,12px)'
            }}>
              <Button variant="text" size="sm" icon="chevron-left" iconPosition="only" style={{ width: '16px', height: '16px', padding: 0 }} />
              <Typography variant="body-primary-regular" className="text-[var(--tertiary)]" style={{ fontSize: 'var(--font-size-md-rem)' }}>
                {/* 16px → 1.143rem (responsive) */}
                1
              </Typography>
              <Button variant="text" size="sm" icon="chevron-right" iconPosition="only" style={{ width: '16px', height: '16px', padding: 0 }} />
            </div>
          </div>
        </div>

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

// Formula Builder Block - Types and Constants
type FormulaState = 'empty' | 'formula-input' | 'with-conditions';

type FormulaTokenKind = 'value' | 'operator';

type TokenType = 'value' | 'operator' | 'functionStart' | 'functionEnd' | 'comma' | 'parenOpen' | 'parenClose';

interface FormulaToken {
  id: string;
  kind: FormulaTokenKind;
  label: string;
  expressionValue: string; // Actual value for formula generation (e.g., "*" instead of "×")
  tokenType: TokenType; // Type for expression parsing
  valueType?: 'charge' | 'dimension' | 'percentage' | 'constant' | 'function' | 'operator';
  meta?: {
    percentageValue?: string;
    percentageTarget?: string;
    functionType?: 'wrapper' | 'aggregator';
    functionName?: string;
  };
}

interface ConditionRow {
  id: string;
  logicalOperator?: string;
  variable: string;
  operator: string;
  value: string;
  valueTo?: string;
}

interface FormulaData {
  tokens: FormulaToken[];
  expression: string;
}

interface ConditionBlockData {
  id: string;
  type: 'if' | 'else-if';
  conditions: ConditionRow[];
}

interface ElseBlockData {
  value: string;
}

const VALUE_PICKER_CATEGORIES = [
  { id: 'charges', label: 'Charges' },
  { id: 'percentage-of-charge', label: 'Percentage of Value' },
  { id: 'dimensions', label: 'Dimensions' },
  { id: 'percentage-of-dimensions', label: 'Percentage of Dimensions' },
  { id: 'constant', label: 'Constant' },
  { id: 'functions', label: 'Functions' },
];

const CHARGE_OPTIONS = [
  { value: 'base-freight', label: 'Base freight' },
  { value: 'fuel-surcharge', label: 'Fuel surcharge' },
  { value: 'freight-on-value', label: 'Freight on value' },
  { value: 'oda', label: 'ODA' },
  { value: 'computed-freight', label: 'Computed freight' },
  { value: 'expected-freight', label: 'Expected freight' },
];

const DIMENSION_OPTIONS = [
  { value: 'weight', label: 'Weight' },
  { value: 'volume', label: 'Volume' },
  { value: 'invoice-value', label: 'Invoice value' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'origin', label: 'Origin' },
  { value: 'destination', label: 'Destination' },
  { value: 'mode', label: 'Mode' },
  { value: 'service-level', label: 'Service level' },
];

const NUMERIC_DIMENSIONS = [
  { value: 'weight', label: 'Weight' },
  { value: 'volume', label: 'Volume' },
  { value: 'invoice-value', label: 'Invoice value' },
  { value: 'quantity', label: 'Quantity' },
];

// Wrapper functions (1-arg): wrap previous value token
const WRAPPER_FUNCTIONS = [
  { value: 'ABS', label: 'ABS( )' },
  { value: 'CEIL', label: 'CEIL( )' },
  { value: 'FLOOR', label: 'FLOOR( )' },
];

// Aggregator functions (multi-arg): need argument builder UI
const AGGREGATOR_FUNCTIONS = [
  { value: 'MAX', label: 'MAX( , )' },
  { value: 'MIN', label: 'MIN( , )' },
];

// Combined for display in value picker
const FUNCTION_OPTIONS = [...WRAPPER_FUNCTIONS, ...AGGREGATOR_FUNCTIONS];

// Variable options for condition dropdowns
const CONDITION_VARIABLES = [
  { value: 'invoice-value', label: 'Invoice value' },
  { value: 'weight', label: 'Weight' },
  { value: 'volume', label: 'Volume' },
  { value: 'distance', label: 'Distance' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'base-freight', label: 'Base freight' },
  { value: 'fuel-surcharge', label: 'Fuel surcharge' },
  { value: 'computed-freight', label: 'Computed freight' },
  { value: 'expected-freight', label: 'Expected freight' },
];

// Operators
const MATH_OPERATORS = ['(', ')', '+', '-', '×', '÷'];
const CONDITION_OPERATORS = [
  { value: '>', label: '>' },
  { value: '<', label: '<' },
  { value: '>=', label: '≥' },
  { value: '<=', label: '≤' },
  { value: '=', label: '=' },
  { value: '!=', label: '≠' },
  { value: 'between', label: 'BETWEEN' },
  { value: 'in', label: 'IN' },
  { value: 'not-in', label: 'NOT IN' },
];

const LOGICAL_OPERATORS = [
  { value: 'And', label: 'And' },
  { value: 'Or', label: 'Or' },
  { value: 'Not', label: 'NOT' },
];

export interface FormulaBuilderBlockProps {
  /** Dynamic label from parent (e.g., "Freight on value", "FOV", etc.) */
  label?: string;
  /** Initial formula data */
  initialData?: {
    formula?: FormulaData;
    conditions?: ConditionBlockData[];
    elseBlock?: ElseBlockData;
  };
  /** Callback when formula is saved */
  onSave?: (data: {
    formula: FormulaData;
    conditions: ConditionBlockData[];
    elseBlock: ElseBlockData;
  }) => void;
  /** Callback when formula is validated */
  onValidate?: (data: {
    formula: FormulaData;
    conditions: ConditionBlockData[];
    elseBlock: ElseBlockData;
  }) => boolean;
  /** Callback when formula is reset */
  onReset?: () => void;
  /** Additional class name */
  className?: string;
}

export const FormulaBuilderBlock: React.FC<FormulaBuilderBlockProps> = ({
  label = 'FOV',
  initialData,
  onSave,
  onValidate,
  onReset,
  className,
}) => {
  // Component state
  const [state, setState] = useState<FormulaState>(
    initialData?.formula?.tokens?.length ? 'formula-input' : 'empty'
  );
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [_isValid, setIsValid] = useState<boolean | null>(null);

  // Formula data - will be migrated in useEffect after getTokenExpressionData is defined
  const [formulaTokens, setFormulaTokens] = useState<FormulaToken[]>(
    initialData?.formula?.tokens || []
  );
  // Generate proper formula expression from tokens
  const generateExpression = useCallback((tokens: FormulaToken[]): string => {
    if (tokens.length === 0) return '';
    
    const parts: string[] = [];
    let inFunction = false;
    
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const prevToken = i > 0 ? tokens[i - 1] : null;
      
      switch (token.tokenType) {
        case 'functionStart':
          inFunction = true;
          parts.push(token.expressionValue);
          break;
          
        case 'functionEnd':
          inFunction = false;
          parts.push(token.expressionValue);
          break;
          
        case 'comma':
          if (inFunction) {
            parts.push(token.expressionValue);
          }
          break;
          
        case 'parenOpen':
          parts.push(token.expressionValue);
          break;
          
        case 'parenClose':
          parts.push(token.expressionValue);
          break;
          
        case 'operator':
          // Add space before operator if previous wasn't opening paren
          if (prevToken && prevToken.tokenType !== 'parenOpen' && prevToken.tokenType !== 'functionStart') {
            parts.push(' ');
          }
          parts.push(token.expressionValue);
          // Add space after operator if next isn't closing paren
          const nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;
          if (nextToken && nextToken.tokenType !== 'parenClose' && nextToken.tokenType !== 'functionEnd') {
            parts.push(' ');
          }
          break;
          
        case 'value':
          // Add space before value if previous wasn't opening paren or function start
          if (prevToken && 
              prevToken.tokenType !== 'parenOpen' && 
              prevToken.tokenType !== 'functionStart' &&
              prevToken.tokenType !== 'comma' &&
              prevToken.tokenType !== 'operator') {
            parts.push(' ');
          }
          parts.push(token.expressionValue);
          break;
      }
    }
    
    return parts.join('');
  }, []);

  const formulaExpression = useMemo(
    () => generateExpression(formulaTokens),
    [formulaTokens, generateExpression]
  );
  
  // Conditions (only used when state is 'with-conditions')
  const [conditions, setConditions] = useState<ConditionBlockData[]>(
    initialData?.conditions || []
  );
  const [elseBlock, setElseBlock] = useState<ElseBlockData>(
    initialData?.elseBlock || { value: '0' }
  );

  // Picker state machine
  type PickerMode = 
    | 'none'
    | 'valueCategory'      // Level 1: Categories
    | 'valueOptions'       // Level 2: Specific options
    | 'valueInline'        // Inline input (percentage, constant)
    | 'operator'
    | 'condition'
    | 'tokenEdit';

  const [pickerMode, setPickerMode] = useState<PickerMode>('none');
  const [activeValueCategory, setActiveValueCategory] = useState<string | null>(null);
  const [selectedVariableType, setSelectedVariableType] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  
  // Separate position states for each picker type
  const [pickerPositions, setPickerPositions] = useState<{
    valueCategory?: { top: number; left: number }
    valueOptions?: { top: number; left: number }
    operator?: { top: number; left: number }
    condition?: { top: number; left: number }
    tokenEdit?: { top: number; left: number }
  }>({});

  // Percentage and constant values
  const [percentageOfChargeValue, setPercentageOfChargeValue] = useState('0');
  const [percentageOfChargeTarget, setPercentageOfChargeTarget] = useState<string>('');
  const [percentageOfDimensionValue, setPercentageOfDimensionValue] = useState('0');
  const [percentageOfDimensionTarget, setPercentageOfDimensionTarget] = useState<string>('');
  const [constantValue, setConstantValue] = useState('50');
  
  // Condition dropdown state
  const [activeConditionDropdown, setActiveConditionDropdown] = useState<{
    blockId: string;
    conditionId: string;
    type: 'variable' | 'operator' | 'logical';
  } | null>(null);
  const [conditionValueTarget, setConditionValueTarget] = useState<{
    blockId: string;
    conditionId: string;
  } | null>(null);
  const [editingTokenId, setEditingTokenId] = useState<string | null>(null);
  // State for editing specific token types
  const [editingPercentageValue, setEditingPercentageValue] = useState('');
  const [editingPercentageTarget, setEditingPercentageTarget] = useState('');
  const [editingConstantValue, setEditingConstantValue] = useState('');

  // Helper functions to set picker mode and position
  const setPickerModeAndPosition = useCallback((
    mode: PickerMode,
    position?: { top: number; left: number }
  ) => {
    setPickerMode(mode);
    if (position) {
      setPickerPositions(prev => ({
        ...prev,
        [mode === 'valueCategory' ? 'valueCategory' :
         mode === 'valueOptions' ? 'valueOptions' :
         mode === 'operator' ? 'operator' :
         mode === 'condition' ? 'condition' :
         mode === 'tokenEdit' ? 'tokenEdit' : 'valueCategory']: position
      }));
    }
  }, []);

  const closePicker = useCallback(() => {
    setPickerMode('none');
    setActiveValueCategory(null);
    setSelectedVariableType(null);
    setActiveSubDropdown(null);
  }, []);

  // Refs
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);
  const [popoverRef, setPopoverRef] = useState<HTMLDivElement | null>(null);
  const [tokenDropdownRef, setTokenDropdownRef] = useState<HTMLDivElement | null>(null);
  const [subDropdownRef, setSubDropdownRef] = useState<HTMLDivElement | null>(null);
  const variableTypeDropdownRef = useRef<HTMLDivElement>(null);
  const specificOptionsDropdownRef = useRef<HTMLDivElement>(null);
  const specificOptionsPlaceholderRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  // Initialize portal container
  useEffect(() => {
    const container = document.createElement('div');
    container.id = 'formula-builder-portal';
    document.body.appendChild(container);
    setPortalContainer(container);
    return () => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, []);

  // Migrate old tokens to new format (add expressionValue and tokenType if missing)
  useEffect(() => {
    if (formulaTokens.length === 0) return;
    
    const needsMigration = formulaTokens.some((token: any) => {
      const hasExpressionValue = 'expressionValue' in token;
      const hasTokenType = 'tokenType' in token;
      return !hasExpressionValue || !hasTokenType;
    });
    
    if (needsMigration) {
      const migratedTokens: FormulaToken[] = formulaTokens.map((token: any) => {
        const hasExpressionValue = 'expressionValue' in token;
        const hasTokenType = 'tokenType' in token;
        
        if (hasExpressionValue && hasTokenType) {
          return token as FormulaToken;
        }
        
        const { expressionValue, tokenType } = getTokenExpressionData(
          token.label || '', 
          token.valueType, 
          token.meta
        );
        
        return {
          id: token.id || `token-${Date.now()}`,
          kind: token.kind || 'value',
          label: token.label || '',
          expressionValue,
          tokenType,
          valueType: token.valueType,
          meta: token.meta,
        };
      });
      setFormulaTokens(migratedTokens);
    }
  }, []); // Only run once on mount

  // Computed values for backward compatibility (derived from pickerMode)
  const _showValuePicker = pickerMode === 'valueCategory' || pickerMode === 'valueOptions';
  const _showOperatorPicker = pickerMode === 'operator';
  const _showVariableTypeDropdown = pickerMode === 'valueCategory';
  const showSpecificOptionsDropdown = pickerMode === 'valueOptions';
  const showInlinePercentageOfCharge = pickerMode === 'valueInline' && activeValueCategory === 'percentage-of-charge';

  // Auto-insert percentage of charge token when both value and charge are selected
  const prevPercentageRef = useRef<string>('');
  useEffect(() => {
    if (
      showInlinePercentageOfCharge &&
      percentageOfChargeValue &&
      percentageOfChargeValue !== '0' &&
      percentageOfChargeTarget
    ) {
      const currentLabel = `${percentageOfChargeValue}% of ${percentageOfChargeTarget}`;
      // Only insert if the combination has changed (avoid re-inserting the same token)
      if (prevPercentageRef.current !== currentLabel) {
        // Use a timeout to debounce value changes (user might still be typing)
        const timeoutId = setTimeout(() => {
          // Check if this exact token was already inserted (avoid duplicates)
          const lastToken = formulaTokens[formulaTokens.length - 1];
          const alreadyExists = lastToken?.label === currentLabel && lastToken?.valueType === 'percentage';
          
          if (!alreadyExists && prevPercentageRef.current !== currentLabel) {
            prevPercentageRef.current = currentLabel;
            const meta = { percentageValue: percentageOfChargeValue, percentageTarget: percentageOfChargeTarget };
            const { expressionValue, tokenType } = getTokenExpressionData(currentLabel, 'percentage', meta);
            setFormulaTokens([
              ...formulaTokens,
              { 
                id: `token-${Date.now()}`, 
                kind: 'value', 
                label: currentLabel,
                expressionValue,
                tokenType,
                valueType: 'percentage',
                meta
              },
            ]);
            setState('formula-input');
            setPickerMode('none');
            setActiveValueCategory(null);
            setSelectedVariableType(null);
            setIsDirty(true);
            // Reset after insertion
            setPercentageOfChargeValue('0');
            setPercentageOfChargeTarget('');
            prevPercentageRef.current = '';
          }
        }, 300); // 300ms debounce for value changes

        return () => clearTimeout(timeoutId);
      }
    } else {
      prevPercentageRef.current = '';
    }
  }, [percentageOfChargeValue, percentageOfChargeTarget, showInlinePercentageOfCharge, formulaTokens]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check value picker dropdowns
      if ((pickerMode === 'valueCategory' || pickerMode === 'valueOptions') && dropdownRef && !dropdownRef.contains(target)) {
        if (addButtonRef.current && !addButtonRef.current.contains(target)) {
          closePicker();
          setConditionValueTarget(null);
        }
      }
      
      // Check operator picker
      if (pickerMode === 'operator' && popoverRef && !popoverRef.contains(target)) {
        closePicker();
      }
      
      // Check condition dropdown
      if (activeConditionDropdown && dropdownRef && !dropdownRef.contains(target)) {
        setActiveConditionDropdown(null);
      }
      
      // Check token edit dropdown
      if (pickerMode === 'tokenEdit' && tokenDropdownRef && !tokenDropdownRef.contains(target)) {
        setEditingTokenId(null);
        setPickerMode('none');
        setPickerPositions(prev => ({ ...prev, tokenEdit: undefined }));
      }
      
      // Check sub dropdown
      if (activeSubDropdown && subDropdownRef && !subDropdownRef.contains(target)) {
        setActiveSubDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [pickerMode, activeConditionDropdown, editingTokenId, activeSubDropdown, dropdownRef, popoverRef, tokenDropdownRef, subDropdownRef, addButtonRef, closePicker]);

  // Helper to get operator label from value
  const getOperatorLabel = useCallback((value: string): string => {
    const operator = CONDITION_OPERATORS.find(op => op.value === value);
    return operator?.label || value;
  }, []);

  // Generate formula display text for header
  const formatConditionValue = useCallback((condition: ConditionRow) => {
    const operator = condition.operator || '>';
    if (operator === 'between') {
      return `${condition.value || '…'} AND ${condition.valueTo || '…'}`;
    }
    if (operator === 'in' || operator === 'not-in') {
      return `(${condition.value || '…'})`;
    }
    return condition.value || '…';
  }, []);

  const getFormulaDisplayText = useCallback(() => {
    if (state === 'empty') {
      return `${label} =`;
    }

    const baseExpression = formulaExpression || '…';
    let text = `${label}= ${baseExpression}`;

    if (state === 'with-conditions' && conditions.length > 0) {
      const ifBlock = conditions.find(b => b.type === 'if');
      if (ifBlock && ifBlock.conditions.length > 0) {
        const conditionText = ifBlock.conditions.map((c, i) => {
          const varLabel = CONDITION_VARIABLES.find(v => v.value === c.variable)?.label || c.variable;
          const prefix = i > 0 ? ` ${c.logicalOperator || 'And'} ` : '';
          const operatorLabel = getOperatorLabel(c.operator || '>');
          return `${prefix}${varLabel} ${operatorLabel} ${formatConditionValue(c)}`;
        }).join('');
        text += `, If ${conditionText}`;
      }

      // Else If blocks
      conditions.filter(b => b.type === 'else-if').forEach((block) => {
        if (block.conditions.length > 0) {
          const conditionText = block.conditions.map((c, i) => {
            const varLabel = CONDITION_VARIABLES.find(v => v.value === c.variable)?.label || c.variable;
            const prefix = i > 0 ? ` ${c.logicalOperator || 'And'} ` : '';
            const operatorLabel = getOperatorLabel(c.operator || '>');
            return `${prefix}${varLabel} ${operatorLabel} ${formatConditionValue(c)}`;
          }).join('');
          text += `, Else If ${conditionText}`;
        }
      });

      text += `, Else ${label} = ${elseBlock.value}`;
    }

    return text;
  }, [state, label, formulaExpression, conditions, elseBlock, formatConditionValue, getOperatorLabel]);

  // Helper to determine expected next token type based on context
  const getExpectedNextTokenType = useCallback((tokens: FormulaToken[]): 'value' | 'operator' | 'comma' | 'close' => {
    if (tokens.length === 0) return 'value';
    
    let parenDepth = 0;
    let inFunction = false;
    
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      
      switch (token.tokenType) {
        case 'functionStart':
          inFunction = true;
          break;
        case 'functionEnd':
          inFunction = false;
          break;
        case 'parenOpen':
          parenDepth++;
          break;
        case 'parenClose':
          parenDepth--;
          if (parenDepth === 0) {
            inFunction = false;
          }
          break;
        case 'comma':
          break;
        case 'value':
          break;
      }
    }
    
    const lastToken = tokens[tokens.length - 1];
    
    // If we're inside a function and after a value, expect comma or close
    if (inFunction && parenDepth > 0) {
      if (lastToken.tokenType === 'value') {
        return 'comma'; // Can add more args or close
      }
      if (lastToken.tokenType === 'comma') {
        return 'value'; // Need value after comma
      }
      if (lastToken.tokenType === 'parenOpen' || lastToken.tokenType === 'functionStart') {
        return 'value'; // Need first argument
      }
    }
    
    const lastTokenType = lastToken.tokenType;

    // If last token is closing paren and we're in a function, expect comma or close
    if (lastTokenType === 'parenClose' && inFunction) {
      return 'comma'; // Can add more args
    }

    switch (lastTokenType) {
      case 'parenOpen':
      case 'functionStart':
      case 'comma':
      case 'operator':
        return 'value';
      case 'value':
      case 'parenClose':
      case 'functionEnd':
        return 'operator';
      default:
        return 'value';
    }
  }, []);

  const getNextPicker = useCallback(() => {
    const expected = getExpectedNextTokenType(formulaTokens);
    if (expected === 'operator' || expected === 'close') {
      return 'operator';
    }
    return 'value';
  }, [formulaTokens, getExpectedNextTokenType]);

  const openPickerForNextToken = (buttonElement: HTMLButtonElement) => {
    const rect = buttonElement.getBoundingClientRect();
    setActiveConditionDropdown(null);
    setConditionValueTarget(null);
    const nextPicker = getNextPicker();
    if (nextPicker === 'value') {
      // Show variable type dropdown positioned relative to edit button
      setPickerModeAndPosition('valueCategory', {
        top: rect.bottom + 8,
        left: rect.left,
      });
      setActiveValueCategory(null);
      setSelectedVariableType(null);
    } else {
      setPickerModeAndPosition('operator', {
        top: rect.bottom + 12,
        left: rect.left,
      });
    }
  };

  // Helper to determine expressionValue and tokenType from label and valueType
  const getTokenExpressionData = useCallback((
    label: string,
    valueType?: FormulaToken['valueType'],
    meta?: FormulaToken['meta']
  ): { expressionValue: string; tokenType: TokenType } => {
    // Handle operators
    if (valueType === 'operator') {
      const operatorMap: Record<string, string> = {
        '×': '*',
        '÷': '/',
        '+': '+',
        '-': '-',
        '(': '(',
        ')': ')',
      };
      return {
        expressionValue: operatorMap[label] || label,
        tokenType: label === '(' ? 'parenOpen' : label === ')' ? 'parenClose' : 'operator',
      };
    }
    
    // Handle functions
    if (valueType === 'function') {
      const functionName = label.split('(')[0].trim();
      const isAggregator = AGGREGATOR_FUNCTIONS.some(f => f.value === functionName);
      
      if (isAggregator || meta?.functionType === 'aggregator') {
        // MAX, MIN - these will be handled separately with functionStart/functionEnd
        return {
          expressionValue: functionName,
          tokenType: 'functionStart',
        };
      }
      // Wrapper functions (ABS, CEIL, FLOOR) - handled as values that wrap previous
      return {
        expressionValue: functionName,
        tokenType: 'value',
      };
    }
    
    // Handle percentage tokens
    if (valueType === 'percentage' && meta?.percentageValue && meta?.percentageTarget) {
      return {
        expressionValue: `${meta.percentageValue}% of ${meta.percentageTarget}`,
        tokenType: 'value',
      };
    }
    
    // Default: value token
    return {
      expressionValue: label,
      tokenType: 'value',
    };
  }, []);

  const handleInsertValueToken = (
    label: string,
    valueType?: FormulaToken['valueType'],
    meta?: FormulaToken['meta']
  ) => {
    if (conditionValueTarget) {
      handleUpdateCondition(conditionValueTarget.blockId, conditionValueTarget.conditionId, 'value', label);
      setConditionValueTarget(null);
      closePicker();
      return;
    }
    const { expressionValue, tokenType } = getTokenExpressionData(label, valueType, meta);
    setFormulaTokens([
      ...formulaTokens,
      { 
        id: `token-${Date.now()}`, 
        kind: 'value', 
        label, 
        expressionValue,
        tokenType,
        valueType, 
        meta 
      },
    ]);
    setState('formula-input');
    closePicker();
    setIsDirty(true);
  };

  const handleInsertOperatorToken = (operator: string) => {
    const { expressionValue, tokenType } = getTokenExpressionData(operator, 'operator');
    setFormulaTokens([
      ...formulaTokens,
      { 
        id: `token-${Date.now()}`, 
        kind: 'operator', 
        label: operator, 
        expressionValue,
        tokenType,
        valueType: 'operator' 
      },
    ]);
    closePicker();
    setIsDirty(true);
  };

  // Insert wrapper function (ABS, CEIL, FLOOR) - wraps previous value token
  const handleInsertWrapperFunction = (functionName: string) => {
    if (formulaTokens.length === 0) {
      // No previous token to wrap, just insert as value
      handleInsertValueToken(functionName, 'function', { functionType: 'wrapper', functionName });
      return;
    }

    const lastToken = formulaTokens[formulaTokens.length - 1];
    // Only wrap if last token is a value
    if (lastToken.kind === 'value' && lastToken.tokenType === 'value') {
      // Wrap the previous token: insert opening paren, keep previous token, insert closing paren
      const wrappedTokens: FormulaToken[] = [
        {
          id: `token-${Date.now()}-func`,
          kind: 'value',
          label: functionName,
          expressionValue: functionName,
          tokenType: 'value',
          valueType: 'function',
          meta: { functionType: 'wrapper', functionName },
        },
        {
          id: `token-${Date.now()}-open`,
          kind: 'operator',
          label: '(',
          expressionValue: '(',
          tokenType: 'parenOpen',
          valueType: 'operator',
        },
        lastToken, // Keep the wrapped token
        {
          id: `token-${Date.now()}-close`,
          kind: 'operator',
          label: ')',
          expressionValue: ')',
          tokenType: 'parenClose',
          valueType: 'operator',
        },
      ];
      
      setFormulaTokens([...formulaTokens.slice(0, -1), ...wrappedTokens]);
    } else {
      // Can't wrap, just insert as value
      handleInsertValueToken(functionName, 'function', { functionType: 'wrapper', functionName });
    }
    
    closePicker();
    setIsDirty(true);
  };

  // Insert aggregator function (MAX, MIN) - opens argument builder UI
  const handleInsertAggregatorFunction = (functionName: string) => {
    const functionStartToken: FormulaToken = {
      id: `token-${Date.now()}-func-start`,
      kind: 'value',
      label: `${functionName}( , )`,
      expressionValue: functionName,
      tokenType: 'functionStart',
      valueType: 'function',
      meta: { functionType: 'aggregator', functionName },
    };

    const openParenToken: FormulaToken = {
      id: `token-${Date.now()}-open`,
      kind: 'operator',
      label: '(',
      expressionValue: '(',
      tokenType: 'parenOpen',
      valueType: 'operator',
    };

    setFormulaTokens([...formulaTokens, functionStartToken, openParenToken]);
    
    // Open value picker for first argument - will be opened by user clicking edit button
    setIsDirty(true);
  };

  const handleOpenTokenDropdown = (tokenId: string, buttonElement: HTMLButtonElement) => {
    const rect = buttonElement.getBoundingClientRect();
    const position = {
      top: rect.bottom + 8,
      left: rect.left,
    };
    setPickerModeAndPosition('tokenEdit', position);
    const token = formulaTokens.find(t => t.id === tokenId);
    
    // Initialize editing state based on token type
    if (token?.valueType === 'percentage' && token.meta) {
      setEditingPercentageValue(token.meta.percentageValue || '');
      setEditingPercentageTarget(token.meta.percentageTarget || '');
    } else if (token?.valueType === 'constant') {
      setEditingConstantValue(token.label);
    } else {
      // Reset editing states for other types
      setEditingPercentageValue('');
      setEditingPercentageTarget('');
      setEditingConstantValue('');
    }
    
    setEditingTokenId(tokenId);
  };

  const handleUpdateToken = (tokenId: string, newLabel: string, valueType?: FormulaToken['valueType'], meta?: FormulaToken['meta']) => {
    const { expressionValue, tokenType } = getTokenExpressionData(newLabel, valueType, meta);
    setFormulaTokens(
      formulaTokens.map((token) =>
        token.id === tokenId
          ? { ...token, label: newLabel, expressionValue, tokenType, valueType, meta }
          : token
      )
    );
    setEditingTokenId(null);
    setPickerMode('none');
    setPickerPositions(prev => ({ ...prev, tokenEdit: undefined }));
    setIsDirty(true);
  };

  const handleOperatorPickerSelect = (type: 'operator' | 'if-else', operator?: string) => {
    if (type === 'if-else') {
      setState('with-conditions');
      if (conditions.length === 0) {
        setConditions([
          {
            id: 'if-block',
            type: 'if',
            conditions: [
              { id: `cond-${Date.now()}`, variable: 'invoice-value', operator: '>', value: '10000' },
            ],
          },
        ]);
      }
      setPickerMode('none');
      setPickerPositions(prev => ({ ...prev, operator: undefined }));
      setIsDirty(true);
      return;
    }
    if (operator) {
      handleInsertOperatorToken(operator);
    }
  };

  const handleOpenConditionDropdown = (
    event: React.MouseEvent<HTMLButtonElement>,
    blockId: string,
    conditionId: string,
    type: 'variable' | 'operator' | 'logical'
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPickerPositions(prev => ({
      ...prev,
      condition: {
        top: rect.bottom + 8,
        left: rect.left,
      },
    }));
    setActiveConditionDropdown({ blockId, conditionId, type });
    setConditionValueTarget(null);
    setPickerMode('condition');
  };

  const handleOpenConditionValuePicker = (
    event: React.MouseEvent<HTMLButtonElement>,
    blockId: string,
    conditionId: string
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.bottom + 8,
      left: rect.left,
    };
    setPickerPositions(prev => ({ ...prev, valueCategory: position }));
    setPickerMode('valueCategory');
    setConditionValueTarget({ blockId, conditionId });
    setPickerMode('valueCategory');
    setActiveValueCategory(null);
    setActiveConditionDropdown(null);
  };

  // Add condition to a block
  const handleAddCondition = (blockId: string) => {
    setConditions(conditions.map(block => {
      if (block.id === blockId) {
        const newCondition: ConditionRow = {
          id: `cond-${Date.now()}`,
          logicalOperator: block.conditions.length > 0 ? 'And' : undefined,
          variable: 'invoice-value',
          operator: '>',
          value: '',
        };
        return { ...block, conditions: [...block.conditions, newCondition] };
      }
      return block;
    }));
    setIsDirty(true);
  };

  // Delete condition from a block
  const handleDeleteCondition = (blockId: string, conditionId: string) => {
    setConditions(conditions.map(block => {
      if (block.id === blockId) {
        const newConditions = block.conditions.filter(c => c.id !== conditionId);
        if (newConditions.length > 0 && newConditions[0].logicalOperator) {
          newConditions[0] = { ...newConditions[0], logicalOperator: undefined };
        }
        return { ...block, conditions: newConditions };
      }
      return block;
    }));
    setIsDirty(true);
  };

  // Update condition field
  const handleUpdateCondition = (blockId: string, conditionId: string, field: keyof ConditionRow, value: string) => {
    setConditions(conditions.map(block => {
      if (block.id === blockId) {
        return {
          ...block,
          conditions: block.conditions.map(c => {
            if (c.id !== conditionId) return c;
            if (field === 'operator') {
              // Ensure we store the value, not the label
              const operatorOption = CONDITION_OPERATORS.find(op => op.value === value || op.label === value);
              const nextOperator = operatorOption?.value || value;
              const shouldClearValueTo = nextOperator !== 'between';
              return {
                ...c,
                operator: nextOperator,
                valueTo: shouldClearValueTo ? undefined : c.valueTo,
              };
            }
            return { ...c, [field]: value };
          }),
        };
      }
      return block;
    }));
    setIsDirty(true);
    setActiveConditionDropdown(null);
  };

  // Add Else If block
  const handleAddElseIf = () => {
    const newBlock: ConditionBlockData = {
      id: `else-if-${Date.now()}`,
      type: 'else-if',
      conditions: [],
    };
    setConditions([...conditions, newBlock]);
    setIsDirty(true);
  };

  // Delete block
  const handleDeleteBlock = (blockId: string) => {
    const block = conditions.find(b => b.id === blockId);
    if (block?.type === 'if') return; // Can't delete if block
    setConditions(conditions.filter(b => b.id !== blockId));
    setIsDirty(true);
  };

  // Reset
  const handleReset = () => {
    setState('empty');
    setFormulaTokens([]);
    setConditions([]);
    setElseBlock({ value: '0' });
    setIsDirty(false);
    setIsValid(null);
    setPickerMode('none');
    setPickerPositions({});
    setActiveValueCategory(null);
    setActiveConditionDropdown(null);
    setConditionValueTarget(null);
    // Reset two-step dropdown state
    setSelectedVariableType(null);
    setActiveSubDropdown(null);
    setPercentageOfChargeValue('0');
    setPercentageOfChargeTarget('');
    onReset?.();
  };

  // Validate
  const handleValidate = () => {
    if (onValidate) {
      const result = onValidate({
        formula: { tokens: formulaTokens, expression: formulaExpression },
        conditions,
        elseBlock,
      });
      setIsValid(result);
    } else {
      // Basic validation
      const isFormulaValid = formulaTokens.some((token) => token.kind === 'value');
      if (state === 'with-conditions') {
        const ifBlock = conditions.find(b => b.type === 'if');
        const hasValidConditions = ifBlock && ifBlock.conditions.length > 0 &&
          ifBlock.conditions.every(c => {
            if (!c.variable || !c.operator || !c.value) return false;
            if (c.operator === 'between') {
              return Boolean(c.valueTo);
            }
            return true;
          });
        setIsValid(Boolean(isFormulaValid && hasValidConditions));
      } else {
        setIsValid(Boolean(isFormulaValid));
      }
    }
  };

  // Save
  const handleSave = () => {
    onSave?.({ formula: { tokens: formulaTokens, expression: formulaExpression }, conditions, elseBlock });
    setIsDirty(false);
  };

  // Handler for opening sub-dropdowns
  const handleOpenSubDropdown = (type: string, buttonElement: HTMLButtonElement) => {
    const rect = buttonElement.getBoundingClientRect();
    const position = {
      top: rect.bottom + 4,
      left: rect.left,
    };
    setPickerPositions(prev => ({ ...prev, valueOptions: position }));
    setActiveSubDropdown(type);
    setPickerMode('valueOptions');
  };

  // Render variable type dropdown (Charges, Dimensions, etc.) positioned relative to edit button
  const renderVariableTypeDropdown = () => {
    if (pickerMode !== 'valueCategory' || !pickerPositions.valueCategory) return null;

    return (
      <div
        ref={variableTypeDropdownRef}
        style={{
          position: 'fixed',
          top: pickerPositions.valueCategory.top,
          left: pickerPositions.valueCategory.left,
          zIndex: 10000,
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            minWidth: '200px',
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {VALUE_PICKER_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                // Handle percentage of charge inline
                if (category.id === 'percentage-of-charge') {
                  setPickerMode('valueInline');
                  setActiveValueCategory(category.id);
                  setSelectedVariableType(null);
                } else if (category.id === 'percentage-of-dimensions') {
                  // Keep percentage-of-dimensions in pop-up for now
                  setPickerMode('valueCategory');
                  setActiveValueCategory(category.id);
                  setSelectedVariableType(null);
                } else {
                  setSelectedVariableType(category.id);
                  setPickerMode('valueOptions');
                  // Position will be set by handleOpenSubDropdown
                }
              }}
              style={{
                width: '100%',
                padding: '10px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--primary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render specific options dropdown (charges, dimensions, etc.)
  const renderSpecificOptionsDropdown = () => {
    if (pickerMode !== 'valueOptions' || !selectedVariableType || !pickerPositions.valueOptions) return null;

    const getPlaceholderText = () => {
      switch (selectedVariableType) {
        case 'charges':
          return 'Select charge';
        case 'dimensions':
          return 'Select dimension';
        case 'functions':
          return 'Select function';
        case 'constant':
          return 'Enter constant';
        case 'percentage-of-charge':
          return 'Select percentage of charge';
        case 'percentage-of-dimensions':
          return 'Select percentage of dimension';
        default:
          return 'Select option';
      }
    };

    const getOptions = () => {
      switch (selectedVariableType) {
        case 'charges':
          return CHARGE_OPTIONS;
        case 'dimensions':
          return DIMENSION_OPTIONS;
        case 'functions':
          return FUNCTION_OPTIONS;
        default:
          return [];
      }
    };

    const options = getOptions();

    // Handle special cases
    if (selectedVariableType === 'constant') {
      return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input
            type="text"
            value={constantValue}
            onChange={(e) => setConstantValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && constantValue.trim()) {
                handleInsertValueToken(constantValue.trim(), 'constant');
              }
              if (e.key === 'Escape') {
                setSelectedVariableType(null);
                setPickerMode('none');
                setPickerPositions(prev => ({ ...prev, valueOptions: undefined }));
              }
            }}
            onBlur={() => {
              // Optionally insert on blur if value exists
              if (constantValue.trim()) {
                handleInsertValueToken(constantValue.trim(), 'constant');
              } else {
                setSelectedVariableType(null);
                setPickerMode('none');
                setPickerPositions(prev => ({ ...prev, valueOptions: undefined }));
              }
            }}
            style={{
              height: '32px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-primary)',
              padding: '0 12px',
              fontSize: '14px',
              color: 'var(--primary)',
              minWidth: '150px',
            }}
            placeholder={getPlaceholderText()}
            autoFocus
          />
        </div>
      );
    }

    if (selectedVariableType === 'percentage-of-charge' || selectedVariableType === 'percentage-of-dimensions') {
      // For complex cases, fall back to portal - this will be handled by useEffect
      return null;
    }

    const _dropdownOptions: DropdownOption[] = options.map(opt => ({
      value: opt.value,
      label: opt.label,
    }));

    const _handleDropdownChange = (value: string | number) => {
      const selectedOption = options.find(opt => opt.value === value);
      if (selectedOption) {
        const valueType = selectedVariableType === 'charges' ? 'charge' : 
                         selectedVariableType === 'dimensions' ? 'dimension' : 
                         selectedVariableType === 'functions' ? 'function' : undefined;
        handleInsertValueToken(selectedOption.label, valueType);
        setSelectedVariableType(null);
        setPickerMode('none');
        setPickerPositions(prev => ({ ...prev, valueOptions: undefined }));
      }
    };

    return (
      <div 
        ref={specificOptionsPlaceholderRef} 
        style={{ 
          position: 'fixed',
          top: pickerPositions.valueOptions?.top || 0,
          left: pickerPositions.valueOptions?.left || 0,
          zIndex: 10000,
        }}
      >
        <div
          ref={specificOptionsDropdownRef}
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            padding: '8px 0',
            minWidth: '200px',
            maxHeight: '260px',
            overflowY: 'auto',
          }}
        >
          {options.map((option) => {
            const valueType = selectedVariableType === 'charges' ? 'charge' : 
                             selectedVariableType === 'dimensions' ? 'dimension' : 
                             selectedVariableType === 'functions' ? 'function' : undefined;
            return (
              <button
                key={option.value}
                onClick={() => {
                  if (valueType === 'function') {
                    const functionName = option.label.split('(')[0].trim();
                    const isWrapper = WRAPPER_FUNCTIONS.some(f => f.value === functionName);
                    const isAggregator = AGGREGATOR_FUNCTIONS.some(f => f.value === functionName);
                    
                    if (isWrapper) {
                      handleInsertWrapperFunction(functionName);
                    } else if (isAggregator) {
                      handleInsertAggregatorFunction(functionName);
                    }
                  } else {
                    handleInsertValueToken(option.label, valueType);
                  }
                  closePicker();
                }}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: 'var(--primary)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Note: renderSpecificOptionsListDropdown removed - now using Dropdown component which handles menu rendering internally

  // Render value picker
  const renderValuePicker = () => {
    if (pickerMode !== 'valueCategory' || !portalContainer || !pickerPositions.valueCategory) return null;

    const renderCategoryHeader = (title: string) => (
      <div
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid var(--border-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <button
          onClick={() => {
            setActiveValueCategory(null);
            setActiveSubDropdown(null);
            setPickerPositions(prev => ({ ...prev, valueOptions: undefined }));
          }}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: 'var(--primary)',
          }}
        >
          ←
        </button>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>{title}</span>
      </div>
    );

    const _renderOptionButton = (label: string, onClick: () => void) => (
      <button
        key={label}
        onClick={onClick}
        style={{
          width: '100%',
          padding: '10px 16px',
          border: 'none',
          backgroundColor: 'transparent',
          textAlign: 'left',
          cursor: 'pointer',
          fontSize: '14px',
          color: 'var(--primary)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        {label}
      </button>
    );

    // Render dropdown button with placeholder
    const renderDropdownButton = (
      placeholder: string,
      selectedValue: string | null,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    ) => (
      <button
        onClick={onClick}
        style={{
          width: '100%',
          padding: '10px 16px',
          margin: '8px 16px',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          fontSize: '14px',
          color: selectedValue ? 'var(--primary)' : 'var(--tertiary)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
        }}
      >
        <span>{selectedValue || placeholder}</span>
        <Icon name="chevron-down" size={14} style={{ color: 'var(--secondary)' }} />
      </button>
    );

    // Render sub-dropdown menu
    const renderSubDropdown = (options: Array<{ value: string; label: string }>, onSelect: (label: string) => void) => {
      if (!activeSubDropdown || !pickerPositions.valueOptions || !portalContainer) return null;

      return ReactDOM.createPortal(
        <div
          ref={setSubDropdownRef}
          style={{
            position: 'fixed',
            top: pickerPositions.valueOptions.top,
            left: pickerPositions.valueOptions.left,
            zIndex: 10001,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-md)',
              minWidth: '200px',
              maxHeight: '300px',
              overflowY: 'auto',
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSelect(option.label);
                  setActiveSubDropdown(null);
                  setPickerPositions(prev => ({ ...prev, valueOptions: undefined }));
                  setPickerMode('none');
                }}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: 'var(--primary)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>,
        portalContainer
      );
    };

    const renderCategoryContent = () => {
      if (!activeValueCategory) {
        return (
          <>
            {VALUE_PICKER_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveValueCategory(category.id)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: 'var(--primary)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {category.label}
              </button>
            ))}
          </>
        );
      }

      if (activeValueCategory === 'charges') {
        return (
          <>
            {renderCategoryHeader('Charges')}
            {renderDropdownButton(
              'Select charge',
              null,
              (e) => handleOpenSubDropdown('charges', e.currentTarget)
            )}
            {renderSubDropdown(CHARGE_OPTIONS, (label) => handleInsertValueToken(label, 'charge'))}
          </>
        );
      }

      if (activeValueCategory === 'dimensions') {
        return (
          <>
            {renderCategoryHeader('Dimensions')}
            {renderDropdownButton(
              'Select dimension',
              null,
              (e) => handleOpenSubDropdown('dimensions', e.currentTarget)
            )}
            {renderSubDropdown(DIMENSION_OPTIONS, (label) => handleInsertValueToken(label, 'dimension'))}
          </>
        );
      }

      if (activeValueCategory === 'functions') {
        return (
          <>
            {renderCategoryHeader('Functions')}
            {renderDropdownButton(
              'Select function',
              null,
              (e) => handleOpenSubDropdown('functions', e.currentTarget)
            )}
            {renderSubDropdown(FUNCTION_OPTIONS, (label) => {
              const functionName = label.split('(')[0].trim();
              const isWrapper = WRAPPER_FUNCTIONS.some(f => f.value === functionName);
              const isAggregator = AGGREGATOR_FUNCTIONS.some(f => f.value === functionName);
              
              if (isWrapper) {
                handleInsertWrapperFunction(functionName);
              } else if (isAggregator) {
                handleInsertAggregatorFunction(functionName);
              }
            })}
          </>
        );
      }

      if (activeValueCategory === 'percentage-of-charge') {
        return (
          <>
            {renderCategoryHeader('Percentage of Value')}
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <PercentageOfChargeInput
                value={percentageOfChargeValue}
                selectedCharge={percentageOfChargeTarget || undefined}
                chargeOptions={[...CHARGE_OPTIONS, ...NUMERIC_DIMENSIONS]}
                onValueChange={(val) => setPercentageOfChargeValue(val)}
                onChargeChange={(charge) => setPercentageOfChargeTarget(charge)}
                placeholder="Select charge"
                size="md"
              />
              <button
                onClick={() => {
                  if (percentageOfChargeValue && percentageOfChargeTarget) {
                    handleInsertValueToken(
                      `${percentageOfChargeValue}% of ${percentageOfChargeTarget}`,
                      'percentage',
                      { percentageValue: percentageOfChargeValue, percentageTarget: percentageOfChargeTarget }
                    );
                    // Reset after insertion
                    setPercentageOfChargeValue('0');
                    setPercentageOfChargeTarget('');
                  }
                }}
                disabled={!percentageOfChargeValue || !percentageOfChargeTarget}
                style={{
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: (!percentageOfChargeValue || !percentageOfChargeTarget) 
                    ? 'var(--bg-secondary)' 
                    : 'var(--bg-primary)',
                  fontSize: '14px',
                  color: (!percentageOfChargeValue || !percentageOfChargeTarget) 
                    ? 'var(--tertiary)' 
                    : 'var(--primary)',
                  cursor: (!percentageOfChargeValue || !percentageOfChargeTarget) 
                    ? 'not-allowed' 
                    : 'pointer',
                }}
              >
                Insert
              </button>
            </div>
          </>
        );
      }

      if (activeValueCategory === 'percentage-of-dimensions') {
        return (
          <>
            {renderCategoryHeader('Percentage of Dimensions')}
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                value={percentageOfDimensionValue}
                onChange={(e) => setPercentageOfDimensionValue(e.target.value)}
                style={{
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  padding: '0 10px',
                  fontSize: '14px',
                  color: 'var(--primary)',
                }}
              />
              <select
                value={percentageOfDimensionTarget}
                onChange={(e) => setPercentageOfDimensionTarget(e.target.value)}
                style={{
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  padding: '0 10px',
                  fontSize: '14px',
                  color: 'var(--primary)',
                }}
              >
                {NUMERIC_DIMENSIONS.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  handleInsertValueToken(
                    `${percentageOfDimensionValue}% of ${percentageOfDimensionTarget}`,
                    'percentage',
                    { percentageValue: percentageOfDimensionValue, percentageTarget: percentageOfDimensionTarget }
                  )
                }
                style={{
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-primary)',
                  fontSize: '14px',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                }}
              >
                Insert
              </button>
            </div>
          </>
        );
      }

      if (activeValueCategory === 'constant') {
        return (
          <>
            {renderCategoryHeader('Constant')}
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                value={constantValue}
                onChange={(e) => setConstantValue(e.target.value)}
                style={{
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  padding: '0 10px',
                  fontSize: '14px',
                  color: 'var(--primary)',
                }}
              />
              <button
                onClick={() => handleInsertValueToken(constantValue || '0', 'constant')}
                style={{
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-primary)',
                  fontSize: '14px',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                }}
              >
                Insert
              </button>
            </div>
          </>
        );
      }

      return null;
    };

    return ReactDOM.createPortal(
      <div
        ref={setDropdownRef}
        style={{
          position: 'fixed',
          top: pickerPositions.valueCategory.top,
          left: pickerPositions.valueCategory.left,
          zIndex: 10000,
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            minWidth: '240px',
            maxHeight: '320px',
            overflowY: 'auto',
          }}
        >
          {renderCategoryContent()}
        </div>
      </div>,
      portalContainer
    );
  };

  // Check if we're inside a function (need comma/close options)
  const isInsideFunction = useCallback(() => {
    let parenDepth = 0;
    let inFunction = false;
    
    for (const token of formulaTokens) {
      if (token.tokenType === 'functionStart') {
        inFunction = true;
      }
      if (token.tokenType === 'parenOpen') {
        parenDepth++;
      }
      if (token.tokenType === 'parenClose') {
        parenDepth--;
        if (parenDepth === 0) {
          inFunction = false;
        }
      }
    }
    
    return inFunction && parenDepth > 0;
  }, [formulaTokens]);

  // Render operator picker (operators + conditions)
  const renderOperatorPicker = () => {
    if (pickerMode !== 'operator' || !pickerPositions.operator || !portalContainer) return null;
    
    const insideFunc = isInsideFunction();

    return ReactDOM.createPortal(
      <div
        ref={setPopoverRef}
        style={{
          position: 'fixed',
          top: pickerPositions.operator.top,
          left: pickerPositions.operator.left,
          zIndex: 10000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            minWidth: '280px',
          }}
        >
          {/* Mathematical operators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--tertiary)' }}>
              Mathematical operators
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {MATH_OPERATORS.map((op) => (
                <button
                  key={op}
                  onClick={() => handleOperatorPickerSelect('operator', op)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--bg-primary)',
                    fontSize: '16px',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-primary)')}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          {/* Conditions - only show when not inside function */}
          {!insideFunc && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--tertiary)' }}>
                Conditions
              </span>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleOperatorPickerSelect('if-else')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--bg-primary)',
                    fontSize: '14px',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-primary)')}
                >
                  If Else Condition
                </button>
              </div>
            </div>
          )}
        </div>
      </div>,
      portalContainer
    );
  };

  const renderConditionDropdown = () => {
    if (!activeConditionDropdown || !pickerPositions.condition || !portalContainer) return null;

    const dropdownOptions = (() => {
      if (activeConditionDropdown.type === 'logical') return LOGICAL_OPERATORS;
      if (activeConditionDropdown.type === 'operator') return CONDITION_OPERATORS;
      return CONDITION_VARIABLES;
    })();

    return ReactDOM.createPortal(
      <div
        ref={setDropdownRef}
        style={{
          position: 'fixed',
          top: pickerPositions.condition.top,
          left: pickerPositions.condition.left,
          zIndex: 10000,
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            padding: '8px 0',
            minWidth: '200px',
            maxHeight: '260px',
            overflowY: 'auto',
          }}
        >
          {dropdownOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                const field =
                  activeConditionDropdown.type === 'logical'
                    ? 'logicalOperator'
                    : activeConditionDropdown.type;
                // Always use option.value for operators and variables, label only for display
                const value = option.value;
                handleUpdateCondition(
                  activeConditionDropdown.blockId,
                  activeConditionDropdown.conditionId,
                  field,
                  value
                );
                // Update position when opening condition dropdown
                if (field === 'operator' || field === 'variable') {
                  setPickerPositions(prev => ({ ...prev, condition: pickerPositions.condition }));
                }
              }}
              style={{
                width: '100%',
                padding: '10px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--primary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>,
      portalContainer
    );
  };

  // Render token dropdown for editing value tokens
  const renderTokenDropdown = () => {
    if (pickerMode !== 'tokenEdit' || !editingTokenId || !pickerPositions.tokenEdit || !portalContainer) return null;

    const editingToken = formulaTokens.find(t => t.id === editingTokenId);
    if (!editingToken || editingToken.kind !== 'value') return null;

    // Handle percentage token editing
    if (editingToken.valueType === 'percentage' && editingToken.meta?.percentageValue) {

      return ReactDOM.createPortal(
        <div
          ref={setTokenDropdownRef}
          style={{
            position: 'fixed',
          top: pickerPositions.tokenEdit.top,
          left: pickerPositions.tokenEdit.left,
            zIndex: 10000,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              padding: '12px 16px',
              minWidth: '280px',
            }}
          >
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>
              Edit Percentage
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <PercentageOfChargeInput
                value={editingPercentageValue}
                selectedCharge={editingPercentageTarget || undefined}
                chargeOptions={[...CHARGE_OPTIONS, ...NUMERIC_DIMENSIONS]}
                onValueChange={(val) => setEditingPercentageValue(val)}
                onChargeChange={(charge) => setEditingPercentageTarget(charge)}
                placeholder="Select charge"
                size="md"
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    if (editingPercentageValue && editingPercentageTarget) {
                      const newLabel = `${editingPercentageValue}% of ${editingPercentageTarget}`;
                      const meta = { percentageValue: editingPercentageValue, percentageTarget: editingPercentageTarget };
                      handleUpdateToken(editingTokenId, newLabel, 'percentage', meta);
                      setEditingPercentageValue('');
                      setEditingPercentageTarget('');
                    }
                  }}
                  disabled={!editingPercentageValue || !editingPercentageTarget}
                  style={{
                    flex: 1,
                    height: '32px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-primary)',
                    backgroundColor: (!editingPercentageValue || !editingPercentageTarget) 
                      ? 'var(--bg-secondary)' 
                      : 'var(--bg-primary)',
                    fontSize: '14px',
                    color: (!editingPercentageValue || !editingPercentageTarget) 
                      ? 'var(--tertiary)' 
                      : 'var(--primary)',
                    cursor: (!editingPercentageValue || !editingPercentageTarget) 
                      ? 'not-allowed' 
                      : 'pointer',
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setEditingTokenId(null);
                    setPickerMode('none');
                    setPickerPositions(prev => ({ ...prev, tokenEdit: undefined }));
                    setEditingPercentageValue('');
                    setEditingPercentageTarget('');
                  }}
                  style={{
                    height: '32px',
                    padding: '0 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--bg-primary)',
                    fontSize: '14px',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>,
        portalContainer
      );
    }

    // Handle constant token editing
    if (editingToken.valueType === 'constant') {

      return ReactDOM.createPortal(
        <div
          ref={setTokenDropdownRef}
          style={{
            position: 'fixed',
          top: pickerPositions.tokenEdit.top,
          left: pickerPositions.tokenEdit.left,
            zIndex: 10000,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              padding: '12px 16px',
              minWidth: '200px',
            }}
          >
            <div style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>
              Edit Constant
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                value={editingConstantValue}
                onChange={(e) => setEditingConstantValue(e.target.value)}
                style={{
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  padding: '0 10px',
                  fontSize: '14px',
                  color: 'var(--primary)',
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && editingConstantValue.trim()) {
                    handleUpdateToken(editingTokenId, editingConstantValue.trim(), 'constant');
                    setEditingConstantValue('');
                  }
                  if (e.key === 'Escape') {
                    setEditingTokenId(null);
                    setPickerMode('none');
                    setPickerPositions(prev => ({ ...prev, tokenEdit: undefined }));
                    setEditingConstantValue('');
                  }
                }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    if (editingConstantValue.trim()) {
                      handleUpdateToken(editingTokenId, editingConstantValue.trim(), 'constant');
                      setEditingConstantValue('');
                    }
                  }}
                  disabled={!editingConstantValue.trim()}
                  style={{
                    flex: 1,
                    height: '32px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-primary)',
                    backgroundColor: !editingConstantValue.trim() 
                      ? 'var(--bg-secondary)' 
                      : 'var(--bg-primary)',
                    fontSize: '14px',
                    color: !editingConstantValue.trim() 
                      ? 'var(--tertiary)' 
                      : 'var(--primary)',
                    cursor: !editingConstantValue.trim() 
                      ? 'not-allowed' 
                      : 'pointer',
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setEditingTokenId(null);
                    setPickerMode('none');
                    setPickerPositions(prev => ({ ...prev, tokenEdit: undefined }));
                    setEditingConstantValue('');
                  }}
                  style={{
                    height: '32px',
                    padding: '0 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--bg-primary)',
                    fontSize: '14px',
                    color: 'var(--primary)',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>,
        portalContainer
      );
    }

    const getAllValueOptions = () => {
      const allOptions: Array<{ label: string; valueType?: FormulaToken['valueType']; meta?: FormulaToken['meta'] }> = [];
      
      // Charges
      CHARGE_OPTIONS.forEach(opt => {
        allOptions.push({ label: opt.label, valueType: 'charge' });
      });
      
      // Dimensions
      DIMENSION_OPTIONS.forEach(opt => {
        allOptions.push({ label: opt.label, valueType: 'dimension' });
      });
      
      // Constants
      allOptions.push({ label: 'Constant', valueType: 'constant' });
      
      // Functions - add wrappers and aggregators with proper meta
      WRAPPER_FUNCTIONS.forEach(opt => {
        allOptions.push({ 
          label: opt.label, 
          valueType: 'function',
          meta: { functionType: 'wrapper', functionName: opt.value }
        });
      });
      AGGREGATOR_FUNCTIONS.forEach(opt => {
        allOptions.push({ 
          label: opt.label, 
          valueType: 'function',
          meta: { functionType: 'aggregator', functionName: opt.value }
        });
      });
      
      return allOptions;
    };

    return ReactDOM.createPortal(
      <div
        ref={setTokenDropdownRef}
        style={{
          position: 'fixed',
          top: pickerPositions.tokenEdit.top,
          left: pickerPositions.tokenEdit.left,
          zIndex: 10000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            minWidth: '200px',
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {getAllValueOptions().map((option) => (
            <button
              key={option.label}
              onClick={() => handleUpdateToken(editingTokenId, option.label, option.valueType, option.meta)}
              style={{
                width: '100%',
                padding: '10px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '14px',
                color: 'var(--primary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>,
      portalContainer
    );
  };

  const renderFormulaTokens = () => {
    if (formulaTokens.length === 0) {
      return <span style={{ fontSize: '14px', color: 'var(--tertiary)' }}>Add a value</span>;
    }

    return (
      <>
        {formulaTokens.map((token) => {
          if (token.valueType === 'percentage' && token.meta?.percentageValue) {
            return (
              <div
                key={token.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-primary)',
                }}
              >
                <input
                  type="text"
                  value={token.meta.percentageValue}
                  readOnly
                  style={{
                    width: '56px',
                    height: '34px',
                    border: 'none',
                    padding: '0 10px',
                    fontSize: '14px',
                    color: 'var(--primary)',
                  }}
                />
                <div
                  style={{
                    height: '34px',
                    padding: '0 10px',
                    display: 'flex',
                    alignItems: 'center',
                    borderLeft: '1px solid var(--border-primary)',
                    borderRight: '1px solid var(--border-primary)',
                    fontSize: '14px',
                    color: 'var(--secondary)',
                    backgroundColor: 'var(--bg-secondary)',
                  }}
                >
                  %
                </div>
                <button
                  type="button"
                  style={{
                    height: '34px',
                    padding: '0 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: 'none',
                    backgroundColor: 'var(--bg-primary)',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '14px', color: 'var(--primary)' }}>
                    {token.meta.percentageTarget || 'Invoice value'}
                  </span>
                  <Icon name="chevron-down" size={14} style={{ color: 'var(--secondary)' }} />
                </button>
              </div>
            );
          }

          // Render value tokens as button-like dropdowns matching Figma design
          if (token.kind === 'value') {
            return (
              <button
                key={token.id}
                type="button"
                onClick={(e) => handleOpenTokenDropdown(token.id, e.currentTarget)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '0px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-primary)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: 'var(--primary)',
                  fontWeight: 400,
                  lineHeight: '1.4',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  height: '36px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
                }}
              >
                <span style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 400 }}>{token.label}</span>
                <Icon name="chevron-down" size={14} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
              </button>
            );
          }

          // Render operator tokens as simple badges
          return (
            <span
              key={token.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '6px 10px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-secondary)',
                fontSize: '14px',
                color: 'var(--primary)',
                border: '1px solid var(--border-primary)',
                height: '32px',
                width: '32px',
              }}
            >
              {token.label}
            </span>
          );
        })}
      </>
    );
  };

  // Render condition row
  const renderConditionRow = (block: ConditionBlockData, condition: ConditionRow, index: number) => {
    const isFirstCondition = index === 0;
    const canDelete = block.conditions.length > 1 || block.type !== 'if';
    const operatorValue = condition.operator || '>';
    const operatorLabel = getOperatorLabel(operatorValue);
    const isBetween = operatorValue === 'between';
    const isInList = operatorValue === 'in' || operatorValue === 'not-in';

    return (
      <div
        key={condition.id}
        style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          paddingRight: '8px',
        }}
      >
        {/* Drag Handle */}
        <div
          style={{
            borderRight: '1px solid var(--border-primary)',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'stretch',
            cursor: 'grab',
          }}
        >
          <Icon name="drag" size={16} style={{ color: 'var(--tertiary)' }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', flexWrap: 'wrap' }}>
          {/* Logical Operator */}
          {!isFirstCondition && (
            <button
              onClick={(event) => handleOpenConditionDropdown(event, block.id, condition.id, 'logical')}
              style={{
                minWidth: '70px',
                height: '32px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                padding: '0 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span style={{ fontSize: '14px', color: 'var(--primary)' }}>{condition.logicalOperator || 'And'}</span>
              <Icon name="chevron-down" size={14} style={{ color: 'var(--primary)' }} />
            </button>
          )}

          {/* Variable */}
          <button
            onClick={(event) => handleOpenConditionDropdown(event, block.id, condition.id, 'variable')}
            style={{
              minWidth: '130px',
              height: '32px',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '0 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontSize: '14px', color: 'var(--primary)' }}>
              {CONDITION_VARIABLES.find(v => v.value === condition.variable)?.label || 'Select'}
            </span>
            <Icon name="chevron-down" size={14} style={{ color: 'var(--primary)' }} />
          </button>

          {/* Operator */}
          <button
            onClick={(event) => handleOpenConditionDropdown(event, block.id, condition.id, 'operator')}
            style={{
              minWidth: '50px',
              height: '32px',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '0 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontSize: '14px', color: 'var(--primary)' }}>{operatorLabel}</span>
            <Icon name="chevron-down" size={14} style={{ color: 'var(--primary)' }} />
          </button>

          {/* Value */}
          {isBetween ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                padding: '0 8px',
                height: '32px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <input
                type="text"
                value={condition.value}
                onChange={(e) => handleUpdateCondition(block.id, condition.id, 'value', e.target.value)}
                placeholder="Value 1"
                style={{
                  width: '60px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: 'var(--primary)',
                }}
              />
              <span style={{ fontSize: '12px', color: 'var(--tertiary)' }}>AND</span>
              <input
                type="text"
                value={condition.valueTo || ''}
                onChange={(e) => handleUpdateCondition(block.id, condition.id, 'valueTo', e.target.value)}
                placeholder="Value 2"
                style={{
                  width: '60px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: 'var(--primary)',
                }}
              />
            </div>
          ) : isInList ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                padding: '0 8px',
                height: '32px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <input
                type="text"
                value={condition.value}
                onChange={(e) => handleUpdateCondition(block.id, condition.id, 'value', e.target.value)}
                placeholder="item1, item2"
                style={{
                  width: '140px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: 'var(--primary)',
                }}
              />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <input
                type="text"
                value={condition.value}
                onChange={(e) => handleUpdateCondition(block.id, condition.id, 'value', e.target.value)}
                placeholder="Enter value"
                style={{
                  width: '110px',
                  height: '32px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: 'var(--primary)',
                  padding: '0 8px',
                }}
              />
            </div>
          )}

          {/* Edit button */}
          <button
            onClick={(event) => handleOpenConditionValuePicker(event, block.id, condition.id)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Icon name="edit" size={14} style={{ color: 'var(--primary)' }} />
          </button>
        </div>

        {/* Delete */}
        <button
          onClick={() => canDelete && handleDeleteCondition(block.id, condition.id)}
          style={{
            width: '32px',
            height: '32px',
            background: 'transparent',
            border: 'none',
            cursor: canDelete ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: canDelete ? 1 : 0.4,
          }}
        >
          <Icon name="delete" size={16} style={{ color: 'var(--border-primary)' }} />
        </button>
      </div>
    );
  };

  // Render condition block
  const renderConditionBlock = (block: ConditionBlockData) => {
    const blockLabel = block.type === 'if' ? 'If' : 'Else If';
    const canDelete = block.type === 'else-if';

    return (
      <div
        key={block.id}
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary)' }}>{blockLabel}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => handleAddCondition(block.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Icon name="add" size={16} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--primary)' }}>Add Condition</span>
              </button>
              {canDelete && (
                <button
                  onClick={() => handleDeleteBlock(block.id)}
                  style={{
                    width: '32px',
                    height: '32px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Icon name="delete" size={16} style={{ color: 'var(--critical)' }} />
                </button>
              )}
            </div>
          </div>

          {/* Conditions */}
          {block.conditions.map((condition, index) => renderConditionRow(block, condition, index))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(className)}
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: isCollapsed ? 'none' : '1px solid var(--border-primary)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '200px' }}>
          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '18px', color: 'var(--primary)', fontWeight: 400 }}>{isCollapsed ? '+' : '−'}</span>
          </button>
          {/* Formula Text */}
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--primary)',
              lineHeight: '1.4',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={getFormulaDisplayText()}
          >
            {getFormulaDisplayText()}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Reset Button */}
          <button
            onClick={handleReset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              background: 'transparent',
              border: 'none',
              borderRadius: '1000px',
              cursor: 'pointer',
            }}
          >
            <Icon name="refresh" size={16} style={{ color: 'var(--critical)' }} />
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--critical)' }}>Reset</span>
          </button>
          {/* Validate Button */}
          <button
            onClick={handleValidate}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              background: 'transparent',
              border: 'none',
              borderRadius: '1000px',
              cursor: 'pointer',
            }}
          >
            <Icon name="check" size={16} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--primary)' }}>Validate</span>
          </button>
          {/* Save Charge Button */}
          <button
            onClick={handleSave}
            style={{
              padding: '8px 12px',
              background: 'transparent',
              border: 'none',
              borderRadius: '1000px',
              cursor: isDirty ? 'pointer' : 'default',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 500, color: isDirty ? 'var(--primary)' : 'var(--border-primary)' }}>
              Save Charge
            </span>
          </button>
        </div>
      </div>

      {/* Main Content - Collapsible */}
      {!isCollapsed && (
        <div style={{ padding: '20px' }}>
          {/* EMPTY STATE */}
          {state === 'empty' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--primary)' }}>{label} =</span>
              {selectedVariableType && pickerMode === 'valueOptions' && (
                <>
                  {renderSpecificOptionsDropdown()}
                  <button
                    ref={addButtonRef}
                    onClick={(e) => openPickerForNextToken(e.currentTarget)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      marginLeft: '12px',
                    }}
                  >
                    <Icon name="edit" size={16} style={{ color: 'var(--primary)' }} />
                  </button>
                </>
              )}
              {showInlinePercentageOfCharge && (
                <PercentageOfChargeInput
                  value={percentageOfChargeValue}
                  selectedCharge={percentageOfChargeTarget || undefined}
                  chargeOptions={[...CHARGE_OPTIONS, ...NUMERIC_DIMENSIONS]}
                  onValueChange={(val) => setPercentageOfChargeValue(val)}
                  onChargeChange={(charge) => setPercentageOfChargeTarget(charge)}
                  placeholder="Select charge"
                  size="md"
                />
              )}
              {!showSpecificOptionsDropdown && !showInlinePercentageOfCharge && (
                <button
                  ref={addButtonRef}
                  onClick={(e) => openPickerForNextToken(e.currentTarget)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Icon name="edit" size={16} style={{ color: 'var(--primary)' }} />
                </button>
              )}
            </div>
          )}

          {/* FORMULA INPUT STATE */}
          {state === 'formula-input' && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--primary)', lineHeight: '32px' }}>{label} =</span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {renderFormulaTokens()}

                {selectedVariableType && pickerMode === 'valueOptions' && (
                  <>
                    {renderSpecificOptionsDropdown()}
                    <button
                      onClick={(e) => openPickerForNextToken(e.currentTarget)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        marginLeft: '12px',
                      }}
                    >
                      <Icon name="edit" size={14} style={{ color: 'var(--primary)' }} />
                    </button>
                  </>
                )}
                {showInlinePercentageOfCharge && (
                  <>
                    <PercentageOfChargeInput
                      value={percentageOfChargeValue}
                      selectedCharge={percentageOfChargeTarget || undefined}
                      chargeOptions={[...CHARGE_OPTIONS, ...NUMERIC_DIMENSIONS]}
                      onValueChange={(val) => setPercentageOfChargeValue(val)}
                      onChargeChange={(charge) => setPercentageOfChargeTarget(charge)}
                      placeholder="Select charge"
                      size="md"
                    />
                    <button
                      onClick={(e) => {
                        setPickerMode('none');
                        setActiveValueCategory(null);
                        setSelectedVariableType(null);
                        setPercentageOfChargeValue('0');
                        setPercentageOfChargeTarget('');
                        openPickerForNextToken(e.currentTarget);
                      }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon name="edit" size={14} style={{ color: 'var(--primary)' }} />
                    </button>
                  </>
                )}
                {!showSpecificOptionsDropdown && !showInlinePercentageOfCharge && (
                  <button
                    onClick={(e) => openPickerForNextToken(e.currentTarget)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Icon name="edit" size={14} style={{ color: 'var(--primary)' }} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* WITH CONDITIONS STATE */}
          {state === 'with-conditions' && (
            <div style={{ display: 'flex', gap: '16px' }}>
              {/* Label */}
              <div style={{ flexShrink: 0 }}>
                <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--primary)', lineHeight: '1.4' }}>
                  {label.split(' ').map((word, i) => (
                    <span key={i}>
                      {word}
                      {i < label.split(' ').length - 1 && <br />}
                    </span>
                  ))}
                </span>
                <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--primary)' }}> =</span>
              </div>

              {/* Content */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Formula Input */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  {renderFormulaTokens()}
                  {showInlinePercentageOfCharge && (
                    <PercentageOfChargeInput
                      value={percentageOfChargeValue}
                      selectedCharge={percentageOfChargeTarget || undefined}
                      chargeOptions={[...CHARGE_OPTIONS, ...NUMERIC_DIMENSIONS]}
                      onValueChange={(val) => setPercentageOfChargeValue(val)}
                      onChargeChange={(charge) => setPercentageOfChargeTarget(charge)}
                      placeholder="Select charge"
                      size="md"
                    />
                  )}
                  {!showInlinePercentageOfCharge && (
                    <button
                      onClick={(e) => openPickerForNextToken(e.currentTarget)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon name="edit" size={14} style={{ color: 'var(--primary)' }} />
                    </button>
                  )}
                </div>

                {/* Condition Blocks */}
                {conditions.map(block => renderConditionBlock(block))}

                {/* Add Else If Button */}
                <button
                  onClick={handleAddElseIf}
                  style={{
                    width: 'fit-content',
                    height: '40px',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '0 20px',
                    cursor: 'pointer',
                  }}
                >
                  <Icon name="add" size={16} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--primary)' }}>Add Else If</span>
                </button>

                {/* Else Block */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '20px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary)' }}>Else</span>
                    </div>

                    {/* Else Value */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary)' }}>{label} =</span>
                      <input
                        type="text"
                        value={elseBlock.value}
                        onChange={(e) => {
                          setElseBlock({ ...elseBlock, value: e.target.value });
                          setIsDirty(true);
                        }}
                        style={{
                          width: '60px',
                          height: '32px',
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-primary)',
                          borderRadius: 'var(--radius-md)',
                          padding: '0 8px',
                          fontSize: '14px',
                          color: 'var(--primary)',
                          outline: 'none',
                        }}
                      />
                      <button
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Icon name="edit" size={14} style={{ color: 'var(--primary)' }} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Edit Button */}
                <button
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Icon name="edit" size={14} style={{ color: 'var(--primary)' }} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Render Dropdowns/Popovers */}
      {renderValuePicker()}
      {renderOperatorPicker()}
      {renderConditionDropdown()}
      {renderTokenDropdown()}
      {/* Render variable type dropdown separately (positioned relative to edit button, not inline) */}
      {renderVariableTypeDropdown()}
    </div>
  );
};
