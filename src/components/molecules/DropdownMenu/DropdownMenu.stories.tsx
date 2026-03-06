import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DropdownMenu, DropdownMenuList, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuSearch } from './index';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A dropdown menu component for displaying lists of actions or options. Supports search, grouping, and custom item prefixes.',
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
      baseStory: 'ExplorerBase',
      behavior: 'anchored' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { property: 'default', withSearch: false, withLabels: false, itemStates: false } },
            { id: 'with-search', label: 'With Search', story: 'ExplorerBase', args: { property: 'search', withSearch: true, withLabels: false } },
            { id: 'with-labels', label: 'With Labels', story: 'ExplorerBase', args: { property: 'default', withLabels: true } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { itemStates: true } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
  argTypes: {
    property: {
      control: 'select',
      options: ['default', 'search', 'search-segmented', 'disabled-info', 'groups'],
      description: 'Dropdown menu variant',
    },
    showScrollBar: {
      control: 'boolean',
      description: 'Show scroll bar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const ExplorerBase: Story = {
  render: (args: any) => (
    <div className="p-6">
      <DropdownMenu property={args.property ?? 'default'} glass={args.glass}>
        {args.withSearch ? <DropdownMenuSearch /> : null}
        <DropdownMenuList>
          {args.withLabels ? <DropdownMenuLabel>Section 1</DropdownMenuLabel> : null}
          <DropdownMenuItem value="1" state={args.itemStates ? 'default' : 'default'}>Option 1</DropdownMenuItem>
          <DropdownMenuItem value="2" state={args.itemStates ? 'selected' : 'default'}>Option 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          {args.withLabels ? <DropdownMenuLabel>Section 2</DropdownMenuLabel> : null}
          <DropdownMenuItem value="3" state={args.itemStates ? 'hover' : 'default'}>Option 3</DropdownMenuItem>
          {args.itemStates ? <DropdownMenuItem value="4" state="disabled">Disabled</DropdownMenuItem> : null}
        </DropdownMenuList>
      </DropdownMenu>
    </div>
  ),
};

// Composable API Examples (Recommended)
export const Default: Story = {
  render: () => (
    <div className="p-6">
      <DropdownMenu property="default">
        <DropdownMenuList>
          <DropdownMenuItem value="1" state="default">Option 1</DropdownMenuItem>
          <DropdownMenuItem value="2" state="default">Option 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem value="3" state="default">Option 3</DropdownMenuItem>
        </DropdownMenuList>
      </DropdownMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '✅ **Composable API**: Use DropdownMenuList, DropdownMenuItem, and DropdownMenuSeparator sub-components for flexible dropdown composition.',
      },
    },
  },
};

export const WithSearch: Story = {
  render: () => (
    <div className="p-6">
      <DropdownMenu property="search">
        <DropdownMenuSearch />
        <DropdownMenuList>
          <DropdownMenuItem value="1" state="default">All Groups</DropdownMenuItem>
          <DropdownMenuItem value="2" state="default">Group 1</DropdownMenuItem>
          <DropdownMenuItem value="3" state="default">Group 2</DropdownMenuItem>
        </DropdownMenuList>
      </DropdownMenu>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use DropdownMenuSearch for searchable dropdowns.',
      },
    },
  },
};

export const DocsWithLabels: Story = {
  render: () => (
    <div className="p-6">
      <DropdownMenu property="default">
        <DropdownMenuList>
          <DropdownMenuLabel>Section 1</DropdownMenuLabel>
          <DropdownMenuItem value="1" state="default">Option 1</DropdownMenuItem>
          <DropdownMenuItem value="2" state="default">Option 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Section 2</DropdownMenuLabel>
          <DropdownMenuItem value="3" state="default">Option 3</DropdownMenuItem>
        </DropdownMenuList>
      </DropdownMenu>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'Use DropdownMenuLabel for grouped menu items.',
      },
    },
  },
};

export const DocsVariants: Story = {
  render: () => (
    <div className="flex gap-6 p-6">
      <div>
        <p className="text-sm font-medium mb-2">Default</p>
        <DropdownMenu property="default">
          <DropdownMenuList>
            <DropdownMenuItem value="1" state="default">Option 1</DropdownMenuItem>
            <DropdownMenuItem value="2" state="default">Option 2</DropdownMenuItem>
          </DropdownMenuList>
        </DropdownMenu>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With Search</p>
        <DropdownMenu property="search">
          <DropdownMenuSearch />
          <DropdownMenuList>
            <DropdownMenuItem value="1" state="default">Option 1</DropdownMenuItem>
            <DropdownMenuItem value="2" state="default">Option 2</DropdownMenuItem>
          </DropdownMenuList>
        </DropdownMenu>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With Groups</p>
        <DropdownMenu property="default">
          <DropdownMenuList>
            <DropdownMenuLabel>Group A</DropdownMenuLabel>
            <DropdownMenuItem value="1" state="default">Item 1</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Group B</DropdownMenuLabel>
            <DropdownMenuItem value="2" state="default">Item 2</DropdownMenuItem>
          </DropdownMenuList>
        </DropdownMenu>
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}