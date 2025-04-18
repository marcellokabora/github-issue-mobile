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
      }
    }
  }
`;

export const GET_ISSUE_COMMENTS = gql`
  query GetIssueComments($owner: String!, $name: String!, $number: Int!, $first: Int!, $after: String) {
    repository(owner: $owner, name: $name) {
      issue(number: $number) {
        commentsCount: comments {
          totalCount
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
      }
    }
  }
`; 