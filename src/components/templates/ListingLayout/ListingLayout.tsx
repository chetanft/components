'use client';

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export type ListingLayoutVariant = 'table' | 'card' | 'custom';
export type ListingLayoutLayout = 'stack' | 'split' | 'grid';

export type ListingLayoutSection =
  | 'appHeader'
  | 'hero'
  | 'pageHeader'
  | 'toolbar'
  | 'tabs'
  | 'subTabs'
  | 'quickFilters'
  | 'actionBar'
  | 'content'
  | 'contentSecondary'
  | 'footer';

type SectionHTMLElement = React.HTMLAttributes<HTMLDivElement>;

export type ListingLayoutSectionProps = Partial<
  Record<ListingLayoutSection, SectionHTMLElement>
>;

export interface ListingLayoutProps
  extends Omit<ComposableProps<'div'>, 'content'> {
  appHeader?: React.ReactNode;
  hero?: React.ReactNode;
  pageHeader?: React.ReactNode;
  toolbar?: React.ReactNode;
  tabs?: React.ReactNode;
  subTabs?: React.ReactNode;
  quickFilters?: React.ReactNode;
  actionBar?: React.ReactNode;
  content?: React.ReactNode;
  contentSecondary?: React.ReactNode;
  footer?: React.ReactNode;
  /**
   * Optional fallback to support legacy children-based consumption.
   * `content` prop takes precedence when both are provided.
   */
  children?: React.ReactNode;
  variant?: ListingLayoutVariant;
  layout?: ListingLayoutLayout;
  /**
   * Fine-grained overrides for each slot wrapper.
   */
  sectionProps?: ListingLayoutSectionProps;
}

const horizontalInset = 'px-4 sm:px-6 lg:px-10 xl:px-12';

const baseSectionClasses: Record<
  Exclude<ListingLayoutSection, 'content' | 'contentSecondary'>,
  string
> = {
  appHeader: cn(horizontalInset, 'pt-6'),
  hero: cn(
    horizontalInset,
    'grid gap-[var(--x3)] rounded-[1.75rem] bg-[var(--bg-primary)] py-[var(--x4)] sm:grid-cols-2 lg:grid-cols-4'
  ),
  pageHeader: cn(horizontalInset, 'flex flex-col gap-[var(--x2)]'),
  toolbar: cn(
    horizontalInset,
    'flex flex-wrap items-center justify-between gap-[var(--x3)] rounded-[1.5rem] border border-[var(--border-secondary)] bg-[var(--bg-primary)] py-[var(--x3)]'
  ),
  tabs: cn(horizontalInset, 'flex flex-col gap-[var(--x1)]'),
  subTabs: cn(horizontalInset, 'flex flex-wrap gap-[var(--x1)]'),
  quickFilters: cn(
    horizontalInset,
    'flex flex-wrap gap-[var(--x2)] rounded-[1.5rem] border border-[var(--border-secondary)] bg-[var(--bg-primary)] py-[var(--x3)]'
  ),
  actionBar: cn(
    horizontalInset,
    'flex flex-wrap items-center justify-between gap-[var(--x3)] rounded-[1.75rem] border border-[var(--border-secondary)] bg-[var(--bg-primary)] py-[var(--x4)]'
  ),
  footer: cn(horizontalInset, 'pt-[var(--x4)] pb-[var(--x8)]'),
};

const contentLayoutClasses: Record<ListingLayoutLayout, string> = {
  stack: cn(horizontalInset, 'w-full pb-[var(--x8)]'),
  grid: cn(
    horizontalInset,
    'grid w-full gap-[var(--x4)] pb-[var(--x8)] sm:grid-cols-2 xl:grid-cols-3'
  ),
  split: cn(
    horizontalInset,
    'grid w-full gap-[var(--x4)] pb-[var(--x8)] lg:grid-cols-[minmax(18.75rem,22.5rem)_1fr]'
  ),
};

const variantSurfaceClasses: Record<ListingLayoutVariant, string> = {
  table:
    'flex flex-col gap-[var(--x2)] rounded-[1.5rem] border border-[var(--border-secondary)] bg-[var(--bg-primary)] p-[var(--x4)] shadow-[0_1px_3px_rgba(15,23,42,0.08)]',
  card: 'flex flex-col gap-[var(--x3)]',
  custom: 'flex flex-col gap-[var(--x3)]',
};

const sectionsOrder: Array<
  Exclude<ListingLayoutSection, 'content' | 'contentSecondary' | 'footer'>
> = [
  'appHeader',
  'hero',
  'pageHeader',
  'toolbar',
  'tabs',
  'subTabs',
  'quickFilters',
  'actionBar',
];

type SectionAttrs = Omit<SectionHTMLElement, 'className'>;

const getSectionAttributes = (
  props?: SectionHTMLElement
): { className?: string; attrs: SectionAttrs } => {
  if (!props) {
    return { className: undefined, attrs: {} };
  }
  const { className, ...attrs } = props;
  return { className, attrs };
};

export const ListingLayout = React.forwardRef<
  HTMLDivElement,
  ListingLayoutProps
>(
  (
    {
      appHeader,
      hero,
      pageHeader,
      toolbar,
      tabs,
      subTabs,
      quickFilters,
      actionBar,
      content,
      contentSecondary,
      footer,
      children,
      variant = 'custom',
      layout,
      sectionProps,
      className,
      asChild,
      ...props
    },
    ref
  ) => {
    const slotMap: Record<ListingLayoutSection, React.ReactNode | undefined> = {
      appHeader,
      hero,
      pageHeader,
      toolbar,
      tabs,
      subTabs,
      quickFilters,
      actionBar,
      content: content ?? children,
      contentSecondary,
      footer,
    };

    const renderSection = (
      section: Exclude<ListingLayoutSection, 'content' | 'contentSecondary' | 'footer'>
    ) => {
      const node = slotMap[section];
      if (!node) {
        return null;
      }

      const { className: slotClassName, attrs } = getSectionAttributes(
        sectionProps?.[section]
      );

      const resolvedClassName = cn(
        baseSectionClasses[section],
        slotClassName
      );

      return (
        <div key={section} className={resolvedClassName} {...attrs}>
          {node}
        </div>
      );
    };

    const resolvedLayout: ListingLayoutLayout =
      layout ?? (variant === 'card' ? 'grid' : 'stack');

    const { className: contentClassName, attrs: contentAttrs } =
      getSectionAttributes(sectionProps?.content);

    const renderContent = () => {
      const primary = slotMap.content;
      const secondary = slotMap.contentSecondary;
      if (!primary && !secondary) {
        return null;
      }

      if (resolvedLayout === 'split' && secondary) {
        const { className: secondaryClassName, attrs: secondaryAttrs } =
          getSectionAttributes(sectionProps?.contentSecondary);

        return (
          <div
            className={cn(contentLayoutClasses.split, contentClassName)}
            {...contentAttrs}
          >
            <div className="flex min-w-0 flex-col gap-[var(--x3)]">
              {primary}
            </div>
            <div
              className={cn(
                'flex min-w-0 flex-col gap-[var(--x3)]',
                secondaryClassName
              )}
              {...secondaryAttrs}
            >
              {secondary}
            </div>
          </div>
        );
      }

      const layoutClass = contentLayoutClasses[resolvedLayout] ?? '';
      const shouldApplyVariantSurface = resolvedLayout === 'stack';

      return (
        <div
          className={cn(
            layoutClass,
            shouldApplyVariantSurface && variantSurfaceClasses[variant],
            contentClassName
          )}
          {...contentAttrs}
        >
          {primary}
        </div>
      );
    };

    const renderFooter = () => {
      const node = slotMap.footer;
      if (!node) {
        return null;
      }
      const { className: footerClassName, attrs } = getSectionAttributes(
        sectionProps?.footer
      );
      return (
        <div
          className={cn(baseSectionClasses.footer, footerClassName)}
          {...attrs}
        >
          {node}
        </div>
      );
    };

    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        data-variant={variant}
        className={cn('flex w-full flex-col gap-[var(--x5)]', className)}
        {...props}
      >
        {sectionsOrder.map(renderSection)}
        {renderContent()}
        {renderFooter()}
      </Comp>
    );
  }
);

ListingLayout.displayName = 'ListingLayout';

export default ListingLayout;


