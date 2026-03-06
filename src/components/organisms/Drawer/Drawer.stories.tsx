import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerBody,
    DrawerFooter,
    DrawerClose,
} from './index';
import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography';
import { Input } from '../../atoms/Input';

const meta: Meta<typeof Drawer> = {
    title: 'Organisms/Drawer',
    component: Drawer,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'A panel that slides in from the edge of the screen. Built using FT Design System tokens with support for multiple placements and customizable dimensions.',
            },
        },
        explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                                                                                                                                                  },
                                                                                                                                                                                                                                                                                                                                },
            mode: 'matrix' as const,
            baseStory: 'ExplorerBase',
            behavior: 'right-overlay' as const,
            previewMode: 'inline' as const,
            rows: [
                {
                    id: 'placement',
                    label: 'Placement',
                    scenarios: [
                        { id: 'right', label: 'Right (Default)', story: 'ExplorerBase', args: { placement: 'right' } },
                        { id: 'left', label: 'Left', story: 'ExplorerBase', args: { placement: 'left' } },
                        { id: 'top', label: 'Top', story: 'ExplorerBase', args: { placement: 'top' } },
                        { id: 'bottom', label: 'Bottom', story: 'ExplorerBase', args: { placement: 'bottom' } },
                    ],
                },
                {
                    id: 'content',
                    label: 'Content',
                    scenarios: [
                        { id: 'default', label: 'Basic', story: 'ExplorerBase', args: { contentVariant: 'basic' } },
                        { id: 'form', label: 'Form', story: 'ExplorerBase', args: { contentVariant: 'form' } },
                    ],
                },
            ],
            defaultRowId: 'placement',
            defaultScenarioId: 'right',
            supportsGlass: true,
        },
    },
    tags: ['autodocs'],
    argTypes: {
        open: {
            control: 'boolean',
            description: 'Whether the drawer is open',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const placement = args.placement ?? 'right';
    const contentVariant = args.contentVariant ?? 'basic';
    const isVertical = placement === 'right' || placement === 'left';
    const contentProps = isVertical
      ? { placement, width: contentVariant === 'form' ? 450 : 400 }
      : { placement, height: contentVariant === 'form' ? 280 : 220 };

    return (
      <Drawer open onOpenChange={() => {}}>
        <DrawerContent {...contentProps}>
          {contentVariant === 'form' ? (
            <>
              <DrawerHeader>
                <DrawerTitle>Create New Item</DrawerTitle>
                <DrawerDescription>
                  Fill out the form below to create a new item.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <div className="space-y-4">
                  <div>
                    <Typography variant="body-secondary-medium" className="mb-2">Name</Typography>
                    <Input placeholder="Enter name" />
                  </div>
                  <div>
                    <Typography variant="body-secondary-medium" className="mb-2">Email</Typography>
                    <Input type="email" placeholder="Enter email" />
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="secondary" className="flex-1">Cancel</Button>
                </DrawerClose>
                <Button variant="primary" className="flex-1">Create</Button>
              </DrawerFooter>
            </>
          ) : (
            <>
              <DrawerHeader>
                <DrawerTitle>Drawer Title</DrawerTitle>
                <DrawerDescription>
                  This is the drawer content. You can place any content here.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerBody>
                <Typography variant="body-primary-regular">
                  This is the drawer content. You can place any content here.
                </Typography>
              </DrawerBody>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DrawerClose>
                <Button variant="primary">Submit</Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    );
  },
};

// ---------------------------------------------------------------------------
// Composable API Stories
// ---------------------------------------------------------------------------

function VariantsDemo() {
  const [rightOpen, setRightOpen] = useState(false);
  const [leftOpen, setLeftOpen] = useState(false);
  const [topOpen, setTopOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);

  return (
    <div className="p-6 flex gap-4 flex-wrap">
      <Drawer open={rightOpen} onOpenChange={setRightOpen}>
        <DrawerTrigger asChild>
          <Button variant="primary">Right (Default)</Button>
        </DrawerTrigger>
        <DrawerContent placement="right" width={400}>
          <DrawerHeader>
            <DrawerTitle>Right Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Typography variant="body-primary-regular">Right placement drawer.</Typography>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer open={leftOpen} onOpenChange={setLeftOpen}>
        <DrawerTrigger asChild>
          <Button variant="secondary">Left</Button>
        </DrawerTrigger>
        <DrawerContent placement="left" width={300}>
          <DrawerHeader>
            <DrawerTitle>Left Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Typography variant="body-primary-regular">Left placement drawer.</Typography>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer open={topOpen} onOpenChange={setTopOpen}>
        <DrawerTrigger asChild>
          <Button variant="secondary">Top</Button>
        </DrawerTrigger>
        <DrawerContent placement="top" height={200}>
          <DrawerHeader>
            <DrawerTitle>Top Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Typography variant="body-primary-regular">Top placement drawer.</Typography>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer open={bottomOpen} onOpenChange={setBottomOpen}>
        <DrawerTrigger asChild>
          <Button variant="secondary">Bottom</Button>
        </DrawerTrigger>
        <DrawerContent placement="bottom" height={200}>
          <DrawerHeader>
            <DrawerTitle>Bottom Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Typography variant="body-primary-regular">Bottom placement drawer.</Typography>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export const DocsVariants: Story = {
  render: () => <VariantsDemo />,

  parameters: { docsOnly: true },
}