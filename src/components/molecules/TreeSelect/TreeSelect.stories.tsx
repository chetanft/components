import type { Meta, StoryObj } from '@storybook/react';
import { TreeSelect } from './TreeSelect';
import type { TreeNode } from '../Tree/Tree';

const sampleTreeData: TreeNode[] = [
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

export const Default: Story = {
  args: {
    helperText: 'Use search to quickly filter nodes',
  },
};

export const MultipleSelection: Story = {
  args: {
    multiple: true,
    treeCheckable: true,
    defaultValue: ['design-ui', 'fe-platform'],
    label: 'Assign reviewers',
    helperText: 'You can pick multiple reviewers',
  },
};

export const WithError: Story = {
  args: {
    error: 'Please choose at least one team',
    allowClear: false,
    showSearch: false,
    placeholder: 'Select teams',
  },
};
