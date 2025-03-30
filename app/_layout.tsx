import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/apollo-client";
import { Stack } from "expo-router";

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
            title: "Issue Details",
          }}
        />
      </Stack>
    </ApolloProvider>
  );
}
