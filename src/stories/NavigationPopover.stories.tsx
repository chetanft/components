import type { Decorator, Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  NavigationPopover,
  DEFAULT_NAVIGATION_SECTIONS,
  NavigationSection,
  NavigationSectionHero,
  NavigationSectionMetric,
  NavigationSectionSubCategory,
  NavigationSectionSubCategoryItem,
  type NavigationSectionType,
} from '../components/organisms/NavigationPopover';
import { Button } from '../components/atoms/Button/Button';
import { Typography } from '../components/atoms/Typography';

type PopoverDecoratorStory = Parameters<Decorator>[0];

const popoverCanvas = ((Story: PopoverDecoratorStory) => {
  const StoryComponent = Story as React.ComponentType;
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: 'var(--spacing-x8)',
        backgroundColor: 'var(--bg-secondary)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 'var(--container-max-width)',
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-x8)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--border-primary)',
        }}
      >
        <StoryComponent />
      </div>
    </div>
  );
}) satisfies Decorator;

const meta: Meta<typeof NavigationPopover> = {
  title: 'Organisms/NavigationPopover',
  component: NavigationPopover,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Highly configurable navigation popover that can mix hero illustrations, metric summaries, and deep sub-menus—similar to launchers in modern design systems.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      baseStory: 'ExplorerBase',
      behavior: 'anchored' as const,
      previewMode: 'inline' as const,
      defaultRowId: 'type',
      defaultScenarioId: 'insights',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'insights', label: 'Insights', story: 'ExplorerBase', args: { dataset: 'default', initialSectionId: 'insights' } },
            { id: 'workspace', label: 'Workspace', story: 'ExplorerBase', args: { dataset: 'default', initialSectionId: 'workspace' } },
            { id: 'reports', label: 'Reports', story: 'ExplorerBase', args: { dataset: 'default', initialSectionId: 'reports' } },
            { id: 'sub-menu-variant', label: 'SubMenuVariant', story: 'ExplorerBase', args: { dataset: 'noHero', initialSectionId: 'sub-menu' } },
            { id: 'service-health', label: 'ServiceHealth', story: 'ExplorerBase', args: { dataset: 'default', initialSectionId: 'health' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'metrics-without-hero', label: 'MetricsWithoutHero', story: 'ExplorerBase', args: { dataset: 'noHero', initialSectionId: 'metrics-only' } },
            { id: 'hero-top-placement', label: 'HeroTopPlacement', story: 'ExplorerBase', args: { dataset: 'default', initialSectionId: 'overview', heroPlacement: 'top' } },
          ],
        },
      ],
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  decorators: [popoverCanvas],
  argTypes: {
    initialSectionId: {
      control: 'select',
      options: [
        'overview',
        'insights',
        'workspace',
        'health',
        'reports',
        'support',
      ],
      description: 'Preselects a navigation item to showcase its layout',
    },
    onClose: { action: 'close clicked' },
    onSectionChange: { action: 'section changed' },
  },
};

export default meta;
type Story = StoryObj<typeof NavigationPopover>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const sections = args.dataset === 'noHero' ? noHeroSections : DEFAULT_NAVIGATION_SECTIONS;
    return (
      <NavigationPopover
        open
        initialSectionId={args.initialSectionId ?? 'overview'}
        heroPlacement={args.heroPlacement}
        metricsColumns={args.heroPlacement === 'top' ? { withHero: 3 } : undefined}
      >
        {renderSections(sections)}
      </NavigationPopover>
    );
  },
};

const renderSections = (sections: NavigationSectionType[]) =>
  sections.map((section) => (
    <NavigationSection
      key={section.id}
      id={section.id}
      label={section.label}
      icon={section.icon}
      showChevron={section.showChevron}
    >
      {section.hero ? (
        <NavigationSectionHero
          title={section.hero.title}
          description={section.hero.description}
          image={section.hero.image}
          illustrationVariant={section.hero.illustrationVariant}
          alt={section.hero.alt}
        />
      ) : null}
      {section.metrics?.map((metric, metricIndex) => (
        <NavigationSectionMetric
          key={`${section.id}-metric-${metricIndex}`}
          variant={metric.variant === 'highlight' || metric.variant === 'alert' ? metric.variant : 'stat'}
          title={'title' in metric ? metric.title : undefined}
          label={'label' in metric ? metric.label : undefined}
          value={'value' in metric ? metric.value : undefined}
          description={'description' in metric ? metric.description : undefined}
          actionLabel={'actionLabel' in metric ? metric.actionLabel : undefined}
          actionIcon={'actionIcon' in metric ? metric.actionIcon : undefined}
          badgeVariant={'badgeVariant' in metric ? metric.badgeVariant : undefined}
        />
      ))}
      {section.subCategories?.map((category, categoryIndex) => (
        <NavigationSectionSubCategory key={`${section.id}-category-${categoryIndex}`} title={category.title}>
          {category.items.map((item) => (
            <NavigationSectionSubCategoryItem
              key={`${section.id}-${categoryIndex}-${item.label}`}
              label={item.label}
              icon={item.icon}
              description={item.description}
              disabled={item.disabled}
              status={item.status}
            />
          ))}
        </NavigationSectionSubCategory>
      ))}
    </NavigationSection>
  ));

export const DocsOverview: Story = {
  render: () => (
    <NavigationPopover open initialSectionId="overview">
      {renderSections(DEFAULT_NAVIGATION_SECTIONS)}
    </NavigationPopover>
  ),

  parameters: { docsOnly: true },
}