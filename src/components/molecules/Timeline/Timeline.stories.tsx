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
    explorer: {
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'alternate', label: 'Alternate', story: 'ExplorerBase', args: { contentType: 'alternate' } },
            { id: 'with-custom-content', label: 'Custom Content', story: 'ExplorerBase', args: { contentType: 'custom' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
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

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const syncKey = JSON.stringify({ contentType });
    return (
      <div key={syncKey}>
        {contentType === 'alternate' ? (
          <Timeline mode="alternate">
            <TimelineItem>
              <TimelineDot color="success" icon="check" />
              <TimelineContent>
                <TimelineLabel>2015-09-01</TimelineLabel>
                <p className="font-medium">Application Submitted</p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineDot color="warning" icon="clock" />
              <TimelineContent>
                <TimelineLabel>2015-09-02</TimelineLabel>
                <p className="font-medium">Under Review</p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        ) : contentType === 'custom' ? (
          <Timeline>
            <TimelineItem>
              <TimelineDot color="success" icon="check" />
              <TimelineContent>
                <div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
                  <h4 className="font-medium text-[var(--color-primary)]">Order Placed</h4>
                  <p className="text-sm text-[var(--color-secondary)] mt-1">Your order #12345 has been placed.</p>
                  <TimelineLabel className="mt-2">September 1, 2015</TimelineLabel>
                </div>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem pending>
              <TimelineDot color="neutral" icon="truck" />
              <TimelineContent>
                <div className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
                  <h4 className="font-medium text-[var(--color-primary)]">In Transit</h4>
                  <p className="text-sm text-[var(--color-secondary)] mt-1">Your order is on its way.</p>
                </div>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        ) : (
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
        )}
      </div>
    );
  },
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

export const DocsAlternate: Story = {
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

  parameters: { docsOnly: true },
}