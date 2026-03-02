import type { Meta, StoryObj } from '@storybook/react';
import { Footer, FooterButton } from '../components/organisms/Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    docsOnly: true,
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single button variant (matching Figma: "Buttons count=1, Left side btn=False")
export const SingleButton: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="primary">Button</FooterButton>
    </Footer>
  ),
};

// Two buttons variant (matching Figma: "Buttons count=2, Left side btn=False")
export const TwoButtons: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="secondary">Button</FooterButton>
      <FooterButton variant="primary">Button</FooterButton>
    </Footer>
  ),
};

// Three buttons variant (matching Figma: "Buttons count=3, Left side btn=False")
export const ThreeButtons: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="text">Button</FooterButton>
      <FooterButton variant="secondary">Button</FooterButton>
      <FooterButton variant="primary">Button</FooterButton>
    </Footer>
  ),
};

// Three buttons with left side button (matching Figma: "Buttons count=3, Left side btn=true")
export const ThreeButtonsWithLeftSide: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="text" leftSide>Button</FooterButton>
      <FooterButton variant="secondary">Button</FooterButton>
      <FooterButton variant="primary">Button</FooterButton>
    </Footer>
  ),
};

// Four buttons with left side button (matching Figma: "Buttons count=4, Left side btn=true")
export const FourButtonsWithLeftSide: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="text" leftSide>Button</FooterButton>
      <FooterButton variant="text">Button</FooterButton>
      <FooterButton variant="secondary">Button</FooterButton>
      <FooterButton variant="primary">Button</FooterButton>
    </Footer>
  ),
};

// Custom example with different button texts and click handlers
export const CustomFooter: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="text" leftSide onClick={() => console.log('Cancel clicked')}>Cancel</FooterButton>
      <FooterButton variant="secondary" onClick={() => console.log('Save Draft clicked')}>Save Draft</FooterButton>
      <FooterButton variant="primary" onClick={() => console.log('Publish clicked')}>Publish</FooterButton>
    </Footer>
  ),
};

// Example with custom variants
export const CustomVariants: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="text" leftSide onClick={() => console.log('Delete clicked')}>Delete</FooterButton>
      <FooterButton variant="text" onClick={() => console.log('Edit clicked')}>Edit</FooterButton>
      <FooterButton variant="secondary" onClick={() => console.log('Save clicked')}>Save</FooterButton>
      <FooterButton variant="primary" onClick={() => console.log('Submit clicked')}>Submit</FooterButton>
    </Footer>
  ),
};

// Test button variations
export const ButtonVariations: Story = {
  render: () => (
    <Footer>
      <FooterButton variant="text" leftSide>Cancel</FooterButton>
      <FooterButton variant="secondary">Preview</FooterButton>
      <FooterButton variant="primary">Save</FooterButton>
    </Footer>
  ),
};
