import { ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@apollo/client";
import { GET_ISSUE_DETAIL } from "../lib/queries";
import IssueDetailsInfo from "../components/issues/IssueDetailsInfo";
import CommentsList from "../components/comments/CommentsList";
import { layoutStyles } from "../styles/layout";
import LoadingIndicator from "../components/common/LoadingIndicator";
import ErrorMessage from "../components/common/ErrorMessage";

interface IssueDetail {
  id: string;
  title: string;
  body: string;
  state: string;
  number: number;
  createdAt: string;
  author: {
    login: string;
    avatarUrl: string;
  };
}

export default function IssueDetailScreen() {
  const { id } = useLocalSearchParams();
  const issueNumber = parseInt(id as string);

  const { loading, error, data } = useQuery(GET_ISSUE_DETAIL, {
    variables: {
      owner: "facebook",
      name: "react-native",
      number: issueNumber,
    },
    skip: !issueNumber,
  });

  if (loading && !data) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const issue = data?.repository?.issue as IssueDetail | null;

  if (!issue) {
    return <ErrorMessage message="Issue not found" />;
  }

  return (
    <ScrollView style={layoutStyles.container}>
      <IssueDetailsInfo issue={issue} />
      <CommentsList issueNumber={issueNumber} />
    </ScrollView>
  );
}