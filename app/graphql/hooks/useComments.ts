import { useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { GET_ISSUE_COMMENTS } from "../queries";
import { Comment, CommentsData } from "../types/comments";

interface UseCommentsReturn {
    comments: Array<{ node: Comment }>;
    loading: boolean;
    error: Error | undefined;
    pageInfo: { hasNextPage: boolean; endCursor: string } | null;
    isLoadingMore: boolean;
    loadMoreComments: () => Promise<void>;
    totalCount: number;
}

export const useComments = (issueNumber: number): UseCommentsReturn => {
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [pageInfo, setPageInfo] = useState<{ hasNextPage: boolean; endCursor: string } | null>(null);
    const [comments, setComments] = useState<Array<{ node: Comment }>>([]);

    const COMMENTS_QUERY = {
        owner: "facebook",
        name: "react-native",
        first: 10,
        number: issueNumber,
    };

    const { loading, error, data, fetchMore } = useQuery<CommentsData>(GET_ISSUE_COMMENTS, {
        variables: {
            ...COMMENTS_QUERY,
        },
        skip: !issueNumber,
        onCompleted: (data) => {
            if (data?.repository?.issue?.comments) {
                setComments(data.repository.issue.comments.edges);
                setPageInfo(data.repository.issue.comments.pageInfo);
            }
        },
    });

    const loadMoreComments = useCallback(async () => {
        if (isLoadingMore || !pageInfo?.hasNextPage || !pageInfo?.endCursor) return;

        setIsLoadingMore(true);

        try {
            const result = await fetchMore({
                variables: {
                    ...COMMENTS_QUERY,
                    after: pageInfo.endCursor,
                },
            });

            if (result.data?.repository?.issue?.comments) {
                const newComments = result.data.repository.issue.comments.edges;
                setComments(prevComments => [...prevComments, ...newComments]);
                setPageInfo(result.data.repository.issue.comments.pageInfo);
            }
        } catch (error) {
            console.error('Error loading more comments:', error);
            // You might want to show a toast or error message to the user here
        } finally {
            setIsLoadingMore(false);
        }
    }, [isLoadingMore, pageInfo, fetchMore]);

    return {
        comments,
        loading,
        error,
        pageInfo,
        isLoadingMore,
        loadMoreComments,
        totalCount: data?.repository?.issue?.commentsCount?.totalCount || 0,
    };
}; 