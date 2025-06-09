import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AppHeader, companyConfigs } from '../components/organisms/AppHeader/AppHeader';

const meta: Meta<typeof AppHeader> = {
  title: 'Organisms/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Application header component with company logos, notifications, and user profile. Supports FT and Tata Motors branding.',
      },
    },
  },
  argTypes: {
    company: {
      control: 'object',
      description: 'Company information (FT or Tata Motors)',
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

// Default header (FT as shown in Figma)
export const Default: Story = {
  args: {
    company: companyConfigs['ft'],
    user: {
      name: 'Santosh Kumar',
      role: 'Dispatch Manager',
      location: 'SPD-Santoshnagar',
      badge: 'Admin',
    },
  },
};

// FreightTiger variant
export const FreightTiger: Story = {
  args: {
    company: companyConfigs['ft'],
    user: {
      name: 'Rahul Singh',
      role: 'Operations Manager',
      location: 'BLR-Tech Hub',
      badge: 'Senior',
    },
  },
};

// Tata Motors variant
export const TataMotors: Story = {
  args: {
    company: companyConfigs['tata-motors'],
    user: {
      name: 'Priya Sharma',
      role: 'Fleet Manager',
      location: 'HYD-Headquarters',
      badge: 'Manager',
    },
  },
};

// Admin User
export const AdminUser: Story = {
  args: {
    company: companyConfigs['ft'],
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
    company: companyConfigs['tata-motors'],
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
    company: companyConfigs['ft'],
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
    company: companyConfigs['tata-motors'],
    user: {
      name: 'Alexandrina Montgomery-Richardson',
      role: 'Senior Operations Manager',
      location: 'HYD-Headquarters',
      badge: 'Senior',
    },
  },
};

// User with avatar
export const UserWithAvatar: Story = {
  args: {
    company: companyConfigs['ft'],
    user: {
      name: 'Sarah Wilson',
      role: 'Fleet Manager',
      location: 'BLR-Central',
      badge: 'Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e120?w=64&h=64&fit=crop&crop=face',
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
        company={companyConfigs['ft']}
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
        company={companyConfigs['ft']}
        user={{
          name: 'Sarah Wilson',
          role: 'System Administrator',
          location: 'HYD-Headquarters',
          badge: 'Super Admin',
        }}
      />
      <AppHeader
        company={companyConfigs['tata-motors']}
        user={{
          name: 'Michael Chen',
          role: 'Fleet Manager',
          location: 'CHN-Central',
          badge: 'Manager',
        }}
      />
      <AppHeader
        company={companyConfigs['ft']}
        user={{
          name: 'Emily Rodriguez',
          role: 'Dispatch Supervisor',
          location: 'KOL-East',
          badge: 'Supervisor',
        }}
      />
      <AppHeader
        company={companyConfigs['tata-motors']}
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
    company: companyConfigs['ft'],
    user: {
      name: 'Mobile User',
      role: 'Field Manager',
      location: 'PUN-Mobile',
      badge: 'Field',
    },
  },
};

// Both companies showcase
export const CompanyShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Available Company Logos
      </h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>
          FreightTiger
        </h3>
        <AppHeader
          company={companyConfigs['ft']}
          user={{
            name: 'John Doe',
            role: 'Operations Manager',
            location: 'BLR-Tech Hub',
            badge: 'Admin',
          }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>
          Tata Motors
        </h3>
        <AppHeader
          company={companyConfigs['tata-motors']}
          user={{
            name: 'Jane Smith',
            role: 'Fleet Manager',
            location: 'HYD-Headquarters',
            badge: 'Manager',
          }}
        />
      </div>
    </div>
  ),
}; 