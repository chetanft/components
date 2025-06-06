import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../components/organisms/Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    buttonCount: {
      control: { type: 'select' },
      options: [1, 2, 3, 4],
    },
    leftSideButton: {
      control: 'boolean',
    },
    buttonTexts: {
      control: { type: 'object' },
    },
    buttonVariants: {
      control: { type: 'object' },
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single button variant (matching Figma: "Buttons count=1, Left side btn=False")
export const SingleButton: Story = {
  args: {
    buttonCount: 1,
    leftSideButton: false,
    buttonTexts: ['Button'],
  },
};

// Two buttons variant (matching Figma: "Buttons count=2, Left side btn=False")
export const TwoButtons: Story = {
  args: {
    buttonCount: 2,
    leftSideButton: false,
    buttonTexts: ['Button', 'Button'],
  },
};

// Three buttons variant (matching Figma: "Buttons count=3, Left side btn=False")
export const ThreeButtons: Story = {
  args: {
    buttonCount: 3,
    leftSideButton: false,
    buttonTexts: ['Button', 'Button', 'Button'],
  },
};

// Three buttons with left side button (matching Figma: "Buttons count=3, Left side btn=true")
export const ThreeButtonsWithLeftSide: Story = {
  args: {
    buttonCount: 3,
    leftSideButton: true,
    buttonTexts: ['Button', 'Button', 'Button'],
  },
};

// Four buttons with left side button (matching Figma: "Buttons count=4, Left side btn=true")
export const FourButtonsWithLeftSide: Story = {
  args: {
    buttonCount: 4,
    leftSideButton: true,
    buttonTexts: ['Button', 'Button', 'Button', 'Button'],
  },
};

// Custom example with different button texts and click handlers
export const CustomFooter: Story = {
  args: {
    buttonCount: 3,
    leftSideButton: true,
    buttonTexts: ['Cancel', 'Save Draft', 'Publish'],
    onButtonClick: [
      () => console.log('Cancel clicked'),
      () => console.log('Save Draft clicked'),
      () => console.log('Publish clicked'),
    ],
  },
};

// Example with custom variants
export const CustomVariants: Story = {
  args: {
    buttonCount: 4,
    leftSideButton: true,
    buttonTexts: ['Delete', 'Edit', 'Save', 'Submit'],
    buttonVariants: ['text', 'text', 'secondary', 'primary'],
    onButtonClick: [
      () => console.log('Delete clicked'),
      () => console.log('Edit clicked'),
      () => console.log('Save clicked'),
      () => console.log('Submit clicked'),
    ],
  },
};

// Test button variations
export const ButtonVariations: Story = {
  args: {
    buttonCount: 3,
    leftSideButton: true,
    buttonTexts: ['Cancel', 'Preview', 'Save'],
    buttonVariants: ['text', 'secondary', 'primary'],
  },
}; 