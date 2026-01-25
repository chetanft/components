"use client";

import React, { createContext, useContext } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlignment = 'start' | 'center' | 'end';
export type TooltipColor = 'white' | 'dark';

export interface TooltipContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  placement: TooltipPlacement;
  align: TooltipAlignment;
  color: TooltipColor;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Tooltip parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: TooltipContextType = {
  open: false,
  setOpen: () => {},
  placement: 'top',
  align: 'center',
  color: 'dark',
};

export const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  
  if (!context) {
    return defaultContext;
  }
  return context;
};

export interface TooltipProviderProps {
  value: TooltipContextType;
  children: React.ReactNode;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({ value, children }) => {
  return (
    <TooltipContext.Provider value={value}>
      {children}
    </TooltipContext.Provider>
  );
};

