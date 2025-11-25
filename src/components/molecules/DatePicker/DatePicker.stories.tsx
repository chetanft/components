import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Date picker component for selecting single dates or date ranges.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Size of the date picker',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: 'Select Date',
    placeholder: 'MM/DD/YYYY',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Date with Value',
    placeholder: 'MM/DD/YYYY',
    value: '01/15/2024',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Date with Error',
    placeholder: 'MM/DD/YYYY',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled DatePicker',
    placeholder: 'MM/DD/YYYY',
    disabled: true,
  },
};

export const DateRange: Story = {
  args: {
    label: 'Date Range',
    range: true,
  },
};

export const SizeXS: Story = {
  args: {
    label: 'Extra Small (XS)',
    placeholder: '24px height',
    size: 'xs',
  },
};

export const SizeSM: Story = {
  args: {
    label: 'Small (SM)',
    placeholder: '32px height',
    size: 'sm',
  },
};

export const SizeLG: Story = {
  args: {
    label: 'Large (LG)',
    placeholder: '48px height',
    size: 'lg',
  },
};

export const SizeXL: Story = {
  args: {
    label: 'Extra Large (XL)',
    placeholder: '56px height',
    size: 'xl',
  },
};
