import { View } from "react-native";
import SearchForm from "@/components/issues/SearchForm";
import IssuesList from "@/components/issues/IssuesList";
import { layoutStyles } from "@/styles/layout";

export default function Home() {
  return (
    <View style={layoutStyles.container}>
      <SearchForm />
      <IssuesList />
    </View>
  );
}
