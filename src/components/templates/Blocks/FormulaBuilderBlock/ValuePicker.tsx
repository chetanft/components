"use client";

import React from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '../../../atoms/Icons';
import { PercentageOfChargeInput } from '../../../molecules/PercentageOfChargeInput';
import type { FormulaBuilderState } from './useFormulaBuilderState';
import {
  VALUE_PICKER_CATEGORIES,
  CHARGE_OPTIONS,
  DIMENSION_OPTIONS,
  NUMERIC_DIMENSIONS,
  FUNCTION_OPTIONS,
  WRAPPER_FUNCTIONS,
  AGGREGATOR_FUNCTIONS,
} from './FormulaBuilderBlock.constants';

interface ValuePickerProps {
  s: FormulaBuilderState;
}

export const ValuePicker: React.FC<ValuePickerProps> = ({ s }) => {
  if (s.pickerMode !== 'valueCategory' || !s.portalContainer || !s.pickerPositions.valueCategory) return null;

  const renderCategoryHeader = (title: string) => (
    <div
      style={{
        padding: 'var(--spacing-x2-5) var(--spacing-x4)',
        borderBottom: '1px solid var(--border-secondary)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-x2)',
      }}
    >
      <button
        onClick={() => {
          s.setActiveValueCategory(null);
          s.setActiveSubDropdown(null);
          s.setPickerPositions(prev => ({ ...prev, valueOptions: undefined }));
        }}
        style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: 'var(--primary)',
        }}
      >
        ←
      </button>
      <span style={{ fontSize: 'var(--font-size-sm-rem)', fontWeight: 600, color: 'var(--primary)' }}>{title}</span>
    </div>
  );

  const renderDropdownButton = (
    placeholder: string,
    selectedValue: string | null,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  ) => (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: 'var(--spacing-x2-5) var(--spacing-x4)',
        margin: 'var(--spacing-x2) var(--spacing-x4)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        fontSize: 'var(--font-size-sm-rem)',
        color: selectedValue ? 'var(--primary)' : 'var(--tertiary)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-primary)'; }}
    >
      <span>{selectedValue || placeholder}</span>
      <Icon name="chevron-down" size={14} style={{ color: 'var(--secondary)' }} />
    </button>
  );

  const renderSubDropdown = (options: Array<{ value: string; label: string }>, onSelect: (label: string) => void) => {
    if (!s.activeSubDropdown || !s.pickerPositions.valueOptions || !s.portalContainer) return null;

    return ReactDOM.createPortal(
      <div
        ref={s.setSubDropdownRef}
        style={{
          position: 'fixed',
          top: s.pickerPositions.valueOptions.top,
          left: s.pickerPositions.valueOptions.left,
          zIndex: 10001,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            minWidth: '12.5rem',
            maxHeight: '18.75rem',
            overflowY: 'auto',
          }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSelect(option.label);
                s.setActiveSubDropdown(null);
                s.setPickerPositions(prev => ({ ...prev, valueOptions: undefined }));
                s.setPickerMode('none');
              }}
              style={{
                width: '100%',
                padding: 'var(--spacing-x2-5) var(--spacing-x4)',
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm-rem)',
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
      s.portalContainer
    );
  };

  const renderCategoryContent = () => {
    if (!s.activeValueCategory) {
      return (
        <>
          {VALUE_PICKER_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => s.setActiveValueCategory(category.id)}
              style={{
                width: '100%',
                padding: 'var(--spacing-x2-5) var(--spacing-x4)',
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm-rem)',
                color: 'var(--primary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {category.label}
            </button>
          ))}
        </>
      );
    }

    if (s.activeValueCategory === 'charges') {
      return (
        <>
          {renderCategoryHeader('Charges')}
          {renderDropdownButton('Select charge', null, (e) => s.handleOpenSubDropdown('charges', e.currentTarget))}
          {renderSubDropdown(CHARGE_OPTIONS, (label) => s.handleInsertValueToken(label, 'charge'))}
        </>
      );
    }

    if (s.activeValueCategory === 'dimensions') {
      return (
        <>
          {renderCategoryHeader('Dimensions')}
          {renderDropdownButton('Select dimension', null, (e) => s.handleOpenSubDropdown('dimensions', e.currentTarget))}
          {renderSubDropdown(DIMENSION_OPTIONS, (label) => s.handleInsertValueToken(label, 'dimension'))}
        </>
      );
    }

    if (s.activeValueCategory === 'functions') {
      return (
        <>
          {renderCategoryHeader('Functions')}
          {renderDropdownButton('Select function', null, (e) => s.handleOpenSubDropdown('functions', e.currentTarget))}
          {renderSubDropdown(FUNCTION_OPTIONS, (label) => {
            const functionName = label.split('(')[0].trim();
            const isWrapper = WRAPPER_FUNCTIONS.some(f => f.value === functionName);
            const isAggregator = AGGREGATOR_FUNCTIONS.some(f => f.value === functionName);

            if (isWrapper) {
              s.handleInsertWrapperFunction(functionName);
            } else if (isAggregator) {
              s.handleInsertAggregatorFunction(functionName);
            }
          })}
        </>
      );
    }

    if (s.activeValueCategory === 'percentage-of-charge') {
      return (
        <>
          {renderCategoryHeader('Percentage of Value')}
          <div style={{ padding: 'var(--spacing-x3) var(--spacing-x4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x3)' }}>
            <PercentageOfChargeInput
              value={s.percentageOfChargeValue}
              selectedCharge={s.percentageOfChargeTarget || undefined}
              chargeOptions={[...CHARGE_OPTIONS, ...NUMERIC_DIMENSIONS]}
              onValueChange={(val) => s.setPercentageOfChargeValue(val)}
              onChargeChange={(charge) => s.setPercentageOfChargeTarget(charge)}
              placeholder="Select charge"
              size="md"
            />
            <button
              onClick={() => {
                if (s.percentageOfChargeValue && s.percentageOfChargeTarget) {
                  s.handleInsertValueToken(
                    `${s.percentageOfChargeValue}% of ${s.percentageOfChargeTarget}`,
                    'percentage',
                    { percentageValue: s.percentageOfChargeValue, percentageTarget: s.percentageOfChargeTarget }
                  );
                  s.setPercentageOfChargeValue('0');
                  s.setPercentageOfChargeTarget('');
                }
              }}
              disabled={!s.percentageOfChargeValue || !s.percentageOfChargeTarget}
              style={{
                height: 'var(--spacing-x8)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-primary)',
                backgroundColor: (!s.percentageOfChargeValue || !s.percentageOfChargeTarget)
                  ? 'var(--bg-secondary)'
                  : 'var(--bg-primary)',
                fontSize: 'var(--font-size-sm-rem)',
                color: (!s.percentageOfChargeValue || !s.percentageOfChargeTarget)
                  ? 'var(--tertiary)'
                  : 'var(--primary)',
                cursor: (!s.percentageOfChargeValue || !s.percentageOfChargeTarget)
                  ? 'not-allowed'
                  : 'pointer',
              }}
            >
              Insert
            </button>
          </div>
        </>
      );
    }

    if (s.activeValueCategory === 'percentage-of-dimensions') {
      return (
        <>
          {renderCategoryHeader('Percentage of Dimensions')}
          <div style={{ padding: 'var(--spacing-x3) var(--spacing-x4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x2-5)' }}>
            <input
              type="text"
              value={s.percentageOfDimensionValue}
              onChange={(e) => s.setPercentageOfDimensionValue(e.target.value)}
              style={{
                height: 'var(--spacing-x8)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-primary)',
                padding: '0 var(--spacing-x2-5)',
                fontSize: 'var(--font-size-sm-rem)',
                color: 'var(--primary)',
              }}
            />
            <select
              value={s.percentageOfDimensionTarget}
              onChange={(e) => s.setPercentageOfDimensionTarget(e.target.value)}
              style={{
                height: 'var(--spacing-x8)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-primary)',
                padding: '0 var(--spacing-x2-5)',
                fontSize: 'var(--font-size-sm-rem)',
                color: 'var(--primary)',
              }}
            >
              {NUMERIC_DIMENSIONS.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                s.handleInsertValueToken(
                  `${s.percentageOfDimensionValue}% of ${s.percentageOfDimensionTarget}`,
                  'percentage',
                  { percentageValue: s.percentageOfDimensionValue, percentageTarget: s.percentageOfDimensionTarget }
                )
              }
              style={{
                height: 'var(--spacing-x8)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-primary)',
                backgroundColor: 'var(--bg-primary)',
                fontSize: 'var(--font-size-sm-rem)',
                color: 'var(--primary)',
                cursor: 'pointer',
              }}
            >
              Insert
            </button>
          </div>
        </>
      );
    }

    if (s.activeValueCategory === 'constant') {
      return (
        <>
          {renderCategoryHeader('Constant')}
          <div style={{ padding: 'var(--spacing-x3) var(--spacing-x4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x2-5)' }}>
            <input
              type="text"
              value={s.constantValue}
              onChange={(e) => s.setConstantValue(e.target.value)}
              style={{
                height: 'var(--spacing-x8)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-primary)',
                padding: '0 var(--spacing-x2-5)',
                fontSize: 'var(--font-size-sm-rem)',
                color: 'var(--primary)',
              }}
            />
            <button
              onClick={() => s.handleInsertValueToken(s.constantValue || '0', 'constant')}
              style={{
                height: 'var(--spacing-x8)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-primary)',
                backgroundColor: 'var(--bg-primary)',
                fontSize: 'var(--font-size-sm-rem)',
                color: 'var(--primary)',
                cursor: 'pointer',
              }}
            >
              Insert
            </button>
          </div>
        </>
      );
    }

    return null;
  };

  return ReactDOM.createPortal(
    <div
      ref={s.setDropdownRef}
      style={{
        position: 'fixed',
        top: s.pickerPositions.valueCategory.top,
        left: s.pickerPositions.valueCategory.left,
        zIndex: 10000,
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)',
          minWidth: '15rem',
          maxHeight: '20rem',
          overflowY: 'auto',
        }}
      >
        {renderCategoryContent()}
      </div>
    </div>,
    s.portalContainer
  );
};
