import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Chip, ChipGroup } from './index';

const meta: Meta<typeof Chip> = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A selectable chip component for filters, categories, and multi-option selection. Supports single and group selection modes.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      defaultScenarioId: 'outlined',
      rows: [
        {
          id: 'variant',
          label: 'Variant',
          scenarios: [
            { id: 'outlined', label: 'Outlined', story: 'ExplorerBase', args: { variant: 'outlined' } },
            { id: 'filled', label: 'Filled', story: 'ExplorerBase', args: { variant: 'filled' } },
          ],
        },
        {
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'sm', label: 'Small', story: 'ExplorerBase', args: { size: 'sm' } },
            { id: 'md', label: 'Medium', story: 'ExplorerBase', args: { size: 'md' } },
            { id: 'lg', label: 'Large', story: 'ExplorerBase', args: { size: 'lg' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'unselected', label: 'Unselected', story: 'ExplorerBase', args: { selected: false } },
            { id: 'selected', label: 'Selected', story: 'ExplorerBase', args: { selected: true } },
            { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { disabled: true } },
          ],
        },
      ],
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Text content of the chip',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is in selected state',
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled'],
      description: 'Visual style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the chip',
    },
    icon: {
      control: 'text',
      description: 'Leading icon name from the icon set',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled',
    },
    onRemove: {
      description: 'Callback when the remove button is clicked. Shows a close icon when provided.',
    },
    glass: {
      control: { type: 'select' },
      options: [undefined, 'subtle', 'prominent'],
      description: 'Glass morphism variant',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: 'Chip',
    variant: 'outlined',
    size: 'md',
  },
};

export const Selected: Story = {
  args: {
    label: 'Selected',
    selected: true,
    variant: 'outlined',
    size: 'md',
  },
};

export const Filled: Story = {
  args: {
    label: 'Filled',
    variant: 'filled',
    size: 'md',
  },
};

export const FilledSelected: Story = {
  args: {
    label: 'Filled Selected',
    selected: true,
    variant: 'filled',
    size: 'md',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'With Icon',
    icon: 'check',
    variant: 'outlined',
    size: 'md',
  },
};

export const Removable: Story = {
  args: {
    label: 'Removable',
    variant: 'outlined',
    size: 'md',
    onRemove: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    variant: 'outlined',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    size: 'lg',
  },
};

export const ExplorerBase: Story = {
  args: {
    label: 'Chip',
    variant: 'outlined',
    size: 'md',
    selected: false,
  },
};

export const Group: Story = {
  render: () => {
    const GroupExample = () => {
      const [value, setValue] = useState('option1');
      return (
        <ChipGroup value={value} onChange={setValue}>
          <Chip label="Option 1" value="option1" />
          <Chip label="Option 2" value="option2" />
          <Chip label="Option 3" value="option3" />
        </ChipGroup>
      );
    };
    return <GroupExample />;
  },
  parameters: {
    docs: {
      source: {
        code: `<ChipGroup value={value} onChange={setValue}>
  <Chip label="Option 1" value="option1" />
  <Chip label="Option 2" value="option2" />
  <Chip label="Option 3" value="option3" />
</ChipGroup>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const GroupMultiple: Story = {
  render: () => {
    const MultiGroupExample = () => {
      const [values, setValues] = useState(['a']);
      const toggle = (v: string) => {
        setValues((prev) =>
          prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
        );
      };
      return (
        <ChipGroup value={values} onChange={toggle} multiple>
          <Chip label="Alpha" value="a" />
          <Chip label="Beta" value="b" />
          <Chip label="Gamma" value="c" />
        </ChipGroup>
      );
    };
    return <MultiGroupExample />;
  },
  parameters: {
    docs: {
      source: {
        code: `<ChipGroup value={values} onChange={toggle} multiple>
  <Chip label="Alpha" value="a" />
  <Chip label="Beta" value="b" />
  <Chip label="Gamma" value="c" />
</ChipGroup>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};
