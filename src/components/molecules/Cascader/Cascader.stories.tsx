import type { Meta, StoryObj } from '@storybook/react';
import { Cascader, CascaderOption } from './Cascader';
import { useState, type ReactNode } from 'react';

const meta: Meta<typeof Cascader> = {
  title: 'Molecules/Cascader',
  component: Cascader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A cascading selector component for selecting from hierarchical data.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Component size',
    },
    expandTrigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'How to expand child options',
    },
    showSearch: {
      control: 'boolean',
      description: 'Enable search',
    },
    allowClear: {
      control: 'boolean',
      description: 'Allow clearing selection',
    },
    changeOnSelect: {
      control: 'boolean',
      description: 'Change value on any level select',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the cascader',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Cascader>;

const locationOptions: CascaderOption[] = [
  {
    value: 'usa',
    label: 'United States',
    children: [
      {
        value: 'california',
        label: 'California',
        children: [
          { value: 'san-francisco', label: 'San Francisco' },
          { value: 'los-angeles', label: 'Los Angeles' },
          { value: 'san-diego', label: 'San Diego' },
        ],
      },
      {
        value: 'new-york',
        label: 'New York',
        children: [
          { value: 'new-york-city', label: 'New York City' },
          { value: 'buffalo', label: 'Buffalo' },
        ],
      },
      {
        value: 'texas',
        label: 'Texas',
        children: [
          { value: 'houston', label: 'Houston' },
          { value: 'dallas', label: 'Dallas' },
          { value: 'austin', label: 'Austin' },
        ],
      },
    ],
  },
  {
    value: 'canada',
    label: 'Canada',
    children: [
      {
        value: 'ontario',
        label: 'Ontario',
        children: [
          { value: 'toronto', label: 'Toronto' },
          { value: 'ottawa', label: 'Ottawa' },
        ],
      },
      {
        value: 'british-columbia',
        label: 'British Columbia',
        children: [
          { value: 'vancouver', label: 'Vancouver' },
          { value: 'victoria', label: 'Victoria' },
        ],
      },
    ],
  },
  {
    value: 'uk',
    label: 'United Kingdom',
    children: [
      {
        value: 'england',
        label: 'England',
        children: [
          { value: 'london', label: 'London' },
          { value: 'manchester', label: 'Manchester' },
        ],
      },
      {
        value: 'scotland',
        label: 'Scotland',
        children: [
          { value: 'edinburgh', label: 'Edinburgh' },
          { value: 'glasgow', label: 'Glasgow' },
        ],
      },
    ],
  },
];

// Basic Cascader
export const Default: Story = {
  args: {
    label: 'Select Location',
    options: locationOptions,
    placeholder: 'Select a location',
  },
};

const ControlledCascaderStory = (args: React.ComponentProps<typeof Cascader>) => {
  const [value, setValue] = useState<string[]>(['usa', 'california', 'san-francisco']);
  return (
    <div className="space-y-4">
      <Cascader
        {...args}
        value={value}
        onChange={(val) => setValue(val as string[])}
      />
      <p className="text-sm text-[var(--color-tertiary)]">
        Selected: {value.join(' / ') || 'None'}
      </p>
    </div>
  );
};

// Controlled Cascader
export const Controlled: Story = {
  render: (args: React.ComponentProps<typeof Cascader>) => <ControlledCascaderStory {...args} />,
  args: {
    label: 'Controlled Cascader',
    options: locationOptions,
  },
};

// Hover to Expand
export const HoverExpand: Story = {
  args: {
    label: 'Hover to Expand',
    options: locationOptions,
    expandTrigger: 'hover',
    placeholder: 'Hover over options to expand',
  },
};

// With Search
export const WithSearch: Story = {
  args: {
    label: 'Searchable Cascader',
    options: locationOptions,
    showSearch: true,
    placeholder: 'Search locations...',
  },
};

const ChangeOnSelectStory = (args: React.ComponentProps<typeof Cascader>) => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div className="space-y-4">
      <Cascader
        {...args}
        value={value}
        onChange={(val) => setValue(val as string[])}
      />
      <p className="text-sm text-[var(--color-tertiary)]">
        Selected path: {value.join(' / ') || 'None'}
      </p>
    </div>
  );
};

// Change on Select
export const ChangeOnSelect: Story = {
  render: (args: React.ComponentProps<typeof Cascader>) => <ChangeOnSelectStory {...args} />,
  args: {
    label: 'Change on Any Level',
    options: locationOptions,
    changeOnSelect: true,
    helperText: 'Selection updates at any level, not just leaf nodes',
  },
};

// Custom Display
export const CustomDisplay: Story = {
  args: {
    label: 'Custom Display',
    options: locationOptions,
    displayRender: (labels: ReactNode[]) => labels.join(' > '),
    placeholder: 'Select location',
  },
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Cascader size="xs" label="Extra Small" options={locationOptions} placeholder="XS" />
      <Cascader size="sm" label="Small" options={locationOptions} placeholder="SM" />
      <Cascader size="md" label="Medium (Default)" options={locationOptions} placeholder="MD" />
      <Cascader size="lg" label="Large" options={locationOptions} placeholder="LG" />
    </div>
  ),
};

// With States
export const WithStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Cascader label="Normal" options={locationOptions} placeholder="Select location" />
      <Cascader label="With Error" options={locationOptions} error="Please select a location" placeholder="Select location" />
      <Cascader label="Disabled" options={locationOptions} disabled placeholder="Select location" />
    </div>
  ),
};

// With Disabled Options
export const DisabledOptions: Story = {
  args: {
    label: 'With Disabled Options',
    options: [
      {
        value: 'available',
        label: 'Available Region',
        children: [
          { value: 'city1', label: 'City 1' },
          { value: 'city2', label: 'City 2' },
        ],
      },
      {
        value: 'unavailable',
        label: 'Unavailable Region',
        disabled: true,
        children: [
          { value: 'city3', label: 'City 3' },
        ],
      },
    ],
  },
};

// Category Selection
export const CategorySelection: Story = {
  args: {
    label: 'Product Category',
    options: [
      {
        value: 'electronics',
        label: 'Electronics',
        children: [
          {
            value: 'phones',
            label: 'Phones',
            children: [
              { value: 'iphone', label: 'iPhone' },
              { value: 'samsung', label: 'Samsung' },
              { value: 'google', label: 'Google Pixel' },
            ],
          },
          {
            value: 'laptops',
            label: 'Laptops',
            children: [
              { value: 'macbook', label: 'MacBook' },
              { value: 'dell', label: 'Dell' },
              { value: 'lenovo', label: 'Lenovo' },
            ],
          },
        ],
      },
      {
        value: 'clothing',
        label: 'Clothing',
        children: [
          {
            value: 'mens',
            label: "Men's",
            children: [
              { value: 'shirts', label: 'Shirts' },
              { value: 'pants', label: 'Pants' },
            ],
          },
          {
            value: 'womens',
            label: "Women's",
            children: [
              { value: 'dresses', label: 'Dresses' },
              { value: 'skirts', label: 'Skirts' },
            ],
          },
        ],
      },
    ],
    showSearch: true,
    placeholder: 'Select a category',
  },
};
