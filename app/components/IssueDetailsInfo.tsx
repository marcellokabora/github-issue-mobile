import { View, Text } from "react-native";
import Markdown from "react-native-markdown-display";
import { commonStyles, colors, markdownStyles, spacing } from "../styles";

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

interface IssueDetailsInfoProps {
  issue: IssueDetail;
}

export default function IssueDetailsInfo({ issue }: IssueDetailsInfoProps) {
  return (
    <View style={[commonStyles.container, { padding: spacing.base }]}>
      <View style={[commonStyles.header, commonStyles.headerRow]}>
        <View style={commonStyles.headerContent}>
          <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>#{issue.number}</Text>
          <Text style={commonStyles.title}>{issue.title}</Text>
        </View>
        <View style={[
          commonStyles.statusBadge,
          issue.state === "OPEN" ? commonStyles.statusBadgeOpen : commonStyles.statusBadgeClosed
        ]}>
          <Text style={[commonStyles.statusText, { color: colors.text.light }]}>{issue.state}</Text>
        </View>
      </View>

      <View style={[commonStyles.header, commonStyles.headerBorder]}>
        <Text style={commonStyles.textSecondary}>
          {issue.author.login} opened this issue on{" "}
          {new Date(issue.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={[commonStyles.header, { borderBottomWidth: 0 }]}>
        <Markdown style={markdownStyles}>{issue.body}</Markdown>
      </View>
    </View>
  );
} 