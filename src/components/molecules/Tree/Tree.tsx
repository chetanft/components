"use client";

import React, { useState, useCallback, useMemo, createContext, useContext } from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';
import { Checkbox } from '../../atoms/Checkbox';

// ============================================================================
// Types
// ============================================================================

export interface TreeNode {
  key: string;
  title: React.ReactNode;
  children?: TreeNode[];
  icon?: IconName | React.ReactNode;
  disabled?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  isLeaf?: boolean;
}

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Tree data */
  treeData: TreeNode[];
  /** Expanded keys (controlled) */
  expandedKeys?: string[];
  /** Default expanded keys */
  defaultExpandedKeys?: string[];
  /** Selected keys (controlled) */
  selectedKeys?: string[];
  /** Default selected keys */
  defaultSelectedKeys?: string[];
  /** Checked keys (controlled) */
  checkedKeys?: string[];
  /** Default checked keys */
  defaultCheckedKeys?: string[];
  /** Whether to show checkboxes */
  checkable?: boolean;
  /** Whether nodes are selectable */
  selectable?: boolean;
  /** Whether to allow multiple selection */
  multiple?: boolean;
  /** Whether to show connecting lines */
  showLine?: boolean;
  /** Whether to show icons */
  showIcon?: boolean;
  /** Default expand all nodes */
  defaultExpandAll?: boolean;
  /** Callback when node is expanded/collapsed */
  onExpand?: (expandedKeys: string[], info: { node: TreeNode; expanded: boolean }) => void;
  /** Callback when node is selected */
  onSelect?: (selectedKeys: string[], info: { node: TreeNode; selected: boolean }) => void;
  /** Callback when node is checked */
  onCheck?: (checkedKeys: string[], info: { node: TreeNode; checked: boolean }) => void;
  /** Custom expand/collapse icon */
  switcherIcon?: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode);
  /** Custom node icon */
  icon?: IconName | ((props: { expanded: boolean; isLeaf: boolean }) => React.ReactNode);
  /** Disabled entire tree */
  disabled?: boolean;
  /** Block node (full width clickable) */
  blockNode?: boolean;
}

// ============================================================================
// Tree Context
// ============================================================================

interface TreeContextValue {
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
  toggleExpanded: (key: string, node: TreeNode) => void;
  toggleSelected: (key: string, node: TreeNode) => void;
  toggleChecked: (key: string, node: TreeNode) => void;
}

const TreeContext = createContext<TreeContextValue | null>(null);

// ============================================================================
// Helper Functions
// ============================================================================

const getAllKeys = (nodes: TreeNode[]): string[] => {
  const keys: string[] = [];
  const traverse = (items: TreeNode[]) => {
    items.forEach(item => {
      keys.push(item.key);
      if (item.children) {
        traverse(item.children);
      }
    });
  };
  traverse(nodes);
  return keys;
};

const getChildKeys = (node: TreeNode): string[] => {
  const keys: string[] = [];
  const traverse = (items: TreeNode[]) => {
    items.forEach(item => {
      keys.push(item.key);
      if (item.children) {
        traverse(item.children);
      }
    });
  };
  if (node.children) {
    traverse(node.children);
  }
  return keys;
};

// ============================================================================
// TreeNode Component
// ============================================================================

interface TreeNodeComponentProps {
  node: TreeNode;
  level: number;
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({ node, level }) => {
  const context = useContext(TreeContext);
  if (!context) return null;

  const {
    expandedKeys,
    selectedKeys,
    checkedKeys,
    checkable,
    selectable,
    showLine,
    showIcon,
    disabled: treeDisabled,
    blockNode,
    switcherIcon,
    icon,
    toggleExpanded,
    toggleSelected,
    toggleChecked,
  } = context;

  const isExpanded = expandedKeys.has(node.key);
  const isSelected = selectedKeys.has(node.key);
  const isChecked = checkedKeys.has(node.key);
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = node.isLeaf || !hasChildren;
  const isDisabled = treeDisabled || node.disabled;
  const isCheckable = checkable && node.checkable !== false;
  const isSelectable = selectable && node.selectable !== false;

  // Check if all/some children are checked for indeterminate state
  const childKeys = hasChildren ? getChildKeys(node) : [];
  const checkedChildCount = childKeys.filter(k => checkedKeys.has(k)).length;
  const isIndeterminate = checkedChildCount > 0 && checkedChildCount < childKeys.length;

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLeaf && !isDisabled) {
      toggleExpanded(node.key, node);
    }
  };

  const handleSelect = () => {
    if (isSelectable && !isDisabled) {
      toggleSelected(node.key, node);
    }
  };

  const handleCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCheckable && !isDisabled) {
      toggleChecked(node.key, node);
    }
  };

  const renderSwitcher = () => {
    if (isLeaf) {
      return showLine ? (
        <span className="w-[24px] h-[24px] flex items-center justify-center">
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--color-border-primary)]" />
        </span>
      ) : (
        <span className="w-[24px]" />
      );
    }

    const iconElement = switcherIcon
      ? typeof switcherIcon === 'function'
        ? switcherIcon({ expanded: isExpanded })
        : switcherIcon
      : (
        <Icon
          name={isExpanded ? 'chevron-down' : 'chevron-right'}
          size={16}
          className="text-[var(--color-tertiary)] transition-transform"
        />
      );

    return (
      <button
        type="button"
        onClick={handleExpand}
        className={cn(
          "w-[24px] h-[24px] flex items-center justify-center",
          "hover:bg-[var(--color-bg-secondary)] rounded transition-colors",
          isDisabled && "cursor-not-allowed opacity-50"
        )}
        disabled={isDisabled}
        aria-expanded={isExpanded}
      >
        {iconElement}
      </button>
    );
  };

  const renderIcon = () => {
    if (!showIcon) return null;

    let iconElement: React.ReactNode;

    if (node.icon) {
      if (typeof node.icon === 'string') {
        iconElement = <Icon name={node.icon as IconName} size={16} className="text-[var(--color-secondary)]" />;
      } else {
        iconElement = node.icon;
      }
    } else if (icon) {
      if (typeof icon === 'function') {
        iconElement = icon({ expanded: isExpanded, isLeaf });
      } else {
        iconElement = <Icon name={icon} size={16} className="text-[var(--color-secondary)]" />;
      }
    } else {
      iconElement = (
        <Icon
          name={isLeaf ? 'file' : isExpanded ? 'bundle' : 'bundle'}
          size={16}
          className="text-[var(--color-secondary)]"
        />
      );
    }

    return (
      <span className="mr-[var(--spacing-x1)]">
        {iconElement}
      </span>
    );
  };

  return (
    <div className="tree-node">
      <div
        className={cn(
          "flex items-center py-[var(--spacing-x1)] px-[var(--spacing-x1)]",
          "rounded transition-colors",
          isSelected && "bg-[var(--color-primary-light)] text-[var(--color-primary)]",
          !isSelected && !isDisabled && "hover:bg-[var(--color-bg-secondary)]",
          isDisabled && "opacity-50 cursor-not-allowed",
          blockNode && "w-full"
        )}
        style={{ paddingLeft: `${level * 24}px` }}
      >
        {/* Switcher */}
        {renderSwitcher()}

        {/* Checkbox */}
        {isCheckable && (
          <div className="mr-[var(--spacing-x1)]" onClick={handleCheck}>
            <Checkbox
              checked={isChecked}
              indeterminate={isIndeterminate}
              disabled={isDisabled}
              size="sm"
            />
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            "flex items-center flex-1 min-w-0",
            isSelectable && !isDisabled && "cursor-pointer"
          )}
          onClick={handleSelect}
        >
          {renderIcon()}
          <span className="truncate text-[var(--color-primary)]">
            {node.title}
          </span>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className={cn(showLine && "border-l border-[var(--color-border-secondary)] ml-[11px]")}>
          {node.children!.map(child => (
            <TreeNodeComponent
              key={child.key}
              node={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Tree Component
// ============================================================================

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({
    className,
    treeData,
    expandedKeys: controlledExpandedKeys,
    defaultExpandedKeys = [],
    selectedKeys: controlledSelectedKeys,
    defaultSelectedKeys = [],
    checkedKeys: controlledCheckedKeys,
    defaultCheckedKeys = [],
    checkable = false,
    selectable = true,
    multiple = false,
    showLine = false,
    showIcon = false,
    defaultExpandAll = false,
    onExpand,
    onSelect,
    onCheck,
    switcherIcon,
    icon,
    disabled = false,
    blockNode = false,
    ...props
  }, ref) => {
    // Initialize expanded keys
    const initialExpandedKeys = defaultExpandAll
      ? getAllKeys(treeData)
      : defaultExpandedKeys;

    const [internalExpandedKeys, setInternalExpandedKeys] = useState<Set<string>>(
      new Set(controlledExpandedKeys || initialExpandedKeys)
    );
    const [internalSelectedKeys, setInternalSelectedKeys] = useState<Set<string>>(
      new Set(controlledSelectedKeys || defaultSelectedKeys)
    );
    const [internalCheckedKeys, setInternalCheckedKeys] = useState<Set<string>>(
      new Set(controlledCheckedKeys || defaultCheckedKeys)
    );

    const expandedKeys = controlledExpandedKeys
      ? new Set(controlledExpandedKeys)
      : internalExpandedKeys;
    const selectedKeys = controlledSelectedKeys
      ? new Set(controlledSelectedKeys)
      : internalSelectedKeys;
    const checkedKeys = controlledCheckedKeys
      ? new Set(controlledCheckedKeys)
      : internalCheckedKeys;

    const toggleExpanded = useCallback((key: string, node: TreeNode) => {
      const newExpanded = new Set(expandedKeys);
      const wasExpanded = newExpanded.has(key);

      if (wasExpanded) {
        newExpanded.delete(key);
      } else {
        newExpanded.add(key);
      }

      if (!controlledExpandedKeys) {
        setInternalExpandedKeys(newExpanded);
      }
      onExpand?.(Array.from(newExpanded), { node, expanded: !wasExpanded });
    }, [expandedKeys, controlledExpandedKeys, onExpand]);

    const toggleSelected = useCallback((key: string, node: TreeNode) => {
      let newSelected: Set<string>;
      const wasSelected = selectedKeys.has(key);

      if (multiple) {
        newSelected = new Set(selectedKeys);
        if (wasSelected) {
          newSelected.delete(key);
        } else {
          newSelected.add(key);
        }
      } else {
        newSelected = wasSelected ? new Set() : new Set([key]);
      }

      if (!controlledSelectedKeys) {
        setInternalSelectedKeys(newSelected);
      }
      onSelect?.(Array.from(newSelected), { node, selected: !wasSelected });
    }, [selectedKeys, controlledSelectedKeys, multiple, onSelect]);

    const toggleChecked = useCallback((key: string, node: TreeNode) => {
      const newChecked = new Set(checkedKeys);
      const wasChecked = newChecked.has(key);

      if (wasChecked) {
        newChecked.delete(key);
        // Uncheck all children
        const childKeys = getChildKeys(node);
        childKeys.forEach(k => newChecked.delete(k));
      } else {
        newChecked.add(key);
        // Check all children
        const childKeys = getChildKeys(node);
        childKeys.forEach(k => newChecked.add(k));
      }

      if (!controlledCheckedKeys) {
        setInternalCheckedKeys(newChecked);
      }
      onCheck?.(Array.from(newChecked), { node, checked: !wasChecked });
    }, [checkedKeys, controlledCheckedKeys, onCheck]);

    const contextValue = useMemo<TreeContextValue>(() => ({
      expandedKeys,
      selectedKeys,
      checkedKeys,
      checkable,
      selectable,
      multiple,
      showLine,
      showIcon,
      disabled,
      blockNode,
      switcherIcon,
      icon,
      toggleExpanded,
      toggleSelected,
      toggleChecked,
    }), [
      expandedKeys, selectedKeys, checkedKeys, checkable, selectable,
      multiple, showLine, showIcon, disabled, blockNode, switcherIcon,
      icon, toggleExpanded, toggleSelected, toggleChecked
    ]);

    return (
      <TreeContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("tree", className)}
          role="tree"
          {...props}
        >
          {treeData.map(node => (
            <TreeNodeComponent
              key={node.key}
              node={node}
              level={0}
            />
          ))}
        </div>
      </TreeContext.Provider>
    );
  }
);

Tree.displayName = 'Tree';

export default Tree;

