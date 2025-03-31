import { View, Text } from "react-native";
import Markdown from "react-native-markdown-display";
import { layoutStyles } from "../../styles/layout";
import { textStyles } from "../../styles/typography";
import { markdownStyles } from "../../styles/markdown";
import { spacing, colors } from "../../styles/theme";
import { IssueDetail } from "@/app/types/issues";
import { formatDate } from "../../utils/date";

interface IssueDetailsInfoProps {
  issue: IssueDetail;
}

export default function IssueDetailsInfo({ issue }: IssueDetailsInfoProps) {
  return (
    <View style={[layoutStyles.container, layoutStyles.headerBorder]}>
      <View style={[layoutStyles.header, layoutStyles.headerRow]}>
        <View style={layoutStyles.headerContent}>
          <Text
            style={[textStyles.secondary, { marginBottom: spacing.xs }]}
            testID="issue-number"
          >
            #{issue.number}
          </Text>
          <Text style={textStyles.title} testID="issue-title">{issue.title}</Text>
        </View>
        <View style={[
          layoutStyles.statusBadge,
          issue.state === "OPEN" ? layoutStyles.statusBadgeOpen : layoutStyles.statusBadgeClosed
        ]}>
          <Text style={[textStyles.statusText, { color: colors.text.light }]}>{issue.state}</Text>
        </View>
      </View>

      <View style={[layoutStyles.header, layoutStyles.headerBorder]}>
        <Text style={textStyles.secondary} testID="issue-author-info">
          {issue.author.login} opened this issue on {formatDate(issue.createdAt)}
        </Text>
      </View>

      <View style={[layoutStyles.header, { borderBottomWidth: 0 }]}>
        <Markdown style={markdownStyles}>{issue.body}</Markdown>
      </View>
    </View>
  );
} 