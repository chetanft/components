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
    placeholder: 'DD/MM/YYYY',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Date with Value',
    placeholder: 'DD/MM/YYYY',
    value: '15/01/2024',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Date with Error',
    placeholder: 'DD/MM/YYYY',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled DatePicker',
    placeholder: 'DD/MM/YYYY',
    disabled: true,
  },
};

export const DateRange: Story = {
  args: {
    label: 'Date Range',
    range: true,
  },
};

export const CustomQuickSelectOptions: Story = {
  args: {
    label: 'Date Range with Custom Quick Select',
    range: true,
    quickSelectOptions: [
      { label: 'Last 7 days', value: 'last-7-days' },
      { label: 'Last 30 days', value: 'last-30-days' },
      { label: 'This quarter', value: 'this-quarter' },
      { label: 'Last quarter', value: 'last-quarter' },
      { label: 'This year', value: 'this-year' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with custom quick select options. The quickSelectOptions prop allows you to customize the preset date ranges shown in the left sidebar when range mode is enabled.',
      },
    },
  },
};

export const SizeXS: Story = {
  args: {
    label: 'Extra Small (XS)',
    placeholder: 'DD/MM/YYYY',
    size: 'xs',
  },
};

export const SizeSM: Story = {
  args: {
    label: 'Small (SM)',
    placeholder: 'DD/MM/YYYY',
    size: 'sm',
  },
};

export const SizeLG: Story = {
  args: {
    label: 'Large (LG)',
    placeholder: 'DD/MM/YYYY',
    size: 'lg',
  },
};

export const SizeXL: Story = {
  args: {
    label: 'Extra Large (XL)',
    placeholder: 'DD/MM/YYYY',
    size: 'xl',
  },
};
