export type FormulaState = 'empty' | 'formula-input' | 'with-conditions';

export type FormulaTokenKind = 'value' | 'operator';

export type TokenType = 'value' | 'operator' | 'functionStart' | 'functionEnd' | 'comma' | 'parenOpen' | 'parenClose';

export interface FormulaToken {
  id: string;
  kind: FormulaTokenKind;
  label: string;
  expressionValue: string;
  tokenType: TokenType;
  valueType?: 'charge' | 'dimension' | 'percentage' | 'constant' | 'function' | 'operator';
  meta?: {
    percentageValue?: string;
    percentageTarget?: string;
    functionType?: 'wrapper' | 'aggregator';
    functionName?: string;
  };
}

export interface ConditionRow {
  id: string;
  logicalOperator?: string;
  variable: string;
  operator: string;
  value: string;
  valueTo?: string;
}

export interface FormulaData {
  tokens: FormulaToken[];
  expression: string;
}

export interface ConditionBlockData {
  id: string;
  type: 'if' | 'else-if';
  conditions: ConditionRow[];
}

export interface ElseBlockData {
  value: string;
}

export type PickerMode =
  | 'none'
  | 'valueCategory'
  | 'valueOptions'
  | 'valueInline'
  | 'operator'
  | 'condition'
  | 'tokenEdit';

export interface PickerPositions {
  valueCategory?: { top: number; left: number };
  valueOptions?: { top: number; left: number };
  operator?: { top: number; left: number };
  condition?: { top: number; left: number };
  tokenEdit?: { top: number; left: number };
}

export interface FormulaBuilderBlockProps {
  /** Dynamic label from parent (e.g., "Freight on value", "FOV", etc.) */
  label?: string;
  /** Initial formula data */
  initialData?: {
    formula?: FormulaData;
    conditions?: ConditionBlockData[];
    elseBlock?: ElseBlockData;
  };
  /** Callback when formula is saved */
  onSave?: (data: {
    formula: FormulaData;
    conditions: ConditionBlockData[];
    elseBlock: ElseBlockData;
  }) => void;
  /** Callback when formula is validated */
  onValidate?: (data: {
    formula: FormulaData;
    conditions: ConditionBlockData[];
    elseBlock: ElseBlockData;
  }) => boolean;
  /** Callback when formula is reset */
  onReset?: () => void;
  /** Additional class name */
  className?: string;
}
