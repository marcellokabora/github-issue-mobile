import { View, StyleSheet } from "react-native";
import SearchForm from "./components/SearchForm";
import IssuesList from "./components/IssuesList";

export default function Home() {
  return (
    <View style={styles.container}>
      <SearchForm />
      <View style={styles.listContainer}>
        <IssuesList />
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
