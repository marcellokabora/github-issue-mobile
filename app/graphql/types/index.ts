export * from './issues';
export * from './comments';

export interface PageInfo {
    hasNextPage: boolean;
    endCursor: string;
} 