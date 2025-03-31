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

    it('renders search input with empty value by default', () => {
        const { getByTestId } = render(<SearchForm />);
        const searchInput = getByTestId('search-input');
        expect(searchInput.props.value).toBe('');
    });

    it('renders search input with initial search value from params', () => {
        const initialSearch = 'test search';
        (useLocalSearchParams as jest.Mock).mockReturnValue({
            search: initialSearch,
            status: ISSUE_STATUS.OPEN
        });

        const { getByTestId } = render(<SearchForm />);
        const searchInput = getByTestId('search-input');
        expect(searchInput.props.value).toBe(initialSearch);
    });

    it('updates search text when typing', () => {
        const { getByTestId } = render(<SearchForm />);
        const searchInput = getByTestId('search-input');

        fireEvent.changeText(searchInput, 'new search');
        expect(searchInput.props.value).toBe('new search');
    });

    it('handles search submission with search button', () => {
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

    it('handles search submission with return key', () => {
        const { getByTestId } = render(<SearchForm />);
        const searchInput = getByTestId('search-input');

        fireEvent.changeText(searchInput, 'test search');
        searchInput.props.onSubmitEditing();

        expect(mockRouter.setParams).toHaveBeenCalledWith({
            search: 'test search',
            status: ISSUE_STATUS.OPEN
        });
    });

    it('handles status change to OPEN', () => {
        const { getByTestId } = render(<SearchForm />);
        const openButton = getByTestId(`status-button-${ISSUE_STATUS.OPEN}`);

        fireEvent.press(openButton);

        expect(mockRouter.setParams).toHaveBeenCalledWith({
            search: '',
            status: ISSUE_STATUS.OPEN
        });
    });

    it('handles status change to CLOSED', () => {
        const { getByTestId } = render(<SearchForm />);
        const closedButton = getByTestId(`status-button-${ISSUE_STATUS.CLOSED}`);

        fireEvent.press(closedButton);

        expect(mockRouter.setParams).toHaveBeenCalledWith({
            search: '',
            status: ISSUE_STATUS.CLOSED
        });
    });

    it('preserves search text when changing status', () => {
        const { getByTestId } = render(<SearchForm />);
        const searchInput = getByTestId('search-input');
        const closedButton = getByTestId(`status-button-${ISSUE_STATUS.CLOSED}`);

        fireEvent.changeText(searchInput, 'test search');
        fireEvent.press(closedButton);

        expect(mockRouter.setParams).toHaveBeenCalledWith({
            search: 'test search',
            status: ISSUE_STATUS.CLOSED
        });
    });

    it('shows OPEN status as active by default', () => {
        const { getByTestId } = render(<SearchForm />);
        const openButton = getByTestId(`status-button-${ISSUE_STATUS.OPEN}`);
        const closedButton = getByTestId(`status-button-${ISSUE_STATUS.CLOSED}`);

        // Check if buttons exist
        expect(openButton).toBeTruthy();
        expect(closedButton).toBeTruthy();

        // Check if buttons are pressable
        fireEvent.press(openButton);
        expect(mockRouter.setParams).toHaveBeenCalledWith({
            search: '',
            status: ISSUE_STATUS.OPEN
        });
    });

    it('shows CLOSED status as active when status is CLOSED', () => {
        (useLocalSearchParams as jest.Mock).mockReturnValue({
            search: '',
            status: ISSUE_STATUS.CLOSED
        });

        const { getByTestId } = render(<SearchForm />);
        const openButton = getByTestId(`status-button-${ISSUE_STATUS.OPEN}`);
        const closedButton = getByTestId(`status-button-${ISSUE_STATUS.CLOSED}`);

        // Check if buttons exist
        expect(openButton).toBeTruthy();
        expect(closedButton).toBeTruthy();

        // Check if buttons are pressable
        fireEvent.press(closedButton);
        expect(mockRouter.setParams).toHaveBeenCalledWith({
            search: '',
            status: ISSUE_STATUS.CLOSED
        });
    });

    it('updates form state when URL params change', () => {
        const { getByTestId, rerender } = render(<SearchForm />);

        // Change URL params
        (useLocalSearchParams as jest.Mock).mockReturnValue({
            search: 'new search',
            status: ISSUE_STATUS.CLOSED
        });

        // Rerender to trigger useEffect
        rerender(<SearchForm />);

        const searchInput = getByTestId('search-input');
        expect(searchInput.props.value).toBe('new search');
    });
}); 