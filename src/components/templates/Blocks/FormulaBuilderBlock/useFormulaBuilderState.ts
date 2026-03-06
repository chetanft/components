import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import type {
  FormulaState,
  FormulaToken,
  TokenType,
  ConditionBlockData,
  ConditionRow,
  ElseBlockData,
  PickerMode,
  PickerPositions,
  FormulaBuilderBlockProps,
} from './FormulaBuilderBlock.types';
import {
  AGGREGATOR_FUNCTIONS,
  WRAPPER_FUNCTIONS,
  CONDITION_OPERATORS,
  CONDITION_VARIABLES,
  CHARGE_OPTIONS,
  NUMERIC_DIMENSIONS,
} from './FormulaBuilderBlock.constants';

export function useFormulaBuilderState(props: FormulaBuilderBlockProps) {
  const { label = 'FOV', initialData, onSave, onValidate, onReset } = props;

  // Component state
  const [state, setState] = useState<FormulaState>(
    initialData?.formula?.tokens?.length ? 'formula-input' : 'empty'
  );
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [_isValid, setIsValid] = useState<boolean | null>(null);

  // Formula data
  const [formulaTokens, setFormulaTokens] = useState<FormulaToken[]>(
    initialData?.formula?.tokens || []
  );

  // Generate proper formula expression from tokens
  const generateExpression = useCallback((tokens: FormulaToken[]): string => {
    if (tokens.length === 0) return '';

    const parts: string[] = [];
    let inFunction = false;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const prevToken = i > 0 ? tokens[i - 1] : null;

      switch (token.tokenType) {
        case 'functionStart':
          inFunction = true;
          parts.push(token.expressionValue);
          break;
        case 'functionEnd':
          inFunction = false;
          parts.push(token.expressionValue);
          break;
        case 'comma':
          if (inFunction) {
            parts.push(token.expressionValue);
          }
          break;
        case 'parenOpen':
          parts.push(token.expressionValue);
          break;
        case 'parenClose':
          parts.push(token.expressionValue);
          break;
        case 'operator': {
          if (prevToken && prevToken.tokenType !== 'parenOpen' && prevToken.tokenType !== 'functionStart') {
            parts.push(' ');
          }
          parts.push(token.expressionValue);
          const nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;
          if (nextToken && nextToken.tokenType !== 'parenClose' && nextToken.tokenType !== 'functionEnd') {
            parts.push(' ');
          }
          break;
        }
        case 'value':
          if (prevToken &&
              prevToken.tokenType !== 'parenOpen' &&
              prevToken.tokenType !== 'functionStart' &&
              prevToken.tokenType !== 'comma' &&
              prevToken.tokenType !== 'operator') {
            parts.push(' ');
          }
          parts.push(token.expressionValue);
          break;
      }
    }

    return parts.join('');
  }, []);

  const formulaExpression = useMemo(
    () => generateExpression(formulaTokens),
    [formulaTokens, generateExpression]
  );

  // Conditions
  const [conditions, setConditions] = useState<ConditionBlockData[]>(
    initialData?.conditions || []
  );
  const [elseBlock, setElseBlock] = useState<ElseBlockData>(
    initialData?.elseBlock || { value: '0' }
  );

  // Picker state machine
  const [pickerMode, setPickerMode] = useState<PickerMode>('none');
  const [activeValueCategory, setActiveValueCategory] = useState<string | null>(null);
  const [selectedVariableType, setSelectedVariableType] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);

  const [pickerPositions, setPickerPositions] = useState<PickerPositions>({});

  // Percentage and constant values
  const [percentageOfChargeValue, setPercentageOfChargeValue] = useState('0');
  const [percentageOfChargeTarget, setPercentageOfChargeTarget] = useState<string>('');
  const [percentageOfDimensionValue, setPercentageOfDimensionValue] = useState('0');
  const [percentageOfDimensionTarget, setPercentageOfDimensionTarget] = useState<string>('');
  const [constantValue, setConstantValue] = useState('50');

  // Condition dropdown state
  const [activeConditionDropdown, setActiveConditionDropdown] = useState<{
    blockId: string;
    conditionId: string;
    type: 'variable' | 'operator' | 'logical';
  } | null>(null);
  const [conditionValueTarget, setConditionValueTarget] = useState<{
    blockId: string;
    conditionId: string;
  } | null>(null);
  const [editingTokenId, setEditingTokenId] = useState<string | null>(null);
  const [editingPercentageValue, setEditingPercentageValue] = useState('');
  const [editingPercentageTarget, setEditingPercentageTarget] = useState('');
  const [editingConstantValue, setEditingConstantValue] = useState('');

  // Helper functions
  const setPickerModeAndPosition = useCallback((
    mode: PickerMode,
    position?: { top: number; left: number }
  ) => {
    setPickerMode(mode);
    if (position) {
      setPickerPositions(prev => ({
        ...prev,
        [mode === 'valueCategory' ? 'valueCategory' :
         mode === 'valueOptions' ? 'valueOptions' :
         mode === 'operator' ? 'operator' :
         mode === 'condition' ? 'condition' :
         mode === 'tokenEdit' ? 'tokenEdit' : 'valueCategory']: position
      }));
    }
  }, []);

  const closePicker = useCallback(() => {
    setPickerMode('none');
    setActiveValueCategory(null);
    setSelectedVariableType(null);
    setActiveSubDropdown(null);
  }, []);

  // Refs
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);
  const [popoverRef, setPopoverRef] = useState<HTMLDivElement | null>(null);
  const [tokenDropdownRef, setTokenDropdownRef] = useState<HTMLDivElement | null>(null);
  const [subDropdownRef, setSubDropdownRef] = useState<HTMLDivElement | null>(null);
  const variableTypeDropdownRef = useRef<HTMLDivElement>(null);
  const specificOptionsDropdownRef = useRef<HTMLDivElement>(null);
  const specificOptionsPlaceholderRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  // Initialize portal container
  useEffect(() => {
    const container = document.createElement('div');
    container.id = 'formula-builder-portal';
    document.body.appendChild(container);
    setPortalContainer(container);
    return () => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    };
  }, []);

  // Helper to determine expressionValue and tokenType from label and valueType
  const getTokenExpressionData = useCallback((
    tokenLabel: string,
    valueType?: FormulaToken['valueType'],
    meta?: FormulaToken['meta']
  ): { expressionValue: string; tokenType: TokenType } => {
    if (valueType === 'operator') {
      const operatorMap: Record<string, string> = {
        '×': '*',
        '÷': '/',
        '+': '+',
        '-': '-',
        '(': '(',
        ')': ')',
      };
      return {
        expressionValue: operatorMap[tokenLabel] || tokenLabel,
        tokenType: tokenLabel === '(' ? 'parenOpen' : tokenLabel === ')' ? 'parenClose' : 'operator',
      };
    }

    if (valueType === 'function') {
      const functionName = tokenLabel.split('(')[0].trim();
      const isAggregator = AGGREGATOR_FUNCTIONS.some(f => f.value === functionName);

      if (isAggregator || meta?.functionType === 'aggregator') {
        return {
          expressionValue: functionName,
          tokenType: 'functionStart',
        };
      }
      return {
        expressionValue: functionName,
        tokenType: 'value',
      };
    }

    if (valueType === 'percentage' && meta?.percentageValue && meta?.percentageTarget) {
      return {
        expressionValue: `${meta.percentageValue}% of ${meta.percentageTarget}`,
        tokenType: 'value',
      };
    }

    return {
      expressionValue: tokenLabel,
      tokenType: 'value',
    };
  }, []);

  // Migrate old tokens
  useEffect(() => {
    if (formulaTokens.length === 0) return;

    const needsMigration = formulaTokens.some((token: any) => {
      const hasExpressionValue = 'expressionValue' in token;
      const hasTokenType = 'tokenType' in token;
      return !hasExpressionValue || !hasTokenType;
    });

    if (needsMigration) {
      const migratedTokens: FormulaToken[] = formulaTokens.map((token: any) => {
        const hasExpressionValue = 'expressionValue' in token;
        const hasTokenType = 'tokenType' in token;

        if (hasExpressionValue && hasTokenType) {
          return token as FormulaToken;
        }

        const { expressionValue, tokenType } = getTokenExpressionData(
          token.label || '',
          token.valueType,
          token.meta
        );

        return {
          id: token.id || `token-${Date.now()}`,
          kind: token.kind || 'value',
          label: token.label || '',
          expressionValue,
          tokenType,
          valueType: token.valueType,
          meta: token.meta,
        };
      });
      setFormulaTokens(migratedTokens);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Computed values
  const showSpecificOptionsDropdown = pickerMode === 'valueOptions';
  const showInlinePercentageOfCharge = pickerMode === 'valueInline' && activeValueCategory === 'percentage-of-charge';

  // Auto-insert percentage of charge token
  const prevPercentageRef = useRef<string>('');
  useEffect(() => {
    if (
      showInlinePercentageOfCharge &&
      percentageOfChargeValue &&
      percentageOfChargeValue !== '0' &&
      percentageOfChargeTarget
    ) {
      const currentLabel = `${percentageOfChargeValue}% of ${percentageOfChargeTarget}`;
      if (prevPercentageRef.current !== currentLabel) {
        const timeoutId = setTimeout(() => {
          const lastToken = formulaTokens[formulaTokens.length - 1];
          const alreadyExists = lastToken?.label === currentLabel && lastToken?.valueType === 'percentage';

          if (!alreadyExists && prevPercentageRef.current !== currentLabel) {
            prevPercentageRef.current = currentLabel;
            const meta = { percentageValue: percentageOfChargeValue, percentageTarget: percentageOfChargeTarget };
            const { expressionValue, tokenType } = getTokenExpressionData(currentLabel, 'percentage', meta);
            setFormulaTokens([
              ...formulaTokens,
              {
                id: `token-${Date.now()}`,
                kind: 'value',
                label: currentLabel,
                expressionValue,
                tokenType,
                valueType: 'percentage',
                meta
              },
            ]);
            setState('formula-input');
            setPickerMode('none');
            setActiveValueCategory(null);
            setSelectedVariableType(null);
            setIsDirty(true);
            setPercentageOfChargeValue('0');
            setPercentageOfChargeTarget('');
            prevPercentageRef.current = '';
          }
        }, 300);

        return () => clearTimeout(timeoutId);
      }
    } else {
      prevPercentageRef.current = '';
    }
  }, [percentageOfChargeValue, percentageOfChargeTarget, showInlinePercentageOfCharge, formulaTokens, getTokenExpressionData]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if ((pickerMode === 'valueCategory' || pickerMode === 'valueOptions') && dropdownRef && !dropdownRef.contains(target)) {
        if (addButtonRef.current && !addButtonRef.current.contains(target)) {
          closePicker();
          setConditionValueTarget(null);
        }
      }

      if (pickerMode === 'operator' && popoverRef && !popoverRef.contains(target)) {
        closePicker();
      }

      if (activeConditionDropdown && dropdownRef && !dropdownRef.contains(target)) {
        setActiveConditionDropdown(null);
      }

      if (pickerMode === 'tokenEdit' && tokenDropdownRef && !tokenDropdownRef.contains(target)) {
        setEditingTokenId(null);
        setPickerMode('none');
        setPickerPositions(prev => ({ ...prev, tokenEdit: undefined }));
      }

      if (activeSubDropdown && subDropdownRef && !subDropdownRef.contains(target)) {
        setActiveSubDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [pickerMode, activeConditionDropdown, editingTokenId, activeSubDropdown, dropdownRef, popoverRef, tokenDropdownRef, subDropdownRef, addButtonRef, closePicker]);

  // Helper to get operator label
  const getOperatorLabel = useCallback((value: string): string => {
    const operator = CONDITION_OPERATORS.find(op => op.value === value);
    return operator?.label || value;
  }, []);

  // Generate formula display text
  const formatConditionValue = useCallback((condition: ConditionRow) => {
    const operator = condition.operator || '>';
    if (operator === 'between') {
      return `${condition.value || '…'} AND ${condition.valueTo || '…'}`;
    }
    if (operator === 'in' || operator === 'not-in') {
      return `(${condition.value || '…'})`;
    }
    return condition.value || '…';
  }, []);

  const getFormulaDisplayText = useCallback(() => {
    if (state === 'empty') {
      return `${label} =`;
    }

    const baseExpression = formulaExpression || '…';
    let text = `${label}= ${baseExpression}`;

    if (state === 'with-conditions' && conditions.length > 0) {
      const ifBlock = conditions.find(b => b.type === 'if');
      if (ifBlock && ifBlock.conditions.length > 0) {
        const conditionText = ifBlock.conditions.map((c, i) => {
          const varLabel = CONDITION_VARIABLES.find(v => v.value === c.variable)?.label || c.variable;
          const prefix = i > 0 ? ` ${c.logicalOperator || 'And'} ` : '';
          const operatorLabel = getOperatorLabel(c.operator || '>');
          return `${prefix}${varLabel} ${operatorLabel} ${formatConditionValue(c)}`;
        }).join('');
        text += `, If ${conditionText}`;
      }

      conditions.filter(b => b.type === 'else-if').forEach((block) => {
        if (block.conditions.length > 0) {
          const conditionText = block.conditions.map((c, i) => {
            const varLabel = CONDITION_VARIABLES.find(v => v.value === c.variable)?.label || c.variable;
            const prefix = i > 0 ? ` ${c.logicalOperator || 'And'} ` : '';
            const operatorLabel = getOperatorLabel(c.operator || '>');
            return `${prefix}${varLabel} ${operatorLabel} ${formatConditionValue(c)}`;
          }).join('');
          text += `, Else If ${conditionText}`;
        }
      });

      text += `, Else ${label} = ${elseBlock.value}`;
    }

    return text;
  }, [state, label, formulaExpression, conditions, elseBlock, formatConditionValue, getOperatorLabel]);

  // Expected next token type
  const getExpectedNextTokenType = useCallback((tokens: FormulaToken[]): 'value' | 'operator' | 'comma' | 'close' => {
    if (tokens.length === 0) return 'value';

    let parenDepth = 0;
    let inFunction = false;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      switch (token.tokenType) {
        case 'functionStart':
          inFunction = true;
          break;
        case 'functionEnd':
          inFunction = false;
          break;
        case 'parenOpen':
          parenDepth++;
          break;
        case 'parenClose':
          parenDepth--;
          if (parenDepth === 0) {
            inFunction = false;
          }
          break;
      }
    }

    const lastToken = tokens[tokens.length - 1];

    if (inFunction && parenDepth > 0) {
      if (lastToken.tokenType === 'value') return 'comma';
      if (lastToken.tokenType === 'comma') return 'value';
      if (lastToken.tokenType === 'parenOpen' || lastToken.tokenType === 'functionStart') return 'value';
    }

    const lastTokenType = lastToken.tokenType;
    if (lastTokenType === 'parenClose' && inFunction) return 'comma';

    switch (lastTokenType) {
      case 'parenOpen':
      case 'functionStart':
      case 'comma':
      case 'operator':
        return 'value';
      case 'value':
      case 'parenClose':
      case 'functionEnd':
        return 'operator';
      default:
        return 'value';
    }
  }, []);

  const getNextPicker = useCallback(() => {
    const expected = getExpectedNextTokenType(formulaTokens);
    if (expected === 'operator' || expected === 'close') return 'operator';
    return 'value';
  }, [formulaTokens, getExpectedNextTokenType]);

  const openPickerForNextToken = (buttonElement: HTMLButtonElement) => {
    const rect = buttonElement.getBoundingClientRect();
    setActiveConditionDropdown(null);
    setConditionValueTarget(null);
    const nextPicker = getNextPicker();
    if (nextPicker === 'value') {
      setPickerModeAndPosition('valueCategory', {
        top: rect.bottom + 8,
        left: rect.left,
      });
      setActiveValueCategory(null);
      setSelectedVariableType(null);
    } else {
      setPickerModeAndPosition('operator', {
        top: rect.bottom + 12,
        left: rect.left,
      });
    }
  };

  // Update condition field
  const handleUpdateCondition = useCallback((blockId: string, conditionId: string, field: keyof ConditionRow, value: string) => {
    setConditions(prev => prev.map(block => {
      if (block.id === blockId) {
        return {
          ...block,
          conditions: block.conditions.map(c => {
            if (c.id !== conditionId) return c;
            if (field === 'operator') {
              const operatorOption = CONDITION_OPERATORS.find(op => op.value === value || op.label === value);
              const nextOperator = operatorOption?.value || value;
              const shouldClearValueTo = nextOperator !== 'between';
              return {
                ...c,
                operator: nextOperator,
                valueTo: shouldClearValueTo ? undefined : c.valueTo,
              };
            }
            return { ...c, [field]: value };
          }),
        };
      }
      return block;
    }));
    setIsDirty(true);
    setActiveConditionDropdown(null);
  }, []);

  const handleInsertValueToken = (
    tokenLabel: string,
    valueType?: FormulaToken['valueType'],
    meta?: FormulaToken['meta']
  ) => {
    if (conditionValueTarget) {
      handleUpdateCondition(conditionValueTarget.blockId, conditionValueTarget.conditionId, 'value', tokenLabel);
      setConditionValueTarget(null);
      closePicker();
      return;
    }
    const { expressionValue, tokenType } = getTokenExpressionData(tokenLabel, valueType, meta);
    setFormulaTokens([
      ...formulaTokens,
      {
        id: `token-${Date.now()}`,
        kind: 'value',
        label: tokenLabel,
        expressionValue,
        tokenType,
        valueType,
        meta
      },
    ]);
    setState('formula-input');
    closePicker();
    setIsDirty(true);
  };

  const handleInsertOperatorToken = (operator: string) => {
    const { expressionValue, tokenType } = getTokenExpressionData(operator, 'operator');
    setFormulaTokens([
      ...formulaTokens,
      {
        id: `token-${Date.now()}`,
        kind: 'operator',
        label: operator,
        expressionValue,
        tokenType,
        valueType: 'operator'
      },
    ]);
    closePicker();
    setIsDirty(true);
  };

  const handleInsertWrapperFunction = (functionName: string) => {
    if (formulaTokens.length === 0) {
      handleInsertValueToken(functionName, 'function', { functionType: 'wrapper', functionName });
      return;
    }

    const lastToken = formulaTokens[formulaTokens.length - 1];
    if (lastToken.kind === 'value' && lastToken.tokenType === 'value') {
      const wrappedTokens: FormulaToken[] = [
        {
          id: `token-${Date.now()}-func`,
          kind: 'value',
          label: functionName,
          expressionValue: functionName,
          tokenType: 'value',
          valueType: 'function',
          meta: { functionType: 'wrapper', functionName },
        },
        {
          id: `token-${Date.now()}-open`,
          kind: 'operator',
          label: '(',
          expressionValue: '(',
          tokenType: 'parenOpen',
          valueType: 'operator',
        },
        lastToken,
        {
          id: `token-${Date.now()}-close`,
          kind: 'operator',
          label: ')',
          expressionValue: ')',
          tokenType: 'parenClose',
          valueType: 'operator',
        },
      ];

      setFormulaTokens([...formulaTokens.slice(0, -1), ...wrappedTokens]);
    } else {
      handleInsertValueToken(functionName, 'function', { functionType: 'wrapper', functionName });
    }

    closePicker();
    setIsDirty(true);
  };

  const handleInsertAggregatorFunction = (functionName: string) => {
    const functionStartToken: FormulaToken = {
      id: `token-${Date.now()}-func-start`,
      kind: 'value',
      label: `${functionName}( , )`,
      expressionValue: functionName,
      tokenType: 'functionStart',
      valueType: 'function',
      meta: { functionType: 'aggregator', functionName },
    };

    const openParenToken: FormulaToken = {
      id: `token-${Date.now()}-open`,
      kind: 'operator',
      label: '(',
      expressionValue: '(',
      tokenType: 'parenOpen',
      valueType: 'operator',
    };

    setFormulaTokens([...formulaTokens, functionStartToken, openParenToken]);
    setIsDirty(true);
  };

  const handleOpenTokenDropdown = (tokenId: string, buttonElement: HTMLButtonElement) => {
    const rect = buttonElement.getBoundingClientRect();
    const position = {
      top: rect.bottom + 8,
      left: rect.left,
    };
    setPickerModeAndPosition('tokenEdit', position);
    const token = formulaTokens.find(t => t.id === tokenId);

    if (token?.valueType === 'percentage' && token.meta) {
      setEditingPercentageValue(token.meta.percentageValue || '');
      setEditingPercentageTarget(token.meta.percentageTarget || '');
    } else if (token?.valueType === 'constant') {
      setEditingConstantValue(token.label);
    } else {
      setEditingPercentageValue('');
      setEditingPercentageTarget('');
      setEditingConstantValue('');
    }

    setEditingTokenId(tokenId);
  };

  const handleUpdateToken = (tokenId: string, newLabel: string, valueType?: FormulaToken['valueType'], meta?: FormulaToken['meta']) => {
    const { expressionValue, tokenType } = getTokenExpressionData(newLabel, valueType, meta);
    setFormulaTokens(
      formulaTokens.map((token) =>
        token.id === tokenId
          ? { ...token, label: newLabel, expressionValue, tokenType, valueType, meta }
          : token
      )
    );
    setEditingTokenId(null);
    setPickerMode('none');
    setPickerPositions(prev => ({ ...prev, tokenEdit: undefined }));
    setIsDirty(true);
  };

  const handleOperatorPickerSelect = (type: 'operator' | 'if-else', operator?: string) => {
    if (type === 'if-else') {
      setState('with-conditions');
      if (conditions.length === 0) {
        setConditions([
          {
            id: 'if-block',
            type: 'if',
            conditions: [
              { id: `cond-${Date.now()}`, variable: 'invoice-value', operator: '>', value: '10000' },
            ],
          },
        ]);
      }
      setPickerMode('none');
      setPickerPositions(prev => ({ ...prev, operator: undefined }));
      setIsDirty(true);
      return;
    }
    if (operator) {
      handleInsertOperatorToken(operator);
    }
  };

  const handleOpenConditionDropdown = (
    event: React.MouseEvent<HTMLButtonElement>,
    blockId: string,
    conditionId: string,
    type: 'variable' | 'operator' | 'logical'
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPickerPositions(prev => ({
      ...prev,
      condition: {
        top: rect.bottom + 8,
        left: rect.left,
      },
    }));
    setActiveConditionDropdown({ blockId, conditionId, type });
    setConditionValueTarget(null);
    setPickerMode('condition');
  };

  const handleOpenConditionValuePicker = (
    event: React.MouseEvent<HTMLButtonElement>,
    blockId: string,
    conditionId: string
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.bottom + 8,
      left: rect.left,
    };
    setPickerPositions(prev => ({ ...prev, valueCategory: position }));
    setPickerMode('valueCategory');
    setConditionValueTarget({ blockId, conditionId });
    setPickerMode('valueCategory');
    setActiveValueCategory(null);
    setActiveConditionDropdown(null);
  };

  const handleAddCondition = (blockId: string) => {
    setConditions(conditions.map(block => {
      if (block.id === blockId) {
        const newCondition: ConditionRow = {
          id: `cond-${Date.now()}`,
          logicalOperator: block.conditions.length > 0 ? 'And' : undefined,
          variable: 'invoice-value',
          operator: '>',
          value: '',
        };
        return { ...block, conditions: [...block.conditions, newCondition] };
      }
      return block;
    }));
    setIsDirty(true);
  };

  const handleDeleteCondition = (blockId: string, conditionId: string) => {
    setConditions(conditions.map(block => {
      if (block.id === blockId) {
        const newConditions = block.conditions.filter(c => c.id !== conditionId);
        if (newConditions.length > 0 && newConditions[0].logicalOperator) {
          newConditions[0] = { ...newConditions[0], logicalOperator: undefined };
        }
        return { ...block, conditions: newConditions };
      }
      return block;
    }));
    setIsDirty(true);
  };

  const handleAddElseIf = () => {
    const newBlock: ConditionBlockData = {
      id: `else-if-${Date.now()}`,
      type: 'else-if',
      conditions: [],
    };
    setConditions([...conditions, newBlock]);
    setIsDirty(true);
  };

  const handleDeleteBlock = (blockId: string) => {
    const block = conditions.find(b => b.id === blockId);
    if (block?.type === 'if') return;
    setConditions(conditions.filter(b => b.id !== blockId));
    setIsDirty(true);
  };

  const handleReset = () => {
    setState('empty');
    setFormulaTokens([]);
    setConditions([]);
    setElseBlock({ value: '0' });
    setIsDirty(false);
    setIsValid(null);
    setPickerMode('none');
    setPickerPositions({});
    setActiveValueCategory(null);
    setActiveConditionDropdown(null);
    setConditionValueTarget(null);
    setSelectedVariableType(null);
    setActiveSubDropdown(null);
    setPercentageOfChargeValue('0');
    setPercentageOfChargeTarget('');
    onReset?.();
  };

  const handleValidate = () => {
    if (onValidate) {
      const result = onValidate({
        formula: { tokens: formulaTokens, expression: formulaExpression },
        conditions,
        elseBlock,
      });
      setIsValid(result);
    } else {
      const isFormulaValid = formulaTokens.some((token) => token.kind === 'value');
      if (state === 'with-conditions') {
        const ifBlock = conditions.find(b => b.type === 'if');
        const hasValidConditions = ifBlock && ifBlock.conditions.length > 0 &&
          ifBlock.conditions.every(c => {
            if (!c.variable || !c.operator || !c.value) return false;
            if (c.operator === 'between') {
              return Boolean(c.valueTo);
            }
            return true;
          });
        setIsValid(Boolean(isFormulaValid && hasValidConditions));
      } else {
        setIsValid(Boolean(isFormulaValid));
      }
    }
  };

  const handleSave = () => {
    onSave?.({ formula: { tokens: formulaTokens, expression: formulaExpression }, conditions, elseBlock });
    setIsDirty(false);
  };

  const handleOpenSubDropdown = (type: string, buttonElement: HTMLButtonElement) => {
    const rect = buttonElement.getBoundingClientRect();
    const position = {
      top: rect.bottom + 4,
      left: rect.left,
    };
    setPickerPositions(prev => ({ ...prev, valueOptions: position }));
    setActiveSubDropdown(type);
    setPickerMode('valueOptions');
  };

  const isInsideFunction = useCallback(() => {
    let parenDepth = 0;
    let inFunction = false;

    for (const token of formulaTokens) {
      if (token.tokenType === 'functionStart') inFunction = true;
      if (token.tokenType === 'parenOpen') parenDepth++;
      if (token.tokenType === 'parenClose') {
        parenDepth--;
        if (parenDepth === 0) inFunction = false;
      }
    }

    return inFunction && parenDepth > 0;
  }, [formulaTokens]);

  return {
    // State
    state,
    isCollapsed,
    setIsCollapsed,
    isDirty,
    formulaTokens,
    formulaExpression,
    conditions,
    elseBlock,
    setElseBlock,
    setIsDirty,

    // Picker state
    pickerMode,
    setPickerMode,
    activeValueCategory,
    setActiveValueCategory,
    selectedVariableType,
    setSelectedVariableType,
    activeSubDropdown,
    setActiveSubDropdown,
    pickerPositions,
    setPickerPositions,
    showSpecificOptionsDropdown,
    showInlinePercentageOfCharge,

    // Values
    percentageOfChargeValue,
    setPercentageOfChargeValue,
    percentageOfChargeTarget,
    setPercentageOfChargeTarget,
    percentageOfDimensionValue,
    setPercentageOfDimensionValue,
    percentageOfDimensionTarget,
    setPercentageOfDimensionTarget,
    constantValue,
    setConstantValue,

    // Condition state
    activeConditionDropdown,
    setActiveConditionDropdown,
    conditionValueTarget,
    editingTokenId,
    setEditingTokenId,
    editingPercentageValue,
    setEditingPercentageValue,
    editingPercentageTarget,
    setEditingPercentageTarget,
    editingConstantValue,
    setEditingConstantValue,

    // Refs
    portalContainer,
    setDropdownRef,
    setPopoverRef,
    setTokenDropdownRef,
    setSubDropdownRef,
    variableTypeDropdownRef,
    specificOptionsDropdownRef,
    specificOptionsPlaceholderRef,
    addButtonRef,

    // Handlers
    closePicker,
    openPickerForNextToken,
    handleInsertValueToken,
    handleInsertOperatorToken,
    handleInsertWrapperFunction,
    handleInsertAggregatorFunction,
    handleOpenTokenDropdown,
    handleUpdateToken,
    handleOperatorPickerSelect,
    handleOpenConditionDropdown,
    handleOpenConditionValuePicker,
    handleAddCondition,
    handleDeleteCondition,
    handleUpdateCondition,
    handleAddElseIf,
    handleDeleteBlock,
    handleReset,
    handleValidate,
    handleSave,
    handleOpenSubDropdown,

    // Computed
    getOperatorLabel,
    getFormulaDisplayText,
    isInsideFunction,
    label,
  };
}

export type FormulaBuilderState = ReturnType<typeof useFormulaBuilderState>;
