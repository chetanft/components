import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import '../src/styles/globals.css';

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
      const theme = context.globals.theme || 'light';
      
      // Apply theme class to iframe root
      React.useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark', 'night');
        root.classList.add(theme);
      }, [theme]);

      return React.createElement(
        ThemeProvider,
        { 
          defaultTheme: theme,
          children: React.createElement('div', {
            className: `min-h-screen bg-[var(--bg-primary)] text-[var(--primary)]`,
            style: { padding: '20px' }
          }, React.createElement(Story))
        }
      );
    },
  ],
};

export default preview; 