import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import IssuesList from '../IssuesList';
import { useIssues } from '../../../graphql/hooks/useIssues';

// Mock the expo-router hooks
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    useLocalSearchParams: jest.fn(),
}));

// Mock the useIssues hook
jest.mock('../../../graphql/hooks/useIssues', () => ({
    useIssues: jest.fn(),
}));

describe('IssuesList', () => {
    const mockRouter = {
        push: jest.fn(),
    };

    const mockIssues = [
        {
            id: '1',
            number: 1,
            title: 'Test Issue 1',
            createdAt: '2024-01-01T00:00:00Z',
        },
        {
            id: '2',
            number: 2,
            title: 'Test Issue 2',
            createdAt: '2024-01-02T00:00:00Z',
        },
    ];

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Setup default mock implementations
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useLocalSearchParams as jest.Mock).mockReturnValue({ search: '', status: '' });
    });

    it('renders loading state correctly', () => {
        (useIssues as jest.Mock).mockReturnValue({
            issues: [],
            loading: true,
            error: null,
            pageInfo: null,
            isLoadingMore: false,
            loadMore: jest.fn(),
            flatListRef: { current: null },
        });

        const { getByTestId } = render(<IssuesList />);
        expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    it('renders error state correctly', () => {
        const errorMessage = 'Test error message';
        (useIssues as jest.Mock).mockReturnValue({
            issues: [],
            loading: false,
            error: { message: errorMessage },
            pageInfo: null,
            isLoadingMore: false,
            loadMore: jest.fn(),
            flatListRef: { current: null },
        });

        const { getByTestId } = render(<IssuesList />);
        expect(getByTestId('error-message')).toHaveTextContent(errorMessage);
    });

    it('renders empty state when no issues and search is active', () => {
        (useIssues as jest.Mock).mockReturnValue({
            issues: [],
            loading: false,
            error: null,
            pageInfo: null,
            isLoadingMore: false,
            loadMore: jest.fn(),
            flatListRef: { current: null },
        });

        (useLocalSearchParams as jest.Mock).mockReturnValue({ search: 'test', status: '' });

        const { getByText } = render(<IssuesList />);
        expect(getByText('No issues found')).toBeTruthy();
    });

    it('renders issues list correctly', () => {
        const mockLoadMore = jest.fn();
        (useIssues as jest.Mock).mockReturnValue({
            issues: mockIssues,
            loading: false,
            error: null,
            pageInfo: { hasNextPage: true },
            isLoadingMore: false,
            loadMore: mockLoadMore,
            flatListRef: { current: null },
        });

        const { getByText } = render(<IssuesList />);

        expect(getByText('#1')).toBeTruthy();
        expect(getByText('Test Issue 1')).toBeTruthy();
        expect(getByText('#2')).toBeTruthy();
        expect(getByText('Test Issue 2')).toBeTruthy();

    });

    it('navigates to issue detail when pressing an issue', () => {
        (useIssues as jest.Mock).mockReturnValue({
            issues: mockIssues,
            loading: false,
            error: null,
            pageInfo: null,
            isLoadingMore: false,
            loadMore: jest.fn(),
            flatListRef: { current: null },
        });

        const { getByText } = render(<IssuesList />);

        // Press the first issue
        fireEvent.press(getByText('Test Issue 1'));

        // Check if navigation was called with correct params
        expect(mockRouter.push).toHaveBeenCalledWith({
            pathname: '/issue/[id]',
            params: { id: 1 },
        });
    });


    it('shows loading indicator when loading more issues', () => {
        (useIssues as jest.Mock).mockReturnValue({
            issues: mockIssues,
            loading: false,
            error: null,
            pageInfo: { hasNextPage: true },
            isLoadingMore: true,
            loadMore: jest.fn(),
            flatListRef: { current: null },
        });

        const { getByTestId } = render(<IssuesList />);

        // Check if loading indicator is shown
        expect(getByTestId('loading-more-indicator')).toBeTruthy();
    });
}); 