import React from 'react';
import { render } from '@testing-library/react-native';
import CommentsList from '../CommentsList';
import { Comment } from '../../../types';

// Mock the Markdown component since it's a third-party component
jest.mock('react-native-markdown-display', () => {
    return {
        __esModule: true,
        default: ({ children }: { children: string }) => <>{children}</>,
    };
});

describe('CommentsList', () => {
    const mockComment: Comment = {
        id: '1',
        body: 'Test comment',
        createdAt: '2024-03-20T10:00:00Z',
        author: {
            login: 'testuser',
            avatarUrl: 'https://example.com/avatar.jpg',
        },
    };

    it('renders "No comments yet" when there are no comments', () => {
        const { getByTestId } = render(
            <CommentsList comments={[]} totalCount={0} />
        );
        expect(getByTestId('no-comments')).toBeTruthy();
    });

    it('renders the correct number of comments', () => {
        const comments = [
            { node: mockComment },
            { node: { ...mockComment, id: '2' } },
        ];
        const { getByTestId } = render(
            <CommentsList comments={comments} totalCount={2} />
        );
        expect(getByTestId('comments-count')).toBeTruthy();
    });

    it('renders comment content correctly', () => {
        const { getByTestId } = render(
            <CommentsList comments={[{ node: mockComment }]} totalCount={1} />
        );
        expect(getByTestId(`author-${mockComment.id}`)).toBeTruthy();
        expect(getByTestId(`avatar-${mockComment.id}`)).toBeTruthy();
        expect(getByTestId(`date-${mockComment.id}`)).toBeTruthy();
    });

    it('renders multiple comments with correct IDs', () => {
        const comments = [
            { node: mockComment },
            { node: { ...mockComment, id: '2' } },
        ];
        const { getByTestId } = render(
            <CommentsList comments={comments} totalCount={2} />
        );

        // Check first comment
        expect(getByTestId(`author-1`)).toBeTruthy();
        expect(getByTestId(`avatar-1`)).toBeTruthy();
        expect(getByTestId(`date-1`)).toBeTruthy();

        // Check second comment
        expect(getByTestId(`author-2`)).toBeTruthy();
        expect(getByTestId(`avatar-2`)).toBeTruthy();
        expect(getByTestId(`date-2`)).toBeTruthy();
    });
}); 