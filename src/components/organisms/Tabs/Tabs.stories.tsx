import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Organisms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'card'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const tabsData = [
    { label: 'Tab 1', children: 'Content of Tab 1' },
    { label: 'Tab 2', children: 'Content of Tab 2' },
    { label: 'Tab 3', children: 'Content of Tab 3' },
];

export const Primary: Story = {
  args: {
    tabs: tabsData,
    type: 'primary',
  },
};

export const Card: Story = {
  args: {
    tabs: tabsData,
    type: 'card',
  },
};

export const CardWithEdit: Story = {
    render: () => (
        <Tabs 
            type="card"
            tabs={[
                { label: 'Tab 1', children: 'Content 1', closable: true },
                { label: 'Tab 2', children: 'Content 2', closable: true },
            ]}
            onEdit={() => console.log('Edit')}
        />
    )
};
