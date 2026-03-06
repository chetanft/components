"use client";

import React from 'react';
import { Card } from '../../../organisms/Card';
import { Button } from '../../../atoms/Button/Button';
import { Badge } from '../../../atoms/Badge';
import { Typography } from '../../../atoms/Typography';
import type { Journey } from './JourneysBlock.types';

interface JourneyMobileCardProps {
  journey: Journey;
}

export const JourneyMobileCard: React.FC<JourneyMobileCardProps> = ({ journey }) => (
  <Card>
    <div style={{ padding: 'var(--spacing-x4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x3)' }}>
      <Typography variant="body-primary-medium" className="text-[var(--primary)]">
        {journey.feed_unique_id}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-x3)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x1)' }}>
          <Typography variant="body-secondary-medium" className="text-[var(--secondary)]">
            {journey.origin_company_display}
          </Typography>
          <Typography variant="body-primary-medium" className="text-[var(--primary)]">
            {journey.origin_display}
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x1)', textAlign: 'right' }}>
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
);
