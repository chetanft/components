import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

// Mock Portal to render children directly in the document body
jest.mock('react-dom', () => {
    const original = jest.requireActual('react-dom');
    return {
        ...original,
        createPortal: (node: React.ReactNode) => node,
    };
});

describe('Modal Component', () => {
    it('renders when open', () => {
        render(
            <Modal open={true} title="Test Modal">
                <p>Modal Content</p>
            </Modal>
        );
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        render(
            <Modal open={false} title="Test Modal">
                <p>Modal Content</p>
            </Modal>
        );
        expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });

    it('applies correct width for sm size', () => {
        render(
            <Modal open={true} size="sm">
                <p>Content</p>
            </Modal>
        );
        // The modal content div has the style width
        // We need to find the element that has the width style.
        // Based on implementation:
        // <div ... style={{ width: ... }}>

        // We can find by text content and get the closest div with style
        const content = screen.getByText('Content').closest('div')?.parentElement;
        // Wait, structure is:
        // div (fixed inset-0) -> div (backdrop)
        // div (relative z-10 ... style={{ width: ... }}) -> div (header) -> div (body) -> children

        // So getting text 'Content' -> div (body) -> div (modal content wrapper)
        const modalWrapper = screen.getByText('Content').closest('.relative.z-10');
        expect(modalWrapper).toHaveStyle({ width: '400px' });
    });

    it('applies correct width for md size (default)', () => {
        render(
            <Modal open={true}>
                <p>Content</p>
            </Modal>
        );
        const modalWrapper = screen.getByText('Content').closest('.relative.z-10');
        expect(modalWrapper).toHaveStyle({ width: '520px' });
    });

    it('applies correct width for lg size', () => {
        render(
            <Modal open={true} size="lg">
                <p>Content</p>
            </Modal>
        );
        const modalWrapper = screen.getByText('Content').closest('.relative.z-10');
        expect(modalWrapper).toHaveStyle({ width: '720px' });
    });

    it('applies correct width for xl size', () => {
        render(
            <Modal open={true} size="xl">
                <p>Content</p>
            </Modal>
        );
        const modalWrapper = screen.getByText('Content').closest('.relative.z-10');
        expect(modalWrapper).toHaveStyle({ width: '960px' });
    });

    it('applies correct width for full size', () => {
        render(
            <Modal open={true} size="full">
                <p>Content</p>
            </Modal>
        );
        const modalWrapper = screen.getByText('Content').closest('.relative.z-10');
        expect(modalWrapper).toHaveStyle({ width: '90vw' });
    });

    it('allows width override', () => {
        render(
            <Modal open={true} width={300}>
                <p>Content</p>
            </Modal>
        );
        const modalWrapper = screen.getByText('Content').closest('.relative.z-10');
        expect(modalWrapper).toHaveStyle({ width: '300px' });
    });
});
