"use client";

import React, { createContext, useContext } from 'react';
import type { ComponentSize } from '../../../lib/utils';

export interface InputNumberContextType {
  value: number | null;
  setValue: (value: number | null) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  min: number;
  max: number;
  step: number;
  precision?: number;
  size: ComponentSize;
  controls: boolean;
  controlsPosition: 'right' | 'both';
  error: boolean;
  disabled: boolean;
  formatter?: (value: number | undefined) => string;
  parser?: (displayValue: string) => number;
  onChange?: (value: number | null) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
  canIncrement: boolean;
  canDecrement: boolean;
  updateValue: (value: number | null) => void;
  clampValue: (val: number) => number;
}

const InputNumberContext = createContext<InputNumberContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of an InputNumber parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: InputNumberContextType = {
  value: null,
  setValue: () => {},
  inputValue: '',
  setInputValue: () => {},
  isFocused: false,
  setIsFocused: () => {},
  min: -Infinity,
  max: Infinity,
  step: 1,
  precision: undefined,
  size: 'md',
  controls: true,
  controlsPosition: 'right',
  error: false,
  disabled: false,
  formatter: undefined,
  parser: undefined,
  onChange: undefined,
  handleIncrement: () => {},
  handleDecrement: () => {},
  canIncrement: true,
  canDecrement: true,
  updateValue: () => {},
  clampValue: (val: number) => val,
};

export const useInputNumberContext = () => {
  const context = useContext(InputNumberContext);
  
  if (!context) {
    return defaultContext;
  }
  return context;
};

export interface InputNumberProviderProps {
  value: InputNumberContextType;
  children: React.ReactNode;
}

export const InputNumberProvider: React.FC<InputNumberProviderProps> = ({ value, children }) => {
  return (
    <InputNumberContext.Provider value={value}>
      {children}
    </InputNumberContext.Provider>
  );
};

