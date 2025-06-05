import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AppHeader } from '../components/AppHeader/AppHeader';

const meta = {
  title: 'Components/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default header
export const Default: Story = {
  args: {
    user: {
      name: 'Santosh Kumar',
      role: 'Dispatch Manager',
      location: 'SPD-Santoshnagar',
      badge: 'Admin',
    },
  },
};

// Admin User
export const AdminUser: Story = {
  args: {
    user: {
      name: 'John Doe',
      role: 'Administrator',
      location: 'MUM-Central',
      badge: 'Admin',
    },
  },
};

// Manager User
export const ManagerUser: Story = {
  args: {
    user: {
      name: 'Jane Smith',
      role: 'Fleet Manager',
      location: 'DEL-North',
      badge: 'Manager',
    },
  },
};

// Dispatch Manager
export const DispatchManager: Story = {
  args: {
    user: {
      name: 'Alex Johnson',
      role: 'Dispatch Manager',
      location: 'BLR-Whitefield',
      badge: 'Supervisor',
    },
  },
};

// User with long name
export const LongUserName: Story = {
  args: {
    user: {
      name: 'Alexandrina Montgomery-Richardson',
      role: 'Senior Operations Manager',
      location: 'HYD-Headquarters',
      badge: 'Senior',
    },
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const handleNotificationClick = (type: 'rocket' | 'bell') => {
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} notification clicked!`);
    };

    const handleUserClick = () => {
      alert('User profile clicked!');
    };

    const handleUserMenuItemClick = (item: string) => {
      alert(`Menu item clicked: ${item}`);
    };

    return (
      <AppHeader
        user={{
          name: 'Demo User',
          role: 'Test Manager',
          location: 'TEST-Lab',
          badge: 'Tester',
        }}
        onNotificationClick={handleNotificationClick}
        onUserClick={handleUserClick}
        onUserMenuItemClick={handleUserMenuItemClick}
      />
    );
  },
};

// Different user roles showcase
export const UserRoles: Story = {
  render: () => (
    <div className="space-y-4">
      <AppHeader
        user={{
          name: 'Sarah Wilson',
          role: 'System Administrator',
          location: 'HYD-Headquarters',
          badge: 'Super Admin',
        }}
      />
      <AppHeader
        user={{
          name: 'Michael Chen',
          role: 'Fleet Manager',
          location: 'CHN-Central',
          badge: 'Manager',
        }}
      />
      <AppHeader
        user={{
          name: 'Emily Rodriguez',
          role: 'Dispatch Supervisor',
          location: 'KOL-East',
          badge: 'Supervisor',
        }}
      />
      <AppHeader
        user={{
          name: 'Guest User',
          role: 'Guest',
          location: 'Remote',
          badge: 'Guest',
        }}
      />
    </div>
  ),
};

// Mobile responsive
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    user: {
      name: 'Mobile User',
      role: 'Field Manager',
      location: 'PUN-Mobile',
      badge: 'Field',
    },
  },
}; 