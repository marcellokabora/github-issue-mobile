import { StyleSheet, TextStyle } from "react-native";

export const colors = {
    primary: "#0366d6",
    success: "#28a745",
    error: "#d73a49",
    background: {
        primary: "#ffffff",
        secondary: "#f6f8fa",
    },
    text: {
        primary: "#24292e",
        secondary: "#586069",
        light: "#ffffff",
    },
    border: "#e1e4e8",
} as const;

export const typography = {
    sizes: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        "2xl": 24,
    },
    weights: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
    } as const,
};

export const spacing = {
    xs: 4,
    sm: 8,
    base: 16,
    lg: 24,
    xl: 32,
} as const;

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background.primary,
    },
    errorText: {
        fontSize: typography.sizes.base,
        color: colors.error,
        textAlign: "center",
        marginTop: spacing.base,
    },
    emptyText: {
        fontSize: typography.sizes["2xl"],
        fontWeight: typography.weights.bold,
        color: colors.text.primary,
    },
    header: {
        paddingBottom: spacing.base,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    headerContent: {
        flex: 1,
        marginRight: spacing.base,
    },
    headerBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    statusBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 12,
    },
    statusBadgeOpen: {
        backgroundColor: colors.success,
    },
    statusBadgeClosed: {
        backgroundColor: colors.error,
    },
    subtitle: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.semibold,
    },
    title: {
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.semibold,
    },
    textPrimary: {
        fontSize: typography.sizes.base,
        color: colors.text.primary,
    },
    textSecondary: {
        fontSize: typography.sizes.sm,
        color: colors.text.secondary,
    },
    button: {
        padding: spacing.sm,
        backgroundColor: colors.background.secondary,
        borderRadius: 8,
        minWidth: 120,
        alignItems: "center",
    },
    buttonText: {
        color: colors.primary,
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.semibold,
    },
    list: {
        padding: spacing.base,
    },
    footer: {
        padding: spacing.base,
        alignItems: "center",
    },
    listItem: {
        padding: spacing.base,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    issueHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.sm,
    },
    issueNumber: {
        fontSize: typography.sizes.sm,
        color: colors.text.secondary,
    },
    issueTitle: {
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.semibold,
        marginBottom: spacing.xs,
    },
    commentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spacing.sm,
    },
    commentBody: {
        marginTop: spacing.sm,
    },
    formContainer: {
        padding: spacing.base,
        backgroundColor: colors.background.primary,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: spacing.sm,
        padding: spacing.sm,
        fontSize: typography.sizes.base,
        marginRight: spacing.sm,
        color: colors.text.primary,
        backgroundColor: colors.background.secondary,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.base,
    },
    statusContainer: {
        flexDirection: "row",
        marginBottom: spacing.sm,
    },
    statusButton: {
        flex: 1,
        padding: spacing.sm,
        alignItems: "center",
        borderRadius: spacing.sm,
        marginHorizontal: spacing.xs,
        backgroundColor: colors.background.secondary,
    },
    statusButtonActive: {
        backgroundColor: colors.success,
    },
    statusButtonClosed: {
        backgroundColor: colors.error,
    },
    statusText: {
        fontSize: typography.sizes.base,
        color: colors.text.secondary,
    },
    statusTextActive: {
        color: colors.text.light,
        fontWeight: typography.weights.semibold,
    },
});

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