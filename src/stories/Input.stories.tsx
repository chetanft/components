import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/atoms/Input/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Figma Variants: Organized by Size × State × Type
// Based on Figma node 787:2762 "Input body"

// ========== SIZE: SM ==========
export const SizeSmDefaultNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'sm',
    variant: 'default',
  },
};

export const SizeSmDefaultError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'sm',
    variant: 'default',
    error: 'Error message',
  },
};

export const SizeSmDefaultWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'sm',
    variant: 'default',
    warning: 'Warning message',
  },
};

export const SizeSmDefaultSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'sm',
    variant: 'default',
    success: 'Success message',
  },
};

export const SizeSmFilledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'sm',
    variant: 'filled',
  },
};

export const SizeSmFilledError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'sm',
    variant: 'filled',
    error: 'Error message',
  },
};

export const SizeSmFilledWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'sm',
    variant: 'filled',
    warning: 'Warning message',
  },
};

export const SizeSmFilledSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'sm',
    variant: 'filled',
    success: 'Success message',
  },
};

export const SizeSmDisabledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'sm',
    variant: 'default',
    disabled: true,
  },
};

export const SizeSmDisabledError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'sm',
    variant: 'default',
    disabled: true,
    error: 'Error message',
  },
};

export const SizeSmDisabledWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'sm',
    variant: 'default',
    disabled: true,
    warning: 'Warning message',
  },
};

export const SizeSmDisabledSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'sm',
    variant: 'default',
    disabled: true,
    success: 'Success message',
  },
};

export const SizeSmPrefilledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'sm',
    variant: 'filled',
    defaultValue: 'Pre-filled value',
  },
};

// ========== SIZE: MD ==========
export const SizeMdDefaultNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'md',
    variant: 'default',
  },
};

export const SizeMdDefaultError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'md',
    variant: 'default',
    error: 'Error message',
  },
};

export const SizeMdDefaultWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'md',
    variant: 'default',
    warning: 'Warning message',
  },
};

export const SizeMdDefaultSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'md',
    variant: 'default',
    success: 'Success message',
  },
};

export const SizeMdFilledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'md',
    variant: 'filled',
  },
};

export const SizeMdFilledError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'md',
    variant: 'filled',
    error: 'Error message',
  },
};

export const SizeMdFilledWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'md',
    variant: 'filled',
    warning: 'Warning message',
  },
};

export const SizeMdFilledSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'md',
    variant: 'filled',
    success: 'Success message',
  },
};

export const SizeMdDisabledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'md',
    variant: 'default',
    disabled: true,
  },
};

export const SizeMdDisabledError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'md',
    variant: 'default',
    disabled: true,
    error: 'Error message',
  },
};

export const SizeMdDisabledWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'md',
    variant: 'default',
    disabled: true,
    warning: 'Warning message',
  },
};

export const SizeMdDisabledSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'md',
    variant: 'default',
    disabled: true,
    success: 'Success message',
  },
};

export const SizeMdPrefilledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'md',
    variant: 'filled',
    defaultValue: 'Pre-filled value',
  },
};

// ========== SIZE: LG ==========
export const SizeLgDefaultNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'lg',
    variant: 'default',
  },
};

export const SizeLgDefaultError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'lg',
    variant: 'default',
    error: 'Error message',
  },
};

export const SizeLgDefaultWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'lg',
    variant: 'default',
    warning: 'Warning message',
  },
};

export const SizeLgDefaultSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'lg',
    variant: 'default',
    success: 'Success message',
  },
};

export const SizeLgFilledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'lg',
    variant: 'filled',
  },
};

export const SizeLgFilledError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'lg',
    variant: 'filled',
    error: 'Error message',
  },
};

export const SizeLgFilledWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'lg',
    variant: 'filled',
    warning: 'Warning message',
  },
};

export const SizeLgFilledSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'lg',
    variant: 'filled',
    success: 'Success message',
  },
};

export const SizeLgDisabledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'lg',
    variant: 'default',
    disabled: true,
  },
};

export const SizeLgDisabledError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'lg',
    variant: 'default',
    disabled: true,
    error: 'Error message',
  },
};

export const SizeLgDisabledWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'lg',
    variant: 'default',
    disabled: true,
    warning: 'Warning message',
  },
};

export const SizeLgDisabledSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'lg',
    variant: 'default',
    disabled: true,
    success: 'Success message',
  },
};

export const SizeLgPrefilledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'lg',
    variant: 'filled',
    defaultValue: 'Pre-filled value',
  },
};

// ========== SIZE: XL ==========
export const SizeXlDefaultNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xl',
    variant: 'default',
  },
};

export const SizeXlDefaultError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xl',
    variant: 'default',
    error: 'Error message',
  },
};

export const SizeXlDefaultWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xl',
    variant: 'default',
    warning: 'Warning message',
  },
};

export const SizeXlDefaultSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xl',
    variant: 'default',
    success: 'Success message',
  },
};

export const SizeXlFilledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xl',
    variant: 'filled',
  },
};

export const SizeXlFilledError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xl',
    variant: 'filled',
    error: 'Error message',
  },
};

export const SizeXlFilledWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xl',
    variant: 'filled',
    warning: 'Warning message',
  },
};

export const SizeXlFilledSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xl',
    variant: 'filled',
    success: 'Success message',
  },
};

export const SizeXlDisabledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xl',
    variant: 'default',
    disabled: true,
  },
};

export const SizeXlDisabledError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xl',
    variant: 'default',
    disabled: true,
    error: 'Error message',
  },
};

export const SizeXlDisabledWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xl',
    variant: 'default',
    disabled: true,
    warning: 'Warning message',
  },
};

export const SizeXlDisabledSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xl',
    variant: 'default',
    disabled: true,
    success: 'Success message',
  },
};

export const SizeXlPrefilledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xl',
    variant: 'filled',
    defaultValue: 'Pre-filled value',
  },
};

// ========== SIZE: XXL ==========
export const SizeXxlDefaultNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xxl',
    variant: 'default',
  },
};

export const SizeXxlDefaultError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xxl',
    variant: 'default',
    error: 'Error message',
  },
};

export const SizeXxlDefaultWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xxl',
    variant: 'default',
    warning: 'Warning message',
  },
};

export const SizeXxlDefaultSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xxl',
    variant: 'default',
    success: 'Success message',
  },
};

export const SizeXxlFilledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xxl',
    variant: 'filled',
  },
};

export const SizeXxlFilledError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xxl',
    variant: 'filled',
    error: 'Error message',
  },
};

export const SizeXxlFilledWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xxl',
    variant: 'filled',
    warning: 'Warning message',
  },
};

export const SizeXxlFilledSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xxl',
    variant: 'filled',
    success: 'Success message',
  },
};

export const SizeXxlDisabledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xxl',
    variant: 'default',
    disabled: true,
  },
};

export const SizeXxlDisabledError: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xxl',
    variant: 'default',
    disabled: true,
    error: 'Error message',
  },
};

export const SizeXxlDisabledWarning: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xxl',
    variant: 'default',
    disabled: true,
    warning: 'Warning message',
  },
};

export const SizeXxlDisabledSuccess: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xxl',
    variant: 'default',
    disabled: true,
    success: 'Success message',
  },
};

export const SizeXxlPrefilledNormal: Story = {
  args: {
    label: 'Label',
    placeholder: 'Value',
    size: 'xxl',
    variant: 'filled',
    defaultValue: 'Pre-filled value',
  },
};
