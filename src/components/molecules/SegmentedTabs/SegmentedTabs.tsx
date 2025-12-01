"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

export interface SegmentedTabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface SegmentedTabsProps {
  items: SegmentedTabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  variant?: 'default' | 'icon-only';
}

export const SegmentedTabs = ({
  items = [],
  value,
  defaultValue,
  onChange,
  className,
  variant = 'default',
}: SegmentedTabsProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || items[0]?.value || '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleTabChange = (tabValue: string) => {
    if (value === undefined) {
      setInternalValue(tabValue);
    }
    onChange?.(tabValue);
  };

  const containerStyles = cn(
    // Container styles using design tokens
    "flex gap-[var(--x1,4px)] p-[var(--x2,8px)] bg-[var(--bg-secondary)] rounded-[var(--x2,8px)]",
    // Width: full for default, fit for icon-only
    variant === 'icon-only' ? "w-fit" : "w-full",
    className
  );

  return (
    <div className={containerStyles}>
      {items.map((item) => {
        const isSelected = currentValue === item.value;

        const tabStyles = cn(
          // Base styles using design tokens
          "flex items-center justify-center gap-[var(--x2,8px)] py-[var(--x2,8px)] h-[32px] rounded-[var(--x1,4px)] transition-all duration-200 cursor-pointer relative z-10",
          // Flex: flex-1 for default (fill space), auto for icon-only (hug content)
          variant === 'icon-only' ? "flex-none" : "flex-1",
          // Padding based on variant
          variant === 'icon-only' 
            ? "px-[var(--x2,8px)]"
            : "px-[var(--x4,16px)]",
          // Typography - 14px → 1rem (responsive) medium from Figma (only when not icon-only)
          variant === 'default' && "text-sm-rem font-medium leading-[1.4]",
          // State-specific styles using design tokens
          isSelected
            ? [
                // Selected state using design tokens
                "bg-[var(--bg-primary)] text-[color:var(--primary)]",
                "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)]"
              ]
            : [
                // Unselected state using design tokens  
                "bg-[var(--bg-secondary)] text-[color:var(--secondary)]",
                "hover:bg-[var(--color-divider)]"
              ]
        );

        return (
          <button
            key={item.value}
            className={tabStyles}
            onClick={(e) => {
              e.stopPropagation();
              handleTabChange(item.value);
            }}
            type="button"
            aria-label={variant === 'icon-only' ? item.label : undefined}
            style={{ pointerEvents: 'auto' }}
          >
            {item.icon && (
              <span className="flex items-center justify-center shrink-0 w-[24px] h-[24px]">
                <span className="w-[16px] h-[16px]">
                  {item.icon}
                </span>
              </span>
            )}
            {variant === 'default' && <span>{item.label}</span>}
          </button>
        );
      })}
    </div>
  );
};

SegmentedTabs.displayName = 'SegmentedTabs'; 