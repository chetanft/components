"use client";

import React from 'react';
import { Icon } from '../../../atoms/Icons';
import type { FormulaBuilderState } from './useFormulaBuilderState';

interface FormulaTokenDisplayProps {
  s: FormulaBuilderState;
}

export const FormulaTokenDisplay: React.FC<FormulaTokenDisplayProps> = ({ s }) => {
  if (s.formulaTokens.length === 0) {
    return <span style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--tertiary)' }}>Add a value</span>;
  }

  return (
    <>
      {s.formulaTokens.map((token) => {
        if (token.valueType === 'percentage' && token.meta?.percentageValue) {
          return (
            <div
              key={token.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-primary)',
              }}
            >
              <input
                type="text"
                value={token.meta.percentageValue}
                readOnly
                style={{
                  width: 'var(--spacing-x14)',
                  height: '2.125rem',
                  border: 'none',
                  padding: '0 var(--spacing-x2-5)',
                  fontSize: 'var(--font-size-sm-rem)',
                  color: 'var(--primary)',
                }}
              />
              <div
                style={{
                  height: '2.125rem',
                  padding: '0 var(--spacing-x2-5)',
                  display: 'flex',
                  alignItems: 'center',
                  borderLeft: '1px solid var(--border-primary)',
                  borderRight: '1px solid var(--border-primary)',
                  fontSize: 'var(--font-size-sm-rem)',
                  color: 'var(--secondary)',
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                %
              </div>
              <button
                type="button"
                style={{
                  height: '2.125rem',
                  padding: '0 var(--spacing-x3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-x2)',
                  border: 'none',
                  backgroundColor: 'var(--bg-primary)',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--primary)' }}>
                  {token.meta.percentageTarget || 'Invoice value'}
                </span>
                <Icon name="chevron-down" size={14} style={{ color: 'var(--secondary)' }} />
              </button>
            </div>
          );
        }

        if (token.kind === 'value') {
          return (
            <button
              key={token.id}
              type="button"
              onClick={(e) => s.handleOpenTokenDropdown(token.id, e.currentTarget)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-x2-5)',
                padding: '0 var(--spacing-x3)',
                borderRadius: 'var(--spacing-x2)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-primary)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm-rem)',
                color: 'var(--primary)',
                fontWeight: 400,
                lineHeight: '1.4',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                height: 'var(--spacing-x9)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-primary)'; }}
            >
              <span style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--primary)', fontWeight: 400 }}>{token.label}</span>
              <Icon name="chevron-down" size={14} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
            </button>
          );
        }

        return (
          <span
            key={token.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: 'var(--spacing-x1-5) var(--spacing-x2-5)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-secondary)',
              fontSize: 'var(--font-size-sm-rem)',
              color: 'var(--primary)',
              border: '1px solid var(--border-primary)',
              height: 'var(--spacing-x8)',
              width: 'var(--spacing-x8)',
            }}
          >
            {token.label}
          </span>
        );
      })}
    </>
  );
};
