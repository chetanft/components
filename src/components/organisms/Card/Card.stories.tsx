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
        component: 'Card component built with FT Design System tokens. Supports both composable API (recommended) and declarative API (deprecated).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'Card content',
  },
};

export const ComposableBasic: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a basic composable card with header and body.</CardDescription>
      </CardHeader>
      <CardBody>
        <Typography variant="body-primary-regular">
          This is the card body content. You can put any content here.
        </Typography>
      </CardBody>
    </Card>
  ),
};

export const ComposableWithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>This card includes a footer with actions.</CardDescription>
      </CardHeader>
      <CardBody>
        <Typography variant="body-primary-regular">
          Card body content goes here.
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
};

export const ComposableWithMeta: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardMeta
          avatar={
            <Avatar size="md">
              <Avatar.AvatarImage src="https://i.pravatar.cc/300?img=1" />
            </Avatar>
          }
          title="John Doe"
          description="Software Engineer"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="body-primary-regular">
          This card uses CardMeta in the header to display user information.
        </Typography>
      </CardBody>
    </Card>
  ),
};

export const ComposableWithBadges: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Project Status</CardTitle>
        <CardDescription>
          <div className="flex gap-2 mt-2">
            <Badge variant="success">Active</Badge>
            <Badge variant="info">In Progress</Badge>
          </div>
        </CardDescription>
      </CardHeader>
      <CardBody>
        <Typography variant="body-primary-regular">
          This card demonstrates badges in the description area.
        </Typography>
      </CardBody>
      <CardFooter>
        <CardActions>
          <Button variant="ghost" size="sm" icon="edit">Edit</Button>
          <Button variant="ghost" size="sm" icon="delete">Delete</Button>
        </CardActions>
      </CardFooter>
    </Card>
  ),
};

export const ComposableComplex: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Complex Card Example</CardTitle>
        <CardDescription>
          This card demonstrates a more complex composition with multiple elements.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div>
            <Typography variant="body-secondary-medium" className="mb-2">Details</Typography>
            <Typography variant="body-primary-regular">
              This is a more complex card with multiple sections in the body.
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="check" size={16} className="text-[var(--positive)]" />
            <Typography variant="body-secondary-regular">Feature enabled</Typography>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <CardActions>
          <Button variant="secondary" size="sm">Learn More</Button>
          <Button variant="primary" size="sm">Get Started</Button>
        </CardActions>
      </CardFooter>
    </Card>
  ),
};

