"use client";

import React from 'react';
import { cn } from '../../lib/utils';

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
    "flex gap-[var(--spacing-x1)] p-[var(--spacing-x2)] bg-[var(--color-background)] rounded-lg",
    className
  );

  return (
    <div className={containerStyles}>
      {items.map((item) => {
        const isSelected = currentValue === item.value;

        const tabStyles = cn(
          // Base styles using design tokens
          "flex items-center justify-center gap-[var(--spacing-x3)] px-[var(--spacing-x3)] py-[var(--spacing-x2)] h-8 rounded transition-all duration-200 cursor-pointer",
          // Typography using design tokens
          "font-inter font-medium text-[var(--font-size-sm)] leading-[1.4]",
          // Flex sizing
          "flex-1",
          // State-specific styles using design tokens
          isSelected
            ? [
                // Selected state using design tokens
                "bg-white text-[var(--color-dark-100)]",
                "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)]"
              ]
            : [
                // Unselected state using design tokens  
                "bg-[var(--color-background)] text-[var(--color-dark-50)]",
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
              <span className="w-4 h-4">
                {item.icon}
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