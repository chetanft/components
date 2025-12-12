"use client";

import React, { createContext, useContext, useId } from 'react';
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

/**
 * Default values for when sub-components are used outside of an Input parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const createDefaultContext = (fallbackId: string): InputContextType => ({
  inputId: fallbackId,
  size: 'md',
  variant: 'default',
  disabled: false,
  hasError: false,
  hasWarning: false,
  hasSuccess: false,
  errorId: undefined,
  warningId: undefined,
  successId: undefined,
  helperId: undefined,
});

export const useInputContext = () => {
  const context = useContext(InputContext);
  const fallbackId = useId();
  
  if (!context) {
    return createDefaultContext(`input-${fallbackId}`);
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

