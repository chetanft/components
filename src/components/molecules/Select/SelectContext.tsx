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

/**
 * Default values for when sub-components are used outside of a Select parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: SelectContextValue = {
  value: undefined,
  onValueChange: undefined,
  open: false,
  onOpenChange: () => {},
  selectedLabel: undefined,
  setSelectedLabel: () => {},
  size: 'md',
  setSize: () => {},
};

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  
  if (!context) {
    return defaultContext;
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

