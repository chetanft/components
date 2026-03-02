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
    explorer: {
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      defaultRowId: 'type',
      defaultScenarioId: 'Default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'Default', label: 'Default', story: 'Default' as const },
            { id: 'Hover', label: 'Hover', story: 'Hover' as const },
            { id: 'MultipleFiles', label: 'Multiple Files', story: 'MultipleFiles' as const },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'Default', label: 'Default', story: 'Default' as const },
            { id: 'Disabled', label: 'Disabled', story: 'Disabled' as const },
          ],
        },
      ],
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  args: {
    glass: true,
  },
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
    glass: {
      control: 'select',
      options: [false, true, 'subtle', 'prominent'],
      description: 'Glass style variant',
    },
  },
} satisfies Meta<typeof UploadButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: 'default',
    onFileSelect: (files: FileList | File[]) => {
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
    onFileSelect: (files: FileList | File[]) => {
      console.log('Selected multiple files:', files);
    },
  },
};
