import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Alert } from './Alert';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An alert component for displaying important messages to users. Supports different variants and can be closable.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger'],
      description: 'The visual style variant of the alert',
    },
    title: {
      control: { type: 'text' },
      description: 'Optional title text',
    },
    message: {
      control: { type: 'text' },
      description: 'The alert message content',
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Whether the alert can be closed',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default info alert
export const Default: Story = {
  args: {
    variant: 'info',
    message: 'This is an informational alert message.',
  },
};

// Success variant
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    message: 'Your changes have been saved successfully.',
  },
};

// Warning variant
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    message: 'Please review your input before proceeding.',
  },
};

// Danger variant
export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
  },
};

// With title
export const WithTitle: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    message: 'This alert includes a title for better context.',
  },
};

// Closable alert
export const Closable: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    message: 'You can close this alert by clicking the X button.',
    closable: true,
  },
};

