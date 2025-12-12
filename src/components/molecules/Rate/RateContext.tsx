"use client";

import React, { createContext, useContext, useState } from 'react';

export interface RateContextType {
  value: number;
  setValue: (value: number) => void;
  hoverValue: number | null;
  setHoverValue: (value: number | null) => void;
  count: number;
  allowHalf: boolean;
  allowClear: boolean;
  disabled: boolean;
  readOnly: boolean;
  character?: React.ReactNode | ((props: { index: number }) => React.ReactNode);
  tooltips?: string[];
  size: 'sm' | 'md' | 'lg' | 'xl';
  activeColor?: string;
  inactiveColor?: string;
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
}

const RateContext = createContext<RateContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Rate parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: RateContextType = {
  value: 0,
  setValue: () => {},
  hoverValue: null,
  setHoverValue: () => {},
  count: 5,
  allowHalf: false,
  allowClear: true,
  disabled: false,
  readOnly: false,
  character: undefined,
  tooltips: undefined,
  size: 'md',
  activeColor: undefined,
  inactiveColor: undefined,
  onChange: undefined,
  onHoverChange: undefined,
};

export const useRateContext = () => {
  const context = useContext(RateContext);
  
  if (!context) {
    return defaultContext;
  }
  return context;
};

export interface RateProviderProps {
  value: RateContextType;
  children: React.ReactNode;
}

export const RateProvider: React.FC<RateProviderProps> = ({ value, children }) => {
  return (
    <RateContext.Provider value={value}>
      {children}
    </RateContext.Provider>
  );
};

