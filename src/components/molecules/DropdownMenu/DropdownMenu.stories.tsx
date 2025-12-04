import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DropdownMenu, DropdownMenuList, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuSearch } from './index';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'DropdownMenu component built from Figma designs with support for various states, prefixes, and layouts.',
      },
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

// Composable API Examples (Recommended)
export const ComposableBasic: Story = {
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

export const ComposableWithSearch: Story = {
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

export const ComposableWithLabels: Story = {
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
    docs: {
      description: {
        story: 'Use DropdownMenuLabel for grouped menu items.',
      },
    },
  },
};

// Mark deprecated examples
export const Default: Story = {
  args: {
    property: 'default',
    options: [
      { value: '1', label: 'Dropdown menu', state: 'default' },
      { value: '2', label: 'Dropdown menu', state: 'default' },
      { value: '3', label: 'Dropdown menu', state: 'default' },
      { value: '4', label: 'Dropdown menu', state: 'default' },
      { value: '5', label: 'Dropdown menu', state: 'default' },
      { value: '6', label: 'Dropdown menu', state: 'default' },
      { value: '7', label: 'Dropdown menu', state: 'default' },
      { value: '8', label: 'Dropdown menu', state: 'default' },
      { value: '9', label: 'Dropdown menu', state: 'default' },
      { value: '10', label: 'Dropdown menu', state: 'default' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '⚠️ **Deprecated**: This uses the deprecated `options` prop. Use the composable API with DropdownMenuList and DropdownMenuItem instead.',
      },
    },
  },
};

export const WithScrollBar: Story = {
  args: {
    property: 'default',
    showScrollBar: true,
    options: [
      { value: '1', label: 'Dropdown menu', state: 'default' },
      { value: '2', label: 'Dropdown menu', state: 'default' },
      { value: '3', label: 'Dropdown menu', state: 'default' },
      { value: '4', label: 'Dropdown menu', state: 'default' },
      { value: '5', label: 'Dropdown menu', state: 'default' },
      { value: '6', label: 'Dropdown menu', state: 'default' },
      { value: '7', label: 'Dropdown menu', state: 'default' },
      { value: '8', label: 'Dropdown menu', state: 'default' },
      { value: '9', label: 'Dropdown menu', state: 'default' },
      { value: '10', label: 'Dropdown menu', state: 'default' },
    ],
  },
};

export const WithSearch: Story = {
  args: {
    property: 'search',
    options: [
      { value: 'all', label: 'All Groups' },
      { value: '1', label: 'Group 1' },
      { value: '2', label: 'Group 2' },
      { value: '3', label: 'Group 3' },
      { value: '4', label: 'Group 4' },
    ],
  },
};

export const WithSearchAndSegments: Story = {
  args: {
    property: 'search-segmented',
    segments: [
      { label: 'Group', value: 'group' },
      { label: 'Branch', value: 'branch' },
    ],
    selectedSegment: 'group',
    options: [
      { value: 'all', label: 'All Groups' },
      { value: '1', label: 'Group 1' },
      { value: '2', label: 'Group 2' },
      { value: '3', label: 'Group 3' },
      { value: '4', label: 'Group 4' },
    ],
  },
};

export const WithGroups: Story = {
  args: {
    property: 'groups',
    options: [
      { value: '1', label: 'Dropdown menu', prefix: 'icon', iconName: 'data-stack', group: 'Group 1' },
      { value: '2', label: 'Dropdown menu', prefix: 'icon', iconName: 'data-stack', group: 'Group 1' },
      { value: '3', label: 'Dropdown menu', prefix: 'icon', iconName: 'data-stack', group: 'Group 1' },
      { value: '4', label: 'Dropdown menu', prefix: 'icon', iconName: 'data-stack', group: 'Group 2' },
    ],
  },
};

export const DisabledWithInfo: Story = {
  args: {
    property: 'disabled-info',
    options: [
      { value: '1', label: 'Dropdown menu', prefix: 'icon', iconName: 'data-stack', state: 'disabled' },
      { value: '2', label: 'Dropdown menu', prefix: 'icon', iconName: 'data-stack', state: 'disabled' },
      { value: '3', label: 'Dropdown menu', prefix: 'icon', iconName: 'data-stack', state: 'disabled' },
      { value: '4', label: 'Dropdown menu', prefix: 'icon', iconName: 'data-stack', state: 'disabled' },
      { value: '5', label: 'Dropdown menu', prefix: 'icon', iconName: 'data-stack', state: 'disabled' },
    ],
  },
};

export const MenuItemDefault: StoryObj<typeof DropdownMenuItem> = {
  render: () => <DropdownMenuItem state="default" label="Dropdown menu" />, 
};

export const MenuItemSelected: StoryObj<typeof DropdownMenuItem> = {
  render: () => (
    <DropdownMenuItem state="selected" label="Dropdown menu" showCheckmark />
  ),
};

export const MenuItemHover: StoryObj<typeof DropdownMenuItem> = {
  render: () => <DropdownMenuItem state="hover" label="Dropdown menu" />,
};

export const MenuItemFocused: StoryObj<typeof DropdownMenuItem> = {
  render: () => <DropdownMenuItem state="focused" label="Dropdown menu" />,
};

export const MenuItemDisabled: StoryObj<typeof DropdownMenuItem> = {
  render: () => <DropdownMenuItem state="disabled" label="Dropdown menu" />,
};

export const MenuItemWithCheckbox: StoryObj<typeof DropdownMenuItem> = {
  render: () => (
    <DropdownMenuItem
      state="selected"
      prefix="checkbox"
      label="Dropdown menu"
    />
  ),
};

export const MenuItemWithRadio: StoryObj<typeof DropdownMenuItem> = {
  render: () => (
    <DropdownMenuItem state="selected" prefix="radio" label="Dropdown menu" />
  ),
};

export const MenuItemWithIcon: StoryObj<typeof DropdownMenuItem> = {
  render: () => (
    <DropdownMenuItem
      state="default"
      prefix="icon"
      iconName="data-stack"
      label="Dropdown menu"
    />
  ),
};

export const MenuItemWithSuffix: StoryObj<typeof DropdownMenuItem> = {
  render: () => (
    <DropdownMenuItem
      state="default"
      suffix={true}
      label="Dropdown menu"
    />
  ),
};

export const MenuItemInfo: StoryObj<typeof DropdownMenuItem> = {
  render: () => (
    <DropdownMenuItem state="info" label="Select rows first to use bulk actions" />
  ),
};
