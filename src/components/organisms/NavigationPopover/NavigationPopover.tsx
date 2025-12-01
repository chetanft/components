"use client";
import React, { useMemo, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Logo } from '../../atoms/Logos';
import { Icon, type IconName } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button/Button';
import { Badge } from '../../atoms/Badge';
import { Illustration, type IllustrationVariant } from '../../atoms/Illustration';
import { Divider } from '../../atoms/Divider';
import { Spacer } from '../../atoms/Spacer';

type BadgeVariant = 'normal' | 'danger' | 'success' | 'warning' | 'neutral';

type HighlightMetric = {
  variant: 'highlight';
  title: string;
  description: string;
  actionLabel?: string;
  actionIcon?: IconName;
};

type StatMetric = {
  variant?: 'stat';
  label: string;
  value: string;
};

type AlertMetric = {
  variant: 'alert';
  label: string;
  value: string;
  badgeVariant?: BadgeVariant;
  description?: string;
};

export type NavigationSectionMetric = HighlightMetric | StatMetric | AlertMetric;

export type NavigationSectionSubCategoryItem = {
  label: string;
  icon?: IconName;
  description?: string;
  disabled?: boolean;
  status?: 'active';
};

export type NavigationSectionSubCategory = {
  title?: string;
  items: NavigationSectionSubCategoryItem[];
};

export type NavigationSectionHero = {
  image?: string;
  title: string;
  description: string;
  illustrationVariant?: IllustrationVariant;
  alt?: string;
};

export interface NavigationSection {
  id: string;
  label: string;
  icon: IconName;
  hero?: NavigationSectionHero;
  metrics?: NavigationSectionMetric[];
  subCategories?: NavigationSectionSubCategory[];
  showChevron?: boolean;
}

export type HeroPlacement = 'auto' | 'left' | 'top';

export interface MetricsColumnsConfig {
  withHero?: 1 | 2 | 3 | 4;
  withoutHero?: 1 | 2 | 3 | 4;
}

export interface NavigationPopoverProps {
  open?: boolean;
  onClose?: () => void;
  sections?: NavigationSection[];
  initialSectionId?: string;
  onSectionChange?: (itemId: string) => void;
  className?: string;
  renderHero?: (hero: NavigationSectionHero) => React.ReactNode;
  renderHeader?: (defaultHeader: React.ReactNode) => React.ReactNode;
  footerSlot?: React.ReactNode;
  headerSlot?: React.ReactNode;
  heroPlacement?: HeroPlacement;
  metricsColumns?: MetricsColumnsConfig;
}

const DEFAULT_SECTIONS: NavigationSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'dashboard',
    hero: {
      illustrationVariant: 'overview',
      title: 'Overview',
      description: 'High-level summary of what matters most to your teams.',
    },
    metrics: [
      {
        variant: 'highlight',
        title: 'Key Metrics',
        description: 'Monitor business performance in real time.',
      },
      {
        variant: 'highlight',
        title: 'Projects',
        description: 'Track initiatives, milestones, and goals.',
      },
      {
        variant: 'highlight',
        title: 'Teams',
        description: 'See how different groups are progressing.',
      },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: 'planning',
    hero: {
      illustrationVariant: 'insights',
      title: 'Insights',
      description: 'Dig deeper into trends and uncover new opportunities.',
    },
    metrics: [
      { label: 'Active Experiments', value: '12' },
      { label: 'Opportunities', value: '34' },
      { label: 'Segments', value: '8' },
      { label: 'Responses', value: '218' },
    ],
  },
  {
    id: 'workspace',
    label: 'Workspace',
    icon: 'data-stack',
    subCategories: [
      {
        title: 'Collections',
        items: [
          { label: 'Libraries', icon: 'contracted-bill', description: 'Shared resources and patterns.' },
          { label: 'Templates', icon: 'document', description: 'Reusable layouts for quick starts.' },
        ],
      },
      {
        title: 'Collaboration',
        items: [
          { label: 'Briefs', icon: 'planning', status: 'active' },
          { label: 'Feedback', icon: 'comment' },
          { label: 'Approvals', icon: 'check' },
        ],
      },
      {
        title: 'Automation',
        items: [
          { label: 'Rules', icon: 'settings' },
          { label: 'Integrations', icon: 'link' },
          { label: 'Connections', icon: 'share' },
        ],
      },
    ],
  },
  {
    id: 'health',
    label: 'Service Health',
    icon: 'control-tower',
    hero: {
      illustrationVariant: 'workspace',
      title: 'Service Health',
      description: 'Keep a pulse on system stability and response times.',
    },
    metrics: [
      {
        variant: 'alert',
        label: 'Critical',
        value: '3',
        badgeVariant: 'danger',
        description: 'Immediate attention required.',
      },
      {
        variant: 'alert',
        label: 'Warnings',
        value: '7',
        badgeVariant: 'warning',
        description: 'Review before escalation.',
      },
      {
        variant: 'alert',
        label: 'Info',
        value: '12',
        badgeVariant: 'neutral',
        description: 'FYI updates and announcements.',
      },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'reports',
    hero: {
      illustrationVariant: 'reports',
      title: 'Reports',
      description: 'Create dashboards, export snapshots, or schedule recurring digests.',
    },
    metrics: [
      {
        variant: 'highlight',
        title: 'Dashboards',
        description: 'Visualize data in configurable layouts.',
        actionLabel: 'Open',
      },
      {
        variant: 'highlight',
        title: 'Digest',
        description: 'Send automated summaries to stakeholders.',
        actionLabel: 'Schedule',
      },
    ],
  },
  {
    id: 'support',
    label: 'Help Center',
    icon: 'shake-hand',
    hero: {
      title: 'Help Center',
      description: 'Find answers, connect with experts, and manage requests.',
    },
    metrics: [
      { label: 'Open Requests', value: '18' },
      { label: 'Avg. Response', value: '2h 15m' },
    ],
  },
];

export const DEFAULT_NAVIGATION_SECTIONS = DEFAULT_SECTIONS;

const isHighlightMetric = (metric: NavigationSectionMetric): metric is HighlightMetric =>
  metric.variant === 'highlight';

const isAlertMetric = (metric: NavigationSectionMetric): metric is AlertMetric =>
  metric.variant === 'alert';

const isStatMetric = (metric: NavigationSectionMetric): metric is StatMetric =>
  !metric.variant || metric.variant === 'stat';

const HeroBlock = ({ hero }: { hero: NavigationSectionHero }) => (
  <div className="w-full lg:w-[452px]">
    {hero.image || hero.illustrationVariant ? (
      <Illustration
        variant={hero.illustrationVariant}
        src={hero.image}
        alt={hero.alt ?? hero.title}
        size="xl"
        rounded="md"
        className="w-full"
      />
    ) : (
      <div className="border border-[var(--border-primary)] rounded-[var(--x4,16px)] bg-[var(--bg-secondary)] p-[var(--x4,16px)] min-h-[352px]" />
    )}
  </div>
);

const HighlightCard = ({ metric }: { metric: HighlightMetric }) => (
  <div className="border border-[var(--border-secondary)] rounded-[var(--x2,8px)] px-[var(--x5,20px)] py-[var(--x3,12px)] flex flex-col gap-[var(--x2,8px)] bg-[var(--bg-primary)]">
    <Typography variant="display-primary" color="primary">
      {metric.title}
    </Typography>
    <Typography variant="body-secondary-medium" color="secondary">
      {metric.description}
    </Typography>
    {metric.actionLabel && (
      <Button
        variant="text"
        size="sm"
        className="!p-0 text-[var(--neutral)]"
        icon={metric.actionIcon ?? 'arrow-top-right'}
        iconPosition="trailing"
      >
        {metric.actionLabel}
      </Button>
    )}
  </div>
);

const StatCard = ({ metric }: { metric: StatMetric }) => (
  <div className="border border-[var(--border-secondary)] rounded-[var(--x2,8px)] px-[var(--x5,20px)] py-[var(--x3,12px)] flex items-center justify-between gap-4 bg-[var(--bg-primary)]">
    <div className="flex flex-col gap-[var(--x1,4px)]">
      <Typography variant="display-primary" color="primary">
        {metric.value}
      </Typography>
      <Typography variant="body-secondary-medium" color="secondary">
        {metric.label}
      </Typography>
    </div>
    <div className="w-10 h-10 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--primary)]">
      <Icon name="chevron-right" size={16} />
    </div>
  </div>
);

const AlertCard = ({ metric }: { metric: AlertMetric }) => (
  <div className="border border-[var(--border-secondary)] rounded-[var(--x2,8px)] px-[var(--x5,20px)] py-[var(--x3,12px)] flex flex-col gap-[var(--x2,8px)] bg-[var(--bg-primary)]">
    <div className="flex items-center justify-between">
      <Typography variant="display-primary" color="primary">
        {metric.value}
      </Typography>
      <Badge variant={metric.badgeVariant ?? 'normal'}>{metric.label}</Badge>
    </div>
    {metric.description && (
      <Typography variant="body-secondary-medium" color="secondary">
        {metric.description}
      </Typography>
    )}
  </div>
);

const SubCategoryPanel = ({ categories }: { categories?: NavigationSectionSubCategory[] }) => {
  if (!categories?.length) return null;
  return (
    <div className="flex flex-col gap-[var(--x4,16px)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--x3,12px)]">
        {categories.map((category, index) => (
          <div
            key={`${category.title ?? 'category'}-${index}`}
            className="bg-[var(--bg-primary)] rounded-[var(--x2,8px)] p-[var(--x3,12px)] flex flex-col gap-[var(--x3,12px)]"
          >
            {category.title && (
              <Typography variant="body-secondary-semibold" color="muted">
                {category.title}
              </Typography>
            )}
            <div className="flex flex-col gap-[var(--x2,8px)]">
              {category.items.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  disabled={item.disabled}
                  className={cn(
                    'flex items-center justify-between rounded-[var(--x2,8px)] px-[var(--x3,12px)] py-[var(--x2,8px)] transition-colors text-left',
                    item.status === 'active'
                      ? 'bg-[var(--bg-secondary)]'
                      : 'bg-[var(--bg-primary)] hover:bg-[var(--border-secondary)]',
                    item.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <div className="flex flex-col gap-[var(--x1,4px)]">
                    <div className="flex items-center gap-[var(--x2,8px)]">
                      {item.icon && (
                        <span className="w-6 h-6 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--primary)]">
                          <Icon name={item.icon} size={16} />
                        </span>
                      )}
                      <Typography variant="body-primary-regular" color={item.disabled ? 'muted' : 'primary'}>
                        {item.label}
                      </Typography>
                    </div>
                    {item.description && (
                      <Typography variant="body-secondary-medium" color="secondary">
                        {item.description}
                      </Typography>
                    )}
                  </div>
                  <Icon name="chevron-right" size={14} className="text-[var(--tertiary)]" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const columnClassMap: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

const MetricsPanel = ({
  metrics,
  columnClass,
}: {
  metrics?: NavigationSectionMetric[];
  columnClass: string;
}) => {
  if (!metrics?.length) return null;

  const highlightMetrics = metrics.filter(isHighlightMetric);
  const statMetrics = metrics.filter(isStatMetric);
  const alertMetrics = metrics.filter(isAlertMetric);

  return (
    <div className="flex flex-col gap-[var(--x4,16px)] flex-1">
      {highlightMetrics.length > 0 && (
        <div className="flex flex-col gap-[var(--x3,12px)]">
          {highlightMetrics.map((metric) => (
            <HighlightCard key={metric.title} metric={metric} />
          ))}
        </div>
      )}
      {(statMetrics.length > 0 || alertMetrics.length > 0) && (
        <div className={cn('grid gap-[var(--x3,12px)] grid-cols-1', columnClass)}>
          {statMetrics.map((metric) => (
            <StatCard key={metric.label} metric={metric} />
          ))}
          {alertMetrics.map((metric) => (
            <AlertCard key={metric.label} metric={metric} />
          ))}
        </div>
      )}
    </div>
  );
};

export const NavigationPopover: React.FC<NavigationPopoverProps> = ({
  open = true,
  onClose,
  sections,
  initialSectionId,
  onSectionChange,
  className,
  renderHero,
  renderHeader,
  footerSlot,
  headerSlot,
  heroPlacement = 'auto',
  metricsColumns,
}) => {
  const availableSections = sections?.length ? sections : DEFAULT_SECTIONS;

  const safeInitialId = useMemo(() => {
    if (initialSectionId && availableSections.some((section) => section.id === initialSectionId)) {
      return initialSectionId;
    }
    return availableSections[0]?.id ?? '';
  }, [initialSectionId, availableSections]);

  const [activeSectionId, setActiveSectionId] = useState(safeInitialId);

  if (!open || !availableSections.length) {
    return null;
  }

  const activeSection = availableSections.find((section) => section.id === activeSectionId) ?? availableSections[0];
  const hasSubCategories = activeSection?.subCategories?.some((category) => category.items.length) ?? false;
  const shouldShowHero = Boolean(activeSection?.hero && !hasSubCategories);
  const resolvedHeroPlacement: HeroPlacement =
    heroPlacement === 'auto' ? (shouldShowHero ? 'left' : 'top') : heroPlacement;
  const gridColumns = shouldShowHero
    ? metricsColumns?.withHero ?? 2
    : metricsColumns?.withoutHero ?? 2;
  const metricsColumnClass = columnClassMap[gridColumns] ?? columnClassMap[2];

  const handleSelect = (sectionId: string) => {
    setActiveSectionId(sectionId);
    onSectionChange?.(sectionId);
  };

  const defaultHeader = (
    <>
      <div className="h-[36px] w-[190px]">
        <Logo name="ft" width={190} height={36} />
      </div>
      <div className="flex items-center gap-[var(--x2,8px)]">
        {headerSlot}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="w-6 h-6 rounded-full border border-transparent hover:border-[var(--border-primary)] flex items-center justify-center text-[var(--primary)]"
        >
          <Icon name="cross" size={16} />
        </button>
      </div>
    </>
  );

  const headerContent = renderHeader ? renderHeader(defaultHeader) : defaultHeader;

  const heroVisual =
    shouldShowHero && activeSection.hero
      ? renderHero?.(activeSection.hero) ?? <HeroBlock hero={activeSection.hero} />
      : null;
  const showDefaultHeroHeading = shouldShowHero && activeSection.hero && !renderHero;

  const footerContent =
    footerSlot ?? (
      <>
        <Typography variant="button" color="primary">
          <span className="font-semibold">New: Workspace automation&nbsp;</span>
          <span className="font-normal" style={{ fontSize: 'var(--font-size-md-rem)' }}>
            {/* 16px → 1.143rem (responsive) */}
            Connect data sources and share updates automatically.
          </span>
        </Typography>
        <Button variant="link" size="lg">
          View Updates
        </Button>
      </>
    );

  return (
    <div
      className={cn(
        'bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-[var(--x5,20px)] p-[var(--x2,8px)] shadow-lg',
        className
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-[var(--x4,16px)] flex flex-col">
        <div className="flex items-center justify-between px-[var(--x5,20px)] py-[var(--x5,20px)] border-b border-[var(--border-primary)]">
          {headerContent}
        </div>

        <div className="flex flex-col lg:flex-row gap-[var(--x5,20px)] px-[var(--x5,20px)] py-[var(--x5,20px)]">
          <div className="w-full lg:w-[263px] flex-shrink-0">
            <nav aria-label="Primary navigation" className="flex flex-col gap-[12px] max-h-[472px] overflow-y-auto pr-1">
              {availableSections.map((section) => {
                const isActive = section.id === activeSection.id;
                const showChevron = section.showChevron ?? Boolean(section.subCategories?.length);
                return (
                  <button
                    type="button"
                    key={section.id}
                    onClick={() => handleSelect(section.id)}
                    className={cn(
                      'flex items-center justify-between rounded-[var(--x2,8px)] px-[var(--x3,12px)] py-[var(--x3,12px)] transition-colors text-left',
                      isActive
                        ? 'bg-[var(--bg-secondary)]'
                        : 'bg-[var(--bg-primary)] hover:bg-[var(--border-secondary)]'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className="flex items-center gap-[var(--x2,8px)]">
                      <span className="w-6 h-6 rounded-full border border-[var(--border-primary)] flex items-center justify-center text-[var(--primary)]">
                        <Icon name={section.icon} size={16} />
                      </span>
                      <Typography variant="body-primary-semibold" color="primary">
                        {section.label}
                      </Typography>
                    </div>
                    {showChevron && <Icon name="chevron-right" size={16} className="text-[var(--tertiary)]" />}
                  </button>
                );
              })}
              <Spacer size="x5" aria-hidden="true" />
            </nav>
          </div>

          <div className="hidden lg:block w-px bg-[var(--border-primary)] rounded-full" />

          <div className="flex-1 min-h-[320px]">
            {hasSubCategories ? (
              <SubCategoryPanel categories={activeSection.subCategories} />
            ) : (
              <div
                className={cn(
                  'flex flex-col gap-[var(--x5,20px)]',
                  resolvedHeroPlacement === 'left' && shouldShowHero && 'lg:flex-row'
                )}
              >
                {heroVisual}
                <div className="flex-1 flex flex-col gap-[var(--x3,12px)]">
                  {showDefaultHeroHeading && activeSection.hero && (
                    <div>
                      <Typography variant="title-secondary" color="primary">
                        {activeSection.hero.title}
                      </Typography>
                      <Typography variant="body-secondary-medium" color="secondary">
                        {activeSection.hero.description}
                      </Typography>
                    </div>
                  )}
                  <MetricsPanel metrics={activeSection.metrics} columnClass={metricsColumnClass} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-b-[inherit]">
          <Divider type="primary" className="w-full" />
          <div className="px-[var(--x5,20px)] py-[var(--x3,12px)] flex items-center justify-between gap-[var(--x2,8px)] flex-wrap">
            {footerContent}
          </div>
        </div>
      </div>
    </div>
  );
};

NavigationPopover.displayName = 'NavigationPopover';
