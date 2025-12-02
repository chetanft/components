"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { DatePickerField } from '../../molecules/DatePicker/DatePicker';
import type { DataEntryCellState } from './DataEntryTableCell';

export interface DataEntryTableCellDateTimeProps {
  value?: string;
  placeholder?: string;
  error?: string;
  state?: DataEntryCellState;
  onChange?: (value: string | number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

export const DataEntryTableCellDateTime: React.FC<DataEntryTableCellDateTimeProps> = ({
  value,
  placeholder = 'Value',
  error,
  state = 'default',
  onChange,
  onFocus,
  onBlur,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    setIsTyping(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    onBlur?.();
  };

  const handleChange = (newValue: string) => {
    setIsTyping(true);
    onChange?.(newValue);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  // Determine effective state
  const effectiveState = error && state !== 'disabled' ? 'error-filled' : 
                         isTyping ? 'typing' :
                         isFocused ? 'focused' :
                         value ? 'filled' :
                         state;

  // Map our state to DatePickerField state
  const datePickerState = effectiveState === 'disabled' ? 'disabled' : 
                          effectiveState === 'focused' || effectiveState === 'typing' ? 'focused' : 
                          effectiveState === 'filled' ? 'filled' :
                          effectiveState === 'pre-filled' ? 'prefilled' :
                          'default';

  return (
    <div className={cn("w-full", className)} style={{ height: 'var(--component-height-md)' }}>
      <DatePickerField
        value={value}
        placeholder={placeholder}
        disabled={effectiveState === 'disabled'}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        size="md"
        state={datePickerState}
        className="w-full rounded-none"
        style={{ 
          height: 'var(--component-height-md)',
          borderRadius: 'var(--radius-none)',
        }}
      />
    </div>
  );
};

DataEntryTableCellDateTime.displayName = 'DataEntryTableCellDateTime';

