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

/**
 * Default values for when sub-components are used outside of a Slider parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const createDefaultContext = (): SliderContextType => ({
  value: 0,
  setValue: () => {},
  min: 0,
  max: 100,
  step: 1,
  range: false,
  vertical: false,
  disabled: false,
  marks: undefined,
  tooltip: true,
  trackColor: undefined,
  railColor: undefined,
  onChange: undefined,
  onChangeComplete: undefined,
  isDragging: null,
  setIsDragging: () => {},
  hoveredHandle: null,
  setHoveredHandle: () => {},
  sliderRef: { current: null },
  getPercent: (val: number) => val,
  getValueFromPosition: () => 0,
  rangeValue: [0, 100],
});

export const useSliderContext = () => {
  const context = useContext(SliderContext);
  
  if (!context) {
    return createDefaultContext();
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

