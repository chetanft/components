"use client";

import React, { createContext, useContext, useState, useRef } from 'react';

export interface DatePickerContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value?: string;
  setValue: (value: string) => void;
  startValue?: string;
  setStartValue: (value: string) => void;
  endValue?: string;
  setEndValue: (value: string) => void;
  range: boolean;
  disabled: boolean;
  error: boolean;
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "m" | "l" | null | undefined;
  placeholder?: string;
  includeDropdown?: boolean;
  onChange?: (value: string) => void;
  onStartChange?: (value: string) => void;
  onEndChange?: (value: string) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  calendarRef: React.RefObject<HTMLDivElement>;
  calendarPosition: { top: number; left: number };
  setCalendarPosition: (position: { top: number; left: number }) => void;
  portalContainer: HTMLElement | null;
  setPortalContainer: (container: HTMLElement | null) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  startInputValue: string;
  setStartInputValue: (value: string) => void;
  endInputValue: string;
  setEndInputValue: (value: string) => void;
  inputError: string | null;
  setInputError: (error: string | null) => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  formatDateForDisplay: (date: Date | null) => string;
  parseDateInput: (input: string) => Date | null;
  handleDateChange: (date: Date | [Date, Date]) => void;
  handleApply: () => void;
  handleCancel: () => void;
  handleClear: () => void;
}

const DatePickerContext = createContext<DatePickerContextType | undefined>(undefined);

/**
 * Hook to access DatePicker context
 * Required for DatePickerInput, DatePickerCalendar, DatePickerTrigger sub-components
 * @throws Error if used outside DatePicker component
 */
export const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);
  if (!context) {
    throw new Error(
      'DatePickerInput/DatePickerCalendar/DatePickerTrigger must be inside a <DatePicker> parent.\n\n' +
      'Use DatePicker as a complete component (manages all internals):\n' +
      '<DatePicker\n' +
      '  value={date}\n' +
      '  onChange={setDate}\n' +
      '  placeholder="Select date"\n' +
      '/>\n\n' +
      'Do not import and use sub-components separately.'
    );
  }
  return context;
};

export interface DatePickerProviderProps {
  value: DatePickerContextType;
  children: React.ReactNode;
}

export const DatePickerProvider: React.FC<DatePickerProviderProps> = ({ value, children }) => {
  return (
    <DatePickerContext.Provider value={value}>
      {children}
    </DatePickerContext.Provider>
  );
};

