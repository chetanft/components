"use client";

import React, { createContext, useContext } from 'react';
import type { IconName } from '../../atoms/Icons';
import type { TreeNodeData } from './Tree';

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

export const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('Tree sub-components must be used within a Tree component');
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

