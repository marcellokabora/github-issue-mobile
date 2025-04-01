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

    it('renders all basic issue information correctly', () => {
        const { getByTestId } = render(<IssueDetailsInfo issue={mockIssue} />);

        // Check author information
        expect(getByTestId('issue-author-avatar')).toBeTruthy();
        expect(getByTestId('issue-author-info')).toHaveTextContent(mockIssue.author.login);
        expect(getByTestId('issue-createdAt')).toHaveTextContent(formatDate(mockIssue.createdAt));

        // Check issue details
        expect(getByTestId('issue-title')).toHaveTextContent(mockIssue.title);
    });

    it('handles empty issue body', () => {
        const emptyIssue = {
            ...mockIssue,
            body: ''
        };
        const { queryByText } = render(<IssueDetailsInfo issue={emptyIssue} />);
        expect(queryByText('This is a test issue body.')).toBeNull();
    });

    it('renders markdown content correctly', () => {
        const markdownIssue = {
            ...mockIssue,
            body: '# Heading\n- List item 1\n- List item 2\n\n**Bold text**'
        };
        const { getByText } = render(<IssueDetailsInfo issue={markdownIssue} />);

        expect(getByText('Heading')).toBeTruthy();
        expect(getByText('List item 1')).toBeTruthy();
        expect(getByText('List item 2')).toBeTruthy();
        expect(getByText('Bold text')).toBeTruthy();
    });

    it('renders with different date format', () => {
        const futureIssue = {
            ...mockIssue,
            createdAt: '2025-12-31T23:59:59Z'
        };
        const { getByTestId } = render(<IssueDetailsInfo issue={futureIssue} />);
        const authorInfo = getByTestId('issue-createdAt');
        expect(authorInfo).toHaveTextContent(formatDate(futureIssue.createdAt));
    });

    it('handles long issue titles', () => {
        const longTitleIssue = {
            ...mockIssue,
            title: 'This is a very long issue title that should wrap properly and still be readable in the UI'
        };
        const { getByTestId } = render(<IssueDetailsInfo issue={longTitleIssue} />);
        expect(getByTestId('issue-title')).toHaveTextContent(longTitleIssue.title);
    });

}); 