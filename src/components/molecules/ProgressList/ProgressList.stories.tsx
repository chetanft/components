import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProgressList, ProgressListItem, ProgressListDivider } from './ProgressList';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof ProgressList> = {
  title: 'Molecules/ProgressList',
  component: ProgressList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A progress list component for displaying step-by-step progress with visual indicators. Supports both composable API (recommended) and declarative API (deprecated).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showTime: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressList>;

// Declarative API Examples
/** @deprecated Use composable API instead. */
export const LegacyDeclarativeBasic: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Step 1',
        description: 'This is step 1',
        state: 'completed',
        pointType: 'primary',
        lineType: 'solid',
      },
      {
        id: '2',
        title: 'Step 2',
        description: 'This is step 2',
        state: 'current',
        pointType: 'primary',
        lineType: 'solid',
      },
      {
        id: '3',
        title: 'Step 3',
        description: 'This is step 3',
        state: 'upcoming',
        pointType: 'primary',
        lineType: 'dashed',
      },
    ],
  },
};

/** @deprecated Use composable API instead. */
export const LegacyDeclarativeWithTime: Story = {
  args: {
    showTime: true,
    items: [
      {
        id: '1',
        title: 'Step 1',
        description: 'This is step 1',
        state: 'completed',
        pointType: 'primary',
        lineType: 'solid',
        timeLabel: 'Start time',
        startTime: '09:30 AM',
        endTime: '10:00 AM',
      },
      {
        id: '2',
        title: 'Step 2',
        description: 'This is step 2',
        state: 'current',
        pointType: 'primary',
        lineType: 'solid',
        timeLabel: 'ETA',
        startTime: '10:00 AM',
      },
    ],
  },
};

/** @deprecated Use composable API instead. */
export const LegacyDeclarativeWithBadges: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Step with badges',
        description: 'This step has badges',
        state: 'completed',
        pointType: 'icon',
        lineType: 'solid',
        icon: 'check',
        badges: [
          {
            label: 'Completed',
            variant: 'normal',
          },
          {
            label: '30 min',
            icon: 'clock',
            variant: 'danger',
          },
        ],
      },
    ],
  },
};

// Composable API Examples
export const Default: Story = {
  render: () => (
    <ProgressList>
      <ProgressListItem
        id="1"
        title="Step 1"
        description="This is step 1"
        state="completed"
        pointType="primary"
        lineType="solid"
      />
      <ProgressListItem
        id="2"
        title="Step 2"
        description="This is step 2"
        state="current"
        pointType="primary"
        lineType="solid"
      />
      <ProgressListItem
        id="3"
        title="Step 3"
        description="This is step 3"
        state="upcoming"
        pointType="primary"
        lineType="dashed"
      />
    </ProgressList>
  ),
};

export const WithTime: Story = {
  render: () => (
    <ProgressList showTime>
      <ProgressListItem
        id="1"
        title="Step 1"
        description="This is step 1"
        state="completed"
        pointType="primary"
        lineType="solid"
        timeLabel="Start time"
        startTime="09:30 AM"
        endTime="10:00 AM"
      />
      <ProgressListItem
        id="2"
        title="Step 2"
        description="This is step 2"
        state="current"
        pointType="primary"
        lineType="solid"
        timeLabel="ETA"
        startTime="10:00 AM"
      />
    </ProgressList>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ProgressList>
      <ProgressListItem
        id="1"
        title="Step 1"
        description="Completed step with icon"
        state="completed"
        pointType="icon"
        lineType="solid"
        icon="check"
      />
      <ProgressListItem
        id="2"
        title="Step 2"
        description="Current step with icon"
        state="current"
        pointType="icon"
        lineType="solid"
        icon="arrow-down"
      />
      <ProgressListItem
        id="3"
        title="Step 3"
        description="Upcoming step"
        state="upcoming"
        pointType="icon"
        lineType="dashed"
        icon="clock"
      />
    </ProgressList>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <ProgressList>
      <ProgressListItem
        id="1"
        title="Step with badges"
        description="This step has badges"
        state="completed"
        pointType="icon"
        lineType="solid"
        icon="check"
        badges={[
          {
            label: 'Completed',
            variant: 'normal',
          },
          {
            label: '30 min',
            icon: 'clock',
            variant: 'danger',
          },
        ]}
      />
    </ProgressList>
  ),
};

export const WithDivider: Story = {
  render: () => (
    <ProgressList>
      <ProgressListItem
        id="1"
        title="Step 1"
        description="First section"
        state="completed"
        pointType="primary"
        lineType="solid"
      />
      <ProgressListItem
        id="2"
        title="Step 2"
        description="First section continued"
        state="completed"
        pointType="primary"
        lineType="solid"
      />
      <ProgressListDivider id="div1" label="Section Break" />
      <ProgressListItem
        id="3"
        title="Step 3"
        description="Second section"
        state="current"
        pointType="primary"
        lineType="solid"
      />
      <ProgressListItem
        id="4"
        title="Step 4"
        description="Second section continued"
        state="upcoming"
        pointType="primary"
        lineType="dashed"
      />
    </ProgressList>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <ProgressList>
      <ProgressListItem
        id="1"
        title="Collapsible Step"
        description="Click to expand/collapse"
        state="completed"
        pointType="parent"
        lineType="solid"
        collapsible
      >
        <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg">
          <p>This is expanded content that can be shown or hidden.</p>
        </div>
      </ProgressListItem>
      <ProgressListItem
        id="2"
        title="Regular Step"
        description="This step is not collapsible"
        state="current"
        pointType="primary"
        lineType="solid"
      />
    </ProgressList>
  ),
};

