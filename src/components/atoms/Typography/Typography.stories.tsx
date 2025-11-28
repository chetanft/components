import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '🎨 **Typography Component** - Reusable text component with exact Figma specifications. Perfect for AI tools, development, and design documentation. Use this for all text rendering needs.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'title-primary',
        'title-secondary',
        'display-primary',
        'button',
        'body-primary-semibold',
        'body-primary-medium',
        'body-primary-italic',
        'body-primary-regular',
        'body-secondary-semibold',
        'body-secondary-medium',
        'body-secondary-regular'
      ],
      description: 'Typography variant based on Figma design system (28/140 = 28px font, 140% line-height)'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
      description: 'Text color semantic variants'
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default interactive story for controls
export const Default: Story = {
  args: {
    children: 'Interactive Typography Component',
    variant: 'body-primary-regular',
  },
};

// Individual variant stories - Figma Design System
export const TitlePrimary: Story = {
  args: {
    children: 'Page Title - 28/140',
    variant: 'title-primary',
  },
};

export const TitleSecondary: Story = {
  args: {
    children: 'Section Heading - 24/140',
    variant: 'title-secondary',
  },
};

export const DisplayPrimary: Story = {
  args: {
    children: 'Display Primary - 20/140',
    variant: 'display-primary',
  },
};

export const ButtonText: Story = {
  args: {
    children: 'Button Text - 20/140',
    variant: 'button',
  },
};

export const BodyPrimarySemibold: Story = {
  args: {
    children: 'Body Primary Semibold - 16/140',
    variant: 'body-primary-semibold',
  },
};

export const BodyPrimaryMedium: Story = {
  args: {
    children: 'Body Primary Medium - 16/140',
    variant: 'body-primary-medium',
  },
};

export const BodyPrimaryItalic: Story = {
  args: {
    children: 'Body Primary Italic - 16/140',
    variant: 'body-primary-italic',
  },
};

export const BodyPrimaryRegular: Story = {
  args: {
    children: 'Body Primary Regular - 16/140',
    variant: 'body-primary-regular',
  },
};

export const BodySecondarySemibold: Story = {
  args: {
    children: 'Body Secondary Semibold - 14/140',
    variant: 'body-secondary-semibold',
  },
};

export const BodySecondaryMedium: Story = {
  args: {
    children: 'Body Secondary Medium - 14/140',
    variant: 'body-secondary-medium',
  },
};

export const BodySecondaryRegular: Story = {
  args: {
    children: 'Body Secondary Regular - 14/140',
    variant: 'body-secondary-regular',
  },
};

// Color variants
export const ErrorMessage: Story = {
  args: {
    children: 'Error message text',
    color: 'danger',
  },
};

export const SuccessMessage: Story = {
  args: {
    children: 'Success confirmation message',
    color: 'success',
  },
};
