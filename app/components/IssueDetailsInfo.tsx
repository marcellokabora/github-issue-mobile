import { View, Text, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";

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

interface IssueDetailsInfoProps {
  issue: IssueDetail;
}

export default function IssueDetailsInfo({ issue }: IssueDetailsInfoProps) {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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