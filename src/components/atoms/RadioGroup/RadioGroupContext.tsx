"use client";

import React, { createContext, useContext } from 'react';

export interface RadioGroupContextType {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  size: 'sm' | 'md';
  orientation: 'horizontal' | 'vertical';
  disabled?: boolean;
  hasError?: boolean;
  helperId?: string;
  errorId?: string;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

export const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroup sub-components must be used within a RadioGroup component');
  }
  return context;
};

export interface RadioGroupProviderProps {
  value: RadioGroupContextType;
  children: React.ReactNode;
}

export const RadioGroupProvider: React.FC<RadioGroupProviderProps> = ({ value, children }) => {
  return (
    <RadioGroupContext.Provider value={value}>
      {children}
    </RadioGroupContext.Provider>
  );
};

