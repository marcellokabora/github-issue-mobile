import { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_ISSUES } from "../lib/queries";
import { PageInfo } from "../types";

export const useIssues = (search: string, status: string) => {
    const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const flatListRef = useRef(null);
    const query = `repo:facebook/react-native is:issue ${search} ${(!status || status === "OPEN") ? "state:open" : "state:closed"}`;

    useEffect(() => {
        if (flatListRef.current && 'scrollToOffset' in flatListRef.current) {
            (flatListRef.current as any).scrollToOffset({ offset: 0, animated: false });
        }
    }, [search, status]);

    const { loading, error, data, fetchMore } = useQuery(SEARCH_ISSUES, {
        variables: {
            query,
            first: 10,
        },
        skip: !search,
        onCompleted: (data) => {
            setPageInfo(data.search.pageInfo);
        },
    });

    const issues = data?.search?.edges?.map((edge: any) => edge.node) || [];

    const loadMore = async () => {
        if (isLoadingMore || !pageInfo?.hasNextPage || !pageInfo?.endCursor) return;

        setIsLoadingMore(true);
        try {
            const result = await fetchMore({
                variables: {
                    query,
                    first: 10,
                    after: pageInfo.endCursor,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    return {
                        search: {
                            ...prev.search,
                            pageInfo: fetchMoreResult.search.pageInfo,
                            edges: [...prev.search.edges, ...fetchMoreResult.search.edges],
                        },
                    };
                },
            });

            if (result.data?.search?.pageInfo) {
                setPageInfo(result.data.search.pageInfo);
            }
        } finally {
            setIsLoadingMore(false);
        }
    };

    return {
        issues,
        loading,
        error,
        pageInfo,
        isLoadingMore,
        loadMore,
        flatListRef,
    };
}; 