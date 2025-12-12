"use client";

import React, { createContext, useContext } from 'react';

export type TabType = 'primary' | 'secondary' | 'tertiary';

export interface TabsContextType {
  activeTab: number;
  onTabChange: (index: number) => void;
  type: TabType;
  showLine: boolean;
  valueToIndexMap: Map<string, number>;
  registerValue: (value: string, index: number) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Tabs parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const createDefaultContext = (): TabsContextType => ({
  activeTab: 0,
  onTabChange: () => {},
  type: 'primary',
  showLine: true,
  valueToIndexMap: new Map<string, number>(),
  registerValue: () => {},
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

