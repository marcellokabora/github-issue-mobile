import { TextStyle } from "react-native";
import { colors, typography, spacing } from "./theme";

export const markdownStyles: Record<string, TextStyle> = {
    blockquote: {
        backgroundColor: colors.background.secondary,
        padding: spacing.base,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
    },
    code_inline: {
        paddingVertical: 0,
        backgroundColor: colors.background.secondary,
        borderRadius: 4,
        padding: spacing.base,
        marginVertical: spacing.sm,
    },
}; 