import { View, ActivityIndicator } from "react-native";
import { layoutStyles } from "../../styles/layout";
import { colors } from "../../styles/theme";

interface LoadingIndicatorProps {
    size?: "small" | "large";
}

export default function LoadingIndicator({ size = "large" }: LoadingIndicatorProps) {
    return (
        <View style={layoutStyles.loadingContainer}>
            <ActivityIndicator size={size} color={colors.primary} />
        </View>
    );
} 