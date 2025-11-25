import { createContext } from 'react';

export interface CollapseContextType {
  activeKey?: string | string[];
  onToggle?: (key: string) => void;
}

export const CollapseContext = createContext<CollapseContextType | undefined>(undefined);

