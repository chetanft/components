"use client";
import React, { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
  /** Array of tabs to display (underline tabs in the middle) */
  tabs?: PageHeaderTab[];
  /** Active tab key */
  activeTab?: string;
  /** Callback when a tab is clicked */
  onTabChange?: (key: string) => void;
  /** Tab style: underline (default) or segmented */
  tabStyle?: 'underline' | 'segmented';
  /** Whether to show tabs */
  showTabs?: boolean;
  /** Array of segmented tabs to display on the left side (next to title) */
  leftTabs?: PageHeaderTab[];
  /** Active left tab key */
  activeLeftTab?: string;
  /** Callback when a left tab is clicked */
  onLeftTabChange?: (key: string) => void;
  /** Whether to show left segmented tabs */
  showLeftTabs?: boolean;
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
    leftTabs,
    activeLeftTab,
    onLeftTabChange,
    showLeftTabs = false,
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
    const [internalActiveLeftTab, setInternalActiveLeftTab] = useState(
      activeLeftTab || leftTabs?.[0]?.key || ''
    );
    const underlineTabsContainerRef = useRef<HTMLDivElement | null>(null);
    const underlineMeasurementRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [underlineContainerWidth, setUnderlineContainerWidth] = useState<number | null>(null);
    const [underlineTabWidths, setUnderlineTabWidths] = useState<number[]>([]);
    const [tabsOverflowOpen, setTabsOverflowOpen] = useState(false);
    const overflowTriggerRef = useRef<HTMLButtonElement | null>(null);
    const overflowMenuRef = useRef<HTMLDivElement | null>(null);
    const [overflowMenuPosition, setOverflowMenuPosition] = useState({ top: 0, left: 0 });

    const handleTabClick = (key: string) => {
      const tab = tabs.find(t => t.key === key);
      if (tab && !tab.disabled) {
        setInternalActiveTab(key);
        onTabChange?.(key);
      }
    };

    const handleLeftTabClick = (key: string) => {
      const tab = leftTabs?.find(t => t.key === key);
      if (tab && !tab.disabled) {
        setInternalActiveLeftTab(key);
        onLeftTabChange?.(key);
      }
    };

    const handleSegmentedTabChange = (value: string) => {
      // If we have leftTabs, this is for left tabs, otherwise for main tabs
      if (leftTabs && leftTabs.length > 0) {
        handleLeftTabClick(value);
      } else {
      handleTabClick(value);
      }
    };

    const currentActiveTab = activeTab !== undefined ? activeTab : internalActiveTab;
    const currentActiveLeftTab = activeLeftTab !== undefined ? activeLeftTab : internalActiveLeftTab;
    const isVariant1 = variant === 'variant1';
    const isVariant2 = variant === 'variant2';
    const showSubtitle = isVariant1 && subtitle;
    
    // Determine if we should show segmented tabs on the left
    const shouldShowLeftSegmentedTabs = showLeftTabs && leftTabs && leftTabs.length > 0;
    // Determine if we should show underline tabs in the middle
    const shouldShowUnderlineTabs = showTabs && tabs.length > 0 && tabStyle === 'underline';
    // Determine if we should show segmented tabs in the left section (when no leftTabs but tabStyle is segmented)
    const shouldShowSegmentedTabsInLeft = showTabs && tabs.length > 0 && tabStyle === 'segmented' && !shouldShowLeftSegmentedTabs;
    const activeTabIndex = tabs.findIndex((tab) => tab.key === currentActiveTab);

    const getUnderlineTabClassNames = (tab: PageHeaderTab, isActive: boolean) => cn(
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
      !isActive && !tab.disabled && 'hover:bg-[var(--bg-secondary)]'
    );

    const renderUnderlineTabContent = (tab: PageHeaderTab, isActive: boolean) => (
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
    );

    useEffect(() => {
      if (!shouldShowUnderlineTabs) {
        setUnderlineContainerWidth(null);
        setUnderlineTabWidths([]);
        return;
      }
      const node = underlineTabsContainerRef.current;
      if (!node || typeof ResizeObserver === 'undefined') return;
      const observer = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect?.width;
        if (typeof width === 'number') {
          setUnderlineContainerWidth(width);
        }
      });
      observer.observe(node);
      return () => observer.disconnect();
    }, [shouldShowUnderlineTabs]);

    useLayoutEffect(() => {
      if (!shouldShowUnderlineTabs) return;
      underlineMeasurementRefs.current = underlineMeasurementRefs.current.slice(0, tabs.length);
      const widths = underlineMeasurementRefs.current.map((el) => el?.offsetWidth || 0);
      setUnderlineTabWidths(widths);
    }, [tabs, shouldShowUnderlineTabs, underlineContainerWidth, currentActiveTab]);

    const underlineOverflowData = useMemo(() => {
      if (
        !shouldShowUnderlineTabs ||
        !tabs.length ||
        !underlineContainerWidth ||
        underlineTabWidths.length === 0 ||
        underlineTabWidths.every((width) => width === 0)
      ) {
        return {
          visible: tabs.map((_, index) => index),
          overflow: [] as number[],
        };
      }

      const TRIGGER_WIDTH = 56;
      let visible: number[] = [];
      let overflow: number[] = [];
      let used = 0;

      const reserveTriggerSpace = (availableWidth: number) => {
        if (overflow.length === 0) return;
        while (visible.length > 0 && used + TRIGGER_WIDTH > availableWidth) {
          const moved = visible.pop();
          if (typeof moved !== 'number') break;
          used -= underlineTabWidths[moved] ?? 0;
          overflow.unshift(moved);
        }
        if (visible.length === 0 && overflow.length > 0) {
          const first = overflow.shift();
          if (typeof first === 'number') {
            visible.push(first);
            used += underlineTabWidths[first] ?? 0;
          }
        }
      };

      tabs.forEach((_, index) => {
        const width = underlineTabWidths[index] ?? 0;
        if (used + width <= underlineContainerWidth) {
          visible.push(index);
          used += width;
        } else {
          overflow.push(index);
        }
      });

      reserveTriggerSpace(underlineContainerWidth);

      if (activeTabIndex >= 0 && overflow.includes(activeTabIndex)) {
        const activeWidth = underlineTabWidths[activeTabIndex] ?? 0;
        overflow = overflow.filter((index) => index !== activeTabIndex);
        while (
          visible.length > 0 &&
          used + activeWidth + (overflow.length > 0 ? TRIGGER_WIDTH : 0) > underlineContainerWidth
        ) {
          const moved = visible.pop();
          if (typeof moved !== 'number') break;
          used -= underlineTabWidths[moved] ?? 0;
          overflow.unshift(moved);
        }
        visible.push(activeTabIndex);
        used += activeWidth;
        reserveTriggerSpace(underlineContainerWidth);
      }

      return {
        visible: Array.from(new Set(visible)).sort((a, b) => a - b),
        overflow: Array.from(new Set(overflow)).sort((a, b) => a - b),
      };
    }, [shouldShowUnderlineTabs, tabs, underlineContainerWidth, underlineTabWidths, activeTabIndex]);

    useEffect(() => {
      if (
        tabsOverflowOpen &&
        underlineOverflowData.overflow.length === 0
      ) {
        setTabsOverflowOpen(false);
      }
    }, [tabsOverflowOpen, underlineOverflowData.overflow.length]);

    const visibleTabIndices = underlineOverflowData.visible;
    const overflowTabIndices = underlineOverflowData.overflow;
    const isActiveInOverflow = overflowTabIndices.includes(activeTabIndex);

    useEffect(() => {
      if (tabsOverflowOpen && overflowTabIndices.length === 0) {
        setTabsOverflowOpen(false);
      }
    }, [tabsOverflowOpen, overflowTabIndices.length]);

    useEffect(() => {
      if (!shouldShowUnderlineTabs && tabsOverflowOpen) {
        setTabsOverflowOpen(false);
      }
    }, [shouldShowUnderlineTabs, tabsOverflowOpen]);

    useEffect(() => {
      if (!tabsOverflowOpen) return;
      const updatePosition = () => {
        const rect = overflowTriggerRef.current?.getBoundingClientRect();
        if (rect) {
          setOverflowMenuPosition({ top: rect.bottom + 8, left: rect.left });
        }
      };
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }, [tabsOverflowOpen]);

    useEffect(() => {
      if (!tabsOverflowOpen) return;
      const handleClick = (event: MouseEvent) => {
        if (
          overflowTriggerRef.current?.contains(event.target as Node) ||
          overflowMenuRef.current?.contains(event.target as Node)
        ) {
          return;
        }
        setTabsOverflowOpen(false);
      };
      const handleKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setTabsOverflowOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('keydown', handleKey);
      return () => {
        document.removeEventListener('mousedown', handleClick);
        document.removeEventListener('keydown', handleKey);
      };
    }, [tabsOverflowOpen]);

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
          (showBackButton || title) && (shouldShowUnderlineTabs || showActions) ? 'justify-between' : '',
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
          {/* Left segmented tabs (separate from main tabs) */}
          {shouldShowLeftSegmentedTabs && (
            <div className="flex gap-[var(--x5,20px)] items-center relative shrink-0">
              <SegmentedTabs
                items={leftTabs.map(tab => ({ label: tab.label, value: tab.key }))}
                value={currentActiveLeftTab}
                onChange={handleSegmentedTabChange}
                variant="default"
              />
            </div>
          )}
          {/* Segmented tabs in left section (when no separate leftTabs) */}
          {shouldShowSegmentedTabsInLeft && (
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
        {shouldShowUnderlineTabs && (
          <div
            className="flex-1 flex h-full items-end justify-center relative"
            ref={(node) => {
              underlineTabsContainerRef.current = node;
            }}
          >
            <div
              className="absolute opacity-0 pointer-events-none -z-10 flex flex-wrap gap-[var(--x2,8px)] top-0 left-0"
              aria-hidden
            >
              {tabs.map((tab, index) => (
                <div
                  key={`measure-${tab.key}`}
                  ref={(node) => {
                    underlineMeasurementRefs.current[index] = node;
                  }}
                  className={getUnderlineTabClassNames(tab, tab.key === currentActiveTab)}
                >
                  {renderUnderlineTabContent(tab, tab.key === currentActiveTab)}
                </div>
              ))}
            </div>
            <div className="flex items-start justify-center gap-0 w-full">
              {tabs.map((tab, index) => {
                if (!visibleTabIndices.includes(index)) {
                  return null;
                }
                const isActive = tab.key === currentActiveTab;
                return (
                  <div
                    key={tab.key}
                    onClick={() => handleTabClick(tab.key)}
                    className={getUnderlineTabClassNames(tab, isActive)}
                  >
                    {renderUnderlineTabContent(tab, isActive)}
                  </div>
                );
              })}
            </div>
            {overflowTabIndices.length > 0 && (
              <Button
                ref={overflowTriggerRef}
                variant="text"
                size="md"
                icon="more"
                iconPosition="only"
                aria-label="More tabs"
                aria-pressed={tabsOverflowOpen}
                className={cn(
                  'absolute right-0 bottom-0',
                  isActiveInOverflow && 'bg-[var(--border-secondary)]'
                )}
                onClick={() => setTabsOverflowOpen((prev) => !prev)}
              />
            )}
          </div>
        )}

        {tabsOverflowOpen && overflowTabIndices.length > 0 && (
          <div
            ref={overflowMenuRef}
            className="fixed z-50 rounded-[var(--x2,8px)] border border-[var(--border-secondary)] bg-[var(--bg-primary)] shadow-lg min-w-[160px] py-[var(--x2,8px)]"
            style={{ top: overflowMenuPosition.top, left: overflowMenuPosition.left }}
          >
            {overflowTabIndices.map((index) => {
              const tab = tabs[index];
              if (!tab) return null;
              return (
                <button
                  key={`page-header-overflow-${tab.key}`}
                  className={cn(
                    'w-full text-left px-[var(--x4,16px)] py-[var(--x2,8px)] text-[var(--primary)] hover:bg-[var(--bg-secondary)] transition-colors',
                    tab.key === currentActiveTab && 'font-semibold'
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    if (!tab.disabled) {
                      handleTabClick(tab.key);
                    }
                    setTabsOverflowOpen(false);
                  }}
                  disabled={tab.disabled}
                >
                  {tab.label}
                </button>
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
