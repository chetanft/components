"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

export interface RadioSelectorProps {
  name: string;
  value?: string;
  defaultValue?: string;
  options: Array<{
    value: string;
    header: string;
    description?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    hideRadio?: boolean;
  }>;
  onChange?: (value: string) => void;
  className?: string;
}

export const RadioSelector: React.FC<RadioSelectorProps> = ({
  name,
  value,
  defaultValue,
  options = [],
  onChange,
  className,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (optionValue: string) => {
    if (value === undefined) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
  };

  return (
    <div 
      className={cn(
        "flex flex-col gap-4",
        className
      )} 
      role="radiogroup"
    >
      {options.map((option) => {
        const isSelected = currentValue === option.value;
        const isDisabled = option.disabled;
        const showRadio = !option.hideRadio;

        const containerStyles = cn(
          // Base styles
          "transition-all duration-200 rounded-lg",
          // Layout based on variant
          showRadio 
            ? "flex gap-3 p-3" 
            : "flex flex-col items-center justify-center p-3 min-h-[109px]",
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
          "relative shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200",
          isDisabled
            ? "border-[var(--tertiary)]"
            : isSelected
            ? "border-[var(--primary)]"
            : "border-[var(--tertiary)]"
        );

        const contentContainerStyles = cn(
          "flex",
          showRadio ? "flex-row items-center gap-3 flex-1" : "flex-col items-center gap-3"
        );

        const textContainerStyles = cn(
          "flex flex-col",
          showRadio ? "gap-3" : "items-center gap-3"
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
                <div className="relative shrink-0">
                  <div className={radioStyles}>
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className={cn(
                "flex flex-col",
                showRadio ? "gap-3" : "items-center gap-3"
              )}>
                {option.icon && (
                  <div className="w-4 h-4 text-[var(--primary)]">
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
    </div>
  );
};

RadioSelector.displayName = 'RadioSelector'; 