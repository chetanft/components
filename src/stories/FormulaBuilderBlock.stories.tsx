import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormulaBuilderBlock } from '../components/templates/Blocks';
import type { FormulaToken } from '../components/templates/Blocks/FormulaBuilderBlock/FormulaBuilderBlock.types';

const meta: Meta<typeof FormulaBuilderBlock> = {
  title: 'Stories/FormulaBuilderBlock',
  component: FormulaBuilderBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docsOnly: true,
    docs: {
      description: {
        component: 'A pre-composed formula builder block for constructing mathematical expressions with value tokens, operators, and conditional logic. All props are optional and ship with sensible defaults.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormulaBuilderBlock>;

export const Default: Story = {
  render: () => <FormulaBuilderBlock />,
};

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
    label: '10%',
    expressionValue: '0.10',
    tokenType: 'value',
    valueType: 'percentage',
    meta: {
      percentageValue: '10',
      percentageTarget: 'base_freight',
    },
  },
];

export const WithInitialData: Story = {
  render: () => (
    <FormulaBuilderBlock
      label="Freight on Value"
      initialData={{
        formula: {
          tokens: sampleTokens,
          expression: 'base_freight + 0.10',
        },
      }}
    />
  ),
};
