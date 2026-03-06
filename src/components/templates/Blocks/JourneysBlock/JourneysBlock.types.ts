import type { QuickFilterType } from '../../../organisms/QuickFilters';
import type { DropdownOption } from '../../../molecules/Dropdown';

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

export interface JourneysBlockProps {
  journeys?: Journey[];
  filters?: QuickFilterType[];
  companyOptions?: DropdownOption[];
  directionOptions?: DropdownOption[];
}

export type CompactFilterType = 'company' | 'dates' | 'direction' | 'search';
