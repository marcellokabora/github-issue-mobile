import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/apollo-client";
import { Stack } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { layoutStyles } from "./styles/layout";
import { textStyles } from "./styles/typography";
import { colors } from "./styles/theme";
import { Ionicons } from '@expo/vector-icons';

function IssueHeader({ route, navigation }: any) {
  const issue = route.params?.issue;

  return (
    <View style={layoutStyles.navHeader}>
      <View style={layoutStyles.navHeaderLeft}>
        <TouchableOpacity
          onPress={() => navigation.navigate('index')}
          style={layoutStyles.navHeaderBackButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={textStyles.title}>
          Issue #{issue?.number || ''}
        </Text>
      </View>
      {issue && (
        <View style={[
          layoutStyles.statusBadge,
          issue.state === "OPEN" ? layoutStyles.statusBadgeOpen : layoutStyles.statusBadgeClosed
        ]}>
          <Text style={[textStyles.statusText, { color: colors.text.light }]}>
            {issue.state}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function Layout() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}
