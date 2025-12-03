"use client";

import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useTabsContext } from './TabsContext';
import { Icon } from '../../atoms/Icons';

export interface TabsTriggerProps extends ComposableProps<'button'> {
  /**
   * The value of this tab (used to match with TabsContent)
   */
  value: string;
  /**
   * Whether this tab is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon to display in the tab
   */
  icon?: boolean | React.ReactNode;
  /**
   * Badge to display in the tab
   */
  badge?: boolean;
  /**
   * Badge count value
   */
  badgeCount?: string | number;
  /**
   * Notification dot indicator
   */
  notification?: boolean;
  /**
   * The label text for the tab
   */
  children: React.ReactNode;
}

/**
 * TabsTrigger Component
 *
 * A composable component for individual tab triggers.
 * Automatically handles selection state based on Tabs context.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Tabs>
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2" badge badgeCount={5}>Tab 2</TabsTrigger>
 *   </TabsList>
 * </Tabs>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<button>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically applies selection state styling based on context.
 * - Accessible: includes ARIA attributes and keyboard navigation.
 */
export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({
    className,
    value,
    disabled = false,
    icon,
    badge,
    badgeCount,
    notification,
    children,
    asChild,
    onClick,
    ...props
  }, ref) => {
    const { activeTab, onTabChange, type, showLine } = useTabsContext();
    const [isHovered, setIsHovered] = useState(false);
    
    // Find index by value (simplified - in real implementation, would track value-to-index mapping)
    const tabIndex = 0; // This would need to be calculated based on value
    const isSelected = activeTab === tabIndex;
    const currentState: 'unselected' | 'selected' | 'hover' = isSelected ? 'selected' : (isHovered ? 'hover' : 'unselected');
    
    const gapClass = notification ? "gap-[var(--spacing-x1)]" : "gap-[var(--spacing-x2)]";
    const containerAlignment = currentState === 'selected' && type === 'primary'
      ? "justify-center"
      : type === 'primary'
        ? "justify-start"
        : "justify-center";

    const baseStyles = cn(
      "relative flex flex-col gap-[10px] items-start transition-all cursor-pointer flex-shrink-0",
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      type === 'primary'
        ? "px-[var(--spacing-x8)] py-[var(--spacing-x3)]"
        : "px-[var(--spacing-x4)] py-[var(--spacing-x2)]",
      type === 'primary' && "rounded-none",
      type === 'secondary' && "rounded-lg",
      type === 'tertiary' && "rounded-[100px]",
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
      currentState === 'selected' && [
        (type === 'secondary' || type === 'tertiary') && "bg-[var(--border-secondary)]"
      ],
      currentState === 'hover' && [
        type === 'primary' && "bg-[var(--border-secondary)]",
        (type === 'secondary' || type === 'tertiary') && "bg-[var(--bg-secondary)]"
      ],
      currentState === 'unselected' && "bg-transparent",
      className
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onTabChange(tabIndex);
        onClick?.(e);
      }
    };

    if (asChild) {
      // Filter out disabled prop when using asChild (Slot doesn't accept it)
      const { disabled: _, ...slotProps } = props as any;
      // Cast icon and children to exclude bigint which Slot doesn't accept
      const safeIcon = icon as Exclude<React.ReactNode, bigint> | undefined;
      const safeChildren = children as Exclude<React.ReactNode, bigint> | undefined;
      
      return (
        <Slot
          ref={ref}
          role="tab"
          aria-selected={isSelected}
          aria-controls={`tabpanel-${value}`}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={baseStyles}
          {...slotProps}
        >
          <div className={cn("flex items-center", gapClass, containerAlignment)}>
            {safeIcon && (
              <div className="overflow-clip relative shrink-0 size-[var(--spacing-x4)]">
                {typeof safeIcon === 'boolean' ? (
                  <Icon name="check" size={16} className="text-[var(--primary)]" />
                ) : (
                  safeIcon
                )}
              </div>
            )}
            <span className={cn(
              "leading-[1.4] relative shrink-0 text-[var(--primary)] text-base",
              currentState === 'selected' ? "font-semibold" : "font-normal"
            )}>
              {safeChildren}
            </span>
            {badge && (
              <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] border-solid box-border content-stretch flex gap-[var(--spacing-x2)] h-[24px] items-center justify-center px-[var(--spacing-x1)] py-0 relative rounded-[var(--radius-sm)] shrink-0">
                <span className="font-semibold leading-[1.4] relative shrink-0 text-[var(--primary)] text-sm">
                  {badgeCount}
                </span>
              </div>
            )}
            {notification && (
              <div className="relative shrink-0 size-[6px]">
                <div className="absolute inset-0 bg-[var(--critical)] rounded-full" />
              </div>
            )}
          </div>
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`tabpanel-${value}`}
        disabled={disabled}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={baseStyles}
        {...props}
      >
        <div className={cn("flex items-center", gapClass, containerAlignment)}>
          {icon && (
            <div className="overflow-clip relative shrink-0 size-[var(--spacing-x4)]">
              {typeof icon === 'boolean' ? (
                <Icon name="check" size={16} className="text-[var(--primary)]" />
              ) : (
                icon
              )}
            </div>
          )}
          <span className={cn(
            "leading-[1.4] relative shrink-0 text-[var(--primary)] text-base",
            currentState === 'selected' ? "font-semibold" : "font-normal"
          )}>
            {children}
          </span>
          {badge && (
            <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] border-solid box-border content-stretch flex gap-[var(--spacing-x2)] h-[24px] items-center justify-center px-[var(--spacing-x1)] py-0 relative rounded-[var(--radius-sm)] shrink-0">
              <span className="font-semibold leading-[1.4] relative shrink-0 text-[var(--primary)] text-sm">
                {badgeCount}
              </span>
            </div>
          )}
          {notification && (
            <div className="relative shrink-0 size-[6px]">
              <div className="absolute inset-0 bg-[var(--critical)] rounded-full" />
            </div>
          )}
        </div>
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

