"use client";

import React from 'react';
import { Button } from '../../../atoms/Button/Button';
import { Badge } from '../../../atoms/Badge';
import { Checkbox } from '../../../atoms/Checkbox';
import { Icon, type IconName } from '../../../atoms/Icons';
import type { TableColumn, TableRowData } from '../../../organisms/Table';
import type { Journey } from './JourneysBlock.types';

export function getJourneyColumns(
  selectedJourneyIds: number[],
  setSelectedJourneyIds: React.Dispatch<React.SetStateAction<number[]>>
): TableColumn<Journey & TableRowData>[] {
  return [
    {
      key: 'checkbox',
      title: '',
      render: (_: unknown, journey: Journey) => (
        <div className="flex items-center gap-[var(--spacing-x2)]">
          <Checkbox
            checked={selectedJourneyIds.includes(journey.journey_id)}
            onChange={(event) => {
              const checked = event.target.checked;
              setSelectedJourneyIds((prev) =>
                checked ? [...prev, journey.journey_id] : prev.filter((id) => id !== journey.journey_id)
              );
            }}
          />
          <Icon name="star" style={{ width: 'var(--spacing-x4)', height: 'var(--spacing-x4)', color: 'var(--secondary)' }} />
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
        <div className="flex flex-col gap-[var(--spacing-x1)] min-w-0">
          <div className="flex items-center gap-[var(--spacing-x1)] min-w-0">
            <span className="text-sm font-medium truncate text-[var(--primary)]">
              {journey.origin_display}, {journey.origin_state}
            </span>
            <Badge variant="normal" className="text-xs px-[var(--spacing-x1)] py-0 h-5 flex-shrink-0">
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
        <div className="flex flex-col gap-[var(--spacing-x1)] min-w-0">
          <div className="flex items-center gap-[var(--spacing-x1)] min-w-0">
            <span className="text-sm font-medium truncate text-[var(--primary)]">
              {journey.destination_display}, {journey.destination_state.substring(0, 4)}...
            </span>
            <Badge variant="normal" className="text-xs px-[var(--spacing-x1)] py-0 h-5 flex-shrink-0">
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
        <div className="flex flex-col gap-[var(--spacing-x1)] min-w-0">
          <div className="flex items-center gap-[var(--spacing-x1)] min-w-0">
            <span className="text-sm font-medium truncate text-[var(--primary)]">{journey.vehicle_id}</span>
            <Icon name={"help-circle" as IconName} style={{ width: 'var(--spacing-x3-5)', height: 'var(--spacing-x3-5)' }} className="flex-shrink-0" />
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
        <div className="flex flex-col gap-[var(--spacing-x1)] min-w-0">
          <div className="flex items-center gap-[var(--spacing-x2)] min-w-0">
            <Icon
              name="truck"
              style={{
                width: 'var(--spacing-x4)',
                height: 'var(--spacing-x4)',
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
        <div className="flex flex-col gap-[var(--spacing-x1)] min-w-0">
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
          <div className="flex flex-col gap-[var(--spacing-x1)]">
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
        <div className="flex items-center gap-[var(--spacing-x2)]">
          <Button variant="secondary" size="md" className="rounded-full" icon="more" iconPosition="only" />
          <Button variant="secondary" size="md" className="rounded-full" icon="chevron-right" iconPosition="only" />
        </div>
      ),
    },
  ];
}
