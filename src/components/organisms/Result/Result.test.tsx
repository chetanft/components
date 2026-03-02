import React from 'react';
import { render, screen } from '@testing-library/react';
import { Result, ResultStatusIcon } from './Result';
import { ResultIcon } from './ResultIcon';
import { ResultTitle } from './ResultTitle';
import { ResultSubtitle } from './ResultSubtitle';
import { ResultExtra } from './ResultExtra';

describe('Result', () => {
  it('renders composable children', () => {
    render(
      <Result status="success">
        <ResultIcon><ResultStatusIcon status="success" /></ResultIcon>
        <ResultTitle>Success!</ResultTitle>
        <ResultSubtitle>Operation completed.</ResultSubtitle>
        <ResultExtra><button>OK</button></ResultExtra>
      </Result>
    );
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Operation completed.')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
  });
});
