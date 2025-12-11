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
 * Hook to access Dropdown context
 * Required for DropdownTrigger and DropdownContent sub-components
 * @throws Error if used outside Dropdown component
 */
export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      'DropdownTrigger/DropdownContent must be inside a <Dropdown> parent.\n\n' +
      'Option 1 - Simple (no composition):\n' +
      '<Dropdown\n' +
      '  value={value} onChange={setValue} options={options}\n' +
      '  placeholder="Select..."\n' +
      '/>\n\n' +
      'Option 2 - Composable:\n' +
      '<Dropdown value={value} onChange={setValue} options={options}>\n' +
      '  <DropdownTrigger />\n' +
      '  <DropdownContent />\n' +
      '</Dropdown>'
    );
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

