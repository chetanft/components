"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface SegmentedTabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface SegmentedTabsProps extends Omit<ComposableProps<'div'>, 'onChange'> {
  /** Glassmorphism variant */
  glass?: GlassVariant;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: 'default' | 'icon-only';
  /**
   * Segmented tabs content (for composable API)
   */
  children?: React.ReactNode;
}

export interface SegmentedTabItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Tab value (required)
   */
  value: string;
  /**
   * Tab label
   */
  label?: string;
  /**
   * Tab icon
   */
  icon?: React.ReactNode;
  /**
   * Whether this tab is selected
   */
  selected?: boolean;
  /**
   * Variant type
   */
  variant?: 'default' | 'icon-only';
}

export const SegmentedTabs = React.forwardRef<HTMLDivElement, SegmentedTabsProps>(
  ({
    glass,
    value,
    defaultValue,
    onChange,
    className,
    variant = 'default',
    children,
    asChild,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const currentValue = value !== undefined ? value : internalValue;

    const handleTabChange = (tabValue: string) => {
      if (value === undefined) {
        setInternalValue(tabValue);
      }
      onChange?.(tabValue);
    };

    const Comp = asChild ? Slot : 'div';
    const containerStyles = cn(
      // Container styles using design tokens
      getGlassClasses(resolvedGlass, 'bg-[var(--bg-secondary)]', ''),
      "flex gap-[var(--x1,4px)] p-[var(--x2,8px)] rounded-[var(--x2,8px)]",
      // Width: full for default, fit for icon-only
      variant === 'icon-only' ? "w-fit" : "w-full",
      className
    );

    return (
      <Comp ref={ref} className={containerStyles} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement<SegmentedTabItemProps>(child) && child.type === SegmentedTabItem) {
            const isSelected = currentValue === child.props.value;
            return React.cloneElement(child, {
              selected: isSelected,
              variant,
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                handleTabChange(child.props.value);
                child.props.onClick?.(e);
              },
            });
          }
          return child;
        })}
      </Comp>
    );
  }
);

SegmentedTabs.displayName = 'SegmentedTabs';

/**
 * SegmentedTabItem Component
 *
 * A composable component for individual tabs in a SegmentedTabs.
 *
 * @public
 *
 * @example
 * ```tsx
 * <SegmentedTabs value={value} onChange={setValue}>
 *   <SegmentedTabItem value="tab1" label="Tab 1" />
 *   <SegmentedTabItem value="tab2" label="Tab 2" icon={<Icon name="settings" />} />
 * </SegmentedTabs>
 * ```
 */
export const SegmentedTabItem = React.forwardRef<HTMLButtonElement, SegmentedTabItemProps>(
  ({ className, label, icon, selected, variant = 'default', ...props }, ref) => {
    const tabStyles = cn(
      // Base styles using design tokens
      "flex items-center justify-center gap-[var(--x2,8px)] py-[var(--x2,8px)] h-[var(--spacing-x8)] rounded-[var(--x1,4px)] transition-all duration-200 cursor-pointer relative z-10",
      // Flex: flex-1 for default (fill space), auto for icon-only (hug content)
      variant === 'icon-only' ? "flex-none" : "flex-1",
      // Padding based on variant
      variant === 'icon-only' 
        ? "px-[var(--x2,8px)]"
        : "px-[var(--x4,16px)]",
      // Typography - 14px → 1rem (responsive) medium from Figma (only when not icon-only)
      variant === 'default' && "text-sm-rem font-medium leading-[1.4]",
      // State-specific styles using design tokens
      selected
        ? [
            // Selected state using design tokens
            "bg-[var(--bg-primary)] text-[color:var(--primary)]",
            "shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)]"
          ]
        : [
            // Unselected state using design tokens  
            "bg-[var(--bg-secondary)] text-[color:var(--secondary)]",
            "hover:bg-[var(--color-divider)]"
          ],
      className
    );

    return (
      <button
        ref={ref}
        className={tabStyles}
        type="button"
        aria-label={variant === 'icon-only' ? label : undefined}
        style={{ pointerEvents: 'auto' }}
        {...props}
      >
        {icon && (
          <span className="flex items-center justify-center shrink-0 w-[var(--spacing-x6)] h-[var(--spacing-x6)]">
            <span className="w-[var(--spacing-x4)] h-[var(--spacing-x4)]">
              {icon}
            </span>
          </span>
        )}
        {variant === 'default' && label && <span>{label}</span>}
      </button>
    );
  }
);

SegmentedTabItem.displayName = 'SegmentedTabItem'; 