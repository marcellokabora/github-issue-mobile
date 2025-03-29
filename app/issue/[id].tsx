import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@apollo/client";
import { GET_ISSUE_DETAIL } from "../lib/queries";
import IssueDetailsInfo from "../components/IssueDetailsInfo";
import CommentsList from "../components/CommentsList";
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
  commentsCount: {
    totalCount: number;
  };
}

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
      <IssueDetailsInfo issue={issue} />
      <View style={styles.commentsHeader}>
        <Text style={styles.commentsTitle}>
          {issue.commentsCount.totalCount} {issue.commentsCount.totalCount === 1 ? "comment" : "comments"}
        </Text>
      </View>
      <CommentsList issueNumber={issueNumber} />
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
  errorText: {
    fontSize: 16,
    color: "#d73a49",
    textAlign: "center",
    marginTop: 20,
  },
  commentsHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});