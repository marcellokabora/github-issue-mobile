import { View, Text, Image } from "react-native";
import Markdown from "react-native-markdown-display";
import { layoutStyles } from "../../styles/layout";
import { textStyles } from "../../styles/typography";
import { markdownStyles } from "../../styles/markdown";
import { spacing } from "../../styles/theme";
import { formatDate } from "../../utils/date";
import { IssueDetail } from "@/graphql/types/issues";

interface IssueDetailsInfoProps {
  issue: IssueDetail;
}

export default function IssueDetailsInfo({ issue }: IssueDetailsInfoProps) {
  return (
    <View style={[layoutStyles.container, layoutStyles.headerBorderTop]}>

      <View style={[layoutStyles.header]}>
        <View style={layoutStyles.statusBadgeContainer}>
          <View style={[
            layoutStyles.statusBadgeDot,
            issue.state === "OPEN" ? layoutStyles.statusBadgeDotOpen : layoutStyles.statusBadgeDotClosed
          ]} />
          <Text style={[
            layoutStyles.statusBadgeText,
            issue.state === "OPEN" ? layoutStyles.statusBadgeTextOpen : layoutStyles.statusBadgeTextClosed
          ]}>
            {issue.state.toLowerCase()}
          </Text>
        </View>
        <Text
          style={[textStyles.title, { marginBottom: spacing.base }]}
          testID="issue-title"
        >
          {issue.title}
        </Text>
      </View>

      <View style={[layoutStyles.header, layoutStyles.headerBorderTop]}>
        <View style={layoutStyles.avatarContainer}>
          <Image
            source={{ uri: issue.author.avatarUrl }}
            style={[layoutStyles.avatar, { marginRight: spacing.sm }]}
            testID="issue-author-avatar"
          />
          <View style={layoutStyles.avatarContent}>
            <Text
              style={textStyles.secondary}

            >
              <Text style={{ fontWeight: 'bold' }} testID="issue-author-info">{issue.author.login}</Text>
            </Text>
            <Text style={textStyles.secondary} testID="issue-createdAt">
              {formatDate(issue.createdAt)}
            </Text>
          </View>
        </View>
      </View>


      <View style={[layoutStyles.header, layoutStyles.headerBorderTop]}>
        <Markdown style={markdownStyles}>
          {issue.body}
        </Markdown>
      </View>
    </View>
  );
} 