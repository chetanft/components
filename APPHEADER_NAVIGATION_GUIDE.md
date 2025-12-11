# AppHeaderNavigation Implementation Guide

A production-ready avatar button component that opens a NavigationPopover with user menu.

## Features

✅ **Click to Open** - Click avatar to open navigation menu  
✅ **Click Outside to Close** - Closes when clicking outside  
✅ **Escape Key Support** - Press ESC to close menu  
✅ **Notification Badge** - Shows unread count with 99+ overflow  
✅ **Avatar Support** - Image URL or initials fallback  
✅ **Accessible** - ARIA labels and keyboard navigation  
✅ **Focus Visible** - Visual focus ring for keyboard users  

## Basic Usage

```tsx
"use client";
import { AppHeaderNavigation } from 'ft-design-system/ai';
import { NavigationPopover } from 'ft-design-system/ai';

export function MyAppHeader() {
  return (
    <AppHeaderNavigation
      user={{
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://api.example.com/avatar.jpg',
      }}
      navigationSections={
        <>
          <NavigationPopover.Section
            id="profile"
            label="Profile"
            icon="user"
          >
            <NavigationPopover.SubCategory
              items={[
                { label: 'Settings', icon: 'settings' },
                { label: 'Logout', icon: 'logout' },
              ]}
            />
          </NavigationPopover.Section>
        </>
      }
    />
  );
}
```

## With Notifications

```tsx
<AppHeaderNavigation
  user={{
    name: 'John Doe',
    email: 'john@example.com',
  }}
  notificationCount={3}  // Shows badge with count
  navigationSections={
    <>
      <NavigationPopover.Section
        id="notifications"
        label="Notifications"
        icon="bell"
      >
        <NavigationPopover.SubCategory
          items={[
            { label: 'You have 3 unread messages', icon: 'mail' },
            { label: 'Team updated project', icon: 'folder' },
          ]}
        />
      </NavigationPopover.Section>
    </>
  }
/>
```

## With Multiple Sections

```tsx
<AppHeaderNavigation
  user={{ name: 'Sarah Johnson', email: 'sarah@example.com' }}
  notificationCount={5}
  navigationSections={
    <>
      {/* Profile Section */}
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
            { label: 'Security', icon: 'shield' },
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
          items={[
            { label: 'Switch Workspace', icon: 'folder' },
            { label: 'Manage Team', icon: 'users' },
          ]}
        />
      </NavigationPopover.Section>

      {/* Help Section */}
      <NavigationPopover.Section
        id="help"
        label="Help & Support"
        icon="help-circle"
      >
        <NavigationPopover.SubCategory
          items={[
            { label: 'Documentation', icon: 'book' },
            { label: 'Contact Support', icon: 'mail' },
          ]}
        />
      </NavigationPopover.Section>

      {/* Logout */}
      <div className="border-t border-[var(--border-primary)] p-3">
        <button className="w-full px-3 py-2 text-sm text-[var(--critical)] hover:bg-[var(--bg-secondary)] rounded">
          Sign Out
        </button>
      </div>
    </>
  }
  onNavigationOpen={() => console.log('Menu opened')}
  onNavigationClose={() => console.log('Menu closed')}
/>
```

## Props Reference

```tsx
interface AppHeaderNavigationProps {
  // Required: User info
  user: {
    name: string;              // Display name
    avatar?: string;            // Avatar image URL
    email?: string;             // User email
  };

  // Optional: Navigation content
  navigationSections?: React.ReactNode;  // NavigationPopover.Section components

  // Optional: Callbacks
  onNavigationOpen?: () => void;
  onNavigationClose?: () => void;

  // Optional: UI customization
  notificationCount?: number;   // Badge count (shows 99+ if > 99)
  className?: string;           // Additional container classes
}
```

## Avatar Variants

### With Image
```tsx
<AppHeaderNavigation
  user={{
    name: 'John Doe',
    avatar: 'https://api.example.com/avatar.jpg',
  }}
/>
```

### With Initials (No Image)
```tsx
<AppHeaderNavigation
  user={{
    name: 'John Doe',  // Shows "JD"
  }}
/>
```

### Different Name Initials
```tsx
<AppHeaderNavigation
  user={{
    name: 'Alexander Benjamin',  // Shows "AB"
  }}
/>
```

## Notification Badge

```tsx
// Shows "3"
<AppHeaderNavigation notificationCount={3} />

// Shows "99+" (any number > 99)
<AppHeaderNavigation notificationCount={150} />

// No badge (0 or undefined)
<AppHeaderNavigation notificationCount={0} />
<AppHeaderNavigation />
```

## Integration with AppHeader

Place AppHeaderNavigation inside your layout or header:

```tsx
"use client";
import { AppHeader, AppHeaderNavigation } from 'ft-design-system/ai';
import { NavigationPopover } from 'ft-design-system/ai';

export function Layout() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  return (
    <header className="flex items-center justify-between bg-white shadow">
      <div className="p-4">
        <h1>App Name</h1>
      </div>

      {/* User menu on the right */}
      <AppHeaderNavigation
        user={user}
        notificationCount={3}
        navigationSections={
          <>
            <NavigationPopover.Section
              id="profile"
              label="Profile"
              icon="user"
            >
              <NavigationPopover.SubCategory
                items={[
                  { label: 'Settings', icon: 'settings' },
                  { label: 'Logout', icon: 'logout' },
                ]}
              />
            </NavigationPopover.Section>
          </>
        }
        className="mr-4"
      />
    </header>
  );
}
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Enter/Space** | Open popover when focused on button |
| **Escape** | Close popover |
| **Tab** | Navigate through menu items |
| **Click Outside** | Close popover |

## Styling

### Default Button Style
- Background: `bg-[var(--bg-primary)]`
- Size: `54px × 54px`
- Shape: `rounded-full`
- Hover: `opacity-80 shadow-lg`

### Custom Styling
```tsx
<AppHeaderNavigation
  user={user}
  className="mr-4 ml-auto"  // Position on right, auto margin left
/>
```

### Notification Badge
- Variant: `danger` (red)
- Position: Top-right corner
- Format: Shows count or "99+"
- Size: 20px × 20px

## Events

```tsx
<AppHeaderNavigation
  user={user}
  onNavigationOpen={() => {
    console.log('User menu opened');
    // Track analytics
    analytics.track('user_menu_opened');
  }}
  onNavigationClose={() => {
    console.log('User menu closed');
    // Update UI state
  }}
/>
```

## Accessibility

- ✅ ARIA labels on button
- ✅ Focus visible ring
- ✅ Keyboard support (Tab, Escape, Enter/Space)
- ✅ Click outside closes
- ✅ Avatar alt text
- ✅ Semantic HTML

## AI-Protected Import

```tsx
// Recommended for AI coding assistants
import {
  AppHeaderNavigation,
  NavigationPopover,
} from 'ft-design-system/ai';
```

## See Also

- `NavigationPopover` - Full navigation menu component
- `Avatar` - Avatar display component
- `Badge` - Badge component for notifications
- `AppHeader` - Full app header with logo and navigation

## Examples in Storybook

See `AppHeaderNavigation.stories.tsx` for:
- Basic usage
- With notifications
- With many notifications (99+)
- With initials (no avatar)
- Full-featured menu
- Custom styling
