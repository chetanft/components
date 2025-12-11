import type { Meta, StoryObj } from '@storybook/react';
import { AppHeaderNavigation } from './AppHeaderWithNavigation';
import { NavigationPopover } from '../NavigationPopover/NavigationPopover';

const meta: Meta<typeof AppHeaderNavigation> = {
  title: 'Organisms/AppHeaderNavigation',
  component: AppHeaderNavigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AppHeaderNavigation>;

/**
 * Basic avatar button that opens a navigation popover with user menu
 */
export const Basic: Story = {
  args: {
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://api.github.com/users/octocat.png',
    },
    navigationSections: (
      <>
        <NavigationPopover.Section id="profile" label="Profile" icon="user">
          <NavigationPopover.SubCategory
            items={[
              { label: 'View Profile', icon: 'profile' },
              { label: 'Settings', icon: 'settings' },
            ]}
          />
        </NavigationPopover.Section>
        <NavigationPopover.Section id="help" label="Help" icon="help-circle">
          <NavigationPopover.SubCategory
            items={[
              { label: 'Documentation', icon: 'book' },
              { label: 'Support', icon: 'mail' },
            ]}
          />
        </NavigationPopover.Section>
      </>
    ),
  },
};

/**
 * With notification badge showing unread count
 */
export const WithNotifications: Story = {
  args: {
    ...Basic.args,
    notificationCount: 3,
  },
};

/**
 * With many notifications (shows 99+)
 */
export const WithManyNotifications: Story = {
  args: {
    ...Basic.args,
    notificationCount: 150,
  },
};

/**
 * Without avatar image, showing initials
 */
export const WithInitials: Story = {
  args: {
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    navigationSections: (
      <>
        <NavigationPopover.Section id="account" label="Account" icon="user">
          <NavigationPopover.SubCategory
            items={[
              { label: 'My Account', icon: 'settings' },
              { label: 'Billing', icon: 'credit-card' },
            ]}
          />
        </NavigationPopover.Section>
      </>
    ),
  },
};

/**
 * Full-featured user menu with sections and callbacks
 */
export const FullFeatured: Story = {
  args: {
    user: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: 'https://api.github.com/users/gvanrossum.png',
    },
    notificationCount: 5,
    navigationSections: (
      <>
        {/* Account Section */}
        <NavigationPopover.Section
          id="account"
          label="My Account"
          icon="user"
          hero={{
            title: 'Sarah Johnson',
            description: 'sarah@example.com',
            illustrationVariant: 'user',
          }}
        >
          <NavigationPopover.SubCategory
            items={[
              { label: 'Profile Settings', icon: 'settings' },
              { label: 'Security Settings', icon: 'shield' },
              { label: 'Privacy', icon: 'lock' },
            ]}
          />
        </NavigationPopover.Section>

        {/* Workspace Section */}
        <NavigationPopover.Section
          id="workspace"
          label="Workspace"
          icon="briefcase"
        >
          <NavigationPopover.SubCategory
            title="Current"
            items={[
              { label: 'My Workspace', icon: 'folder', status: 'active' },
              { label: 'Switch Workspace', icon: 'arrow-right' },
            ]}
          />
          <NavigationPopover.SubCategory
            title="Team"
            items={[
              { label: 'Manage Team', icon: 'users' },
              { label: 'Invite Members', icon: 'user-plus' },
            ]}
          />
        </NavigationPopover.Section>

        {/* Notifications Section */}
        <NavigationPopover.Section
          id="notifications"
          label="Notifications"
          icon="bell"
        >
          <NavigationPopover.SubCategory
            items={[
              { label: 'Notification Settings', icon: 'settings' },
              { label: 'Email Preferences', icon: 'mail' },
            ]}
          />
        </NavigationPopover.Section>

        {/* Help Section */}
        <NavigationPopover.Section id="help" label="Help & Support" icon="help-circle">
          <NavigationPopover.SubCategory
            items={[
              { label: 'Documentation', icon: 'book' },
              { label: 'API Reference', icon: 'code' },
              { label: 'Contact Support', icon: 'mail' },
              { label: 'Report Issue', icon: 'alert-circle' },
            ]}
          />
        </NavigationPopover.Section>

        {/* Footer with logout */}
        <div className="border-t border-[var(--border-primary)] p-3">
          <button className="w-full px-3 py-2 text-sm font-medium text-[var(--critical)] hover:bg-[var(--bg-secondary)] rounded transition-colors">
            Sign Out
          </button>
        </div>
      </>
    ),
    onNavigationOpen: () => console.log('Navigation opened'),
    onNavigationClose: () => console.log('Navigation closed'),
  },
};

/**
 * With custom className for styling
 */
export const CustomStyling: Story = {
  args: {
    user: {
      name: 'Alex Chen',
      email: 'alex@example.com',
    },
    navigationSections: (
      <>
        <NavigationPopover.Section id="quick" label="Quick Links" icon="star">
          <NavigationPopover.SubCategory
            items={[
              { label: 'Favorites', icon: 'star' },
              { label: 'Recent', icon: 'history' },
            ]}
          />
        </NavigationPopover.Section>
      </>
    ),
    className: 'ml-auto',
  },
};
