import { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_ISSUES } from "../queries";
import { PageInfo, Issue } from "../types";
import { ISSUE_STATUS } from "@/app/utils/constants";

interface UseIssuesProps {
    search?: string;
    status?: string;
}

interface UseIssuesReturn {
    issues: Issue[];
    loading: boolean;
    error: Error | undefined;
    pageInfo: PageInfo | null;
    isLoadingMore: boolean;
    loadMore: () => Promise<void>;
    flatListRef: React.RefObject<any>;
}

export const useIssues = ({ search = "", status = ISSUE_STATUS.OPEN }: UseIssuesProps = {}): UseIssuesReturn => {
    const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const flatListRef = useRef(null);

    // Base query parts
    const baseQuery = "repo:facebook/react-native is:issue";
    const stateQuery = (!status || status === ISSUE_STATUS.OPEN) ? "state:open" : "state:closed";
    const sortQuery = "sort:created-desc";

    // Construct the complete query
    const query = search
        ? `${baseQuery} ${search} ${stateQuery} ${sortQuery}`
        : `${baseQuery} ${stateQuery} ${sortQuery}`;

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
        onCompleted: (data) => {
            if (data?.search?.pageInfo) {
                setPageInfo(data.search.pageInfo);
            }
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