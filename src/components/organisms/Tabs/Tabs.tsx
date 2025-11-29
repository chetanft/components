"use client";
import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
    const containerRef = useRef<HTMLDivElement | null>(null);
    const measurementRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [containerWidth, setContainerWidth] = useState<number | null>(null);
    const [tabWidths, setTabWidths] = useState<number[]>([]);
    const [overflowOpen, setOverflowOpen] = useState(false);
    const overflowTriggerRef = useRef<HTMLButtonElement | null>(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    // Sync internal state with prop when it changes from parent
    useEffect(() => {
      if (activeTab !== undefined) {
        setInternalActiveTab(activeTab);
      }
    }, [activeTab]);

    const handleTabSelect = useCallback((index: number) => {
      // Update internal state immediately
      setInternalActiveTab(index);
      // Notify parent synchronously
      onTabChange?.(index);
    }, [onTabChange]);

    useEffect(() => {
      if (overflowBehavior !== 'dropdown') return;
      const node = containerRef.current;
      if (!node || typeof ResizeObserver === 'undefined') return;
      const observer = new ResizeObserver(entries => {
        const entry = entries[0];
        if (entry?.contentRect?.width) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      observer.observe(node);
      return () => observer.disconnect();
    }, [overflowBehavior]);

    useLayoutEffect(() => {
      if (overflowBehavior !== 'dropdown') return;
      const widths = measurementRefs.current.map(el => el?.offsetWidth || 0);
      setTabWidths(widths);
    }, [tabs, type, overflowBehavior, internalActiveTab, containerWidth]);

    const overflowData = useMemo(() => {
      if (
        overflowBehavior !== 'dropdown' ||
        !containerWidth ||
        tabWidths.length === 0 ||
        tabWidths.every(width => width === 0)
      ) {
        return {
          visible: tabs.map((_, index) => index),
          overflow: [] as number[],
        };
      }

      const OVERFLOW_TRIGGER_WIDTH = 56;
      let visible: number[] = [];
      let overflow: number[] = [];
      let used = 0;

      tabs.forEach((_, index) => {
        const width = tabWidths[index] ?? 0;
        if (used + width <= containerWidth) {
          visible.push(index);
          used += width;
        } else {
          overflow.push(index);
        }
      });

      const ensureTriggerSpace = () => {
        if (overflow.length === 0) return;
        while (visible.length > 0 && used + OVERFLOW_TRIGGER_WIDTH > containerWidth) {
          const moved = visible.pop();
          if (typeof moved !== 'number') break;
          used -= tabWidths[moved] ?? 0;
          overflow.unshift(moved);
        }
        if (visible.length === 0 && overflow.length > 0) {
          const first = overflow.shift();
          if (typeof first === 'number') {
            visible.push(first);
            used += tabWidths[first] ?? 0;
          }
        }
      };

      ensureTriggerSpace();

      if (overflow.includes(internalActiveTab)) {
        const activeWidth = tabWidths[internalActiveTab] ?? 0;
        overflow = overflow.filter((index) => index !== internalActiveTab);
        while (
          visible.length > 0 &&
          used + activeWidth + (overflow.length > 0 ? OVERFLOW_TRIGGER_WIDTH : 0) > containerWidth
        ) {
          const moved = visible.pop();
          if (typeof moved !== 'number') break;
          used -= tabWidths[moved] ?? 0;
          overflow.unshift(moved);
        }
        visible.push(internalActiveTab);
        used += activeWidth;
        ensureTriggerSpace();
      }

      return { visible, overflow };
    }, [overflowBehavior, containerWidth, tabWidths, tabs, internalActiveTab]);

    useEffect(() => {
      if (!overflowOpen) return;
      const updatePosition = () => {
        const rect = overflowTriggerRef.current?.getBoundingClientRect();
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
    }, [overflowOpen]);

    useEffect(() => {
      if (!overflowOpen) return;
      const handleClick = (event: MouseEvent) => {
        if (
          overflowTriggerRef.current &&
          !overflowTriggerRef.current.contains(event.target as Node)
        ) {
          setOverflowOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClick);
      const handleKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setOverflowOpen(false);
        }
      };
      document.addEventListener('keydown', handleKey);
      return () => {
        document.removeEventListener('mousedown', handleClick);
        document.removeEventListener('keydown', handleKey);
      };
    }, [overflowOpen]);

    const containerStyles = cn(
      "flex items-start relative",
      (type === 'secondary' || type === 'tertiary') && "gap-[var(--x2,8px)]",
      className
    );

    const visibleIndices = overflowData.visible;
    const overflowIndices = overflowData.overflow;
    const activeInOverflow = overflowIndices.includes(internalActiveTab);

    return (
      <div className="flex flex-col relative">
        <div
          className="absolute opacity-0 pointer-events-none -z-10 flex flex-wrap gap-2 top-0 left-0"
          aria-hidden
        >
          {tabs.map((tab, index) => (
            <TabItem
              key={`measure-${index}`}
              label={tab.label}
              badge={tab.badge}
              badgeCount={tab.badgeCount}
              notification={tab.notification}
              icon={tab.icon}
              type={type}
              active={index === internalActiveTab}
              disabled={tab.disabled}
              ref={(node) => {
                measurementRefs.current[index] = node;
              }}
            />
          ))}
        </div>
        <div
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            containerRef.current = node;
          }}
          className={containerStyles}
          {...props}
        >
          {tabs.map((tab, index) => {
            if (!visibleIndices.includes(index)) {
              return null;
            }
            return (
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
            );
          })}
          {overflowBehavior === 'dropdown' && overflowIndices.length > 0 && (
            <div className="flex items-center">
              <Button
                ref={overflowTriggerRef}
                variant="text"
                size="lg"
                icon="more"
                iconPosition="only"
                aria-label="More tabs"
                className={cn(
                  activeInOverflow ? "bg-[var(--border-secondary)]" : "",
                  "shadow-[inset_4px_0_4px_-2px_rgba(0,0,0,0.1)]"
                )}
                onClick={() => setOverflowOpen((prev) => !prev)}
              />
            </div>
          )}
          {showLine && type === 'primary' && (
            <div className="border-[var(--border-primary)] border-b border-l-0 border-r-0 border-solid border-t-0 flex-[1_0_0] min-h-px min-w-px self-stretch shrink-0" />
          )}
        </div>
        {overflowBehavior === 'dropdown' && overflowOpen && (
          <div
            className="fixed z-50 rounded-[var(--x2,8px)] border border-[var(--border-secondary)] bg-[var(--bg-primary)] shadow-lg min-w-[160px] py-[var(--x2,8px)]"
            style={{ top: menuPosition.top, left: menuPosition.left }}
          >
            {overflowIndices.map((index) => (
              <button
                key={`overflow-${index}`}
                className={cn(
                  "w-full text-left px-[var(--x4,16px)] py-[var(--x2,8px)] text-[var(--primary)] hover:bg-[var(--bg-secondary)] transition-colors",
                  index === internalActiveTab && "font-semibold"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Update tab selection immediately
                  handleTabSelect(index);
                  // Close dropdown after state update
                  setTimeout(() => {
                    setOverflowOpen(false);
                  }, 0);
                }}
              >
                {tabs[index].label}
              </button>
            ))}
          </div>
        )}
        {tabs[internalActiveTab] && tabs[internalActiveTab].children !== undefined && (
          <div 
            key={`tab-content-${internalActiveTab}`}
            className="p-[var(--x4,16px)] bg-[var(--bg-primary)] border-l border-r border-b border-[var(--border-primary)] rounded-b-lg"
          >
            {tabs[internalActiveTab].children}
          </div>
        )}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export default Tabs;
