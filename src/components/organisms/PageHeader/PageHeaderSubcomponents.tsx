"use client";

import React, { forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { Icon } from '../../atoms/Icons';
import { PageHeaderFiltersProvider } from '../../molecules/PageHeaderFilters/PageHeaderFiltersContext';

export interface PageHeaderTopProps extends ComposableProps<'div'> {
  children: React.ReactNode;
}

/**
 * Organizes the primary row of a PageHeader, typically containing left/right regions.
 *
 * @example
 * ```tsx
 * <PageHeader.Top>
 *   <PageHeader.Left>...</PageHeader.Left>
 *   <PageHeader.Right>...</PageHeader.Right>
 * </PageHeader.Top>
 * ```
 *
 * @remarks
 * - **Purpose:** Flex container for the main row.
 * - **Props:** Accepts all div props through `ComposableProps<'div'>`.
 * - **Accessibility:** No implicit role; inherits semantics from the header.
 */
export const PageHeaderTop = forwardRef<HTMLDivElement, PageHeaderTopProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          'flex w-full items-center justify-between gap-[var(--spacing-x4)] px-[var(--spacing-x5)] py-[var(--spacing-x3)]',
          'min-h-[calc(var(--spacing-x11)*2)]',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
PageHeaderTop.displayName = 'PageHeaderTop';

export interface PageHeaderLeftProps extends ComposableProps<'div'> {
  children: React.ReactNode;
}

/**
 * Left-aligned stack for icons, titles, breadcrumbs, etc.
 *
 * @example
 * ```tsx
 * <PageHeader.Left>
 *   <PageHeader.BackButton />
 *   <PageHeader.Title>Overview</PageHeader.Title>
 * </PageHeader.Left>
 * ```
 *
 * @remarks
 * - **Purpose:** Keeps identity elements grouped.
 * - **Props:** Div props via `ComposableProps<'div'>`.
 * - **Accessibility:** No special semantics.
 */
export const PageHeaderLeft = forwardRef<HTMLDivElement, PageHeaderLeftProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          'relative flex items-center gap-[var(--spacing-x6)] shrink-0',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
PageHeaderLeft.displayName = 'PageHeaderLeft';

export interface PageHeaderRightProps extends ComposableProps<'div'> {
  children: React.ReactNode;
}

/**
 * Right-aligned stack for actions, filters, avatars, etc.
 *
 * @example
 * ```tsx
 * <PageHeader.Right>
 *   <PageHeader.Actions>...</PageHeader.Actions>
 * </PageHeader.Right>
 * ```
 *
 * @remarks
 * - **Purpose:** Anchors controls to the far edge.
 * - **Props:** Inherits div props.
 * - **Accessibility:** Decorative container only.
 */
export const PageHeaderRight = forwardRef<HTMLDivElement, PageHeaderRightProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          'relative ml-auto flex items-center gap-[var(--spacing-x5)] shrink-0',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
PageHeaderRight.displayName = 'PageHeaderRight';

export interface PageHeaderBottomProps extends ComposableProps<'div'> {
  children: React.ReactNode;
}

/**
 * Secondary row for tabs, breadcrumbs, or supporting metadata.
 *
 * @example
 * ```tsx
 * <PageHeader.Bottom>
 *   <PageHeader.Tabs>...</PageHeader.Tabs>
 * </PageHeader.Bottom>
 * ```
 *
 * @remarks
 * - **Purpose:** Extends the header with contextual UI.
 * - **Props:** Accepts div props for layout control.
 * - **Accessibility:** Neutral container; inherits parent semantics.
 */
export const PageHeaderBottom = forwardRef<HTMLDivElement, PageHeaderBottomProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          'flex w-full flex-wrap items-center gap-[var(--spacing-x3)] px-[var(--spacing-x5)] pt-[var(--spacing-x2)]',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
PageHeaderBottom.displayName = 'PageHeaderBottom';

export interface PageHeaderBackButtonProps extends ComposableProps<'button'> {
  onClick?: () => void;
}

/**
 * Iconic navigation affordance used to exit the current page.
 *
 * @example
 * ```tsx
 * <PageHeader.BackButton onClick={router.back} />
 * ```
 *
 * @remarks
 * - **Props:** Button props with Slot support.
 * - **Accessibility:** Provides `aria-label="Go back"` by default.
 */
export const PageHeaderBackButton = forwardRef<HTMLButtonElement, PageHeaderBackButtonProps>(
  ({ className, onClick, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        onClick={onClick}
        className={cn(
          'relative inline-flex size-[var(--spacing-x11)] items-center justify-center rounded-[var(--radius-md)]',
          'transition-colors hover:bg-[var(--bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
          className
        )}
        aria-label={props['aria-label'] ?? 'Go back'}
        {...props}
      >
        <div className="flex size-[var(--spacing-x7)] items-center justify-center">
          <Icon name="arrow-left" size={16} className="text-[var(--primary)]" />
        </div>
      </Comp>
    );
  }
);
PageHeaderBackButton.displayName = 'PageHeaderBackButton';

export interface PageHeaderTitleProps extends ComposableProps<'h1'> {
  children: React.ReactNode;
}

/**
 * Primary text label for the current view.
 *
 * @example
 * ```tsx
 * <PageHeader.Title>Driver PB 09 HH6439</PageHeader.Title>
 * ```
 *
 * @remarks
 * - **Accessibility:** Renders as `<h1>` by default.
 * - **Props:** Accepts heading overrides through `asChild`.
 */
export const PageHeaderTitle = forwardRef<HTMLHeadingElement, PageHeaderTitleProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h1';
    return (
      <Comp
        ref={ref}
        className={cn(
          'text-xl-rem font-semibold leading-[1.4] text-[var(--primary)]',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
PageHeaderTitle.displayName = 'PageHeaderTitle';

export interface PageHeaderSubtitleProps extends ComposableProps<'p'> {
  children: React.ReactNode;
}

/**
 * Supporting line of copy beneath the main title.
 *
 * @example
 * ```tsx
 * <PageHeader.Subtitle>ID 7ebd1826-18bb</PageHeader.Subtitle>
 * ```
 *
 * @remarks
 * - **Props:** Inherits typography props via `ComposableProps<'p'>`.
 * - **Accessibility:** Renders as `<p>`; use `asChild` for semantic overrides.
 */
export const PageHeaderSubtitle = forwardRef<HTMLParagraphElement, PageHeaderSubtitleProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    return (
      <Comp
        ref={ref}
        className={cn(
          'text-md-rem font-medium leading-[1.4] text-[var(--tertiary)]',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
PageHeaderSubtitle.displayName = 'PageHeaderSubtitle';

export interface PageHeaderIconProps extends ComposableProps<'div'> {
  children: React.ReactNode;
}

/**
 * Icon holder sized to align with text baselines.
 *
 * @example
 * ```tsx
 * <PageHeader.Icon>
 *   <Icon name="location" size={20} />
 * </PageHeader.Icon>
 * ```
 *
 * @remarks
 * - **Props:** Accepts div props for sizing/background tweaks.
 * - **Accessibility:** Non-semantic container; icons should set their own labels if needed.
 */
export const PageHeaderIcon = forwardRef<HTMLDivElement, PageHeaderIconProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          'flex size-[var(--spacing-x7)] items-center justify-center rounded-[var(--radius-md)]',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
PageHeaderIcon.displayName = 'PageHeaderIcon';

export interface PageHeaderTitleGroupProps extends ComposableProps<'div'> {
  children: React.ReactNode;
}

/**
 * Vertical stack that pairs titles, subtitles, status badges, etc.
 *
 * @example
 * ```tsx
 * <PageHeader.TitleGroup>
 *   <PageHeader.Title>Manifest</PageHeader.Title>
 *   <PageHeader.Subtitle>Status: Live</PageHeader.Subtitle>
 * </PageHeader.TitleGroup>
 * ```
 *
 * @remarks
 * - **Props:** Flex column container receiving div props.
 * - **Accessibility:** Purely visual grouping.
 */
export const PageHeaderTitleGroup = forwardRef<HTMLDivElement, PageHeaderTitleGroupProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          'flex flex-col items-start justify-center gap-[calc(var(--spacing-x1)/2)]',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
PageHeaderTitleGroup.displayName = 'PageHeaderTitleGroup';

export interface PageHeaderActionsProps extends ComposableProps<'div'> {
  children: React.ReactNode;
}

/**
 * Horizontal cluster for buttons or quick actions.
 *
 * @example
 * ```tsx
 * <PageHeader.Actions>
 *   <Button variant="secondary">Export</Button>
 *   <Button variant="primary">Add Asset</Button>
 * </PageHeader.Actions>
 * ```
 *
 * @remarks
 * - **Props:** Inherits div props for alignment overrides.
 * - **Accessibility:** Leaves semantics to the nested controls.
 */
export const PageHeaderActions = forwardRef<HTMLDivElement, PageHeaderActionsProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          'flex items-center gap-[var(--spacing-x3)] shrink-0',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
PageHeaderActions.displayName = 'PageHeaderActions';

export interface PageHeaderFiltersProps extends ComposableProps<'div'> {
  children: React.ReactNode;
}

/**
 * Wrapper that provides filter context + layout for composable filter inputs.
 *
 * @example
 * ```tsx
 * <PageHeader.Filters>
 *   <FilterDropdown ... />
 *   <FilterSearch ... />
 * </PageHeader.Filters>
 * ```
 *
 * @remarks
 * - **Props:** Div props plus Slot support; provides PageHeaderFilters context.
 * - **Accessibility:** Does not alter focus order; children define their own semantics.
 */
export const PageHeaderFilters = forwardRef<HTMLDivElement, PageHeaderFiltersProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <PageHeaderFiltersProvider>
        <Comp
          ref={ref}
          className={cn(
            'flex items-center gap-[var(--spacing-x3)] overflow-clip rounded-[var(--radius-md)]',
            className
          )}
          {...props}
        >
          {children}
        </Comp>
      </PageHeaderFiltersProvider>
    );
  }
);
PageHeaderFilters.displayName = 'PageHeaderFilters';
