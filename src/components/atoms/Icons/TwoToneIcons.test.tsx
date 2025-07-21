import React from 'react';
import { render } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { ControlTower } from './ControlTower';
import { MyTrip } from './MyTrip';
import { Reports } from './Reports';
import { Indent } from './Indent';

describe('Two-Tone Icons', () => {
  it('renders Dashboard icon correctly', () => {
    const { container } = render(<Dashboard />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute('width', '24');
    expect(container.querySelector('svg')).toHaveAttribute('height', '24');
  });

  it('renders ControlTower icon correctly', () => {
    const { container } = render(<ControlTower />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute('width', '24');
    expect(container.querySelector('svg')).toHaveAttribute('height', '24');
  });

  it('renders MyTrip icon correctly', () => {
    const { container } = render(<MyTrip />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute('width', '24');
    expect(container.querySelector('svg')).toHaveAttribute('height', '24');
  });

  it('renders Reports icon correctly', () => {
    const { container } = render(<Reports />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute('width', '24');
    expect(container.querySelector('svg')).toHaveAttribute('height', '24');
  });

  it('renders Indent icon correctly', () => {
    const { container } = render(<Indent />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('svg')).toHaveAttribute('width', '24');
    expect(container.querySelector('svg')).toHaveAttribute('height', '24');
  });
}); 