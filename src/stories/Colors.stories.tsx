import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { Colors } from '../components/atoms/Colors/Colors';
import { ThemeProvider } from '../contexts/ThemeContext';

const withThemeProvider: Decorator = (Story) => (
  <ThemeProvider>
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--primary)] p-8">
      <Story />
    </div>
  </ThemeProvider>
);

const withStandaloneContainer: Decorator = (Story) => (
  <div className="min-h-screen bg-white text-black p-8">
    <Story />
  </div>
);

const meta = {
  title: 'Design System/Colors',
  component: Colors,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Color palette and theme system showcase with live theme switching capabilities.',
      },
    },
  },
  decorators: [withThemeProvider],
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Color System',
  parameters: {
    docs: {
      description: {
        story: 'Complete color system with theme switching. Use the theme selector in the top right to test Light, Dark, and Night modes.',
      },
    },
  },
};

export const WithoutThemeProvider: Story = {
  name: 'Standalone (No Provider)',
  decorators: [withStandaloneContainer],
  parameters: {
    docs: {
      description: {
        story: 'Colors component works standalone without ThemeProvider using manual theme switching.',
      },
    },
  },
}; 
