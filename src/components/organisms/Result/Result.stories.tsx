import type { Meta, StoryObj } from '@storybook/react';
import { Result } from './Result';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Result> = {
  title: 'Organisms/Result',
  component: Result,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '🆕 NEW: Result page component built with FT Design System tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning', '404', '403', '500'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Result>;

export const Success: Story = {
  args: {
    status: 'success',
    title: 'Successfully Purchased!',
    subTitle: 'Order number: 2017182818828182881. Cloud server configuration takes 1-5 minutes, please wait.',
    extra: (
      <div className="flex gap-2">
        <Button variant="primary">Go Console</Button>
        <Button variant="secondary">Buy Again</Button>
      </div>
    ),
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    title: 'Submission Failed',
    subTitle: 'Please check and modify the following information before resubmitting.',
    extra: (
      <div className="flex gap-2">
        <Button variant="primary">Go Console</Button>
        <Button variant="secondary">Buy Again</Button>
      </div>
    ),
  },
};

export const Info: Story = {
  args: {
    status: 'info',
    title: 'Your operation has been executed',
    subTitle: 'Processing will take 24 hours to complete.',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    title: 'There are some problems with your operation',
    subTitle: 'Please review the items below.',
  },
};

export const NotFound: Story = {
  args: {
    status: '404',
    extra: (
      <Button variant="primary">Back Home</Button>
    ),
  },
};

export const Forbidden: Story = {
  args: {
    status: '403',
    extra: (
      <Button variant="primary">Back Home</Button>
    ),
  },
};

export const ServerError: Story = {
  args: {
    status: '500',
    extra: (
      <div className="flex gap-2">
        <Button variant="secondary">Back Home</Button>
        <Button variant="primary">Try Again</Button>
      </div>
    ),
  },
};

export const CustomTitles: Story = {
  args: {
    status: '404',
    title: 'Oops! Page not found',
    subTitle: 'The page you are looking for might have been removed or is temporarily unavailable.',
    extra: (
      <Button variant="primary">Return to Dashboard</Button>
    ),
  },
};

export const WithChildren: Story = {
  args: {
    status: 'error',
    title: 'Submission Failed',
    extra: (
      <Button variant="primary">Retry</Button>
    ),
    children: (
      <div className="p-4 bg-[var(--bg-secondary)] rounded-lg text-left">
        <p className="font-medium text-[var(--primary)] mb-2">Error details:</p>
        <ul className="text-sm text-[var(--secondary)] list-disc list-inside space-y-1">
          <li>Field A is required</li>
          <li>Field B format is incorrect</li>
          <li>Field C exceeds maximum length</li>
        </ul>
      </div>
    ),
  },
};

