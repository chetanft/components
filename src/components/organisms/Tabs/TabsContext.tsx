"use client";

import React, { createContext, useContext } from 'react';
import type { GlassVariant } from '../../../lib/glass';

export type TabType = 'primary' | 'secondary' | 'tertiary';

export interface TabsContextType {
  type: TabType;
  showLine: boolean;
  glass?: GlassVariant;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Tabs parent.
 */
const createDefaultContext = (): TabsContextType => ({
  type: 'primary',
  showLine: true,
});

export const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (!context) {
    return createDefaultContext();
  }
  return context;
};

export interface TabsProviderProps {
  value: TabsContextType;
  children: React.ReactNode;
}

export const TabsProvider: React.FC<TabsProviderProps> = ({ value, children }) => {
  return (
    <TabsContext.Provider value={value}>
      {children}
    </TabsContext.Provider>
  );
};
