import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormulaBuilderBlock } from './FormulaBuilderBlock';
import type { FormulaBuilderBlockProps, FormulaToken } from './FormulaBuilderBlock.types';

// Mock ReactDOM.createPortal to render children inline
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: any) => node,
}));

// Mock the Icon component
jest.mock('../../../atoms/Icons', () => ({
  Icon: (props: any) => <span data-testid={`icon-${props.name}`} />,
}));

// Mock PercentageOfChargeInput
jest.mock('../../../molecules/PercentageOfChargeInput', () => ({
  PercentageOfChargeInput: () => <div data-testid="percentage-input" />,
}));

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

function makeOperatorToken(operator: string): FormulaToken {
  const operatorMap: Record<string, string> = {
    '×': '*', '÷': '/', '+': '+', '-': '-',
  };
  return {
    id: `op-${Math.random()}`,
    kind: 'operator',
    label: operator,
    expressionValue: operatorMap[operator] || operator,
    tokenType: 'operator',
    valueType: 'operator',
  };
}

function renderBlock(props: Partial<FormulaBuilderBlockProps> = {}) {
  return render(<FormulaBuilderBlock {...props} />);
}

describe('FormulaBuilderBlock', () => {
  // ── Empty state ──────────────────────────────────────────────────────
  it('renders in empty state by default with "FOV =" text', () => {
    renderBlock();
    const matches = screen.getAllByText(/FOV\s*=/);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the edit button (icon-edit) in empty state', () => {
    renderBlock();
    const editIcons = screen.getAllByTestId('icon-edit');
    expect(editIcons.length).toBeGreaterThanOrEqual(1);
  });

  // ── Custom label ─────────────────────────────────────────────────────
  it('renders with a custom label prop', () => {
    renderBlock({ label: 'Freight' });
    const matches = screen.getAllByText(/Freight\s*=/);
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  // ── Header formula display text ──────────────────────────────────────
  it('shows formula display text in the header', () => {
    renderBlock();
    // In empty state, getFormulaDisplayText returns "FOV ="
    const headerSpan = screen.getByTitle('FOV =');
    expect(headerSpan).toBeInTheDocument();
    expect(headerSpan.textContent).toBe('FOV =');
  });

  // ── Collapse / expand toggle ─────────────────────────────────────────
  it('collapses content when the minus button is clicked', () => {
    renderBlock();
    // The content area contains "FOV =" text in the body (not just the header)
    const bodyText = screen.getAllByText('FOV =');
    // There should be the header span + the body span
    expect(bodyText.length).toBeGreaterThanOrEqual(2);

    // The collapse/expand button shows "−" when expanded
    const collapseButton = screen.getByText('−');
    fireEvent.click(collapseButton);

    // After collapse, the body "FOV =" disappears; only header one remains
    const afterCollapse = screen.getAllByText('FOV =');
    expect(afterCollapse.length).toBe(1);
  });

  it('expands content when the plus button is clicked after collapse', () => {
    renderBlock();

    // Collapse first
    fireEvent.click(screen.getByText('−'));
    expect(screen.getByText('+')).toBeInTheDocument();

    // Expand
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('−')).toBeInTheDocument();

    // Body content should be visible again
    const allLabels = screen.getAllByText('FOV =');
    expect(allLabels.length).toBeGreaterThanOrEqual(2);
  });

  // ── Reset button ─────────────────────────────────────────────────────
  it('calls onReset callback when Reset button is clicked', () => {
    const onReset = jest.fn();
    renderBlock({ onReset });

    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    expect(onReset).toHaveBeenCalledTimes(1);
  });

  // ── Save button ──────────────────────────────────────────────────────
  it('calls onSave callback when Save Charge button is clicked', () => {
    const onSave = jest.fn();
    renderBlock({ onSave });

    const saveButton = screen.getByText('Save Charge');
    fireEvent.click(saveButton);

    expect(onSave).toHaveBeenCalledTimes(1);
  });

  // ── Validate button ──────────────────────────────────────────────────
  it('calls onValidate callback when Validate button is clicked', () => {
    const onValidate = jest.fn().mockReturnValue(true);
    renderBlock({ onValidate });

    const validateButton = screen.getByText('Validate');
    fireEvent.click(validateButton);

    expect(onValidate).toHaveBeenCalledTimes(1);
  });

  // ── Renders with initialData in formula-input state ──────────────────
  it('renders in formula-input state when initialData has tokens', () => {
    const tokens: FormulaToken[] = [
      makeValueToken({ id: 't1', label: 'Weight', expressionValue: 'Weight' }),
      makeOperatorToken('×'),
      makeValueToken({ id: 't3', label: 'Rate', expressionValue: 'Rate' }),
    ];
    renderBlock({
      label: 'FOV',
      initialData: {
        formula: {
          tokens,
          expression: 'Weight * Rate',
        },
      },
    });

    // The label "FOV =" should still appear
    expect(screen.getAllByText('FOV =').length).toBeGreaterThanOrEqual(1);
  });

  // ── Header shows correct formula display text with tokens ────────────
  it('displays formula expression in header when tokens are provided', () => {
    const tokens: FormulaToken[] = [
      makeValueToken({ id: 't1', label: 'Weight', expressionValue: 'Weight' }),
      makeOperatorToken('+'),
      makeValueToken({ id: 't3', label: 'Volume', expressionValue: 'Volume' }),
    ];
    renderBlock({
      label: 'FOV',
      initialData: {
        formula: {
          tokens,
          expression: 'Weight + Volume',
        },
      },
    });

    // Header should show "FOV= Weight + Volume" (the display text)
    const headerSpan = screen.getByTitle(/FOV=\s*Weight \+ Volume/);
    expect(headerSpan).toBeInTheDocument();
  });

  // ── Edit button is clickable ─────────────────────────────────────────
  it('edit button is clickable without errors', () => {
    renderBlock();
    const editIcons = screen.getAllByTestId('icon-edit');
    // Find the parent button of the first edit icon
    const editButton = editIcons[0].closest('button');
    expect(editButton).toBeTruthy();
    expect(() => fireEvent.click(editButton!)).not.toThrow();
  });

  // ── Header buttons render icons ──────────────────────────────────────
  it('renders reset icon and validate icon in the header', () => {
    renderBlock();
    expect(screen.getByTestId('icon-refresh')).toBeInTheDocument();
    expect(screen.getByTestId('icon-check')).toBeInTheDocument();
  });
});
