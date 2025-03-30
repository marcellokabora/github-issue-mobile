import { View, ActivityIndicator } from "react-native";
import { layoutStyles } from "../../styles/layout";
import { colors } from "../../styles/theme";

interface LoadingIndicatorProps {
    size?: "small" | "large";
    testID?: string;
}

export default function LoadingIndicator({ size = "large", testID }: LoadingIndicatorProps) {
    return (
        <View style={layoutStyles.loadingContainer} testID={testID}>
            <ActivityIndicator size={size} color={colors.primary} />
        </View>
    );
} 