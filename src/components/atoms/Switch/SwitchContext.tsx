"use client";

import React, { createContext, useContext } from 'react';

export interface SwitchContextType {
  switchId: string;
  size: 'sm' | 'md';
  disabled?: boolean;
  hasError?: boolean;
  helperId?: string;
  errorId?: string;
}

const SwitchContext = createContext<SwitchContextType | undefined>(undefined);

export const useSwitchContext = () => {
  const context = useContext(SwitchContext);
  if (!context) {
    throw new Error('Switch sub-components must be used within a Switch component');
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

