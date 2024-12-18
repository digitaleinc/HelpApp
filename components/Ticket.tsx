// components/Ticket.tsx

import React, { useContext } from "react";
import { View, Text, StyleSheet, Alert, Button } from "react-native";
import { AuthContext } from "@/contexts/AuthContext";
import AssignHelpButton from "@/components/AssignHelpButton";

interface Request {
    id: string;
    title: string;
    description: string;
    userId: string;
    helperId?: string;
    status: "Active" | "Completed" | "In Progress";
    createdAt: number;
}

interface TicketProps {
    request: Request;
    showHelpButton: boolean;
    showAdminControls: boolean;
}

const Ticket: React.FC<TicketProps> = ({ request, showHelpButton }) => {
    const { user, updateTicket } = useContext(AuthContext);

    // Utility function for truncating text
    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    // Handle assigning help to a request
    const handleAssignHelp = () => {
        Alert.alert(
            "Confirm Help",
            "Are you sure you want to help with this request?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes, Help",
                    onPress: () => assignHelp(),
                },
            ],
            { cancelable: true }
        );
    };

    const assignHelp = () => {
        if (!user) return Alert.alert("Error", "You must be logged in to help.");
        updateTicket({
            ...request,
            status: "In Progress",
            helperId: user.uid,
        });
    };

    // const handleEdit = () => {
    //     Alert.alert("Edit", "Editing is under development.");
    // };
    //
    // const handleDelete = () => {
    //     Alert.alert("Delete", "Deleting is under development.");
    // };

    return (
        <View
            style={styles.card}
        >
            {/* Content Section */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{truncateText(request.title, 25)}</Text>
                <Text style={styles.description}>
                    {truncateText(request.description, 80)}
                </Text>

                <Text style={styles.status}>Status: {request.status}</Text>
            </View>

            {/* Help Button */}
            {showHelpButton && request.status === "Active" && (
                <View style={styles.buttonContainer}>
                    <AssignHelpButton onPress={handleAssignHelp} />
                </View>
            )}

            {/* Admin Controls */}
            {/*{showAdminControls && (*/}
            {/*    <View style={styles.adminButtons}>*/}
            {/*        <Button title="Edit" onPress={handleEdit} color="#1976D2" />*/}
            {/*        <Button title="Delete" onPress={handleDelete} color="#D32F2F" />*/}
            {/*    </View>*/}
            {/*)}*/}
        </View>
    );
};

export default Ticket;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        padding: 15,
        borderRadius: 12,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    textContainer: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    description: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
        lineHeight: 20,
    },
    status: {
        fontSize: 12,
        color: "#888",
        marginTop: 6,
        fontStyle: "italic",
    },
    buttonContainer: {
        alignSelf: "center",
    },
    adminButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
});

