import React from 'react';
import { render } from '@testing-library/react-native';
import IssueDetailsInfo from '../IssueDetailsInfo';
import { formatDate } from '../../../utils/date';

describe('IssueDetailsInfo', () => {
    const mockIssue = {
        id: '123',
        number: 123,
        title: 'Test Issue',
        state: 'OPEN',
        author: {
            login: 'testuser',
            avatarUrl: 'https://example.com/avatar.jpg'
        },
        createdAt: '2024-03-20T10:00:00Z',
        body: '# Test Issue\nThis is a test issue body.'
    };

    it('renders issue number and title correctly', () => {
        const { getByTestId } = render(<IssueDetailsInfo issue={mockIssue} />);

        expect(getByTestId('issue-number')).toHaveTextContent(`#${mockIssue.number}`);
        expect(getByTestId('issue-title')).toHaveTextContent(mockIssue.title);
    });

    it('renders open status badge correctly', () => {
        const { getByText } = render(<IssueDetailsInfo issue={mockIssue} />);

        expect(getByText('OPEN')).toBeTruthy();
    });

    it('renders closed status badge correctly', () => {
        const closedIssue = {
            ...mockIssue,
            state: 'CLOSED'
        };
        const { getByText } = render(<IssueDetailsInfo issue={closedIssue} />);

        expect(getByText('CLOSED')).toBeTruthy();
    });

    it('renders author and creation date correctly', () => {
        const { getByTestId } = render(<IssueDetailsInfo issue={mockIssue} />);
        const authorInfo = getByTestId('issue-author-info');

        expect(authorInfo).toHaveTextContent(`testuser opened this issue on ${formatDate(mockIssue.createdAt)}`);
    });

    // it('renders issue body markdown correctly', () => {
    //     const { getByText } = render(<IssueDetailsInfo issue={mockIssue} />);

    //     expect(getByText('Test Issue')).toBeTruthy();
    //     expect(getByText('This is a test issue body.')).toBeTruthy();
    // });

    it('handles empty issue body', () => {
        const emptyIssue = {
            ...mockIssue,
            body: ''
        };
        const { queryByText } = render(<IssueDetailsInfo issue={emptyIssue} />);

        expect(queryByText('This is a test issue body.')).toBeNull();
    });

    it('renders with different date format', () => {
        const futureIssue = {
            ...mockIssue,
            createdAt: '2025-12-31T23:59:59Z'
        };
        const { getByTestId } = render(<IssueDetailsInfo issue={futureIssue} />);
        const authorInfo = getByTestId('issue-author-info');

        expect(authorInfo).toHaveTextContent(`testuser opened this issue on ${formatDate(futureIssue.createdAt)}`);
    });
}); 