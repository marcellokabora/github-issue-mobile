import { View, Text, TouchableOpacity } from "react-native";
import { layoutStyles } from "../../styles/layout";
import { textStyles } from "../../styles/typography";
import { colors, spacing } from "../../styles/theme";
import { Ionicons } from '@expo/vector-icons';
import { useIssue } from "../../contexts/IssueContext";

export default function IssueHeader({ navigation }: any) {
    const { issue } = useIssue();

    return (
        <View style={layoutStyles.navHeader}>
            <TouchableOpacity
                onPress={() => navigation.navigate('index')}
                style={layoutStyles.navHeaderBackButton}
            >
                <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <View>
                {issue && (
                    <Text style={textStyles.title}>
                        Issue #{issue.number}
                        <View style={[
                            layoutStyles.statusBadge,
                            { marginHorizontal: spacing.sm },
                            issue.state === "OPEN" ? layoutStyles.statusBadgeOpen : layoutStyles.statusBadgeClosed
                        ]}>
                            <Text style={[textStyles.statusText, { color: colors.text.light }]}>
                                {issue.state}
                            </Text>
                        </View>
                    </Text>
                )}
            </View>
        </View>
    );
} 