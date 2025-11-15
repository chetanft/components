import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const PrimarySet: Story = {
  args: {
    buttons: [
      {
        id: 'ghost',
        label: 'Button',
        variant: 'text',
        icon: 'add',
        iconPosition: 'leading',
      },
      {
        id: 'outline',
        label: 'Button',
        variant: 'secondary',
        icon: 'add',
        iconPosition: 'leading',
      },
      {
        id: 'filled',
        label: 'Button',
        variant: 'primary',
        icon: 'add',
        iconPosition: 'leading',
      },
    ],
  },
};

export const EqualWidth: Story = {
  args: {
    equalWidth: true,
    style: { width: 320 },
    buttons: [
      {
        id: 'ghost',
        label: 'Button',
        variant: 'text',
        icon: 'add',
        iconPosition: 'leading',
      },
      {
        id: 'outline',
        label: 'Button',
        variant: 'secondary',
        icon: 'add',
        iconPosition: 'leading',
      },
      {
        id: 'filled',
        label: 'Button',
        variant: 'primary',
        icon: 'add',
        iconPosition: 'leading',
      },
    ],
  },
};

