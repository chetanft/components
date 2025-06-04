import React, { forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../Badge/Badge';
import { Icon } from '../Icons';

// Tab Item component using exact Figma specifications
const TabContent = ({ 
  label, 
  icon, 
  badge, 
  badgeCount, 
  notification, 
  state 
}: {
  label: string;
  icon?: boolean;
  badge?: boolean;
  badgeCount?: string | number;
  notification?: boolean;
  state: 'unselected' | 'selected' | 'hover';
}) => (
  <div className="flex items-center gap-[8px] justify-center">
    {icon && (
      <Icon 
        name="check" 
        size={16} 
        color="var(--tab-unselected-text)" 
      />
    )}
    <span>{label}</span>
    {badge && (
      <Badge variant="normal" className="!text-[#5F697B] !bg-white border border-[#CED1D7]">
        {badgeCount}
      </Badge>
    )}
    {notification && (
      <div className="w-[6px] h-[6px] bg-[var(--tab-notification-dot)] rounded-full" />
    )}
  </div>
);

export interface TabItemProps {
  label: string;
  badge?: boolean;
  badgeCount?: string | number;
  notification?: boolean;
  icon?: boolean;
  active?: boolean;
  onSelect?: () => void;
  className?: string;
}

export const TabItem = forwardRef<HTMLDivElement, TabItemProps>(
  ({ 
    label, 
    badge = false, 
    badgeCount = "56", 
    notification = false, 
    icon = false, 
    active = false,
    onSelect,
    className, 
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Base styles using exact Figma specifications
    const baseStyles = cn(
      // Layout - exact from Figma: 12px top/bottom, 32px left/right
      "relative flex flex-col gap-[10px] px-[32px] py-[12px] transition-all cursor-pointer",
      // Typography - exact from Figma  
      "font-[Inter] text-[var(--tab-font-size)] leading-[1.4]",
      // Border - exact from Figma
      "border-b-[1px]",
      // State-specific styles using exact Figma colors
      active
        ? [
            // Selected state - exact from Figma
            "border-b-[4px] border-[var(--tab-selected-border)] text-[var(--tab-selected-text)] font-[var(--tab-font-weight-selected)]",
            "bg-[var(--tab-selected-bg)]"
          ]
        : isHovered
        ? [
            // Hover state - exact from Figma  
            "border-[var(--tab-hover-border)] text-[var(--tab-hover-text)] font-[var(--tab-font-weight-normal)]",
            "bg-[var(--tab-hover-bg)]"
          ]
        : [
            // Unselected state - exact from Figma
            "border-[var(--tab-unselected-border)] text-[var(--tab-unselected-text)] font-[var(--tab-font-weight-normal)]",
            "bg-[var(--tab-unselected-bg)]"
          ],
      className
    );
    
    const currentState = active ? 'selected' : (isHovered ? 'hover' : 'unselected');
    
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
}

export interface TabsProps {
  tabs: Tab[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  showLine?: boolean;
  className?: string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ showLine = true, tabs, activeTab = 0, onTabChange, className, ...props }, ref) => {
    const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
    
    const handleTabSelect = (index: number) => {
      setInternalActiveTab(index);
      onTabChange?.(index);
    };
    
    // Container styles using exact Figma specifications
    const containerStyles = cn(
      "flex",
      showLine && "border-b border-[var(--tab-unselected-border)]",
      className
    );
    
    return (
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
            active={index === internalActiveTab}
            onSelect={() => handleTabSelect(index)}
          />
        ))}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export default Tabs; 