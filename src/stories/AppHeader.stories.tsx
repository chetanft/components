import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import React from 'react';
import { AppHeader } from '../components/organisms/AppHeader';

type AppHeaderStoryArgs = React.ComponentProps<typeof AppHeader> & {
  showGlassToggle?: boolean;
  showExpandButton?: boolean;
  isExpanded?: boolean;
  onExpandToggle?: (isExpanded: boolean) => void;
};

const AppHeaderStoryComponent = AppHeader as unknown as React.ComponentType<AppHeaderStoryArgs>;

const meta: Meta<AppHeaderStoryArgs> = {
  title: 'Organisms/AppHeader',
  component: AppHeaderStoryComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Application header component with FreightTiger logo on the left, notifications, and user profile.',
      },
    },
    explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                  },
                                                                                                                                                                                                },
      mode: 'matrix' as const,
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'branding',
          label: 'Branding',
          scenarios: [
            { id: 'default', label: 'Tata Motors', story: 'Default' },
            { id: 'ft', label: 'FreightTiger', story: 'WithFTCompany' },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'theme-on', label: 'Theme On', story: 'Default', args: { showThemeIcon: true } },
            { id: 'theme-off', label: 'Theme Off', story: 'Default', args: { showThemeIcon: false } },
            { id: 'glass-on', label: 'Glass On', story: 'GlassAndExpand', args: { showGlassToggle: true } },
            { id: 'glass-off', label: 'Glass Off', story: 'Default', args: { showGlassToggle: false } },
            { id: 'expanded', label: 'Expanded', story: 'GlassAndExpand', args: { showExpandButton: true, isExpanded: true } },
            { id: 'collapsed', label: 'Collapsed', story: 'GlassAndExpand', args: { showExpandButton: true, isExpanded: false } },
          ],
        },
      ],
      defaultRowId: 'branding',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn<AppHeaderStoryArgs>) => {
      const StoryComponent = Story as React.ComponentType<AppHeaderStoryArgs>;
      return (
        <div style={{ minHeight: 'calc(var(--spacing-x10) * 2.5)', backgroundColor: 'var(--bg-secondary)' }}>
          <StoryComponent />
        </div>
      );
    },
  ],
  argTypes: {
    user: {
      control: 'object',
      description: 'User information including name, role, location, and badge',
    },
    showThemeIcon: {
      control: 'boolean',
      description: 'Show theme action icon on the right side',
    },
    glass: {
      control: { type: 'select' },
      options: [false, true, 'subtle', 'prominent', 'liquid'],
      description: 'Glass morphism variant used by the header and its action controls.',
    },
    showGlassToggle: {
      control: 'boolean',
      description: 'Show the Glass tertiary control in the header actions.',
      table: {
        category: 'Upcoming controls',
      },
    },
    showExpandButton: {
      control: 'boolean',
      description: 'Show the expand/fullscreen control in the header actions.',
      table: {
        category: 'Upcoming controls',
      },
    },
    isExpanded: {
      control: 'boolean',
      description: 'Controls the expanded/fullscreen visual state for the expand button.',
      table: {
        category: 'Upcoming controls',
      },
    },
    onExpandToggle: {
      action: 'expand-toggle',
      description: 'Callback fired when the expand control is toggled.',
      table: {
        category: 'Upcoming controls',
      },
    },
  },
};

export default meta;
type Story = StoryObj<AppHeaderStoryArgs>;

const baseDesktopArgs: AppHeaderStoryArgs = {
  user: {
    name: 'Santosh Kumar',
    role: 'Dispatch Manager',
    location: 'SPD-Santoshnagar',
    badge: 'Admin',
  },
  userCompany: {
    name: 'tata-motors',
    displayName: 'Tata Motors',
  },
  showThemeIcon: true,
  showGlassToggle: true,
  showExpandButton: true,
  isExpanded: false,
};

// Default header
export const Default: Story = {
  args: baseDesktopArgs,
};

// With FT Company
export const WithFTCompany: Story = {
  args: {
    user: {
      name: 'Rahul Singh',
      role: 'Operations Manager',
      location: 'BLR-Tech Hub',
      badge: 'Senior',
    },
    userCompany: {
      name: 'ft',
      displayName: 'FreightTiger',
    },
    showThemeIcon: true,
    showGlassToggle: true,
    showExpandButton: true,
    isExpanded: false,
  },
};

// Operations Manager
export const OperationsManager: Story = {
  args: {
    user: {
      name: 'Demo User',
      role: 'Test Manager',
      location: 'TEST-Lab',
      badge: 'Tester',
    },
    userCompany: {
      name: 'tata-motors',
      displayName: 'Tata Motors',
    },
    showThemeIcon: true,
    showGlassToggle: true,
    showExpandButton: true,
    isExpanded: false,
  },
};

export const GlassAndExpand: Story = {
  name: 'Glass + Expand',
  args: {
    ...baseDesktopArgs,
    glass: true,
    showGlassToggle: true,
    showExpandButton: true,
    isExpanded: false,
  },
};

export const Expanded: Story = {
  name: 'Expanded',
  args: {
    ...baseDesktopArgs,
    glass: 'prominent',
    showGlassToggle: true,
    showExpandButton: true,
    isExpanded: true,
  },
};

export const DocsVariants: Story = {
  name: 'Variants',
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Default (Tata Motors)</p>
        <AppHeaderStoryComponent {...baseDesktopArgs} />
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Glass and expand controls</p>
        <AppHeaderStoryComponent
          {...baseDesktopArgs}
          glass="prominent"
          showGlassToggle={true}
          showExpandButton={true}
          isExpanded={true}
          user={{ name: 'Rahul Singh', role: 'Operations Manager', location: 'BLR-Tech Hub', badge: 'Senior' }}
          userCompany={{ name: 'ft', displayName: 'FreightTiger' }}
        />
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
};
