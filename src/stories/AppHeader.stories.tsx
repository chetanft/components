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
        component: 'Application header component with dynamic company logos, notifications, and user profile. Supports multiple company brands with their respective colors and icons.',
      },
    },
  },
  argTypes: {
    company: {
      control: 'object',
      description: 'Company information including name, logo type, and brand colors',
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

// Default header
export const Default: Story = {
  args: {
    company: companyConfigs.tata,
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
    company: companyConfigs.tata,
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
    company: companyConfigs.tata,
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
    company: companyConfigs.tata,
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
    company: companyConfigs.tata,
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
        company={companyConfigs.tata}
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
        company={companyConfigs.tata}
        user={{
          name: 'Sarah Wilson',
          role: 'System Administrator',
          location: 'HYD-Headquarters',
          badge: 'Super Admin',
        }}
      />
      <AppHeader
        company={companyConfigs.tata}
        user={{
          name: 'Michael Chen',
          role: 'Fleet Manager',
          location: 'CHN-Central',
          badge: 'Manager',
        }}
      />
      <AppHeader
        company={companyConfigs.tata}
        user={{
          name: 'Emily Rodriguez',
          role: 'Dispatch Supervisor',
          location: 'KOL-East',
          badge: 'Supervisor',
        }}
      />
      <AppHeader
        company={companyConfigs.tata}
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
    company: companyConfigs.tata,
    user: {
      name: 'Mobile User',
      role: 'Field Manager',
      location: 'PUN-Mobile',
      badge: 'Field',
    },
  },
};

export const TataMotors: Story = {
  args: {
    company: companyConfigs.tata,
    user: {
      name: 'Priya Sharma',
      role: 'Fleet Manager',
      location: 'HYD-Headquarters',
      badge: 'Manager',
    },
  },
};

export const FreightTiger: Story = {
  args: {
    company: companyConfigs.ft,
    user: {
      name: 'Rahul Singh',
      role: 'Operations Manager',
      location: 'BLR-Tech Hub',
      badge: 'Senior',
    },
  },
};

export const Google: Story = {
  args: {
    company: companyConfigs.google,
    user: {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      location: 'MTV-California',
      badge: 'L6',
    },
  },
};

export const Vodafone: Story = {
  args: {
    company: companyConfigs.vodafone,
    user: {
      name: 'David Wilson',
      role: 'Network Engineer',
      location: 'LON-UK',
      badge: 'Tech',
    },
  },
};

export const Airtel: Story = {
  args: {
    company: companyConfigs.airtel,
    user: {
      name: 'Amit Patel',
      role: 'Service Manager',
      location: 'DEL-North',
      badge: 'Lead',
    },
  },
};

export const Jio: Story = {
  args: {
    company: companyConfigs.jio,
    user: {
      name: 'Neha Gupta',
      role: 'Customer Success',
      location: 'MUM-West',
      badge: 'Expert',
    },
  },
};

export const CustomCompany: Story = {
  args: {
    company: {
      name: 'Custom Corp',
      logoType: 'custom',
      colors: { primary: '#6366F1', secondary: '#8B5CF6' },
      customLogo: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    user: {
      name: 'Alex Thompson',
      role: 'Creative Director',
      location: 'NYC-Studio',
      badge: 'Creative',
    },
  },
};

export const AllCompaniesShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Company Logo Showcase
      </h2>
      
      {Object.entries(companyConfigs).map(([key, company]) => (
        <div key={key} style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>
            {company.name}
          </h3>
          <AppHeader
            company={company}
            user={{
              name: 'John Doe',
              role: 'Manager',
              location: 'HQ',
              badge: 'Admin',
            }}
          />
        </div>
      ))}
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>
          Custom Company (Purple Brand)
        </h3>
        <AppHeader
          company={{
            name: 'Purple Dynamics',
            logoType: 'custom',
            colors: { primary: '#8B5CF6', secondary: '#6366F1' },
            customLogo: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ),
          }}
          user={{
            name: 'Jane Smith',
            role: 'Tech Lead',
            location: 'Remote',
            badge: 'Expert',
          }}
        />
      </div>
    </div>
  ),
}; 