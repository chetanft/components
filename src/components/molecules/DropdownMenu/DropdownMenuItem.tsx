import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Icon, type IconName } from '../../atoms/Icons';
import { Checkbox } from '../../atoms/Checkbox';

const dropdownMenuItemVariants = cva(
  'box-border flex items-center relative w-full transition-colors duration-200',
  {
    variants: {
      state: {
        default: 'bg-[var(--bg-primary)]',
        selected: 'bg-[var(--bg-secondary)]',
        hover: 'bg-[var(--border-secondary)] cursor-pointer',
        focused: 'bg-[var(--border-primary)] cursor-pointer',
        disabled: 'bg-[var(--bg-primary)] cursor-not-allowed opacity-60',
        info: 'bg-[var(--bg-primary)] border-[var(--border-primary)] border-b-0 border-l-0 border-r-0 border-solid border-t',
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
        className: 'p-[var(--x3,12px)] rounded-[var(--x2,8px)]',
      },
      {
        prefix: 'none',
        suffix: false,
        className: 'gap-[10px] p-[var(--x3,12px)] rounded-[var(--x2,8px)]',
      },
      {
        prefix: 'none',
        suffix: true,
        className: 'justify-between p-[var(--x3,12px)] rounded-[var(--x2,8px)]',
      },
      {
        prefix: 'checkbox',
        className: 'gap-[var(--x3,12px)] p-[var(--x3,12px)] rounded-[var(--x2,8px)]',
      },
      {
        prefix: 'radio',
        className: 'gap-[var(--x3,12px)] p-[var(--x3,12px)] rounded-[var(--x2,8px)]',
      },
      {
        prefix: 'icon',
        suffix: false,
        className: 'gap-[10px] p-[var(--x3,12px)] rounded-[var(--x2,8px)]',
      },
      {
        prefix: 'icon',
        suffix: true,
        className: 'justify-between p-[var(--x3,12px)] rounded-[var(--x2,8px)]',
      },
      {
        state: 'info',
        className: 'pb-[var(--x3,12px)] pt-[var(--x4,16px)] px-[var(--x3,12px)] rounded-bl-[var(--x2,8px)] rounded-br-[var(--x2,8px)]',
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
  label?: string;
  className?: string;
  onClick?: () => void;
  iconName?: IconName;
  showCheckmark?: boolean;
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
      className,
      onClick,
      iconName,
      showCheckmark = false,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const isDisabled = state === 'disabled';
    const isSelected = state === 'selected';
    const isInfo = state === 'info';
    const isExplicitHover = state === 'hover';
    const isExplicitFocused = state === 'focused';
    const isExplicitState = isDisabled || isInfo || isExplicitHover || isExplicitFocused;

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
        ? 'text-[var(--tertiary)]'
        : 'text-[var(--primary)]';

    // Font style - use inline styles with valid CSS values
    const fontStyle = isInfo
      ? {
        fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
        fontStyle: 'italic',
        fontSize: '16px',
      }
      : {
        fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
        fontWeight: '400',
        fontSize: '16px',
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
          <div className="box-border flex gap-[7px] h-[22px] items-center px-0 py-[8px] relative shrink-0">
            {isSelected ? (
              <div className="relative shrink-0 size-[20px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="10" cy="10" r="9" fill="var(--primary)" stroke="var(--primary)" strokeWidth="2" />
                  <circle cx="10" cy="10" r="4" fill="var(--bg-primary)" />
                </svg>
              </div>
            ) : (
              <div className="relative shrink-0 size-[20px]">
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
                        ? 'var(--border-primary)'
                        : 'transparent'
                    }
                    stroke={
                      isDisabled
                        ? 'var(--tertiary)'
                        : actualState === 'hover' || actualState === 'focused'
                          ? 'var(--tertiary)'
                          : 'var(--tertiary)'
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
          <div className="relative shrink-0 size-[16px] max-h-[28px] max-w-[28px] min-h-[16px] min-w-[16px] overflow-clip">
            <Icon
              name={iconName || 'data-stack'}
              size={16}
              color={
                isDisabled
                  ? 'var(--tertiary)'
                  : 'var(--primary)'
              }
              className="absolute inset-[6.25%]"
            />
          </div>
        )}

        {/* Label text */}
        <p
          className={cn('font-normal leading-[1.4] relative shrink-0', textColorClass)}
          style={fontStyle}
        >
          {children || label}
        </p>

        {/* Checkmark for selected state (when prefix is none) */}
        {isSelected && prefix === 'none' && !suffix && (
          <div className={cn(
            "overflow-clip relative shrink-0 size-[16px]",
            (isHovered || isFocused) && "ml-auto"
          )}>
            <Icon
              name="check-alt"
              size={16}
              color="var(--primary)"
              className="absolute inset-[28.12%_15.62%_23.62%_21.88%]"
            />
          </div>
        )}

        {/* Suffix chevron */}
        {suffix && (
          <div className="overflow-clip relative shrink-0 size-[16px]">
            <div className="absolute flex inset-[19.4%_30.6%_11.85%_30.6%] items-center justify-center">
              <div className="flex-none h-[6.207px] rotate-[270deg] w-[11px]">
                <Icon
                  name="chevron-down"
                  size={11}
                  color={
                    isDisabled
                      ? 'var(--tertiary)'
                      : 'var(--primary)'
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

