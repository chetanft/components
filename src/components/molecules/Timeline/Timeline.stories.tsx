import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Molecules/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A timeline component for displaying a list of events in chronological order. Built using FT Design System tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['left', 'right', 'alternate'],
      description: 'Timeline mode',
    },
    pending: {
      control: 'boolean',
      description: 'Show pending state on last item',
    },
    reverse: {
      control: 'boolean',
      description: 'Reverse the timeline order',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

// Basic Timeline
export const Default: Story = {
  render: (args: React.ComponentProps<typeof Timeline>) => (
    <Timeline {...args}>
      <TimelineItem>Create a services site 2015-09-01</TimelineItem>
      <TimelineItem>Solve initial network problems 2015-09-01</TimelineItem>
      <TimelineItem>Technical testing 2015-09-01</TimelineItem>
      <TimelineItem>Network problems being solved 2015-09-01</TimelineItem>
    </Timeline>
  ),
};

// With Colors
export const WithColors: Story = {
  render: () => (
    <Timeline>
      <TimelineItem color="success">Create a services site 2015-09-01</TimelineItem>
      <TimelineItem color="success">Solve initial network problems 2015-09-01</TimelineItem>
      <TimelineItem color="danger">Technical testing 2015-09-01</TimelineItem>
      <TimelineItem color="neutral">Network problems being solved 2015-09-01</TimelineItem>
    </Timeline>
  ),
};

// With Custom Icons
export const WithCustomIcons: Story = {
  render: () => (
    <Timeline>
      <TimelineItem dot="check-circle" color="success">
        <p className="font-medium">Step 1: Order Placed</p>
        <p className="text-sm text-[var(--color-tertiary)]">2015-09-01 09:12:11</p>
      </TimelineItem>
      <TimelineItem dot="package" color="primary">
        <p className="font-medium">Step 2: Order Shipped</p>
        <p className="text-sm text-[var(--color-tertiary)]">2015-09-02 10:24:31</p>
      </TimelineItem>
      <TimelineItem dot="truck" color="warning">
        <p className="font-medium">Step 3: In Transit</p>
        <p className="text-sm text-[var(--color-tertiary)]">2015-09-03 14:33:56</p>
      </TimelineItem>
      <TimelineItem dot="home" color="neutral">
        <p className="font-medium">Step 4: Delivered</p>
        <p className="text-sm text-[var(--color-tertiary)]">Expected 2015-09-05</p>
      </TimelineItem>
    </Timeline>
  ),
};

// Alternate Mode
export const AlternateMode: Story = {
  render: () => (
    <Timeline mode="alternate">
      <TimelineItem label="2015-09-01">Create a services site</TimelineItem>
      <TimelineItem label="2015-09-02">Solve initial network problems</TimelineItem>
      <TimelineItem label="2015-09-03">Technical testing</TimelineItem>
      <TimelineItem label="2015-09-04">Network problems being solved</TimelineItem>
    </Timeline>
  ),
};

// Right Mode
export const RightMode: Story = {
  render: () => (
    <Timeline mode="right">
      <TimelineItem>Create a services site 2015-09-01</TimelineItem>
      <TimelineItem>Solve initial network problems 2015-09-01</TimelineItem>
      <TimelineItem>Technical testing 2015-09-01</TimelineItem>
      <TimelineItem>Network problems being solved 2015-09-01</TimelineItem>
    </Timeline>
  ),
};

// With Pending
export const WithPending: Story = {
  render: () => (
    <Timeline pending="Recording...">
      <TimelineItem>Create a services site 2015-09-01</TimelineItem>
      <TimelineItem>Solve initial network problems 2015-09-01</TimelineItem>
      <TimelineItem>Technical testing 2015-09-01</TimelineItem>
    </Timeline>
  ),
};

// Reversed
export const Reversed: Story = {
  render: () => (
    <Timeline reverse>
      <TimelineItem>Create a services site 2015-09-01</TimelineItem>
      <TimelineItem>Solve initial network problems 2015-09-01</TimelineItem>
      <TimelineItem>Technical testing 2015-09-01</TimelineItem>
      <TimelineItem>Network problems being solved 2015-09-01</TimelineItem>
    </Timeline>
  ),
};

// Complex Content
export const ComplexContent: Story = {
  render: () => (
    <Timeline>
      <TimelineItem color="success" dot="check-circle">
        <div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
          <h4 className="font-medium text-[var(--color-primary)]">Application Submitted</h4>
          <p className="text-sm text-[var(--color-secondary)] mt-1">Your application has been received and is being processed.</p>
          <p className="text-xs text-[var(--color-tertiary)] mt-2">September 1, 2015 at 9:12 AM</p>
        </div>
      </TimelineItem>
      <TimelineItem color="success" dot="check-circle">
        <div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
          <h4 className="font-medium text-[var(--color-primary)]">Documents Verified</h4>
          <p className="text-sm text-[var(--color-secondary)] mt-1">All required documents have been verified successfully.</p>
          <p className="text-xs text-[var(--color-tertiary)] mt-2">September 2, 2015 at 2:30 PM</p>
        </div>
      </TimelineItem>
      <TimelineItem color="warning" dot="clock">
        <div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
          <h4 className="font-medium text-[var(--color-primary)]">Under Review</h4>
          <p className="text-sm text-[var(--color-secondary)] mt-1">Your application is currently under review by our team.</p>
          <p className="text-xs text-[var(--color-tertiary)] mt-2">September 3, 2015 at 10:00 AM</p>
        </div>
      </TimelineItem>
    </Timeline>
  ),
};
