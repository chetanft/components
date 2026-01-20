import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'with-label'],
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    dashed: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <div className="text-sm text-[var(--primary)]">Content above divider</div>
      <Divider type="primary" />
      <div className="text-sm text-[var(--primary)]">Content below divider</div>
    </div>
  ),
};

export const Primary: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <div className="text-sm text-[var(--primary)]">Content above divider</div>
      <Divider type="primary" />
      <div className="text-sm text-[var(--primary)]">Content below divider</div>
    </div>
  ),
};

export const Secondary: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <div className="text-sm text-[var(--primary)]">Content above divider</div>
      <Divider type="secondary" />
      <div className="text-sm text-[var(--primary)]">Content below divider</div>
    </div>
  ),
};

export const Tertiary: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <div className="text-sm text-[var(--primary)]">Content above divider</div>
      <Divider type="tertiary" />
      <div className="text-sm text-[var(--primary)]">Content below divider</div>
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-6 w-full">
      <div>
        <div className="text-sm text-[var(--primary)] mb-2">Primary Divider</div>
        <Divider type="primary" />
      </div>
      <div>
        <div className="text-sm text-[var(--primary)] mb-2">Secondary Divider</div>
        <Divider type="secondary" />
      </div>
      <div>
        <div className="text-sm text-[var(--primary)] mb-2">Tertiary Divider (Dashed)</div>
        <Divider type="tertiary" />
      </div>
      <div>
        <div className="text-sm text-[var(--primary)] mb-2">With Label</div>
        <Divider type="with-label" label="With Label" />
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <div className="text-sm text-[var(--primary)]">Content above divider</div>
      <Divider type="with-label" label="Label" />
      <div className="text-sm text-[var(--primary)]">Content below divider</div>
    </div>
  ),
};

export const Dashed: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <div className="text-sm text-[var(--primary)]">Content above dashed divider</div>
      <Divider dashed={true} />
      <div className="text-sm text-[var(--primary)]">Content below dashed divider</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      Text
      <Divider direction="vertical" />
      Link
      <Divider direction="vertical" />
      Action
    </div>
  ),
};

export const TextPositions: Story = {
  render: () => (
    <>
      <Divider orientation="left">Left Text</Divider>
      <Divider orientation="center">Center Text</Divider>
      <Divider orientation="right">Right Text</Divider>
    </>
  ),
};
