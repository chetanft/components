"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type GlassMode = false | 'subtle' | true | 'prominent';

interface GlassContextType {
  glassMode: GlassMode;
  setGlassMode: (mode: GlassMode) => void;
}

const GlassContext = createContext<GlassContextType | undefined>(undefined);

interface GlassProviderProps {
  children: ReactNode;
  defaultGlass?: GlassMode;
  storageKey?: string;
}

const GLASS_CLASSES = ['theme-glass', 'theme-glass-subtle', 'theme-glass-prominent'] as const;

function applyGlassClass(mode: GlassMode) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  html.classList.remove(...GLASS_CLASSES);
  if (mode === true) {
    html.classList.add('theme-glass');
  } else if (mode === 'subtle') {
    html.classList.add('theme-glass-subtle');
  } else if (mode === 'prominent') {
    html.classList.add('theme-glass-prominent');
  }
}

function deserializeGlassMode(value: string | null): GlassMode {
  if (value === 'true') return true;
  if (value === 'subtle') return 'subtle';
  if (value === 'prominent') return 'prominent';
  return false;
}

function serializeGlassMode(mode: GlassMode): string {
  if (mode === true) return 'true';
  if (mode === false) return 'false';
  return mode;
}

export const GlassProvider: React.FC<GlassProviderProps> = ({
  children,
  defaultGlass = false,
  storageKey = 'ft-glass-mode'
}) => {
  // Keep initial client render deterministic with SSR. Persisted mode is loaded after mount.
  const [glassMode, setGlassModeState] = useState<GlassMode>(defaultGlass);

  const setGlassMode = (mode: GlassMode) => {
    setGlassModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, serializeGlassMode(mode));
      applyGlassClass(mode);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) {
      setGlassModeState(deserializeGlassMode(stored));
    }
  }, [storageKey]);

  useEffect(() => {
    applyGlassClass(glassMode);
  }, [glassMode]);

  const value = { glassMode, setGlassMode };

  return (
    <GlassContext.Provider value={value}>
      {children}
    </GlassContext.Provider>
  );
};

export const useGlass = (): GlassContextType => {
  const context = useContext(GlassContext);
  if (context === undefined) {
    throw new Error('useGlass must be used within a GlassProvider');
  }
  return context;
};

export type { GlassContextType, GlassProviderProps };
