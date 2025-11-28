import type { Meta, StoryObj } from '@storybook/react';
import { BackTop } from './BackTop';
import { Typography } from '../../atoms/Typography';

const meta: Meta<typeof BackTop> = {
  title: 'Molecules/BackTop',
  component: BackTop,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof BackTop>;

export const Basic: Story = {
  render: () => (
    <div style={{ height: '300vh', padding: '20px' }}>
      <Typography variant="display-primary" as="h3">Scroll down to see the BackTop button</Typography>
      <Typography>Current scroll position is monitored.</Typography>
      <BackTop />
    </div>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <div style={{ height: '300vh', padding: '20px' }}>
      <Typography variant="display-primary" as="h3">Scroll down (Custom Button)</Typography>
      <BackTop visibilityHeight={100}>
        <div style={{
          height: 40,
          width: 100,
          lineHeight: '40px',
          borderRadius: 4,
          backgroundColor: '#1088e9',
          color: '#fff',
          textAlign: 'center',
          fontSize: 14
        }}>
          UP
        </div>
      </BackTop>
    </div>
  ),
};

