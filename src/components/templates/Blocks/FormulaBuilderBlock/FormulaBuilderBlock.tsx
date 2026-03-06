"use client";

import React from 'react';
import { cn } from '../../../../lib/utils';
import { Icon } from '../../../atoms/Icons';
import { PercentageOfChargeInput } from '../../../molecules/PercentageOfChargeInput';
import type { FormulaBuilderBlockProps } from './FormulaBuilderBlock.types';
import { CHARGE_OPTIONS, NUMERIC_DIMENSIONS } from './FormulaBuilderBlock.constants';
import { useFormulaBuilderState } from './useFormulaBuilderState';
import { VariableTypeDropdown } from './VariableTypeDropdown';
import { SpecificOptionsDropdown } from './SpecificOptionsDropdown';
import { ValuePicker } from './ValuePicker';
import { OperatorPicker } from './OperatorPicker';
import { ConditionDropdown } from './ConditionDropdown';
import { TokenEditDropdown } from './TokenEditDropdown';
import { FormulaTokenDisplay } from './FormulaTokenDisplay';
import { ConditionBlock } from './ConditionBlock';

export const FormulaBuilderBlock: React.FC<FormulaBuilderBlockProps> = (props) => {
  const s = useFormulaBuilderState(props);

  const renderInlinePercentage = () => (
    <PercentageOfChargeInput
      value={s.percentageOfChargeValue}
      selectedCharge={s.percentageOfChargeTarget || undefined}
      chargeOptions={[...CHARGE_OPTIONS, ...NUMERIC_DIMENSIONS]}
      onValueChange={(val) => s.setPercentageOfChargeValue(val)}
      onChargeChange={(charge) => s.setPercentageOfChargeTarget(charge)}
      placeholder="Select charge"
      size="md"
    />
  );

  const renderEditButton = (size: string = 'var(--spacing-x8)', iconSize: number = 14, extra?: React.CSSProperties) => (
    <button
      ref={s.addButtonRef}
      onClick={(e) => s.openPickerForNextToken(e.currentTarget)}
      style={{
        width: size,
        height: size,
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        ...extra,
      }}
    >
      <Icon name="edit" size={iconSize} style={{ color: 'var(--primary)' }} />
    </button>
  );

  return (
    <div
      className={cn(props.className)}
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: s.isCollapsed ? 'none' : '1px solid var(--border-primary)',
          padding: 'var(--spacing-x4) var(--spacing-x5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-x4)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x4)', flex: 1, minWidth: '12.5rem' }}>
          <button
            onClick={() => s.setIsCollapsed(!s.isCollapsed)}
            style={{
              width: 'var(--spacing-x10)',
              height: 'var(--spacing-x10)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 'var(--font-size-lg-rem)', color: 'var(--primary)', fontWeight: 400 }}>{s.isCollapsed ? '+' : '−'}</span>
          </button>
          <span
            style={{
              fontSize: 'var(--font-size-sm-rem)',
              fontWeight: 600,
              color: 'var(--primary)',
              lineHeight: '1.4',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={s.getFormulaDisplayText()}
          >
            {s.getFormulaDisplayText()}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x2)', flexWrap: 'wrap' }}>
          <button
            onClick={s.handleReset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-x1-5)',
              padding: 'var(--spacing-x2) var(--spacing-x3)',
              background: 'transparent',
              border: 'none',
              borderRadius: '62.5rem',
              cursor: 'pointer',
            }}
          >
            <Icon name="refresh" size={16} style={{ color: 'var(--critical)' }} />
            <span style={{ fontSize: 'var(--font-size-sm-rem)', fontWeight: 500, color: 'var(--critical)' }}>Reset</span>
          </button>
          <button
            onClick={s.handleValidate}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-x1-5)',
              padding: 'var(--spacing-x2) var(--spacing-x3)',
              background: 'transparent',
              border: 'none',
              borderRadius: '62.5rem',
              cursor: 'pointer',
            }}
          >
            <Icon name="check" size={16} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: 'var(--font-size-sm-rem)', fontWeight: 500, color: 'var(--primary)' }}>Validate</span>
          </button>
          <button
            onClick={s.handleSave}
            style={{
              padding: 'var(--spacing-x2) var(--spacing-x3)',
              background: 'transparent',
              border: 'none',
              borderRadius: '62.5rem',
              cursor: s.isDirty ? 'pointer' : 'default',
            }}
          >
            <span style={{ fontSize: 'var(--font-size-sm-rem)', fontWeight: 500, color: s.isDirty ? 'var(--primary)' : 'var(--border-primary)' }}>
              Save Charge
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      {!s.isCollapsed && (
        <div style={{ padding: 'var(--spacing-x5)' }}>
          {/* EMPTY STATE */}
          {s.state === 'empty' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x3)', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'var(--font-size-xl-rem)', fontWeight: 600, color: 'var(--primary)' }}>{s.label} =</span>
              {s.selectedVariableType && s.pickerMode === 'valueOptions' && (
                <>
                  <SpecificOptionsDropdown s={s} />
                  {renderEditButton('var(--spacing-x9)', 16, { marginLeft: 'var(--spacing-x3)' })}
                </>
              )}
              {s.showInlinePercentageOfCharge && renderInlinePercentage()}
              {!s.showSpecificOptionsDropdown && !s.showInlinePercentageOfCharge && (
                renderEditButton('var(--spacing-x9)', 16)
              )}
            </div>
          )}

          {/* FORMULA INPUT STATE */}
          {s.state === 'formula-input' && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-x4)', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'var(--font-size-xl-rem)', fontWeight: 600, color: 'var(--primary)', lineHeight: 'var(--spacing-x8)' }}>{s.label} =</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x2)', flexWrap: 'wrap' }}>
                <FormulaTokenDisplay s={s} />

                {s.selectedVariableType && s.pickerMode === 'valueOptions' && (
                  <>
                    <SpecificOptionsDropdown s={s} />
                    <button
                      onClick={(e) => s.openPickerForNextToken(e.currentTarget)}
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
                        marginLeft: 'var(--spacing-x3)',
                      }}
                    >
                      <Icon name="edit" size={14} style={{ color: 'var(--primary)' }} />
                    </button>
                  </>
                )}
                {s.showInlinePercentageOfCharge && (
                  <>
                    {renderInlinePercentage()}
                    <button
                      onClick={(e) => {
                        s.setPickerMode('none');
                        s.setActiveValueCategory(null);
                        s.setSelectedVariableType(null);
                        s.setPercentageOfChargeValue('0');
                        s.setPercentageOfChargeTarget('');
                        s.openPickerForNextToken(e.currentTarget);
                      }}
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
                  </>
                )}
                {!s.showSpecificOptionsDropdown && !s.showInlinePercentageOfCharge && (
                  <button
                    onClick={(e) => s.openPickerForNextToken(e.currentTarget)}
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
                )}
              </div>
            </div>
          )}

          {/* WITH CONDITIONS STATE */}
          {s.state === 'with-conditions' && (
            <div style={{ display: 'flex', gap: 'var(--spacing-x4)' }}>
              <div style={{ flexShrink: 0 }}>
                <span style={{ fontSize: 'var(--font-size-xl-rem)', fontWeight: 600, color: 'var(--primary)', lineHeight: '1.4' }}>
                  {s.label.split(' ').map((word, i) => (
                    <span key={i}>
                      {word}
                      {i < s.label.split(' ').length - 1 && <br />}
                    </span>
                  ))}
                </span>
                <span style={{ fontSize: 'var(--font-size-xl-rem)', fontWeight: 600, color: 'var(--primary)' }}> =</span>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x2)', flexWrap: 'wrap' }}>
                  <FormulaTokenDisplay s={s} />
                  {s.showInlinePercentageOfCharge && renderInlinePercentage()}
                  {!s.showInlinePercentageOfCharge && (
                    <button
                      onClick={(e) => s.openPickerForNextToken(e.currentTarget)}
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
                  )}
                </div>

                {s.conditions.map(block => (
                  <ConditionBlock key={block.id} block={block} s={s} />
                ))}

                <button
                  onClick={s.handleAddElseIf}
                  style={{
                    width: 'fit-content',
                    height: 'var(--spacing-x10)',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--spacing-x2)',
                    padding: '0 var(--spacing-x5)',
                    cursor: 'pointer',
                  }}
                >
                  <Icon name="add" size={16} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontSize: 'var(--font-size-sm-rem)', fontWeight: 500, color: 'var(--primary)' }}>Add Else If</span>
                </button>

                <div
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--spacing-x5)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 'var(--font-size-md-rem)', fontWeight: 600, color: 'var(--primary)' }}>Else</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x2)' }}>
                      <span style={{ fontSize: 'var(--font-size-md-rem)', fontWeight: 600, color: 'var(--primary)' }}>{s.label} =</span>
                      <input
                        type="text"
                        value={s.elseBlock.value}
                        onChange={(e) => {
                          s.setElseBlock({ ...s.elseBlock, value: e.target.value });
                          s.setIsDirty(true);
                        }}
                        style={{
                          width: 'var(--spacing-x15)',
                          height: 'var(--spacing-x8)',
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-primary)',
                          borderRadius: 'var(--radius-md)',
                          padding: '0 var(--spacing-x2)',
                          fontSize: 'var(--font-size-sm-rem)',
                          color: 'var(--primary)',
                          outline: 'none',
                        }}
                      />
                      <button
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
                  </div>
                </div>

                <button
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
            </div>
          )}
        </div>
      )}

      {/* Render Dropdowns/Popovers */}
      <ValuePicker s={s} />
      <OperatorPicker s={s} />
      <ConditionDropdown s={s} />
      <TokenEditDropdown s={s} />
      <VariableTypeDropdown s={s} />
    </div>
  );
};
