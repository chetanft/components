import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import type { ComponentProps } from 'react';
import { Tree, TreeNode } from './index';
import type { TreeNodeData } from './Tree';
import { TreeNodeContent } from './TreeNodeContent';
import { TreeNodeIcon } from './TreeNodeIcon';
import { TreeNodeSwitcher } from './TreeNodeSwitcher';
import { TreeNodeCheckbox } from './TreeNodeCheckbox';
import { Icon } from '../../atoms/Icons';

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
type TreeStoryProps = ComponentProps<typeof Tree>;

const sampleTreeData: TreeNodeData[] = [
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

const WithCheckboxesStory = (props: TreeStoryProps) => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <Tree
        {...props}
        checkedKeys={checkedKeys}
        onCheck={(keys) => setCheckedKeys(keys)}
      />
      <p className="text-sm text-[var(--color-tertiary)]">
        Checked: {checkedKeys.join(', ') || 'None'}
      </p>
    </div>
  );
};

// With Checkboxes
export const WithCheckboxes: Story = {
  render: (args: React.ComponentProps<typeof Tree>) => <WithCheckboxesStory {...args} />,
  args: {
    treeData: sampleTreeData,
    checkable: true,
    defaultExpandAll: true,
  },
};

const WithSelectionStory = (props: TreeStoryProps) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <Tree
        {...props}
        selectedKeys={selectedKeys}
        onSelect={(keys) => setSelectedKeys(keys)}
      />
      <p className="text-sm text-[var(--color-tertiary)]">
        Selected: {selectedKeys.join(', ') || 'None'}
      </p>
    </div>
  );
};

// With Selection
export const WithSelection: Story = {
  render: (args: React.ComponentProps<typeof Tree>) => <WithSelectionStory {...args} />,
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
        icon: 'document',
        children: [
          {
            key: 'components',
            title: 'components',
            icon: 'document',
            children: [
              { key: 'Button.tsx', title: 'Button.tsx', icon: 'file', isLeaf: true },
              { key: 'Input.tsx', title: 'Input.tsx', icon: 'file', isLeaf: true },
              { key: 'Modal.tsx', title: 'Modal.tsx', icon: 'file', isLeaf: true },
            ],
          },
          {
            key: 'utils',
            title: 'utils',
            icon: 'document',
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

const MultipleSelectionStory = (props: TreeStoryProps) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <Tree
        {...props}
        selectedKeys={selectedKeys}
        onSelect={(keys) => setSelectedKeys(keys)}
      />
      <p className="text-sm text-[var(--color-tertiary)]">
        Selected: {selectedKeys.join(', ') || 'None'}
      </p>
    </div>
  );
};

// Multiple Selection
export const MultipleSelection: Story = {
  render: (args: React.ComponentProps<typeof Tree>) => <MultipleSelectionStory {...args} />,
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

const ControlledExpansionStory = (props: TreeStoryProps) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['0-0']);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-[var(--color-primary)] text-[var(--overlay-control-text)] rounded text-sm"
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
        {...props}
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
      />
    </div>
  );
};

// Controlled Expansion
export const ControlledExpansion: Story = {
  render: (args: React.ComponentProps<typeof Tree>) => <ControlledExpansionStory {...args} />,
  args: {
    treeData: sampleTreeData,
  },
};

// Composable API Examples
export const ComposableBasic: Story = {
  render: () => (
    <Tree defaultExpandAll>
      <TreeNode nodeKey="0-0" title="Parent 0">
        <TreeNode nodeKey="0-0-0" title="Child 0-0">
          <TreeNode nodeKey="0-0-0-0" title="Leaf 0-0-0" isLeaf />
          <TreeNode nodeKey="0-0-0-1" title="Leaf 0-0-1" isLeaf />
        </TreeNode>
        <TreeNode nodeKey="0-0-1" title="Child 0-1">
          <TreeNode nodeKey="0-0-1-0" title="Leaf 0-1-0" isLeaf />
        </TreeNode>
      </TreeNode>
      <TreeNode nodeKey="0-1" title="Parent 1">
        <TreeNode nodeKey="0-1-0" title="Child 1-0" isLeaf />
        <TreeNode nodeKey="0-1-1" title="Child 1-1" isLeaf />
      </TreeNode>
    </Tree>
  ),
};

export const ComposableWithIcons: Story = {
  render: () => (
    <Tree defaultExpandAll showIcon>
      <TreeNode 
        nodeKey="src" 
        title="src"
        icon={<Icon name="document" size={16} />}
      >
        <TreeNode 
          nodeKey="components" 
          title="components"
          icon={<Icon name="document" size={16} />}
        >
          <TreeNode nodeKey="Button.tsx" title="Button.tsx" isLeaf icon={<Icon name="file" size={16} />} />
          <TreeNode nodeKey="Input.tsx" title="Input.tsx" isLeaf icon={<Icon name="file" size={16} />} />
        </TreeNode>
        <TreeNode nodeKey="index.ts" title="index.ts" isLeaf icon={<Icon name="file" size={16} />} />
      </TreeNode>
      <TreeNode nodeKey="package.json" title="package.json" isLeaf icon={<Icon name="file" size={16} />} />
    </Tree>
  ),
};

const ComposableWithCheckboxesComponent = () => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  return (
    <div className="space-y-4">
      <Tree 
        checkable 
        defaultExpandAll
        checkedKeys={checkedKeys}
        onCheck={setCheckedKeys}
      >
        <TreeNode nodeKey="0-0" title="Parent 0">
          <TreeNode nodeKey="0-0-0" title="Child 0-0" isLeaf />
          <TreeNode nodeKey="0-0-1" title="Child 0-1" isLeaf />
        </TreeNode>
        <TreeNode nodeKey="0-1" title="Parent 1">
          <TreeNode nodeKey="0-1-0" title="Child 1-0" isLeaf />
        </TreeNode>
      </Tree>
      <p className="text-sm text-[var(--color-tertiary)]">
        Checked: {checkedKeys.join(', ') || 'None'}
      </p>
    </div>
  );
};

export const ComposableWithCheckboxes: Story = {
  render: () => <ComposableWithCheckboxesComponent />,
};

const ComposableWithSelectionComponent = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  return (
    <div className="space-y-4">
      <Tree 
        selectable 
        defaultExpandAll
        selectedKeys={selectedKeys}
        onSelect={setSelectedKeys}
      >
        <TreeNode nodeKey="0-0" title="Parent 0">
          <TreeNode nodeKey="0-0-0" title="Child 0-0" isLeaf />
          <TreeNode nodeKey="0-0-1" title="Child 0-1" isLeaf />
        </TreeNode>
        <TreeNode nodeKey="0-1" title="Parent 1">
          <TreeNode nodeKey="0-1-0" title="Child 1-0" isLeaf />
        </TreeNode>
      </Tree>
      <p className="text-sm text-[var(--color-tertiary)]">
        Selected: {selectedKeys.join(', ') || 'None'}
      </p>
    </div>
  );
};

export const ComposableWithSelection: Story = {
  render: () => <ComposableWithSelectionComponent />,
};

export const ComposableDirectoryTree: Story = {
  render: () => (
    <Tree defaultExpandAll showIcon showLine>
      <TreeNode 
        nodeKey="src" 
        title="src"
        icon={<Icon name="document" size={16} />}
      >
        <TreeNode 
          nodeKey="components" 
          title="components"
          icon={<Icon name="document" size={16} />}
        >
          <TreeNode nodeKey="Button.tsx" title="Button.tsx" isLeaf icon={<Icon name="file" size={16} />} />
          <TreeNode nodeKey="Input.tsx" title="Input.tsx" isLeaf icon={<Icon name="file" size={16} />} />
          <TreeNode nodeKey="Modal.tsx" title="Modal.tsx" isLeaf icon={<Icon name="file" size={16} />} />
        </TreeNode>
        <TreeNode 
          nodeKey="utils" 
          title="utils"
          icon={<Icon name="document" size={16} />}
        >
          <TreeNode nodeKey="helpers.ts" title="helpers.ts" isLeaf icon={<Icon name="file" size={16} />} />
          <TreeNode nodeKey="constants.ts" title="constants.ts" isLeaf icon={<Icon name="file" size={16} />} />
        </TreeNode>
        <TreeNode nodeKey="index.ts" title="index.ts" isLeaf icon={<Icon name="file" size={16} />} />
      </TreeNode>
      <TreeNode nodeKey="package.json" title="package.json" isLeaf icon={<Icon name="file" size={16} />} />
      <TreeNode nodeKey="README.md" title="README.md" isLeaf icon={<Icon name="file" size={16} />} />
    </Tree>
  ),
};
