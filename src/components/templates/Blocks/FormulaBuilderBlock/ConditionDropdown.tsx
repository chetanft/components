"use client";

import React from 'react';
import ReactDOM from 'react-dom';
import type { FormulaBuilderState } from './useFormulaBuilderState';
import { LOGICAL_OPERATORS, CONDITION_OPERATORS, CONDITION_VARIABLES } from './FormulaBuilderBlock.constants';

interface ConditionDropdownProps {
  s: FormulaBuilderState;
}

export const ConditionDropdown: React.FC<ConditionDropdownProps> = ({ s }) => {
  if (!s.activeConditionDropdown || !s.pickerPositions.condition || !s.portalContainer) return null;

  const dropdownOptions = (() => {
    if (s.activeConditionDropdown.type === 'logical') return LOGICAL_OPERATORS;
    if (s.activeConditionDropdown.type === 'operator') return CONDITION_OPERATORS;
    return CONDITION_VARIABLES;
  })();

  return ReactDOM.createPortal(
    <div
      ref={s.setDropdownRef}
      style={{
        position: 'fixed',
        top: s.pickerPositions.condition.top,
        left: s.pickerPositions.condition.left,
        zIndex: 10000,
      }}
    >
      <div
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
        {dropdownOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              const field =
                s.activeConditionDropdown!.type === 'logical'
                  ? 'logicalOperator'
                  : s.activeConditionDropdown!.type;
              const value = option.value;
              s.handleUpdateCondition(
                s.activeConditionDropdown!.blockId,
                s.activeConditionDropdown!.conditionId,
                field,
                value
              );
              if (field === 'operator' || field === 'variable') {
                s.setPickerPositions(prev => ({ ...prev, condition: s.pickerPositions.condition }));
              }
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
