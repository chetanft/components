import type { Meta, StoryObj } from '@storybook/react';
import { FloatButton, FloatButtonGroup } from './FloatButton';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof FloatButton> = {
  title: 'Molecules/FloatButton',
  component: FloatButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    explorer: {
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'basic', label: 'Basic', story: 'Basic' as const },
            { id: 'with-type', label: 'WithType', story: 'WithType' as const },
            { id: 'group', label: 'Group', story: 'Group' as const },
          ],
        },
      ],
      defaultRowId: 'type' as const,
      defaultScenarioId: 'basic' as const,
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatButton>;

export const Basic: Story = {
  render: () => (
    <div style={{ height: '300px', position: 'relative', border: '1px solid #eee' }}>
      <FloatButton
        style={{ position: 'absolute', right: 24, bottom: 24 }}
        icon={<Icon name="add" />}
        onClick={() => console.log('clicked')}
      />
    </div>
  ),
};

export const WithType: Story = {
  render: () => (
    <div style={{ height: '300px', position: 'relative', border: '1px solid #eee' }}>
      <FloatButton
        type="primary"
        style={{ position: 'absolute', right: 24, bottom: 24 }}
        icon={<Icon name="check" />}
      />
      <FloatButton
        style={{ position: 'absolute', right: 80, bottom: 24 }}
        icon={<Icon name="help-circle" />}
        shape="square"
      />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={{ height: '300px', position: 'relative', border: '1px solid #eee' }}>
      <FloatButtonGroup trigger="click" type="primary" style={{ position: 'absolute', right: 24, bottom: 24 }}>
        <FloatButton icon={<Icon name="user" />} />
        <FloatButton icon={<Icon name="settings" />} />
      </FloatButtonGroup>
    </div>
  )
};

