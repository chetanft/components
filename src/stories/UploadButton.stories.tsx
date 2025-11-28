import type { Meta, StoryObj } from '@storybook/react';
import { UploadButton } from '../components/molecules/UploadButton';

const meta = {
  title: 'Molecules/UploadButton',
  component: UploadButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A button component for file uploads with different states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'disabled'],
      description: 'The button state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
  },
} satisfies Meta<typeof UploadButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: 'default',
    onFileSelect: (files) => {
      console.log('Selected files:', files);
    },
  },
};

export const Hover: Story = {
  args: {
    state: 'hover',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    onFileSelect: (files) => {
      console.log('Selected multiple files:', files);
    },
  },
};

