import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SearchForm from '../SearchForm';
import { ISSUE_STATUS } from '@/utils/constants';

// Mock the expo-router hooks
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    useLocalSearchParams: jest.fn(),
}));

describe('SearchForm', () => {
    const mockRouter = {
        setParams: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useLocalSearchParams as jest.Mock).mockReturnValue({ search: '', status: ISSUE_STATUS.OPEN });
    });

    it('renders and handles basic form interactions', () => {
        const { getByTestId } = render(<SearchForm />);
        const searchInput = getByTestId('search-input');
        const searchButton = getByTestId('search-button');
        const closedButton = getByTestId(`status-button-${ISSUE_STATUS.CLOSED}`);

        // Check initial render
        expect(searchInput).toBeTruthy();
        expect(searchButton).toBeTruthy();
        expect(closedButton).toBeTruthy();

        // Test search functionality
        fireEvent.changeText(searchInput, 'test search');
        expect(searchInput.props.value).toBe('test search');
        fireEvent.press(searchButton);
        expect(mockRouter.setParams).toHaveBeenCalledWith({
            search: 'test search',
            status: ISSUE_STATUS.OPEN
        });

        // Test status change
        fireEvent.press(closedButton);
        expect(mockRouter.setParams).toHaveBeenCalledWith({
            status: ISSUE_STATUS.CLOSED
        });
    });

    it('validates search input and handles errors', () => {
        const { getByTestId, getByText, queryByText } = render(<SearchForm />);
        const searchInput = getByTestId('search-input');
        const searchButton = getByTestId('search-button');

        // Test blocked qualifier
        fireEvent.changeText(searchInput, 'repo:test search');
        fireEvent.press(searchButton);
        expect(getByText('Cannot use repo:, org:, or status: qualifiers in search')).toBeTruthy();
        expect(mockRouter.setParams).not.toHaveBeenCalled();

        // Test error clearing
        fireEvent.changeText(searchInput, 'valid search');
        expect(queryByText('Cannot use repo:, org:, or status: qualifiers in search')).toBeNull();
    });

    it('handles URL parameters and keyboard submission', () => {
        const { getByTestId, rerender } = render(<SearchForm />);
        const searchInput = getByTestId('search-input');

        // Test URL param updates
        (useLocalSearchParams as jest.Mock).mockReturnValue({
            search: 'new search',
            status: ISSUE_STATUS.CLOSED
        });
        rerender(<SearchForm />);
        expect(searchInput.props.value).toBe('new search');

        // Test keyboard submission
        fireEvent.changeText(searchInput, 'keyboard search');
        fireEvent(searchInput, 'submitEditing');
        expect(mockRouter.setParams).toHaveBeenCalledWith({
            search: 'keyboard search',
            status: ISSUE_STATUS.CLOSED
        });
    });
}); 