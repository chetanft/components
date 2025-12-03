"use client";

import React, { createContext, useContext } from 'react';
import type { ComponentSize } from '../../../lib/utils';

export interface InputContextType {
  inputId: string;
  size: ComponentSize;
  variant: 'default' | 'filled' | 'outlined';
  disabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  hasSuccess?: boolean;
  errorId?: string;
  warningId?: string;
  successId?: string;
  helperId?: string;
}

const InputContext = createContext<InputContextType | undefined>(undefined);

export const useInputContext = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error('Input sub-components must be used within an Input component');
  }
  return context;
};

export interface InputProviderProps {
  value: InputContextType;
  children: React.ReactNode;
}

export const InputProvider: React.FC<InputProviderProps> = ({ value, children }) => {
  return (
    <InputContext.Provider value={value}>
      {children}
    </InputContext.Provider>
  );
};

