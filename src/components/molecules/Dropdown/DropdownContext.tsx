"use client";

import React, { createContext, useContext, useState, useRef } from 'react';
import type { ComponentSize } from '../../../lib/utils';
import type { DropdownOption } from './Dropdown';

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

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown sub-components must be used within a Dropdown component');
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

