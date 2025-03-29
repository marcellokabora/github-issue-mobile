export interface PageInfo {
    hasNextPage: boolean;
    endCursor: string;
}

export interface Comment {
    id: string;
    body: string;
    author: {
        login: string;
        avatarUrl: string;
    };
    createdAt: string;
}

export interface Issue {
    id: string;
    number: number;
    title: string;
    state: string;
    createdAt: string;
    author: {
        login: string;
        avatarUrl: string;
    };
}

export interface SearchIssuesQuery {
    repository: {
        issues: {
            pageInfo: PageInfo;
            edges: Array<{
                node: Issue;
            }>;
        };
    };
}

export interface IssueCommentsQuery {
    repository: {
        issue: {
            commentsCount: {
                totalCount: number;
            };
            comments: {
                pageInfo: PageInfo;
                edges: Array<{
                    node: Comment;
                }>;
            };
        };
    };
}

export interface IssueDetailQuery {
    repository: {
        issue: Issue & {
            body: string;
            commentsCount: {
                totalCount: number;
            };
        };
    };
}

export interface CommentsListProps {
    issueNumber: number;
}

export interface IssueDetailsInfoProps {
    issueNumber: number;
} 