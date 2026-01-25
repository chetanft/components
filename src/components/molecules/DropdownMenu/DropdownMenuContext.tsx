"use client";

import React, { createContext, useContext, useState } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { DropdownMenuOption } from './DropdownMenu';
import type { SegmentedTabItem } from '../SegmentedTabs';

export interface DropdownMenuContextType {
  property: 'default' | 'search' | 'search-segmented' | 'disabled-info' | 'groups';
  options: DropdownMenuOption[];
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  focusedIndex: number | null;
  setFocusedIndex: (index: number | null) => void;
  onSelect?: (value: string) => void;
  segments?: SegmentedTabItem[];
  selectedSegment?: string;
  onSegmentChange?: (value: string) => void;
  showScrollBar: boolean;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a DropdownMenu parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: DropdownMenuContextType = {
  property: 'default',
  options: [],
  selectedValue: undefined,
  setSelectedValue: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  focusedIndex: null,
  setFocusedIndex: () => {},
  onSelect: undefined,
  segments: undefined,
  selectedSegment: undefined,
  onSegmentChange: undefined,
  showScrollBar: false,
};

export const useDropdownMenuContext = () => {
  const context = useContext(DropdownMenuContext);
  
  if (!context) {
    return defaultContext;
  }
  return context;
};

export interface DropdownMenuProviderProps {
  value: DropdownMenuContextType;
  children: React.ReactNode;
}

export const DropdownMenuProvider: React.FC<DropdownMenuProviderProps> = ({ value, children }) => {
  return (
    <DropdownMenuContext.Provider value={value}>
      {children}
    </DropdownMenuContext.Provider>
  );
};

