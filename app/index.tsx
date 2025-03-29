import { View, StyleSheet } from "react-native";
import SearchForm from "./components/SearchForm";
import IssuesList from "./components/IssuesList";
import { useLocalSearchParams } from "expo-router";

export default function Home() {
  const { search, status } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <SearchForm />
      <View style={styles.listContainer}>
        {search && <IssuesList search={search as string} status={status as string} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    flex: 1,
  },
});
