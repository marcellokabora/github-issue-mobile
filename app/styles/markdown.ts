import { TextStyle } from "react-native";
import { colors, typography, spacing } from "./theme";

export const markdownStyles: Record<string, TextStyle> = {
    body: {
        fontSize: typography.sizes.base,
        lineHeight: 24,
        color: colors.text.primary,
    },
    heading1: {
        fontSize: typography.sizes["2xl"],
        fontWeight: typography.weights.bold,
        marginVertical: spacing.base,
        color: colors.text.primary,
    },
    heading2: {
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.bold,
        marginVertical: spacing.lg,
        color: colors.text.primary,
    },
    heading3: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        marginVertical: spacing.base,
        color: colors.text.primary,
    },
    paragraph: {
        marginVertical: spacing.sm,
    },
    link: {
        color: colors.primary,
        textDecorationLine: "underline",
    },
    list: {
        marginVertical: spacing.sm,
        paddingLeft: spacing.base,
    },
    listItem: {
        marginVertical: spacing.xs,
    },
    code: {
        backgroundColor: colors.background.secondary,
        padding: spacing.xs,
        borderRadius: 4,
        fontFamily: "monospace",
    },
    codeBlock: {
        backgroundColor: colors.background.secondary,
        padding: spacing.base,
        borderRadius: 4,
        marginVertical: spacing.sm,
    },
}; 