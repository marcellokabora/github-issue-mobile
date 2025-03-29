import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ISSUE_COMMENTS } from "../lib/queries";
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

interface CommentsListProps {
  issueNumber: number;
}

interface CommentsData {
  repository: {
    issue: {
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

  const { loading, error, data, fetchMore } = useQuery<CommentsData>(GET_ISSUE_COMMENTS, {
    variables: {
      owner: "facebook",
      name: "react-native",
      number: issueNumber,
      first: 5,
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
          owner: "facebook",
          name: "react-native",
          number: issueNumber,
          first: 5,
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
      {comments.map(({ node: comment }) => (
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
      
      {pageInfo?.hasNextPage && (
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    padding: 16,
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#d73a49",
    textAlign: "center",
    marginTop: 20,
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

const markdownStyles = {
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