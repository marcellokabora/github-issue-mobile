import { gql } from "@apollo/client";

export const SEARCH_ISSUES = gql`
  query SearchIssues($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: ISSUE, first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
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
  query GetIssueDetail($owner: String!, $name: String!, $number: Int!, $first: Int = 10, $after: String) {
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
        comments(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
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
        commentsCount: comments {
          totalCount
        }
      }
    }
  }
`; 