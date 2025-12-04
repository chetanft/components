"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PageHeaderFiltersContextValue {
  openFilterId: string | null;
  setOpenFilterId: (id: string | null) => void;
}

const PageHeaderFiltersContext = createContext<PageHeaderFiltersContextValue | undefined>(undefined);

export interface PageHeaderFiltersProviderProps {
  children: ReactNode;
}

/**
 * Provider component for PageHeaderFilters context
 * Manages which filter is currently open, ensuring only one filter is open at a time
 */
export function PageHeaderFiltersProvider({ children }: PageHeaderFiltersProviderProps) {
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);

  return (
    <PageHeaderFiltersContext.Provider value={{ openFilterId, setOpenFilterId }}>
      {children}
    </PageHeaderFiltersContext.Provider>
  );
}

/**
 * Hook to access PageHeaderFilters context
 * @throws Error if used outside PageHeaderFiltersProvider
 */
export function usePageHeaderFilters() {
  const context = useContext(PageHeaderFiltersContext);
  if (context === undefined) {
    throw new Error('usePageHeaderFilters must be used within PageHeaderFiltersProvider');
  }
  return context;
}

