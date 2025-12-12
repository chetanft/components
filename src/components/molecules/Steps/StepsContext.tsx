"use client";

import React, { createContext, useContext } from 'react';

export type StepState = 'selected' | 'unselected' | 'completed' | 'error';
export type StepDevice = 'desktop' | 'mobile';
export type StepDirection = 'horizontal' | 'vertical';
export type StepType = 'default' | 'dot' | 'navigation';

export interface StepsContextType {
  currentStep: number;
  device: StepDevice;
  direction: StepDirection;
  type: StepType;
  onChange?: (step: number) => void;
}

const StepsContext = createContext<StepsContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Steps parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: StepsContextType = {
  currentStep: 0,
  device: 'desktop',
  direction: 'horizontal',
  type: 'default',
  onChange: undefined,
};

export const useStepsContext = () => {
  const context = useContext(StepsContext);
  
  if (!context) {
    return defaultContext;
  }
  return context;
};

export interface StepsProviderProps {
  value: StepsContextType;
  children: React.ReactNode;
}

export const StepsProvider: React.FC<StepsProviderProps> = ({ value, children }) => {
  return (
    <StepsContext.Provider value={value}>
      {children}
    </StepsContext.Provider>
  );
};

