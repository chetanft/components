# Avatar Button with NavigationPopover Example

Click on avatar/icon to open a NavigationPopover menu.

## Basic Implementation

```tsx
"use client";
import React, { useState } from 'react';
import { NavigationPopover } from 'ft-design-system';
import { Avatar } from 'ft-design-system';

export function AvatarNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar Button - Click to open */}
      <button
        onClick={() => setOpen(true)}
        className="bg-[var(--bg-primary)] rounded-full p-4 flex items-center justify-center w-[54px] h-[54px] hover:opacity-80 transition-opacity cursor-pointer"
        aria-label="Open navigation menu"
      >
        {/* Avatar Image or Initials */}
        <Avatar
          fallback="JD"
          src="https://api.example.com/avatar"
          alt="User Avatar"
        />
      </button>

      {/* Navigation Popover */}
      <NavigationPopover
        open={open}
        onClose={() => setOpen(false)}
      >
        <NavigationPopover.Section
          id="profile"
          label="Profile"
          icon="user"
        >
          <NavigationPopover.SubCategory
            items={[
              { label: 'View Profile', icon: 'profile' },
              { label: 'Settings', icon: 'settings' },
              { label: 'Preferences', icon: 'sliders' },
            ]}
          />
        </NavigationPopover.Section>

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

        <NavigationPopover.Footer>
          <Button
            variant="text"
            onClick={() => {
              // Handle logout
              setOpen(false);
            }}
          >
            Logout
          </Button>
        </NavigationPopover.Footer>
      </NavigationPopover>
    </div>
  );
}
```

## With AppHeader Integration

```tsx
"use client";
import React, { useState } from 'react';
import { AppHeader, NavigationPopover, Avatar } from 'ft-design-system';

export function HeaderWithUserMenu() {
  const [open, setOpen] = useState(false);

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.example.com/avatar',
  };

  return (
    <>
      <AppHeader user={user}>
        {/* Avatar button in header - positioned right */}
        <button
          onClick={() => setOpen(true)}
          className="bg-[var(--bg-primary)] rounded-full p-4 flex items-center justify-center w-[54px] h-[54px] hover:opacity-80 transition-opacity cursor-pointer absolute right-4 top-1/2 -translate-y-1/2"
          aria-label="User menu"
        >
          <Avatar
            fallback={user.name.split(' ').map(n => n[0]).join('')}
            src={user.avatar}
            alt={user.name}
          />
        </button>
      </AppHeader>

      {/* User Navigation Menu */}
      <NavigationPopover
        open={open}
        onClose={() => setOpen(false)}
      >
        {/* Profile Section */}
        <NavigationPopover.Section
          id="profile"
          label="My Account"
          icon="user"
          hero={{
            title: user.name,
            description: user.email,
            illustrationVariant: 'user',
          }}
        >
          <NavigationPopover.SubCategory
            items={[
              { label: 'Profile Settings', icon: 'settings' },
              { label: 'Billing & Plans', icon: 'credit-card' },
              { label: 'Security', icon: 'shield' },
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
              { label: 'Report Issue', icon: 'alert-circle' },
            ]}
          />
        </NavigationPopover.Section>

        {/* Footer with Logout */}
        <NavigationPopover.Footer>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              // Handle logout logic
              setOpen(false);
            }}
          >
            Sign Out
          </Button>
        </NavigationPopover.Footer>
      </NavigationPopover>
    </>
  );
}
```

## Styled Variant with Icon Badge

```tsx
"use client";
import React, { useState } from 'react';
import { NavigationPopover, Badge, Icon } from 'ft-design-system';

export function AvatarWithBadge() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Avatar with notification badge */}
      <button
        onClick={() => setOpen(true)}
        className="relative bg-[var(--bg-primary)] rounded-full p-4 flex items-center justify-center w-[54px] h-[54px] hover:opacity-80 transition-all hover:shadow-lg cursor-pointer"
        aria-label="User menu"
      >
        <Icon name="user" size={24} />
        
        {/* Notification badge */}
        <Badge
          variant="danger"
          className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
        >
          3
        </Badge>
      </button>

      {/* Popover */}
      <NavigationPopover
        open={open}
        onClose={() => setOpen(false)}
      >
        {/* Notifications Section */}
        <NavigationPopover.Section
          id="notifications"
          label="Notifications (3)"
          icon="bell"
        >
          <NavigationPopover.SubCategory
            items={[
              { label: 'Unread message from Sarah', icon: 'mail', status: 'active' },
              { label: 'Project update from team', icon: 'folder' },
              { label: 'Weekly digest ready', icon: 'calendar' },
            ]}
          />
        </NavigationPopover.Section>
      </NavigationPopover>
    </div>
  );
}
```

## Key Props

### Button Props
```tsx
// Container button
<button
  onClick={() => setOpen(true)}
  className="bg-[var(--bg-primary)] rounded-full p-4 w-[54px] h-[54px]"
/>
```

### NavigationPopover Props
```tsx
interface NavigationPopoverProps {
  open?: boolean;              // Control visibility
  onClose?: () => void;        // Called when closed
  children?: React.ReactNode;  // Navigation sections
}
```

### NavigationPopover.Section Props
```tsx
interface NavigationSectionProps {
  id: string;                              // Unique identifier
  label: string;                           // Section title
  icon: IconName;                          // Icon to display
  hero?: NavigationSectionHero;           // Optional hero content
  children?: React.ReactNode;             // Sub-categories
}
```

### NavigationPopover.SubCategory Props
```tsx
interface NavigationSectionSubCategory {
  title?: string;                          // Optional category title
  items: NavigationSectionSubCategoryItem[];
}

interface NavigationSectionSubCategoryItem {
  label: string;                           // Item text
  icon?: IconName;                         // Optional icon
  description?: string;                    // Optional description
  disabled?: boolean;                      // Disable item
  status?: 'active';                       // Mark as active
}
```

## Styling

Use CSS variables from the design system:

```tsx
// Background
bg-[var(--bg-primary)]        // Primary background
bg-[var(--bg-secondary)]      // Secondary background

// Colors
hover:opacity-80
hover:shadow-lg
transition-opacity
transition-all

// Size
w-[54px] h-[54px]             // Avatar size
p-4                            // Padding
rounded-full                   // Circle shape
```

## Icons Available

Common icons for navigation:
- `user` - Profile
- `settings` - Settings
- `briefcase` - Workspace
- `help-circle` - Help
- `bell` - Notifications
- `mail` - Messages
- `shield` - Security
- `book` - Documentation
- `credit-card` - Billing
- `alert-circle` - Alerts
- `folder` - Folders
- `users` - Team

## Positioning

### Fixed Header (Right Corner)
```tsx
className="absolute right-4 top-1/2 -translate-y-1/2"
```

### Inline (Next to Content)
```tsx
className="ml-4"
```

### With Dropdown Alignment
```tsx
// NavigationPopover auto-positions relative to trigger button
// Closes when clicking outside
```

## Events

```tsx
<button onClick={() => setOpen(true)}>
  Open Menu
</button>

<NavigationPopover
  open={open}
  onClose={() => setOpen(false)}
>
  {/* Sections... */}
</NavigationPopover>
```

## AI-Protected Import

```tsx
// For AI coding assistants
import {
  NavigationPopover,
  Avatar,
  Badge,
  Button,
} from 'ft-design-system/ai';
```

## See Also

- `NavigationMenu` - For horizontal navigation
- `NavigationLauncher` - For launching navigation from a trigger
- `Avatar` - User avatar component
- `AppHeader` - Full header component
