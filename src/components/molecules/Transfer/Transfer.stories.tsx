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
        component: 'A transfer component for moving items between two lists using a composable API.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase' as const, args: { oneWay: false } },
            { id: 'one-way', label: 'One Way', story: 'ExplorerBase' as const, args: { oneWay: true } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase' as const, args: {} },
          ],
        },
      ],
      defaultRowId: 'type' as const,
      defaultScenarioId: 'default' as const,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Transfer>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const oneWay = Boolean(args.oneWay);
    const [targetKeys, setTargetKeys] = useState<string[]>(['1', '5']);
    const syncKey = JSON.stringify({ oneWay });
    const data = Array.from({ length: 20 }).map((_, i) => ({
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
      disabled: i % 3 < 1,
    }));
    return (
      <div key={syncKey}>
        <Transfer
          oneWay={oneWay}
          targetKeys={targetKeys}
          onChange={setTargetKeys}
          titles={['Source', 'Target']}
        >
          {data.map(item => (
            <TransferItem key={item.key} id={item.key} title={item.title} disabled={item.disabled}>
              {item.title}
            </TransferItem>
          ))}
        </Transfer>
      </div>
    );
  },
};

const mockData = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
  disabled: i % 3 < 1,
}));

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

/** All visual variants: bidirectional and one-way transfer. */
export const DocsVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Bidirectional Transfer</p>
        <ComposableTransferDemo />
      </div>
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">One-Way Transfer</p>
        <ComposableOneWayTransferStory />
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}