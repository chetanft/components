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
    docs: {
      description: {
        component: 'Composable page header with support for back button, title, subtitle, actions, tabs, segmented tabs, and filters. Use sub-components like PageHeader.Top, PageHeader.Left, PageHeader.Right, PageHeader.Bottom for flexible layout composition.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      baseStory: 'ExplorerBase',
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { typeVariant: 'default' } },
            { id: 'minimal', label: 'Minimal', story: 'ExplorerBase', args: { typeVariant: 'minimal' } },
          ],
        },
        {
          id: 'content',
          label: 'Content',
          scenarios: [
            { id: 'default', label: 'Basic', story: 'ExplorerBase', args: { contentVariant: 'basic' } },
            { id: 'tabs', label: 'With Tabs', story: 'ExplorerBase', args: { contentVariant: 'tabs' } },
            { id: 'segmented', label: 'Segmented Tabs', story: 'ExplorerBase', args: { contentVariant: 'segmented' } },
            { id: 'filters', label: 'With Filters', story: 'ExplorerBase', args: { contentVariant: 'filters' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { stateVariant: 'default' } },
            { id: 'tabs-interactive', label: 'Tabs Interactive', story: 'ExplorerBase', args: { stateVariant: 'tabs-interactive', contentVariant: 'tabs' } },
            { id: 'with-actions', label: 'With Actions', story: 'ExplorerBase', args: { stateVariant: 'with-actions' } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const typeVariant = args.typeVariant ?? 'default';
    const contentVariant = args.contentVariant ?? 'basic';
    const stateVariant = args.stateVariant ?? 'default';
    const [activeTab, setActiveTab] = useState('tracking');
    const [segmentedTab, setSegmentedTab] = useState('timeline');
    const [location, setLocation] = useState<string | number>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const showMinimal = typeVariant === 'minimal';
    const showTabs = contentVariant === 'tabs' || stateVariant === 'tabs-interactive';
    const showSegmented = contentVariant === 'segmented';
    const showFilters = contentVariant === 'filters';
    const showActions = !showMinimal || stateVariant === 'with-actions';

    const locationOptions = [
      { value: 'amritsar', label: 'MDC Labs, Amritsar' },
      { value: 'delhi', label: 'MDC Labs, Delhi' },
      { value: 'mumbai', label: 'MDC Labs, Mumbai' },
    ];

    return (
      <PageHeader>
        <PageHeader.Top>
          <PageHeader.Left>
            {!showMinimal && !showFilters && <PageHeader.BackButton onClick={() => {}} />}
            {showFilters && (
              <PageHeader.Icon>
                <Icon name="location" size={20} className="text-[var(--primary)]" />
              </PageHeader.Icon>
            )}
            {showMinimal ? (
              <PageHeader.Title>Simple Page</PageHeader.Title>
            ) : showFilters ? (
              <PageHeader.Title>My Journeys</PageHeader.Title>
            ) : (
              <PageHeader.TitleGroup>
                <PageHeader.Title>{stateVariant === 'with-actions' ? 'Detail View' : 'PB 09 HH6439'}</PageHeader.Title>
                {stateVariant !== 'with-actions' && <PageHeader.Subtitle>MTI-7ebd1826-18bb-4a41-9009-11bc6fc5e444</PageHeader.Subtitle>}
              </PageHeader.TitleGroup>
            )}
          </PageHeader.Left>
          <PageHeader.Right>
            {showFilters && (
              <PageHeader.Filters>
                <FilterDropdown id="location-filter" value={location} onChange={setLocation} options={locationOptions} placeholder="Select location" icon="location" label="Location" />
                <FilterDateRange id="date-filter" startValue={startDate} endValue={endDate} onStartChange={setStartDate} onEndChange={setEndDate} placeholder="Select date range" />
                <FilterSearch value={searchTerm} onChange={setSearchTerm} placeholder="Search My Journeys" />
              </PageHeader.Filters>
            )}
            {showActions && (
              <PageHeader.Actions>
                <Button variant={stateVariant === 'with-actions' ? 'text' : 'secondary'} size="md">
                  {stateVariant === 'with-actions' ? 'Dismiss' : 'Export'}
                </Button>
                <Button variant="primary" size="md">
                  {showFilters ? 'Add Journey' : stateVariant === 'with-actions' ? 'Save' : 'Add Asset'}
                </Button>
              </PageHeader.Actions>
            )}
          </PageHeader.Right>
        </PageHeader.Top>

        {showTabs && (
          <PageHeader.Bottom>
            <PageHeader.Tabs value={activeTab} onValueChange={setActiveTab}>
              <PageHeader.Tabs.List>
                <PageHeader.Tabs.Trigger value="tracking">Tracking</PageHeader.Tabs.Trigger>
                <PageHeader.Tabs.Trigger value="loads">Loads</PageHeader.Tabs.Trigger>
                <PageHeader.Tabs.Trigger value="exceptions">Exceptions</PageHeader.Tabs.Trigger>
              </PageHeader.Tabs.List>
            </PageHeader.Tabs>
          </PageHeader.Bottom>
        )}

        {showSegmented && (
          <PageHeader.Bottom>
            <PageHeader.Tabs value={segmentedTab} onValueChange={setSegmentedTab}>
              <PageHeader.Tabs.SegmentedList>
                <PageHeader.Tabs.Trigger value="timeline">Timeline</PageHeader.Tabs.Trigger>
                <PageHeader.Tabs.Trigger value="activity">Activity</PageHeader.Tabs.Trigger>
                <PageHeader.Tabs.Trigger value="exceptions">Exceptions</PageHeader.Tabs.Trigger>
              </PageHeader.Tabs.SegmentedList>
            </PageHeader.Tabs>
          </PageHeader.Bottom>
        )}
      </PageHeader>
    );
  },
};

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

export const DocsWithTabs: Story = {
  render: () => <ComposableWithTabsComponent />,

  parameters: { docsOnly: true },
}