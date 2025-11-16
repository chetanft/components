'use client';

import React from 'react';
import { cn } from '../../../lib/utils';

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
  extends React.HTMLAttributes<HTMLDivElement> {
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
    'grid gap-[var(--x3,12px)] rounded-[28px] bg-[var(--bg-primary,#ffffff)] py-[var(--x4,16px)] sm:grid-cols-2 lg:grid-cols-4'
  ),
  pageHeader: cn(horizontalInset, 'flex flex-col gap-[var(--x2,8px)]'),
  toolbar: cn(
    horizontalInset,
    'flex flex-wrap items-center justify-between gap-[var(--x3,12px)] rounded-[24px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] py-[var(--x3,12px)]'
  ),
  tabs: cn(horizontalInset, 'flex flex-col gap-[var(--x1,4px)]'),
  subTabs: cn(horizontalInset, 'flex flex-wrap gap-[var(--x1,4px)]'),
  quickFilters: cn(
    horizontalInset,
    'flex flex-wrap gap-[var(--x2,8px)] rounded-[24px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] py-[var(--x3,12px)]'
  ),
  actionBar: cn(
    horizontalInset,
    'flex flex-wrap items-center justify-between gap-[var(--x3,12px)] rounded-[28px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] py-[var(--x4,16px)]'
  ),
  footer: cn(horizontalInset, 'pt-[var(--x4,16px)] pb-[var(--x8,32px)]'),
};

const contentLayoutClasses: Record<ListingLayoutLayout, string> = {
  stack: cn(horizontalInset, 'w-full pb-[var(--x8,32px)]'),
  grid: cn(
    horizontalInset,
    'grid w-full gap-[var(--x4,16px)] pb-[var(--x8,32px)] sm:grid-cols-2 xl:grid-cols-3'
  ),
  split: cn(
    horizontalInset,
    'grid w-full gap-[var(--x4,16px)] pb-[var(--x8,32px)] lg:grid-cols-[minmax(300px,360px)_1fr]'
  ),
};

const variantSurfaceClasses: Record<ListingLayoutVariant, string> = {
  table:
    'flex flex-col gap-[var(--x2,8px)] rounded-[24px] border border-[var(--border-secondary,#e3e5ed)] bg-[var(--bg-primary,#ffffff)] p-[var(--x4,16px)] shadow-[0px_1px_3px_rgba(15,23,42,0.08)]',
  card: 'flex flex-col gap-[var(--x3,12px)]',
  custom: 'flex flex-col gap-[var(--x3,12px)]',
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
            <div className="flex min-w-0 flex-col gap-[var(--x3,12px)]">
              {primary}
            </div>
            <div
              className={cn(
                'flex min-w-0 flex-col gap-[var(--x3,12px)]',
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

    return (
      <div
        ref={ref}
        data-variant={variant}
        className={cn('flex w-full flex-col gap-[var(--x5,20px)]', className)}
        {...props}
      >
        {sectionsOrder.map(renderSection)}
        {renderContent()}
        {renderFooter()}
      </div>
    );
  }
);

ListingLayout.displayName = 'ListingLayout';

export default ListingLayout;


