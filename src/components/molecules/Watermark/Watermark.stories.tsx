import type { Meta, StoryObj } from '@storybook/react';
import { Watermark } from './Watermark';
import { Typography } from '../../atoms/Typography';

const meta: Meta<typeof Watermark> = {
  title: 'Molecules/Watermark',
  component: Watermark,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Watermark>;

export const Basic: Story = {
  render: () => (
    <Watermark content="FT Design System">
      <div style={{ height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="title-secondary">Confidential Content</Typography>
      </div>
    </Watermark>
  ),
};

export const MultiLine: Story = {
  render: () => (
    <Watermark content={['Confidential', 'Do Not Share']}>
      <div style={{ height: 500, backgroundColor: '#fff' }} />
    </Watermark>
  ),
};

export const CustomStyle: Story = {
  render: () => (
    <Watermark
      content="Draft"
      font={{ color: 'rgba(255, 0, 0, 0.15)', fontSize: 24 }}
      rotate={-45}
    >
      <div style={{ height: 500, backgroundColor: '#fff' }} />
    </Watermark>
  ),
};

