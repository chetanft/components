"use client";
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/utils';
import { getGlassStateLayer, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Icon } from '../../atoms/Icons';
import { TabsProvider, useTabsContext } from './TabsContext';
import { Slot, type ComposableProps } from '../../../lib/slot';

export type TabType = 'primary' | 'secondary' | 'tertiary';
export type TabState = 'unselected' | 'selected' | 'hover';

// Tab Item component using exact Figma specifications
const TabContent = ({
  label,
  icon,
  badge,
  badgeCount,
  notification,
  state,
  type
}: {
  label: string;
  icon?: boolean;
  badge?: boolean;
  badgeCount?: string | number;
  notification?: boolean;
  state: TabState;
  type: TabType;
}) => {
  // Determine gap based on content - x2 for most, x1 when notification is present
  const gapClass = notification ? "gap-[var(--spacing-x1)]" : "gap-[var(--spacing-x2)]";

  // Container alignment - center for selected primary, start for others
  const containerAlignment = state === 'selected' && type === 'primary'
    ? "justify-center"
    : type === 'primary'
      ? "justify-start"
      : "justify-center";

  return (
    <div className={cn(
      "flex items-center",
      gapClass,
      containerAlignment
    )}>
      {icon && (
        <div className="overflow-clip relative shrink-0 size-[var(--spacing-x4)]">
          <Icon
            name="check"
            size={16}
            className="text-[var(--primary)]"
          />
        </div>
      )}
      <p className={cn(
        "leading-[1.4] relative shrink-0 text-[var(--primary)] text-base",
        state === 'selected'
          ? "font-semibold"
          : "font-normal"
      )}>
        {label}
      </p>
      {badge && (
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] border-solid box-border content-stretch flex gap-[var(--spacing-x2)] h-[var(--spacing-x6)] items-center justify-center px-[var(--spacing-x1)] py-0 relative rounded-[var(--radius-sm)] shrink-0">
          <p className="font-semibold leading-[1.4] relative shrink-0 text-[var(--primary)] text-sm">
            {badgeCount}
          </p>
        </div>
      )}
      {notification && (
        <div className="relative shrink-0 size-[0.375rem]">
          <div className="absolute inset-0 bg-[var(--critical)] rounded-full" />
        </div>
      )}
    </div>
  );
};

export interface TabItemProps {
  label: string;
  badge?: boolean;
  badgeCount?: string | number;
  notification?: boolean;
  icon?: boolean;
  active?: boolean;
  type?: TabType;
  onSelect?: () => void;
  className?: string;
  disabled?: boolean;
}

export const TabItem = forwardRef<HTMLDivElement, TabItemProps>(
  ({
    label,
    badge = false,
    badgeCount = "56",
    notification = false,
    icon = false,
    active = false,
    type = 'primary',
    onSelect,
    className,
    disabled,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const tabsContext = useTabsContext();
    const glass = tabsContext.glass;

    // Get current state
    const currentState: TabState = active ? 'selected' : (isHovered ? 'hover' : 'unselected');

    // Base styles matching Figma design exactly using FT design system tokens
    const baseStyles = cn(
      "relative flex flex-col gap-[var(--spacing-x2-5)] items-start transition-all cursor-pointer flex-shrink-0",
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",

      // Padding based on type - using FT design system spacing tokens
      type === 'primary'
        ? "px-[var(--spacing-x8)] py-[var(--spacing-x3)]"
        : "px-[var(--spacing-x4)] py-[var(--spacing-x2)]",

      // Border radius based on type - using FT design system tokens
      type === 'primary' && "rounded-none",
      type === 'secondary' && "rounded-lg",
      type === 'tertiary' && "rounded-full",

      // Border styles based on state and type - using FT design system tokens
      type === 'primary' && [
        "border-l-0 border-r-0 border-t-0 border-solid",
        currentState === 'selected'
          ? "border-b-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[var(--spacing-x1)] after:bg-[var(--primary)]"
          : currentState === 'hover'
            ? "border-b border-b-[var(--tertiary)]"
            : "border-b border-b-[var(--border-primary)]"
      ],

      (type === 'secondary' || type === 'tertiary') && [
        "border border-solid",
        currentState === 'selected'
          ? "border-[var(--tertiary)]"
          : currentState === 'hover'
            ? "border-[var(--primary)]"
            : "border-[var(--tertiary)]"
      ],

      // Background colors based on state and type - glass-aware using FT design system tokens
      currentState === 'selected' && [
        (type === 'secondary' || type === 'tertiary') && getGlassStateLayer(glass, "bg-[var(--border-secondary)]", "bg-[var(--glass-selected)]")
      ],

      currentState === 'hover' && [
        type === 'primary' && getGlassStateLayer(glass, "bg-[var(--border-secondary)]", "bg-[var(--glass-hover)]"),
        (type === 'secondary' || type === 'tertiary') && getGlassStateLayer(glass, "bg-[var(--bg-secondary)]", "bg-[var(--glass-hover)]")
      ],

      currentState === 'unselected' && "bg-transparent",

      className
    );

    return (
      <div
        ref={ref}
        className={baseStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onSelect}
        style={
          currentState === 'selected' && type === 'primary'
            ? {
              '--border-color': 'var(--primary)',
            } as React.CSSProperties
            : undefined
        }
        {...props}
      >
        <TabContent
          label={label}
          icon={icon}
          badge={badge}
          badgeCount={badgeCount}
          notification={notification}
          state={currentState}
          type={type}
        />
      </div>
    );
  }
);

TabItem.displayName = "TabItem";

export interface Tab {
  label: string;
  badge?: boolean;
  badgeCount?: string | number;
  notification?: boolean;
  icon?: boolean;
  disabled?: boolean;
  children?: React.ReactNode; // Content for the tab panel
}

export type TabsOverflowBehavior = 'auto' | 'dropdown';

export interface TabsProps extends Omit<ComposableProps<'div'>, 'onChange'> {
  /** Glassmorphism variant */
  glass?: GlassVariant;
  /**
   * Tabs content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Active tab index
   */
  activeTab?: number;
  /**
   * Callback when tab changes
   */
  onTabChange?: (index: number) => void;
  /**
   * Tab type/style variant
   * @default 'primary'
   */
  type?: TabType;
  /**
   * Overflow behavior
   * @default 'auto'
   */
  overflowBehavior?: TabsOverflowBehavior;
}

/**
 * Tabs Component
 * 
 * A versatile tabs component for organizing content into multiple panels.
 * Uses composable API with sub-components for maximum flexibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Tabs type="primary">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 *
 * @remarks
 * - All sub-components (TabsList, TabsTrigger, TabsContent) support `asChild`
 * - Supports multiple tab types: primary, secondary, tertiary
 * - Accessible: includes ARIA attributes and keyboard navigation
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({
    glass,
    children,
    activeTab = 0,
    onTabChange,
    type = 'primary',
    className,
    overflowBehavior = 'auto',
    asChild,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);

    const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
    const valueToIndexMapRef = useRef<Map<string, number>>(new Map());
    // Reset the map on each render so registrations reflect the latest tree
    valueToIndexMapRef.current = new Map();

    useEffect(() => {
      if (activeTab !== undefined) {
        setInternalActiveTab(activeTab);
      }
    }, [activeTab]);

    const handleTabChange = useCallback((index: number) => {
      setInternalActiveTab(index);
      onTabChange?.(index);
    }, [onTabChange]);

    const registerValue = useCallback((value: string, index: number) => {
      valueToIndexMapRef.current.set(value, index);
    }, []);

    const Comp = asChild ? Slot : 'div';
    return (
      <TabsProvider
        value={{
          activeTab: internalActiveTab,
          onTabChange: handleTabChange,
          type,
          showLine: true,
          valueToIndexMap: valueToIndexMapRef.current,
          registerValue,
          glass: resolvedGlass,
        }}
      >
        <Comp
          ref={ref}
          className={cn("flex flex-col relative", className)}
          {...props}
        >
          {children}
        </Comp>
      </TabsProvider>
    );
  }
);

Tabs.displayName = "Tabs";

export default Tabs;
