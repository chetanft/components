import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ListingLayout } from '../components/templates/ListingLayout';
import { AppHeader } from '../components/organisms/AppHeader';
import { Tabs, type Tab } from '../components/organisms/Tabs';
import {
  QuickFilters,
  type QuickFilter,
} from '../components/organisms/QuickFilters';
import { Table, type TableColumn } from '../components/organisms/Table';
import { Button } from '../components/atoms/Button/Button';
import { Typography } from '../components/atoms/Typography';
import { Badge } from '../components/atoms/Badge';
import { Spacer } from '../components/atoms/Spacer';
import { Divider } from '../components/atoms/Divider';

type Story = StoryObj<typeof ListingLayout>;

type JourneyRow = {
  id: string;
  from: { city: string; company: string };
  to: { city: string; company: string };
  vehicle: string;
  tripId: string;
  status: 'On time' | 'At risk';
  eta: string;
};

type LoadCard = {
  id: string;
  consignor: string;
  consignee: string;
  status: string;
  badge: string;
};

type ReportCard = {
  id: string;
  title: string;
  tag: string;
  description: string;
  owner: string;
  cadence: string;
  updated: string;
};

const meta: Meta<typeof ListingLayout> = {
  title: 'Templates/ListingLayout',
  component: ListingLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Universal scaffold for list-heavy pages. Compose your own controls, tabs, filters, and master list content—table, card, split views, or any bespoke layout.',
      },
    },
  },
};

export default meta;

const tabsData: Tab[] = [
  { label: 'Planned', badge: true, badgeCount: '56' },
  { label: 'En Route', badge: true, badgeCount: '56' },
  { label: 'At Loading', badge: true, badgeCount: '56' },
  { label: 'In Transit', badge: true, badgeCount: '56' },
  { label: 'Delivered', badge: true, badgeCount: '56' },
];

const subTabsData: Tab[] = [
  { label: 'Tracking' },
  { label: 'Loads' },
  { label: 'Escalations', badge: true, badgeCount: '8' },
  { label: 'Yard Ops' },
];

const quickFiltersData: QuickFilter[] = [
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

const heroStats = [
  { label: 'Long Stoppages', value: '19', trend: '+2% vs last week' },
  { label: 'Route Deviations', value: '19', trend: '-5% vs last week' },
  { label: 'Delayed trips', value: '51', trend: '+8% vs SLA' },
  { label: 'E-way expiry', value: '18', trend: 'Due in 3 hrs' },
];

const journeyRows: JourneyRow[] = [
  {
    id: 'trp-1',
    from: { city: 'Amritsar, Punjab', company: 'MDC Labs Ltd' },
    to: { city: 'Mumbai, Maharashtra', company: 'Maa Kaali Distributors' },
    vehicle: 'PB09 HH 6439',
    tripId: '84973-47593',
    status: 'On time',
    eta: '12 Aug, 12:30 PM',
  },
  {
    id: 'trp-2',
    from: { city: 'Ludhiana, Punjab', company: 'Ludhiana Diagnostics' },
    to: { city: 'Mumbai, Maharashtra', company: 'Maa Kaali Distributors' },
    vehicle: 'PB10 HH 6440',
    tripId: '84973-47594',
    status: 'On time',
    eta: '12 Aug, 12:30 PM',
  },
  {
    id: 'trp-3',
    from: { city: 'Chandigarh, PB', company: 'Chandigarh Health Se.' },
    to: { city: 'Mumbai, Maharashtra', company: 'Maa Kaali Distributors' },
    vehicle: 'PB10 HH 6440',
    tripId: '84973-47595',
    status: 'At risk',
    eta: '12 Aug, 02:15 PM',
  },
  {
    id: 'trp-4',
    from: { city: 'Delhi, India', company: 'Delhi Medical Center' },
    to: { city: 'Mumbai, Maharashtra', company: 'Maa Kaali Distributors' },
    vehicle: 'PB09 HH 6439',
    tripId: '84973-47596',
    status: 'On time',
    eta: '12 Aug, 12:30 PM',
  },
];

const journeyColumns: TableColumn<JourneyRow>[] = [
  {
    key: 'from',
    title: 'From',
    render: (_, row) => (
      <div className="flex flex-col">
        <Typography variant="body-primary-medium">{row.from.city}</Typography>
        <Typography variant="body-secondary-regular" color="secondary">
          {row.from.company}
        </Typography>
      </div>
    ),
  },
  {
    key: 'to',
    title: 'To',
    render: (_, row) => (
      <div className="flex flex-col">
        <Typography variant="body-primary-medium">{row.to.city}</Typography>
        <Typography variant="body-secondary-regular" color="secondary">
          {row.to.company}
        </Typography>
      </div>
    ),
  },
  {
    key: 'vehicle',
    title: 'Vehicle info',
    render: (value) => (
      <Typography variant="body-secondary-medium" as="span">
        {value}
      </Typography>
    ),
  },
  {
    key: 'tripId',
    title: 'Trip info',
    render: (value) => (
      <Typography variant="body-secondary-medium" as="span">
        {value}
      </Typography>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    render: (_, row) => (
      <Badge variant={row.status === 'On time' ? 'success' : 'warning'}>{row.status}</Badge>
    ),
  },
  {
    key: 'eta',
    title: 'ETA',
    render: (value) => (
      <Typography variant="body-secondary-medium" as="span">
        {value}
      </Typography>
    ),
  },
];

const loadEntries: LoadCard[] = [
  {
    id: 'LRN: 457283924',
    consignor: 'MDC Labs, Ludhiana, PB',
    consignee: 'Sai Traders, Delhi, NCR',
    status: 'Pending pickup',
    badge: 'ePOD pending submission',
  },
  {
    id: 'LRN: 457283925',
    consignor: 'MDC Labs, Ludhiana, PB',
    consignee: 'Sai Traders, Delhi, NCR',
    status: 'Delivered',
    badge: 'ePOD pending submission',
  },
  {
    id: 'LRN: 457283926',
    consignor: 'MDC Labs, Ludhiana, PB',
    consignee: 'Sai Traders, Delhi, NCR',
    status: 'Delivered',
    badge: 'ePOD pending submission',
  },
];

const reportCards: ReportCard[] = [
  {
    id: 'otif',
    title: 'OTIF Report',
    tag: 'Scheduled on tomorrow',
    description:
      'Consolidated view of shipments delivered on-time and in-full with exception drill-downs.',
    owner: 'Ram Kumar',
    cadence: 'Every 2 days @ 9 & 18 hrs',
    updated: 'Updated 4 hrs ago',
  },
  {
    id: 'epod',
    title: 'ePOD Performance',
    tag: 'Scheduled on tomorrow',
    description:
      'Tracks digital proof-of-delivery completion, highlighting delays and compliance misses.',
    owner: 'Ram Kumar',
    cadence: 'Every 2 days @ 9 & 18 hrs',
    updated: 'Updated 4 hrs ago',
  },
  {
    id: 'compliance',
    title: 'Compliance Report',
    tag: 'Scheduled on tomorrow',
    description:
      'Monitors e-way bill expiry, route deviations, red-zone entries, and regulatory checks.',
    owner: 'Ram Kumar',
    cadence: 'Every 2 days @ 9 & 18 hrs',
    updated: 'Updated 4 hrs ago',
  },
  {
    id: 'transporter',
    title: 'Transporter Performance',
    tag: 'Scheduled on tomorrow',
    description:
      'Evaluates placement rate, on-time performance, idle hours, and exception incidents.',
    owner: 'Ram Kumar',
    cadence: 'Every 2 days @ 9 & 18 hrs',
    updated: 'Updated 4 hrs ago',
  },
  {
    id: 'utilisation',
    title: 'Vehicle Utilisation',
    tag: 'Scheduled on tomorrow',
    description:
      'Capacity usage overview with trip frequency, active hours, and idle time insights.',
    owner: 'Ram Kumar',
    cadence: 'Every 2 days @ 9 & 18 hrs',
    updated: 'Updated 4 hrs ago',
  },
  {
    id: 'alerts',
    title: 'Real time alerts',
    tag: 'Scheduled on tomorrow',
    description:
      'Live and historical alerts such as stoppages, diversions, STA breaches, and more.',
    owner: 'Ram Kumar',
    cadence: 'Every 2 days @ 9 & 18 hrs',
    updated: 'Updated 4 hrs ago',
  },
];

const selectedFilters = ['Alert', '0-6 hrs'];

const appHeaderNode = (
  <div
    style={
      {
        '--bg-secondary': 'transparent',
        '--border-primary': 'transparent',
      } as React.CSSProperties
    }
  >
    <AppHeader size="lg" />
  </div>
);

const pageHeaderNode = (
  <div className="flex flex-col gap-3">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <Typography as="h1" variant="title-secondary">
          My Journeys
        </Typography>
        <Typography variant="body-secondary-regular" color="secondary">
          Monitor live trips, escalate delays, and quickly add outbound consignments.
        </Typography>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="text" size="sm">
          Docs
        </Button>
        <Button variant="secondary" size="sm">
          Settings
        </Button>
        <Button size="sm">Add Journey</Button>
      </div>
    </div>
  </div>
);

const heroNode = (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {heroStats.map((stat) => (
      <div
        key={stat.label}
        className="rounded-[24px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] p-5"
      >
        <Typography variant="body-secondary-medium" color="secondary">
          {stat.label}
        </Typography>
        <Spacer size="x1" />
        <Typography variant="display-primary">
          {stat.value}
        </Typography>
        <Spacer size="x1" />
        <Typography variant="body-secondary-regular" color="secondary">
          {stat.trend}
        </Typography>
      </div>
    ))}
  </div>
);

const toolbarNode = (
  <div className="flex w-full flex-wrap items-center gap-3">
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="secondary" size="sm">
        MDC Labs, Amritsar
      </Button>
      <Button variant="secondary" size="sm">
        12 Aug 2024 → 12 Sep 2024
      </Button>
      <Button variant="secondary" size="sm">
        Outbound - Source
      </Button>
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="text" size="sm">
        Reset
      </Button>
      <Button size="sm">Add Journey</Button>
    </div>
  </div>
);

const tabsNode = (
  <Tabs
    tabs={tabsData}
    activeTab={3}
    type="tertiary"
    showLine={false}
    className="flex-wrap gap-2"
  />
);

const subTabsNode = (
  <Tabs
    tabs={subTabsData}
    activeTab={1}
    type="secondary"
    showLine={false}
    className="flex-wrap gap-2"
  />
);

const quickFiltersNode = (
  <QuickFilters
    filters={quickFiltersData}
    onFilterClick={() => {}}
    onFilterRemove={() => {}}
  />
);

const actionBarNode = (
  <div className="flex flex-wrap items-center gap-3">
    <div className="flex items-center gap-2">
      <Typography variant="body-primary-semibold">78 journeys</Typography>
      <Badge variant="success">On time</Badge>
      <Badge variant="warning">Delayed</Badge>
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <Typography variant="body-secondary-medium" color="secondary">
        Selected filters:
      </Typography>
      {selectedFilters.map((filter) => (
        <Badge key={filter} variant="neutral">
          {filter}
        </Badge>
      ))}
      <Button variant="text" size="sm">
        Reset
      </Button>
    </div>
  </div>
);

const TableContent = () => (
  <Table columns={journeyColumns} data={journeyRows} variant="secondary" selectable={false} />
);

const journeyCards = (
  <div className="grid gap-4 md:grid-cols-2">
    {journeyRows.map((journey) => (
      <div
        key={journey.id}
        className="flex flex-col gap-3 rounded-[20px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] p-4 shadow-[0px_1px_2px_rgba(15,23,42,0.08)]"
      >
        <div className="flex items-center justify-between gap-3">
          <Typography variant="body-primary-semibold">{journey.from.city}</Typography>
          <Badge variant={journey.status === 'On time' ? 'success' : 'warning'}>
            {journey.status}
          </Badge>
        </div>
        <Typography variant="body-secondary-regular" color="secondary">
          {journey.to.city}
        </Typography>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--secondary,#5f6b7a)]">
          <span>{journey.vehicle}</span>
          <span aria-hidden="true">•</span>
          <span>{journey.tripId}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Typography variant="body-secondary-medium" color="secondary">
            ETA
          </Typography>
          <Typography variant="body-primary-semibold">{journey.eta}</Typography>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1">
            Details
          </Button>
          <Button size="sm" className="flex-1">
            Track
          </Button>
        </div>
      </div>
    ))}
  </div>
);

const analyticsGrid = (
  <div className="grid gap-4 lg:grid-cols-3">
    <div className="rounded-[20px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] p-5">
      <Typography variant="body-primary-semibold">Live Alerts</Typography>
      <Typography variant="display-primary" className="mt-2">
        19
      </Typography>
      <Typography variant="body-secondary-regular" color="secondary">
        Escalations needing attention within the next hour.
      </Typography>
    </div>
    <div className="rounded-[20px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] p-5">
      <Typography variant="body-primary-semibold">Route Heatmap</Typography>
      <div className="mt-4 h-36 rounded-[16px] bg-gradient-to-r from-[#1e64e6]/10 via-[#ffd400]/20 to-[#ff6c19]/20" />
    </div>
    <div className="rounded-[20px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] p-5">
      <Typography variant="body-primary-semibold">Capacity Utilisation</Typography>
      <Typography variant="display-primary" className="mt-2">
        84%
      </Typography>
      <Typography variant="body-secondary-regular" color="secondary">
        Based on the last 24 hours of outbound trips.
      </Typography>
    </div>
  </div>
);

const journeyRail = (
  <div className="flex flex-col gap-4">
    {journeyRows.map((journey) => (
      <div
        key={journey.id}
        className="rounded-[20px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] p-4"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <Typography variant="body-primary-semibold">{journey.vehicle}</Typography>
            <Typography variant="body-secondary-regular" color="secondary">
              {journey.from.city} → {journey.to.city}
            </Typography>
          </div>
          <Badge variant={journey.status === 'On time' ? 'success' : 'warning'}>
            {journey.status}
          </Badge>
        </div>
        <div className="mt-3 flex flex-col gap-1 text-sm text-[var(--secondary,#5f6b7a)]">
          <span>Driver · Raju Srasti</span>
          <span className="font-semibold text-[var(--primary,#1e64e6)]">
            {journey.tripId}
          </span>
        </div>
        <Divider type="secondary" className="py-2" />
        <div className="mt-4 flex items-center justify-between rounded-[12px] bg-[var(--bg-secondary,#f5f6fa)] px-3 py-2 text-sm text-[var(--secondary,#5f6b7a)]">
          <span>ETA</span>
          <span>{journey.eta}</span>
        </div>
      </div>
    ))}
  </div>
);

const journeyMap = (
  <div className="flex h-[520px] flex-col gap-3 rounded-[32px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] p-4">
    <div className="flex flex-wrap items-center gap-2">
      <Typography variant="body-primary-semibold">PB 12 HH7890</Typography>
      <Badge variant="warning">Delayed by 2 hrs</Badge>
    </div>
    <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--secondary,#5f6b7a)]">
      <span>Distance left: 234 kms</span>
      <span>Current location: Ambala</span>
    </div>
    <Divider type="secondary" className="py-0" />
    <div className="flex-1 rounded-[24px] bg-[var(--bg-secondary,#f5f6fa)]" />
  </div>
);

const loadsList = (
  <div className="flex flex-col gap-3">
    {loadEntries.map((load) => (
      <div
        key={load.id}
        className="rounded-[20px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] p-4"
      >
        <div className="flex items-center justify-between gap-2">
          <Typography variant="body-primary-semibold">{load.id}</Typography>
          <Badge variant={load.status === 'Delivered' ? 'success' : 'warning'}>
            {load.status}
          </Badge>
        </div>
        <div className="mt-2 flex flex-col gap-1 text-sm text-[var(--secondary,#5f6b7a)]">
          <span>{load.consignor}</span>
          <span>{load.consignee}</span>
        </div>
        <Badge variant="neutral" className="mt-3 w-max">
          {load.badge}
        </Badge>
      </div>
    ))}
  </div>
);

const loadsDetailPanel = (
  <div className="flex flex-col gap-4 rounded-[32px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] p-5">
    <Typography variant="body-primary-semibold">LRN: 457283924</Typography>
    <div className="grid gap-3 text-sm text-[var(--secondary,#5f6b7a)] sm:grid-cols-2">
      <div>
        <Typography variant="body-secondary-medium" color="secondary">
          STA
        </Typography>
        <Typography variant="body-primary-semibold">06:14 AM, 11 Mar 23</Typography>
      </div>
      <div>
        <Typography variant="body-secondary-medium" color="secondary">
          Current Location
        </Typography>
        <Typography variant="body-primary-semibold">Ambala</Typography>
      </div>
      <div>
        <Typography variant="body-secondary-medium" color="secondary">
          Distance left
        </Typography>
        <Typography variant="body-primary-semibold">220 km</Typography>
      </div>
      <div>
        <Typography variant="body-secondary-medium" color="secondary">
          Next stop
        </Typography>
        <Typography variant="body-primary-semibold">Mumbai, Maharashtra</Typography>
      </div>
    </div>
    <Divider type="secondary" className="py-0" />
    <div className="rounded-[24px] bg-[var(--bg-secondary,#f5f6fa)] p-4">
      <Typography variant="body-secondary-medium" color="secondary">
        Summary
      </Typography>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--secondary,#5f6b7a)]">
        <li>Pick up at MDC Labs Pvt Ltd, Amritsar · Delayed by 30 mins</li>
        <li>Drop at Sai Traders, Delhi · Delivered on time</li>
      </ul>
    </div>
    <div className="h-[240px] rounded-[24px] bg-[var(--bg-secondary,#f5f6fa)]" />
  </div>
);

const reportsGrid = (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {reportCards.map((report) => (
      <div
        key={report.id}
        className="flex flex-col gap-4 rounded-[24px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <Typography variant="body-primary-semibold">{report.title}</Typography>
            <Typography variant="body-secondary-regular" color="secondary">
              {report.description}
            </Typography>
          </div>
          <Badge variant="neutral">{report.tag}</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--secondary,#5f6b7a)]">
          <span>Owner · {report.owner}</span>
          <span>Cadence · {report.cadence}</span>
        </div>
        <Divider type="secondary" className="py-0" />
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="text" size="sm">
            View log
          </Button>
          <Button variant="secondary" size="sm">
            Download
          </Button>
        </div>
        <Typography variant="body-secondary-regular" color="secondary">
          {report.updated}
        </Typography>
      </div>
    ))}
  </div>
);

const baseArgs = {
  appHeader: appHeaderNode,
  hero: heroNode,
  pageHeader: pageHeaderNode,
  toolbar: toolbarNode,
  tabs: tabsNode,
  subTabs: subTabsNode,
  quickFilters: quickFiltersNode,
  actionBar: actionBarNode,
};

export const TableList: Story = {
  args: {
    ...baseArgs,
    layout: 'stack',
    variant: 'table',
    content: <TableContent />,
  },
};

export const CardGrid: Story = {
  args: {
    ...baseArgs,
    layout: 'grid',
    variant: 'card',
    content: journeyCards,
  },
};

export const AnalyticsBoard: Story = {
  args: {
    ...baseArgs,
    layout: 'stack',
    variant: 'custom',
    content: analyticsGrid,
    quickFilters: (
      <Typography variant="body-secondary-medium" color="secondary">
        Quick filters are optional for bespoke layouts.
      </Typography>
    ),
    actionBar: (
      <div className="flex flex-wrap items-center gap-3">
        <Typography variant="body-primary-medium">
          Showing analytics instead of master list.
        </Typography>
        <Button variant="secondary" size="sm">
          Configure
        </Button>
      </div>
    ),
  },
};

export const SplitJourneys: Story = {
  args: {
    ...baseArgs,
    layout: 'split',
    variant: 'custom',
    content: journeyRail,
    contentSecondary: journeyMap,
  },
};

export const JourneyDetails: Story = {
  args: {
    ...baseArgs,
    layout: 'split',
    variant: 'custom',
    tabs: (
      <Tabs
        tabs={[
          { label: 'Tracking' },
          { label: 'Loads', badge: true, badgeCount: '5' },
          { label: 'Escalations' },
          { label: 'Yard Ops' },
        ]}
        activeTab={1}
        type="tertiary"
        className="flex-wrap gap-2"
      />
    ),
    quickFilters: (
      <QuickFilters
        filters={[
          { id: 'delivery-status', label: 'Delivery Status', count: 5 },
          { id: 'consignee', label: 'Consignee' },
          { id: 'consignor', label: 'Consignor' },
        ]}
        onFilterClick={() => {}}
      />
    ),
    content: (
      <>
        {loadsList}
        <Spacer size="x4" />
        <Divider type="secondary" className="py-0" />
      </>
    ),
    contentSecondary: loadsDetailPanel,
  },
};

export const ReportsGrid: Story = {
  args: {
    appHeader: appHeaderNode,
    hero: undefined,
    pageHeader: (
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Typography as="h1" variant="title-secondary">
            Reports
          </Typography>
          <Typography variant="body-secondary-regular" color="secondary">
            Monitor operational, performance, and exception dashboards.
          </Typography>
        </div>
        <Button size="sm">Create</Button>
      </div>
    ),
    toolbar: (
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="secondary" size="sm">
          MDC Labs, Amritsar
        </Button>
        <Button variant="secondary" size="sm">
          Report log
        </Button>
      </div>
    ),
    tabs: (
      <Tabs
        tabs={[
          { label: 'Performance', badge: true, badgeCount: '56' },
          { label: 'Operational', badge: true, badgeCount: '56' },
          { label: 'Exceptions', badge: true, badgeCount: '56' },
          { label: 'Custom', badge: true, badgeCount: '56' },
        ]}
        activeTab={0}
        type="tertiary"
        showLine={false}
        className="flex-wrap gap-2"
      />
    ),
    quickFilters: (
      <QuickFilters
        filters={[
          { id: 'owner', label: 'Owner', count: 4 },
          { id: 'status', label: 'Scheduled', count: 12 },
          { id: 'alerts', label: 'Alerts', count: 8 },
        ]}
        onFilterClick={() => {}}
      />
    ),
    actionBar: undefined,
    layout: 'grid',
    variant: 'card',
    content: reportsGrid,
  },
};

