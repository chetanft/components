"use client";

import React from 'react';
import ReactDOM from 'react-dom';
import { PercentageOfChargeInput } from '../../../molecules/PercentageOfChargeInput';
import type { FormulaToken } from './FormulaBuilderBlock.types';
import type { FormulaBuilderState } from './useFormulaBuilderState';
import {
  CHARGE_OPTIONS,
  DIMENSION_OPTIONS,
  NUMERIC_DIMENSIONS,
  WRAPPER_FUNCTIONS,
  AGGREGATOR_FUNCTIONS,
} from './FormulaBuilderBlock.constants';

interface TokenEditDropdownProps {
  s: FormulaBuilderState;
}

export const TokenEditDropdown: React.FC<TokenEditDropdownProps> = ({ s }) => {
  if (s.pickerMode !== 'tokenEdit' || !s.editingTokenId || !s.pickerPositions.tokenEdit || !s.portalContainer) return null;

  const editingToken = s.formulaTokens.find(t => t.id === s.editingTokenId);
  if (!editingToken || editingToken.kind !== 'value') return null;

  if (editingToken.valueType === 'percentage' && editingToken.meta?.percentageValue) {
    return ReactDOM.createPortal(
      <div
        ref={s.setTokenDropdownRef}
        style={{
          position: 'fixed',
          top: s.pickerPositions.tokenEdit.top,
          left: s.pickerPositions.tokenEdit.left,
          zIndex: 10000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            padding: 'var(--spacing-x3) var(--spacing-x4)',
            minWidth: '17.5rem',
          }}
        >
          <div style={{ marginBottom: 'var(--spacing-x3)', fontSize: 'var(--font-size-sm-rem)', fontWeight: 600, color: 'var(--primary)' }}>
            Edit Percentage
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x3)' }}>
            <PercentageOfChargeInput
              value={s.editingPercentageValue}
              selectedCharge={s.editingPercentageTarget || undefined}
              chargeOptions={[...CHARGE_OPTIONS, ...NUMERIC_DIMENSIONS]}
              onValueChange={(val) => s.setEditingPercentageValue(val)}
              onChargeChange={(charge) => s.setEditingPercentageTarget(charge)}
              placeholder="Select charge"
              size="md"
            />
            <div style={{ display: 'flex', gap: 'var(--spacing-x2)' }}>
              <button
                onClick={() => {
                  if (s.editingPercentageValue && s.editingPercentageTarget) {
                    const newLabel = `${s.editingPercentageValue}% of ${s.editingPercentageTarget}`;
                    const meta = { percentageValue: s.editingPercentageValue, percentageTarget: s.editingPercentageTarget };
                    s.handleUpdateToken(s.editingTokenId!, newLabel, 'percentage', meta);
                    s.setEditingPercentageValue('');
                    s.setEditingPercentageTarget('');
                  }
                }}
                disabled={!s.editingPercentageValue || !s.editingPercentageTarget}
                style={{
                  flex: 1,
                  height: 'var(--spacing-x8)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: (!s.editingPercentageValue || !s.editingPercentageTarget)
                    ? 'var(--bg-secondary)'
                    : 'var(--bg-primary)',
                  fontSize: 'var(--font-size-sm-rem)',
                  color: (!s.editingPercentageValue || !s.editingPercentageTarget)
                    ? 'var(--tertiary)'
                    : 'var(--primary)',
                  cursor: (!s.editingPercentageValue || !s.editingPercentageTarget)
                    ? 'not-allowed'
                    : 'pointer',
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  s.setEditingTokenId(null);
                  s.setPickerMode('none');
                  s.setPickerPositions(prev => ({ ...prev, tokenEdit: undefined }));
                  s.setEditingPercentageValue('');
                  s.setEditingPercentageTarget('');
                }}
                style={{
                  height: 'var(--spacing-x8)',
                  padding: '0 var(--spacing-x4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-primary)',
                  fontSize: 'var(--font-size-sm-rem)',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>,
      s.portalContainer
    );
  }

  if (editingToken.valueType === 'constant') {
    return ReactDOM.createPortal(
      <div
        ref={s.setTokenDropdownRef}
        style={{
          position: 'fixed',
          top: s.pickerPositions.tokenEdit.top,
          left: s.pickerPositions.tokenEdit.left,
          zIndex: 10000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            padding: 'var(--spacing-x3) var(--spacing-x4)',
            minWidth: '12.5rem',
          }}
        >
          <div style={{ marginBottom: 'var(--spacing-x3)', fontSize: 'var(--font-size-sm-rem)', fontWeight: 600, color: 'var(--primary)' }}>
            Edit Constant
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x3)' }}>
            <input
              type="text"
              value={s.editingConstantValue}
              onChange={(e) => s.setEditingConstantValue(e.target.value)}
              style={{
                height: 'var(--spacing-x8)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-primary)',
                padding: '0 var(--spacing-x2-5)',
                fontSize: 'var(--font-size-sm-rem)',
                color: 'var(--primary)',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && s.editingConstantValue.trim()) {
                  s.handleUpdateToken(s.editingTokenId!, s.editingConstantValue.trim(), 'constant');
                  s.setEditingConstantValue('');
                }
                if (e.key === 'Escape') {
                  s.setEditingTokenId(null);
                  s.setPickerMode('none');
                  s.setPickerPositions(prev => ({ ...prev, tokenEdit: undefined }));
                  s.setEditingConstantValue('');
                }
              }}
            />
            <div style={{ display: 'flex', gap: 'var(--spacing-x2)' }}>
              <button
                onClick={() => {
                  if (s.editingConstantValue.trim()) {
                    s.handleUpdateToken(s.editingTokenId!, s.editingConstantValue.trim(), 'constant');
                    s.setEditingConstantValue('');
                  }
                }}
                disabled={!s.editingConstantValue.trim()}
                style={{
                  flex: 1,
                  height: 'var(--spacing-x8)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: !s.editingConstantValue.trim()
                    ? 'var(--bg-secondary)'
                    : 'var(--bg-primary)',
                  fontSize: 'var(--font-size-sm-rem)',
                  color: !s.editingConstantValue.trim()
                    ? 'var(--tertiary)'
                    : 'var(--primary)',
                  cursor: !s.editingConstantValue.trim()
                    ? 'not-allowed'
                    : 'pointer',
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  s.setEditingTokenId(null);
                  s.setPickerMode('none');
                  s.setPickerPositions(prev => ({ ...prev, tokenEdit: undefined }));
                  s.setEditingConstantValue('');
                }}
                style={{
                  height: 'var(--spacing-x8)',
                  padding: '0 var(--spacing-x4)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-primary)',
                  fontSize: 'var(--font-size-sm-rem)',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>,
      s.portalContainer
    );
  }

  const getAllValueOptions = () => {
    const allOptions: Array<{ label: string; valueType?: FormulaToken['valueType']; meta?: FormulaToken['meta'] }> = [];

    CHARGE_OPTIONS.forEach(opt => {
      allOptions.push({ label: opt.label, valueType: 'charge' });
    });

    DIMENSION_OPTIONS.forEach(opt => {
      allOptions.push({ label: opt.label, valueType: 'dimension' });
    });

    allOptions.push({ label: 'Constant', valueType: 'constant' });

    WRAPPER_FUNCTIONS.forEach(opt => {
      allOptions.push({
        label: opt.label,
        valueType: 'function',
        meta: { functionType: 'wrapper', functionName: opt.value }
      });
    });
    AGGREGATOR_FUNCTIONS.forEach(opt => {
      allOptions.push({
        label: opt.label,
        valueType: 'function',
        meta: { functionType: 'aggregator', functionName: opt.value }
      });
    });

    return allOptions;
  };

  return ReactDOM.createPortal(
    <div
      ref={s.setTokenDropdownRef}
      style={{
        position: 'fixed',
        top: s.pickerPositions.tokenEdit.top,
        left: s.pickerPositions.tokenEdit.left,
        zIndex: 10000,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          minWidth: '12.5rem',
          maxHeight: '18.75rem',
          overflowY: 'auto',
        }}
      >
        {getAllValueOptions().map((option) => (
          <button
            key={option.label}
            onClick={() => s.handleUpdateToken(s.editingTokenId!, option.label, option.valueType, option.meta)}
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
