"use client";

import React, { createContext, useContext, useState, useRef, useCallback, useMemo } from 'react';

export interface SliderMark {
  value: number;
  label?: React.ReactNode;
}

export interface SliderContextType {
  value: number | [number, number];
  setValue: (value: number | [number, number]) => void;
  min: number;
  max: number;
  step: number;
  range: boolean;
  vertical: boolean;
  disabled: boolean;
  marks?: SliderMark[] | boolean;
  tooltip?: boolean | { formatter?: (value: number) => React.ReactNode };
  trackColor?: string;
  railColor?: string;
  onChange?: (value: number | [number, number]) => void;
  onChangeComplete?: (value: number | [number, number]) => void;
  isDragging: 'start' | 'end' | null;
  setIsDragging: (dragging: 'start' | 'end' | null) => void;
  hoveredHandle: 'start' | 'end' | null;
  setHoveredHandle: (handle: 'start' | 'end' | null) => void;
  sliderRef: React.RefObject<HTMLDivElement>;
  getPercent: (val: number) => number;
  getValueFromPosition: (clientX: number, clientY: number) => number;
  rangeValue: [number, number];
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);

export const useSliderContext = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error('Slider sub-components must be used within a Slider component');
  }
  return context;
};

export interface SliderProviderProps {
  value: SliderContextType;
  children: React.ReactNode;
}

export const SliderProvider: React.FC<SliderProviderProps> = ({ value, children }) => {
  return (
    <SliderContext.Provider value={value}>
      {children}
    </SliderContext.Provider>
  );
};

