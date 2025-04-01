import { View, Text, Image } from "react-native";
import { layoutStyles } from "../../styles/layout";
import { textStyles } from "../../styles/typography";
import { markdownStyles } from "../../styles/markdown";
import { Comment } from "../../graphql/types";
import { formatDate } from "../../utils/date";
import { formatCommentCount } from "../../utils/formatting";
import Markdown from "react-native-markdown-display";

interface CommentsListProps {
  comments: Array<{ node: Comment }>;
  totalCount: number;
}

export default function CommentsList({ comments, totalCount }: CommentsListProps) {
  if (comments.length === 0) {
    return (
      <View style={layoutStyles.container}>
        <Text testID="no-comments" style={textStyles.secondary}>No comments yet</Text>
      </View>
    );
  }

  return (
    <View style={layoutStyles.container}>
      <Text testID="comments-count" style={[textStyles.title, layoutStyles.header, layoutStyles.headerBorder, layoutStyles.headerBorderTop]}>
        {formatCommentCount(totalCount)}
      </Text>
      {comments.map(({ node }) => (
        <View key={node.id} style={layoutStyles.item}>
          <View style={layoutStyles.avatarContainer}>
            <Image
              source={{ uri: node.author.avatarUrl }}
              style={layoutStyles.avatar}
              testID={`avatar-${node.id}`}
            />
            <View style={layoutStyles.avatarContent}>
              <Text testID={`author-${node.id}`} style={textStyles.subtitle}>
                {node.author.login}
              </Text>
              <Text testID={`date-${node.id}`} style={textStyles.secondary}>
                {formatDate(node.createdAt)}
              </Text>
            </View>
          </View>
          <View style={layoutStyles.itemBody}>
            <Markdown style={markdownStyles}>{node.body}</Markdown>
          </View>
        </View>
      ))}
    </View>
  );
} 