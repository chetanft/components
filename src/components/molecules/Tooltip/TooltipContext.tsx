"use client";

import React, { createContext, useContext, useState } from 'react';

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

export const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip sub-components must be used within a Tooltip component');
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

