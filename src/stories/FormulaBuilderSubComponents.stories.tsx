import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormulaTokenDisplay } from '../components/templates/Blocks/FormulaBuilderBlock/FormulaTokenDisplay';
import { ConditionBlock } from '../components/templates/Blocks/FormulaBuilderBlock/ConditionBlock';
import { useFormulaBuilderState } from '../components/templates/Blocks/FormulaBuilderBlock/useFormulaBuilderState';
import type { FormulaToken, ConditionBlockData } from '../components/templates/Blocks/FormulaBuilderBlock/FormulaBuilderBlock.types';
import type { FormulaBuilderState } from '../components/templates/Blocks/FormulaBuilderBlock/useFormulaBuilderState';

/* ---------------------------------------------------------------------------
 * Helper wrapper that calls the hook and passes state to the sub-component.
 * -------------------------------------------------------------------------*/

const WithState: React.FC<{
  children: (s: FormulaBuilderState) => React.ReactNode;
  initialData?: Parameters<typeof useFormulaBuilderState>[0]['initialData'];
  label?: string;
}> = ({ children, initialData, label }) => {
  const s = useFormulaBuilderState({ label: label || 'FOV', initialData });
  return <>{children(s)}</>;
};

/* ---------------------------------------------------------------------------
 * Sample data
 * -------------------------------------------------------------------------*/

const sampleTokens: FormulaToken[] = [
  {
    id: 'token-1',
    kind: 'value',
    label: 'Base Freight',
    expressionValue: 'base_freight',
    tokenType: 'value',
    valueType: 'charge',
  },
  {
    id: 'token-2',
    kind: 'operator',
    label: '+',
    expressionValue: '+',
    tokenType: 'operator',
    valueType: 'operator',
  },
  {
    id: 'token-3',
    kind: 'value',
    label: '10% of Invoice value',
    expressionValue: '10% of Invoice value',
    tokenType: 'value',
    valueType: 'percentage',
    meta: {
      percentageValue: '10',
      percentageTarget: 'Invoice value',
    },
  },
];

const sampleConditions: ConditionBlockData[] = [
  {
    id: 'if-block',
    type: 'if',
    conditions: [
      { id: 'cond-1', variable: 'invoice-value', operator: '>', value: '10000' },
      { id: 'cond-2', logicalOperator: 'And', variable: 'weight', operator: '<=', value: '500' },
    ],
  },
];

/* ===========================================================================
 * FormulaTokenDisplay stories
 * =========================================================================*/

const tokenDisplayMeta: Meta<typeof FormulaTokenDisplay> = {
  title: 'Stories/FormulaBuilder/FormulaTokenDisplay',
  component: FormulaTokenDisplay,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docsOnly: true,
    docs: {
      description: {
        component:
          'Renders the formula tokens (values, operators, percentage chips) inside the formula builder. Shows an "Add a value" placeholder when no tokens are present.',
      },
    },
  },
};

export default tokenDisplayMeta;
type TokenDisplayStory = StoryObj<typeof FormulaTokenDisplay>;

export const Default: TokenDisplayStory = {
  name: 'With Tokens',
  render: () => (
    <WithState
      label="FOV"
      initialData={{
        formula: {
          tokens: sampleTokens,
          expression: 'base_freight + 10% of Invoice value',
        },
      }}
    >
      {(s) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x2)', flexWrap: 'wrap' }}>
          <FormulaTokenDisplay s={s} />
        </div>
      )}
    </WithState>
  ),
};

export const Empty: TokenDisplayStory = {
  name: 'Empty State',
  render: () => (
    <WithState label="FOV">
      {(s) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x2)' }}>
          <FormulaTokenDisplay s={s} />
        </div>
      )}
    </WithState>
  ),
};

/* ===========================================================================
 * ConditionBlock stories
 *
 * These are exported as named stories within the same file. Storybook will
 * group them under the title defined in the default export. To also expose
 * ConditionBlock stories we attach them via a second meta object pattern
 * using a CSF-compatible approach: we simply export more stories whose
 * render functions use ConditionBlock.
 * =========================================================================*/

export const ConditionBlockDefault: TokenDisplayStory = {
  name: 'ConditionBlock / If Block',
  render: () => (
    <WithState
      label="FOV"
      initialData={{
        formula: {
          tokens: sampleTokens,
          expression: 'base_freight + 10% of Invoice value',
        },
        conditions: sampleConditions,
      }}
    >
      {(s) => <ConditionBlock block={sampleConditions[0]} s={s} />}
    </WithState>
  ),
};

export const ConditionBlockElseIf: TokenDisplayStory = {
  name: 'ConditionBlock / Else-If Block',
  render: () => {
    const elseIfBlock: ConditionBlockData = {
      id: 'else-if-1',
      type: 'else-if',
      conditions: [
        { id: 'cond-ei-1', variable: 'weight', operator: 'between', value: '100', valueTo: '500' },
      ],
    };

    return (
      <WithState
        label="FOV"
        initialData={{
          formula: {
            tokens: sampleTokens,
            expression: 'base_freight + 10% of Invoice value',
          },
          conditions: [...sampleConditions, elseIfBlock],
        }}
      >
        {(s) => <ConditionBlock block={elseIfBlock} s={s} />}
      </WithState>
    );
  },
};

export const ConditionBlockEmpty: TokenDisplayStory = {
  name: 'ConditionBlock / Empty Conditions',
  render: () => {
    const emptyBlock: ConditionBlockData = {
      id: 'if-block',
      type: 'if',
      conditions: [],
    };

    return (
      <WithState
        label="FOV"
        initialData={{
          formula: {
            tokens: sampleTokens,
            expression: 'base_freight + 10% of Invoice value',
          },
          conditions: [emptyBlock],
        }}
      >
        {(s) => <ConditionBlock block={emptyBlock} s={s} />}
      </WithState>
    );
  },
};
