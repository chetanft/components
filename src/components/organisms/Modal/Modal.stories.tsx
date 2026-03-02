import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, ModalClose } from './index';
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
    explorer: {
      mode: 'matrix' as const,
      baseStory: 'ExplorerBase',
      behavior: 'center-overlay' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'basic', label: 'Basic', story: 'ExplorerBase', args: { contentVariant: 'basic' } },
            { id: 'with-footer', label: 'Footer', story: 'ExplorerBase', args: { contentVariant: 'with-footer' } },
          ],
        },
        {
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'sm', label: 'Small', story: 'ExplorerBase', args: { size: 'sm' } },
            { id: 'md', label: 'Medium', story: 'ExplorerBase', args: { size: 'md' } },
            { id: 'lg', label: 'Large', story: 'ExplorerBase', args: { size: 'lg' } },
            { id: 'xl', label: 'Extra Large', story: 'ExplorerBase', args: { size: 'xl' } },
            { id: 'full', label: 'Full', story: 'ExplorerBase', args: { size: 'full' } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'basic',
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const size = args.size ?? 'md';
    const contentVariant = args.contentVariant ?? 'basic';
    return (
      <Modal open onOpenChange={() => {}}>
        <ModalContent size={size}>
          <ModalHeader>
            <ModalTitle>{contentVariant === 'with-footer' ? 'Modal with Footer' : 'Basic Modal'}</ModalTitle>
            {contentVariant === 'with-footer' ? (
              <ModalDescription>This modal has a footer with action buttons.</ModalDescription>
            ) : null}
          </ModalHeader>
          <ModalBody>
            <p>
              {contentVariant === 'with-footer'
                ? 'This modal has a footer with action buttons.'
                : 'This is a basic modal with a title and close button.'}
            </p>
          </ModalBody>
          {contentVariant === 'with-footer' ? (
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="secondary">Cancel</Button>
              </ModalClose>
              <Button variant="primary">Confirm</Button>
            </ModalFooter>
          ) : null}
        </ModalContent>
      </Modal>
    );
  },
};

function DefaultModalRender() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>Open Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Modal content goes here</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

// Default modal using composable API
export const Default: Story = {
  render: () => <DefaultModalRender />,
};

// --- Composable API stories ---

// Basic modal with composable API
export function BasicModal() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>Open Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Basic Modal</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>This is a basic modal with a title and close button.</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

// Modal with footer using composable API
export function WithFooter() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>Open Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Modal with Footer</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>This modal has a footer with action buttons.</p>
          </ModalBody>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="secondary">Cancel</Button>
            </ModalClose>
            <Button variant="primary">Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

// Modal sizes using composable API
export function DocsSizes() {
  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">Modal Sizes</h3>
      <div className="flex flex-wrap gap-4">
        {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => {
          function SizeModalDemo() {
            const [open, setOpen] = useState(false);
            return (
              <Modal open={open} onOpenChange={setOpen}>
                <ModalTrigger asChild>
                  <Button>{size.toUpperCase()}</Button>
                </ModalTrigger>
                <ModalContent size={size}>
                  <ModalHeader>
                    <ModalTitle>Modal Size: {size}</ModalTitle>
                  </ModalHeader>
                  <ModalBody>
                    <p>This modal is using the <strong>{size}</strong> size preset.</p>
                    <p className="mt-2 text-gray-500">
                      Content adapts to the width of the modal.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <ModalClose asChild>
                      <Button variant="secondary">Close</Button>
                    </ModalClose>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            );
          }
          return <SizeModalDemo key={size} />;
        })}
      </div>
    </div>
  );
}

function ModalSizeDemo({ size }: { size: 'sm' | 'md' | 'lg' | 'xl' | 'full' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>Open {size.toUpperCase()}</Button>
        </ModalTrigger>
        <ModalContent size={size}>
          <ModalHeader>
            <ModalTitle>Modal Size: {size}</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>This modal is using the <strong>{size}</strong> size preset.</p>
          </ModalBody>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="secondary">Close</Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export const Small: Story = {
  render: () => <ModalSizeDemo size="sm" />,
};

export const Medium: Story = {
  render: () => <ModalSizeDemo size="md" />,
};

export const Large: Story = {
  render: () => <ModalSizeDemo size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalSizeDemo size="xl" />,
};

export const Full: Story = {
  render: () => <ModalSizeDemo size="full" />,
};
