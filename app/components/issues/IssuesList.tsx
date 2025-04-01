import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Issue } from "../../graphql/types";
import { formatDate } from "../../utils/date";
import { useIssues } from "../../graphql/hooks/useIssues";
import LoadingIndicator from "../common/LoadingIndicator";
import ErrorMessage from "../common/ErrorMessage";
import { layoutStyles } from "../../styles/layout";
import { textStyles } from "../../styles/typography";
import { colors } from "../../styles/theme";

export default function IssuesList() {
  const router = useRouter();
  const { search, status } = useLocalSearchParams();
  const {
    issues,
    loading,
    error,
    pageInfo,
    isLoadingMore,
    loadMore,
    flatListRef
  } = useIssues({ search: search as string, status: status as string });

  const handleEndReached = () => {
    if (!isLoadingMore && pageInfo?.hasNextPage) {
      loadMore();
    }
  };

  const renderIssue = ({ item }: { item: Issue }) => (
    <Pressable
      style={layoutStyles.item}
      onPress={() => router.push({
        pathname: "/issue/[id]",
        params: { id: item.number }
      })}
      testID={`issue-item-${item.number}`}
    >
      <View style={layoutStyles.itemHeader}>
        <Text style={textStyles.itemNumber}>#{item.number}</Text>
        <Text style={textStyles.secondary}>
          {formatDate(item.createdAt)}
        </Text>
      </View>
      <Text style={textStyles.itemTitle}>{item.title}</Text>
    </Pressable>
  );

  const renderFooter = () => {
    if (!pageInfo?.hasNextPage) return null;

    return (
      <View style={layoutStyles.footer}>
        {isLoadingMore &&
          <ActivityIndicator
            size="small"
            color={colors.primary}
            testID="loading-more-indicator"
          />
        }
      </View>
    );
  };

  if (loading && issues.length === 0) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <View style={layoutStyles.container}>
      {issues.length === 0 && search ? (
        <Text style={textStyles.error}>No issues found</Text>
      ) : (
        <FlatList
          ref={flatListRef}
          data={issues}
          renderItem={renderIssue}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderFooter}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
} 