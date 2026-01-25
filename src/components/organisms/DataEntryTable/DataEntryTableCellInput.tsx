"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import type { DataEntryCellState } from './DataEntryTableTypes';

export interface DataEntryTableCellInputProps {
  value?: string | number;
  placeholder?: string;
  error?: string;
  state?: DataEntryCellState;
  onChange?: (value: string | number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

export const DataEntryTableCellInput: React.FC<DataEntryTableCellInputProps> = ({
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
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    onChange?.(e.target.value);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  // Determine effective state
  const effectiveState = error && state !== 'disabled' ? 'error-filled' : 
                         isTyping ? 'typing' :
                         isFocused ? 'focused' :
                         value ? 'filled' :
                         state;

  // Get border and background styles based on state
  const getStateStyles = () => {
    switch (effectiveState) {
      case 'hover':
        return {
          border: 'border-[var(--primary)]',
          bg: 'bg-[var(--bg-primary)]',
          boxShadow: undefined,
        };
      case 'focused':
      case 'typing':
        return {
          border: 'border-[var(--primary)]',
          bg: 'bg-[var(--bg-primary)]',
          boxShadow: '0px 0px 0px 2px var(--border-primary)',
        };
      case 'error-filled':
        return {
          border: 'border-[var(--critical)]',
          bg: 'bg-[var(--bg-primary)]',
          boxShadow: '0px 0px 0px 2px var(--critical-light)',
        };
      case 'disabled':
      case 'pre-filled':
        return {
          border: 'border-[var(--border-secondary)]',
          bg: 'bg-[var(--bg-secondary)]',
          boxShadow: undefined,
        };
      case 'filled':
        return {
          border: 'border-[var(--border-secondary)]',
          bg: 'bg-[var(--bg-primary)]',
          boxShadow: undefined,
        };
      default:
        return {
          border: 'border-[var(--border-secondary)]',
          bg: 'bg-[var(--bg-primary)]',
          boxShadow: undefined,
        };
    }
  };

  const stateStyles = getStateStyles();
  const hasValue = value !== undefined && value !== null && value !== '';

  return (
    <div
      className={cn(
        "flex items-center justify-between px-[var(--x3)] py-[var(--x0)]",
        "h-[var(--component-height-md)]",
        "bg-[var(--bg-primary)] border border-[var(--border-secondary)] border-solid box-border",
        "relative shrink-0",
        "transition-all duration-200",
        stateStyles.border,
        effectiveState === 'disabled' && "cursor-not-allowed",
        className
      )}
      style={{
        boxShadow: stateStyles.boxShadow,
      }}
      onClick={(e) => {
        // Focus input when clicking on the cell
        if (inputRef.current && e.target === e.currentTarget) {
          inputRef.current.focus();
        }
      }}
    >
      <div className="box-border flex flex-[1_0_0] gap-[var(--x1)] h-[var(--component-height-md)] items-center min-h-px min-w-px px-[var(--x0)] py-[var(--x5)] relative rounded-[var(--radius-md)] shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={value ?? ''}
          placeholder={placeholder}
          disabled={effectiveState === 'disabled'}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "flex-[1_0_0] border-0 bg-transparent outline-none min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 whitespace-nowrap",
            "leading-[1.4] font-normal",
            hasValue ? "text-[var(--primary)]" : "text-[var(--tertiary)]",
            effectiveState === 'disabled' && "text-[var(--tertiary)] cursor-not-allowed",
            effectiveState === 'typing' && "text-[var(--primary)]"
          )}
          style={{
            fontSize: 'var(--font-size-md)',
          }}
        />
        {effectiveState === 'error-filled' && (
          <Icon
            name="alert-critical-fill"
            size={16}
            className="text-[var(--critical)] shrink-0"
          />
        )}
      </div>
    </div>
  );
};

DataEntryTableCellInput.displayName = 'DataEntryTableCellInput';
