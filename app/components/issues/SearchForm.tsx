import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ISSUE_STATUS, IssueStatus } from "../../utils/constants";
import { formStyles, buttonStyles } from "../../styles/components";
import { layoutStyles } from "../../styles/layout";
import { textStyles } from "../../styles/typography";

export default function SearchForm() {
  const router = useRouter();
  const { search, status } = useLocalSearchParams();
  const [formData, setFormData] = useState({
    search: search as string || "",
    status: status as IssueStatus || ISSUE_STATUS.OPEN
  });

  useEffect(() => {
    setFormData({
      search: search as string || "",
      status: status as IssueStatus || ISSUE_STATUS.OPEN
    });
  }, [search, status]);

  const handleSearchChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      search: value
    }));
  };

  const handleStatusChange = (newStatus: IssueStatus) => {
    setFormData(prev => ({
      ...prev,
      status: newStatus
    }));
    router.setParams({
      status: newStatus
    });
  };

  const handleSubmit = () => {
    router.setParams({
      search: formData.search.trim(),
      status: formData.status
    });
  };

  return (
    <View style={formStyles.container}>
      <View style={formStyles.searchContainer}>
        <TextInput
          style={formStyles.input}
          placeholder="Search issues..."
          value={formData.search}
          onChangeText={handleSearchChange}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          testID="search-input"
        />
        <TouchableOpacity
          style={[buttonStyles.base, buttonStyles.primary]}
          onPress={handleSubmit}
          testID="search-button"
        >
          <Text style={[buttonStyles.text, buttonStyles.textPrimary]}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={layoutStyles.headerRow}>
        <TouchableOpacity
          style={[
            layoutStyles.statusButton,
            (!formData.status || formData.status === ISSUE_STATUS.OPEN) && layoutStyles.statusButtonActive,
          ]}
          onPress={() => handleStatusChange(ISSUE_STATUS.OPEN)}
          testID={`status-button-${ISSUE_STATUS.OPEN}`}
        >
          <Text
            style={[
              textStyles.statusText,
              (!formData.status || formData.status === ISSUE_STATUS.OPEN) && textStyles.statusTextActive,
            ]}
          >
            Open
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            layoutStyles.statusButton,
            formData.status === ISSUE_STATUS.CLOSED && layoutStyles.statusButtonClosed,
          ]}
          onPress={() => handleStatusChange(ISSUE_STATUS.CLOSED)}
          testID={`status-button-${ISSUE_STATUS.CLOSED}`}
        >
          <Text
            style={[
              textStyles.statusText,
              formData.status === ISSUE_STATUS.CLOSED && textStyles.statusTextActive,
            ]}
          >
            Closed
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 