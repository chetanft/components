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

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('Pagination sub-components must be used within a Pagination component');
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

