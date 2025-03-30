export interface Issue {
    id: string;
    title: string;
    state: string;
    number: number;
    createdAt: string;
    repository: {
        name: string;
        owner: {
            login: string;
        };
    };
}

export interface IssueDetail {
    id: string;
    title: string;
    body: string;
    state: string;
    number: number;
    createdAt: string;
    author: {
        login: string;
        avatarUrl: string;
    };
}

export interface IssueDetailsInfoProps {
    issue: IssueDetail;
} 