import { StyleSheet } from "react-native";
import { colors, typography, spacing } from "./theme";

export const buttonStyles = StyleSheet.create({
    base: {
        padding: spacing.sm,
        borderRadius: 8,
        minWidth: 120,
        alignItems: "center",
    },
    primary: {
        backgroundColor: colors.primary,
    },
    secondary: {
        backgroundColor: colors.background.secondary,
    },
    success: {
        backgroundColor: colors.success,
    },
    error: {
        backgroundColor: colors.error,
    },
    text: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.semibold,
    },
    textPrimary: {
        color: colors.text.light,
    },
    textSecondary: {
        color: colors.primary,
    },
});

export const formStyles = StyleSheet.create({
    container: {
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
    inputError: {
        borderColor: colors.error,
        backgroundColor: colors.background.primary,
    },
    inputContainer: {
        flex: 1,
        marginRight: spacing.sm,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: spacing.base,
    },
}); 