import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { layoutStyles } from "../../styles/layout";
import { textStyles } from "../../styles/typography";
import { buttonStyles } from "../../styles/components";
import { colors } from "../../styles/theme";
import { markdownStyles } from "../../styles/markdown";
import { Comment } from "../../types";
import { formatDate } from "../../utils/date";
import { formatCommentCount } from "../../utils/formatting";
import Markdown from "react-native-markdown-display";
import { useComments } from "../../hooks/useComments";
import LoadingIndicator from "../common/LoadingIndicator";
import ErrorMessage from "../common/ErrorMessage";

export default function CommentsList({ issueNumber }: { issueNumber: number }) {
  const {
    comments,
    loading,
    error,
    pageInfo,
    isLoadingMore,
    loadMoreComments,
    totalCount
  } = useComments(issueNumber);

  const renderComment = ({ item }: { item: { node: Comment } }) => (
    <View style={layoutStyles.item}>
      <View style={layoutStyles.itemHeader}>
        <Text style={textStyles.secondary}>
          {item.node.author.login} commented on {formatDate(item.node.createdAt)}
        </Text>
      </View>
      <View style={layoutStyles.itemBody}>
        <Markdown style={markdownStyles}>{item.node.body}</Markdown>
      </View>
    </View>
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
            onPress={loadMoreComments}
          >
            <Text style={[buttonStyles.text, buttonStyles.textSecondary]}>Load More Comments</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading && comments.length === 0) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <View>
      <Text style={[textStyles.title, layoutStyles.header, layoutStyles.headerBorder]}>
        {formatCommentCount(totalCount)}
      </Text>
      {comments.length === 0 ? (
        <Text style={textStyles.secondary}>No comments yet</Text>
      ) : (
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.node.id}
          ListFooterComponent={renderFooter}
          onEndReached={loadMoreComments}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          windowSize={5}
          initialNumToRender={5}
        />
      )}
    </View>
  );
} 