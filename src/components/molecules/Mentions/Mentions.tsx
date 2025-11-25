"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { Input, InputProps } from '../../atoms/Input'; // Leveraging existing Input
import { createPortal } from 'react-dom';

export interface MentionOption {
  value: string;
  label: React.ReactNode;
}

export interface MentionsProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'prefix' | 'onChange' | 'onSelect'> {
  options?: MentionOption[];
  prefix?: string | string[];
  split?: string;
  validateSearch?: (text: string, props: MentionsProps) => boolean;
  filterOption?: false | ((input: string, option: MentionOption) => boolean);
  notFoundContent?: React.ReactNode;
  placement?: 'top' | 'bottom';
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
  validateSearch,
  filterOption,
  notFoundContent = 'No matches found',
  placement = 'bottom',
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
  const [measuring, setMeasuring] = useState(false);
  const [measureLocation, setMeasureLocation] = useState({ top: 0, left: 0 });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activePrefix, setActivePrefix] = useState('');
  const [filterText, setFilterText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
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
          
          // Measure position (very simplified estimation)
          // In production, use a library like textarea-caret to get coordinates
          if (textareaRef.current) {
             const rect = textareaRef.current.getBoundingClientRect();
             setMeasureLocation({
                 top: rect.bottom + window.scrollY,
                 left: rect.left + window.scrollX
             });
          }
          return;
       }
    }
    setShowSuggestions(false);
  };

  const handleSelect = (option: MentionOption) => {
      // Replace partial mention with selected value
      const cursor = textareaRef.current?.selectionStart || 0;
      const textBefore = inputValue.slice(0, cursor);
      const lastPrefixIndex = textBefore.lastIndexOf(activePrefix);
      
      const newText = inputValue.slice(0, lastPrefixIndex) + 
                      activePrefix + option.value + " " + 
                      inputValue.slice(cursor);
                      
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
            "flex w-full rounded-md border border-[var(--border-primary)] bg-[var(--background-primary)] px-3 py-2 text-sm placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50",
            status === 'error' && "border-[var(--danger)] focus:ring-[var(--danger)]",
            status === 'warning' && "border-[var(--warning)] focus:ring-[var(--warning)]"
        )}
        {...props}
      />
      {showSuggestions && filteredOptions.length > 0 && (
          // Using Portal or absolute positioning
          <div 
            className="absolute z-50 min-w-[200px] overflow-hidden rounded-md border border-[var(--border-primary)] bg-white shadow-md animate-in fade-in-0 zoom-in-95"
            style={{
                top: "100%", // Simplified: always below for now
                left: 0
            }}
          >
             {filteredOptions.map(opt => (
                 <div 
                    key={opt.value}
                    className="cursor-pointer px-4 py-2 hover:bg-[var(--neutral-100)] text-sm"
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

