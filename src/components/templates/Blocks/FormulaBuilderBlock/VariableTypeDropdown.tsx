"use client";

import React from 'react';
import type { FormulaBuilderState } from './useFormulaBuilderState';
import { VALUE_PICKER_CATEGORIES } from './FormulaBuilderBlock.constants';

interface VariableTypeDropdownProps {
  s: FormulaBuilderState;
}

export const VariableTypeDropdown: React.FC<VariableTypeDropdownProps> = ({ s }) => {
  if (s.pickerMode !== 'valueCategory' || !s.pickerPositions.valueCategory) return null;

  return (
    <div
      ref={s.variableTypeDropdownRef}
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
          minWidth: '12.5rem',
          maxHeight: '18.75rem',
          overflowY: 'auto',
        }}
      >
        {VALUE_PICKER_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              if (category.id === 'percentage-of-charge') {
                s.setPickerMode('valueInline');
                s.setActiveValueCategory(category.id);
                s.setSelectedVariableType(null);
              } else if (category.id === 'percentage-of-dimensions') {
                s.setPickerMode('valueCategory');
                s.setActiveValueCategory(category.id);
                s.setSelectedVariableType(null);
              } else {
                s.setSelectedVariableType(category.id);
                s.setPickerMode('valueOptions');
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
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};
