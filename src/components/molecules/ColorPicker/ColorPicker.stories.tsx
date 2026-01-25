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

export const CustomPresets: Story = {
  render: () => (
    <ColorPicker
      showText
      defaultValue="#42bdbd"
      presets={[
        '#42bdbd', // Teal
        '#0828f7', // Indigo
        '#1793e8', // Blue
        '#ff0036', // Pink
        '#ffbe07', // Gold
        '#000000', // Black
        '#ffffff', // White
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'ColorPicker with custom brand color presets. The presets prop allows you to customize the color palette shown in the picker grid.',
      },
    },
  },
};

