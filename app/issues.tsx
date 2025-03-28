import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_ISSUES } from "./lib/queries";

interface Issue {
  id: string;
  title: string;
  state: string;
  number: number;
  createdAt: string;
  repository: {
    name: string;
    owner: {
      login: string;
    };
  };
}

export default function Issues() {
  const { search, status } = useLocalSearchParams();
  const router = useRouter();

  const { loading, error, data } = useQuery(SEARCH_ISSUES, {
    variables: {
      query: `repo:facebook/react-native is:issue ${search} ${status === "OPEN" ? "state:open" : "state:closed"}`,
    },
    skip: !search,
  });
  

  const issues = data?.search?.edges?.map((edge: any) => edge.node) || [];
  

  const renderIssue = ({ item }: { item: Issue }) => (
    <TouchableOpacity
      style={styles.issueItem}
      onPress={() => router.push({
        pathname: "/issue/[id]",
        params: { id: item.number }
      })}
    >
      <View style={styles.issueHeader}>
        <Text style={styles.issueNumber}>#{item.number}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.state === "OPEN" ? "#28a745" : "#d73a49" }
        ]}>
          <Text style={styles.statusText}>{item.state}</Text>
        </View>
      </View>
      <Text style={styles.issueTitle}>{item.title}</Text>
      <Text style={styles.issueDate}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

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

  return (
    <View style={styles.container}>
      {issues.length === 0 ? (
        <Text style={styles.errorText}>No issues found</Text>
      ) : (
        <FlatList
          data={issues}
          renderItem={renderIssue}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
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
  listContainer: {
    padding: 16,
  },
  issueItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  issueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  issueNumber: {
    fontSize: 14,
    color: "#586069",
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
  issueTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  issueDate: {
    fontSize: 12,
    color: "#586069",
  },
  errorText: {
    fontSize: 16,
    color: "#d73a49",
    textAlign: "center",
    marginTop: 20,
  },
}); 