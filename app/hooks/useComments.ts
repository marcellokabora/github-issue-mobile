import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ISSUE_COMMENTS } from "../lib/queries";
import { Comment, CommentsData } from "../types";

export const useComments = (issueNumber: number) => {
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [pageInfo, setPageInfo] = useState<{ hasNextPage: boolean; endCursor: string } | null>(null);
    const [comments, setComments] = useState<Array<{ node: Comment }>>([]);

    const COMMENTS_QUERY = {
        owner: "facebook",
        name: "react-native",
        first: 5,
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

    const loadMoreComments = async () => {
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
        } finally {
            setIsLoadingMore(false);
        }
    };

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