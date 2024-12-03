// components/Ticket.tsx

import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AssignHelpButton from '@/components/AssignHelpButton';
import { Request } from '@/data/staticData';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

interface TicketProps {
    request: Request;
}

const Ticket: React.FC<TicketProps> = ({ request }) => {
    const { user, updateTicket } = useContext(AuthContext);
    const router = useRouter();

    const handleAssignHelp = () => {
        Alert.alert(
            'Confirm Help',
            'Are you sure you could help with this request?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes, Help',
                    onPress: () => assignHelp(),
                },
            ],
            { cancelable: true }
        );
    };

    const assignHelp = () => {
        if (!user) {
            Alert.alert('Error', 'You must be logged in to help with this request.');
            return;
        }

        const updatedTicket: Request = {
            ...request,
            status: 'In progress',
            helperId: user.id,
        };

        updateTicket(updatedTicket);
        Alert.alert('Success', 'You have been assigned to this request.');
        // Optionally, navigate to history or refresh the list
    };

    // Determine if the button should be displayed
    const canAssignHelp =
        user?.accountType === 'ReadyToHelp' ||
        user?.accountType === 'Moderator' ||
        user?.accountType === 'Admin';

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{request.title}</Text>
                <Text style={styles.description}>{request.description}</Text>
                <Text style={styles.status}>Status: {request.status}</Text>
            </View>
            {canAssignHelp && request.status === 'Active' && (
                <AssignHelpButton onPress={handleAssignHelp} />
            )}
        </View>
    );
};

export default Ticket;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        borderWidth: 0.3,
        borderColor: '#ccc',
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1.41,
        // Elevation for Android
        elevation: 2,
    },
    textContainer: {
        flex: 1, // Takes up remaining space
        paddingRight: 10, // Space between text and button
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },
    status: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
    },
});
