import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/apollo-client";
import { Stack } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { layoutStyles } from "./styles/layout";
import { textStyles } from "./styles/typography";
import { colors, spacing } from "./styles/theme";
import { Ionicons } from '@expo/vector-icons';
import { IssueProvider, useIssue } from "./contexts/IssueContext";

function IssueHeader({ navigation }: any) {
  const { issue } = useIssue();

  return (
    <View style={layoutStyles.navHeader}>
      <TouchableOpacity
        onPress={() => navigation.navigate('index')}
        style={layoutStyles.navHeaderBackButton}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
      </TouchableOpacity>
      <View>
        {issue && (
          <Text style={textStyles.title}>
            Issue #{issue.number}
            <View style={[
              layoutStyles.statusBadge,
              { marginHorizontal: spacing.sm },
              issue.state === "OPEN" ? layoutStyles.statusBadgeOpen : layoutStyles.statusBadgeClosed
            ]}>
              <Text style={[textStyles.statusText, { color: colors.text.light }]}>
                {issue.state}
              </Text>
            </View>
          </Text>
        )}
      </View>
    </View>
  );
}

export default function Layout() {
  return (
    <ApolloProvider client={client}>
      <IssueProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="issue/[id]"
            options={{
              header: IssueHeader,
            }}
          />
        </Stack>
      </IssueProvider>
    </ApolloProvider>
  );
}
