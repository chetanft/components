"use client";
import React, { forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import {
  PageHeaderTop,
  PageHeaderLeft,
  PageHeaderRight,
  PageHeaderBottom,
  PageHeaderBackButton,
  PageHeaderTitle,
  PageHeaderSubtitle,
  PageHeaderIcon,
  PageHeaderTitleGroup,
  PageHeaderActions,
  PageHeaderFilters as PageHeaderFiltersWrapper,
} from './PageHeaderSubcomponents';
import { PageHeaderTabs } from './PageHeaderTabs';

/**
 * PageHeader Props
 * 
 * Uses composable API only. Compose headers using PageHeader subcomponents:
 * - PageHeader.Top, PageHeader.Left, PageHeader.Right, PageHeader.Bottom
 * - PageHeader.Title, PageHeader.Subtitle, PageHeader.BackButton
 * - PageHeader.Actions, PageHeader.Tabs, PageHeader.Filters
 * 
 * @public
 */
export interface PageHeaderProps extends ComposableProps<'div'> {
  /** Children using composable API (PageHeader.Top, PageHeader.Left, etc.) */
  children?: React.ReactNode;
}

/**
 * PageHeader Component
 *
 * A composable header component for page navigation. Use subcomponents to build
 * flexible header layouts without variants or prop-based configuration.
 *
 * @public
 *
 * @example
 * ```tsx
 * <PageHeader>
 *   <PageHeader.Top>
 *     <PageHeader.Left>
 *       <PageHeader.BackButton />
 *       <PageHeader.Title>Page Title</PageHeader.Title>
 *     </PageHeader.Left>
 *     <PageHeader.Right>
 *       <PageHeader.Actions>
 *         <Button>Action</Button>
 *       </PageHeader.Actions>
 *     </PageHeader.Right>
 *   </PageHeader.Top>
 *   <PageHeader.Bottom>
 *     <PageHeader.Tabs value={activeTab} onValueChange={setActiveTab}>
 *       <PageHeader.Tabs.List>
 *         <PageHeader.Tabs.Trigger value="tracking">Tracking</PageHeader.Tabs.Trigger>
 *         <PageHeader.Tabs.Trigger value="loads">Loads</PageHeader.Tabs.Trigger>
 *       </PageHeader.Tabs.List>
 *     </PageHeader.Tabs>
 *   </PageHeader.Bottom>
 * </PageHeader>
 * ```
 *
 * @remarks
 * - Composable API only - use subcomponents to build layouts
 * - No variants or prop-based configuration
 * - Wraps the HTML `<div>` element by default
 * - Supports `asChild` prop to merge props with a custom child element
 */
export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, children, asChild, ...htmlProps }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          'bg-[var(--bg-primary)]',
          'box-border',
          'w-full',
          className
        )}
        {...htmlProps}
      >
        {children}
      </Comp>
    );
  }
);

PageHeader.displayName = 'PageHeader';

// Attach subcomponents for composable API
const PageHeaderWithSubcomponents = PageHeader as typeof PageHeader & {
  Top: typeof PageHeaderTop;
  Left: typeof PageHeaderLeft;
  Right: typeof PageHeaderRight;
  Bottom: typeof PageHeaderBottom;
  BackButton: typeof PageHeaderBackButton;
  Title: typeof PageHeaderTitle;
  Subtitle: typeof PageHeaderSubtitle;
  Icon: typeof PageHeaderIcon;
  TitleGroup: typeof PageHeaderTitleGroup;
  Actions: typeof PageHeaderActions;
  Filters: typeof PageHeaderFiltersWrapper;
  Tabs: typeof PageHeaderTabs;
};

PageHeaderWithSubcomponents.Top = PageHeaderTop;
PageHeaderWithSubcomponents.Left = PageHeaderLeft;
PageHeaderWithSubcomponents.Right = PageHeaderRight;
PageHeaderWithSubcomponents.Bottom = PageHeaderBottom;
PageHeaderWithSubcomponents.BackButton = PageHeaderBackButton;
PageHeaderWithSubcomponents.Title = PageHeaderTitle;
PageHeaderWithSubcomponents.Subtitle = PageHeaderSubtitle;
PageHeaderWithSubcomponents.Icon = PageHeaderIcon;
PageHeaderWithSubcomponents.TitleGroup = PageHeaderTitleGroup;
PageHeaderWithSubcomponents.Actions = PageHeaderActions;
PageHeaderWithSubcomponents.Filters = PageHeaderFiltersWrapper;
PageHeaderWithSubcomponents.Tabs = PageHeaderTabs;

export default PageHeaderWithSubcomponents;
