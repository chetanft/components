import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'with-label'],
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    dashed: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    type: 'primary',
  },
};

export const Primary: Story = {
  args: {
    type: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Divider type="primary" />
      <Divider type="secondary" />
      <Divider type="tertiary" />
      <Divider type="with-label" label="With Label" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    type: 'with-label',
    label: 'Label',
  },
};

export const Dashed: Story = {
  args: {
    dashed: true,
  },
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      Text
      <Divider direction="vertical" />
      Link
      <Divider direction="vertical" />
      Action
    </div>
  ),
};

export const TextPositions: Story = {
  render: () => (
    <>
      <Divider orientation="left">Left Text</Divider>
      <Divider orientation="center">Center Text</Divider>
      <Divider orientation="right">Right Text</Divider>
    </>
  ),
};
