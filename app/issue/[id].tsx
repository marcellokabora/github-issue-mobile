import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@apollo/client";
import { GET_ISSUE_DETAIL } from "../lib/queries";

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
    edges: Array<{
      node: Comment;
    }>;
  };
}

export default function IssueDetail() {
  const { id } = useLocalSearchParams();

  const { loading, error, data } = useQuery(GET_ISSUE_DETAIL, {
    variables: {
      owner: "facebook",
      name: "react-native",
      number: parseInt(id as string),
    },
    skip: !id,
  });

  if (loading) {
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
        <Text style={styles.body}>{issue.body}</Text>
      </View>

      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>
          {issue.comments.edges.length} {issue.comments.edges.length === 1 ? "comment" : "comments"}
        </Text>
        {issue.comments.edges.map(({ node: comment }) => (
          <View key={comment.id} style={styles.comment}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentAuthor}>{comment.author.login}</Text>
              <Text style={styles.commentDate}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.commentBody}>{comment.body}</Text>
          </View>
        ))}
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
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  commentsContainer: {
    padding: 16,
  },
  commentsTitle: {
    fontSize: 16,
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
  commentBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#d73a49",
    textAlign: "center",
    marginTop: 20,
  },
}); 