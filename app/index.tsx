import { Link } from "expo-router";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<"OPEN" | "CLOSED">("OPEN");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    router.push({
      pathname: "/issues",
      params: { search: searchTerm, status }
    });
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GitHub Issues</Text>

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
            onPress={() => setStatus("OPEN")}
          >
            <Text style={[styles.statusText, status === "OPEN" && styles.activeStatusText]}>Open</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusButton, status === "CLOSED" && styles.activeStatusClosed]}
            onPress={() => setStatus("CLOSED")}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 80,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  searchContainer: {
    gap: 15,
    minWidth: "100%",

  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: "row",
    gap: 10,
  },
  statusButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  activeStatusOpen: {
    backgroundColor: "green",
    borderColor: "green",
  },
  activeStatusClosed: {
    backgroundColor: "red",
    borderColor: "red",
  },
  statusText: {
    fontSize: 16,
    color: "#333",
  },
  activeStatusText: {
    color: "#fff",
  },
  searchButton: {
    backgroundColor: "#0366d6",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
