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
 * 
 * @important
 * ⚠️ REQUIRED when using FilterDateRange, FilterDropdown, FilterSearch, or any component
 * that calls usePageHeaderFilters(). Wrap your filter components with this provider.
 * 
 * @example
 * ```tsx
 * <PageHeaderFiltersProvider>
 *   <FilterDateRange id="date" ... />
 *   <FilterDropdown id="status" ... />
 * </PageHeaderFiltersProvider>
 * ```
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
 * Returns undefined if used outside PageHeaderFiltersProvider (allows standalone usage)
 */
export function usePageHeaderFiltersOptional() {
  return useContext(PageHeaderFiltersContext);
}

/**
 * Hook to access PageHeaderFilters context
 * @throws Error if used outside PageHeaderFiltersProvider
 * @deprecated Use usePageHeaderFiltersOptional() for components that should work standalone
 */
export function usePageHeaderFilters() {
  const context = useContext(PageHeaderFiltersContext);
  if (context === undefined) {
    throw new Error(
      'usePageHeaderFilters must be used within PageHeaderFiltersProvider.\n' +
      'Use usePageHeaderFiltersOptional() if you want the component to work standalone.'
    );
  }
  return context;
}

