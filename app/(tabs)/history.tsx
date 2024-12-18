// app/(tabs)/history.tsx

import React, { useContext } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { AuthContext } from "@/contexts/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HistoryScreen = () => {
    const { user, tickets, userData } = useContext(AuthContext);
    const router = useRouter();

    // Filter Completed and In Progress requests
    const filteredHistory = tickets.filter(
        (ticket) =>
            ticket.status === "Completed" || ticket.status === "In Progress"
    );

    // Filter history based on user role
    const history = filteredHistory.filter((ticket) => {
        if (userData?.accountType === "HelpSeeker") {
            return ticket.userId === user?.uid;
        } else if (userData?.accountType === "ReadyToHelp") {
            return ticket.helperId === user?.uid;
        } else if (userData?.accountType === "Moderator" || userData?.accountType === "Admin") {
            return ticket;
        }
        return false;
    });

    // Helper function to truncate text
    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    const handleTicketPress = (ticketId: string) => {
        router.push({ pathname: "/detailed_ticket", params: { ticketId } });
    };

    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => handleTicketPress(item.id)}
                activeOpacity={0.8}
            >
                {/* Header with Status Indicator */}
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {truncateText(item.title, 30)}
                    </Text>
                    {item.status === "Completed" ? (
                        <AntDesign name="checkcircle" size={18} color="green" />
                    ) : (
                        <AntDesign name="clockcircle" size={18} color="blue" />
                    )}
                </View>

                {/* Truncated Description */}
                <Text style={styles.description}>
                    {truncateText(item.description, 100)}
                </Text>

                {/* Additional Details */}
                {userData?.accountType === "HelpSeeker" && item.helperId && (
                    <Text style={styles.detail}>
                        Helper: <Text style={styles.highlight}>{item.helperEmail}</Text>
                    </Text>
                )}
                {userData?.accountType === "ReadyToHelp" && item.userId && (
                    <Text style={styles.detail}>
                        Help requested by:{" "}
                        <Text style={styles.highlight}>{item.requesterEmail}</Text>
                    </Text>
                )}

                {/* Status */}
                <Text style={styles.status}>Status: {item.status}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>History</Text>
            <FlatList
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No history available at this time.
                    </Text>
                }
            />
        </View>
    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f8fa",
        padding: 10,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        alignSelf: "center",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        flex: 1,
    },
    description: {
        fontSize: 14,
        color: "#555",
        marginBottom: 8,
    },
    detail: {
        fontSize: 14,
        color: "#777",
    },
    highlight: {
        fontWeight: "bold",
        color: "#007AFF",
    },
    status: {
        marginTop: 5,
        fontSize: 12,
        color: "#888",
        fontStyle: "italic",
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
        marginTop: 50,
    },
});

