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

export const useStepsContext = () => {
  const context = useContext(StepsContext);
  if (!context) {
    throw new Error('Steps sub-components must be used within a Steps component');
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

