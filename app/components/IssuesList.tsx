import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useQuery } from "@apollo/client";
import { SEARCH_ISSUES } from "../lib/queries";
import { useState, useEffect, useRef } from "react";
import { commonStyles, colors } from "../styles";

interface Issue {
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

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export default function IssuesList() {
  const router = useRouter();
  const { search, status } = useLocalSearchParams();
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const query = `repo:facebook/react-native is:issue ${search} ${(!status || status === "OPEN") ? "state:open" : "state:closed"}`;

  // Reset view when search or status changes
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
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

  const renderIssue = ({ item }: { item: Issue }) => (
    <Pressable
      style={commonStyles.listItem}
      onPress={() => router.push({
        pathname: "/issue/[id]",
        params: { id: item.number }
      })}
    >
      <View style={commonStyles.issueHeader}>
        <Text style={commonStyles.issueNumber}>#{item.number}</Text>
        <Text style={commonStyles.textSecondary}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Text style={commonStyles.issueTitle}>{item.title}</Text>
    </Pressable>
  );

  const renderFooter = () => {
    if (!pageInfo?.hasNextPage) return null;

    return (
      <View style={commonStyles.footer}>
        {isLoadingMore ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <TouchableOpacity
            style={commonStyles.button}
            onPress={loadMore}
          >
            <Text style={commonStyles.buttonText}>Load More</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading && issues.length === 0) {
    return (
      <View style={commonStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!search) {
    return (
      <View style={commonStyles.emptyContainer}>
        <Text style={commonStyles.emptyText}>GitHub Issues</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      {issues.length === 0 ? (
        <Text style={commonStyles.errorText}>No issues found</Text>
      ) : (
        <FlatList
          ref={flatListRef}
          data={issues}
          renderItem={renderIssue}
          keyExtractor={(item) => item.id}
          contentContainerStyle={commonStyles.list}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
} 