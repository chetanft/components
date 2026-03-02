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
            <Modal open={true}>
                <p>Modal Content</p>
            </Modal>
        );
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        render(
            <Modal open={false}>
                <p>Modal Content</p>
            </Modal>
        );
        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });
});
