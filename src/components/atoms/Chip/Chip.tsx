"use client";
import React, { forwardRef, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon, type IconName } from '../../atoms/Icons';
import { getGlassStateLayer, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

export type ChipVariant = 'filled' | 'outlined';
export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps {
  /** Text label */
  label: string;
  /** Whether the chip is selected */
  selected?: boolean;
  /** Visual variant */
  variant?: ChipVariant;
  /** Size */
  size?: ChipSize;
  /** Leading icon name */
  icon?: IconName;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Callback when clicked */
  onClick?: () => void;
  /** Callback when close/remove is clicked */
  onRemove?: (e: React.MouseEvent) => void;
  /** Glass morphism variant */
  glass?: GlassVariant;
  /** Value identifier (used by ChipGroup for selection) */
  value?: string;
  /** Additional CSS classes */
  className?: string;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({
    label,
    selected = false,
    variant = 'outlined',
    size = 'md',
    icon,
    disabled = false,
    onClick,
    onRemove,
    glass,
    className,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const resolvedGlass = useResolvedGlass(glass);

    const sizeStyles = {
      sm: "px-[var(--spacing-x2)] py-[var(--spacing-x0-5)] text-xs-rem gap-[var(--spacing-x1)]",
      md: "px-[var(--spacing-x3)] py-[var(--spacing-x1-5)] text-sm-rem gap-[var(--spacing-x1-5)]",
      lg: "px-[var(--spacing-x4)] py-[var(--spacing-x2)] text-base gap-[var(--spacing-x2)]",
    };

    const iconSize = { sm: 12, md: 14, lg: 16 }[size];

    const baseStyles = cn(
      "inline-flex items-center justify-center rounded-full font-medium",
      "border border-solid transition-all duration-150 cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-1",
      sizeStyles[size],
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",

      // Selected state
      selected && variant === 'outlined' && [
        "bg-[var(--bg-inverse)] text-[var(--text-inverse)] border-[var(--bg-inverse)]",
        isHovered && "opacity-90",
      ],
      selected && variant === 'filled' && [
        "bg-[var(--primary-700)] text-white border-[var(--primary-700)]",
        isHovered && "bg-[var(--primary-800)]",
      ],

      // Unselected state
      !selected && variant === 'outlined' && [
        "bg-transparent border-[var(--border-primary)]",
        "text-[var(--secondary)]",
        isHovered
          ? getGlassStateLayer(resolvedGlass, "bg-[var(--bg-secondary)] text-[var(--primary)]", "bg-[var(--glass-hover)]")
          : "",
      ],
      !selected && variant === 'filled' && [
        "bg-[var(--bg-secondary)] border-transparent",
        "text-[var(--secondary)]",
        isHovered && "bg-[var(--border-secondary)] text-[var(--primary)]",
      ],

      className
    );

    return (
      <button
        ref={ref}
        type="button"
        role="option"
        aria-selected={selected}
        disabled={disabled}
        className={baseStyles}
        onClick={onClick}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
        {...props}
      >
        {icon && (
          <Icon name={icon} size={iconSize} className="shrink-0" />
        )}
        <span>{label}</span>
        {onRemove && (
          <span
            role="button"
            tabIndex={0}
            className="shrink-0 ml-[var(--spacing-x0-5)] hover:opacity-70 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(e);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                onRemove(e as unknown as React.MouseEvent);
              }
            }}
            aria-label={`Remove ${label}`}
          >
            <Icon name="cross" size={iconSize} />
          </span>
        )}
      </button>
    );
  }
);

Chip.displayName = "Chip";

export interface ChipGroupProps {
  /** Currently selected value(s) */
  value: string | string[];
  /** Callback when selection changes */
  onChange: (value: string) => void;
  /** Whether multiple chips can be selected */
  multiple?: boolean;
  /** Chip variant for all children */
  variant?: ChipVariant;
  /** Chip size for all children */
  size?: ChipSize;
  /** Glass morphism variant */
  glass?: GlassVariant;
  /** Whether all chips are disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  children: React.ReactNode;
}

export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  ({
    value,
    onChange,
    multiple = false,
    variant = 'outlined',
    size = 'md',
    glass,
    disabled = false,
    className,
    children,
    ...props
  }, ref) => {
    const selectedSet = new Set(Array.isArray(value) ? value : [value]);

    return (
      <div
        ref={ref}
        role="listbox"
        aria-multiselectable={multiple}
        className={cn("flex flex-wrap gap-[var(--spacing-x2)]", className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<ChipProps>(child)) return child;
          const chipValue = child.props.label;
          // Allow value to be passed via a data attribute or the label
          const val = child.props.value ?? child.props.label;
          return React.cloneElement(child, {
            selected: selectedSet.has(val),
            variant: child.props.variant ?? variant,
            size: child.props.size ?? size,
            glass: child.props.glass ?? glass,
            disabled: child.props.disabled ?? disabled,
            onClick: () => onChange(val),
          });
        })}
      </div>
    );
  }
);

ChipGroup.displayName = "ChipGroup";

export default Chip;
