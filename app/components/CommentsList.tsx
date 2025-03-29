import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ISSUE_COMMENTS } from "../lib/queries";
import Markdown from "react-native-markdown-display";
import { useState } from "react";
import { commonStyles, colors, markdownStyles } from "../styles";

interface Comment {
  id: string;
  body: string;
  author: {
    login: string;
    avatarUrl: string;
  };
  createdAt: string;
}

interface CommentsListProps {
  issueNumber: number;
}

interface CommentsData {
  repository: {
    issue: {
      commentsCount: {
        totalCount: number;
      };
      comments: {
        pageInfo: {
          hasNextPage: boolean;
          endCursor: string;
        };
        edges: Array<{
          node: Comment;
        }>;
      };
    };
  };
}

export default function CommentsList({ issueNumber }: CommentsListProps) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pageInfo, setPageInfo] = useState<{ hasNextPage: boolean; endCursor: string } | null>(null);
  const [comments, setComments] = useState<Array<{ node: Comment }>>([]);
  const COMMENTS_QUERY = {
    owner: "facebook",
    name: "react-native",
    first: 5,
    number: issueNumber,
  };

  const { loading, error, data, fetchMore } = useQuery<CommentsData>(GET_ISSUE_COMMENTS, {
    variables: {
      ...COMMENTS_QUERY,
    },
    skip: !issueNumber,
    onCompleted: (data) => {
      if (data?.repository?.issue?.comments) {
        setComments(data.repository.issue.comments.edges);
        setPageInfo(data.repository.issue.comments.pageInfo);
      }
    },
  });

  const loadMoreComments = async () => {
    if (isLoadingMore || !pageInfo?.hasNextPage || !pageInfo?.endCursor) return;

    setIsLoadingMore(true);
    try {
      const result = await fetchMore({
        variables: {
          ...COMMENTS_QUERY,
          after: pageInfo.endCursor,
        },
      });

      if (result.data?.repository?.issue?.comments) {
        const newComments = result.data.repository.issue.comments.edges;
        setComments(prevComments => [...prevComments, ...newComments]);
        setPageInfo(result.data.repository.issue.comments.pageInfo);
      }
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (loading && !data) {
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

  const totalCount = data?.repository?.issue?.commentsCount?.totalCount || 0;

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.subtitle}>
          {totalCount} {totalCount === 1 ? "comment" : "comments"}
        </Text>
      </View>
      {comments.map(({ node: comment }) => (
        <View key={comment.id} style={commonStyles.listItem}>
          <View style={commonStyles.commentHeader}>
            <Text style={commonStyles.textPrimary}>{comment.author.login}</Text>
            <Text style={commonStyles.textSecondary}>
              {new Date(comment.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={commonStyles.commentBody}>
            <Markdown style={markdownStyles}>{comment.body}</Markdown>
          </View>
        </View>
      ))}

      {pageInfo?.hasNextPage && (
        <View style={[commonStyles.listItem, { borderBottomWidth: 0 }]}>
          {isLoadingMore ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <TouchableOpacity
              style={commonStyles.button}
              onPress={loadMoreComments}
            >
              <Text style={commonStyles.buttonText}>Load More Comments</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
} 