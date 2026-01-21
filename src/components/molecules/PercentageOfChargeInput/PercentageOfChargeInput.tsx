"use client";

import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { cn, type ComponentSize } from '../../../lib/utils';
import { Input, InputField } from '../../atoms/Input';
import { Icon } from '../../atoms/Icons';

export interface PercentageOfChargeInputProps {
  /**
   * Number value for the percentage
   */
  value?: string;
  /**
   * Selected charge label
   */
  selectedCharge?: string;
  /**
   * Options for the charge dropdown
   */
  chargeOptions: Array<{ value: string; label: string }>;
  /**
   * Callback when the number value changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Callback when the charge selection changes
   */
  onChargeChange?: (charge: string) => void;
  /**
   * Placeholder text for the dropdown
   * @default "Select charge"
   */
  placeholder?: string;
  /**
   * Component size
   * @default "md"
   */
  size?: ComponentSize;
  /**
   * Component state
   * @default "default"
   */
  state?: 'default' | 'error' | 'disabled';
  /**
   * Additional className
   */
  className?: string;
}

/**
 * PercentageOfChargeInput Component
 * 
 * A segmented input component with three sections:
 * - Number input (left)
 * - Percentage indicator "%" (middle)
 * - Charge selection dropdown (right)
 * 
 * @example
 * ```tsx
 * <PercentageOfChargeInput
 *   value="0"
 *   selectedCharge="Base freight"
 *   chargeOptions={[
 *     { value: 'base-freight', label: 'Base freight' },
 *     { value: 'fuel-surcharge', label: 'Fuel surcharge' }
 *   ]}
 *   onValueChange={(value) => console.log(value)}
 *   onChargeChange={(charge) => console.log(charge)}
 * />
 * ```
 */
export const PercentageOfChargeInput = React.forwardRef<
  HTMLDivElement,
  PercentageOfChargeInputProps
>(
  (
    {
      value = '0',
      selectedCharge,
      chargeOptions,
      onValueChange,
      onChargeChange,
      placeholder = 'Select charge',
      size = 'md',
      state = 'default',
      className,
    },
    ref
  ) => {
    // Size-based styles
    const sizeStyles = {
      sm: {
        height: '32px',
        fontSize: '14px',
        paddingX: '10px',
        paddingY: '0',
      },
      md: {
        height: '40px',
        fontSize: '14px',
        paddingX: '12px',
        paddingY: '0',
      },
      lg: {
        height: '48px',
        fontSize: '16px',
        paddingX: '16px',
        paddingY: '0',
      },
    }[size];

    const currentStyles = sizeStyles;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
    const dropdownButtonRef = useRef<HTMLButtonElement>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

    // Initialize portal container
    useEffect(() => {
      const container = document.createElement('div');
      container.id = 'percentage-charge-input-portal';
      document.body.appendChild(container);
      setPortalContainer(container);
      return () => {
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      };
    }, []);

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          isDropdownOpen &&
          dropdownMenuRef.current &&
          !dropdownMenuRef.current.contains(target) &&
          dropdownButtonRef.current &&
          !dropdownButtonRef.current.contains(target)
        ) {
          setIsDropdownOpen(false);
          setDropdownPosition(null);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    const handleDropdownToggle = () => {
      if (state === 'disabled') return;
      
      if (!isDropdownOpen && dropdownButtonRef.current) {
        const rect = dropdownButtonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.left,
        });
      }
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSelectCharge = (chargeLabel: string) => {
      onChargeChange?.(chargeLabel);
      setIsDropdownOpen(false);
      setDropdownPosition(null);
    };

    return (
      <>
        <div
          ref={ref}
          className={cn('flex items-stretch', className)}
          style={{
            height: '36px',
            borderRadius: 'var(--radius-md)',
            border: state === 'error' 
              ? '1px solid var(--critical)' 
              : '1px solid var(--border-primary)',
            overflow: 'hidden',
            backgroundColor: state === 'disabled' 
              ? 'var(--bg-secondary)' 
              : 'var(--bg-primary)',
          }}
        >
          {/* Number Input Segment (Left) */}
          <div
            style={{
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'stretch',
              borderRight: '1px solid var(--border-primary)',
            }}
          >
            <Input
              size={size}
              variant="default"
              disabled={state === 'disabled'}
              error={state === 'error' ? ' ' : undefined}
              className="h-full border-0 rounded-none focus:ring-0 focus:ring-offset-0"
            >
              <div
                className="w-full h-full border-0 rounded-none focus:ring-0 focus:ring-offset-0"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'stretch',
                  gap: 0,
                }}
              >
                <InputField
                  type="text"
                  inputMode="numeric"
                  value={value}
                  onChange={(e) => onValueChange?.(e.target.value)}
                  disabled={state === 'disabled'}
                  wrapperStyle={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: '8px',
                    flex: '0 0 auto',
                  }}
                  style={{
                    height: '100%',
                    padding: `${currentStyles.paddingY} ${currentStyles.paddingX}`,
                    fontSize: currentStyles.fontSize,
                    borderRadius: 0,
                    borderWidth: '1px',
                    borderColor: 'var(--border-primary)',
                    borderStyle: 'solid',
                    borderImage: 'none',
                  }}
                />
                {/* Percentage Indicator Segment (Middle) */}
                <div
                  style={{
                    flex: '0 0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: `0 ${currentStyles.paddingX}`,
                    fontSize: currentStyles.fontSize,
                    color: state === 'disabled' 
                      ? 'var(--tertiary)' 
                      : 'var(--secondary)',
                    fontWeight: 400,
                    whiteSpace: 'nowrap',
                  }}
                >
                  %
                </div>
              </div>
            </Input>
          </div>

          {/* Dropdown Segment (Right) */}
          <div
            style={{
              flex: '1 1 auto',
              minWidth: 0,
              position: 'relative',
              borderLeft: '1px solid var(--border-primary)',
            }}
          >
            <button
              ref={dropdownButtonRef}
              type="button"
              onClick={handleDropdownToggle}
              disabled={state === 'disabled'}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: `${currentStyles.paddingY} ${currentStyles.paddingX}`,
                fontSize: currentStyles.fontSize,
                backgroundColor: state === 'disabled' 
                  ? 'var(--bg-secondary)' 
                  : 'var(--bg-primary)',
                border: 'none',
                borderLeft: '1px solid var(--border-primary)',
                cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
                color: selectedCharge 
                  ? 'var(--primary)' 
                  : 'var(--tertiary)',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (state !== 'disabled') {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = state === 'disabled' 
                  ? 'var(--bg-secondary)' 
                  : 'var(--bg-primary)';
              }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: '1 1 auto', minWidth: 0 }}>
                {selectedCharge || placeholder}
              </span>
              <Icon 
                name="chevron-down" 
                size={14} 
                style={{ 
                  color: state === 'disabled' 
                    ? 'var(--tertiary)' 
                    : 'var(--secondary)',
                  flexShrink: 0,
                  marginLeft: '8px',
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }} 
              />
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && dropdownPosition && portalContainer && (
          ReactDOM.createPortal(
            <div
              ref={dropdownMenuRef}
              style={{
                position: 'fixed',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                zIndex: 10000,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                  minWidth: '200px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                }}
              >
                {chargeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelectCharge(option.label)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: 'var(--primary)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>,
            portalContainer
          )
        )}
      </>
    );
  }
);

PercentageOfChargeInput.displayName = 'PercentageOfChargeInput';
