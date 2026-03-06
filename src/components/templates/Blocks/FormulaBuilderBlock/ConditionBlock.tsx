"use client";

import React from 'react';
import { Icon } from '../../../atoms/Icons';
import type { ConditionBlockData, ConditionRow } from './FormulaBuilderBlock.types';
import type { FormulaBuilderState } from './useFormulaBuilderState';
import { CONDITION_VARIABLES } from './FormulaBuilderBlock.constants';

interface ConditionRowProps {
  block: ConditionBlockData;
  condition: ConditionRow;
  index: number;
  s: FormulaBuilderState;
}

const ConditionRowItem: React.FC<ConditionRowProps> = ({ block, condition, index, s }) => {
  const isFirstCondition = index === 0;
  const canDelete = block.conditions.length > 1 || block.type !== 'if';
  const operatorValue = condition.operator || '>';
  const operatorLabel = s.getOperatorLabel(operatorValue);
  const isBetween = operatorValue === 'between';
  const isInList = operatorValue === 'in' || operatorValue === 'not-in';

  return (
    <div
      key={condition.id}
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        paddingRight: 'var(--spacing-x2)',
      }}
    >
      <div
        style={{
          borderRight: '1px solid var(--border-primary)',
          padding: 'var(--spacing-x2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'stretch',
          cursor: 'grab',
        }}
      >
        <Icon name="drag" size={16} style={{ color: 'var(--tertiary)' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 'var(--spacing-x2)', padding: 'var(--spacing-x2)', flexWrap: 'wrap' }}>
        {!isFirstCondition && (
          <button
            onClick={(event) => s.handleOpenConditionDropdown(event, block.id, condition.id, 'logical')}
            style={{
              minWidth: '4.375rem',
              height: 'var(--spacing-x8)',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '0 var(--spacing-x2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--primary)' }}>{condition.logicalOperator || 'And'}</span>
            <Icon name="chevron-down" size={14} style={{ color: 'var(--primary)' }} />
          </button>
        )}

        <button
          onClick={(event) => s.handleOpenConditionDropdown(event, block.id, condition.id, 'variable')}
          style={{
            minWidth: '8.125rem',
            height: 'var(--spacing-x8)',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '0 var(--spacing-x2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <span style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--primary)' }}>
            {CONDITION_VARIABLES.find(v => v.value === condition.variable)?.label || 'Select'}
          </span>
          <Icon name="chevron-down" size={14} style={{ color: 'var(--primary)' }} />
        </button>

        <button
          onClick={(event) => s.handleOpenConditionDropdown(event, block.id, condition.id, 'operator')}
          style={{
            minWidth: '3.125rem',
            height: 'var(--spacing-x8)',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '0 var(--spacing-x2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <span style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--primary)' }}>{operatorLabel}</span>
          <Icon name="chevron-down" size={14} style={{ color: 'var(--primary)' }} />
        </button>

        {isBetween ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-x1-5)',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '0 var(--spacing-x2)',
              height: 'var(--spacing-x8)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <input
              type="text"
              value={condition.value}
              onChange={(e) => s.handleUpdateCondition(block.id, condition.id, 'value', e.target.value)}
              placeholder="Value 1"
              style={{ width: 'var(--spacing-x15)', border: 'none', outline: 'none', fontSize: 'var(--font-size-sm-rem)', color: 'var(--primary)' }}
            />
            <span style={{ fontSize: 'var(--font-size-xs-rem)', color: 'var(--tertiary)' }}>AND</span>
            <input
              type="text"
              value={condition.valueTo || ''}
              onChange={(e) => s.handleUpdateCondition(block.id, condition.id, 'valueTo', e.target.value)}
              placeholder="Value 2"
              style={{ width: 'var(--spacing-x15)', border: 'none', outline: 'none', fontSize: 'var(--font-size-sm-rem)', color: 'var(--primary)' }}
            />
          </div>
        ) : isInList ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '0 var(--spacing-x2)',
              height: 'var(--spacing-x8)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <input
              type="text"
              value={condition.value}
              onChange={(e) => s.handleUpdateCondition(block.id, condition.id, 'value', e.target.value)}
              placeholder="item1, item2"
              style={{ width: '8.75rem', border: 'none', outline: 'none', fontSize: 'var(--font-size-sm-rem)', color: 'var(--primary)' }}
            />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <input
              type="text"
              value={condition.value}
              onChange={(e) => s.handleUpdateCondition(block.id, condition.id, 'value', e.target.value)}
              placeholder="Enter value"
              style={{
                width: '6.875rem',
                height: 'var(--spacing-x8)',
                border: 'none',
                outline: 'none',
                fontSize: 'var(--font-size-sm-rem)',
                color: 'var(--primary)',
                padding: '0 var(--spacing-x2)',
              }}
            />
          </div>
        )}

        <button
          onClick={(event) => s.handleOpenConditionValuePicker(event, block.id, condition.id)}
          style={{
            width: 'var(--spacing-x8)',
            height: 'var(--spacing-x8)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Icon name="edit" size={14} style={{ color: 'var(--primary)' }} />
        </button>
      </div>

      <button
        onClick={() => canDelete && s.handleDeleteCondition(block.id, condition.id)}
        style={{
          width: 'var(--spacing-x8)',
          height: 'var(--spacing-x8)',
          background: 'transparent',
          border: 'none',
          cursor: canDelete ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: canDelete ? 1 : 0.4,
        }}
      >
        <Icon name="delete" size={16} style={{ color: 'var(--border-primary)' }} />
      </button>
    </div>
  );
};

interface ConditionBlockProps {
  block: ConditionBlockData;
  s: FormulaBuilderState;
}

export const ConditionBlock: React.FC<ConditionBlockProps> = ({ block, s }) => {
  const blockLabel = block.type === 'if' ? 'If' : 'Else If';
  const canDelete = block.type === 'else-if';

  return (
    <div
      key={block.id}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-x5)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 'var(--font-size-md-rem)', fontWeight: 600, color: 'var(--primary)' }}>{blockLabel}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x2)' }}>
            <button
              onClick={() => s.handleAddCondition(block.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-x2)',
                padding: 'var(--spacing-x2) var(--spacing-x4)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Icon name="add" size={16} style={{ color: 'var(--primary)' }} />
              <span style={{ fontSize: 'var(--font-size-sm-rem)', fontWeight: 500, color: 'var(--primary)' }}>Add Condition</span>
            </button>
            {canDelete && (
              <button
                onClick={() => s.handleDeleteBlock(block.id)}
                style={{
                  width: 'var(--spacing-x8)',
                  height: 'var(--spacing-x8)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Icon name="delete" size={16} style={{ color: 'var(--critical)' }} />
              </button>
            )}
          </div>
        </div>

        {block.conditions.map((condition, index) => (
          <ConditionRowItem key={condition.id} block={block} condition={condition} index={index} s={s} />
        ))}
      </div>
    </div>
  );
};
