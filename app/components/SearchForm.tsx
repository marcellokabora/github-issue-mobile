import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ISSUE_STATUS, IssueStatus } from "../lib/constants";
import { commonStyles } from "../styles";

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
    <View style={commonStyles.formContainer}>
      <View style={commonStyles.searchContainer}>
        <TextInput
          style={commonStyles.input}
          placeholder="Search issues..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={commonStyles.button}
          onPress={handleSearch}
        >
          <Text style={commonStyles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={commonStyles.statusContainer}>
        <TouchableOpacity
          style={[
            commonStyles.statusButton,
            (!status || status === ISSUE_STATUS.OPEN) && commonStyles.statusButtonActive,
          ]}
          onPress={() => handleStatusChange(ISSUE_STATUS.OPEN)}
        >
          <Text
            style={[
              commonStyles.statusText,
              (!status || status === ISSUE_STATUS.OPEN) && commonStyles.statusTextActive,
            ]}
          >
            Open
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            commonStyles.statusButton,
            status === ISSUE_STATUS.CLOSED && commonStyles.statusButtonClosed,
          ]}
          onPress={() => handleStatusChange(ISSUE_STATUS.CLOSED)}
        >
          <Text
            style={[
              commonStyles.statusText,
              status === ISSUE_STATUS.CLOSED && commonStyles.statusTextActive,
            ]}
          >
            Closed
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 