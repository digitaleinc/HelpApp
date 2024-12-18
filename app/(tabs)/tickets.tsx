// app/(tabs)/tickets.tsx

import React, { useContext, useEffect } from "react";
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import { AuthContext } from "@/contexts/AuthContext";
import Ticket from "@/components/Ticket";
import CreateNewTicketButton from "@/components/CreateNewTicketButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const TicketsScreen = () => {
    const { userData, filteredTickets, fetchTickets } = useContext(AuthContext);
    const router = useRouter();

    // Fetch tickets on component mount
    useEffect(() => {
        fetchTickets();
    }, []);

    const handleTicketPress = (ticketId: string) => {
        router.push({ pathname: "/detailed_ticket", params: { ticketId } });
    };

    // Function to render each ticket
    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                onPress={() => handleTicketPress(item.id)}
                activeOpacity={0.8}
            >
                <Ticket
                    request={item}
                    showHelpButton={
                        ["ReadyToHelp", "Moderator", "Admin"].includes(userData?.accountType || "") &&
                        item.status === "Active"
                    }
                    showAdminControls={["Moderator", "Admin"].includes(userData?.accountType || "")}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.title}>Help Requests</Text>

                {/* Ticket List */}
                <FlatList
                    data={filteredTickets}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ListEmptyComponent={
                        <Text style={styles.noRequestsText}>No tickets available at the moment.</Text>
                    }
                />

                {/* Create Ticket Button for HelpSeekers */}
                {(userData?.accountType === "HelpSeeker" || userData?.accountType === "Moderator" || userData?.accountType === "Admin") && (
                    <CreateNewTicketButton
                        title="Create New Ticket"
                        onPress={() => router.push("../new-ticket")}
                        style={styles.button}
                    />
                )}
            </SafeAreaView>
        </View>
    );
};

export default TicketsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center",
    },
    noRequestsText: {
        fontSize: 18,
        color: "#555",
        textAlign: "center",
        marginTop: 20,
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
        shadowOffset: {width: 0, height: 2},
    },
});

