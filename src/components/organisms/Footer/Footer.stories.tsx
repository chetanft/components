import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Footer, FooterButton } from './Footer';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A footer component for displaying action buttons. Supports both composable API (recommended) and declarative API (deprecated).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    buttonCount: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
    leftSideButton: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

// Declarative API Examples
export const DeclarativeSingleButton: Story = {
  args: {
    buttonCount: 1,
    buttonTexts: ['Save'],
  },
};

export const DeclarativeTwoButtons: Story = {
  args: {
    buttonCount: 2,
    buttonTexts: ['Cancel', 'Save'],
  },
};

export const DeclarativeThreeButtons: Story = {
  args: {
    buttonCount: 3,
    buttonTexts: ['Cancel', 'Save Draft', 'Publish'],
    leftSideButton: false,
  },
};

export const DeclarativeFourButtons: Story = {
  args: {
    buttonCount: 4,
    buttonTexts: ['Delete', 'Cancel', 'Save Draft', 'Publish'],
  },
};

// Composable API Examples
export const ComposableSingleButton: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="primary">Save</FooterButton>
    </Footer>
  ),
};

export const ComposableTwoButtons: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="secondary">Cancel</FooterButton>
      <FooterButton variant="primary">Save</FooterButton>
    </Footer>
  ),
};

export const ComposableThreeButtons: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="text">Cancel</FooterButton>
      <FooterButton variant="secondary">Save Draft</FooterButton>
      <FooterButton variant="primary">Publish</FooterButton>
    </Footer>
  ),
};

export const ComposableWithLeftSide: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="text" leftSide>Delete</FooterButton>
      <FooterButton variant="secondary">Cancel</FooterButton>
      <FooterButton variant="primary">Save</FooterButton>
    </Footer>
  ),
};

export const ComposableFourButtons: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="text" leftSide>Delete</FooterButton>
      <FooterButton variant="text">Cancel</FooterButton>
      <FooterButton variant="secondary">Save Draft</FooterButton>
      <FooterButton variant="primary">Publish</FooterButton>
    </Footer>
  ),
};

export const ComposableCustomButtons: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="text" leftSide>
        <Button variant="text" size="lg" className="min-w-[188px] h-12">
          Custom Left
        </Button>
      </FooterButton>
      <FooterButton variant="primary">
        <Button variant="primary" size="lg" icon="check" iconPosition="leading" className="min-w-[188px] h-12">
          Save with Icon
        </Button>
      </FooterButton>
    </Footer>
  ),
};

