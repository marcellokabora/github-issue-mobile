import { StyleSheet } from "react-native";
import { colors, typography, spacing } from "./theme";

export const textStyles = StyleSheet.create({
    title: {
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.semibold,
        color: colors.text.primary,
    },
    subtitle: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.semibold,
        color: colors.text.primary,
    },
    primary: {
        fontSize: typography.sizes.base,
        color: colors.text.primary,
    },
    secondary: {
        fontSize: typography.sizes.sm,
        color: colors.text.secondary,
    },
    error: {
        fontSize: typography.sizes.base,
        color: colors.error,
        textAlign: "center",
        marginTop: spacing.base,
    },
    empty: {
        fontSize: typography.sizes["2xl"],
        fontWeight: typography.weights.bold,
        color: colors.text.primary,
    },
    statusText: {
        fontSize: typography.sizes.base,
        color: colors.text.secondary,
        fontWeight: typography.weights.semibold,
    },
    statusTextActive: {
        color: colors.text.light,
    },
    itemNumber: {
        fontSize: typography.sizes.sm,
        color: colors.text.secondary,
    },
    itemTitle: {
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.semibold,
        marginBottom: spacing.xs,
    },
}); 