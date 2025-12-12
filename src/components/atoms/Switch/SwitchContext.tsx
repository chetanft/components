"use client";

import React, { createContext, useContext, useId } from 'react';

export interface SwitchContextType {
  switchId: string;
  size: 'sm' | 'md';
  disabled?: boolean;
  hasError?: boolean;
  helperId?: string;
  errorId?: string;
}

const SwitchContext = createContext<SwitchContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Switch parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const createDefaultContext = (fallbackId: string): SwitchContextType => ({
  switchId: fallbackId,
  size: 'md',
  disabled: false,
  hasError: false,
  helperId: undefined,
  errorId: undefined,
});

export const useSwitchContext = () => {
  const context = useContext(SwitchContext);
  const fallbackId = useId();
  
  if (!context) {
    return createDefaultContext(`switch-${fallbackId}`);
  }
  return context;
};

export interface SwitchProviderProps {
  value: SwitchContextType;
  children: React.ReactNode;
}

export const SwitchProvider: React.FC<SwitchProviderProps> = ({ value, children }) => {
  return (
    <SwitchContext.Provider value={value}>
      {children}
    </SwitchContext.Provider>
  );
};

