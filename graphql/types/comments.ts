export interface Comment {
    id: string;
    body: string;
    author: {
        login: string;
        avatarUrl: string;
    };
    createdAt: string;
}

export interface CommentsData {
    repository: {
        issue: {
            commentsCount: {
                totalCount: number;
            };
            comments: {
                pageInfo: {
                    hasNextPage: boolean;
                    endCursor: string;
                };
                edges: Array<{
                    node: Comment;
                }>;
            };
        };
    };
} 