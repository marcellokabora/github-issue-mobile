import { View, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@apollo/client";
import { GET_ISSUE_DETAIL } from "../lib/queries";
import IssueDetailsInfo from "../components/issues/IssueDetailsInfo";
import CommentsList from "../components/comments/CommentsList";
import { layoutStyles } from "../styles/layout";
import LoadingIndicator from "../components/common/LoadingIndicator";
import ErrorMessage from "../components/common/ErrorMessage";
import { useComments } from "../hooks/useComments";
import { useCallback } from "react";
import { Comment } from "../types";

interface IssueDetail {
  id: string;
  title: string;
  body: string;
  state: string;
  number: number;
  createdAt: string;
  author: {
    login: string;
    avatarUrl: string;
  };
}

type ListItem = IssueDetail | Array<{ node: Comment }>;

export default function IssueDetailScreen() {
  const { id } = useLocalSearchParams();
  const issueNumber = parseInt(id as string);

  const { loading, error, data } = useQuery(GET_ISSUE_DETAIL, {
    variables: {
      owner: "facebook",
      name: "react-native",
      number: issueNumber,
    },
    skip: !issueNumber,
  });

  const {
    comments,
    pageInfo,
    isLoadingMore,
    loadMoreComments,
    totalCount
  } = useComments(issueNumber);

  const handleEndReached = useCallback(() => {
    if (!isLoadingMore && pageInfo?.hasNextPage) {
      loadMoreComments();
    }
  }, [isLoadingMore, pageInfo?.hasNextPage, loadMoreComments]);

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
    if (!pageInfo?.hasNextPage) return null;
    return (
      <View style={[layoutStyles.footer, { paddingVertical: 16 }]}>
        {isLoadingMore ? <LoadingIndicator /> : null}
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: ListItem; index: number }) => {
    if (index === 0) {
      return <IssueDetailsInfo issue={item as IssueDetail} />;
    }
    return <CommentsList comments={item as Array<{ node: Comment }>} totalCount={totalCount} />;
  };

  const listData: ListItem[] = [issue, comments];

  return (
    <FlatList
      data={listData}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.2}
      removeClippedSubviews={true}
      maxToRenderPerBatch={5}
      windowSize={5}
      initialNumToRender={5}
    />
  );
}