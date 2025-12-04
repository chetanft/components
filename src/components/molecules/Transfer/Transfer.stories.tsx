import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Transfer, TransferItem } from './Transfer';

const meta: Meta<typeof Transfer> = {
  title: 'Molecules/Transfer',
  component: Transfer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A transfer component for moving items between two lists. Supports both composable API (recommended) and declarative API (deprecated).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Transfer>;

const mockData = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
  disabled: i % 3 < 1,
}));

// Declarative API Examples
const DeclarativeTransferDemo = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1', '5']);

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={onChange}
      titles={['Source', 'Target']}
      render={(item) => item.title || ''}
    />
  );
};

const DeclarativeOneWayTransferStory = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1']);

  return (
    <Transfer
      oneWay
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      titles={['Source', 'Target']}
      render={(item) => item.title || ''}
    />
  );
};

// Composable API Examples
const ComposableTransferDemo = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1', '5']);

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Transfer
      targetKeys={targetKeys}
      onChange={onChange}
      titles={['Source', 'Target']}
    >
      {mockData.map(item => (
        <TransferItem key={item.key} id={item.key} title={item.title} disabled={item.disabled}>
          {item.title}
        </TransferItem>
      ))}
    </Transfer>
  );
};

const ComposableOneWayTransferStory = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1']);

  return (
    <Transfer
      oneWay
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      titles={['Source', 'Target']}
    >
      {mockData.map(item => (
        <TransferItem key={item.key} id={item.key} title={item.title} disabled={item.disabled}>
          {item.title}
        </TransferItem>
      ))}
    </Transfer>
  );
};

export const DeclarativeBasic: Story = {
  render: () => <DeclarativeTransferDemo />,
};

export const DeclarativeOneWay: Story = {
  render: () => <DeclarativeOneWayTransferStory />
};

export const ComposableBasic: Story = {
  render: () => <ComposableTransferDemo />,
};

export const ComposableOneWay: Story = {
  render: () => <ComposableOneWayTransferStory />
};
