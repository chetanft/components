"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type ViewMode = "human" | "machine";

interface ViewModeContextValue {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextValue | null>(null);

const STORAGE_KEY = "ftds_view_mode";

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>("human");

  // Hydrate from URL param (priority) or localStorage after mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("view") as ViewMode | null;
    if (urlMode === "human" || urlMode === "machine") {
      setViewModeState(urlMode);
      localStorage.setItem(STORAGE_KEY, urlMode);
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
    if (stored === "human" || stored === "machine") {
      setViewModeState(stored);
    }
  }, []);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    localStorage.setItem(STORAGE_KEY, mode);
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const ctx = useContext(ViewModeContext);
  if (!ctx) throw new Error("useViewMode must be used within ViewModeProvider");
  return ctx;
}
