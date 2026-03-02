"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { TreeProvider } from './TreeContext';
import type { TreeNodeData } from './TreeTypes';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import type { IconName } from '../../atoms/Icons';

export interface TreeProps extends Omit<ComposableProps<'div'>, 'onSelect'> {
  /**
   * Expanded keys (controlled)
   */
  expandedKeys?: string[];
  /**
   * Default expanded keys
   */
  defaultExpandedKeys?: string[];
  /**
   * Selected keys (controlled)
   */
  selectedKeys?: string[];
  /**
   * Default selected keys
   */
  defaultSelectedKeys?: string[];
  /**
   * Checked keys (controlled)
   */
  checkedKeys?: string[];
  /**
   * Default checked keys
   */
  defaultCheckedKeys?: string[];
  /**
   * Whether to show checkboxes
   * @default false
   */
  checkable?: boolean;
  /**
   * Whether nodes are selectable
   * @default true
   */
  selectable?: boolean;
  /**
   * Whether to allow multiple selection
   * @default false
   */
  multiple?: boolean;
  /**
   * Whether to show connecting lines
   * @default false
   */
  showLine?: boolean;
  /**
   * Whether to show icons
   * @default false
   */
  showIcon?: boolean;
  /**
   * Default expand all nodes
   * @default false
   */
  defaultExpandAll?: boolean;
  /**
   * Callback when node is expanded/collapsed
   */
  onExpand?: (expandedKeys: string[], info: { node: TreeNodeData; expanded: boolean }) => void;
  /**
   * Callback when node is selected
   */
  onSelect?: (selectedKeys: string[], info: { node: TreeNodeData; selected: boolean }) => void;
  /**
   * Callback when node is checked
   */
  onCheck?: (checkedKeys: string[], info: { node: TreeNodeData; checked: boolean }) => void;
  /**
   * Custom expand/collapse icon
   */
  switcherIcon?: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode);
  /**
   * Custom node icon
   */
  icon?: IconName | ((props: { expanded: boolean; isLeaf: boolean }) => React.ReactNode);
  /**
   * Disabled entire tree
   * @default false
   */
  disabled?: boolean;
  /**
   * Block node (full width clickable)
   * @default false
   */
  blockNode?: boolean;
  /**
   * Enable glassmorphism effect on tree background
   * - `true`: Standard glass effect
   * - `'subtle'`: Subtle glass effect
   * - `'prominent'`: Prominent glass effect
   */
  glass?: GlassVariant;
  /**
   * Tree content (composable TreeNode children)
   */
  children?: React.ReactNode;
}

// ============================================================================
// Tree Component
// ============================================================================

/**
 * Tree Component
 *
 * A tree component for displaying hierarchical data.
 * Uses composable TreeNode sub-components for maximum flexibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Tree checkable selectable>
 *   <TreeNode nodeKey="1" title="Node 1">
 *     <TreeNode nodeKey="1-1" title="Child 1" />
 *   </TreeNode>
 * </Tree>
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (TreeNode, TreeNodeSwitcher, etc.) support `asChild`
 * - Supports selection, checking, and expansion
 */
export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({
    className,
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
    glass,
    children,
    asChild,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);

    const [internalExpandedKeys, setInternalExpandedKeys] = useState<Set<string>>(
      new Set(controlledExpandedKeys || defaultExpandedKeys)
    );
    const [internalSelectedKeys, setInternalSelectedKeys] = useState<Set<string>>(
      new Set(controlledSelectedKeys || defaultSelectedKeys)
    );
    const [internalCheckedKeys, setInternalCheckedKeys] = useState<Set<string>>(
      new Set(controlledCheckedKeys || defaultCheckedKeys)
    );

    const expandedKeys = useMemo(
      () =>
        controlledExpandedKeys
          ? new Set(controlledExpandedKeys)
          : internalExpandedKeys,
      [controlledExpandedKeys, internalExpandedKeys]
    );
    const selectedKeys = useMemo(
      () =>
        controlledSelectedKeys
          ? new Set(controlledSelectedKeys)
          : internalSelectedKeys,
      [controlledSelectedKeys, internalSelectedKeys]
    );
    const checkedKeys = useMemo(
      () =>
        controlledCheckedKeys
          ? new Set(controlledCheckedKeys)
          : internalCheckedKeys,
      [controlledCheckedKeys, internalCheckedKeys]
    );

    const toggleExpanded = useCallback((key: string, node: TreeNodeData) => {
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

    const toggleSelected = useCallback((key: string, node: TreeNodeData) => {
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

    const toggleChecked = useCallback((key: string, node: TreeNodeData) => {
      const newChecked = new Set(checkedKeys);
      const wasChecked = newChecked.has(key);

      if (wasChecked) {
        newChecked.delete(key);
      } else {
        newChecked.add(key);
      }

      if (!controlledCheckedKeys) {
        setInternalCheckedKeys(newChecked);
      }
      onCheck?.(Array.from(newChecked), { node, checked: !wasChecked });
    }, [checkedKeys, controlledCheckedKeys, onCheck]);

    const contextValue = useMemo(() => ({
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
      glass: resolvedGlass,
      toggleExpanded,
      toggleSelected,
      toggleChecked,
    }), [
      expandedKeys, selectedKeys, checkedKeys, checkable, selectable,
      multiple, showLine, showIcon, disabled, blockNode, switcherIcon,
      icon, resolvedGlass, toggleExpanded, toggleSelected, toggleChecked
    ]);

    const Comp = asChild ? Slot : 'div';
    return (
      <TreeProvider value={contextValue}>
        <Comp
          ref={ref}
          className={cn("tree", resolvedGlass && getGlassClasses(resolvedGlass), className)}
          role="tree"
          {...props}
        >
          {children}
        </Comp>
      </TreeProvider>
    );
  }
);

Tree.displayName = 'Tree';

export default Tree;
