import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Statistic, StatisticTitle, StatisticValue } from './index';

const meta = {
  title: 'Atoms/Statistic',
  component: Statistic,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A statistic component for displaying numerical values with labels. Supports different label placements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the statistic'
    },
    value: {
      control: 'text',
      description: 'The statistic value to display'
    },
    labelPlacement: {
      control: { type: 'select' },
      options: ['Below', 'Top'],
      description: 'Label placement relative to value'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
} satisfies Meta<typeof Statistic>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default statistic
export const Default: Story = {
  args: {
    label: 'Total Users',
    value: '1,234',
    labelPlacement: 'Below',
  },
};

// Label on top
export const LabelOnTop: Story = {
  args: {
    label: 'Revenue',
    value: '$45,678',
    labelPlacement: 'Top',
  },
};

// Large number
export const LargeNumber: Story = {
  args: {
    label: 'Page Views',
    value: '2,456,789',
    labelPlacement: 'Below',
  },
};

// Percentage
export const Percentage: Story = {
  args: {
    label: 'Growth Rate',
    value: '23.5%',
    labelPlacement: 'Below',
  },
};

// Currency
export const Currency: Story = {
  args: {
    label: 'Monthly Revenue',
    value: '$12,345',
    labelPlacement: 'Top',
  },
};

// Time duration
export const Duration: Story = {
  args: {
    label: 'Average Session',
    value: '4m 32s',
    labelPlacement: 'Below',
  },
};

// All placements showcase
export const AllPlacements: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Label Below (Default)</h3>
        <div className="flex gap-8">
          <Statistic 
            label="Active Users" 
            value="1,234" 
            labelPlacement="Below"
          />
          <Statistic 
            label="Revenue" 
            value="$45,678" 
            labelPlacement="Below"
          />
          <Statistic 
            label="Conversion Rate" 
            value="3.2%" 
            labelPlacement="Below"
          />
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Label On Top</h3>
        <div className="flex gap-8">
          <Statistic 
            label="New Signups" 
            value="89" 
            labelPlacement="Top"
          />
          <Statistic 
            label="Total Orders" 
            value="456" 
            labelPlacement="Top"
          />
          <Statistic 
            label="Bounce Rate" 
            value="12.3%" 
            labelPlacement="Top"
          />
        </div>
      </div>
    </div>
  ),
};

// Dashboard example
export const DashboardExample: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="font-semibold">Dashboard Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Statistic 
          label="Total Users" 
          value="12,345" 
          labelPlacement="Below"
        />
        <Statistic 
          label="Monthly Revenue" 
          value="$98,765" 
          labelPlacement="Below"
        />
        <Statistic 
          label="Active Sessions" 
          value="1,234" 
          labelPlacement="Below"
        />
        <Statistic 
          label="Conversion Rate" 
          value="4.2%" 
          labelPlacement="Below"
        />
        <Statistic 
          label="Page Views" 
          value="456,789" 
          labelPlacement="Top"
        />
        <Statistic 
          label="Avg. Session Duration" 
          value="3m 45s" 
          labelPlacement="Top"
        />
        <Statistic 
          label="New Customers" 
          value="234" 
          labelPlacement="Top"
        />
        <Statistic 
          label="Support Tickets" 
          value="12" 
          labelPlacement="Top"
        />
      </div>
    </div>
  ),
};

// Composable API Examples
export const ComposableBasic: Story = {
  render: () => (
    <Statistic>
      <StatisticValue>1,234</StatisticValue>
      <StatisticTitle>Total Users</StatisticTitle>
    </Statistic>
  ),
};

export const ComposableLabelOnTop: Story = {
  render: () => (
    <Statistic labelPlacement="Top">
      <StatisticTitle>Revenue</StatisticTitle>
      <StatisticValue>$45,678</StatisticValue>
    </Statistic>
  ),
};

export const ComposableWithCustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <Statistic>
        <StatisticValue className="text-[var(--positive)] text-3xl font-bold">2,456</StatisticValue>
        <StatisticTitle className="text-[var(--tertiary)]">Active Users</StatisticTitle>
      </Statistic>
      <Statistic>
        <StatisticValue className="text-[var(--critical)] text-2xl">$12,345</StatisticValue>
        <StatisticTitle>Monthly Revenue</StatisticTitle>
      </Statistic>
    </div>
  ),
};

export const ComposableDashboard: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="font-semibold">Dashboard Statistics (Composable API)</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Statistic>
          <StatisticValue>12,345</StatisticValue>
          <StatisticTitle>Total Users</StatisticTitle>
        </Statistic>
        <Statistic>
          <StatisticValue>$98,765</StatisticValue>
          <StatisticTitle>Monthly Revenue</StatisticTitle>
        </Statistic>
        <Statistic>
          <StatisticValue>1,234</StatisticValue>
          <StatisticTitle>Active Sessions</StatisticTitle>
        </Statistic>
        <Statistic>
          <StatisticValue>4.2%</StatisticValue>
          <StatisticTitle>Conversion Rate</StatisticTitle>
        </Statistic>
        <Statistic labelPlacement="Top">
          <StatisticTitle>Page Views</StatisticTitle>
          <StatisticValue>456,789</StatisticValue>
        </Statistic>
        <Statistic labelPlacement="Top">
          <StatisticTitle>Avg. Session Duration</StatisticTitle>
          <StatisticValue>3m 45s</StatisticValue>
        </Statistic>
        <Statistic labelPlacement="Top">
          <StatisticTitle>New Customers</StatisticTitle>
          <StatisticValue>234</StatisticValue>
        </Statistic>
        <Statistic labelPlacement="Top">
          <StatisticTitle>Support Tickets</StatisticTitle>
          <StatisticValue>12</StatisticValue>
        </Statistic>
      </div>
    </div>
  ),
};
