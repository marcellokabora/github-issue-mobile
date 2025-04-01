import { View, ActivityIndicator } from "react-native";
import { layoutStyles } from "../../styles/layout";
import { colors } from "../../styles/theme";

export default function LoadingIndicator() {
    return (
        <View style={layoutStyles.loadingContainer} testID="loading-indicator">
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
} 