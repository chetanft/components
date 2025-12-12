"use client";

import React, { createContext, useContext, useState, useRef } from 'react';
import type { ComponentSize } from '../../../lib/utils';
import type { DropdownOption } from './index';

export interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value?: string | number;
  setValue: (value: string | number) => void;
  options: DropdownOption[];
  placeholder?: string;
  size: ComponentSize;
  state: 'default' | 'error' | 'disabled';
  type: 'normal' | 'search' | 'groups';
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onChange?: (value: string | number) => void;
  onSearch?: (query: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  menuRef: React.RefObject<HTMLDivElement>;
  menuPosition: { top: number; left: number; width: number };
  setMenuPosition: (position: { top: number; left: number; width: number }) => void;
  portalContainer: HTMLElement | null;
  setPortalContainer: (container: HTMLElement | null) => void;
  handleSelect: (value: string | number) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Dropdown parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const createDefaultContext = (): DropdownContextType => ({
  isOpen: false,
  setIsOpen: () => {},
  value: undefined,
  setValue: () => {},
  options: [],
  placeholder: 'Select...',
  size: 'md',
  state: 'default',
  type: 'normal',
  searchQuery: '',
  setSearchQuery: () => {},
  onChange: undefined,
  onSearch: undefined,
  dropdownRef: { current: null },
  menuRef: { current: null },
  menuPosition: { top: 0, left: 0, width: 0 },
  setMenuPosition: () => {},
  portalContainer: null,
  setPortalContainer: () => {},
  handleSelect: () => {},
});

/**
 * Hook to access Dropdown context
 * Required for DropdownTrigger and DropdownContent sub-components
 */
export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  
  if (!context) {
    return createDefaultContext();
  }
  return context;
};

export interface DropdownProviderProps {
  value: DropdownContextType;
  children: React.ReactNode;
}

export const DropdownProvider: React.FC<DropdownProviderProps> = ({ value, children }) => {
  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
};

