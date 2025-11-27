import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
        control: { type: 'select' },
        options: ['info', 'success', 'warning', 'danger'],
    },
    radius: {
        control: { type: 'select' },
        options: ['none', 'sm', 'md', 'lg'],
        description: 'Border radius of the alert',
    }
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    message: 'This is an alert message',
    variant: 'info',
  },
};

export const Info: Story = {
  args: {
    message: 'This is an info alert message',
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    message: 'This is a success alert message',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    message: 'This is a warning alert message',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    message: 'This is a danger alert message',
    variant: 'danger',
  },
};

export const Banner: Story = {
    args: {
        message: 'This is a banner alert',
        banner: true,
        variant: 'warning',
    }
};

export const WithAction: Story = {
    render: () => (
        <Alert 
            message="Error Text" 
            variant="danger"
            action={
                <Button size="sm" variant="destructive">
                    Detail
                </Button>
            }
        />
    )
};

export const RadiusSmall: Story = {
    args: {
        message: 'Alert with small radius',
        variant: 'info',
        radius: 'sm',
    },
};

export const RadiusMedium: Story = {
    args: {
        message: 'Alert with medium radius (default)',
        variant: 'success',
        radius: 'md',
    },
};

export const RadiusLarge: Story = {
    args: {
        message: 'Alert with large radius',
        variant: 'warning',
        radius: 'lg',
    },
};

export const RadiusNone: Story = {
    args: {
        message: 'Alert with no radius',
        variant: 'danger',
        radius: 'none',
    },
};
