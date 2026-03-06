import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SegmentedTabs, SegmentedTabItem } from './SegmentedTabs';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof SegmentedTabs> = {
  title: 'Molecules/SegmentedTabs',
  component: SegmentedTabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Segmented tabs component for switching between related options using composable API.',
      },
    },
    explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                  },
                                                                                                                                                                                                },
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'with-icons', label: 'Icons', story: 'ExplorerBase', args: { contentType: 'with-icons' } },
            { id: 'icon-only', label: 'Icon Only', story: 'ExplorerBase', args: { contentType: 'icon-only' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
            { id: 'controlled', label: 'Controlled', story: 'ExplorerBase', args: { contentType: 'controlled' } },
          ],
        },
      ],
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'icon-only'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedTabs>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const [value, setValue] = useState(contentType === 'icon-only' || contentType === 'with-icons' ? 'home' : 'tab1');
    const syncKey = JSON.stringify({ contentType, glass: args.glass });
    return (
      <div key={syncKey}>
        {(contentType === 'with-icons') && (
          <SegmentedTabs value={value} onChange={setValue}>
            <SegmentedTabItem value="home" label="Home" icon={<Icon name="home" size={16} />} />
            <SegmentedTabItem value="settings" label="Settings" icon={<Icon name="settings" size={16} />} />
            <SegmentedTabItem value="profile" label="Profile" icon={<Icon name="user" size={16} />} />
          </SegmentedTabs>
        )}
        {contentType === 'icon-only' && (
          <SegmentedTabs value={value} onChange={setValue} variant="icon-only">
            <SegmentedTabItem value="home" label="Home" icon={<Icon name="home" size={16} />} />
            <SegmentedTabItem value="settings" label="Settings" icon={<Icon name="settings" size={16} />} />
            <SegmentedTabItem value="profile" label="Profile" icon={<Icon name="user" size={16} />} />
          </SegmentedTabs>
        )}
        {(contentType === 'default' || contentType === 'controlled') && (
          <SegmentedTabs value={value} onChange={setValue}>
            <SegmentedTabItem value="tab1" label="Tab 1" />
            <SegmentedTabItem value="tab2" label="Tab 2" />
            <SegmentedTabItem value="tab3" label="Tab 3" />
          </SegmentedTabs>
        )}
      </div>
    );
  },
};

// Composable API Examples
function ComposableBasicComponent() {
  const [value, setValue] = useState('tab1');
  return (
    <SegmentedTabs value={value} onChange={setValue}>
      <SegmentedTabItem value="tab1" label="Tab 1" />
      <SegmentedTabItem value="tab2" label="Tab 2" />
      <SegmentedTabItem value="tab3" label="Tab 3" />
    </SegmentedTabs>
  );
}

export const Default: Story = {
  render: () => <ComposableBasicComponent />,
};

function ComposableWithIconsComponent() {
  const [value, setValue] = useState('home');
  return (
    <SegmentedTabs value={value} onChange={setValue}>
      <SegmentedTabItem 
        value="home" 
        label="Home" 
        icon={<Icon name="home" size={16} />}
      />
      <SegmentedTabItem 
        value="settings" 
        label="Settings" 
        icon={<Icon name="settings" size={16} />}
      />
      <SegmentedTabItem 
        value="profile" 
        label="Profile" 
        icon={<Icon name="user" size={16} />}
      />
    </SegmentedTabs>
  );
}

export const DocsWithIcons: Story = {
  render: () => <ComposableWithIconsComponent />,

  parameters: { docsOnly: true },
}