import { TextStyle } from "react-native";
import { colors, typography, spacing } from "./theme";

export const markdownStyles: Record<string, TextStyle> = {
    // Headings
    heading1: {
        fontSize: typography.sizes["2xl"],
        fontWeight: typography.weights.bold,
        color: colors.text.primary,
        marginVertical: spacing.lg,
    },
    heading2: {
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.bold,
        color: colors.text.primary,
        marginVertical: spacing.lg,
    },
    heading3: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.semibold,
        color: colors.text.primary,
        marginVertical: spacing.base,
    },
    heading4: {
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.semibold,
        color: colors.text.primary,
        marginVertical: spacing.base,
    },

    // Paragraphs and text
    paragraph: {
        fontSize: typography.sizes.base,
        color: colors.text.primary,
        lineHeight: 24,
        marginVertical: spacing.base,
    },
    strong: {
        fontWeight: typography.weights.bold,
    },
    em: {
        fontStyle: "italic",
    },

    // Lists
    bullet_list: {
        marginVertical: spacing.base,
        paddingLeft: spacing.lg,
    },
    ordered_list: {
        marginVertical: spacing.base,
        paddingLeft: spacing.lg,
    },
    list_item: {
        fontSize: typography.sizes.base,
        color: colors.text.primary,
        marginVertical: spacing.xs,
    },

    // Links
    link: {
        color: colors.primary,
        textDecorationLine: "underline",
    },

    // Blockquotes
    blockquote: {
        backgroundColor: colors.background.secondary,
        padding: spacing.base,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
        marginVertical: spacing.base,
    },

    // Code blocks
    code_inline: {
        backgroundColor: colors.background.secondary,
        borderRadius: 4,
        padding: spacing.xs,
        marginVertical: spacing.xs,
        fontFamily: "monospace",
        fontSize: typography.sizes.sm,
    },
    code_block: {
        backgroundColor: colors.background.secondary,
        borderRadius: 4,
        padding: spacing.base,
        marginVertical: spacing.base,
        fontFamily: "monospace",
        fontSize: typography.sizes.sm,
    },

    // Horizontal rule
    horizontal: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        marginVertical: spacing.lg,
    },

    // Tables
    table: {
        marginVertical: spacing.base,
        borderWidth: 1,
        borderColor: colors.border,
    },
    table_header: {
        backgroundColor: colors.background.secondary,
        fontWeight: typography.weights.semibold,
        padding: spacing.base,
    },
    table_cell: {
        padding: spacing.base,
        borderWidth: 1,
        borderColor: colors.border,
    },
}; 