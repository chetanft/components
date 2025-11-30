import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup } from './ToggleGroup';
import { Toggle } from '../../atoms/Toggle/Toggle';

const meta: Meta<typeof ToggleGroup> = {
    title: 'Molecules/ToggleGroup',
    component: ToggleGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Single: Story = {
    args: {
        type: 'single',
        defaultValue: 'left',
        children: [
            <Toggle key="left" value="left">Left</Toggle>,
            <Toggle key="center" value="center">Center</Toggle>,
            <Toggle key="right" value="right">Right</Toggle>,
        ],
    },
};

export const Multiple: Story = {
    args: {
        type: 'multiple',
        defaultValue: ['bold'],
        children: [
            <Toggle key="bold" value="bold" icon="check">Bold</Toggle>,
            <Toggle key="italic" value="italic" icon="check">Italic</Toggle>,
            <Toggle key="underline" value="underline" icon="check">Underline</Toggle>,
        ],
    },
};

export const Outline: Story = {
    args: {
        type: 'single',
        variant: 'outline',
        defaultValue: '1',
        children: [
            <Toggle key="1" value="1">Option 1</Toggle>,
            <Toggle key="2" value="2">Option 2</Toggle>,
            <Toggle key="3" value="3">Option 3</Toggle>,
        ],
    },
};
