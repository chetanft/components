import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import PageHeader from './PageHeader';
import { FilterDropdown } from '../../molecules/FilterDropdown';
import { FilterDateRange } from '../../molecules/FilterDateRange';
import { FilterSearch } from '../../molecules/FilterSearch';
import { Icon } from '../../atoms/Icons';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof PageHeader> = {
  title: 'Design System/Organisms/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Composable API Examples
export const Default: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.Top>
        <PageHeader.Left>
          <PageHeader.BackButton onClick={() => console.log('Back clicked')} />
          <PageHeader.TitleGroup>
            <PageHeader.Title>PB 09 HH6439</PageHeader.Title>
            <PageHeader.Subtitle>MTI-7ebd1826-18bb-4a41-9009-11bc6fc5e444</PageHeader.Subtitle>
          </PageHeader.TitleGroup>
        </PageHeader.Left>
        <PageHeader.Right>
          <PageHeader.Actions>
            <Button variant="secondary" size="md">Export</Button>
            <Button variant="primary" size="md">Add Asset</Button>
          </PageHeader.Actions>
        </PageHeader.Right>
      </PageHeader.Top>
    </PageHeader>
  ),
};

// ComposableWithTabs component to properly use hooks
const ComposableWithTabsComponent = () => {
  const [activeTab, setActiveTab] = useState('tracking');
  return (
    <PageHeader>
      <PageHeader.Top>
        <PageHeader.Left>
          <PageHeader.BackButton onClick={() => console.log('Back clicked')} />
          <PageHeader.Title>PB 09 HH6439</PageHeader.Title>
        </PageHeader.Left>
        <PageHeader.Right>
          <PageHeader.Actions>
            <Button variant="secondary" size="md">Export</Button>
            <Button variant="primary" size="md">Add Asset</Button>
          </PageHeader.Actions>
        </PageHeader.Right>
      </PageHeader.Top>
      <PageHeader.Bottom>
        <PageHeader.Tabs value={activeTab} onValueChange={setActiveTab}>
          <PageHeader.Tabs.List>
            <PageHeader.Tabs.Trigger value="tracking">Tracking</PageHeader.Tabs.Trigger>
            <PageHeader.Tabs.Trigger value="loads">Loads</PageHeader.Tabs.Trigger>
            <PageHeader.Tabs.Trigger value="exceptions">Exceptions</PageHeader.Tabs.Trigger>
            <PageHeader.Tabs.Trigger value="ops">Ops</PageHeader.Tabs.Trigger>
          </PageHeader.Tabs.List>
        </PageHeader.Tabs>
      </PageHeader.Bottom>
    </PageHeader>
  );
};

export const WithTabs: Story = {
  render: () => <ComposableWithTabsComponent />,
};

const ComposableWithSegmentedTabsComponent = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  return (
    <PageHeader>
      <PageHeader.Top>
        <PageHeader.Left>
          <PageHeader.TitleGroup>
            <PageHeader.Title>Shipment Controls</PageHeader.Title>
            <PageHeader.Subtitle>Configure secondary actions</PageHeader.Subtitle>
          </PageHeader.TitleGroup>
        </PageHeader.Left>
        <PageHeader.Right>
          <PageHeader.Actions>
            <Button variant="text" size="md">Dismiss</Button>
            <Button variant="primary" size="md">Save</Button>
          </PageHeader.Actions>
        </PageHeader.Right>
      </PageHeader.Top>
      <PageHeader.Bottom>
        <PageHeader.Tabs value={activeTab} onValueChange={setActiveTab}>
          <PageHeader.Tabs.SegmentedList>
            <PageHeader.Tabs.Trigger value="timeline">Timeline</PageHeader.Tabs.Trigger>
            <PageHeader.Tabs.Trigger value="activity">Activity</PageHeader.Tabs.Trigger>
            <PageHeader.Tabs.Trigger value="exceptions">Exceptions</PageHeader.Tabs.Trigger>
          </PageHeader.Tabs.SegmentedList>
        </PageHeader.Tabs>
      </PageHeader.Bottom>
    </PageHeader>
  );
};

export const WithSegmentedTabs: Story = {
  render: () => <ComposableWithSegmentedTabsComponent />,
};

// ComposableWithFilters component to properly use hooks
const ComposableWithFiltersComponent = () => {
  const [location, setLocation] = useState<string | number>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const locationOptions = [
    { value: 'mdc-labs-amritsar', label: 'MDC Labs, Amritsar' },
    { value: 'mdc-labs-delhi', label: 'MDC Labs, Delhi' },
    { value: 'mdc-labs-mumbai', label: 'MDC Labs, Mumbai' },
  ];

  return (
    <PageHeader>
      <PageHeader.Top>
        <PageHeader.Left>
          <PageHeader.Icon>
            <Icon name="location" size={20} className="text-[var(--primary)]" />
          </PageHeader.Icon>
          <PageHeader.Title>My Journeys</PageHeader.Title>
        </PageHeader.Left>
        <PageHeader.Right>
          <PageHeader.Filters>
            <FilterDropdown
              id="location-filter"
              value={location}
              onChange={setLocation}
              options={locationOptions}
              placeholder="Select location"
              icon="location"
              label="Location"
            />
            <FilterDateRange
              id="date-filter"
              startValue={startDate}
              endValue={endDate}
              onStartChange={setStartDate}
              onEndChange={setEndDate}
              placeholder="Select date range"
            />
            <FilterSearch
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search My Journeys"
            />
          </PageHeader.Filters>
          <PageHeader.Actions>
            <Button variant="primary" size="md" icon="add">Add Journey</Button>
          </PageHeader.Actions>
        </PageHeader.Right>
      </PageHeader.Top>
    </PageHeader>
  );
};

export const WithFilters: Story = {
  render: () => <ComposableWithFiltersComponent />,
};

export const Minimal: Story = {
  render: () => (
    <PageHeader>
      <PageHeader.Top>
        <PageHeader.Left>
          <PageHeader.Title>Simple Page</PageHeader.Title>
        </PageHeader.Left>
      </PageHeader.Top>
    </PageHeader>
  ),
};
