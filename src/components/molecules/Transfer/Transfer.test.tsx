import React from 'react';
import { render, screen } from '@testing-library/react';
import { Transfer, TransferItem } from './Transfer';

describe('Transfer', () => {
  it('renders composable TransferItem children', () => {
    render(
      <Transfer>
        <TransferItem id="1" title="Item Alpha" />
        <TransferItem id="2" title="Item Beta" />
      </Transfer>
    );
    expect(screen.getByText('Item Alpha')).toBeInTheDocument();
    expect(screen.getByText('Item Beta')).toBeInTheDocument();
  });
});
