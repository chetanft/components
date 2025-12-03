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

export const useRateContext = () => {
  const context = useContext(RateContext);
  if (!context) {
    throw new Error('Rate sub-components must be used within a Rate component');
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

