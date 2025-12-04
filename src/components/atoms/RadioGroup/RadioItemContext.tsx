"use client";

import React, { createContext, useContext } from 'react';

export interface RadioItemContextValue {
  value?: string;
  disabled?: boolean;
}

const RadioItemContext = createContext<RadioItemContextValue | null>(null);

export const useRadioItemContext = () => useContext(RadioItemContext);

interface RadioItemProviderProps {
  value: RadioItemContextValue;
  children: React.ReactNode;
}

export const RadioItemProvider: React.FC<RadioItemProviderProps> = ({ value, children }) => (
  <RadioItemContext.Provider value={value}>
    {children}
  </RadioItemContext.Provider>
);

