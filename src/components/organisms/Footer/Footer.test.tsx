import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer, FooterButton } from './Footer';

describe('Footer', () => {
  it('renders composable FooterButton children', () => {
    render(
      <Footer>
        <FooterButton variant="secondary">Cancel</FooterButton>
        <FooterButton variant="primary">Save</FooterButton>
      </Footer>
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
