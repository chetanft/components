import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
    it('renders with standard padding by default (md size)', () => {
        render(<Card>Content</Card>);
        // Default (md) should have p-6 (standard padding)
        // The implementation uses: isSmall ? "p-3" : "p-6"
        // isSmall = size === 'sm' || size === 'small'
        // default size is 'md', so isSmall is false, so p-6
        const cardContent = screen.getByText('Content').closest('.p-6');
        expect(cardContent).toBeInTheDocument();
    });

    it('renders with compact padding for sm size', () => {
        render(<Card size="sm">Content</Card>);
        // sm should have p-3 (compact padding)
        const cardContent = screen.getByText('Content').closest('.p-3');
        expect(cardContent).toBeInTheDocument();
    });

    it('renders with compact padding for small size (backward compatibility)', () => {
        render(<Card size="small">Content</Card>);
        // small should map to sm (compact padding)
        const cardContent = screen.getByText('Content').closest('.p-3');
        expect(cardContent).toBeInTheDocument();
    });

    it('renders with standard padding for md size', () => {
        render(<Card size="md">Content</Card>);
        // md should have p-6 (standard padding)
        const cardContent = screen.getByText('Content').closest('.p-6');
        expect(cardContent).toBeInTheDocument();
    });

    it('renders with standard padding for default size (backward compatibility)', () => {
        render(<Card size="default">Content</Card>);
        // default should map to md (standard padding) - NOTE: This is a behavior change from legacy
        // Legacy: default -> compact. New: default -> standard.
        // We decided to align default to md.
        const cardContent = screen.getByText('Content').closest('.p-6');
        expect(cardContent).toBeInTheDocument();
    });
});
