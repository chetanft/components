import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter, CardActions } from '../components/organisms/Card';
import { Badge, BadgeText } from '../components/atoms/Badge';
import { Button } from '../components/atoms/Button/Button';
import { Typography } from '../components/atoms/Typography';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible card container for grouping related content and actions. Use composable sub-components (CardHeader, CardTitle, CardBody, CardFooter) for flexible layouts.'
      }
    },
    docsOnly: true,
  },
  argTypes: {
    children: {
      control: false,
      description: 'Card content for composable API.',
    },
    extra: {
      control: false,
      description: 'Extra content rendered in the card.',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether the card has a border.',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether the card has hover effects.',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading skeleton state.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Card size variant.',
    },
    actions: {
      control: false,
      description: 'Action elements for the card.',
    },
    cover: {
      control: false,
      description: 'Cover content rendered at top of card.',
    },
    contentVariant: {
      control: { type: 'select' },
      options: ['Basic', 'Advanced'],
      description: 'Card content variant matching Figma.',
    },
    eyebrowLeft: {
      control: false,
      description: 'Eyebrow left content (badge, text, etc.).',
    },
    eyebrowRight: {
      control: false,
      description: 'Eyebrow right content (badge, text, etc.).',
    },
    headerTitle: {
      control: 'text',
      description: 'Header main title text.',
    },
    headerSubText: {
      control: 'text',
      description: 'Header sub text below title.',
    },
    showArrowIcon: {
      control: 'boolean',
      description: 'Show arrow icon on right of header.',
    },
    bodySections: {
      control: 'object',
      description: 'Array of statistic/read-only row pairs.',
    },
    footerText: {
      control: 'text',
      description: 'Footer left text.',
    },
    footerButton: {
      control: false,
      description: 'Footer right button/element.',
    },
    showFooter: {
      control: 'boolean',
      description: 'Show footer section.',
    },
    showEyebrow: {
      control: 'boolean',
      description: 'Show eyebrow section.',
    },
    graphic: {
      control: 'object',
      description: 'Graphic configuration (Advanced variant).',
    },
    glass: {
      control: { type: 'select' },
      options: [undefined, true, 'subtle', 'prominent'],
      description: 'Apply glassmorphism effect.',
    },
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A short description of the card content.</CardDescription>
      </CardHeader>
      <CardBody>
        <Typography variant="body-primary-regular">
          Card body content goes here.
        </Typography>
      </CardBody>
    </Card>
  ),
};

export const DocsVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Card</CardTitle>
          <CardDescription>Header and body only.</CardDescription>
        </CardHeader>
        <CardBody>
          <Typography variant="body-primary-regular">Simple content.</Typography>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>With Footer</CardTitle>
          <CardDescription>Includes footer actions.</CardDescription>
        </CardHeader>
        <CardBody>
          <Typography variant="body-primary-regular">Card content.</Typography>
        </CardBody>
        <CardFooter>
          <CardActions>
            <Button variant="primary" size="sm">Action</Button>
          </CardActions>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex gap-2 mb-2">
            <Badge variant="success"><BadgeText>Active</BadgeText></Badge>
            <Badge variant="warning"><BadgeText>Review</BadgeText></Badge>
          </div>
          <CardTitle>With Badges</CardTitle>
          <CardDescription>Badges in the header area.</CardDescription>
        </CardHeader>
        <CardBody>
          <Typography variant="body-primary-regular">Card content.</Typography>
        </CardBody>
      </Card>
    </div>
  ),

  parameters: { docsOnly: true },
}