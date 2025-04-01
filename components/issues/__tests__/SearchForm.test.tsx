import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SearchForm from '../SearchForm';
import { ISSUE_STATUS } from '../../../utils/constants';

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
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Setup default mock implementations
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useLocalSearchParams as jest.Mock).mockReturnValue({ search: '', status: ISSUE_STATUS.OPEN });
    });

    it('renders the search form with all required elements', () => {
        const { getByTestId } = render(<SearchForm />);

        // Check if all required elements are present
        expect(getByTestId('search-input')).toBeTruthy();
        expect(getByTestId('search-button')).toBeTruthy();
        expect(getByTestId(`status-button-${ISSUE_STATUS.OPEN}`)).toBeTruthy();
        expect(getByTestId(`status-button-${ISSUE_STATUS.CLOSED}`)).toBeTruthy();
    });

    it('allows entering search text', () => {
        const { getByTestId } = render(<SearchForm />);
        const searchInput = getByTestId('search-input');

        fireEvent.changeText(searchInput, 'test search');
        expect(searchInput.props.value).toBe('test search');
    });

    it('submits search when pressing the search button', () => {
        const { getByTestId } = render(<SearchForm />);
        const searchInput = getByTestId('search-input');
        const searchButton = getByTestId('search-button');

        fireEvent.changeText(searchInput, 'test search');
        fireEvent.press(searchButton);

        expect(mockRouter.setParams).toHaveBeenCalledWith({
            search: 'test search',
            status: ISSUE_STATUS.OPEN
        });
    });

    it('changes status when pressing status buttons', () => {
        const { getByTestId } = render(<SearchForm />);
        const closedButton = getByTestId(`status-button-${ISSUE_STATUS.CLOSED}`);

        fireEvent.press(closedButton);

        expect(mockRouter.setParams).toHaveBeenCalledWith({
            status: ISSUE_STATUS.CLOSED
        });
    });

    it('initializes with search and status from URL params', () => {
        const initialSearch = 'initial search';
        (useLocalSearchParams as jest.Mock).mockReturnValue({
            search: initialSearch,
            status: ISSUE_STATUS.CLOSED
        });

        const { getByTestId } = render(<SearchForm />);
        const searchInput = getByTestId('search-input');

        expect(searchInput.props.value).toBe(initialSearch);
    });
}); 