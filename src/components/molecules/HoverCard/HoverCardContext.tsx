"use client";

import React, { createContext, useContext, useState, useRef } from 'react';

export type HoverCardPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface HoverCardContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  openDelay: number;
  closeDelay: number;
  placement: HoverCardPlacement;
  width?: number | string;
  openTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
  closeTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
}

const HoverCardContext = createContext<HoverCardContextType | undefined>(undefined);

export const useHoverCardContext = () => {
  const context = useContext(HoverCardContext);
  if (!context) {
    throw new Error('HoverCard sub-components must be used within a HoverCard component');
  }
  return context;
};

export interface HoverCardProviderProps {
  value: HoverCardContextType;
  children: React.ReactNode;
}

export const HoverCardProvider: React.FC<HoverCardProviderProps> = ({ value, children }) => {
  return (
    <HoverCardContext.Provider value={value}>
      {children}
    </HoverCardContext.Provider>
  );
};

