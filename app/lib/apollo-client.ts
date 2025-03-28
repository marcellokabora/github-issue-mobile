import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => {
    // You'll need to replace this with your GitHub personal access token
    const token = process.env.EXPO_PUBLIC_GITHUB_TOKEN;

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
}); 