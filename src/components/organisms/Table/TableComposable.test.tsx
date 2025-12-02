import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from './index';
import { Badge } from '../../atoms/Badge';

describe('Composable Table Components', () => {
  describe('TableHeader', () => {
    it('renders table header with children', () => {
      render(
        <table>
          <TableHeader
            columns={[
              { key: 'name', title: 'Name' },
              { key: 'status', title: 'Status' }
            ]}
            variant="primary"
          />
        </table>
      );

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
    });

    it('renders selectable header when selectable prop is true', () => {
      render(
        <table>
          <TableHeader
            columns={[{ key: 'name', title: 'Name' }]}
            selectable
            allRowIds={[1, 2, 3]}
            selectedRows={[]}
          />
        </table>
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });
  });

  describe('TableHead', () => {
    it('renders table head cell with children', () => {
      render(
        <table>
          <thead>
            <tr>
              <TableHead>Column Name</TableHead>
            </tr>
          </thead>
        </table>
      );

      expect(screen.getByText('Column Name')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <table>
          <thead>
            <tr>
              <TableHead className="custom-class">Test</TableHead>
            </tr>
          </thead>
        </table>
      );

      const th = screen.getByText('Test').closest('th');
      expect(th).toHaveClass('custom-class');
    });

    it('handles sortable prop', () => {
      render(
        <table>
          <thead>
            <tr>
              <TableHead sortable sortDirection="asc">Sortable</TableHead>
            </tr>
          </thead>
        </table>
      );

      const th = screen.getByText('Sortable').closest('th');
      expect(th).toHaveAttribute('aria-sort', 'ascending');
    });
  });

  describe('TableBody', () => {
    it('renders table body with children', () => {
      render(
        <table>
          <TableBody>
            <tr>
              <td>Row 1</td>
            </tr>
          </TableBody>
        </table>
      );

      expect(screen.getByText('Row 1')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <table>
          <TableBody className="custom-body">
            <tr>
              <td>Test</td>
            </tr>
          </TableBody>
        </table>
      );

      const tbody = screen.getByText('Test').closest('tbody');
      expect(tbody).toHaveClass('custom-body');
    });
  });

  describe('TableRow', () => {
    it('renders table row with children (composable API)', () => {
      render(
        <table>
          <tbody>
            <TableRow>
              <TableCell>Cell 1</TableCell>
              <TableCell>Cell 2</TableCell>
            </TableRow>
          </tbody>
        </table>
      );

      expect(screen.getByText('Cell 1')).toBeInTheDocument();
      expect(screen.getByText('Cell 2')).toBeInTheDocument();
    });

    it('renders table row with complex children (Badge)', () => {
      render(
        <table>
          <tbody>
            <TableRow>
              <TableCell>
                <Badge>Active</Badge>
              </TableCell>
            </TableRow>
          </tbody>
        </table>
      );

      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('renders table row with declarative API (row + columns)', () => {
      const row = { id: 1, name: 'John', status: 'Active' };
      const columns = [
        { key: 'name', title: 'Name' },
        { key: 'status', title: 'Status' }
      ];

      render(
        <table>
          <tbody>
            <TableRow row={row} columns={columns} index={0} />
          </tbody>
        </table>
      );

      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('handles selection when selectable', () => {
      const row = { id: 1, name: 'John' };
      const columns = [{ key: 'name', title: 'Name' }];
      const handleSelectionChange = jest.fn();

      render(
        <table>
          <tbody>
            <TableRow
              row={row}
              columns={columns}
              index={0}
              selectable
              selected={false}
              onSelectionChange={handleSelectionChange}
            />
          </tbody>
        </table>
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });
  });

  describe('TableCell with complex children', () => {
    it('renders TableCell with Badge component', () => {
      render(
        <table>
          <tbody>
            <tr>
              <TableCell>
                <Badge>Test Badge</Badge>
              </TableCell>
            </tr>
          </tbody>
        </table>
      );

      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('renders TableCell with custom React component', () => {
      const CustomComponent = () => <div data-testid="custom">Custom</div>;

      render(
        <table>
          <tbody>
            <tr>
              <TableCell>
                <CustomComponent />
              </TableCell>
            </tr>
          </tbody>
        </table>
      );

      expect(screen.getByTestId('custom')).toBeInTheDocument();
    });

    it('renders TableCell with multiple children', () => {
      render(
        <table>
          <tbody>
            <tr>
              <TableCell>
                <Badge>Status</Badge>
                <span>Additional text</span>
              </TableCell>
            </tr>
          </tbody>
        </table>
      );

      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Additional text')).toBeInTheDocument();
    });
  });

  describe('Full composable table structure', () => {
    it('renders complete table with composable API', () => {
      render(
        <Table>
          <TableHeader
            columns={[
              { key: 'name', title: 'Name' },
              { key: 'status', title: 'Status' }
            ]}
          />
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>
                <Badge>Active</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>
                <Badge>Inactive</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getAllByText('Active')).toHaveLength(1);
      expect(screen.getAllByText('Inactive')).toHaveLength(1);
    });
  });
});

