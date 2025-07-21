import React from 'react';
import { render } from '@testing-library/react';
import { Icon } from './Icon';

describe('Tracker Icon', () => {
  it('renders correctly', () => {
    const { container } = render(<Icon name="tracker" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom size', () => {
    const { container } = render(<Icon name="tracker" size={24} />);
    const iconWrapper = container.querySelector('.icon');
    expect(iconWrapper).toHaveStyle('width: 24px');
    expect(iconWrapper).toHaveStyle('height: 24px');
  });

  it('applies custom color', () => {
    const { container } = render(<Icon name="tracker" color="#FF0000" />);
    const iconWrapper = container.querySelector('.icon');
    expect(iconWrapper).toHaveStyle('color: #FF0000');
  });
}); 