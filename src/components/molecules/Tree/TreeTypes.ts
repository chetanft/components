import type { ReactNode } from 'react';
import type { IconName } from '../../atoms/Icons';

export interface TreeNodeData {
  key: string;
  title: ReactNode;
  children?: TreeNodeData[];
  icon?: IconName | ReactNode;
  disabled?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  isLeaf?: boolean;
}

// Keep TreeNode as an alias for backward compatibility
export type TreeNode = TreeNodeData;
