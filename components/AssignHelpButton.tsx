// components/AssignHelpButton.tsx

import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure Expo vector icons are installed
import { StyleProp, ViewStyle } from 'react-native';

interface AssignHelpButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
}

const AssignHelpButton: React.FC<AssignHelpButtonProps> = ({ onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.7}>
            <Ionicons name="hand-right-outline" size={24} color="#fff" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#28a745', // Green color indicating action
        padding: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        // Elevation for Android
        elevation: 5,
    },
});

export default AssignHelpButton;
