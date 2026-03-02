import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from './Table';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableHead } from './TableHead';
import { TableCell } from './TableCell';

describe('Table Component', () => {
  it('renders correctly with composable children', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>30</TableCell>
            <TableCell>New York</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>25</TableCell>
            <TableCell>San Francisco</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>40</TableCell>
            <TableCell>Chicago</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    // Check if column headers are rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();

    // Check if data is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
  });
});

describe('TableCell Component', () => {
  it('renders with different background colors', () => {
    const { rerender } = render(
      <table><tbody><tr>
        <TableCell backgroundColor="white">Cell Content</TableCell>
      </tr></tbody></table>
    );

    let cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('bg-[var(--bg-primary)]');

    rerender(
      <table><tbody><tr>
        <TableCell backgroundColor="bg">Cell Content</TableCell>
      </tr></tbody></table>
    );
    cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('bg-[var(--bg-secondary)]');
  });

  it('renders with different line variants', () => {
    const { rerender } = render(
      <table><tbody><tr>
        <TableCell lineVariant="single">Cell Content</TableCell>
      </tr></tbody></table>
    );

    let cell = screen.getByText('Cell Content').closest('td');
    let contentDiv = cell?.querySelector('div');
    expect(contentDiv).toHaveClass('gap-[var(--spacing-x1)]');

    rerender(
      <table><tbody><tr>
        <TableCell lineVariant="double">Cell Content</TableCell>
      </tr></tbody></table>
    );
    cell = screen.getByText('Cell Content').closest('td');
    contentDiv = cell?.querySelector('div');
    expect(contentDiv).toHaveClass('gap-[var(--spacing-x2)]');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <table><tbody><tr>
        <TableCell size="md">Cell Content</TableCell>
      </tr></tbody></table>
    );

    let cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('pr-[var(--spacing-x4)]');

    rerender(
      <table><tbody><tr>
        <TableCell size="lg">Cell Content</TableCell>
      </tr></tbody></table>
    );
    cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('pr-[var(--spacing-x4)]');

    rerender(
      <table><tbody><tr>
        <TableCell size="xl">Cell Content</TableCell>
      </tr></tbody></table>
    );
    cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('pr-[var(--spacing-x5)]');
  });

  it('handles different states correctly', () => {
    const { rerender } = render(
      <table><tbody><tr>
        <TableCell state="default">Cell Content</TableCell>
      </tr></tbody></table>
    );

    rerender(
      <table><tbody><tr>
        <TableCell state="hover">Cell Content</TableCell>
      </tr></tbody></table>
    );
    let cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('bg-[var(--border-secondary)]');

    rerender(
      <table><tbody><tr>
        <TableCell state="selected">Cell Content</TableCell>
      </tr></tbody></table>
    );
    cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('bg-[var(--border-secondary)]');
  });
});
