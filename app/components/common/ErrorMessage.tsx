import { View, Text } from "react-native";
import { layoutStyles } from "@/styles/layout";
import { textStyles } from "@/styles/typography";

interface ErrorMessageProps {
    message: string;
    testID?: string;
}

export default function ErrorMessage({ message, testID }: ErrorMessageProps) {
    return (
        <View style={layoutStyles.container} testID={testID}>
            <Text style={textStyles.error} testID="error-message">{message}</Text>
        </View>
    );
} 