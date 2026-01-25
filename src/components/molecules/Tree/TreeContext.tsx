"use client";

import React, { createContext, useContext } from 'react';
import type { IconName } from '../../atoms/Icons';
import type { TreeNodeData } from './TreeTypes';

export interface TreeContextType {
  expandedKeys: Set<string>;
  selectedKeys: Set<string>;
  checkedKeys: Set<string>;
  checkable: boolean;
  selectable: boolean;
  multiple: boolean;
  showLine: boolean;
  showIcon: boolean;
  disabled: boolean;
  blockNode: boolean;
  switcherIcon?: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode);
  icon?: IconName | ((props: { expanded: boolean; isLeaf: boolean }) => React.ReactNode);
  toggleExpanded: (key: string, node: TreeNodeData) => void;
  toggleSelected: (key: string, node: TreeNodeData) => void;
  toggleChecked: (key: string, node: TreeNodeData) => void;
}

const TreeContext = createContext<TreeContextType | null>(null);

/**
 * Default values for when sub-components are used outside of a Tree parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const createDefaultContext = (): TreeContextType => ({
  expandedKeys: new Set<string>(),
  selectedKeys: new Set<string>(),
  checkedKeys: new Set<string>(),
  checkable: false,
  selectable: true,
  multiple: false,
  showLine: false,
  showIcon: false,
  disabled: false,
  blockNode: false,
  switcherIcon: undefined,
  icon: undefined,
  toggleExpanded: () => {},
  toggleSelected: () => {},
  toggleChecked: () => {},
});

export const useTreeContext = () => {
  const context = useContext(TreeContext);
  
  if (!context) {
    return createDefaultContext();
  }
  return context;
};

export interface TreeProviderProps {
  value: TreeContextType;
  children: React.ReactNode;
}

export const TreeProvider: React.FC<TreeProviderProps> = ({ value, children }) => {
  return (
    <TreeContext.Provider value={value}>
      {children}
    </TreeContext.Provider>
  );
};
