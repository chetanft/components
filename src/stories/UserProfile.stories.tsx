import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../components/organisms/UserProfile';
import { UserProfileDropdown } from '../components/organisms/UserProfileDropdown';

const meta = {
  title: 'Components/UserProfile',
  component: UserProfile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A user profile trigger component that pairs with the `UserProfileDropdown` for expanded actions.',
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
    companyName: {
      control: 'boolean',
      description: 'Show company logo alongside avatar',
    },
    onClick: {
      action: 'clicked',
      description: 'Triggered when the profile trigger is clicked',
    },
  },
} satisfies Meta<typeof UserProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive example with state management
const InteractiveUserProfile = (args: React.ComponentProps<typeof UserProfile>) => {
  const [isOpen, setIsOpen] = useState(false);
  const userProfileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (userProfileRef.current && !userProfileRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Also close on Escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div style={{ padding: 'calc(var(--spacing-x10) * 1.25)', backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(var(--spacing-x10) * 15.625)' }}>
      <div ref={userProfileRef} style={{ position: 'relative', display: 'inline-flex', width: 'fit-content' }}>
        <UserProfile
          {...args}
          onClick={() => {
            setIsOpen(!isOpen);
            if (args.onClick) {
              args.onClick();
            }
          }}
        />
        <UserProfileDropdown
          userName={args.userName}
          userRole={args.userRole}
          userLocation={args.userLocation}
          userBadge={args.userBadge}
          userAvatar={args.userAvatar}
          isOpen={isOpen}
          onMenuItemClick={(item: string) => {
            console.log('Menu item clicked:', item);
            setIsOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    userName: 'Santosh Kumar',
    userRole: 'Dispatch Manager',
    userLocation: 'SPD-Santoshnagar',
    userBadge: 'Admin',
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
  },
};

export const SuperAdmin: Story = {
  args: {
    userName: 'Rajesh Gupta',
    userRole: 'System Administrator',
    userLocation: 'MUM-Central',
    userBadge: 'Super Admin',
  },
};

export const AvatarOnly: Story = {
  args: {
    userName: 'Mobile User',
    userRole: 'Ops',
    userLocation: 'Remote',
    userBadge: 'Viewer',
    companyName: false,
  },
}; 