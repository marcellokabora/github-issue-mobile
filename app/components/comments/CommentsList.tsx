import { View, Text } from "react-native";
import { layoutStyles } from "../../styles/layout";
import { textStyles } from "../../styles/typography";
import { markdownStyles } from "../../styles/markdown";
import { Comment } from "../../types";
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
        <Text style={textStyles.secondary}>No comments yet</Text>
      </View>
    );
  }

  return (
    <View style={layoutStyles.container}>
      <Text style={[textStyles.secondary, layoutStyles.header]}>
        {formatCommentCount(totalCount)}
      </Text>
      {comments.map(({ node }) => (
        <View key={node.id} style={layoutStyles.item}>
          <View style={layoutStyles.itemHeader}>
            <Text style={textStyles.secondary}>
              {node.author.login} commented on {formatDate(node.createdAt)}
            </Text>
          </View>
          <View style={layoutStyles.itemBody}>
            <Markdown style={markdownStyles}>{node.body}</Markdown>
          </View>
        </View>
      ))}
    </View>
  );
} 