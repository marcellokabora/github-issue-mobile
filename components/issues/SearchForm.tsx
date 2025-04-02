import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ISSUE_STATUS, IssueStatus } from "@/utils/constants";
import { formStyles, buttonStyles } from "@/styles/components";
import { layoutStyles } from "@/styles/layout";
import { textStyles } from "@/styles/typography";

export default function SearchForm() {
  const router = useRouter();
  const { search, status } = useLocalSearchParams();
  const [searchError, setSearchError] = useState<string | null>(null);
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

  const validateGitHubSearch = (searchTerm: string): boolean => {
    // Block repo:, org:, and status: qualifiers
    const blockedQualifiers = ['repo:', 'org:', 'status:'];

    // Check if the search term contains any blocked qualifiers
    const hasBlockedQualifier = blockedQualifiers.some(qualifier =>
      searchTerm.toLowerCase().includes(qualifier)
    );

    return !hasBlockedQualifier;
  };

  const handleSearchChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      search: value
    }));

    // Clear error when user starts typing
    setSearchError(null);
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
    const searchTerm = formData.search.trim();
    setSearchError(null);

    if (searchTerm && !validateGitHubSearch(searchTerm)) {
      setSearchError('Cannot use repo:, org:, or status: qualifiers in search');
      return;
    }

    router.setParams({
      search: searchTerm,
      status: formData.status
    });
  };

  return (
    <View style={formStyles.container}>
      <Text style={[textStyles.title, layoutStyles.itemHeader]}>GitHub ReactNative Issues</Text>
      <View style={formStyles.searchContainer}>
        <View style={formStyles.inputContainer}>
          <TextInput
            style={[formStyles.input, searchError && formStyles.inputError]}
            placeholder="Search..."
            value={formData.search}
            onChangeText={handleSearchChange}
            onSubmitEditing={handleSubmit}
            returnKeyType="search"
            testID="search-input"
          />
          {searchError && (
            <Text style={textStyles.errorText}>
              {searchError}
            </Text>
          )}
        </View>
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