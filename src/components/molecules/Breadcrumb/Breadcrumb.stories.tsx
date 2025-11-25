import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A breadcrumb navigation component for showing the current page location within a hierarchy.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: false,
      description: 'Array of breadcrumb items',
    },
    separator: {
      control: false,
      description: 'Custom separator between items',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Current Page' },
];

// Default breadcrumb
export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

// Simple story - separate preview for simple breadcrumb
export function Simple() {
  return (
    <div className="p-6">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Current Page' },
      ]} />
    </div>
  );
}

// With Icons story - separate preview for breadcrumb with icons
export function WithIcons() {
  return (
    <div className="p-6">
      <Breadcrumb items={[
        { label: 'Home', href: '/', icon: 'home' },
        { label: 'Settings', href: '/settings', icon: 'settings' },
        { label: 'Profile' },
      ]} />
    </div>
  );
}

// Long Breadcrumb story - separate preview for long breadcrumb
export function LongBreadcrumb() {
  return (
    <div className="p-6">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Category', href: '/category' },
        { label: 'Subcategory', href: '/category/subcategory' },
        { label: 'Item', href: '/category/subcategory/item' },
        { label: 'Details' },
      ]} />
    </div>
  );
}

