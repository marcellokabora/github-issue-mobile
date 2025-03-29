import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { ISSUE_STATUS, IssueStatus } from "../lib/constants";

export default function SearchForm() {
  const router = useRouter();
  const { search, status } = useLocalSearchParams();
  const [searchText, setSearchText] = useState(search as string || "");

  useEffect(() => {
    setSearchText(search as string || "");
  }, [search]);

  const handleSearch = () => {
    router.setParams({
      search: searchText.trim(),
      status: status || ISSUE_STATUS.OPEN
    });
  };

  const handleStatusChange = (newStatus: IssueStatus) => {
    router.setParams({
      search: searchText.trim(),
      status: newStatus
    });
  };

  const handleReset = () => {
    setSearchText("");
    router.setParams({
      search: "",
      status: ISSUE_STATUS.OPEN
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search issues..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            (!status || status === ISSUE_STATUS.OPEN) && styles.activeStatusOpen,
          ]}
          onPress={() => handleStatusChange(ISSUE_STATUS.OPEN)}
        >
          <Text
            style={[
              styles.statusText,
              (!status || status === ISSUE_STATUS.OPEN) && styles.activeStatusText,
            ]}
          >
            Open
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusButton,
            status === ISSUE_STATUS.CLOSED && styles.activeStatusClosed,
          ]}
          onPress={() => handleStatusChange(ISSUE_STATUS.CLOSED)}
        >
          <Text
            style={[
              styles.statusText,
              status === ISSUE_STATUS.CLOSED && styles.activeStatusText,
            ]}
          >
            Closed
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e1e4e8",
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#0366d6",
    padding: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  statusContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  statusButton: {
    flex: 1,
    padding: 8,
    alignItems: "center",
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: "#f6f8fa",
  },
  activeStatusOpen: {
    backgroundColor: "#28a745",
  },
  activeStatusClosed: {
    backgroundColor: "#d73a49",
  },
  activeStatusText: {
    color: "#fff",
    fontWeight: "600",
  },
  statusText: {
    fontSize: 14,
    color: "#586069",
  },
}); 