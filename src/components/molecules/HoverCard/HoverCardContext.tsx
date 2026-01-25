"use client";

import React, { createContext, useContext } from 'react';

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

/**
 * Default values for when sub-components are used outside of a HoverCard parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const createDefaultContext = (): HoverCardContextType => ({
  open: false,
  setOpen: () => {},
  openDelay: 200,
  closeDelay: 300,
  placement: 'bottom',
  width: undefined,
  openTimeoutRef: { current: null },
  closeTimeoutRef: { current: null },
});

export const useHoverCardContext = () => {
  const context = useContext(HoverCardContext);
  
  if (!context) {
    return createDefaultContext();
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

