import type { Meta, StoryObj } from '@storybook/react';
import { TreeSelect } from './TreeSelect';
import { TreeNode } from '../Tree/TreeNode';
import type { TreeNode as TreeNodeType } from '../Tree/Tree';

const sampleTreeData: TreeNodeType[] = [
  {
    key: 'design',
    title: 'Design',
    children: [
      { key: 'design-ui', title: 'UI Team' },
      { key: 'design-brand', title: 'Brand Team' },
    ],
  },
  {
    key: 'engineering',
    title: 'Engineering',
    children: [
      {
        key: 'fe',
        title: 'Frontend',
        children: [
          { key: 'fe-platform', title: 'Platform' },
          { key: 'fe-experience', title: 'Experience' },
        ],
      },
      { key: 'be', title: 'Backend' },
    ],
  },
  {
    key: 'product',
    title: 'Product',
    children: [
      { key: 'product-discovery', title: 'Discovery' },
      { key: 'product-research', title: 'Research' },
    ],
  },
];

const meta = {
  title: 'Molecules/TreeSelect',
  component: TreeSelect,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'TreeSelect lets users select options from hierarchical data structures with optional search and multi-select.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow selecting multiple nodes',
    },
    treeCheckable: {
      control: 'boolean',
      description: 'Show checkboxes next to nodes',
    },
    showSearch: {
      control: 'boolean',
      description: 'Enable search input inside dropdown',
    },
  },
  args: {
    label: 'Select organization unit',
    placeholder: 'Choose a team',
    treeData: sampleTreeData,
    showSearch: true,
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof TreeSelect>;

// Declarative API
/** @deprecated Use composable API instead. */
export const LegacyDeclarativeDefault: Story = {
  args: {
    helperText: 'Use search to quickly filter nodes',
  },
};

// Composable API
export const Default: Story = {
  render: () => (
    <TreeSelect
      label="Select organization unit"
      placeholder="Choose a team"
      showSearch={true}
      helperText="Use search to quickly filter nodes"
    >
      <TreeNode nodeKey="design" title="Design">
        <TreeNode nodeKey="design-ui" title="UI Team" />
        <TreeNode nodeKey="design-brand" title="Brand Team" />
      </TreeNode>
      <TreeNode nodeKey="engineering" title="Engineering">
        <TreeNode nodeKey="fe" title="Frontend">
          <TreeNode nodeKey="fe-platform" title="Platform" />
          <TreeNode nodeKey="fe-experience" title="Experience" />
        </TreeNode>
        <TreeNode nodeKey="be" title="Backend" />
      </TreeNode>
      <TreeNode nodeKey="product" title="Product">
        <TreeNode nodeKey="product-discovery" title="Discovery" />
        <TreeNode nodeKey="product-research" title="Research" />
      </TreeNode>
    </TreeSelect>
  ),
};

/** @deprecated Use composable API instead. */
export const LegacyMultipleSelection: Story = {
  args: {
    multiple: true,
    treeCheckable: true,
    defaultValue: ['design-ui', 'fe-platform'],
    label: 'Assign reviewers',
    helperText: 'You can pick multiple reviewers',
  },
};

/** @deprecated Use composable API instead. */
export const LegacyWithError: Story = {
  args: {
    error: 'Please choose at least one team',
    allowClear: false,
    showSearch: false,
    placeholder: 'Select teams',
  },
};
