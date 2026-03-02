import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownContent } from './index';
import { DropdownMenu } from '../DropdownMenu';

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Dropdown component for selecting from a list of options with support for search and segments.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      baseStory: 'ExplorerBase',
      behavior: 'anchored' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { explorerMode: 'default' } },
            { id: 'with-search', label: 'Searchable', story: 'ExplorerBase', args: { explorerMode: 'search' } },
            { id: 'with-groups', label: 'Grouped', story: 'ExplorerBase', args: { explorerMode: 'groups' } },
            { id: 'with-label', label: 'With Label', story: 'ExplorerBase', args: { explorerMode: 'label' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { state: 'default' } },
            { id: 'error', label: 'Error', story: 'ExplorerBase', args: { state: 'error' } },
            { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { state: 'disabled' } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'search'],
      description: 'Dropdown type',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'disabled'],
      description: 'Dropdown state',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Dropdown size',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const [value, setValue] = React.useState<string | number>();
    const [searchQuery, setSearchQuery] = React.useState('');
    const mode = args.explorerMode ?? 'default';
    const state = args.state ?? 'default';

    const dropdown = (
      <Dropdown
        value={value}
        onChange={setValue}
        type={mode === 'search' ? 'search' : mode === 'groups' ? 'groups' : 'default'}
        state={state}
        placeholder={
          state === 'disabled'
            ? 'Cannot select'
            : mode === 'search'
              ? 'Search options...'
              : mode === 'label'
                ? 'Choose...'
                : mode === 'groups'
                  ? 'Select a fruit'
                  : 'Select an option'
        }
        onSearch={mode === 'search' ? setSearchQuery : undefined}
      >
        <DropdownTrigger />
        <DropdownContent>
          <DropdownMenu>
            {mode === 'groups' ? (
              <>
                <DropdownMenu.DropdownMenuLabel>Fruits</DropdownMenu.DropdownMenuLabel>
                <DropdownMenu.DropdownMenuItem value="apple">Apple</DropdownMenu.DropdownMenuItem>
                <DropdownMenu.DropdownMenuItem value="banana">Banana</DropdownMenu.DropdownMenuItem>
                <DropdownMenu.DropdownMenuSeparator />
                <DropdownMenu.DropdownMenuLabel>Vegetables</DropdownMenu.DropdownMenuLabel>
                <DropdownMenu.DropdownMenuItem value="carrot">Carrot</DropdownMenu.DropdownMenuItem>
                <DropdownMenu.DropdownMenuItem value="broccoli">Broccoli</DropdownMenu.DropdownMenuItem>
              </>
            ) : (
              <>
                {(mode === 'search'
                  ? ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'].filter((option) =>
                      option.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                  : ['Option 1', 'Option 2', 'Option 3']
                ).map((option) => (
                  <DropdownMenu.DropdownMenuItem key={option} value={option.toLowerCase()}>
                    {option}
                  </DropdownMenu.DropdownMenuItem>
                ))}
              </>
            )}
          </DropdownMenu>
        </DropdownContent>
      </Dropdown>
    );

    return mode === 'label' ? (
      <div className="space-y-2">
        <label className="block text-sm font-medium">Select an Option</label>
        {dropdown}
      </div>
    ) : (
      dropdown
    );
  },
};

// Composable API Examples
function DefaultComponent() {
  const [value, setValue] = useState<string | number>();
  return (
    <Dropdown value={value} onChange={setValue} placeholder="Select an option">
      <DropdownTrigger />
      <DropdownContent>
        <DropdownMenu>
          <DropdownMenu.DropdownMenuItem value="option1">Option 1</DropdownMenu.DropdownMenuItem>
          <DropdownMenu.DropdownMenuItem value="option2">Option 2</DropdownMenu.DropdownMenuItem>
          <DropdownMenu.DropdownMenuItem value="option3">Option 3</DropdownMenu.DropdownMenuItem>
        </DropdownMenu>
      </DropdownContent>
    </Dropdown>
  );
}

export const Default: Story = {
  render: () => <DefaultComponent />,
};

function WithLabelComponent() {
  const [value, setValue] = useState<string | number>();
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Select an Option</label>
      <Dropdown value={value} onChange={setValue} placeholder="Choose...">
        <DropdownTrigger />
        <DropdownContent>
          <DropdownMenu>
            <DropdownMenu.DropdownMenuItem value="apple">Apple</DropdownMenu.DropdownMenuItem>
            <DropdownMenu.DropdownMenuItem value="banana">Banana</DropdownMenu.DropdownMenuItem>
            <DropdownMenu.DropdownMenuItem value="cherry">Cherry</DropdownMenu.DropdownMenuItem>
          </DropdownMenu>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}

export const DocsWithLabel: Story = {
  render: () => <WithLabelComponent />,

  parameters: { docsOnly: true },
}