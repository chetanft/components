"use client";

import React, { useState, useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { RateProvider } from './RateContext';
import { RateItem } from './RateItem';

export interface RateProps extends Omit<ComposableProps<'div'>, 'onChange'> {
  /**
   * Current value (controlled)
   */
  value?: number;
  /**
   * Default value (uncontrolled)
   * @default 0
   */
  defaultValue?: number;
  /**
   * Total count of stars
   * @default 5
   */
  count?: number;
  /**
   * Allow half star
   * @default false
   */
  allowHalf?: boolean;
  /**
   * Allow clearing by clicking again
   * @default true
   */
  allowClear?: boolean;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  /**
   * Read-only state
   * @default false
   */
  readOnly?: boolean;
  /**
   * Custom character
   */
  character?: React.ReactNode | ((props: { index: number }) => React.ReactNode);
  /**
   * Tooltips for each star
   */
  tooltips?: string[];
  /**
   * Size of stars
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Active color
   */
  activeColor?: string;
  /**
   * Inactive color
   */
  inactiveColor?: string;
  /**
   * Change handler
   */
  onChange?: (value: number) => void;
  /**
   * Hover change handler
   */
  onHoverChange?: (value: number) => void;
  /**
   * Rate content (for composable API)
   */
  children?: React.ReactNode;
}

/**
 * Rate Component
 * 
 * A star rating component for displaying and collecting ratings.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Rate value={3} count={5} size="md">
 *   {Array.from({ length: 5 }, (_, i) => (
 *     <RateItem key={i} index={i}>
 *       <RateIcon index={i} />
 *     </RateItem>
 *   ))}
 * </Rate>
 * 
 * // Declarative API (deprecated)
 * <Rate value={3} count={5} />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (RateItem, RateIcon) support `asChild`
 * - Supports half stars, custom characters, and tooltips
 * - Declarative API is deprecated but still functional for backward compatibility
 * - Uses FT Design System tokens: var(--warning) for active, var(--border-primary) for inactive
 */
export const Rate = React.forwardRef<HTMLDivElement, RateProps>(
  ({
    value: controlledValue,
    defaultValue = 0,
    count = 5,
    allowHalf = false,
    allowClear = true,
    disabled = false,
    readOnly = false,
    character,
    tooltips,
    size = 'md',
    activeColor,
    inactiveColor,
    onChange,
    onHoverChange,
    className,
    children,
    asChild,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const actualValue = controlledValue !== undefined ? controlledValue : internalValue;
    const displayValue = hoverValue !== null ? hoverValue : actualValue;
    
    // Size configurations
    const sizeConfig = {
      sm: { icon: 16, gap: 'gap-1' },
      md: { icon: 24, gap: 'gap-1.5' },
      lg: { icon: 32, gap: 'gap-2' },
      xl: { icon: 40, gap: 'gap-2.5' },
    };

    const config = sizeConfig[size];
    
    // Check if using composable API (has children with Rate sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
        child?.type?.displayName?.startsWith('Rate')
    );
    const activeStyle = activeColor || 'var(--warning)';
    const inactiveStyle = inactiveColor || 'var(--border-primary)';

    // Handle click on star
    const handleClick = useCallback((starValue: number) => {
      if (disabled || readOnly) return;

      let newValue = starValue;

      // If clicking the same value and allowClear, reset to 0
      if (allowClear && starValue === actualValue) {
        newValue = 0;
      }

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }, [disabled, readOnly, allowClear, actualValue, controlledValue, onChange]);

    // Handle hover
    const handleHover = useCallback((starValue: number | null) => {
      if (disabled || readOnly) return;
      setHoverValue(starValue);
      if (starValue !== null) {
        onHoverChange?.(starValue);
      }
    }, [disabled, readOnly, onHoverChange]);

    // Render single star
    const renderStar = (index: number) => {
      const starValue = index + 1;
      const halfValue = index + 0.5;

      // Calculate fill state
      let fillState: 'full' | 'half' | 'empty' = 'empty';
      if (displayValue >= starValue) {
        fillState = 'full';
      } else if (allowHalf && displayValue >= halfValue) {
        fillState = 'half';
      }

      // Get character
      const getCharacter = () => {
        if (typeof character === 'function') {
          return character({ index });
        }
        if (character) {
          return character;
        }
        return <Icon name="star" size={config.icon} />;
      };

      const starChar = getCharacter();

      // Tooltip wrapper
      const wrapWithTooltip = (content: React.ReactNode) => {
        if (tooltips && tooltips[index]) {
          return (
            <span title={tooltips[index]}>
              {content}
            </span>
          );
        }
        return content;
      };

      return wrapWithTooltip(
        <div
          key={index}
          className={cn(
            "relative inline-flex cursor-pointer transition-transform duration-100",
            !disabled && !readOnly && "hover:scale-110",
            disabled && "cursor-not-allowed opacity-50",
            readOnly && "cursor-default"
          )}
          onClick={() => handleClick(starValue)}
          onMouseEnter={() => handleHover(starValue)}
          onMouseMove={(e) => {
            if (!allowHalf || disabled || readOnly) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const isLeftHalf = e.clientX - rect.left < rect.width / 2;
            handleHover(isLeftHalf ? halfValue : starValue);
          }}
        >
          {/* Background star (inactive) */}
          <span style={{ color: inactiveStyle }}>
            {starChar}
          </span>

          {/* Foreground star (active) - full or half */}
          {fillState !== 'empty' && (
            <span
              className="absolute top-0 left-0 overflow-hidden"
              style={{
                color: activeStyle,
                width: fillState === 'half' ? '50%' : '100%',
              }}
            >
              {starChar}
            </span>
          )}
        </div>
      );
    };
    
    // If using composable API, render with context provider
    if (hasComposableChildren) {
        // Show deprecation warning if using old props with composable API
        if (process.env.NODE_ENV !== 'production' && count !== 5) {
                    }
        
        const Comp = asChild ? Slot : 'div';
        return (
            <RateProvider
                value={{
                    value: actualValue,
                    setValue: (newValue: number) => {
                        if (controlledValue === undefined) {
                            setInternalValue(newValue);
                        }
                        onChange?.(newValue);
                    },
                    hoverValue,
                    setHoverValue: (newValue: number | null) => {
                        setHoverValue(newValue);
                        if (newValue !== null) {
                            onHoverChange?.(newValue);
                        }
                    },
                    count,
                    allowHalf,
                    allowClear,
                    disabled,
                    readOnly,
                    character,
                    tooltips,
                    size,
                    activeColor,
                    inactiveColor,
                    onChange,
                    onHoverChange,
                }}
            >
                <Comp
                    ref={ref}
                    className={cn(
                        "inline-flex items-center",
                        config.gap,
                        className
                    )}
                    onMouseLeave={() => {
                        setHoverValue(null);
                    }}
                    role="radiogroup"
                    aria-label="Rating"
                    {...props}
                >
                    {children}
                    {/* Optional text showing current value */}
                    {hoverValue !== null && (
                        <span className="ml-2 text-sm text-[var(--tertiary)]">
                            {hoverValue} / {count}
                        </span>
                    )}
                </Comp>
            </RateProvider>
        );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production') {
            }
    
    const Comp = asChild ? Slot : 'div';
    return (
        <RateProvider
            value={{
                value: actualValue,
                setValue: (newValue: number) => {
                    if (controlledValue === undefined) {
                        setInternalValue(newValue);
                    }
                    onChange?.(newValue);
                },
                hoverValue,
                setHoverValue: (newValue: number | null) => {
                    setHoverValue(newValue);
                    if (newValue !== null) {
                        onHoverChange?.(newValue);
                    }
                },
                count,
                allowHalf,
                allowClear,
                disabled,
                readOnly,
                character,
                tooltips,
                size,
                activeColor,
                inactiveColor,
                onChange,
                onHoverChange,
            }}
        >
            <Comp
                ref={ref}
                className={cn(
                    "inline-flex items-center",
                    config.gap,
                    className
                )}
                onMouseLeave={() => handleHover(null)}
                role="radiogroup"
                aria-label="Rating"
                {...props}
            >
                {Array.from({ length: count }, (_, i) => renderStar(i))}
                
                {/* Optional text showing current value */}
                {hoverValue !== null && (
                    <span className="ml-2 text-sm text-[var(--tertiary)]">
                        {hoverValue} / {count}
                    </span>
                )}
            </Comp>
        </RateProvider>
    );
  }
);

Rate.displayName = 'Rate';

