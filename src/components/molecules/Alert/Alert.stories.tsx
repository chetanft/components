import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { AlertIcon } from './AlertIcon';
import { AlertTitle } from './AlertTitle';
import { AlertDescription } from './AlertDescription';
import { AlertAction } from './AlertAction';
import { AlertClose } from './AlertClose';
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

// Composable API Examples (Recommended)
export const Default: Story = {
    render: () => (
        <Alert variant="info" radius="md">
            <AlertIcon />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>This is an info alert message using the composable API.</AlertDescription>
        </Alert>
    ),
};

export const WithAction: Story = {
    render: () => (
        <Alert variant="success" radius="md">
            <AlertIcon />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes have been saved successfully.</AlertDescription>
            <AlertAction>
                <Button size="sm" variant="primary">View Details</Button>
            </AlertAction>
        </Alert>
    ),
};

export const Closable: Story = {
    render: () => (
        <Alert variant="warning" radius="md">
            <AlertIcon />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>This alert can be dismissed.</AlertDescription>
            <AlertClose />
        </Alert>
    ),
};

export const Complete: Story = {
    render: () => (
        <Alert variant="danger" radius="md">
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong. Please try again.</AlertDescription>
            <AlertAction>
                <Button size="sm" variant="destructive">Retry</Button>
            </AlertAction>
            <AlertClose />
        </Alert>
    ),
};

// Legacy API Examples (for backward compatibility)
/** @deprecated Use composable API instead. */
export const LegacyDefault: Story = {
  args: {
    message: 'This is an alert message',
    variant: 'info',
  },
  parameters: {
    docs: {
      description: {
        story: '⚠️ **Deprecated**: This uses the deprecated `message` prop. Use the composable API with `AlertDescription` instead.',
      },
    },
  },
};

/** @deprecated Use composable API instead. */
export const LegacyInfo: Story = {
  args: {
    message: 'This is an info alert message',
    variant: 'info',
  },
};

/** @deprecated Use composable API instead. */
export const LegacySuccess: Story = {
  args: {
    message: 'This is a success alert message',
    variant: 'success',
  },
};

/** @deprecated Use composable API instead. */
export const LegacyWarning: Story = {
  args: {
    message: 'This is a warning alert message',
    variant: 'warning',
  },
};

/** @deprecated Use composable API instead. */
export const LegacyDanger: Story = {
  args: {
    message: 'This is a danger alert message',
    variant: 'danger',
  },
};

/** @deprecated Use composable API instead. */
export const LegacyBanner: Story = {
    args: {
        message: 'This is a banner alert',
        banner: true,
        variant: 'warning',
    }
};

/** @deprecated Use composable API instead. */
export const LegacyWithAction: Story = {
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

/** @deprecated Use composable API instead. */
export const LegacyRadiusSmall: Story = {
    args: {
        message: 'Alert with small radius',
        variant: 'info',
        radius: 'sm',
    },
};

/** @deprecated Use composable API instead. */
export const LegacyRadiusMedium: Story = {
    args: {
        message: 'Alert with medium radius (default)',
        variant: 'success',
        radius: 'md',
    },
};

/** @deprecated Use composable API instead. */
export const LegacyRadiusLarge: Story = {
    args: {
        message: 'Alert with large radius',
        variant: 'warning',
        radius: 'lg',
    },
};

/** @deprecated Use composable API instead. */
export const LegacyRadiusNone: Story = {
    args: {
        message: 'Alert with no radius',
        variant: 'danger',
        radius: 'none',
    },
};
