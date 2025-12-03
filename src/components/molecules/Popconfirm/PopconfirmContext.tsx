"use client";

import React, { createContext, useContext, useState, useRef } from 'react';
import type { IconName } from '../../atoms/Icons';

export type PopconfirmPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopconfirmContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
  placement: PopconfirmPlacement;
  icon?: IconName;
  onConfirm?: () => void;
  onCancel?: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

const PopconfirmContext = createContext<PopconfirmContextType | undefined>(undefined);

export const usePopconfirmContext = () => {
  const context = useContext(PopconfirmContext);
  if (!context) {
    throw new Error('Popconfirm sub-components must be used within a Popconfirm component');
  }
  return context;
};

export interface PopconfirmProviderProps {
  value: PopconfirmContextType;
  children: React.ReactNode;
}

export const PopconfirmProvider: React.FC<PopconfirmProviderProps> = ({ value, children }) => {
  return (
    <PopconfirmContext.Provider value={value}>
      {children}
    </PopconfirmContext.Provider>
  );
};

