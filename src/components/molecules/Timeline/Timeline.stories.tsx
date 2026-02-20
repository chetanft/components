import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Timeline, TimelineItem } from './Timeline';
import { TimelineDot } from './TimelineDot';
import { TimelineContent } from './TimelineContent';
import { TimelineLabel } from './TimelineLabel';

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
/** @deprecated Use composable API instead. */
export const LegacyDefault: Story = {
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
/** @deprecated Use composable API instead. */
export const LegacyWithColors: Story = {
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
/** @deprecated Use composable API instead. */
export const LegacyWithCustomIcons: Story = {
  render: () => (
    <Timeline>
      <TimelineItem dot="check" color="success">
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
/** @deprecated Use composable API instead. */
export const LegacyAlternateMode: Story = {
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
/** @deprecated Use composable API instead. */
export const LegacyRightMode: Story = {
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
/** @deprecated Use composable API instead. */
export const LegacyWithPending: Story = {
  render: () => (
    <Timeline pending="Recording...">
      <TimelineItem>Create a services site 2015-09-01</TimelineItem>
      <TimelineItem>Solve initial network problems 2015-09-01</TimelineItem>
      <TimelineItem>Technical testing 2015-09-01</TimelineItem>
    </Timeline>
  ),
};

// Reversed
/** @deprecated Use composable API instead. */
export const LegacyReversed: Story = {
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
/** @deprecated Use composable API instead. */
export const LegacyComplexContent: Story = {
  render: () => (
    <Timeline>
      <TimelineItem color="success" dot="check">
        <div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
          <h4 className="font-medium text-[var(--color-primary)]">Application Submitted</h4>
          <p className="text-sm text-[var(--color-secondary)] mt-1">Your application has been received and is being processed.</p>
          <p className="text-xs text-[var(--color-tertiary)] mt-2">September 1, 2015 at 9:12 AM</p>
        </div>
      </TimelineItem>
      <TimelineItem color="success" dot="check">
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

// Composable API Examples
export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineDot color="success" icon="check" />
        <TimelineContent>
          <TimelineLabel>2015-09-01</TimelineLabel>
          <p>Create a services site</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot color="success" icon="check" />
        <TimelineContent>
          <TimelineLabel>2015-09-02</TimelineLabel>
          <p>Solve initial network problems</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot color="warning" icon="clock" />
        <TimelineContent>
          <TimelineLabel>2015-09-03</TimelineLabel>
          <p>Technical testing</p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const Alternate: Story = {
  render: () => (
    <Timeline mode="alternate">
      <TimelineItem>
        <TimelineDot color="success" icon="check" />
        <TimelineContent>
          <TimelineLabel>2015-09-01</TimelineLabel>
          <p className="font-medium">Application Submitted</p>
          <p className="text-sm text-[var(--color-tertiary)]">Your application has been received</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot color="success" icon="check" />
        <TimelineContent>
          <TimelineLabel>2015-09-02</TimelineLabel>
          <p className="font-medium">Documents Verified</p>
          <p className="text-sm text-[var(--color-tertiary)]">All documents verified successfully</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot color="warning" icon="clock" />
        <TimelineContent>
          <TimelineLabel>2015-09-03</TimelineLabel>
          <p className="font-medium">Under Review</p>
          <p className="text-sm text-[var(--color-tertiary)]">Currently under review</p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineDot color="success" icon="check" />
        <TimelineContent>
          <div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
            <h4 className="font-medium text-[var(--color-primary)]">Order Placed</h4>
            <p className="text-sm text-[var(--color-secondary)] mt-1">Your order #12345 has been placed successfully.</p>
            <TimelineLabel className="mt-2">September 1, 2015 at 9:12 AM</TimelineLabel>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot color="primary" icon="package" />
        <TimelineContent>
          <div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
            <h4 className="font-medium text-[var(--color-primary)]">Order Shipped</h4>
            <p className="text-sm text-[var(--color-secondary)] mt-1">Your order has been shipped via FedEx.</p>
            <TimelineLabel className="mt-2">September 2, 2015 at 2:30 PM</TimelineLabel>
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem pending>
        <TimelineDot color="neutral" icon="truck" />
        <TimelineContent>
          <div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
            <h4 className="font-medium text-[var(--color-primary)]">In Transit</h4>
            <p className="text-sm text-[var(--color-secondary)] mt-1">Your order is on its way.</p>
            <TimelineLabel className="mt-2">Expected: September 5, 2015</TimelineLabel>
          </div>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};
