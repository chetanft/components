import type { Meta, StoryObj } from '@storybook/react';
import {
  ProgressList,
  ProgressListItem,
  ProgressListDivider,
  type ProgressListItemType,
  type ProgressItem,
  type DividerItem,
} from '../components/molecules/ProgressList';

const meta: Meta<typeof ProgressList> = {
  title: 'Stories/ProgressList',
  component: ProgressList,
  parameters: {
    docsOnly: true,
    layout: 'padded',
    docs: {
      description: {
        component: 'A progress list component for displaying timeline-style progress tracking.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgressList>;

function isDivider(item: ProgressListItemType): item is DividerItem {
  return 'type' in item && item.type === 'divider';
}

const renderProgressItems = (items: ProgressListItemType[]) =>
  items.map((item) => {
    if (isDivider(item)) {
      return <ProgressListDivider key={item.id} id={item.id} label={item.label} />;
    }

    const progressItem = item as ProgressItem;
    return (
      <ProgressListItem
        key={progressItem.id}
        id={progressItem.id}
        title={progressItem.title}
        description={progressItem.description}
        state={progressItem.state}
        pointType={progressItem.pointType}
        lineType={progressItem.lineType}
        startTime={progressItem.startTime}
        endTime={progressItem.endTime}
        timeLabel={progressItem.timeLabel}
        icon={progressItem.icon}
        pointLabel={progressItem.pointLabel}
        badges={progressItem.badges}
        headerType={progressItem.headerType}
        showHeaderLine={progressItem.showHeaderLine}
        collapsible={progressItem.collapsible}
        multiplePoints={progressItem.multiplePoints}
      >
        {progressItem.content}
      </ProgressListItem>
    );
  });

export const Default: Story = {
  render: () => {
    const items: ProgressListItemType[] = [
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
    ];

    return <ProgressList showTime={false}>{renderProgressItems(items)}</ProgressList>;
  },
};

export const WithTime: Story = {
  render: () => {
    const items: ProgressListItemType[] = [
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
    ];

    return <ProgressList showTime>{renderProgressItems(items)}</ProgressList>;
  },
};

export const FourSteps: Story = {
  render: () => {
    const items: ProgressListItemType[] = [
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
    ];

    return <ProgressList showTime={false}>{renderProgressItems(items)}</ProgressList>;
  },
};

export const DocsVariants: Story = {
  name: 'Variants',
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Without Time</p>
        <ProgressList showTime={false}>
          <ProgressListItem id="1" title="Step 1" description="Done" state="completed" pointType="icon" lineType="solid" icon="check" />
          <ProgressListItem id="2" title="Step 2" description="In progress" state="current" pointType="primary" lineType="solid" />
          <ProgressListItem id="3" title="Step 3" description="Pending" state="upcoming" pointType="label" lineType="none" pointLabel="3" />
        </ProgressList>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">With Time</p>
        <ProgressList showTime>
          <ProgressListItem id="1" title="Received" description="Confirmed" state="completed" pointType="icon" lineType="solid" icon="check" timeLabel="Received" startTime="09:00 AM" />
          <ProgressListItem id="2" title="In Transit" description="On the way" state="current" pointType="primary" lineType="solid" timeLabel="Started" startTime="10:30 AM" />
          <ProgressListItem id="3" title="Delivery" description="ETA pending" state="upcoming" pointType="label" lineType="none" pointLabel="D" timeLabel="ETA" startTime="02:00 PM" />
        </ProgressList>
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}