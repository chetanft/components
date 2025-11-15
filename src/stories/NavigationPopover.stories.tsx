import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  NavigationPopover,
  DEFAULT_NAVIGATION_SECTIONS,
  type NavigationSection,
} from '../components/organisms/NavigationPopover';
import { Button } from '../components/atoms/Button/Button';
import { Typography } from '../components/atoms/Typography';

const meta: Meta<typeof NavigationPopover> = {
  title: 'Organisms/NavigationPopover',
  component: NavigationPopover,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Highly configurable navigation popover that can mix hero illustrations, metric summaries, and deep sub-menus—similar to launchers in modern design systems.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          padding: 'var(--x6, 32px)',
          backgroundColor: 'var(--bg-secondary)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1024px',
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--x4, 16px)',
            padding: 'var(--x6, 32px)',
            boxShadow:
              '0px 4px 12px rgba(16, 24, 40, 0.06), 0px 2px 4px rgba(16, 24, 40, 0.03)',
            border: '1px solid var(--border-primary)',
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls visibility of the popover',
    },
    initialSectionId: {
      control: 'select',
      options: [
        'overview',
        'insights',
        'workspace',
        'health',
        'reports',
        'support',
      ],
      description: 'Preselects a navigation item to showcase its layout',
    },
    onClose: { action: 'close clicked' },
    onSectionChange: { action: 'section changed' },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationPopover>;

export const Overview: Story = {
  args: {
    open: true,
    sections: DEFAULT_NAVIGATION_SECTIONS,
    initialSectionId: 'overview',
  },
};

export const Insights: Story = {
  args: {
    open: true,
    sections: DEFAULT_NAVIGATION_SECTIONS,
    initialSectionId: 'insights',
  },
};

export const Workspace: Story = {
  args: {
    open: true,
    sections: DEFAULT_NAVIGATION_SECTIONS,
    initialSectionId: 'workspace',
  },
};

export const ServiceHealth: Story = {
  args: {
    open: true,
    sections: DEFAULT_NAVIGATION_SECTIONS,
    initialSectionId: 'health',
  },
};

export const Reports: Story = {
  args: {
    open: true,
    sections: DEFAULT_NAVIGATION_SECTIONS,
    initialSectionId: 'reports',
  },
};

const noHeroSections: NavigationSection[] = [
  {
    id: 'metrics-only',
    label: 'Metrics Only',
    icon: 'dashboard',
    metrics: [
      { label: 'Pending Orders', value: '42' },
      { label: 'Delivered Orders', value: '128' },
    ],
  },
  {
    id: 'sub-menu',
    label: 'Sub Menu',
    icon: 'planning',
    subCategories: [
      {
        title: 'Planning',
        items: [
          { label: 'Route Allocation', icon: 'planning' },
          { label: 'Capacity Planner', icon: 'truck' },
        ],
      },
    ],
  },
];

export const MetricsWithoutHero: Story = {
  args: {
    open: true,
    sections: noHeroSections,
    initialSectionId: 'metrics-only',
  },
};

export const SubMenuVariant: Story = {
  args: {
    open: true,
    sections: noHeroSections,
    initialSectionId: 'sub-menu',
  },
};

export const HeroTopPlacement: Story = {
  args: {
    open: true,
    sections: DEFAULT_NAVIGATION_SECTIONS,
    initialSectionId: 'overview',
    heroPlacement: 'top',
    metricsColumns: { withHero: 3 },
  },
};

export const CustomSlots: Story = {
  args: {
    open: true,
    sections: DEFAULT_NAVIGATION_SECTIONS,
    initialSectionId: 'workspace',
    headerSlot: (
      <Button size="sm" variant="secondary">
        Launch Console
      </Button>
    ),
    footerSlot: (
      <div className="flex items-center gap-3">
        <Typography variant="body-secondary-medium" color="secondary">
          Need enterprise setup?
        </Typography>
        <Button size="sm">Talk to sales</Button>
      </div>
    ),
  },
};

