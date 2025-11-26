import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import '../src/styles/globals.css';

// Wrapper component to handle theme application
const ThemeDecorator = ({ children, theme }: { children: React.ReactNode; theme: string }) => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'night');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeProvider defaultTheme={theme as 'light' | 'dark' | 'night'}>
      <div 
        className="min-h-screen bg-[var(--bg-primary)] text-[var(--primary)]"
        style={{ padding: '20px' }}
      >
        {children}
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
    backgrounds: { disable: true }, // Disable since we handle themes
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'night', title: 'Night', icon: 'starhollow' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme || 'light') as string;
      return (
        <ThemeDecorator theme={theme}>
          <Story />
        </ThemeDecorator>
      );
    },
  ],
};

export default preview; 