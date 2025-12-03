"use client";

import React, { createContext, useContext } from 'react';

export type TabType = 'primary' | 'secondary' | 'tertiary';

export interface TabsContextType {
  activeTab: number;
  onTabChange: (index: number) => void;
  type: TabType;
  showLine: boolean;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs sub-components must be used within a Tabs component');
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

