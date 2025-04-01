import { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_ISSUES } from "../queries";
import { PageInfo, Issue } from "../types";
import { ISSUE_STATUS } from "../../utils/constants";

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

    const baseQuery = "repo:facebook/react-native is:issue";
    const stateQuery = (!status || status === ISSUE_STATUS.OPEN) ? "state:open" : "state:closed";
    const sortQuery = "sort:created-desc";

    const query = search
        ? `${baseQuery} ${search} in:title,body -in:comments ${stateQuery} ${sortQuery}`
        : `${baseQuery} ${stateQuery} ${sortQuery}`;

    useEffect(() => {
        if (flatListRef.current && 'scrollToOffset' in flatListRef.current) {
            (flatListRef.current as any).scrollToOffset({ offset: 0 });
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
        if (!pageInfo?.hasNextPage || !pageInfo?.endCursor) return;

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
        } catch (error) {
            console.error("Error loading more issues:", error);
            // Show a toast or error message to the user here
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