import { View, Text } from "react-native";
import { layoutStyles } from "../../styles/layout";
import { textStyles } from "../../styles/typography";

interface ErrorMessageProps {
    message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <View style={layoutStyles.container}>
            <Text style={textStyles.error}>Error: {message}</Text>
        </View>
    );
} 