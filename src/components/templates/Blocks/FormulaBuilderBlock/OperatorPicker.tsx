"use client";

import React from 'react';
import ReactDOM from 'react-dom';
import type { FormulaBuilderState } from './useFormulaBuilderState';
import { MATH_OPERATORS } from './FormulaBuilderBlock.constants';

interface OperatorPickerProps {
  s: FormulaBuilderState;
}

export const OperatorPicker: React.FC<OperatorPickerProps> = ({ s }) => {
  if (s.pickerMode !== 'operator' || !s.pickerPositions.operator || !s.portalContainer) return null;

  const insideFunc = s.isInsideFunction();

  return ReactDOM.createPortal(
    <div
      ref={s.setPopoverRef}
      style={{
        position: 'fixed',
        top: s.pickerPositions.operator.top,
        left: s.pickerPositions.operator.left,
        zIndex: 10000,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-x4)',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-x4)',
          minWidth: '17.5rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x2)' }}>
          <span style={{ fontSize: 'var(--font-size-sm-rem)', fontWeight: 600, color: 'var(--tertiary)' }}>
            Mathematical operators
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-x3)' }}>
            {MATH_OPERATORS.map((op) => (
              <button
                key={op}
                onClick={() => s.handleOperatorPickerSelect('operator', op)}
                style={{
                  width: 'var(--spacing-x10)',
                  height: 'var(--spacing-x10)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-primary)',
                  fontSize: 'var(--font-size-md-rem)',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-primary)')}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        {!insideFunc && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x2)' }}>
            <span style={{ fontSize: 'var(--font-size-sm-rem)', fontWeight: 600, color: 'var(--tertiary)' }}>
              Conditions
            </span>
            <div style={{ display: 'flex', gap: 'var(--spacing-x3)', flexWrap: 'wrap' }}>
              <button
                onClick={() => s.handleOperatorPickerSelect('if-else')}
                style={{
                  padding: 'var(--spacing-x2) var(--spacing-x4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-primary)',
                  fontSize: 'var(--font-size-sm-rem)',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-secondary)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-primary)')}
              >
                If Else Condition
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    s.portalContainer
  );
};
