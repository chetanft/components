"use client";
import React, { forwardRef, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Badge } from '../../atoms/Badge/Badge';
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
}) => (
  <div className={cn(
    "flex items-center gap-2",
    // Layout based on type
    type === 'primary' ? "justify-start" : "justify-center"
  )}>
    {icon && (
      <Icon 
        name="check" 
        size={16} 
        className={cn(
          state === 'selected' ? 'text-[#434F64]' : 'text-[#434F64]'
        )}
      />
    )}
    <span className={cn(
      "text-base leading-[22.4px]",
      state === 'selected' ? 'font-semibold text-[#434F64]' : 'font-normal text-[#434F64]'
    )}>
      {label}
    </span>
    {badge && (
      <Badge variant="normal" className="!text-[#5F697B] !bg-white border border-[#CED1D7] !text-sm !font-medium !px-1 !py-0.5 !h-6">
        {badgeCount}
      </Badge>
    )}
    {notification && (
      <div className="w-1.5 h-1.5 bg-[#FF3533] rounded-full" />
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
  type?: TabType;
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
    type = 'primary',
    onSelect,
    className, 
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Get current state
    const currentState: TabState = active ? 'selected' : (isHovered ? 'hover' : 'unselected');
    
    // Base styles using exact Figma specifications
    const baseStyles = cn(
      "relative flex transition-all cursor-pointer",
      // Padding based on type - exact from Figma
      type === 'primary' 
        ? "px-8 py-3" // 32px horizontal, 12px vertical
        : "px-4 py-2", // 16px horizontal, 8px vertical
      
      // Border radius based on type - exact from Figma
      type === 'primary' && "rounded-none", // No border radius
      type === 'secondary' && "rounded-lg", // 8px border radius
      type === 'tertiary' && "rounded-pill", // Proper pill shape instead of rounded-full
      
      // Border styles based on state and type
      type === 'primary' && [
        "border-b",
        currentState === 'selected' 
          ? "border-b-4 border-[#434F64]" 
          : currentState === 'hover'
          ? "border-b border-[#838C9D]"
          : "border-b border-[#CED1D7]"
      ],
      
      (type === 'secondary' || type === 'tertiary') && [
        "border",
        currentState === 'selected' || currentState === 'hover'
          ? "border-[#838C9D]"
          : "border-[#838C9D]"
      ],
      
      // Background colors based on state and type
      currentState === 'selected' && [
        type === 'primary' && "bg-transparent",
        (type === 'secondary' || type === 'tertiary') && "bg-[#F0F1F7]"
      ],
      
      currentState === 'hover' && [
        type === 'primary' && "bg-[#F0F1F7]",
        (type === 'secondary' || type === 'tertiary') && "bg-[#F8F8F9]"
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
    
    // Container styles using exact Figma specifications
    const containerStyles = cn(
      "flex",
      // Only show underline for primary type when showLine is true
      showLine && type === 'primary' && "border-b border-[#CED1D7]",
      // Spacing between tabs for secondary and tertiary
      (type === 'secondary' || type === 'tertiary') && "gap-2",
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
            type={type}
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