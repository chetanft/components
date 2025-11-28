import type { Meta, StoryObj } from '@storybook/react';
import { Tree, TreeNode } from './Tree';
import { useState } from 'react';

const meta: Meta<typeof Tree> = {
  title: 'Molecules/Tree',
  component: Tree,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A tree component for displaying hierarchical data with expand/collapse, selection, and checkbox support. Built using FT Design System tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checkable: {
      control: 'boolean',
      description: 'Show checkboxes',
    },
    selectable: {
      control: 'boolean',
      description: 'Allow node selection',
    },
    showLine: {
      control: 'boolean',
      description: 'Show connecting lines',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show node icons',
    },
    defaultExpandAll: {
      control: 'boolean',
      description: 'Expand all nodes by default',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the tree',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tree>;

const sampleTreeData: TreeNode[] = [
  {
    key: '0-0',
    title: 'Parent 0',
    children: [
      {
        key: '0-0-0',
        title: 'Child 0-0',
        children: [
          { key: '0-0-0-0', title: 'Leaf 0-0-0' },
          { key: '0-0-0-1', title: 'Leaf 0-0-1' },
        ],
      },
      {
        key: '0-0-1',
        title: 'Child 0-1',
        children: [
          { key: '0-0-1-0', title: 'Leaf 0-1-0' },
        ],
      },
    ],
  },
  {
    key: '0-1',
    title: 'Parent 1',
    children: [
      { key: '0-1-0', title: 'Child 1-0' },
      { key: '0-1-1', title: 'Child 1-1' },
    ],
  },
];

// Basic Tree
export const Default: Story = {
  args: {
    treeData: sampleTreeData,
    defaultExpandAll: true,
  },
};

// With Checkboxes
export const WithCheckboxes: Story = {
  render: (args: React.ComponentProps<typeof Tree>) => {
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
    return (
      <div className="space-y-4">
        <Tree
          {...args}
          checkedKeys={checkedKeys}
          onCheck={(keys) => setCheckedKeys(keys)}
        />
        <p className="text-sm text-[var(--color-tertiary)]">
          Checked: {checkedKeys.join(', ') || 'None'}
        </p>
      </div>
    );
  },
  args: {
    treeData: sampleTreeData,
    checkable: true,
    defaultExpandAll: true,
  },
};

// With Selection
export const WithSelection: Story = {
  render: (args: React.ComponentProps<typeof Tree>) => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    return (
      <div className="space-y-4">
        <Tree
          {...args}
          selectedKeys={selectedKeys}
          onSelect={(keys) => setSelectedKeys(keys)}
        />
        <p className="text-sm text-[var(--color-tertiary)]">
          Selected: {selectedKeys.join(', ') || 'None'}
        </p>
      </div>
    );
  },
  args: {
    treeData: sampleTreeData,
    selectable: true,
    defaultExpandAll: true,
  },
};

// With Lines
export const WithLines: Story = {
  args: {
    treeData: sampleTreeData,
    showLine: true,
    defaultExpandAll: true,
  },
};

// With Icons
export const WithIcons: Story = {
  args: {
    treeData: sampleTreeData,
    showIcon: true,
    defaultExpandAll: true,
  },
};

// Directory Tree
export const DirectoryTree: Story = {
  args: {
    treeData: [
      {
        key: 'src',
        title: 'src',
        icon: 'folder',
        children: [
          {
            key: 'components',
            title: 'components',
            icon: 'folder',
            children: [
              { key: 'Button.tsx', title: 'Button.tsx', icon: 'file', isLeaf: true },
              { key: 'Input.tsx', title: 'Input.tsx', icon: 'file', isLeaf: true },
              { key: 'Modal.tsx', title: 'Modal.tsx', icon: 'file', isLeaf: true },
            ],
          },
          {
            key: 'utils',
            title: 'utils',
            icon: 'folder',
            children: [
              { key: 'helpers.ts', title: 'helpers.ts', icon: 'file', isLeaf: true },
              { key: 'constants.ts', title: 'constants.ts', icon: 'file', isLeaf: true },
            ],
          },
          { key: 'index.ts', title: 'index.ts', icon: 'file', isLeaf: true },
        ],
      },
      { key: 'package.json', title: 'package.json', icon: 'file', isLeaf: true },
      { key: 'README.md', title: 'README.md', icon: 'file', isLeaf: true },
    ],
    showIcon: true,
    showLine: true,
    defaultExpandAll: true,
  },
};

// Multiple Selection
export const MultipleSelection: Story = {
  render: (args: React.ComponentProps<typeof Tree>) => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    return (
      <div className="space-y-4">
        <Tree
          {...args}
          selectedKeys={selectedKeys}
          onSelect={(keys) => setSelectedKeys(keys)}
        />
        <p className="text-sm text-[var(--color-tertiary)]">
          Selected: {selectedKeys.join(', ') || 'None'}
        </p>
      </div>
    );
  },
  args: {
    treeData: sampleTreeData,
    selectable: true,
    multiple: true,
    defaultExpandAll: true,
  },
};

// Disabled Nodes
export const DisabledNodes: Story = {
  args: {
    treeData: [
      {
        key: '0-0',
        title: 'Parent 0',
        children: [
          { key: '0-0-0', title: 'Enabled Node' },
          { key: '0-0-1', title: 'Disabled Node', disabled: true },
          { key: '0-0-2', title: 'Enabled Node' },
        ],
      },
      {
        key: '0-1',
        title: 'Disabled Parent',
        disabled: true,
        children: [
          { key: '0-1-0', title: 'Child Node' },
        ],
      },
    ],
    checkable: true,
    defaultExpandAll: true,
  },
};

// Controlled Expansion
export const ControlledExpansion: Story = {
  render: (args: React.ComponentProps<typeof Tree>) => {
    const [expandedKeys, setExpandedKeys] = useState<string[]>(['0-0']);
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-[var(--color-primary)] text-white rounded text-sm"
            onClick={() => setExpandedKeys(['0-0', '0-0-0', '0-0-1', '0-1'])}
          >
            Expand All
          </button>
          <button
            className="px-3 py-1 bg-[var(--color-bg-secondary)] text-[var(--color-primary)] rounded text-sm"
            onClick={() => setExpandedKeys([])}
          >
            Collapse All
          </button>
        </div>
        <Tree
          {...args}
          expandedKeys={expandedKeys}
          onExpand={(keys) => setExpandedKeys(keys)}
        />
      </div>
    );
  },
  args: {
    treeData: sampleTreeData,
  },
};

