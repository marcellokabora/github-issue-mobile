import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TextStyle, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@apollo/client";
import { GET_ISSUE_DETAIL } from "../lib/queries";
import Markdown from "react-native-markdown-display";
import { useState } from "react";

interface Comment {
  id: string;
  body: string;
  author: {
    login: string;
    avatarUrl: string;
  };
  createdAt: string;
}

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
  comments: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    edges: Array<{
      node: Comment;
    }>;
  };
  commentsCount: {
    totalCount: number;
  };
}

export default function IssueDetail() {
  const { id } = useLocalSearchParams();
  const [commentPageInfo, setCommentPageInfo] = useState<{ hasNextPage: boolean; endCursor: string } | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(GET_ISSUE_DETAIL, {
    variables: {
      owner: "facebook",
      name: "react-native",
      number: parseInt(id as string),
      first: 10,
    },
    skip: !id,
    onCompleted: (data) => {
      setCommentPageInfo(data.repository.issue.comments.pageInfo);
    },
  });

  const loadMoreComments = async () => {
    if (isLoadingMore || !commentPageInfo?.hasNextPage || !commentPageInfo?.endCursor) return;
    
    setIsLoadingMore(true);
    try {
      const result = await fetchMore({
        variables: {
          owner: "facebook",
          name: "react-native",
          number: parseInt(id as string),
          first: 10,
          after: commentPageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            repository: {
              ...prev.repository,
              issue: {
                ...prev.repository.issue,
                comments: {
                  ...fetchMoreResult.repository.issue.comments,
                  edges: [
                    ...prev.repository.issue.comments.edges,
                    ...fetchMoreResult.repository.issue.comments.edges,
                  ],
                },
              },
            },
          };
        },
      });

      // Update commentPageInfo with the new cursor and hasNextPage value
      if (result.data?.repository?.issue?.comments?.pageInfo) {
        setCommentPageInfo(result.data.repository.issue.comments.pageInfo);
      }
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (loading && !data) {
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

  const issue = data?.repository?.issue as IssueDetail | null;

  if (!issue) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Issue not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.issueNumber}>#{issue.number}</Text>
          <Text style={styles.title}>{issue.title}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: issue.state === "OPEN" ? "#28a745" : "#d73a49" }
        ]}>
          <Text style={styles.statusText}>{issue.state}</Text>
        </View>
      </View>

      <View style={styles.authorContainer}>
        <Text style={styles.authorText}>
          {issue.author.login} opened this issue on{" "}
          {new Date(issue.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.bodyContainer}>
        <Markdown style={markdownStyles}>{issue.body}</Markdown>
      </View>

      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>
          {issue.commentsCount.totalCount} {issue.commentsCount.totalCount === 1 ? "comment" : "comments"}
        </Text>
        {issue.comments.edges.map(({ node: comment }) => (
          <View key={comment.id} style={styles.comment}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentAuthor}>{comment.author.login}</Text>
              <Text style={styles.commentDate}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <Markdown style={markdownStyles}>{comment.body}</Markdown>
          </View>
        ))}
        
        {commentPageInfo?.hasNextPage && (
          <View style={styles.loadMoreContainer}>
            {isLoadingMore ? (
              <ActivityIndicator size="small" color="#0366d6" />
            ) : (
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={loadMoreComments}
              >
                <Text style={styles.loadMoreText}>Load More Comments</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </ScrollView>
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  issueNumber: {
    fontSize: 14,
    color: "#586069",
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
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
  authorContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  authorText: {
    fontSize: 14,
    color: "#586069",
  },
  bodyContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  commentsContainer: {
    padding: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  comment: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: "600",
  },
  commentDate: {
    fontSize: 12,
    color: "#586069",
  },
  errorText: {
    fontSize: 16,
    color: "#d73a49",
    textAlign: "center",
    marginTop: 20,
  },
  loadMoreContainer: {
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

const markdownStyles: Record<string, TextStyle> = {
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: "#24292e",
  },
  heading1: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#24292e",
  },
  heading2: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 14,
    color: "#24292e",
  },
  heading3: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#24292e",
  },
  paragraph: {
    marginVertical: 8,
  },
  link: {
    color: "#0366d6",
    textDecorationLine: "underline" as const,
  },
  list: {
    marginVertical: 8,
    paddingLeft: 16,
  },
  listItem: {
    marginVertical: 4,
  },
  code: {
    backgroundColor: "#f6f8fa",
    padding: 4,
    borderRadius: 4,
    fontFamily: "monospace",
  },
  codeBlock: {
    backgroundColor: "#f6f8fa",
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
  },
};