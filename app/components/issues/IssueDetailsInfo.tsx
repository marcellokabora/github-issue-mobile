import { View, Text, Image } from "react-native";
import Markdown from "react-native-markdown-display";
import { layoutStyles } from "../../styles/layout";
import { textStyles } from "../../styles/typography";
import { markdownStyles } from "../../styles/markdown";
import { spacing } from "../../styles/theme";
import { IssueDetail } from "@/app/types/issues";
import { formatDate } from "../../utils/date";

interface IssueDetailsInfoProps {
  issue: IssueDetail;
}

export default function IssueDetailsInfo({ issue }: IssueDetailsInfoProps) {
  return (
    <View style={layoutStyles.container}>
      <View style={[layoutStyles.header, layoutStyles.headerBorder]}>
        <View style={layoutStyles.headerContent}>
          <Text
            style={[[textStyles.title, { marginBottom: spacing.base }]]}
            testID="issue-title"
          >
            {issue.title}
          </Text>
        </View>
      </View>

      <View style={[layoutStyles.header, layoutStyles.headerBorder]}>
        <View style={layoutStyles.headerCenter}>
          <Image
            source={{ uri: issue.author.avatarUrl }}
            style={[layoutStyles.avatar, { marginRight: spacing.sm }]}
            testID="issue-author-avatar"
          />
          <Text
            style={textStyles.secondary}
            testID="issue-author-info"
          >
            <Text style={{ fontWeight: 'bold' }}>{issue.author.login}</Text>
            {" opened this issue on "}
            {formatDate(issue.createdAt)}
          </Text>
        </View>
      </View>

      <View style={[layoutStyles.header, { borderBottomWidth: 0 }]}>
        <Markdown style={markdownStyles}>
          {issue.body}
        </Markdown>
      </View>
    </View>
  );
} 