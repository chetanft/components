import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Typography, TypographyShowcase } from './Typography';

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'display-bold', 'body-semibold', 'body-regular', 'body-medium', 'caption', 'button'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// Debug story to test basic functionality
export const Debug = () => (
  <div style={{ border: '1px solid red', padding: '20px', backgroundColor: 'white' }}>
    <h1>Debug Typography Test</h1>
    <div style={{ border: '1px solid blue', margin: '10px 0' }}>
      <Typography variant="h1">Test H1 - Should be visible</Typography>
    </div>
    <div style={{ border: '1px solid green', margin: '10px 0' }}>
      <Typography variant="p">Test paragraph - Should be visible</Typography>
    </div>
    <div style={{ border: '1px solid purple', margin: '10px 0' }}>
      <Typography variant="body-semibold">Test body semibold - Should be visible</Typography>
    </div>
    <p style={{ color: 'black', fontSize: '16px' }}>Regular HTML paragraph for comparison</p>
  </div>
);

export const Default: Story = {
  args: {
    children: 'This is default typography text',
    variant: 'p',
  },
};

export const H1: Story = {
  args: {
    children: 'Heading 1',
    variant: 'h1',
  },
};

export const H2: Story = {
  args: {
    children: 'Heading 2',
    variant: 'h2',
  },
};

export const BodySemibold: Story = {
  args: {
    children: 'Body Semibold Text',
    variant: 'body-semibold',
  },
};

export const DangerText: Story = {
  args: {
    children: 'Danger color text',
    color: 'danger',
  },
};

export const CustomSize: Story = {
  args: {
    children: 'Extra Large Bold',
    size: 'xxl',
    weight: 'bold',
  },
};

// Simple showcase of all variants
export const AllVariants = () => (
  <div className="space-y-4">
    <Typography variant="h1">Heading 1</Typography>
    <Typography variant="h2">Heading 2</Typography>
    <Typography variant="h3">Heading 3</Typography>
    <Typography variant="body-semibold">Body Semibold</Typography>
    <Typography variant="body-regular">Body Regular</Typography>
    <Typography variant="caption">Caption Text</Typography>
    <Typography color="danger">Danger Text</Typography>
    <Typography color="success">Success Text</Typography>
  </div>
);

// Original documentation showcase  
export const DocumentationShowcase = () => <TypographyShowcase />; 