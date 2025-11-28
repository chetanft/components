"use client";

import React, { useState, useRef, useImperativeHandle } from 'react';
import { cn } from '../../../lib/utils';

export interface MentionOption {
  value: string;
  label: React.ReactNode;
}

export interface MentionsProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'prefix' | 'onChange' | 'onSelect'> {
  options?: MentionOption[];
  prefix?: string | string[];
  split?: string;
  filterOption?: false | ((input: string, option: MentionOption) => boolean);
  onChange?: (value: string) => void;
  onSelect?: (option: MentionOption, prefix: string) => void;
  onSearch?: (text: string, prefix: string) => void;
  autoSize?: boolean | { minRows: number; maxRows: number };
  status?: 'error' | 'warning';
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
  ...props
}, ref) => {
  const [inputValue, setInputValue] = useState(defaultValue || value || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activePrefix, setActivePrefix] = useState('');
  const [filterText, setFilterText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement, []);

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
  const filteredOptions = options.filter(opt => {
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
          "px-[var(--spacing-x3)] py-[var(--spacing-x2)] text-[var(--font-size-sm)]",
          "placeholder:text-[var(--color-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50",
          status === 'error' && "border-[var(--color-critical)] focus:ring-[var(--color-critical)]",
          status === 'warning' && "border-[var(--color-warning)] focus:ring-[var(--color-warning)]"
        )}
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
          {filteredOptions.map(opt => (
            <div
              key={opt.value}
              className="cursor-pointer px-[var(--spacing-x4)] py-[var(--spacing-x2)] hover:bg-[var(--color-neutral-light)] text-[var(--font-size-sm)]"
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

Mentions.displayName = 'Mentions';
