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
    
    // Initially closed
    const button = screen.getByRole('button', { name: /add/i });
    expect(button).toBeInTheDocument();
    
    // Click to open
    fireEvent.click(button);
    
    // Now open
    const subtractButton = screen.getByRole('button', { name: /subtract/i });
    expect(subtractButton).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    
    // Click to close
    fireEvent.click(subtractButton);
    
    // Now closed again
    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeInTheDocument();
  });

  it('calls onToggle when provided', () => {
    const handleToggle = jest.fn();
    render(
      <Collapsible header="Test Header" onToggle={handleToggle}>
        Content
      </Collapsible>
    );
    
    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);
    
    expect(handleToggle).toHaveBeenCalledWith(true);
  });

  it('renders badges when provided', () => {
    render(
      <Collapsible 
        header="Test Header" 
        badges={{ loads: 5, invoices: 3, materials: 2 }}
      />
    );
    
    expect(screen.getByText('Loads: 5')).toBeInTheDocument();
    expect(screen.getByText('Invoices: 3')).toBeInTheDocument();
    expect(screen.getByText('Materials: 2')).toBeInTheDocument();
  });

  it('renders form type collapsible with button icons', () => {
    render(<Collapsible header="Test Header" type="form" />);
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('renders text type collapsible with chevron icons', () => {
    render(<Collapsible header="Test Header" type="text" />);
    expect(screen.getByRole('button', { name: 'Expand' })).toBeInTheDocument();
  });

  it('renders with white background when specified', () => {
    const { container } = render(<Collapsible header="Test Header" background="white" />);
    expect(container.firstChild).toHaveClass('bg-white');
  });

  it('renders with bg (gray) background by default', () => {
    const { container } = render(<Collapsible header="Test Header" />);
    expect(container.firstChild).toHaveClass('bg-[#F8F8F9]');
  });

  it('renders in submitted stage with default badges', () => {
    render(<Collapsible header="Test Header" stage="submitted" />);
    
    expect(screen.getByText('Loads: 1')).toBeInTheDocument();
    expect(screen.getByText('Invoices: 1')).toBeInTheDocument();
    expect(screen.getByText('Materials: 1')).toBeInTheDocument();
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