import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A modal component for displaying content in an overlay. Supports open/close, ESC key, and outside click.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the modal is open'
    },
    title: {
      control: 'text',
      description: 'Modal title'
    },
    closable: {
      control: 'boolean',
      description: 'Whether the modal can be closed'
    },
    maskClosable: {
      control: 'boolean',
      description: 'Whether clicking outside closes the modal'
    },
    centered: {
      control: 'boolean',
      description: 'Whether to center the modal'
    },
    width: {
      control: 'text',
      description: 'Modal width'
    }
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default modal
export const Default: Story = {
  args: {
    open: true,
    title: 'Modal Title',
    closable: true,
    maskClosable: true,
    children: 'Modal content goes here',
  },
};

// Basic Modal story
export function BasicModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Basic Modal"
      >
        <p>This is a basic modal with a title and close button.</p>
      </Modal>
    </div>
  );
}

// Without Title story
export function WithoutTitle() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closable={true}
      >
        <p>This modal has no title but still has a close button.</p>
      </Modal>
    </div>
  );
}

// With Footer story
export function WithFooter() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Modal with Footer"
        footer={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        }
      >
        <p>This modal has a footer with action buttons.</p>
      </Modal>
    </div>
  );
}

// Interactive Demo - all variants shown together and interactable
export function InteractiveDemo() {
  const [basicOpen, setBasicOpen] = React.useState(false);
  const [footerOpen, setFooterOpen] = React.useState(false);
  const [noTitleOpen, setNoTitleOpen] = React.useState(false);
  const [noCloseOpen, setNoCloseOpen] = React.useState(false);

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">All Modal Variants - Interactive</h3>
      <p className="text-sm text-gray-600 mb-6">Click buttons to open modals. Close with X button, ESC key, or clicking outside.</p>
      
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setBasicOpen(true)}>Basic Modal</Button>
        <Button onClick={() => setFooterOpen(true)}>Modal with Footer</Button>
        <Button onClick={() => setNoTitleOpen(true)}>Modal without Title</Button>
        <Button onClick={() => setNoCloseOpen(true)}>Modal without Close Button</Button>
      </div>

      <Modal
        open={basicOpen}
        onClose={() => setBasicOpen(false)}
        title="Basic Modal"
        closable={true}
        maskClosable={true}
      >
        <p>This is a basic modal. You can close it by:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Clicking the X button</li>
          <li>Pressing ESC key</li>
          <li>Clicking outside the modal</li>
        </ul>
      </Modal>

      <Modal
        open={footerOpen}
        onClose={() => setFooterOpen(false)}
        title="Modal with Footer"
        closable={true}
        maskClosable={true}
        footer={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setFooterOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setFooterOpen(false)}>Confirm</Button>
          </div>
        }
      >
        <p>This modal has a footer with action buttons.</p>
      </Modal>

      <Modal
        open={noTitleOpen}
        onClose={() => setNoTitleOpen(false)}
        closable={true}
        maskClosable={true}
      >
        <p>This modal has no title but still has a close button.</p>
      </Modal>

      <Modal
        open={noCloseOpen}
        onClose={() => setNoCloseOpen(false)}
        title="Modal without Close Button"
        closable={false}
        maskClosable={true}
        footer={
          <Button variant="primary" onClick={() => setNoCloseOpen(false)}>Close</Button>
        }
      >
        <p>This modal has no X button. You can only close it by clicking outside or using the footer button.</p>
      </Modal>
    </div>
  );
}

