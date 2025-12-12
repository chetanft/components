"use client";

import React, { createContext, useContext, useId } from 'react';

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

/**
 * Default values for when sub-components are used outside of a RadioGroup parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const createDefaultContext = (fallbackId: string): RadioGroupContextType => ({
  name: fallbackId,
  value: undefined,
  onChange: undefined,
  size: 'md',
  orientation: 'vertical',
  disabled: false,
  hasError: false,
  helperId: undefined,
  errorId: undefined,
});

export const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);
  const fallbackId = useId();
  
  if (!context) {
    return createDefaultContext(`radio-group-${fallbackId}`);
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

