"use client";
import React, { forwardRef, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

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
  // Determine gap based on content - 8px for most, 4px when notification is present
  const gapClass = notification ? "gap-[var(--x1,4px)]" : "gap-[var(--x2,8px)]";
  
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
      containerAlignment,
      "w-full"
    )}>
      {icon && (
        <div className="overflow-clip relative shrink-0 size-[16px]">
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
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] border-solid box-border content-stretch flex gap-[var(--x2,8px)] h-[24px] items-center justify-center px-[var(--x1,4px)] py-[var(--x0,0px)] relative rounded-[var(--x1,4px)] shrink-0">
          <p className="font-semibold leading-[1.4] relative shrink-0 text-[var(--primary)] text-sm">
            {badgeCount}
          </p>
        </div>
      )}
      {notification && (
        <div className="relative shrink-0 size-[6px]">
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
    
    // Get current state
    const currentState: TabState = active ? 'selected' : (isHovered ? 'hover' : 'unselected');
    
    // Base styles matching Figma design exactly using FT design system tokens
    const baseStyles = cn(
      "relative flex flex-col gap-[10px] items-start transition-all cursor-pointer",
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      
      // Padding based on type - using FT design system spacing tokens
      type === 'primary' 
        ? "px-[var(--x8,32px)] py-[var(--x3,12px)]" 
        : "px-[var(--x4,16px)] py-[var(--x2,8px)]",
      
      // Border radius based on type - using FT design system tokens
      type === 'primary' && "rounded-none", 
      type === 'secondary' && "rounded-[var(--x2,8px)]",
      type === 'tertiary' && "rounded-[100px]",
      
      // Border styles based on state and type - using FT design system tokens
      type === 'primary' && [
        "border-b border-l-0 border-r-0 border-t-0 border-solid",
        currentState === 'selected' 
          ? "border-b-4 border-[var(--primary)]" 
          : currentState === 'hover'
          ? "border-b border-[var(--tertiary)]"
          : "border-b border-[var(--border-primary)]"
      ],
      
      (type === 'secondary' || type === 'tertiary') && [
        "border border-solid",
        currentState === 'selected'
          ? "border-[var(--tertiary)]"
          : currentState === 'hover'
          ? "border-[var(--primary)]"
          : "border-[var(--tertiary)]"
      ],

      // Background colors based on state and type - using FT design system tokens
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
    
    return (
      <div
        ref={ref}
        className={baseStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onSelect}
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

export interface TabsProps {
  tabs: Tab[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  type?: TabType;
  showLine?: boolean;
  className?: string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ 
    showLine = true, 
    tabs, 
    activeTab = 0, 
    onTabChange, 
    type = 'primary',
    className, 
    ...props 
  }, ref) => {
    const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
    
    const handleTabSelect = (index: number) => {
      setInternalActiveTab(index);
      onTabChange?.(index);
    };
    
    // Container styles matching Figma design using FT design system tokens
    const containerStyles = cn(
      "flex items-start relative w-full",
      // Spacing between tabs for secondary and tertiary - using FT design system tokens
      (type === 'secondary' || type === 'tertiary') && "gap-[var(--x2,8px)]",
      className
    );
    
    return (
      <div className="flex flex-col w-full">
          <div
            ref={ref}
            className={containerStyles}
            {...props}
          >
            {tabs.map((tab, index) => (
              <TabItem
                key={index}
                label={tab.label}
                badge={tab.badge}
                badgeCount={tab.badgeCount}
                notification={tab.notification}
                icon={tab.icon}
                type={type}
                active={index === internalActiveTab}
                onSelect={() => !tab.disabled && handleTabSelect(index)}
                disabled={tab.disabled}
              />
            ))}
            {showLine && type === 'primary' && (
              <div className="border-[var(--border-primary)] border-b border-l-0 border-r-0 border-solid border-t-0 flex-[1_0_0] min-h-px min-w-px self-stretch shrink-0" />
            )}
          </div>
          {tabs[internalActiveTab]?.children && (
            <div className="p-[var(--x4,16px)] bg-[var(--bg-primary)] border-l border-r border-b border-[var(--border-primary)] rounded-b-lg">
              {tabs[internalActiveTab]?.children}
            </div>
          )}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export default Tabs;
