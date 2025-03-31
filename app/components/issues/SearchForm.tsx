import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ISSUE_STATUS, IssueStatus } from "../../utils/constants";
import { formStyles } from "../../styles/components";
import { buttonStyles } from "../../styles/components";
import { layoutStyles } from "../../styles/layout";
import { textStyles } from "../../styles/typography";

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

  return (
    <View style={formStyles.container}>
      <View style={formStyles.searchContainer}>
        <TextInput
          style={formStyles.input}
          placeholder="Search issues..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          testID="search-input"
        />
        <TouchableOpacity
          style={[buttonStyles.base, buttonStyles.primary]}
          onPress={handleSearch}
          testID="search-button"
        >
          <Text style={[buttonStyles.text, buttonStyles.textPrimary]}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={layoutStyles.headerRow}>
        <TouchableOpacity
          style={[
            layoutStyles.statusButton,
            (!status || status === ISSUE_STATUS.OPEN) && layoutStyles.statusButtonActive,
          ]}
          onPress={() => handleStatusChange(ISSUE_STATUS.OPEN)}
          testID={`status-button-${ISSUE_STATUS.OPEN}`}
        >
          <Text
            style={[
              textStyles.statusText,
              (!status || status === ISSUE_STATUS.OPEN) && textStyles.statusTextActive,
            ]}
          >
            Open
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            layoutStyles.statusButton,
            status === ISSUE_STATUS.CLOSED && layoutStyles.statusButtonClosed,
          ]}
          onPress={() => handleStatusChange(ISSUE_STATUS.CLOSED)}
          testID={`status-button-${ISSUE_STATUS.CLOSED}`}
        >
          <Text
            style={[
              textStyles.statusText,
              status === ISSUE_STATUS.CLOSED && textStyles.statusTextActive,
            ]}
          >
            Closed
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 