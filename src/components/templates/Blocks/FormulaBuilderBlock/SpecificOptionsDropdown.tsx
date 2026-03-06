"use client";

import React from 'react';
import type { FormulaBuilderState } from './useFormulaBuilderState';
import {
  CHARGE_OPTIONS,
  DIMENSION_OPTIONS,
  FUNCTION_OPTIONS,
  WRAPPER_FUNCTIONS,
  AGGREGATOR_FUNCTIONS,
} from './FormulaBuilderBlock.constants';

interface SpecificOptionsDropdownProps {
  s: FormulaBuilderState;
}

export const SpecificOptionsDropdown: React.FC<SpecificOptionsDropdownProps> = ({ s }) => {
  if (s.pickerMode !== 'valueOptions' || !s.selectedVariableType || !s.pickerPositions.valueOptions) return null;

  const getPlaceholderText = () => {
    switch (s.selectedVariableType) {
      case 'charges': return 'Select charge';
      case 'dimensions': return 'Select dimension';
      case 'functions': return 'Select function';
      case 'constant': return 'Enter constant';
      case 'percentage-of-charge': return 'Select percentage of charge';
      case 'percentage-of-dimensions': return 'Select percentage of dimension';
      default: return 'Select option';
    }
  };

  const getOptions = () => {
    switch (s.selectedVariableType) {
      case 'charges': return CHARGE_OPTIONS;
      case 'dimensions': return DIMENSION_OPTIONS;
      case 'functions': return FUNCTION_OPTIONS;
      default: return [];
    }
  };

  const options = getOptions();

  if (s.selectedVariableType === 'constant') {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <input
          type="text"
          value={s.constantValue}
          onChange={(e) => s.setConstantValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && s.constantValue.trim()) {
              s.handleInsertValueToken(s.constantValue.trim(), 'constant');
            }
            if (e.key === 'Escape') {
              s.setSelectedVariableType(null);
              s.setPickerMode('none');
              s.setPickerPositions(prev => ({ ...prev, valueOptions: undefined }));
            }
          }}
          onBlur={() => {
            if (s.constantValue.trim()) {
              s.handleInsertValueToken(s.constantValue.trim(), 'constant');
            } else {
              s.setSelectedVariableType(null);
              s.setPickerMode('none');
              s.setPickerPositions(prev => ({ ...prev, valueOptions: undefined }));
            }
          }}
          style={{
            height: 'var(--spacing-x8)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-primary)',
            padding: '0 var(--spacing-x3)',
            fontSize: 'var(--font-size-sm-rem)',
            color: 'var(--primary)',
            minWidth: '9.375rem',
          }}
          placeholder={getPlaceholderText()}
          autoFocus
        />
      </div>
    );
  }

  if (s.selectedVariableType === 'percentage-of-charge' || s.selectedVariableType === 'percentage-of-dimensions') {
    return null;
  }

  return (
    <div
      ref={s.specificOptionsPlaceholderRef}
      style={{
        position: 'fixed',
        top: s.pickerPositions.valueOptions?.top || 0,
        left: s.pickerPositions.valueOptions?.left || 0,
        zIndex: 10000,
      }}
    >
      <div
        ref={s.specificOptionsDropdownRef}
        style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)',
          padding: 'var(--spacing-x2) 0',
          minWidth: '12.5rem',
          maxHeight: '16.25rem',
          overflowY: 'auto',
        }}
      >
        {options.map((option) => {
          const valueType = s.selectedVariableType === 'charges' ? 'charge' :
                           s.selectedVariableType === 'dimensions' ? 'dimension' :
                           s.selectedVariableType === 'functions' ? 'function' : undefined;
          return (
            <button
              key={option.value}
              onClick={() => {
                if (valueType === 'function') {
                  const functionName = option.label.split('(')[0].trim();
                  const isWrapper = WRAPPER_FUNCTIONS.some(f => f.value === functionName);
                  const isAggregator = AGGREGATOR_FUNCTIONS.some(f => f.value === functionName);

                  if (isWrapper) {
                    s.handleInsertWrapperFunction(functionName);
                  } else if (isAggregator) {
                    s.handleInsertAggregatorFunction(functionName);
                  }
                } else {
                  s.handleInsertValueToken(option.label, valueType);
                }
                s.closePicker();
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
          );
        })}
      </div>
    </div>
  );
};
