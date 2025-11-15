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
}

export const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
  items,
  value,
  defaultValue,
  onChange,
  className,
}) => {
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
    "flex gap-[var(--x1,4px)] p-[var(--x2,8px)] bg-[var(--bg_secondary,#f8f8f9)] rounded-[var(--x2,8px)]",
    className
  );

  return (
    <div className={containerStyles}>
      {items.map((item) => {
        const isSelected = currentValue === item.value;

        const tabStyles = cn(
          // Base styles using design tokens
          "flex items-center justify-center gap-[var(--x2,8px)] px-[var(--x4,16px)] py-[var(--x2,8px)] h-[32px] rounded-[var(--x1,4px)] transition-all duration-200 cursor-pointer",
          // Typography - 14px medium from Figma
          "text-[14px] font-medium leading-[1.4]",
          // State-specific styles using design tokens
          isSelected
            ? [
                // Selected state using design tokens
                "bg-[var(--bg_primary,#ffffff)] text-[color:var(--primary,#434f64)]",
                "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)]"
              ]
            : [
                // Unselected state using design tokens  
                "bg-[var(--bg_secondary,#f8f8f9)] text-[color:var(--secondary,#5f697b)]",
                "hover:bg-[var(--color-divider)]"
              ]
        );

        return (
          <button
            key={item.value}
            className={tabStyles}
            onClick={() => handleTabChange(item.value)}
            type="button"
          >
            {item.icon && (
              <span className="flex items-center justify-center shrink-0 w-[24px] h-[24px]">
                <span className="w-[16px] h-[16px]">
                  {item.icon}
                </span>
              </span>
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

SegmentedTabs.displayName = 'SegmentedTabs'; 