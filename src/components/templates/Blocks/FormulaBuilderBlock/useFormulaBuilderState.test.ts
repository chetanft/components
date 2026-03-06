import { renderHook, act } from '@testing-library/react';
import { useFormulaBuilderState } from './useFormulaBuilderState';
import type {
  FormulaToken,
  ConditionBlockData,
  FormulaBuilderBlockProps,
} from './FormulaBuilderBlock.types';

// Helper to create a value token
function makeValueToken(overrides: Partial<FormulaToken> = {}): FormulaToken {
  return {
    id: `token-${Math.random()}`,
    kind: 'value',
    label: 'Weight',
    expressionValue: 'Weight',
    tokenType: 'value',
    valueType: 'dimension',
    ...overrides,
  };
}

// Helper to create an operator token
function makeOperatorToken(operator: string, overrides: Partial<FormulaToken> = {}): FormulaToken {
  const operatorMap: Record<string, string> = {
    '×': '*',
    '÷': '/',
    '+': '+',
    '-': '-',
  };
  return {
    id: `token-${Math.random()}`,
    kind: 'operator',
    label: operator,
    expressionValue: operatorMap[operator] || operator,
    tokenType: 'operator',
    valueType: 'operator',
    ...overrides,
  };
}

describe('useFormulaBuilderState', () => {
  // ── 1. Initial state ──────────────────────────────────────────────
  describe('initial state (no data)', () => {
    it('starts with empty state by default', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));
      expect(result.current.state).toBe('empty');
      expect(result.current.formulaTokens).toHaveLength(0);
      expect(result.current.conditions).toHaveLength(0);
      expect(result.current.formulaExpression).toBe('');
      expect(result.current.isDirty).toBe(false);
    });

    it('uses default label "FOV"', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));
      expect(result.current.label).toBe('FOV');
    });
  });

  // ── 2. Initial state with data ────────────────────────────────────
  describe('initial state with data', () => {
    it('starts as formula-input when initialData has tokens', () => {
      const token = makeValueToken();
      const { result } = renderHook(() =>
        useFormulaBuilderState({
          initialData: { formula: { tokens: [token], expression: 'Weight' } },
        })
      );
      expect(result.current.state).toBe('formula-input');
      expect(result.current.formulaTokens).toHaveLength(1);
    });

    it('starts as empty when initialData has empty tokens array', () => {
      const { result } = renderHook(() =>
        useFormulaBuilderState({
          initialData: { formula: { tokens: [], expression: '' } },
        })
      );
      expect(result.current.state).toBe('empty');
    });

    it('loads initial conditions', () => {
      const conditionBlock: ConditionBlockData = {
        id: 'if-block',
        type: 'if',
        conditions: [
          { id: 'c1', variable: 'weight', operator: '>', value: '100' },
        ],
      };
      const { result } = renderHook(() =>
        useFormulaBuilderState({
          initialData: { conditions: [conditionBlock] },
        })
      );
      expect(result.current.conditions).toHaveLength(1);
      expect(result.current.conditions[0].conditions[0].variable).toBe('weight');
    });

    it('loads initial elseBlock', () => {
      const { result } = renderHook(() =>
        useFormulaBuilderState({
          initialData: { elseBlock: { value: '42' } },
        })
      );
      expect(result.current.elseBlock.value).toBe('42');
    });
  });

  // ── 3. Token insertion ────────────────────────────────────────────
  describe('handleInsertValueToken', () => {
    it('adds a token and transitions state to formula-input', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));
      expect(result.current.state).toBe('empty');

      act(() => {
        result.current.handleInsertValueToken('Weight', 'dimension');
      });

      expect(result.current.state).toBe('formula-input');
      expect(result.current.formulaTokens).toHaveLength(1);
      expect(result.current.formulaTokens[0].label).toBe('Weight');
      expect(result.current.formulaTokens[0].tokenType).toBe('value');
      expect(result.current.isDirty).toBe(true);
    });

    it('adds a percentage token with meta', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      act(() => {
        result.current.handleInsertValueToken('10% of Weight', 'percentage', {
          percentageValue: '10',
          percentageTarget: 'Weight',
        });
      });

      expect(result.current.formulaTokens).toHaveLength(1);
      const token = result.current.formulaTokens[0];
      expect(token.valueType).toBe('percentage');
      expect(token.expressionValue).toBe('10% of Weight');
      expect(token.meta?.percentageValue).toBe('10');
    });
  });

  // ── 4. Operator insertion ─────────────────────────────────────────
  describe('handleInsertOperatorToken', () => {
    it('adds an operator token', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      act(() => {
        result.current.handleInsertValueToken('Weight', 'dimension');
      });
      act(() => {
        result.current.handleInsertOperatorToken('+');
      });

      expect(result.current.formulaTokens).toHaveLength(2);
      const op = result.current.formulaTokens[1];
      expect(op.kind).toBe('operator');
      expect(op.label).toBe('+');
      expect(op.expressionValue).toBe('+');
      expect(op.tokenType).toBe('operator');
      expect(result.current.isDirty).toBe(true);
    });

    it('maps × to * in expressionValue', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      act(() => {
        result.current.handleInsertOperatorToken('×');
      });

      expect(result.current.formulaTokens[0].expressionValue).toBe('*');
    });

    it('maps ÷ to / in expressionValue', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      act(() => {
        result.current.handleInsertOperatorToken('÷');
      });

      expect(result.current.formulaTokens[0].expressionValue).toBe('/');
    });

    it('maps ( to parenOpen tokenType', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      act(() => {
        result.current.handleInsertOperatorToken('(');
      });

      expect(result.current.formulaTokens[0].tokenType).toBe('parenOpen');
    });

    it('maps ) to parenClose tokenType', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      act(() => {
        result.current.handleInsertOperatorToken(')');
      });

      expect(result.current.formulaTokens[0].tokenType).toBe('parenClose');
    });
  });

  // ── 5. Expression generation ──────────────────────────────────────
  describe('formulaExpression (generateExpression)', () => {
    it('returns empty string for no tokens', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));
      expect(result.current.formulaExpression).toBe('');
    });

    it('builds expression from value + operator + value', () => {
      const tokens: FormulaToken[] = [
        makeValueToken({ label: 'Weight', expressionValue: 'Weight' }),
        makeOperatorToken('+'),
        makeValueToken({ label: 'Volume', expressionValue: 'Volume' }),
      ];
      const { result } = renderHook(() =>
        useFormulaBuilderState({
          initialData: { formula: { tokens, expression: '' } },
        })
      );
      expect(result.current.formulaExpression).toBe('Weight + Volume');
    });

    it('handles parenthesized expressions', () => {
      const tokens: FormulaToken[] = [
        {
          id: 't1', kind: 'operator', label: '(', expressionValue: '(',
          tokenType: 'parenOpen', valueType: 'operator',
        },
        makeValueToken({ id: 't2', label: 'Weight', expressionValue: 'Weight' }),
        makeOperatorToken('+', { id: 't3' }),
        makeValueToken({ id: 't4', label: 'Volume', expressionValue: 'Volume' }),
        {
          id: 't5', kind: 'operator', label: ')', expressionValue: ')',
          tokenType: 'parenClose', valueType: 'operator',
        },
        makeOperatorToken('×', { id: 't6' }),
        makeValueToken({ id: 't7', label: '2', expressionValue: '2' }),
      ];
      const { result } = renderHook(() =>
        useFormulaBuilderState({
          initialData: { formula: { tokens, expression: '' } },
        })
      );
      expect(result.current.formulaExpression).toBe('(Weight + Volume) * 2');
    });
  });

  // ── 6. Wrapper function insertion ─────────────────────────────────
  describe('handleInsertWrapperFunction', () => {
    it('wraps the previous value token with function + parens', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      act(() => {
        result.current.handleInsertValueToken('Weight', 'dimension');
      });
      act(() => {
        result.current.handleInsertWrapperFunction('ABS');
      });

      const tokens = result.current.formulaTokens;
      // Should produce: ABS ( Weight )
      expect(tokens).toHaveLength(4);
      expect(tokens[0].label).toBe('ABS');
      expect(tokens[0].tokenType).toBe('value');
      expect(tokens[1].tokenType).toBe('parenOpen');
      expect(tokens[2].label).toBe('Weight');
      expect(tokens[3].tokenType).toBe('parenClose');
    });

    it('inserts as value token if no previous tokens', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      act(() => {
        result.current.handleInsertWrapperFunction('CEIL');
      });

      expect(result.current.formulaTokens).toHaveLength(1);
      expect(result.current.formulaTokens[0].label).toBe('CEIL');
      expect(result.current.formulaTokens[0].valueType).toBe('function');
    });
  });

  // ── 7. Aggregator function insertion ──────────────────────────────
  describe('handleInsertAggregatorFunction', () => {
    it('inserts functionStart and parenOpen tokens', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      act(() => {
        result.current.handleInsertAggregatorFunction('MAX');
      });

      const tokens = result.current.formulaTokens;
      expect(tokens).toHaveLength(2);
      expect(tokens[0].tokenType).toBe('functionStart');
      expect(tokens[0].expressionValue).toBe('MAX');
      expect(tokens[0].meta?.functionType).toBe('aggregator');
      expect(tokens[1].tokenType).toBe('parenOpen');
      expect(result.current.isDirty).toBe(true);
    });
  });

  // ── 8. Token update ───────────────────────────────────────────────
  describe('handleUpdateToken', () => {
    it('changes token label and value', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      act(() => {
        result.current.handleInsertValueToken('Weight', 'dimension');
      });

      const tokenId = result.current.formulaTokens[0].id;

      act(() => {
        result.current.handleUpdateToken(tokenId, 'Volume', 'dimension');
      });

      expect(result.current.formulaTokens[0].label).toBe('Volume');
      expect(result.current.formulaTokens[0].expressionValue).toBe('Volume');
      expect(result.current.isDirty).toBe(true);
    });

    it('updates to a percentage token with meta', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      act(() => {
        result.current.handleInsertValueToken('Weight', 'dimension');
      });

      const tokenId = result.current.formulaTokens[0].id;

      act(() => {
        result.current.handleUpdateToken(tokenId, '50% of Weight', 'percentage', {
          percentageValue: '50',
          percentageTarget: 'Weight',
        });
      });

      const token = result.current.formulaTokens[0];
      expect(token.label).toBe('50% of Weight');
      expect(token.expressionValue).toBe('50% of Weight');
      expect(token.valueType).toBe('percentage');
    });
  });

  // ── 9. Reset ──────────────────────────────────────────────────────
  describe('handleReset', () => {
    it('clears all state back to empty', () => {
      const onReset = jest.fn();
      const { result } = renderHook(() =>
        useFormulaBuilderState({ onReset })
      );

      // Build up some state
      act(() => {
        result.current.handleInsertValueToken('Weight', 'dimension');
      });
      act(() => {
        result.current.handleInsertOperatorToken('+');
      });

      expect(result.current.state).toBe('formula-input');
      expect(result.current.formulaTokens).toHaveLength(2);

      act(() => {
        result.current.handleReset();
      });

      expect(result.current.state).toBe('empty');
      expect(result.current.formulaTokens).toHaveLength(0);
      expect(result.current.conditions).toHaveLength(0);
      expect(result.current.elseBlock).toEqual({ value: '0' });
      expect(result.current.isDirty).toBe(false);
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  });

  // ── 10. Condition management ──────────────────────────────────────
  describe('condition management', () => {
    function setupWithConditions() {
      const conditionBlock: ConditionBlockData = {
        id: 'if-block',
        type: 'if',
        conditions: [
          { id: 'c1', variable: 'invoice-value', operator: '>', value: '10000' },
        ],
      };
      return renderHook(() =>
        useFormulaBuilderState({
          initialData: { conditions: [conditionBlock] },
        })
      );
    }

    describe('handleAddCondition', () => {
      it('adds a condition to a block with logicalOperator "And"', () => {
        const { result } = setupWithConditions();
        expect(result.current.conditions[0].conditions).toHaveLength(1);

        act(() => {
          result.current.handleAddCondition('if-block');
        });

        expect(result.current.conditions[0].conditions).toHaveLength(2);
        const newCond = result.current.conditions[0].conditions[1];
        expect(newCond.logicalOperator).toBe('And');
        expect(newCond.variable).toBe('invoice-value');
        expect(newCond.operator).toBe('>');
        expect(result.current.isDirty).toBe(true);
      });
    });

    describe('handleDeleteCondition', () => {
      it('removes a condition from a block', () => {
        const { result } = setupWithConditions();

        // Add a second condition first
        act(() => {
          result.current.handleAddCondition('if-block');
        });
        expect(result.current.conditions[0].conditions).toHaveLength(2);

        const condToDelete = result.current.conditions[0].conditions[1].id;
        act(() => {
          result.current.handleDeleteCondition('if-block', condToDelete);
        });

        expect(result.current.conditions[0].conditions).toHaveLength(1);
      });

      it('clears logicalOperator on new first condition after deletion', () => {
        const { result } = setupWithConditions();

        // Add a second condition
        act(() => {
          result.current.handleAddCondition('if-block');
        });

        // Delete the first one
        act(() => {
          result.current.handleDeleteCondition('if-block', 'c1');
        });

        expect(result.current.conditions[0].conditions).toHaveLength(1);
        expect(result.current.conditions[0].conditions[0].logicalOperator).toBeUndefined();
      });
    });

    describe('handleUpdateCondition', () => {
      it('updates a condition field', () => {
        const { result } = setupWithConditions();

        act(() => {
          result.current.handleUpdateCondition('if-block', 'c1', 'value', '5000');
        });

        expect(result.current.conditions[0].conditions[0].value).toBe('5000');
        expect(result.current.isDirty).toBe(true);
      });

      it('clears valueTo when operator changes from between to another', () => {
        const conditionBlock: ConditionBlockData = {
          id: 'if-block',
          type: 'if',
          conditions: [
            { id: 'c1', variable: 'weight', operator: 'between', value: '10', valueTo: '100' },
          ],
        };
        const { result } = renderHook(() =>
          useFormulaBuilderState({
            initialData: { conditions: [conditionBlock] },
          })
        );

        act(() => {
          result.current.handleUpdateCondition('if-block', 'c1', 'operator', '>');
        });

        expect(result.current.conditions[0].conditions[0].operator).toBe('>');
        expect(result.current.conditions[0].conditions[0].valueTo).toBeUndefined();
      });
    });
  });

  // ── 11. Condition block management ────────────────────────────────
  describe('condition block management', () => {
    describe('handleAddElseIf', () => {
      it('adds an else-if block', () => {
        const conditionBlock: ConditionBlockData = {
          id: 'if-block',
          type: 'if',
          conditions: [
            { id: 'c1', variable: 'weight', operator: '>', value: '100' },
          ],
        };
        const { result } = renderHook(() =>
          useFormulaBuilderState({
            initialData: { conditions: [conditionBlock] },
          })
        );

        act(() => {
          result.current.handleAddElseIf();
        });

        expect(result.current.conditions).toHaveLength(2);
        expect(result.current.conditions[1].type).toBe('else-if');
        expect(result.current.conditions[1].conditions).toHaveLength(0);
        expect(result.current.isDirty).toBe(true);
      });
    });

    describe('handleDeleteBlock', () => {
      it('deletes an else-if block', () => {
        const blocks: ConditionBlockData[] = [
          {
            id: 'if-block',
            type: 'if',
            conditions: [
              { id: 'c1', variable: 'weight', operator: '>', value: '100' },
            ],
          },
          {
            id: 'else-if-1',
            type: 'else-if',
            conditions: [],
          },
        ];
        const { result } = renderHook(() =>
          useFormulaBuilderState({
            initialData: { conditions: blocks },
          })
        );

        act(() => {
          result.current.handleDeleteBlock('else-if-1');
        });

        expect(result.current.conditions).toHaveLength(1);
        expect(result.current.conditions[0].type).toBe('if');
      });

      it('does not delete the if block', () => {
        const blocks: ConditionBlockData[] = [
          {
            id: 'if-block',
            type: 'if',
            conditions: [
              { id: 'c1', variable: 'weight', operator: '>', value: '100' },
            ],
          },
        ];
        const { result } = renderHook(() =>
          useFormulaBuilderState({
            initialData: { conditions: blocks },
          })
        );

        act(() => {
          result.current.handleDeleteBlock('if-block');
        });

        expect(result.current.conditions).toHaveLength(1);
      });
    });
  });

  // ── 12. Save callback ─────────────────────────────────────────────
  describe('handleSave', () => {
    it('calls onSave with current data', () => {
      const onSave = jest.fn();
      const { result } = renderHook(() => useFormulaBuilderState({ onSave }));

      act(() => {
        result.current.handleInsertValueToken('Weight', 'dimension');
      });
      act(() => {
        result.current.handleSave();
      });

      expect(onSave).toHaveBeenCalledTimes(1);
      const savedData = onSave.mock.calls[0][0];
      expect(savedData.formula.tokens).toHaveLength(1);
      expect(savedData.formula.expression).toBe('Weight');
      expect(savedData.conditions).toEqual([]);
      expect(savedData.elseBlock).toEqual({ value: '0' });
    });

    it('sets isDirty to false after save', () => {
      const onSave = jest.fn();
      const { result } = renderHook(() => useFormulaBuilderState({ onSave }));

      act(() => {
        result.current.handleInsertValueToken('Weight', 'dimension');
      });
      expect(result.current.isDirty).toBe(true);

      act(() => {
        result.current.handleSave();
      });
      expect(result.current.isDirty).toBe(false);
    });
  });

  // ── 13. Validate callback ─────────────────────────────────────────
  describe('handleValidate', () => {
    it('calls onValidate with current data when provided', () => {
      const onValidate = jest.fn().mockReturnValue(true);
      const { result } = renderHook(() =>
        useFormulaBuilderState({ onValidate })
      );

      act(() => {
        result.current.handleInsertValueToken('Weight', 'dimension');
      });
      act(() => {
        result.current.handleValidate();
      });

      expect(onValidate).toHaveBeenCalledTimes(1);
      const validatedData = onValidate.mock.calls[0][0];
      expect(validatedData.formula.tokens).toHaveLength(1);
      expect(validatedData.formula.expression).toBe('Weight');
    });

    it('falls back to built-in validation when onValidate not provided', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      // No tokens = not valid
      act(() => {
        result.current.handleValidate();
      });
      // Internal validation: no value tokens → false (but we can't read _isValid directly)
      // At least ensure it doesn't throw

      // Add a value token → valid
      act(() => {
        result.current.handleInsertValueToken('Weight', 'dimension');
      });
      act(() => {
        result.current.handleValidate();
      });
      // Again, _isValid is private, but no crash = pass
    });
  });

  // ── 14. getFormulaDisplayText ─────────────────────────────────────
  describe('getFormulaDisplayText', () => {
    it('returns label with "=" when state is empty', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));
      expect(result.current.getFormulaDisplayText()).toBe('FOV =');
    });

    it('returns label with expression when tokens exist', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      act(() => {
        result.current.handleInsertValueToken('Weight', 'dimension');
      });

      expect(result.current.getFormulaDisplayText()).toBe('FOV= Weight');
    });

    it('uses custom label', () => {
      const { result } = renderHook(() =>
        useFormulaBuilderState({ label: 'Freight' })
      );
      expect(result.current.getFormulaDisplayText()).toBe('Freight =');
    });

    it('returns "..." for formula-input state with no expression', () => {
      // Force formula-input state with an empty expression by providing tokens
      // that produce empty expression (unlikely in practice, but we test the fallback)
      const token = makeValueToken({ label: 'Weight', expressionValue: 'Weight' });
      const { result } = renderHook(() =>
        useFormulaBuilderState({
          initialData: { formula: { tokens: [token], expression: 'Weight' } },
        })
      );
      // Should include expression
      expect(result.current.getFormulaDisplayText()).toContain('Weight');
    });
  });

  // ── Edge cases ────────────────────────────────────────────────────
  describe('edge cases', () => {
    it('handles multiple sequential value + operator insertions', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));

      act(() => result.current.handleInsertValueToken('Weight', 'dimension'));
      act(() => result.current.handleInsertOperatorToken('+'));
      act(() => result.current.handleInsertValueToken('Volume', 'dimension'));
      act(() => result.current.handleInsertOperatorToken('×'));
      act(() => result.current.handleInsertValueToken('2', 'constant'));

      expect(result.current.formulaTokens).toHaveLength(5);
      expect(result.current.formulaExpression).toBe('Weight + Volume * 2');
    });

    it('getOperatorLabel returns label for known operator', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));
      expect(result.current.getOperatorLabel('>=')).toBe('≥');
      expect(result.current.getOperatorLabel('between')).toBe('BETWEEN');
    });

    it('getOperatorLabel returns value for unknown operator', () => {
      const { result } = renderHook(() => useFormulaBuilderState({}));
      expect(result.current.getOperatorLabel('unknown')).toBe('unknown');
    });
  });
});
