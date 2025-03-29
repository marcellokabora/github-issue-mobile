import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.search as string || "");
  const [status, setStatus] = useState<"OPEN" | "CLOSED">((searchParams.status as "OPEN" | "CLOSED") || "OPEN");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    router.setParams({
      search: searchTerm.trim(),
      status
    });
    setIsLoading(false);
  };

  const handleStatusChange = (newStatus: "OPEN" | "CLOSED") => {
    setStatus(newStatus);
    if (searchTerm.trim()) {
      setIsLoading(true);
      router.setParams({
        search: searchTerm.trim(),
        status: newStatus
      });
      setIsLoading(false);
    }
  };

  // Update local state when URL params change
  useEffect(() => {
    if (searchParams.status) {
      setStatus(searchParams.status as "OPEN" | "CLOSED");
    }
    if (searchParams.search) {
      setSearchTerm(searchParams.search as string);
    }
  }, [searchParams.status, searchParams.search]);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search issues..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onKeyPress={(e) => {
          if (e.nativeEvent.key === "Enter") {
            handleSearch();
          }
        }}
      />
      
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[styles.statusButton, status === "OPEN" && styles.activeStatusOpen]}
          onPress={() => handleStatusChange("OPEN")}
        >
          <Text style={[styles.statusText, status === "OPEN" && styles.activeStatusText]}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusButton, status === "CLOSED" && styles.activeStatusClosed]}
          onPress={() => handleStatusChange("CLOSED")}
        >
          <Text style={[styles.statusText, status === "CLOSED" && styles.activeStatusText]}>Closed</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.searchButtonText}>Search</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e1e4e8",
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    fontSize: 16,
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
  statusText: {
    fontSize: 14,
    color: "#586069",
  },
  activeStatusText: {
    color: "#fff",
    fontWeight: "600",
  },
  searchButton: {
    backgroundColor: "#0366d6",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
}); 