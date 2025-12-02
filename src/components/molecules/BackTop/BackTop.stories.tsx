import type { Meta, StoryObj } from '@storybook/react';
import { BackTop } from './BackTop';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button/Button';

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
        <Button
          variant="primary"
          size="md"
        >
          UP
        </Button>
      </BackTop>
    </div>
  ),
};

