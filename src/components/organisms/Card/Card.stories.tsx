import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter, CardActions, CardMeta } from './index';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge';
import { Avatar } from '../../atoms/Avatar';
import { Icon } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';

const meta: Meta<typeof Card> = {
  title: 'Organisms/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Card component built with FT Design System tokens. Supports composable API and Figma-aligned declarative API.',
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
      behavior: 'inline',
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'basic', label: 'Basic', story: 'ExplorerBase', args: { contentVariant: 'Basic' } },
            { id: 'advanced', label: 'Advanced', story: 'ExplorerBase', args: { contentVariant: 'Advanced' } },
            { id: 'composable', label: 'Composable', story: 'ExplorerBase', args: { contentVariant: 'composable' } },
          ],
        },
        {
          id: 'style',
          label: 'Style',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { variant: 'default' } },
            { id: 'elevated', label: 'Elevated', story: 'ExplorerBase', args: { variant: 'elevated' } },
            { id: 'outlined', label: 'Outlined', story: 'ExplorerBase', args: { variant: 'outlined' } },
          ],
        },
        {
          id: 'content',
          label: 'Content',
          scenarios: [
            { id: 'with-footer', label: 'Footer', story: 'ExplorerBase', args: { showFooter: true } },
            { id: 'no-footer', label: 'No Footer', story: 'ExplorerBase', args: { showFooter: false } },
            { id: 'no-eyebrow', label: 'No Eyebrow', story: 'ExplorerBase', args: { showEyebrow: false } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'basic',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ---------------------------------------------------------------------------
// ExplorerBase — renders all 3 main card variants
// ---------------------------------------------------------------------------

export const ExplorerBase: Story = {
  render: (args: any) => {
    const variant = args.contentVariant ?? 'Basic';
    const showFooter = args.showFooter ?? true;
    const showEyebrow = args.showEyebrow ?? true;

    const syncKey = JSON.stringify({ ...args });

    if (variant === 'composable') {
      return (
        <div key={syncKey} className="w-[549px]">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>A short description of the card content.</CardDescription>
            </CardHeader>
            <CardBody>
              <Typography variant="body-primary-regular">Card body content goes here.</Typography>
            </CardBody>
            {showFooter && (
              <CardFooter>
                <CardActions>
                  <Button variant="secondary" size="sm">Cancel</Button>
                  <Button variant="primary" size="sm">Save</Button>
                </CardActions>
              </CardFooter>
            )}
          </Card>
        </div>
      );
    }

    return (
      <div key={syncKey} className="w-[549px]">
        <Card
          contentVariant={variant}
          showEyebrow={showEyebrow}
          showFooter={showFooter}
          eyebrowLeft={<Badge variant="info">Active</Badge>}
          eyebrowRight={<Badge variant="success">Active</Badge>}
          headerTitle="Text"
          headerSubText="Sub text"
          showArrowIcon
          bodySections={[
            { statisticValue: 'Text', statisticLabel: 'Label', readOnlyLabel: 'Label', readOnlyText: 'Text' },
            { statisticValue: 'Text', statisticLabel: 'Label', readOnlyLabel: 'Label', readOnlyText: 'Text' },
          ]}
          footerText="Text"
          footerButton={<Button variant="primary" size="sm" icon="add">Button</Button>}
          graphic={variant === 'Advanced' ? {
            graphic: 'Image',
            padding: true,
            imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=300&fit=crop',
          } : undefined}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Basic — Figma "Basic" card variant
// Matches node 3698:19308 left card
// ---------------------------------------------------------------------------

export const Basic: Story = {
  render: () => (
    <div className="w-[549px]">
      <Card
        contentVariant="Basic"
        eyebrowLeft={<Badge variant="info">Active</Badge>}
        eyebrowRight={<Badge variant="success">Active</Badge>}
        headerTitle="Text"
        headerSubText="Sub text"
        showArrowIcon
        bodySections={[
          { statisticValue: 'Text', statisticLabel: 'Label', readOnlyLabel: 'Label', readOnlyText: 'Text' },
          { statisticValue: 'Text', statisticLabel: 'Label', readOnlyLabel: 'Label', readOnlyText: 'Text' },
        ]}
        footerText="Text"
        footerButton={<Button variant="primary" size="sm" icon="add">Button</Button>}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Advanced — Figma "Advanced" card variant with graphic
// Matches node 3698:19308 right card
// ---------------------------------------------------------------------------

export const Advanced: Story = {
  render: () => (
    <div className="w-[549px]">
      <Card
        contentVariant="Advanced"
        eyebrowLeft={<Badge variant="info">Active</Badge>}
        eyebrowRight={<Badge variant="success">Active</Badge>}
        headerTitle="Text"
        headerSubText="Sub text"
        showArrowIcon
        bodySections={[
          { statisticValue: 'Text', statisticLabel: 'Label', readOnlyLabel: 'Label', readOnlyText: 'Text' },
          { statisticValue: 'Text', statisticLabel: 'Label', readOnlyLabel: 'Label', readOnlyText: 'Text' },
        ]}
        footerText="Text"
        footerButton={<Button variant="primary" size="sm" icon="add">Button</Button>}
        graphic={{
          graphic: 'Image',
          padding: true,
          imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=300&fit=crop',
        }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// NoFooter — Basic card without footer
// ---------------------------------------------------------------------------

export const NoFooter: Story = {
  render: () => (
    <div className="w-[549px]">
      <Card
        contentVariant="Basic"
        showFooter={false}
        eyebrowLeft={<Badge variant="info">Active</Badge>}
        eyebrowRight={<Badge variant="success">Active</Badge>}
        headerTitle="Text"
        headerSubText="Sub text"
        bodySections={[
          { statisticValue: 'Text', statisticLabel: 'Label', readOnlyLabel: 'Label', readOnlyText: 'Text' },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// NoEyebrow — Basic card without eyebrow
// ---------------------------------------------------------------------------

export const NoEyebrow: Story = {
  render: () => (
    <div className="w-[549px]">
      <Card
        contentVariant="Basic"
        showEyebrow={false}
        headerTitle="Text"
        headerSubText="Sub text"
        bodySections={[
          { statisticValue: 'Text', statisticLabel: 'Label', readOnlyLabel: 'Label', readOnlyText: 'Text' },
        ]}
        footerText="Text"
        footerButton={<Button variant="primary" size="sm" icon="add">Button</Button>}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Composable — using composable sub-component API
// ---------------------------------------------------------------------------

export const DocsComposable: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a composable card with header, body, and footer.</CardDescription>
      </CardHeader>
      <CardBody>
        <Typography variant="body-primary-regular">
          Card body content goes here. The composable API gives full control over card structure.
        </Typography>
      </CardBody>
      <CardFooter>
        <CardActions>
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Save</Button>
        </CardActions>
      </CardFooter>
    </Card>
  ),

  parameters: { docsOnly: true },
}