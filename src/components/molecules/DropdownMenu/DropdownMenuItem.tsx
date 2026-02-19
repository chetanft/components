"use client";
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { useResolvedGlass, getGlassInnerBg, getGlassStateLayer } from '../../../lib/glass';
import { Icon, type IconName } from '../../atoms/Icons';
import { Checkbox } from '../../atoms/Checkbox';

const dropdownMenuItemVariants = cva(
  'box-border flex items-center relative w-full transition-colors duration-200',
  {
    variants: {
      state: {
        default: 'bg-[var(--color-bg-primary)]',
        selected: 'bg-[var(--color-bg-secondary)]',
        hover: 'bg-[var(--color-border-secondary)] cursor-pointer',
        focused: 'bg-[var(--color-border-primary)] cursor-pointer',
        disabled: 'bg-[var(--color-bg-primary)] cursor-not-allowed opacity-60',
        info: 'bg-[var(--color-bg-primary)] border-[var(--color-border-primary)] border-b-0 border-l-0 border-r-0 border-solid border-t',
      },
      prefix: {
        none: '',
        checkbox: '',
        radio: '',
        icon: '',
      },
      suffix: {
        false: '',
        true: 'justify-between',
      },
    },
    compoundVariants: [
      {
        prefix: 'none',
        suffix: false,
        state: 'selected',
        className: 'p-[var(--spacing-x3)] rounded-[var(--radius-md)]',
      },
      {
        prefix: 'none',
        suffix: false,
        className: 'gap-[calc(var(--spacing-x2)+var(--spacing-x1)/2)] p-[var(--spacing-x3)] rounded-[var(--radius-md)]',
      },
      {
        prefix: 'none',
        suffix: true,
        className: 'justify-between p-[var(--spacing-x3)] rounded-[var(--radius-md)]',
      },
      {
        prefix: 'checkbox',
        className: 'gap-[var(--spacing-x3)] p-[var(--spacing-x3)] rounded-[var(--radius-md)]',
      },
      {
        prefix: 'radio',
        className: 'gap-[var(--spacing-x3)] p-[var(--spacing-x3)] rounded-[var(--radius-md)]',
      },
      {
        prefix: 'icon',
        suffix: false,
        className: 'gap-[calc(var(--spacing-x2)+var(--spacing-x1)/2)] p-[var(--spacing-x3)] rounded-[var(--radius-md)]',
      },
      {
        prefix: 'icon',
        suffix: true,
        className: 'justify-between p-[var(--spacing-x3)] rounded-[var(--radius-md)]',
      },
      {
        state: 'info',
        className: 'pb-[var(--spacing-x3)] pt-[var(--spacing-x4)] px-[var(--spacing-x3)] rounded-bl-[var(--radius-md)] rounded-br-[var(--radius-md)]',
      },
    ],
    defaultVariants: {
      state: 'default',
      prefix: 'none',
      suffix: false,
    },
  }
);

export interface DropdownMenuItemProps
  extends VariantProps<typeof dropdownMenuItemVariants> {
  children?: React.ReactNode;
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  iconName?: IconName;
  icon?: React.ReactNode;
  showCheckmark?: boolean;
  value?: string | number;
}

export const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(
  (
    {
      state = 'default',
      prefix = 'none',
      suffix = false,
      children,
      label = 'Dropdown menu',
      description,
      className,
      onClick,
      iconName,
      icon,
      showCheckmark: _showCheckmark = false,
      ...props
    },
    ref
  ) => {
    const resolvedGlass = useResolvedGlass();
    const [isHovered, setIsHovered] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const isDisabled = state === 'disabled';
    const isSelected = state === 'selected';
    const isInfo = state === 'info';
    const isExplicitHover = state === 'hover';
    const isExplicitFocused = state === 'focused';
    // Determine actual state based on props and interactions
    // If state is explicitly set to hover/focused/disabled/info, use it directly (for stories/docs)
    // For selected/default states, allow JavaScript hover/focus to override
    // Priority: disabled > info > explicit hover/focused > selected (with JS override) > focused > hover > default
    const actualState = isDisabled
      ? 'disabled'
      : isInfo
        ? 'info'
        : isExplicitHover
          ? 'hover' // Use explicit hover state (for stories)
          : isExplicitFocused
            ? 'focused' // Use explicit focused state (for stories)
            : isSelected && !isHovered && !isFocused
              ? 'selected' // Selected state, but allow hover/focus to override
              : isFocused
                ? 'focused' // JavaScript-controlled focus
                : isHovered
                  ? 'hover' // JavaScript-controlled hover
                  : state === 'selected'
                    ? 'selected' // Explicit selected state
                    : 'default';

    // Text color based on state - using FT design tokens
    const textColorClass =
      isDisabled || isInfo
        ? 'text-[var(--color-tertiary)]'
        : 'text-[var(--color-primary)]';

    // Font style - use inline styles with valid CSS values (rem-based for responsive typography)
    const fontStyle = isInfo
      ? {
        fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
        fontStyle: 'italic',
        fontSize: 'var(--font-size-md-rem, 1.143rem)', // 16px → 1.143rem (responsive)
      }
      : {
        fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
        fontWeight: 'var(--font-weight-regular, 400)',
        fontSize: 'var(--font-size-md-rem, 1.143rem)', // 16px → 1.143rem (responsive)
      };

    const handleMouseEnter = () => {
      if (!isDisabled && !isInfo) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleFocus = () => {
      if (!isDisabled && !isInfo) {
        setIsFocused(true);
      }
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isDisabled || isInfo) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <div
        ref={ref}
        role={isInfo ? undefined : 'menuitem'}
        tabIndex={isDisabled || isInfo ? -1 : 0}
        aria-disabled={isDisabled}
        aria-selected={isSelected}
        className={cn(
          dropdownMenuItemVariants({ state: actualState, prefix, suffix }),
          // When glass is active, override opaque backgrounds from CVA variants
          resolvedGlass && actualState === 'default' && getGlassInnerBg(resolvedGlass, '', 'bg-transparent'),
          resolvedGlass && actualState === 'selected' && getGlassStateLayer(resolvedGlass, '', 'bg-white/10 dark:bg-white/15'),
          resolvedGlass && actualState === 'hover' && getGlassStateLayer(resolvedGlass, '', 'bg-white/15 dark:bg-white/20'),
          resolvedGlass && actualState === 'focused' && getGlassStateLayer(resolvedGlass, '', 'bg-white/15 dark:bg-white/20'),
          resolvedGlass && actualState === 'disabled' && getGlassInnerBg(resolvedGlass, '', 'bg-transparent'),
          resolvedGlass && actualState === 'info' && getGlassInnerBg(resolvedGlass, '', 'bg-transparent'),
          // When selected and hovered/focused, use justify-between to move checkmark to right
          isSelected && prefix === 'none' && !suffix && (isHovered || isFocused) && 'justify-between',
          className
        )}
        onClick={isDisabled || isInfo ? undefined : onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Checkbox prefix */}
        {prefix === 'checkbox' && (
          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={isSelected}
              disabled={isDisabled}
              size="sm"
              className="pointer-events-none"
              onChange={() => { }}
            />
          </div>
        )}

        {/* Radio prefix */}
        {prefix === 'radio' && (
          <div className="box-border flex gap-[calc(var(--spacing-x2)-var(--spacing-x1)/4)] h-[calc(var(--spacing-x5)+var(--spacing-x1)/2)] items-center px-0 py-[var(--spacing-x2)] relative shrink-0">
            {isSelected ? (
              <div className="relative shrink-0 size-[var(--spacing-x5)]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="10" cy="10" r="9" fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="2" />
                  <circle cx="10" cy="10" r="4" fill="var(--color-bg-primary)" />
                </svg>
              </div>
            ) : (
              <div className="relative shrink-0 size-[var(--spacing-x5)]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    fill={
                      actualState === 'hover' || actualState === 'focused'
                        ? 'var(--color-border-primary)'
                        : 'transparent'
                    }
                    stroke={
                      isDisabled
                        ? 'var(--color-tertiary)'
                        : actualState === 'hover' || actualState === 'focused'
                          ? 'var(--color-tertiary)'
                          : 'var(--color-tertiary)'
                    }
                    strokeWidth="2"
                  />
                </svg>
              </div>
            )}
          </div>
        )}

        {/* Icon prefix */}
        {prefix === 'icon' && (
          <div className="relative shrink-0 size-[var(--spacing-x4)] max-h-[var(--spacing-x7)] max-w-[var(--spacing-x7)] min-h-[var(--spacing-x4)] min-w-[var(--spacing-x4)] overflow-clip">
            {icon ? (
              <div className="absolute inset-[6.25%] flex items-center justify-center">
                {icon}
              </div>
            ) : (
              <Icon
                name={iconName || 'data-stack'}
                size={16}
                color={
                  isDisabled
                    ? 'var(--color-tertiary)'
                    : 'var(--color-primary)'
                }
                className="absolute inset-[6.25%]"
              />
            )}
          </div>
        )}

        {/* Label and Description */}
        <div className="flex flex-col min-w-0 flex-1">
          <div
            className={cn('font-normal leading-[1.4] relative shrink-0 truncate', textColorClass)}
            style={fontStyle}
          >
            {children || label}
          </div>
          {description && (
            <div className="text-xs text-[var(--color-tertiary)] truncate mt-[2px]">
              {description}
            </div>
          )}
        </div>

        {/* Checkmark for selected state (when prefix is none) */}
        {isSelected && prefix === 'none' && !suffix && (
          <div
            className={cn(
              "overflow-clip relative shrink-0 size-[var(--spacing-x4)]",
              (isHovered || isFocused) && "ml-auto"
            )}
          >
            <Icon
              name="check-alt"
              size={16}
              color="var(--color-primary)"
              className="absolute inset-[28.12%_15.62%_23.62%_21.88%]"
            />
          </div>
        )}

        {/* Suffix chevron */}
        {suffix && (
          <div className="overflow-clip relative shrink-0 size-[var(--spacing-x4)]">
            <div className="absolute inset-[19.4%_30.6%_11.85%_30.6%] flex items-center justify-center">
              <div className="flex-none h-[calc(var(--spacing-x2)-var(--spacing-x1)/2)] rotate-[270deg] w-[calc(var(--spacing-x3)-var(--spacing-x1)/4)]">
                <Icon
                  name="chevron-down"
                  size={12}
                  color={
                    isDisabled
                      ? 'var(--color-tertiary)'
                      : 'var(--color-primary)'
                  }
                  className="relative size-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DropdownMenuItem.displayName = 'DropdownMenuItem';
