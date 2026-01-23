import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Collapsible } from './Collapsible';

describe('Collapsible Component', () => {
  it('renders with default props', () => {
    render(<Collapsible header="Test Header" />);
    expect(screen.getByText('Test Header')).toBeInTheDocument();
  });

  it('toggles between open and closed states when clicked', () => {
    render(<Collapsible header="Test Header">Content</Collapsible>);
    
    const trigger = screen.getByRole('button', { name: /test header/i });
    fireEvent.click(trigger);
    
    expect(screen.getByText('Content')).toBeInTheDocument();
    
    fireEvent.click(trigger);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('calls onToggle when provided', () => {
    const handleToggle = jest.fn();
    render(
      <Collapsible header="Test Header" onToggle={handleToggle}>
        Content
      </Collapsible>
    );
    
    const trigger = screen.getByRole('button', { name: /test header/i });
    fireEvent.click(trigger);
    
    expect(handleToggle).toHaveBeenCalledWith(true);
  });

  it('renders extra content when provided', () => {
    render(<Collapsible header="Test Header" extra={<span>Actions</span>} />);
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('applies primary background styles when requested', () => {
    const { container } = render(<Collapsible header="Test Header" bg="Primary" />);
    expect(container.firstChild).toHaveClass('bg-[var(--bg-primary)]');
  });

  it('renders with secondary background by default', () => {
    const { container } = render(<Collapsible header="Test Header" />);
    expect(container.firstChild).toHaveClass('bg-[var(--bg-secondary)]');
  });

  it('applies tertiary type border styles', () => {
    const { container } = render(<Collapsible header="Test Header" type="Tertiary" />);
    expect(container.firstChild).toHaveClass('border-[var(--border-secondary)]');
  });

  it('does not toggle when disabled', () => {
    render(
      <Collapsible header="Test Header" disabled>
        Content
      </Collapsible>
    );

    const trigger = screen.getByRole('button', { name: /test header/i });
    fireEvent.click(trigger);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('allows controlled expansion state', () => {
    const { rerender } = render(
      <Collapsible header="Test Header" isExpanded={true}>
        Content
      </Collapsible>
    );
    
    // Should be expanded
    expect(screen.getByText('Content')).toBeInTheDocument();
    
    // Update to collapsed
    rerender(
      <Collapsible header="Test Header" isExpanded={false}>
        Content
      </Collapsible>
    );
    
    // Should be collapsed
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
}); 
