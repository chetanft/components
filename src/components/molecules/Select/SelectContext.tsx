"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ComponentSize } from '../../../lib/utils';

export interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLabel?: string;
  setSelectedLabel: (label: string) => void;
  size?: ComponentSize;
  setSize: (size: ComponentSize) => void;
}

const SelectContext = createContext<SelectContextValue | undefined>(undefined);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a Select component');
  }
  return context;
};

export interface SelectContextProviderProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export const SelectContextProvider: React.FC<SelectContextProviderProps> = ({
  value,
  onValueChange,
  children
}) => {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();
  const [size, setSize] = useState<ComponentSize>('md');

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
  }, []);

  const handleSetSize = useCallback((newSize: ComponentSize) => {
    setSize(newSize);
  }, []);

  const contextValue: SelectContextValue = {
    value,
    onValueChange,
    open,
    onOpenChange: handleOpenChange,
    selectedLabel,
    setSelectedLabel,
    size,
    setSize: handleSetSize
  };

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  );
};

