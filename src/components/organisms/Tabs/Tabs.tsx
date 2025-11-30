"use client";
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Button } from '../../atoms/Button/Button';

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
      containerAlignment
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
      "relative flex flex-col gap-[10px] items-start transition-all cursor-pointer flex-shrink-0",
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
        "border-l-0 border-r-0 border-t-0 border-solid",
        currentState === 'selected' 
          ? "border-b-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[var(--x1,4px)] after:bg-[var(--primary)]" 
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

export interface TabsProps {
  tabs: Tab[];
  activeTab?: number;
  onTabChange?: (index: number) => void;
  type?: TabType;
  showLine?: boolean;
  className?: string;
  overflowBehavior?: TabsOverflowBehavior;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({
    showLine = true,
    tabs,
    activeTab = 0,
    onTabChange,
    type = 'primary',
    className,
    overflowBehavior = 'auto',
    ...props
  }, ref) => {
    const [internalActiveTab, setInternalActiveTab] = useState(activeTab);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownTriggerRef = useRef<HTMLButtonElement | null>(null);
    const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
      if (activeTab !== undefined) {
        setInternalActiveTab(activeTab);
      }
    }, [activeTab]);

    const handleTabSelect = useCallback((index: number) => {
      setInternalActiveTab(index);
      onTabChange?.(index);
    }, [onTabChange]);

    const scrollToTab = useCallback((index: number) => {
      const node = tabRefs.current[index];
      if (!node) return;
      try {
        node.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } catch {
        const container = scrollContainerRef.current;
        if (!container) return;
        const offset = node.offsetLeft - container.clientWidth / 2 + node.clientWidth / 2;
        container.scrollTo({ left: offset, behavior: 'smooth' });
      }
    }, []);

    const handleDropdownSelect = (index: number) => {
      const tab = tabs[index];
      if (!tab || tab.disabled) return;
      handleTabSelect(index);
      scrollToTab(index);
      setDropdownOpen(false);
    };

    useEffect(() => {
      if (!dropdownOpen) return;
      const updatePosition = () => {
        const rect = dropdownTriggerRef.current?.getBoundingClientRect();
        if (rect) {
          setMenuPosition({ top: rect.bottom + 8, left: rect.left });
        }
      };
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }, [dropdownOpen]);

    useEffect(() => {
      if (!dropdownOpen) return;
      const handleClick = (event: MouseEvent) => {
        if (
          dropdownTriggerRef.current?.contains(event.target as Node) ||
          dropdownMenuRef.current?.contains(event.target as Node)
        ) {
          return;
        }
        setDropdownOpen(false);
      };
      const handleKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setDropdownOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('keydown', handleKey);
      return () => {
        document.removeEventListener('mousedown', handleClick);
        document.removeEventListener('keydown', handleKey);
      };
    }, [dropdownOpen]);

    const scrollContainerClasses = cn(
      "flex items-start relative w-full overflow-x-auto min-w-0",
      (type === 'secondary' || type === 'tertiary') && "gap-[var(--x2,8px)]",
      className
    );

    return (
      <div className="flex flex-col relative">
        <div className="flex items-start gap-[var(--x3,12px)] w-full">
          <div className="flex-1 min-w-0">
            <div
              ref={(node) => {
                scrollContainerRef.current = node;
                if (typeof ref === 'function') {
                  ref(node);
                } else if (ref) {
                  ref.current = node;
                }
              }}
              className={scrollContainerClasses}
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
                  disabled={tab.disabled}
                  onSelect={() => {
                    if (!tab.disabled) {
                      handleTabSelect(index);
                      scrollToTab(index);
                    }
                  }}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                />
              ))}
            </div>
            {showLine && type === 'primary' && (
              <div className="border-[var(--border-primary)] border-b border-l-0 border-r-0 border-solid border-t-0 flex-[1_0_0] min-h-px min-w-px self-stretch shrink-0" />
            )}
          </div>
          {overflowBehavior === 'dropdown' && (
            <Button
              ref={dropdownTriggerRef}
              variant="text"
              size="md"
              icon="more"
              iconPosition="only"
              aria-label="More tabs"
              aria-pressed={dropdownOpen}
              className={cn(
                "shrink-0",
                type === 'primary' 
                  ? "h-[calc(var(--x3,12px)*2+1.4*1rem)] w-[calc(var(--x3,12px)*2+1.4*1rem)]"
                  : "h-[calc(var(--x2,8px)*2+1.4*1rem)] w-[calc(var(--x2,8px)*2+1.4*1rem)]"
              )}
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
          )}
        </div>
        {overflowBehavior === 'dropdown' && dropdownOpen && (
          <div
            ref={dropdownMenuRef}
            className="fixed z-50 rounded-[var(--x2,8px)] border border-[var(--border-secondary)] bg-[var(--bg-primary)] shadow-lg min-w-[200px] py-[var(--x2,8px)]"
            style={{ top: menuPosition.top, left: menuPosition.left }}
          >
            {tabs.map((tab, index) => (
              <button
                key={`all-tabs-${index}`}
                className={cn(
                  "w-full text-left px-[var(--x4,16px)] py-[var(--x2,8px)] text-[var(--primary)] hover:bg-[var(--bg-secondary)] transition-colors",
                  index === internalActiveTab && "font-semibold",
                  tab.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleDropdownSelect(index);
                }}
                disabled={tab.disabled}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export default Tabs;
