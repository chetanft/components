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
 * Default values for when components are used outside of PageHeaderFiltersProvider.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: PageHeaderFiltersContextValue = {
  openFilterId: null,
  setOpenFilterId: () => {},
};

/**
 * Hook to access PageHeaderFilters context
 * Returns default values if used outside PageHeaderFiltersProvider
 */
export function usePageHeaderFilters() {
  const context = useContext(PageHeaderFiltersContext);
  
  if (context === undefined) {
    return defaultContext;
  }
  return context;
}

