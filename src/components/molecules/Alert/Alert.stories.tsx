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
            description="Error Description Error Description Error Description Error Description"
            type="error"
            action={
                <Button size="sm" variant="destructive">
                    Detail
                </Button>
            }
        />
    )
};
