"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface RadioSelectorOption {
  value: string;
  header: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  hideRadio?: boolean;
}

export interface RadioSelectorProps extends Omit<ComposableProps<'div'>, 'onChange'> {
  name: string;
  value?: string;
  defaultValue?: string;
  /**
   * Options array (for declarative API)
   * @deprecated Use RadioSelectorOption components as children instead
   */
  options?: RadioSelectorOption[];
  onChange?: (value: string) => void;
  /**
   * Radio selector content (for composable API)
   */
  children?: React.ReactNode;
}

export interface RadioSelectorOptionProps extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  /**
   * Option value (required)
   */
  value: string;
  /**
   * Option header text
   */
  header: string;
  /**
   * Option description
   */
  description?: string;
  /**
   * Option icon
   */
  icon?: React.ReactNode;
  /**
   * Whether option is disabled
   */
  disabled?: boolean;
  /**
   * Whether to hide radio button
   */
  hideRadio?: boolean;
  /**
   * Whether this option is selected
   */
  selected?: boolean;
  /**
   * Radio group name
   */
  name?: string;
  /**
   * Change handler
   */
  onChange?: (value: string) => void;
}

export const RadioSelector = React.forwardRef<HTMLDivElement, RadioSelectorProps>(
  ({
    name,
    value,
    defaultValue,
    options = [],
    onChange,
    className,
    children,
    asChild,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (optionValue: string) => {
      if (value === undefined) {
        setInternalValue(optionValue);
      }
      onChange?.(optionValue);
    };

    // Check if using composable API (has children)
    const hasComposableChildren = React.Children.count(children) > 0;
    
    // If using composable API, render with children
    if (hasComposableChildren) {
      // Show deprecation warning if using old props with composable API
      if (process.env.NODE_ENV !== 'production' && options?.length) {
        console.warn(
          'RadioSelector: Using deprecated props (options array) with composable API. ' +
          'Please use RadioSelectorOption components as children instead. ' +
          'See migration guide: docs/migrations/composable-migration.md'
        );
      }
      
      const Comp = asChild ? Slot : 'div';
      return (
        <Comp
          ref={ref}
          className={cn(
            "flex flex-col gap-[var(--spacing-x4)]",
            className
          )}
          role="radiogroup"
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement<RadioSelectorOptionProps>(child) && child.type === RadioSelectorOption) {
              return React.cloneElement(child, {
                name,
                selected: currentValue === child.props.value,
                onChange: handleChange,
              });
            }
            return child;
          })}
        </Comp>
      );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && options?.length) {
      console.warn(
        'RadioSelector: Declarative API (options array prop) is deprecated. ' +
        'Please migrate to composable API using RadioSelectorOption components as children. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }

    // Validate options is an array
    const validOptions = Array.isArray(options) ? options : [];

    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex flex-col gap-[var(--spacing-x4)]",
          className
        )}
        role="radiogroup"
        {...props}
      >
        {validOptions.map((option) => {
          const isSelected = currentValue === option.value;
          const isDisabled = option.disabled;
          const showRadio = !option.hideRadio;

          const containerStyles = cn(
            // Base styles
            "transition-all duration-200 rounded-lg",
            // Layout based on variant
            showRadio
              ? "flex gap-[var(--spacing-x3)] p-[var(--spacing-x3)]"
              : "flex flex-col items-center justify-center p-[var(--spacing-x3)] min-h-[109px]",
            // Background and border styles based on state
            isDisabled
              ? "bg-[var(--bg-secondary)] cursor-not-allowed"
              : cn(
                "bg-[var(--bg-secondary)]",
                isSelected && "border border-[var(--primary)]",
                !isSelected && [
                  "hover:bg-[var(--border-secondary)] hover:shadow-[0px_0px_0px_2px_rgba(206,209,215,1)]",
                  "focus-visible:bg-[var(--border-primary)] focus-visible:shadow-[0px_0px_0px_2px_rgba(0,0,0,0.25)]"
                ]
              )
          );

          // Radio button styles
          const radioStyles = cn(
            "relative shrink-0 size-[var(--spacing-x5)] rounded-full border-2 transition-all duration-200",
            isDisabled
              ? "border-[var(--tertiary)]"
              : isSelected
                ? "border-[var(--primary)]"
                : "border-[var(--tertiary)]"
          );

          const contentContainerStyles = cn(
            "flex",
            showRadio ? "flex-row items-start gap-[var(--spacing-x3)] flex-1" : "flex-col items-center gap-[var(--spacing-x3)]"
          );

          const textContainerStyles = cn(
            "flex flex-col",
            showRadio ? "gap-[var(--spacing-x3)]" : "items-center gap-[var(--spacing-x3)]"
          );

          return (
            <label key={option.value} className={containerStyles}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => handleChange(option.value)}
                className="sr-only"
              />

              <div className={contentContainerStyles}>
                {showRadio && (
                  <div className="relative shrink-0 mt-[2px]">
                    <div className={radioStyles}>
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="size-[10px] rounded-full bg-[var(--primary)]" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className={cn(
                  "flex flex-col",
                  showRadio ? "gap-[var(--spacing-x3)]" : "items-center gap-[var(--spacing-x3)]"
                )}>
                  {option.icon && (
                    <div className="size-[var(--spacing-x4)] text-[var(--primary)]">
                      {option.icon}
                    </div>
                  )}

                  <div className={textContainerStyles}>
                    <span
                      className={cn(
                        "text-base leading-[1.4] text-[var(--primary)]",
                        option.description ? "font-semibold" : "font-normal",
                        !showRadio && "text-center"
                      )}
                    >
                      {option.header}
                    </span>
                    {option.description && (
                      <span className={cn(
                        "text-sm font-medium leading-[1.4] text-[var(--primary)]",
                        !showRadio && "text-center"
                      )}>
                        {option.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </label>
          );
        })}
      </Comp>
    );
  }
);

RadioSelector.displayName = 'RadioSelector';

/**
 * RadioSelectorOption Component
 *
 * A composable component for individual options in a RadioSelector.
 *
 * @public
 *
 * @example
 * ```tsx
 * <RadioSelector name="choice" value={value} onChange={setValue}>
 *   <RadioSelectorOption value="option1" header="Option 1" description="Description 1" />
 *   <RadioSelectorOption value="option2" header="Option 2" description="Description 2" icon={<Icon name="check" />} />
 * </RadioSelector>
 * ```
 */
export const RadioSelectorOption = React.forwardRef<HTMLLabelElement, RadioSelectorOptionProps>(
  ({
    value,
    header,
    description,
    icon,
    disabled,
    hideRadio,
    selected,
    name,
    onChange,
    className,
    ...props
  }, ref) => {
    const showRadio = !hideRadio;

    const containerStyles = cn(
      // Base styles
      "transition-all duration-200 rounded-lg cursor-pointer",
      // Layout based on variant
      showRadio
        ? "flex gap-[var(--spacing-x3)] p-[var(--spacing-x3)]"
        : "flex flex-col items-center justify-center p-[var(--spacing-x3)] min-h-[109px]",
      // Background and border styles based on state
      disabled
        ? "bg-[var(--bg-secondary)] cursor-not-allowed"
        : cn(
          "bg-[var(--bg-secondary)]",
          selected && "border border-[var(--primary)]",
          !selected && [
            "hover:bg-[var(--border-secondary)] hover:shadow-[0px_0px_0px_2px_rgba(206,209,215,1)]",
            "focus-visible:bg-[var(--border-primary)] focus-visible:shadow-[0px_0px_0px_2px_rgba(0,0,0,0.25)]"
          ]
        ),
      className
    );

    // Radio button styles
    const radioStyles = cn(
      "relative shrink-0 size-[var(--spacing-x5)] rounded-full border-2 transition-all duration-200",
      disabled
        ? "border-[var(--tertiary)]"
        : selected
          ? "border-[var(--primary)]"
          : "border-[var(--tertiary)]"
    );

    const contentContainerStyles = cn(
      "flex",
      showRadio ? "flex-row items-start gap-[var(--spacing-x3)] flex-1" : "flex-col items-center gap-[var(--spacing-x3)]"
    );

    const textContainerStyles = cn(
      "flex flex-col",
      showRadio ? "gap-[var(--spacing-x3)]" : "items-center gap-[var(--spacing-x3)]"
    );

    return (
      <label ref={ref} className={containerStyles} {...props}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={selected}
          disabled={disabled}
          onChange={() => onChange?.(value)}
          className="sr-only"
        />

        <div className={contentContainerStyles}>
          {showRadio && (
            <div className="relative shrink-0 mt-[2px]">
              <div className={radioStyles}>
                {selected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-[10px] rounded-full bg-[var(--primary)]" />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={cn(
            "flex flex-col",
            showRadio ? "gap-[var(--spacing-x3)]" : "items-center gap-[var(--spacing-x3)]"
          )}>
            {icon && (
              <div className="size-[var(--spacing-x4)] text-[var(--primary)]">
                {icon}
              </div>
            )}

            <div className={textContainerStyles}>
              <span
                className={cn(
                  "text-base leading-[1.4] text-[var(--primary)]",
                  description ? "font-semibold" : "font-normal",
                  !showRadio && "text-center"
                )}
              >
                {header}
              </span>
              {description && (
                <span className={cn(
                  "text-sm font-medium leading-[1.4] text-[var(--primary)]",
                  !showRadio && "text-center"
                )}>
                  {description}
                </span>
              )}
            </div>
          </div>
        </div>
      </label>
    );
  }
);

RadioSelectorOption.displayName = 'RadioSelectorOption'; 