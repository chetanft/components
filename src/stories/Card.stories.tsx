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
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
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