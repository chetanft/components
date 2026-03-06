import type { User as AppHeaderUser } from '../../../organisms/AppHeader';
import type { QuickFilterType } from '../../../organisms/QuickFilters';
import type { Tab } from '../../../organisms/Tabs';
import type { IconName } from '../../../atoms/Icons';
import type { Journey, CompactFilterType } from './JourneysBlock.types';

export const DEFAULT_JOURNEYS: Journey[] = [
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

export const DEFAULT_JOURNEY_FILTERS: QuickFilterType[] = [
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

export const JOURNEY_TABS: Tab[] = [
  { label: 'Planned', badge: true, badgeCount: 56 },
  { label: 'En Route to Loading', badge: true, badgeCount: 56 },
  { label: 'At Loading', badge: true, badgeCount: 56 },
  { label: 'In Transit', badge: true, badgeCount: 56 },
  { label: 'At Unloading', badge: true, badgeCount: 56 },
  { label: 'In Return', badge: true, badgeCount: 56 },
  { label: 'Delivered', badge: true, badgeCount: 56 },
];

export const JOURNEY_STATUS_MAP: Record<number, string> = {
  0: 'planned',
  1: 'en-route-loading',
  2: 'at-loading',
  3: 'in-transit',
  4: 'at-unloading',
  5: 'in-return',
  6: 'delivered',
};

export const DEFAULT_USER: AppHeaderUser = {
  name: 'John Doe',
  role: 'Admin',
  location: 'Mumbai',
  badge: 'Admin',
};

export const COMPACT_FILTER_CONFIG: { key: CompactFilterType; icon: IconName; label: string }[] = [
  { key: 'company', icon: 'organisation', label: 'Select company' },
  { key: 'dates', icon: 'calendar', label: 'Select date range' },
  { key: 'direction', icon: 'outbound', label: 'Select direction' },
  { key: 'search', icon: 'search', label: 'Search My Journeys' },
];
