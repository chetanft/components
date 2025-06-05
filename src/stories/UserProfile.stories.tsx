import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { UserProfile } from '../components/UserProfile';

const meta = {
  title: 'Components/UserProfile',
  component: UserProfile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A user profile component with dropdown menu functionality, showing user details and action items.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userName: {
      control: 'text',
      description: 'Name of the user',
    },
    userRole: {
      control: 'text', 
      description: 'Role or position of the user',
    },
    userLocation: {
      control: 'text',
      description: 'Location or department of the user',
    },
    userBadge: {
      control: 'text',
      description: 'Badge or status of the user',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the dropdown menu is open',
    },
    onToggle: {
      action: 'toggled',
      description: 'Callback fired when profile is clicked to toggle dropdown',
    },
    onMenuItemClick: {
      action: 'menu-item-clicked',
      description: 'Callback fired when a menu item is clicked',
    },
  },
} satisfies Meta<typeof UserProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive example with state management
const InteractiveUserProfile = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '40px', backgroundColor: '#F8F8F9', minHeight: '500px' }}>
      <UserProfile
        {...args}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        onMenuItemClick={(item) => {
          console.log('Menu item clicked:', item);
          args.onMenuItemClick(item);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    userName: 'Santosh Kumar',
    userRole: 'Dispatch Manager',
    userLocation: 'SPD-Santoshnagar',
    userBadge: 'Admin',
    isOpen: false,
  },
};

export const Open: Story = {
  args: {
    userName: 'Santosh Kumar',
    userRole: 'Dispatch Manager', 
    userLocation: 'SPD-Santoshnagar',
    userBadge: 'Admin',
    isOpen: true,
  },
};

export const Interactive: Story = {
  render: InteractiveUserProfile,
  args: {
    userName: 'Santosh Kumar',
    userRole: 'Dispatch Manager',
    userLocation: 'SPD-Santoshnagar', 
    userBadge: 'Admin',
  },
};

export const DifferentUser: Story = {
  args: {
    userName: 'Priya Sharma',
    userRole: 'Fleet Manager',
    userLocation: 'HYD-Headquarters',
    userBadge: 'Manager',
    isOpen: true,
  },
};

export const SuperAdmin: Story = {
  args: {
    userName: 'Rajesh Gupta',
    userRole: 'System Administrator',
    userLocation: 'MUM-Central',
    userBadge: 'Super Admin',
    isOpen: true,
  },
}; 