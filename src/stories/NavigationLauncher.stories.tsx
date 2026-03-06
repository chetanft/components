import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  NavigationLauncher,
  AppHeader,
} from '../components';
import {
  NavigationSection,
  NavigationSectionHero,
  NavigationSectionMetric,
  NavigationSectionSubCategory,
  NavigationSectionSubCategoryItem,
} from '../components/organisms/NavigationPopover';

const meta: Meta<typeof NavigationLauncher> = {
  title: 'Organisms/NavigationLauncher',
  component: NavigationLauncher,
  parameters: {
    layout: 'fullscreen',
    explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                  },
                                                                                                                                                                                                },
      mode: 'matrix' as const,
      behavior: 'anchored' as const,
      previewMode: 'inline' as const,
      defaultRowId: 'type',
      defaultScenarioId: 'default-launcher',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default-launcher', label: 'DefaultLauncher', story: 'DefaultLauncher' },
            { id: 'custom-trigger', label: 'CustomTrigger', story: 'CustomTrigger' },
            { id: 'app-header-integration', label: 'AppHeaderIntegration', story: 'AppHeaderIntegration' },
          ],
        },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof NavigationLauncher>;

const SampleSections = () => (
  <>
    <NavigationSection id="overview" label="Overview" icon="dashboard">
      <NavigationSectionHero title="Overview" description="High-level overview of logistics KPIs." />
      <NavigationSectionMetric label="Active Orders" value="25" />
      <NavigationSectionMetric label="Pending Shipments" value="12" />
    </NavigationSection>
    <NavigationSection id="operations" label="Operations" icon="planning">
      <NavigationSectionSubCategory title="Operations">
        <NavigationSectionSubCategoryItem label="Route Planning" icon="planning" />
        <NavigationSectionSubCategoryItem label="Live Tracking" icon="gps" />
      </NavigationSectionSubCategory>
    </NavigationSection>
  </>
);

export const DefaultLauncher: Story = {
  render: () => (
    <div className="bg-[var(--bg-secondary)] flex items-center justify-center" style={{ height: 'calc(var(--spacing-x10) * 15)' }}>
      <NavigationLauncher>
        <SampleSections />
      </NavigationLauncher>
    </div>
  ),
};

export const CustomTrigger: Story = {
  render: () => (
    <div className="bg-[var(--bg-secondary)] flex items-center justify-center" style={{ height: 'calc(var(--spacing-x10) * 15)' }}>
      <NavigationLauncher
        trigger={({ toggle }) => (
          <button
            type="button"
            onClick={toggle}
            className="px-4 py-2 rounded-full bg-[var(--neutral)] text-white"
          >
            Open Hub
          </button>
        )}
      >
        <SampleSections />
      </NavigationLauncher>
    </div>
  ),
};

export const AppHeaderIntegration: Story = {
  render: () => (
    <div style={{ minHeight: 'calc(var(--spacing-x10) * 10)', backgroundColor: 'var(--bg-secondary)' }}>
      <AppHeader
        leftAddon={() => (
          <NavigationLauncher
            showBackdrop={false}
            trigger={({ toggle }) => (
              <button
                type="button"
                onClick={toggle}
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-full)',
                  padding: 'var(--spacing-x3)',
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
          >
            <SampleSections />
          </NavigationLauncher>
        )}
      />
    </div>
  ),
};
