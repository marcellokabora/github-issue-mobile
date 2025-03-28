import { gql } from "@apollo/client";

export const SEARCH_ISSUES = gql`
  query SearchIssues($query: String!, $first: Int = 10) {
    search(query: $query, type: ISSUE, first: $first) {
      edges {
        node {
          ... on Issue {
            id
            title
            state
            number
            createdAt
            repository {
              name
              owner {
                login
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ISSUE_DETAIL = gql`
  query GetIssueDetail($owner: String!, $name: String!, $number: Int!) {
    repository(owner: $owner, name: $name) {
      issue(number: $number) {
        id
        title
        body
        state
        number
        createdAt
        author {
          login
          avatarUrl
        }
        comments(first: 10) {
          edges {
            node {
              id
              body
              createdAt
              author {
                login
                avatarUrl
              }
            }
          }
        }
      }
    }
  }
`; 