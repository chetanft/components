"use client";

import React, { createContext, useContext } from 'react';

export interface PaginationContextType {
  current: number;
  total: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  variant?: 'default' | 'compact';
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Pagination parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: PaginationContextType = {
  current: 1,
  total: 0,
  pageSize: 10,
  totalPages: 0,
  onPageChange: () => {},
  onShowSizeChange: undefined,
  variant: 'default',
};

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  
  if (!context) {
    return defaultContext;
  }
  return context;
};

export interface PaginationProviderProps {
  value: PaginationContextType;
  children: React.ReactNode;
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({ value, children }) => {
  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};

