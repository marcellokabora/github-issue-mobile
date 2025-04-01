import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/apollo-client";
import { Stack } from "expo-router";
import { IssueProvider } from "@/contexts/IssueContext";
import IssueHeader from "@/components/headers/IssueHeader";

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
