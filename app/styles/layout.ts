import { StyleSheet } from "react-native";
import { colors, spacing } from "./theme";

export const layoutStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        padding: spacing.base,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    headerBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    headerBorderTop: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    footer: {
        padding: spacing.base,
        alignItems: "center",
    },
    item: {
        padding: spacing.base,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.sm,
    },
    itemBody: {
        marginTop: spacing.sm,
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
        color: colors.text.light,
    },
    statusBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 100,
    },
    statusBadgeOpen: {
        backgroundColor: colors.success,
    },
    statusBadgeClosed: {
        backgroundColor: colors.error,
    },
    // Avatar styles
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: spacing.sm,
    },
    avatarContent: {
        flex: 1,
    },
    // Navigation header styles
    navHeader: {
        paddingHorizontal: spacing.base,
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: colors.background.primary,
    },
    navHeaderBackButton: {
        marginRight: spacing.base,
    },
}); 