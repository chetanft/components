"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import type { ComponentSize } from '../../../lib/utils';
import type { GlassVariant } from '../../../lib/glass';

export interface SelectPosition {
  top: number;
  left: number;
  width: number;
}

export interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedLabel?: string;
  setSelectedLabel: (label: string) => void;
  size?: ComponentSize;
  setSize: (size: ComponentSize) => void;
  glass?: GlassVariant;
  triggerPosition: SelectPosition;
  setTriggerPosition: (pos: SelectPosition) => void;
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
  glass: undefined,
  triggerPosition: { top: 0, left: 0, width: 0 },
  setTriggerPosition: () => {},
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
  glass?: GlassVariant;
  children: React.ReactNode;
}

export const SelectContextProvider: React.FC<SelectContextProviderProps> = ({
  value,
  onValueChange,
  glass,
  children
}) => {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();
  const prevValueRef = useRef(value);
  const [size, setSize] = useState<ComponentSize>('md');

  // Clear selectedLabel when value changes externally so the matching
  // SelectItem can re-sync its label on the next render.
  useEffect(() => {
    if (prevValueRef.current !== value) {
      prevValueRef.current = value;
      setSelectedLabel(undefined);
    }
  }, [value]);
  const [triggerPosition, setTriggerPosition] = useState<SelectPosition>({ top: 0, left: 0, width: 0 });

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
  }, []);

  const handleSetSize = useCallback((newSize: ComponentSize) => {
    setSize(newSize);
  }, []);

  const handleSetTriggerPosition = useCallback((pos: SelectPosition) => {
    setTriggerPosition(pos);
  }, []);

  const contextValue: SelectContextValue = {
    value,
    onValueChange,
    open,
    onOpenChange: handleOpenChange,
    selectedLabel,
    setSelectedLabel,
    size,
    setSize: handleSetSize,
    glass,
    triggerPosition,
    setTriggerPosition: handleSetTriggerPosition,
  };

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  );
};

