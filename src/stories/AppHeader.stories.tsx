import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AppHeader } from '../components/organisms/AppHeader/AppHeader';

const meta: Meta<typeof AppHeader> = {
  title: 'Organisms/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Application header component with FreightTiger logo on the left, notifications, and user profile. User profile shows company-specific logo (Tata Motors by default).',
      },
    },
  },
  argTypes: {
    userCompany: {
      control: 'object',
      description: 'Company information for user profile (FT or Tata Motors)',
    },
    user: {
      control: 'object',
      description: 'User information including name, role, location, and badge',
    },
    onNotificationClick: { action: 'notification clicked' },
    onUserClick: { action: 'user clicked' },
    onUserMenuItemClick: { action: 'user menu item clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

// Default header (FT logo on left, Tata Motors in user profile)
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
      displayName: 'Tata Motors'
    },
  },
};

// User with FT company in profile
export const UserWithFTCompany: Story = {
  args: {
    user: {
      name: 'Rahul Singh',
      role: 'Operations Manager',
      location: 'BLR-Tech Hub',
      badge: 'Senior',
    },
    userCompany: {
      name: 'ft',
      displayName: 'FreightTiger'
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
    userCompany: {
      name: 'tata-motors',
      displayName: 'Tata Motors'
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
    userCompany: {
      name: 'tata-motors',
      displayName: 'Tata Motors'
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
    userCompany: {
      name: 'tata-motors',
      displayName: 'Tata Motors'
    },
  },
};

// User with avatar
export const UserWithAvatar: Story = {
  args: {
    user: {
      name: 'Sarah Wilson',
      role: 'Fleet Manager',
      location: 'BLR-Central',
      badge: 'Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e120?w=64&h=64&fit=crop&crop=face',
    },
    userCompany: {
      name: 'ft',
      displayName: 'FreightTiger'
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
        userCompany={{
          name: 'tata-motors',
          displayName: 'Tata Motors'
        }}
        onNotificationClick={handleNotificationClick}
        onUserClick={handleUserClick}
        onUserMenuItemClick={handleUserMenuItemClick}
      />
    );
  },
};

// Different user company showcase
export const UserCompanyVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>
          User with Tata Motors Company
        </h3>
        <AppHeader
          user={{
            name: 'Sarah Wilson',
            role: 'System Administrator',
            location: 'HYD-Headquarters',
            badge: 'Super Admin',
          }}
          userCompany={{
            name: 'tata-motors',
            displayName: 'Tata Motors'
          }}
        />
      </div>
      
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>
          User with FreightTiger Company
        </h3>
        <AppHeader
          user={{
            name: 'Michael Chen',
            role: 'Fleet Manager',
            location: 'CHN-Central',
            badge: 'Manager',
          }}
          userCompany={{
            name: 'ft',
            displayName: 'FreightTiger'
          }}
        />
      </div>
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
    userCompany: {
      name: 'tata-motors',
      displayName: 'Tata Motors'
    },
  },
}; 