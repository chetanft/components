"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo, useId } from 'react';
import ReactDOM from 'react-dom';
import { cn, getComponentStyles, type ComponentSize } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Label } from '../../atoms/Label/Label';

// ============================================================================
// Types
// ============================================================================

export interface CascaderOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  children?: CascaderOption[];
  isLeaf?: boolean;
}

export interface CascaderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value'> {
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
  /** Cascader options */
  options: CascaderOption[];
  /** Selected value path */
  value?: string[];
  /** Default value path */
  defaultValue?: string[];
  /** Callback when selection changes */
  onChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Allow clearing selection */
  allowClear?: boolean;
  /** Expand trigger */
  expandTrigger?: 'click' | 'hover';
  /** Display render function */
  displayRender?: (labels: React.ReactNode[], selectedOptions: CascaderOption[]) => React.ReactNode;
  /** Change on select (not just leaf nodes) */
  changeOnSelect?: boolean;
  /** Show search */
  showSearch?: boolean;
}

// ============================================================================
// Helper Functions
// ============================================================================

const findOptionPath = (options: CascaderOption[], values: string[]): CascaderOption[] => {
  const path: CascaderOption[] = [];
  let currentOptions = options;

  for (const value of values) {
    const found = currentOptions.find(opt => opt.value === value);
    if (found) {
      path.push(found);
      currentOptions = found.children || [];
    } else {
      break;
    }
  }

  return path;
};

const flattenOptions = (options: CascaderOption[], path: CascaderOption[] = []): { path: CascaderOption[]; option: CascaderOption }[] => {
  const result: { path: CascaderOption[]; option: CascaderOption }[] = [];

  for (const option of options) {
    const currentPath = [...path, option];
    if (!option.children || option.children.length === 0) {
      result.push({ path: currentPath, option });
    } else {
      result.push(...flattenOptions(option.children, currentPath));
    }
  }

  return result;
};

// ============================================================================
// CascaderColumn Component
// ============================================================================

interface CascaderColumnProps {
  options: CascaderOption[];
  selectedValue?: string;
  onSelect: (option: CascaderOption) => void;
  onHover?: (option: CascaderOption) => void;
  expandTrigger: 'click' | 'hover';
}

const CascaderColumn: React.FC<CascaderColumnProps> = ({
  options,
  selectedValue,
  onSelect,
  onHover,
  expandTrigger,
}) => {
  return (
    <div className="min-w-[160px] max-h-[256px] overflow-y-auto border-r border-solid border-[var(--border-primary)] last:border-r-0">
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        const hasChildren = option.children && option.children.length > 0;

        return (
          <div
            key={option.value}
            className={cn(
              "box-border flex items-center relative transition-colors duration-200",
              "gap-[10px] p-[var(--x3,12px)] rounded-[var(--x2,8px)]",
              isSelected && "bg-[var(--bg-secondary)]",
              !isSelected && !option.disabled && "hover:bg-[var(--border-secondary)] cursor-pointer",
              option.disabled && "bg-[var(--bg-primary)] cursor-not-allowed opacity-60"
            )}
            onClick={() => !option.disabled && onSelect(option)}
            onMouseEnter={() => expandTrigger === 'hover' && !option.disabled && onHover?.(option)}
          >
            <span className={cn(
              "truncate font-normal leading-[1.4] relative shrink-0",
              isSelected ? "text-[var(--primary)]" : option.disabled ? "text-[var(--tertiary)]" : "text-[var(--primary)]"
            )} style={{
              fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
              fontWeight: '400',
              fontSize: '16px',
            }}>
              {option.label}
            </span>
            {hasChildren && (
              <Icon name="chevron-right" size={14} className="text-[var(--tertiary)] ml-2 flex-shrink-0" />
            )}
          </div>
        );
      })}
    </div>
  );
};

// ============================================================================
// Cascader Component
// ============================================================================

export const Cascader = React.forwardRef<HTMLInputElement, CascaderProps>(
  ({
    className,
    label,
    labelMandatory = false,
    labelOptional = false,
    error,
    helperText,
    size = 'md',
    options = [],
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder = 'Please select',
    allowClear = true,
    expandTrigger = 'click',
    displayRender,
    changeOnSelect = false,
    showSearch = false,
    disabled,
    id,
    ...props
  }, ref) => {
    // All hooks must be called first, before any other logic
    const cascaderId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [internalValue, setInternalValue] = useState<string[]>(
      controlledValue ?? defaultValue ?? []
    );
    const [activeValues, setActiveValues] = useState<string[]>([]);
    
    // Then call non-hook functions
    const componentStyles = getComponentStyles(size);

    const selectedValues = controlledValue !== undefined ? controlledValue : internalValue;
    const selectedOptions = useMemo(() => 
      findOptionPath(options, selectedValues), 
      [options, selectedValues]
    );

    // Get active columns based on activeValues
    const columns = useMemo(() => {
      const cols: CascaderOption[][] = [options];
      let currentOptions = options;

      for (const value of activeValues) {
        const found = currentOptions.find(opt => opt.value === value);
        if (found?.children) {
          cols.push(found.children);
          currentOptions = found.children;
        }
      }

      return cols;
    }, [options, activeValues]);

    // Search results
    const searchResults = useMemo(() => {
      if (!searchValue) return [];
      const flatOptions = flattenOptions(options);
      const search = searchValue.toLowerCase();
      return flatOptions.filter(({ path }) =>
        path.some(opt => 
          typeof opt.label === 'string' && opt.label.toLowerCase().includes(search)
        )
      );
    }, [options, searchValue]);

    // Portal setup
    useEffect(() => {
      if (typeof document !== 'undefined') {
        let container = document.getElementById('cascader-portal-container');
        if (!container) {
          container = document.createElement('div');
          container.id = 'cascader-portal-container';
          document.body.appendChild(container);
        }
        setPortalContainer(container);
      }
    }, []);

    // Update dropdown position
    useEffect(() => {
      if (isOpen && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.left,
        });
      }
    }, [isOpen]);

    // Reset active values when opening
    useEffect(() => {
      if (isOpen) {
        setActiveValues(selectedValues);
      }
    }, [isOpen, selectedValues]);

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const portal = document.getElementById('cascader-portal-container');
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

    const handleSelect = useCallback((option: CascaderOption, columnIndex: number) => {
      const newActiveValues = [...activeValues.slice(0, columnIndex), option.value];
      setActiveValues(newActiveValues);

      const hasChildren = option.children && option.children.length > 0;
      const isLeaf = option.isLeaf === true || !hasChildren;

      if (isLeaf || changeOnSelect) {
        const newOptions = findOptionPath(options, newActiveValues);
        
        if (controlledValue === undefined) {
          setInternalValue(newActiveValues);
        }
        onChange?.(newActiveValues, newOptions);

        if (isLeaf) {
          setIsOpen(false);
          setSearchValue('');
        }
      }
    }, [activeValues, options, controlledValue, onChange, changeOnSelect]);

    const handleHover = useCallback((option: CascaderOption, columnIndex: number) => {
      if (expandTrigger === 'hover') {
        const newActiveValues = [...activeValues.slice(0, columnIndex), option.value];
        setActiveValues(newActiveValues);
      }
    }, [activeValues, expandTrigger]);

    const handleSearchSelect = useCallback((path: CascaderOption[]) => {
      const values = path.map(opt => opt.value);
      
      if (controlledValue === undefined) {
        setInternalValue(values);
      }
      onChange?.(values, path);
      setIsOpen(false);
      setSearchValue('');
    }, [controlledValue, onChange]);

    const handleClear = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      if (controlledValue === undefined) {
        setInternalValue([]);
      }
      onChange?.([], []);
    }, [controlledValue, onChange]);

    const inputId = id || `cascader-${cascaderId}`;

    const inputStyles = cn(
      "w-full transition-all duration-200 cursor-pointer",
      "font-sans font-normal",
      componentStyles.height,
      componentStyles.fontSize,
      componentStyles.borderRadius,
      "px-[var(--spacing-x2)] py-[var(--spacing-x2)]",
      "bg-surface dark:bg-surface-dark border-2 border-border dark:border-border-dark",
      "hover:border-[var(--primary)] dark:hover:border-[var(--primary)]",
      disabled
        ? "bg-surface-alt cursor-not-allowed"
        : error
        ? "border-critical"
        : "",
      isOpen && "border-primary dark:border-primary-dark",
      "focus:outline-none",
      "flex items-center justify-between"
    );

    // Display value
    const displayValue = useMemo(() => {
      if (selectedOptions.length === 0) return '';
      const labels = selectedOptions.map(opt => opt.label);
      if (displayRender) {
        return displayRender(labels, selectedOptions);
      }
      return labels.join(' / ');
    }, [selectedOptions, displayRender]);

    return (
      <div className={cn("w-full space-y-2", className)}>
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
            <div className="flex-1 min-w-0">
              {showSearch && isOpen ? (
                <input
                  ref={ref}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-transparent border-none outline-none"
                  autoFocus
                />
              ) : (
                <span className={cn(!displayValue && "text-placeholder dark:text-placeholder-dark")}>
                  {displayValue || placeholder}
                </span>
              )}
            </div>
            <div className="flex items-center gap-[var(--spacing-x1)] flex-shrink-0">
              {allowClear && selectedValues.length > 0 && !disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-[var(--color-tertiary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <Icon name="cross" size={componentStyles.iconSize - 4} />
                </button>
              )}
              <Icon
                name={isOpen ? 'chevron-up' : 'chevron-down'}
                size={componentStyles.iconSize}
                className="text-[var(--color-tertiary)]"
              />
            </div>
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
                "fixed z-[9999] bg-[var(--bg-primary)] border border-solid border-[var(--border-primary)]",
                "box-border flex flex-col items-start overflow-clip p-[var(--x2,8px)]",
                "rounded-[var(--x2,8px)] shadow-lg"
              )}
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
              }}
            >
              {showSearch && searchValue ? (
                // Search results
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative shrink-0 max-h-[256px] overflow-y-auto min-w-[200px]">
                  {searchResults.length > 0 ? (
                    searchResults.map(({ path }, index) => (
                      <div
                        key={index}
                        className={cn(
                          "box-border flex items-center relative transition-colors duration-200",
                          "gap-[10px] p-[var(--x3,12px)] rounded-[var(--x2,8px)]",
                          "hover:bg-[var(--border-secondary)] cursor-pointer"
                        )}
                        onClick={() => handleSearchSelect(path)}
                      >
                        <span className="font-normal leading-[1.4] relative shrink-0 text-[var(--primary)]" style={{
                          fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
                          fontWeight: '400',
                          fontSize: '16px',
                        }}>
                          {path.map(opt => opt.label).join(' / ')}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-[var(--x3,12px)] py-[var(--x4,16px)] text-center text-[var(--tertiary)] font-normal leading-[1.4]" style={{
                      fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
                      fontWeight: '400',
                      fontSize: '16px',
                    }}>
                      No results found
                    </div>
                  )}
                </div>
              ) : (
                // Cascading columns
                <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
                  {columns.map((columnOptions, columnIndex) => (
                    <CascaderColumn
                      key={columnIndex}
                      options={columnOptions}
                      selectedValue={activeValues[columnIndex]}
                      onSelect={(option) => handleSelect(option, columnIndex)}
                      onHover={(option) => handleHover(option, columnIndex)}
                      expandTrigger={expandTrigger}
                    />
                  ))}
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

Cascader.displayName = 'Cascader';

export default Cascader;

