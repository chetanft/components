import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tour, TourStep } from './Tour';

describe('Tour', () => {
  it('renders composable TourStep children when open', () => {
    render(
      <Tour open={true}>
        <TourStep title="Welcome">
          This is the first step.
        </TourStep>
      </Tour>
    );
    // Tour renders via portal into document.body
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('This is the first step.')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(
      <Tour open={false}>
        <TourStep title="Hidden Step">
          Should not appear.
        </TourStep>
      </Tour>
    );
    expect(screen.queryByText('Hidden Step')).not.toBeInTheDocument();
  });
});
