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
    statusBadgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.base,
        gap: spacing.sm
    },
    statusBadgeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusBadgeDotOpen: {
        backgroundColor: colors.success,
    },
    statusBadgeDotClosed: {
        backgroundColor: colors.error,
    },
    statusBadgeText: {
        fontSize: 14,
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    statusBadgeTextOpen: {
        color: colors.success,
    },
    statusBadgeTextClosed: {
        color: colors.error,
    },
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
    }
}); 