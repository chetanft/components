"use client";

import React, { createContext, useContext } from 'react';
import type { ComponentSize } from '../../../lib/utils';

export interface TextareaContextType {
  textareaId: string;
  size: ComponentSize;
  disabled?: boolean;
  hasError?: boolean;
  errorId?: string;
  helperId?: string;
}

const TextareaContext = createContext<TextareaContextType | undefined>(undefined);

export const useTextareaContext = () => {
  const context = useContext(TextareaContext);
  if (!context) {
    throw new Error('Textarea sub-components must be used within a Textarea component');
  }
  return context;
};

export interface TextareaProviderProps {
  value: TextareaContextType;
  children: React.ReactNode;
}

export const TextareaProvider: React.FC<TextareaProviderProps> = ({ value, children }) => {
  return (
    <TextareaContext.Provider value={value}>
      {children}
    </TextareaContext.Provider>
  );
};

