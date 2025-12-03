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

export const useCollapsibleContext = () => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error('Collapsible sub-components must be used within a Collapsible component');
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

