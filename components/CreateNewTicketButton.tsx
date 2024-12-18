// components/createNewTicketButton.tsx

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    GestureResponderEvent,
    ActivityIndicator,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';

interface HelpButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    title?: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    disabled?: boolean;
}

const CreateNewTicketButton: React.FC<HelpButtonProps> = ({
                                                              onPress,
                                                              title = 'Help',
                                                              style,
                                                              textStyle,
                                                              loading = false,
                                                              disabled = false,
                                                          }) => {
    return (
        <TouchableOpacity
            style={[styles.button, style, disabled && styles.disabled]}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF', // iOS-style blue
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 }, // iOS shadow
        shadowOpacity: 0.25, // iOS shadow
        shadowRadius: 3.84, // iOS shadow
        minWidth: 150,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    disabled: {
        backgroundColor: '#A9A9A9',
    },
});

export default CreateNewTicketButton;
