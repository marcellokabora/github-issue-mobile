import { View, Text } from "react-native";
import Markdown from "react-native-markdown-display";
import { layoutStyles } from "../../styles/layout";
import { textStyles } from "../../styles/typography";
import { markdownStyles } from "../../styles/markdown";
import { spacing, colors } from "../../styles/theme";
import { IssueDetailsInfoProps } from "../../types";

export default function IssueDetailsInfo({ issue }: IssueDetailsInfoProps) {
  return (
    <View style={[layoutStyles.container, layoutStyles.headerBorder]}>
      <View style={[layoutStyles.header, layoutStyles.headerRow]}>
        <View style={layoutStyles.headerContent}>
          <Text style={[textStyles.secondary, { marginBottom: spacing.xs }]}>#{issue.number}</Text>
          <Text style={textStyles.title}>{issue.title}</Text>
        </View>
        <View style={[
          layoutStyles.statusBadge,
          issue.state === "OPEN" ? layoutStyles.statusBadgeOpen : layoutStyles.statusBadgeClosed
        ]}>
          <Text style={[textStyles.statusText, { color: colors.text.light }]}>{issue.state}</Text>
        </View>
      </View>

      <View style={[layoutStyles.header, layoutStyles.headerBorder]}>
        <Text style={textStyles.secondary}>
          {issue.author.login} opened this issue on{" "}
          {new Date(issue.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={[layoutStyles.header, { borderBottomWidth: 0 }]}>
        <Markdown style={markdownStyles}>{issue.body}</Markdown>
      </View>
    </View>
  );
} 