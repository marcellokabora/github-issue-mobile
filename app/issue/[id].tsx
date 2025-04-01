import { View, FlatList, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useQuery } from "@apollo/client";
import { GET_ISSUE_DETAIL } from "@/graphql/queries";
import IssueDetailsInfo from "@/components/issues/IssueDetailsInfo";
import CommentsList from "@/components/comments/CommentsList";
import { layoutStyles } from "@/styles/layout";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useComments } from "@/graphql/hooks/useComments";
import { useCallback, useEffect, useState } from "react";
import { IssueDetail } from "@/graphql/types/issues";

type Section = {
  type: 'issue' | 'comments';
};

export default function IssueDetailScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const issueNumber = parseInt(id as string);
  const [showComments, setShowComments] = useState(false);

  const { loading, error, data } = useQuery(GET_ISSUE_DETAIL, {
    variables: {
      owner: "facebook",
      name: "react-native",
      number: issueNumber,
    },
    skip: !issueNumber,
  });

  useEffect(() => {
    if (data?.repository?.issue) {
      navigation.setOptions({
        title: `Issue #${data.repository.issue.number}`
      });
    }
  }, [data?.repository?.issue, navigation]);

  const {
    comments,
    pageInfo,
    isLoadingMore,
    loadMoreComments,
    totalCount
  } = useComments(issueNumber);

  const handleEndReached = useCallback(() => {
    if (!showComments) {
      setShowComments(true);
      return;
    }
    if (!isLoadingMore && pageInfo?.hasNextPage) {
      loadMoreComments();
    }
  }, [isLoadingMore, pageInfo?.hasNextPage, loadMoreComments, showComments]);

  if (loading && !data) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const issue = data?.repository?.issue as IssueDetail | null;

  if (!issue) {
    return <ErrorMessage message="Issue not found" />;
  }

  const renderFooter = () => {
    if ((!showComments || isLoadingMore) && (!pageInfo || pageInfo.hasNextPage)) {
      return (
        <View style={[layoutStyles.footer, { paddingVertical: 16 }]}>
          <ActivityIndicator
            size="small"
            testID="loading-more-indicator"
          />
        </View>
      );
    }
    return null;
  };

  const renderItem = ({ item }: { item: Section }) => {
    if (item.type === 'issue') {
      return <IssueDetailsInfo issue={issue} />;
    }
    if (item.type === 'comments' && showComments) {
      return <CommentsList comments={comments} totalCount={totalCount} />;
    }
    return null;
  };

  const sections: Section[] = [
    { type: 'issue' },
    { type: 'comments' }
  ];

  return (
    <FlatList
      data={sections}
      renderItem={renderItem}
      keyExtractor={(item) => item.type}
      ListFooterComponent={renderFooter}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.2}
    />
  );
}