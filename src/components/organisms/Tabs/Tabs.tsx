"use client";
import React, { forwardRef, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Badge } from '../../atoms/Badge/Badge';
import { Icon } from '../../atoms/Icons';

export type TabType = 'primary' | 'secondary' | 'tertiary' | 'card'; // Added 'card'
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
          state === 'selected' ? 'text-[var(--primary)]' : 'text-[var(--primary)]'
        )}
      />
    )}
    <span className={cn(
      "text-base leading-[22.4px]",
      state === 'selected' ? 'font-semibold text-[var(--primary)]' : 'font-normal text-[var(--primary)]'
    )}>
      {label}
    </span>
    {badge && (
      <Badge variant="normal" className="!text-[var(--secondary)] !bg-white border border-[var(--border-primary)] !text-sm !font-medium !px-1 !py-0.5 !h-6">
        {badgeCount}
      </Badge>
    )}
    {notification && (
      <div className="w-1.5 h-1.5 bg-[var(--critical)] rounded-full" />
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
  disabled?: boolean;
  closable?: boolean;
  onClose?: (e: React.MouseEvent) => void;
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
    closable,
    onClose,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Get current state
    const currentState: TabState = active ? 'selected' : (isHovered ? 'hover' : 'unselected');
    
    // Base styles
    const baseStyles = cn(
      "relative flex transition-all cursor-pointer items-center",
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      // Padding based on type
      type === 'primary' 
        ? "px-8 py-3" 
        : type === 'card' 
            ? "px-4 py-2" // Card padding
            : "px-4 py-2", 
      
      // Border radius based on type
      type === 'primary' && "rounded-none", 
      type === 'secondary' && "rounded-lg",
      type === 'tertiary' && "rounded-full",
      type === 'card' && "rounded-t-lg border-b-0", // Card shape
      
      // Border styles based on state and type
      type === 'primary' && [
        "border-b",
        currentState === 'selected' 
          ? "border-b-4 border-[var(--primary)]" 
          : currentState === 'hover'
          ? "border-b border-[var(--tertiary)]"
          : "border-b border-[var(--border-primary)]"
      ],
      
      (type === 'secondary' || type === 'tertiary') && [
        "border",
        currentState === 'selected'
          ? "border-[var(--tertiary)]"
          : currentState === 'hover'
          ? "border-[var(--primary)]"
          : "border-[var(--tertiary)]"
      ],
      
      // Card specific borders
      type === 'card' && [
          "border border-[var(--border-primary)] mr-[-1px]",
          currentState === 'selected' 
              ? "bg-white border-b-white z-10" 
              : "bg-[var(--background-secondary)] border-b-[var(--border-primary)]"
      ],

      // Background colors based on state and type
      currentState === 'selected' && [
        (type === 'secondary' || type === 'tertiary') && "bg-[var(--border-secondary)]"
      ],
      
      currentState === 'hover' && [
        type === 'primary' && "bg-[var(--border-secondary)]",
        (type === 'secondary' || type === 'tertiary') && "bg-[var(--bg-secondary)]"
      ],
      
      currentState === 'unselected' && type !== 'card' && "bg-transparent",
      
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
        {type === 'card' && closable && (
            <div 
                className="ml-2 p-1 hover:bg-[var(--background-neutral)] rounded-full"
                onClick={(e) => { e.stopPropagation(); onClose?.(e); }}
            >
                <Icon name="x" size={12} />
            </div>
        )}
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
  closable?: boolean;
  children?: React.ReactNode; // Content for the tab panel
}

export interface TabsProps {
  tabs: Tab[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  type?: TabType;
  showLine?: boolean;
  className?: string;
  onEdit?: (targetKey: any, action: 'add' | 'remove') => void;
  hideAdd?: boolean;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ 
    showLine = true, 
    tabs, 
    activeTab = 0, 
    onTabChange, 
    type = 'primary',
    className, 
    onEdit,
    hideAdd,
    ...props 
  }, ref) => {
    const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
    
    const handleTabSelect = (index: number) => {
      setInternalActiveTab(index);
      onTabChange?.(index);
    };
    
    // Container styles
    const containerStyles = cn(
      "flex",
      // Only show underline for primary type when showLine is true
      showLine && type === 'primary' && "border-b border-[var(--border-primary)]",
      // Spacing between tabs for secondary and tertiary
      (type === 'secondary' || type === 'tertiary') && "gap-2",
      type === 'card' && "border-b border-[var(--border-primary)] bg-[var(--background-secondary)] pt-2 px-2 gap-1 rounded-t-lg",
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
                closable={type === 'card' && tab.closable}
                onClose={() => onEdit?.(index, 'remove')}
              />
            ))}
            {type === 'card' && !hideAdd && onEdit && (
                <div 
                    className="flex items-center justify-center w-8 h-8 rounded hover:bg-[var(--background-neutral)] cursor-pointer ml-1 self-center"
                    onClick={() => onEdit(null, 'add')}
                >
                    <Icon name="plus" size={16} />
                </div>
            )}
          </div>
          <div className="p-4 bg-white border-l border-r border-b border-[var(--border-primary)] rounded-b-lg">
              {tabs[internalActiveTab]?.children}
          </div>
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export default Tabs;
