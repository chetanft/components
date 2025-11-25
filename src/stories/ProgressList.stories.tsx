import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressList } from '../components/molecules/ProgressList/ProgressList';

const meta: Meta<typeof ProgressList> = {
  title: 'Molecules/ProgressList',
  component: ProgressList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A progress list component for displaying timeline-style progress tracking.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressList>;

export const Default: Story = {
  args: {
    showTime: false,
    items: [
      {
        id: '1',
        title: 'Order Placed',
        description: 'Your order has been placed',
        state: 'completed',
        pointType: 'icon',
        lineType: 'solid',
        icon: 'check',
      },
      {
        id: '2',
        title: 'Processing',
        description: 'Order is being processed',
        state: 'current',
        pointType: 'primary',
        lineType: 'solid',
      },
      {
        id: '3',
        title: 'Shipped',
        description: 'Package ready for delivery',
        state: 'upcoming',
        pointType: 'label',
        lineType: 'dashed',
        pointLabel: 'S',
      },
    ],
  },
};

export const WithTime: Story = {
  args: {
    showTime: true,
    items: [
      {
        id: '1',
        title: 'Order Received',
        description: 'Order confirmed',
        state: 'completed',
        pointType: 'icon',
        lineType: 'solid',
        icon: 'check',
        timeLabel: 'Received',
        startTime: '09:00 AM',
      },
      {
        id: '2',
        title: 'In Transit',
        description: 'Package on the way',
        state: 'current',
        pointType: 'primary',
        lineType: 'solid',
        timeLabel: 'Started',
        startTime: '10:30 AM',
      },
      {
        id: '3',
        title: 'Delivery',
        description: 'Expected arrival',
        state: 'upcoming',
        pointType: 'label',
        lineType: 'dashed',
        pointLabel: 'D',
        timeLabel: 'ETA',
        startTime: '02:00 PM',
      },
    ],
  },
};

export const FourSteps: Story = {
  args: {
    showTime: false,
    items: [
      {
        id: '1',
        title: 'Step 1 - Complete',
        description: 'First step completed',
        state: 'completed',
        pointType: 'icon',
        lineType: 'solid',
        icon: 'check',
      },
      {
        id: '2',
        title: 'Step 2 - In Progress',
        description: 'Currently working on this',
        state: 'current',
        pointType: 'primary',
        lineType: 'solid',
      },
      {
        id: '3',
        title: 'Step 3 - Upcoming',
        description: 'Next step',
        state: 'upcoming',
        pointType: 'label',
        lineType: 'dashed',
        pointLabel: '3',
      },
      {
        id: '4',
        title: 'Step 4 - Final',
        description: 'Last step',
        state: 'upcoming',
        pointType: 'label',
        lineType: 'none',
        pointLabel: 'END',
      },
    ],
  },
};

export const ShipmentTracking: Story = {
  args: {
    showTime: false,
    items: [
      {
        id: '1',
        title: 'Shipment Departed',
        description: 'Left origin warehouse',
        state: 'completed',
        pointType: 'icon',
        lineType: 'solid',
        icon: 'check',
      },
      {
        id: '2',
        title: 'In Transit',
        description: 'Currently on route',
        state: 'current',
        pointType: 'primary',
        lineType: 'solid',
      },
      {
        id: '3',
        title: 'Destination',
        description: 'Final delivery point',
        state: 'upcoming',
        pointType: 'label',
        lineType: 'none',
        pointLabel: 'D',
      },
    ],
  },
};
