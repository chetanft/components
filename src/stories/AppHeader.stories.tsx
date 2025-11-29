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
  },
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
  },
};
