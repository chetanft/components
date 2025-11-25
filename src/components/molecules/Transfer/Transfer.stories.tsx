import type { Meta, StoryObj } from '@storybook/react';
import { Transfer } from './Transfer';
import { useState } from 'react';

const meta: Meta<typeof Transfer> = {
  title: 'Molecules/Transfer',
  component: Transfer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
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

const TransferDemo = () => {
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

export const Basic: Story = {
  render: () => <TransferDemo />,
};

export const OneWay: Story = {
    render: () => {
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
    }
};

