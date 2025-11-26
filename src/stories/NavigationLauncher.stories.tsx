import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  NavigationLauncher,
  DEFAULT_NAVIGATION_SECTIONS,
  AppHeader,
} from '../components';

const meta: Meta<typeof NavigationLauncher> = {
  title: 'Organisms/NavigationLauncher',
  component: NavigationLauncher,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof NavigationLauncher>;

export const DefaultLauncher: Story = {
  render: () => (
    <div className="h-[600px] bg-[var(--bg-secondary)] flex items-center justify-center">
      <NavigationLauncher sections={DEFAULT_NAVIGATION_SECTIONS} />
    </div>
  ),
};

export const CustomTrigger: Story = {
  render: () => (
    <div className="h-[600px] bg-[var(--bg-secondary)] flex items-center justify-center">
      <NavigationLauncher
        sections={DEFAULT_NAVIGATION_SECTIONS}
        trigger={({ toggle }) => (
          <button
            type="button"
            onClick={toggle}
            className="px-4 py-2 rounded-full bg-[var(--neutral)] text-white"
          >
            Open Hub
          </button>
        )}
      />
    </div>
  ),
};

export const AppHeaderIntegration: Story = {
  render: () => (
    <div style={{ minHeight: '400px', backgroundColor: 'var(--bg-secondary)' }}>
      <AppHeader
        leftAddon={() => (
          <NavigationLauncher
            sections={DEFAULT_NAVIGATION_SECTIONS}
            showBackdrop={false}
            trigger={({ toggle }) => (
              <button
                type="button"
                onClick={toggle}
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: '100px',
                  padding: '12px',
                  border: '1px solid var(--border-primary)',
                }}
                aria-label="Open navigation hub"
              >
                <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          />
        )}
      />
    </div>
  ),
};

