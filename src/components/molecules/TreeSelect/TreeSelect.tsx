"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { cn, getComponentStyles, type ComponentSize } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Label } from '../../atoms/Label/Label';
import { Tree, TreeNodeData } from '../Tree/Tree';
import { Chicklet } from '../Chicklet/Chicklet';

// ============================================================================
// Types
// ============================================================================

export interface TreeSelectProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value'> {
  /** Label text */
  label?: string;
  /** Whether the field is mandatory */
  labelMandatory?: boolean;
  /** Whether to show optional indicator */
  labelOptional?: boolean;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Component size */
  size?: ComponentSize;
  /** Tree data */
  treeData: TreeNodeData[];
  /** Selected value(s) */
  value?: string | string[];
  /** Default value(s) */
  defaultValue?: string | string[];
  /** Callback when selection changes */
  onChange?: (value: string | string[], labels: React.ReactNode[]) => void;
  /** Allow multiple selection */
  multiple?: boolean;
  /** Show checkboxes (implies multiple) */
  treeCheckable?: boolean;
  /** Allow searching */
  showSearch?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Allow clearing selection */
  allowClear?: boolean;
  /** Show tree lines */
  showLine?: boolean;
  /** Default expand all */
  defaultExpandAll?: boolean;
  /** Dropdown placement */
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
}

// ============================================================================
// Helper Functions
// ============================================================================

const findNode = (nodes: TreeNodeData[], key: string): TreeNodeData | null => {
  for (const node of nodes) {
    if (node.key === key) return node;
    if (node.children) {
      const found = findNode(node.children, key);
      if (found) return found;
    }
  }
  return null;
};

const filterTreeData = (nodes: TreeNodeData[], searchValue: string): TreeNodeData[] => {
  if (!searchValue) return nodes;

  const search = searchValue.toLowerCase();

  const filter = (items: TreeNodeData[]): TreeNodeData[] => {
    return items.reduce<TreeNodeData[]>((acc, node) => {
      const titleMatch = typeof node.title === 'string' &&
        node.title.toLowerCase().includes(search);

      const filteredChildren = node.children ? filter(node.children) : [];

      if (titleMatch || filteredChildren.length > 0) {
        acc.push({
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : node.children,
        });
      }

      return acc;
    }, []);
  };

  return filter(nodes);
};

// ============================================================================
// TreeSelect Component
// ============================================================================

export const TreeSelect = React.forwardRef<HTMLInputElement, TreeSelectProps>(
  ({
    className,
    label,
    labelMandatory = false,
    labelOptional = false,
    error,
    helperText,
    size = 'md',
    treeData,
    value: controlledValue,
    defaultValue,
    onChange,
    multiple = false,
    treeCheckable = false,
    showSearch = false,
    placeholder = 'Select...',
    allowClear = true,
    showLine = false,
    defaultExpandAll = false,
    placement = 'bottomLeft',
    disabled,
    id,
    ...props
  }, ref) => {
    const componentStyles = getComponentStyles(size);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

    const isMultiple = multiple || treeCheckable;

    // Handle value state
    const [internalValue, setInternalValue] = useState<string[]>(() => {
      const val = controlledValue ?? defaultValue;
      if (!val) return [];
      return Array.isArray(val) ? val : [val];
    });

    const selectedKeys = useMemo(() => (
      controlledValue !== undefined
        ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue])
        : internalValue
    ), [controlledValue, internalValue]);

    // Get labels for selected values
    const selectedLabels = useMemo(() => {
      return selectedKeys.map(key => {
        const node = findNode(treeData, key);
        return node?.title || key;
      });
    }, [selectedKeys, treeData]);

    // Filter tree data for search
    const filteredTreeData = useMemo(() =>
      filterTreeData(treeData, searchValue),
      [treeData, searchValue]
    );

    // Portal setup
    useEffect(() => {
      if (typeof document !== 'undefined') {
        let container = document.getElementById('treeselect-portal-container');
        if (!container) {
          container = document.createElement('div');
          container.id = 'treeselect-portal-container';
          document.body.appendChild(container);
        }
        setPortalContainer(container);
      }
    }, []);

    // Update dropdown position
    useEffect(() => {
      if (isOpen && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isTop = placement.startsWith('top');
        const alignRight = placement.endsWith('Right');

        setDropdownPosition({
          top: isTop ? rect.top - 4 : rect.bottom + 4,
          left: alignRight ? rect.right - rect.width : rect.left,
          width: rect.width,
        });
      }
    }, [isOpen, placement]);

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const portal = document.getElementById('treeselect-portal-container');
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node) &&
          (!portal || !portal.contains(event.target as Node))
        ) {
          setIsOpen(false);
          setSearchValue('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleSelect = useCallback((keys: string[]) => {
      const labels = keys.map(key => {
        const node = findNode(treeData, key);
        return node?.title || key;
      });

      if (controlledValue === undefined) {
        setInternalValue(keys);
      }

      onChange?.(isMultiple ? keys : keys[0], labels);

      if (!isMultiple) {
        setIsOpen(false);
        setSearchValue('');
      }
    }, [treeData, controlledValue, onChange, isMultiple]);

    const handleTreeSelect = useCallback((keys: string[]) => {
      if (isMultiple) {
        handleSelect(keys);
      } else {
        handleSelect(keys.slice(-1)); // Take only the last selected
      }
    }, [isMultiple, handleSelect]);

    const handleClear = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      handleSelect([]);
    }, [handleSelect]);

    const handleRemoveTag = useCallback((key: string, e: React.MouseEvent) => {
      e.stopPropagation();
      handleSelect(selectedKeys.filter(k => k !== key));
    }, [selectedKeys, handleSelect]);

    const generatedId = React.useId();
    const inputId = id || `treeselect-${generatedId}`;

    const inputStyles = cn(
      "w-full transition-all duration-200 cursor-pointer",
      "flex items-center flex-wrap gap-[var(--spacing-x1)]",
      "font-sans font-normal",
      "placeholder:text-placeholder dark:placeholder:text-placeholder-dark",
      componentStyles.height,
      componentStyles.fontSize,
      componentStyles.borderRadius,
      "px-[var(--spacing-x3)] pr-[var(--spacing-x8)]",
      "bg-surface dark:bg-surface-dark border-2 border-border dark:border-border-dark",
      "hover:border-[var(--primary)] dark:hover:border-[var(--primary)]",
      disabled
        ? "bg-surface-alt dark:bg-surface-alt-dark border-border-disabled cursor-not-allowed"
        : error
          ? "border-critical focus:border-critical"
          : "focus:border-primary dark:focus:border-primary-dark",
      isOpen && "border-primary dark:border-primary-dark",
      "focus:outline-none"
    );

    const displayValue = isMultiple
      ? ''
      : selectedLabels[0] || '';

    return (
      <div ref={ref} className={cn("w-full space-y-2", className)} {...props}>
        {label && (
          <div>
            <Label
              htmlFor={inputId}
              mandatory={labelMandatory}
              optional={labelOptional}
            >
              {label}
            </Label>
          </div>
        )}

        <div className="relative" ref={containerRef}>
          <div
            className={inputStyles}
            onClick={() => !disabled && setIsOpen(true)}
          >
            {/* Selected tags for multiple mode */}
            {isMultiple && selectedKeys.length > 0 && (
              <div className="flex flex-wrap gap-[var(--spacing-x1)] flex-1 min-w-0">
                {selectedKeys.map(key => {
                  const node = findNode(treeData, key);
                  return (
                    <Chicklet
                      key={key}
                      label={node?.title || key}
                      showClose={!disabled}
                      onClose={(e) => {
                        if (e) {
                          handleRemoveTag(key, e);
                        }
                      }}
                      className="shrink-0"
                      variant="rectangular"
                    />
                  );
                })}
              </div>
            )}

            {showSearch && isOpen ? (
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={placeholder}
                className={cn(
                  "bg-transparent border-none outline-none",
                  isMultiple && selectedKeys.length > 0 ? "flex-1 min-w-[120px]" : "w-full"
                )}
                autoFocus
              />
            ) : (
              !isMultiple || selectedKeys.length === 0 ? (
                <span className={cn(!displayValue && "text-placeholder")}>
                  {displayValue || placeholder}
                </span>
              ) : null
            )}
          </div>

          <div className="absolute right-0 top-0 h-full flex items-center pr-[var(--spacing-x3)]">
            <Icon
              name={isOpen ? 'chevron-up' : 'chevron-down'}
              size={componentStyles.iconSize}
              className="text-[var(--color-tertiary)]"
            />
          </div>
        </div>

        {(helperText || error) && (
          <p className={cn(
            "text-sm",
            error ? "text-critical" : "text-helper dark:text-helper-dark"
          )}>
            {error || helperText}
          </p>
        )}

        {/* Dropdown */}
        {isOpen && !disabled && portalContainer && ReactDOM.createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => {
                setIsOpen(false);
                setSearchValue('');
              }}
            />
            <div
              className={cn(
                "fixed z-[9999] bg-[var(--color-bg-primary)] rounded-[var(--radius-md)]",
                "border border-[var(--color-border-secondary)]",
                "max-h-[300px] overflow-auto p-[var(--spacing-x2)]"
              )}
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                minWidth: dropdownPosition.width,
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              {filteredTreeData.length > 0 ? (
                <Tree
                  treeData={filteredTreeData}
                  selectedKeys={treeCheckable ? undefined : selectedKeys}
                  checkedKeys={treeCheckable ? selectedKeys : undefined}
                  checkable={treeCheckable}
                  selectable={!treeCheckable}
                  multiple={isMultiple}
                  showLine={showLine}
                  defaultExpandAll={defaultExpandAll}
                  onSelect={(keys) => handleTreeSelect(keys)}
                  onCheck={(keys) => handleTreeSelect(keys)}
                />
              ) : (
                <div className="p-[var(--spacing-x4)] text-center text-[var(--color-tertiary)]">
                  No results found
                </div>
              )}
            </div>
          </>,
          portalContainer
        )}
      </div>
    );
  }
);

TreeSelect.displayName = 'TreeSelect';

export default TreeSelect;
