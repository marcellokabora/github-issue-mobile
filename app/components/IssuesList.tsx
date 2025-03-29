import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@apollo/client";
import { SEARCH_ISSUES } from "../lib/queries";
import { useState } from "react";

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

interface IssuesListProps {
  search: string;
  status: string;
}

export default function IssuesList({ search, status }: IssuesListProps) {
  const router = useRouter();
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const query = `repo:facebook/react-native is:issue ${search} ${status === "OPEN" ? "state:open" : "state:closed"}`;

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
      style={styles.issueItem}
      onPress={() => router.push({
        pathname: "/issue/[id]",
        params: { id: item.number }
      })}
    >
      <View style={styles.issueHeader}>
        <Text style={styles.issueNumber}>#{item.number}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.state === "OPEN" ? "#28a745" : "#d73a49" }
        ]}>
          <Text style={styles.statusText}>{item.state}</Text>
        </View>
      </View>
      <Text style={styles.issueTitle}>{item.title}</Text>
      <Text style={styles.issueDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </Pressable>
  );

  const renderFooter = () => {
    if (!pageInfo?.hasNextPage) return null;
    
    return (
      <View style={styles.footer}>
        {isLoadingMore ? (
          <ActivityIndicator size="small" color="#0366d6" />
        ) : (
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={loadMore}
          >
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading && issues.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0366d6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {issues.length === 0 ? (
        <Text style={styles.errorText}>No issues found</Text>
      ) : (
        <FlatList
          data={issues}
          renderItem={renderIssue}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 16,
  },
  issueItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  issueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  issueNumber: {
    fontSize: 14,
    color: "#586069",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  issueDate: {
    fontSize: 12,
    color: "#586069",
  },
  errorText: {
    fontSize: 16,
    color: "#d73a49",
    textAlign: "center",
    marginTop: 20,
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
  loadMoreButton: {
    padding: 12,
    backgroundColor: "#f6f8fa",
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  loadMoreText: {
    color: "#0366d6",
    fontSize: 14,
    fontWeight: "600",
  },
}); 