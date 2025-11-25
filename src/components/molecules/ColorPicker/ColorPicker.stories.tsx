import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Molecules/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Basic: Story = {
  render: () => <ColorPicker />,
};

export const WithText: Story = {
  render: () => <ColorPicker showText defaultValue="#1677ff" />,
};

export const Disabled: Story = {
  render: () => <ColorPicker disabled showText defaultValue="#000000" />,
};

