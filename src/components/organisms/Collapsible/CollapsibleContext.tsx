"use client";

import React, { createContext, useContext } from 'react';

export interface CollapsibleContextType {
  isExpanded: boolean;
  onToggle: () => void;
  disabled?: boolean;
  type?: 'Primary' | 'Secondary' | 'Tertiary';
  bg?: 'Primary' | 'Secondary';
  showArrow?: boolean;
}

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Collapsible parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: CollapsibleContextType = {
  isExpanded: false,
  onToggle: () => {},
  disabled: false,
  type: 'Primary',
  bg: 'Primary',
  showArrow: true,
};

export const useCollapsibleContext = () => {
  const context = useContext(CollapsibleContext);
  
  if (!context) {
    return defaultContext;
  }
  return context;
};

export interface CollapsibleProviderProps {
  value: CollapsibleContextType;
  children: React.ReactNode;
}

export const CollapsibleProvider: React.FC<CollapsibleProviderProps> = ({ value, children }) => {
  return (
    <CollapsibleContext.Provider value={value}>
      {children}
    </CollapsibleContext.Provider>
  );
};

