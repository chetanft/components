import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from './Table';
import type { TableColumn } from './Table';
import { TableCell } from './TableCell';

describe('Table Component', () => {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', type: 'text' },
    { key: 'age', title: 'Age', type: 'number' },
    { key: 'location', title: 'Location', type: 'text' },
  ];

  const data = [
    { id: 1, name: 'John Doe', age: 30, location: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, location: 'San Francisco' },
    { id: 3, name: 'Bob Johnson', age: 40, location: 'Chicago' },
  ];

  it('renders correctly with the provided data', () => {
    render(<Table columns={columns} data={data} />);

    // Check if column headers are rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();

    // Check if data is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('handles row selection correctly', () => {
    const handleSelectionChange = jest.fn();

    render(
      <Table
        columns={columns}
        data={data}
        selectable
        onSelectionChange={handleSelectionChange}
      />
    );

    // Find all checkboxes (one for header and one for each row)
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(4); // 3 rows + header

    // Select the first row
    fireEvent.click(checkboxes[1]);
    expect(handleSelectionChange).toHaveBeenCalledWith([1]);
  });

  it('applies different cell sizes based on data length', () => {
    // Test with small dataset (should use xl size)
    const { rerender } = render(<Table columns={columns} data={[data[0]]} />);

    // Test with medium dataset (should use lg size)
    const mediumData = Array(15).fill(null).map((_, i) => ({
      id: i,
      name: `Person ${i}`,
      age: 20 + i,
      location: 'Location'
    }));

    rerender(<Table columns={columns} data={mediumData} />);

    // Test with large dataset (should use md size)
    const largeData = Array(25).fill(null).map((_, i) => ({
      id: i,
      name: `Person ${i}`,
      age: 20 + i,
      location: 'Location'
    }));

    rerender(<Table columns={columns} data={largeData} />);
  });
});

describe('TableCell Component', () => {
  it('renders with different background colors', () => {
    const { rerender } = render(
      <TableCell backgroundColor="white">Cell Content</TableCell>
    );

    let cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('bg-[var(--bg-primary)]');

    rerender(<TableCell backgroundColor="bg">Cell Content</TableCell>);
    cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('bg-[var(--bg-secondary)]');
  });

  it('renders with different line variants', () => {
    const { rerender } = render(
      <TableCell lineVariant="single">Cell Content</TableCell>
    );

    let cell = screen.getByText('Cell Content').closest('td');
    let contentDiv = cell?.querySelector('div');
    expect(contentDiv).toHaveClass('gap-[4px]');

    rerender(<TableCell lineVariant="double">Cell Content</TableCell>);
    cell = screen.getByText('Cell Content').closest('td');
    contentDiv = cell?.querySelector('div');
    expect(contentDiv).toHaveClass('gap-[8px]');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <TableCell size="md">Cell Content</TableCell>
    );

    let cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('py-[12px]');

    rerender(<TableCell size="lg">Cell Content</TableCell>);
    cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('py-[16px]');

    rerender(<TableCell size="xl">Cell Content</TableCell>);
    cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('py-[20px]');
  });

  it('handles different states correctly', () => {
    const { rerender } = render(
      <TableCell state="default">Cell Content</TableCell>
    );

    rerender(<TableCell state="hover">Cell Content</TableCell>);
    let cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('bg-[var(--border-secondary)]');

    rerender(<TableCell state="selected">Cell Content</TableCell>);
    cell = screen.getByText('Cell Content').closest('td');
    expect(cell).toHaveClass('bg-[var(--border-secondary)]');
  });
}); 