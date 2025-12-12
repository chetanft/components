"use client";

import React, { createContext, useContext, useId } from 'react';

export interface CheckboxContextType {
  checkboxId: string;
  size: 'sm' | 'md';
  disabled?: boolean;
  hasError?: boolean;
  descriptionId?: string;
}

const CheckboxContext = createContext<CheckboxContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Checkbox parent.
 * This provides resilience against:
 * - displayName detection failures in bundled code
 * - Incorrect usage patterns (e.g., AI-generated code that forgets the parent)
 * - SSR/hydration edge cases
 */
const createDefaultContext = (fallbackId: string): CheckboxContextType => ({
  checkboxId: fallbackId,
  size: 'md',
  disabled: false,
  hasError: false,
  descriptionId: undefined,
});

export const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  const fallbackId = useId();
  
  // Return context if available, otherwise provide sensible defaults
  // This prevents crashes when sub-components are used standalone or when
  // displayName detection fails in bundled library code
  if (!context) {
    return createDefaultContext(`checkbox-${fallbackId}`);
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

