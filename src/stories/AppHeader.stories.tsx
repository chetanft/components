import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import React from 'react';
import { AppHeader } from '../components/organisms/AppHeader';

const meta: Meta<typeof AppHeader> = {
  title: 'Organisms/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Application header component with FreightTiger logo on the left, notifications, and user profile.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'branding',
          label: 'Branding',
          scenarios: [
            { id: 'default', label: 'Tata Motors', story: 'Default' },
            { id: 'ft', label: 'FreightTiger', story: 'WithFTCompany' },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'theme-on', label: 'Theme On', story: 'Default', args: { showThemeIcon: true } },
            { id: 'theme-off', label: 'Theme Off', story: 'Default', args: { showThemeIcon: false } },
          ],
        },
      ],
      defaultRowId: 'branding',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn<typeof AppHeader>) => {
      const StoryComponent = Story as React.ComponentType;
      return (
        <div style={{ minHeight: 'calc(var(--spacing-x10) * 2.5)', backgroundColor: 'var(--bg-secondary)' }}>
          <StoryComponent />
        </div>
      );
    },
  ],
  argTypes: {
    user: {
      control: 'object',
      description: 'User information including name, role, location, and badge',
    },
    showThemeIcon: {
      control: 'boolean',
      description: 'Show theme action icon on the right side',
    },
    glass: {
      control: { type: 'select' },
      options: [false, 'subtle', 'glass', 'prominent'],
      description: 'Glass morphism variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

// Default header
export const Default: Story = {
  args: {
    user: {
      name: 'Santosh Kumar',
      role: 'Dispatch Manager',
      location: 'SPD-Santoshnagar',
      badge: 'Admin',
    },
    userCompany: {
      name: 'tata-motors',
      displayName: 'Tata Motors',
    },
    showThemeIcon: true,
  },
};

// With FT Company
export const WithFTCompany: Story = {
  args: {
    user: {
      name: 'Rahul Singh',
      role: 'Operations Manager',
      location: 'BLR-Tech Hub',
      badge: 'Senior',
    },
    userCompany: {
      name: 'ft',
      displayName: 'FreightTiger',
    },
    showThemeIcon: true,
  },
};

// Operations Manager
export const OperationsManager: Story = {
  args: {
    user: {
      name: 'Demo User',
      role: 'Test Manager',
      location: 'TEST-Lab',
      badge: 'Tester',
    },
    userCompany: {
      name: 'tata-motors',
      displayName: 'Tata Motors',
    },
    showThemeIcon: true,
  },
};

export const DocsVariants: Story = {
  name: 'Variants',
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Default (Tata Motors)</p>
        <AppHeader
          user={{ name: 'Santosh Kumar', role: 'Dispatch Manager', location: 'SPD-Santoshnagar', badge: 'Admin' }}
          userCompany={{ name: 'tata-motors', displayName: 'Tata Motors' }}
          showThemeIcon={true}
        />
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">FreightTiger Company</p>
        <AppHeader
          user={{ name: 'Rahul Singh', role: 'Operations Manager', location: 'BLR-Tech Hub', badge: 'Senior' }}
          userCompany={{ name: 'ft', displayName: 'FreightTiger' }}
          showThemeIcon={true}
        />
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
};