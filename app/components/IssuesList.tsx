import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useQuery } from "@apollo/client";
import { SEARCH_ISSUES } from "../lib/queries";
import { useState, useEffect, useRef } from "react";
import { layoutStyles, textStyles, buttonStyles, colors } from "../styles";

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
      style={layoutStyles.item}
      onPress={() => router.push({
        pathname: "/issue/[id]",
        params: { id: item.number }
      })}
    >
      <View style={layoutStyles.itemHeader}>
        <Text style={textStyles.itemNumber}>#{item.number}</Text>
        <Text style={textStyles.secondary}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Text style={textStyles.itemTitle}>{item.title}</Text>
    </Pressable>
  );

  const renderFooter = () => {
    if (!pageInfo?.hasNextPage) return null;

    return (
      <View style={layoutStyles.footer}>
        {isLoadingMore ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <TouchableOpacity
            style={[buttonStyles.base, buttonStyles.secondary]}
            onPress={loadMore}
          >
            <Text style={[buttonStyles.text, buttonStyles.textSecondary]}>Load More</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading && issues.length === 0) {
    return (
      <View style={layoutStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={layoutStyles.container}>
        <Text style={textStyles.error}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!search) {
    return (
      <View style={layoutStyles.emptyContainer}>
        <Text style={textStyles.empty}>GitHub Issues</Text>
      </View>
    );
  }

  return (
    <View style={layoutStyles.container}>
      {issues.length === 0 ? (
        <Text style={textStyles.error}>No issues found</Text>
      ) : (
        <FlatList
          ref={flatListRef}
          data={issues}
          renderItem={renderIssue}
          keyExtractor={(item) => item.id}
          contentContainerStyle={layoutStyles.list}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
} 