import type { Meta, StoryObj } from '@storybook/react';
import { ReadOnly } from '../components/atoms/ReadOnly';

const meta: Meta<typeof ReadOnly> = {
  title: 'Atoms/ReadOnly',
  component: ReadOnly,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A read-only field display component for showing label-value pairs in different layouts. Based on Figma design specifications.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text',
    },
    value: {
      control: 'text',
      description: 'The main value text',
    },
    type: {
      control: 'select',
      options: ['Vertical', 'Horizontal'],
      description: 'Layout orientation',
    },
    labelIcon: {
      control: 'boolean',
      description: 'Whether to show an icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReadOnly>;

// Type=Vertical, Label Icon=False
export const VerticalBasic: Story = {
  args: {
    label: 'Label',
    value: 'Text',
    type: 'Vertical',
    labelIcon: false,
  },
};

// Type=Vertical, Label Icon=True
export const VerticalWithIcon: Story = {
  args: {
    label: 'Label',
    value: 'Text',
    type: 'Vertical',
    labelIcon: true,
  },
};

// Type=Horizontal, Label Icon=False
export const HorizontalBasic: Story = {
  args: {
    label: 'Label',
    value: 'Text',
    type: 'Horizontal',
    labelIcon: false,
  },
};

// Type=Horizontal, Label Icon=True
export const HorizontalWithIcon: Story = {
  args: {
    label: 'Label',
    value: 'Text',
    type: 'Horizontal',
    labelIcon: true,
  },
};
