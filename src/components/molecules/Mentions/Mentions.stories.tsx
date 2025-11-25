import type { Meta, StoryObj } from '@storybook/react';
import { Mentions } from './Mentions';

const meta: Meta<typeof Mentions> = {
  title: 'Molecules/Mentions',
  component: Mentions,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Mentions>;

export const Basic: Story = {
  render: () => (
    <Mentions
      style={{ width: '100%', height: 100 }}
      placeholder="Type @ to see mentions"
      options={[
        { value: 'afc163', label: 'afc163' },
        { value: 'zombieJ', label: 'zombieJ' },
        { value: 'yesmeck', label: 'yesmeck' },
      ]}
    />
  ),
};

export const CustomPrefix: Story = {
    render: () => (
      <Mentions
        style={{ width: '100%', height: 100 }}
        placeholder="Type # to see tags"
        prefix="#"
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
        ]}
      />
    ),
  };

