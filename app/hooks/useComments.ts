import { useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { GET_ISSUE_COMMENTS } from "../lib/queries";
import { Comment, CommentsData } from "../types";

export const useComments = (issueNumber: number) => {
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [pageInfo, setPageInfo] = useState<{ hasNextPage: boolean; endCursor: string } | null>(null);
    const [comments, setComments] = useState<Array<{ node: Comment }>>([]);
    const [lastLoadTime, setLastLoadTime] = useState(0);

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
        // Prevent multiple rapid calls (debounce)
        const now = Date.now();
        if (now - lastLoadTime < 1000) return; // 1 second debounce

        if (isLoadingMore || !pageInfo?.hasNextPage || !pageInfo?.endCursor) return;

        setIsLoadingMore(true);
        setLastLoadTime(now);

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
        } finally {
            setIsLoadingMore(false);
        }
    }, [isLoadingMore, pageInfo, lastLoadTime, fetchMore]);

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