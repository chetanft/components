import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from './Select';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};

// Mock pointer capture methods
window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.HTMLElement.prototype.hasPointerCapture = jest.fn();
window.HTMLElement.prototype.releasePointerCapture = jest.fn();

describe('Select Component', () => {
    it('renders correctly', () => {
        render(
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
            </Select>
        );

        expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('opens content on click', async () => {
        const user = userEvent.setup();
        render(
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
            </Select>
        );

        const trigger = screen.getByRole('combobox');
        await user.click(trigger);

        expect(screen.getByRole('listbox')).toBeInTheDocument();
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('selects an option', async () => {
        const user = userEvent.setup();
        render(
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
            </Select>
        );

        const trigger = screen.getByRole('combobox');
        await user.click(trigger);

        const option1 = screen.getByText('Option 1');
        await user.click(option1);

        expect(screen.getByText('Option 1')).toBeInTheDocument();
        // Trigger should now show Option 1
        // Note: Radix UI closes the content, so Option 2 should not be visible
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    });

    it('renders groups and labels', async () => {
        const user = userEvent.setup();
        render(
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Group 1</SelectLabel>
                        <SelectItem value="option1">Option 1</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        );

        const trigger = screen.getByRole('combobox');
        await user.click(trigger);

        expect(screen.getByText('Group 1')).toBeInTheDocument();
    });
});
