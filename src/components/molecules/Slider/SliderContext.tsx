"use client";

import React, { createContext, useContext } from 'react';

export interface SliderContextType {
  value: number | [number, number];
  min: number;
  max: number;
  step: number;
  range: boolean;
  vertical: boolean;
  disabled: boolean;
  tooltip?: boolean | { formatter?: (value: number) => React.ReactNode };
  trackColor?: string;
  railColor?: string;
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Slider parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const createDefaultContext = (): SliderContextType => ({
  value: 0,
  min: 0,
  max: 100,
  step: 1,
  range: false,
  vertical: false,
  disabled: false,
  tooltip: true,
  trackColor: undefined,
  railColor: undefined,
});

export const useSliderContext = () => {
  const context = useContext(SliderContext);

  if (!context) {
    return createDefaultContext();
  }
  return context;
};

export interface SliderProviderProps {
  value: SliderContextType;
  children: React.ReactNode;
}

export const SliderProvider: React.FC<SliderProviderProps> = ({ value, children }) => {
  return (
    <SliderContext.Provider value={value}>
      {children}
    </SliderContext.Provider>
  );
};
