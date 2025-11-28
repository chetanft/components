"use client";
import React, { forwardRef, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icons';
import { SegmentedTabs } from '../../molecules/SegmentedTabs/SegmentedTabs';

export interface PageHeaderTab {
  label: string;
  key: string;
  disabled?: boolean;
}

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title text displayed next to the back button */
  title?: string;
  /** Subtitle text displayed below the title (only shown in variant1) */
  subtitle?: string;
  /** Layout variant: variant1 has back button on left with subtitle, variant2 has back button on right */
  variant?: 'variant1' | 'variant2';
  /** Whether to show the back button */
  showBackButton?: boolean;
  /** Callback when back button is clicked */
  onBack?: () => void;
  /** Array of tabs to display */
  tabs?: PageHeaderTab[];
  /** Active tab key */
  activeTab?: string;
  /** Callback when a tab is clicked */
  onTabChange?: (key: string) => void;
  /** Tab style: underline (default) or segmented */
  tabStyle?: 'underline' | 'segmented';
  /** Whether to show tabs */
  showTabs?: boolean;
  /** Whether to show action buttons */
  showActions?: boolean;
  /** Primary action button label */
  primaryActionLabel?: string;
  /** Secondary action button label */
  secondaryActionLabel?: string;
  /** Callback when primary action is clicked */
  onPrimaryAction?: () => void;
  /** Callback when secondary action is clicked */
  onSecondaryAction?: () => void;
  /** Callback when search icon is clicked */
  onSearchClick?: () => void;
  /** Callback when document icon is clicked */
  onDocumentClick?: () => void;
}

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({
    title = 'PB 09 HH6439',
    subtitle,
    variant = 'variant1',
    showBackButton = true,
    onBack,
    tabs = [
      { label: 'Tracking', key: 'tracking' },
      { label: 'Loads', key: 'loads' },
      { label: 'Exceptions', key: 'exceptions' },
      { label: 'Ops', key: 'ops' },
    ],
    activeTab,
    onTabChange,
    tabStyle = 'underline',
    showTabs = true,
    showActions = true,
    primaryActionLabel = 'Button',
    secondaryActionLabel = 'Button',
    onPrimaryAction,
    onSecondaryAction,
    onSearchClick,
    onDocumentClick,
    className,
    ...props
  }, ref) => {
    const [internalActiveTab, setInternalActiveTab] = useState(activeTab || tabs[0]?.key || '');

    const handleTabClick = (key: string) => {
      const tab = tabs.find(t => t.key === key);
      if (tab && !tab.disabled) {
        setInternalActiveTab(key);
        onTabChange?.(key);
      }
    };

    const handleSegmentedTabChange = (value: string) => {
      handleTabClick(value);
    };

    const currentActiveTab = activeTab !== undefined ? activeTab : internalActiveTab;
    const isVariant1 = variant === 'variant1';
    const isVariant2 = variant === 'variant2';
    const showSubtitle = isVariant1 && subtitle;

    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--bg-primary)]',
          'box-border',
          'flex',
          'h-[88px]',
          'items-center',
          'px-[20px]',
          'py-0',
          'relative',
          'w-full',
          // Use justify-between when we have both left (back/title) and right (tabs or actions) sections
          (showBackButton || title) && (showTabs || showActions) ? 'justify-between' : '',
          className
        )}
        {...props}
      >
        {/* Left Side - Back Button, Title, and Tabs (if segmented) */}
        <div className="flex gap-[var(--x6,24px)] items-center relative shrink-0">
          {(isVariant1 || isVariant2) && showBackButton && (
            <div className="flex gap-[12px] items-center relative shrink-0">
              <button
                onClick={onBack}
                className="relative shrink-0 size-[44px] flex items-center justify-center hover:bg-[var(--bg-secondary)] rounded-[var(--x2,8px)] transition-colors cursor-pointer"
                aria-label="Go back"
              >
                <div className="relative shrink-0 size-[28px] flex items-center justify-center">
                  <Icon
                    name="arrow-left"
                    size={16}
                    className="text-[var(--primary)]"
                  />
                </div>
              </button>
            </div>
          )}
          <div className="flex flex-col gap-[2px] items-start justify-center relative shrink-0">
            <p className="font-semibold leading-[1.4] relative shrink-0 text-[var(--primary)] text-[24px]">
              {title}
            </p>
            {showSubtitle && (
              <p className="font-semibold leading-[1.4] relative shrink-0 text-[var(--tertiary)] text-base">
                {subtitle}
              </p>
            )}
          </div>
          {showTabs && tabs.length > 0 && tabStyle === 'segmented' && (
            <div className="flex gap-[var(--x5,20px)] items-center relative shrink-0">
              <SegmentedTabs
                items={tabs.map(tab => ({ label: tab.label, value: tab.key }))}
                value={currentActiveTab}
                onChange={handleSegmentedTabChange}
                variant="default"
              />
            </div>
          )}
        </div>

        {/* Middle Section - Tabs (underline style only) */}
        {showTabs && tabs.length > 0 && tabStyle === 'underline' && (
          <div className="flex-1 flex h-full items-end justify-center relative">
            {tabs.map((tab) => {
              const isActive = tab.key === currentActiveTab;
              return (
                <div
                  key={tab.key}
                  onClick={() => handleTabClick(tab.key)}
                  className={cn(
                    'border-b-4 border-l-0 border-r-0 border-solid border-t-0',
                    'box-border',
                    'content-stretch',
                    'flex',
                    'flex-col',
                    'gap-[10px]',
                    'h-full',
                    'items-start',
                    'justify-center',
                    'px-[var(--x8,32px)]',
                    'py-[var(--x3,12px)]',
                    'relative',
                    'shrink-0',
                    'cursor-pointer',
                    'transition-colors',
                    tab.disabled && 'opacity-50 cursor-not-allowed',
                    isActive
                      ? 'border-[var(--primary)]'
                      : 'border-[var(--border-primary)]',
                    !isActive && 'hover:bg-[var(--bg-secondary)]'
                  )}
                >
                  <div className="content-stretch flex gap-[8px] h-[22px] items-center justify-center relative shrink-0 w-full">
                    <p
                      className={cn(
                        'leading-[1.4]',
                        'relative',
                        'shrink-0',
                        'text-[var(--primary)]',
                        'text-base',
                        isActive
                          ? 'font-semibold'
                          : 'font-normal'
                      )}
                    >
                      {tab.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Right Side - Action Buttons */}
        {showActions && (
          <div className="content-stretch flex gap-[20px] items-center relative shrink-0">
            <div className="content-stretch flex gap-[var(--x3,12px)] items-center relative shrink-0">
              {/* Icon-only buttons */}
              <div className="content-stretch flex gap-[var(--x3,12px)] items-center relative shrink-0">
                <Button
                  variant="secondary"
                  size="md"
                  icon="search"
                  iconPosition="only"
                  onClick={onSearchClick}
                  className="size-[40px] rounded-[8px]"
                  aria-label="Search"
                />
                <Button
                  variant="secondary"
                  size="md"
                  icon="document"
                  iconPosition="only"
                  onClick={onDocumentClick}
                  className="size-[40px] rounded-[8px]"
                  aria-label="Document"
                />
              </div>
              {/* Text buttons */}
              <div className="content-stretch flex gap-[var(--x3,12px)] items-start relative shrink-0">
                <Button
                  variant="secondary"
                  size="md"
                  icon="add"
                  iconPosition="leading"
                  onClick={onSecondaryAction}
                  className="rounded-[8px]"
                >
                  {secondaryActionLabel}
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  icon="add"
                  iconPosition="leading"
                  onClick={onPrimaryAction}
                  className="rounded-[8px]"
                >
                  {primaryActionLabel}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';

export default PageHeader;
