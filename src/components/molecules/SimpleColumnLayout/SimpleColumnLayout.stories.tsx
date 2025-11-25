import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SimpleColumnLayout } from './SimpleColumnLayout';

const meta: Meta<typeof SimpleColumnLayout> = {
  title: 'Molecules/SimpleColumnLayout',
  component: SimpleColumnLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Simple two-column layout component for displaying label-value pairs.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimpleColumnLayout>;

export const Default: Story = {
  args: {
    rows: [
      {
        left: { title: 'Label', subtitle: 'Description' },
        right: { title: 'Value', subtitle: 'Details', align: 'end' as const },
      },
      {
        left: { title: 'Label', subtitle: 'Description' },
        right: { title: 'Value', subtitle: 'Details', align: 'end' as const },
      },
      {
        left: { title: 'Label', subtitle: 'Description' },
        right: { title: 'Value', subtitle: 'Details', align: 'end' as const },
      },
    ],
  },
};

export const WithStripes: Story = {
  args: {
    striped: true,
    rows: [
      {
        left: { title: 'Order ID', subtitle: 'Reference number' },
        right: { title: '#12345', subtitle: 'Active', align: 'end' as const },
      },
      {
        left: { title: 'Customer', subtitle: 'Company name' },
        right: { title: 'ABC Corp', subtitle: 'Verified', align: 'end' as const },
      },
      {
        left: { title: 'Status', subtitle: 'Current state' },
        right: { title: 'Completed', subtitle: 'Updated today', align: 'end' as const },
      },
    ],
  },
};

export const NoStripes: Story = {
  args: {
    striped: false,
    rows: [
      {
        left: { title: 'Name', subtitle: 'Full name' },
        right: { title: 'John Doe', subtitle: 'Primary', align: 'end' as const },
      },
      {
        left: { title: 'Email', subtitle: 'Contact' },
        right: { title: 'john@example.com', subtitle: 'Verified', align: 'end' as const },
      },
    ],
  },
};

export const OrderDetails: Story = {
  args: {
    striped: true,
    rows: [
      {
        left: { title: 'Order ID', subtitle: 'Reference' },
        right: { title: '#12345', subtitle: 'Active', align: 'end' as const },
      },
      {
        left: { title: 'Customer', subtitle: 'Company' },
        right: { title: 'ABC Corp', subtitle: 'Verified', align: 'end' as const },
      },
      {
        left: { title: 'Amount', subtitle: 'Total' },
        right: { title: '$1,234.00', subtitle: 'Paid', align: 'end' as const },
      },
    ],
  },
};
