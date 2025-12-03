"use client";

import React, { createContext, useContext } from 'react';

export interface CheckboxContextType {
  checkboxId: string;
  size: 'sm' | 'md';
  disabled?: boolean;
  hasError?: boolean;
  descriptionId?: string;
}

const CheckboxContext = createContext<CheckboxContextType | undefined>(undefined);

export const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error('Checkbox sub-components must be used within a Checkbox component');
  }
  return context;
};

export interface CheckboxProviderProps {
  value: CheckboxContextType;
  children: React.ReactNode;
}

export const CheckboxProvider: React.FC<CheckboxProviderProps> = ({ value, children }) => {
  return (
    <CheckboxContext.Provider value={value}>
      {children}
    </CheckboxContext.Provider>
  );
};

