import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { UserProfileDropdown } from '../components/organisms/UserProfileDropdown';
import { UserProfile } from '../components/organisms/UserProfile';

const meta = {
  title: 'Components/UserProfile/Dropdown',
  component: UserProfileDropdown,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Expanded dropdown panel paired with `UserProfile`, exposing user metadata and actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userName: {
      control: 'text',
    },
    userRole: {
      control: 'text',
    },
    userLocation: {
      control: 'text',
    },
    userBadge: {
      control: 'text',
    },
    isOpen: {
      control: 'boolean',
      description: 'Controls visibility of the dropdown container',
    },
    onMenuItemClick: {
      action: 'menu-item-clicked',
      description: 'Triggered when any dropdown action is selected',
    },
  },
  args: {
    userName: 'Santosh Kumar',
    userRole: 'Dispatch Manager',
    userLocation: 'SPD-Santoshnagar',
    userBadge: 'Admin',
    isOpen: true,
  },
  decorators: [
    (Story, context) => {
      const { userName, userRole, userLocation, userBadge, userAvatar } = context.args;
      return (
        <div style={{
          padding: '40px',
          backgroundColor: '#F8F8F9',
          minHeight: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}>
          <div style={{ position: 'relative', display: 'inline-flex', width: 'fit-content' }}>
            <UserProfile
              userName={userName}
              userRole={userRole}
              userLocation={userLocation}
              userBadge={userBadge}
              userAvatar={userAvatar}
            />
            <Story />
          </div>
        </div>
      );
    },
  ],
} satisfies Meta<typeof UserProfileDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLongDetails: Story = {
  args: {
    userName: 'Alexandria Catherine Johnson',
    userRole: 'National Operations Program Lead',
    userLocation: 'Bengaluru-Whitefield Hub',
    userBadge: 'Super Admin',
  },
};

export const Hidden: Story = {
  args: {
    isOpen: false,
  },
};

