import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Collapsible, CollapsibleTrigger, CollapsibleHeader, CollapsibleTitle, CollapsibleExtra, CollapsibleContent, CollapsibleIcon } from './index';

describe('Collapsible Component', () => {
  it('renders with default props', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Test Header</CollapsibleTitle>
          </CollapsibleHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Content</p>
        </CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByText('Test Header')).toBeInTheDocument();
  });

  it('toggles between open and closed states when clicked', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Test Header</CollapsibleTitle>
          </CollapsibleHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Content</p>
        </CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole('button', { name: /test header/i });
    fireEvent.click(trigger);

    expect(screen.getByText('Content')).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('calls onToggle when provided', () => {
    const handleToggle = jest.fn();
    render(
      <Collapsible onToggle={handleToggle}>
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Test Header</CollapsibleTitle>
          </CollapsibleHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Content</p>
        </CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole('button', { name: /test header/i });
    fireEvent.click(trigger);

    expect(handleToggle).toHaveBeenCalledWith(true);
  });

  it('renders extra content when provided', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Test Header</CollapsibleTitle>
            <CollapsibleExtra><span>Actions</span></CollapsibleExtra>
          </CollapsibleHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Content</p>
        </CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('applies primary background styles when requested', () => {
    const { container } = render(
      <Collapsible bg="Primary">
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Test Header</CollapsibleTitle>
          </CollapsibleHeader>
        </CollapsibleTrigger>
      </Collapsible>
    );
    expect(container.firstChild).toHaveClass('bg-[var(--bg-primary)]');
  });

  it('renders with secondary background by default', () => {
    const { container } = render(
      <Collapsible>
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Test Header</CollapsibleTitle>
          </CollapsibleHeader>
        </CollapsibleTrigger>
      </Collapsible>
    );
    expect(container.firstChild).toHaveClass('bg-[var(--bg-secondary)]');
  });

  it('applies tertiary type border styles', () => {
    const { container } = render(
      <Collapsible type="Tertiary">
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Test Header</CollapsibleTitle>
          </CollapsibleHeader>
        </CollapsibleTrigger>
      </Collapsible>
    );
    expect(container.firstChild).toHaveClass('border-[var(--border-secondary)]');
  });

  it('does not toggle when disabled', () => {
    render(
      <Collapsible disabled>
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Test Header</CollapsibleTitle>
          </CollapsibleHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Content</p>
        </CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByRole('button', { name: /test header/i });
    fireEvent.click(trigger);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('allows controlled expansion state', () => {
    const { rerender } = render(
      <Collapsible isExpanded={true}>
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Test Header</CollapsibleTitle>
          </CollapsibleHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Content</p>
        </CollapsibleContent>
      </Collapsible>
    );

    // Should be expanded
    expect(screen.getByText('Content')).toBeInTheDocument();

    // Update to collapsed
    rerender(
      <Collapsible isExpanded={false}>
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Test Header</CollapsibleTitle>
          </CollapsibleHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Content</p>
        </CollapsibleContent>
      </Collapsible>
    );

    // Should be collapsed
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});
