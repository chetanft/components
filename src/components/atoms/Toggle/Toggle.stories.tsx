import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof Toggle> = {
    title: 'Atoms/Toggle',
    component: Toggle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
    args: {
        children: 'Toggle Me',
    },
};

export const Pressed: Story = {
    args: {
        children: 'Pressed',
        pressed: true,
    },
};

export const WithIcon: Story = {
    args: {
        icon: 'check',
        children: 'Check',
    },
};

export const IconOnly: Story = {
    args: {
        icon: 'star',
        'aria-label': 'Star',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Outline',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled',
    },
};
