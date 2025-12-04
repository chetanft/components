"use client";

import React, { useState, useRef, useImperativeHandle, useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface MentionOption {
  value: string;
  label: React.ReactNode;
}

export interface MentionsProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'prefix' | 'onChange' | 'onSelect'> {
  /**
   * Options array (for declarative API)
   * @deprecated Use MentionOption components as children instead
   */
  options?: MentionOption[];
  prefix?: string | string[];
  split?: string;
  filterOption?: false | ((input: string, option: MentionOption) => boolean);
  onChange?: (value: string) => void;
  onSelect?: (option: MentionOption, prefix: string) => void;
  onSearch?: (text: string, prefix: string) => void;
  autoSize?: boolean | { minRows: number; maxRows: number };
  status?: 'error' | 'warning';
  /**
   * Mention options (for composable API)
   */
  children?: React.ReactNode;
}

export interface MentionOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Option value (required)
   */
  value: string;
  /**
   * Option label/content
   */
  children?: React.ReactNode;
  /**
   * Option label (alternative to children)
   */
  label?: React.ReactNode;
}

export const Mentions = React.forwardRef<HTMLTextAreaElement, MentionsProps>(({
  options = [],
  prefix = '@',
  split = ' ',
  filterOption,
  onChange,
  onSelect,
  onSearch,
  className,
  value,
  defaultValue,
  status,
  children,
  ...props
}, ref) => {
  const [inputValue, setInputValue] = useState(defaultValue || value || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activePrefix, setActivePrefix] = useState('');
  const [filterText, setFilterText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement, []);

  // Extract options from children if using composable API
  const optionsFromChildren = useMemo(() => {
    if (!children) return [];
    return React.Children.toArray(children)
      .filter((child): child is React.ReactElement<MentionOptionProps> => 
        React.isValidElement(child) && child.type === MentionOption
      )
      .map(child => ({
        value: child.props.value,
        label: child.props.children || child.props.label || child.props.value,
      }));
  }, [children]);

  // Use children options if available, otherwise use options prop
  const allOptions = optionsFromChildren.length > 0 ? optionsFromChildren : options;

  // Check if using composable API
  const hasComposableChildren = React.Children.count(children) > 0 && optionsFromChildren.length > 0;

  // Show deprecation warning
  if (process.env.NODE_ENV !== 'production') {
    if (hasComposableChildren && options.length > 0) {
      console.warn(
        'Mentions: Using deprecated props (options array) with composable API. ' +
        'Please use MentionOption components as children instead. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    } else if (!hasComposableChildren && options.length > 0) {
      console.warn(
        'Mentions: Declarative API (options array prop) is deprecated. ' +
        'Please migrate to composable API using MentionOption components as children. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }
  }

  // Handlers for input changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setInputValue(newVal);
    onChange?.(newVal);

    // Simple mention detection logic
    // Detect if cursor is after a prefix
    const cursor = e.target.selectionStart;
    const textBeforeCursor = newVal.slice(0, cursor);
    const lastPrefixIndex = Math.max(...(Array.isArray(prefix) ? prefix : [prefix]).map(p => textBeforeCursor.lastIndexOf(p)));

    if (lastPrefixIndex !== -1) {
      const potentialMention = textBeforeCursor.slice(lastPrefixIndex);
      // check if it contains space (using split prop)
      if (!potentialMention.includes(split) || (potentialMention.split(split).length <= 1)) {
        // Valid mention start
        const p = potentialMention.charAt(0);
        const query = potentialMention.slice(1);

        setActivePrefix(p);
        setFilterText(query);
        setShowSuggestions(true);
        onSearch?.(query, p);

        return;
      }
    }
    setShowSuggestions(false);
  };

  const handleSelect = (option: MentionOption) => {
    // Replace partial mention with selected value
    const cursor = textareaRef.current?.selectionStart || 0;
    const textBefore = (inputValue as string).slice(0, cursor);
    const lastPrefixIndex = Math.max(
      ...(Array.isArray(prefix) ? prefix : [prefix]).map(p => textBefore.lastIndexOf(p))
    );

    const newText = (inputValue as string).slice(0, lastPrefixIndex) +
      activePrefix + option.value + ' ' +
      (inputValue as string).slice(cursor);

    setInputValue(newText);
    onChange?.(newText);
    onSelect?.(option, activePrefix);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  // Filter options
  const filteredOptions = allOptions.filter(opt => {
    if (filterOption === false) return true;
    if (filterOption) return filterOption(filterText, opt);
    return opt.value.toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <div className={cn("relative w-full", className)}>
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={handleChange}
        className={cn(
          "flex w-full rounded-[var(--radius-md)] border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]",
          "px-[var(--spacing-x3)] py-[var(--spacing-x2)]",
          "placeholder:text-[var(--color-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50",
          status === 'error' && "border-[var(--color-critical)] focus:ring-[var(--color-critical)]",
          status === 'warning' && "border-[var(--color-warning)] focus:ring-[var(--color-warning)]"
        )}
        style={{ fontSize: 'var(--font-size-sm-rem)' }} // 14px → 1rem (responsive)
        {...props}
      />
      {showSuggestions && filteredOptions.length > 0 && (
        // Using Portal or absolute positioning
        <div
          className="absolute z-50 min-w-[calc(var(--spacing-x10)*5)] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] shadow-md animate-in fade-in-0 zoom-in-95"
          style={{
            top: "100%", // Simplified: always below for now
            left: 0
          }}
        >
          {hasComposableChildren ? (
            // Render composable children (filtered)
            React.Children.toArray(children)
              .filter((child): child is React.ReactElement<MentionOptionProps> => 
                React.isValidElement(child) && 
                child.type === MentionOption &&
                filteredOptions.some(opt => opt.value === child.props.value)
              )
              .map(child => {
                const option = filteredOptions.find(opt => opt.value === child.props.value);
                if (!option) return null;
                return (
                  <MentionOption
                    key={child.props.value}
                    value={child.props.value}
                    onClick={() => handleSelect(option)}
                  >
                    {child.props.children || child.props.label || child.props.value}
                  </MentionOption>
                );
              })
          ) : (
            // Render declarative options
            filteredOptions.map(opt => (
              <div
                key={opt.value}
                className="cursor-pointer px-[var(--spacing-x4)] py-[var(--spacing-x2)] hover:bg-[var(--color-neutral-light)]"
                style={{ fontSize: 'var(--font-size-sm-rem)' }} // 14px → 1rem (responsive)
                onClick={() => handleSelect(opt)}
              >
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
});

Mentions.displayName = 'Mentions';

/**
 * MentionOption Component
 *
 * A composable component for individual mention options in a Mentions component.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Mentions prefix="@">
 *   <MentionOption value="john">John Doe</MentionOption>
 *   <MentionOption value="jane">Jane Smith</MentionOption>
 * </Mentions>
 * ```
 */
export const MentionOption = React.forwardRef<HTMLDivElement, MentionOptionProps>(
  ({ value, children, label, className, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "cursor-pointer px-[var(--spacing-x4)] py-[var(--spacing-x2)] hover:bg-[var(--color-neutral-light)]",
          className
        )}
        style={{ fontSize: 'var(--font-size-sm-rem)' }}
        onClick={onClick}
        {...props}
      >
        {children || label || value}
      </div>
    );
  }
);

MentionOption.displayName = 'MentionOption';
