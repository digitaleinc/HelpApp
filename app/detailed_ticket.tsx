import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AuthContext } from "@/contexts/AuthContext";

const DetailedTicketScreen = () => {
    const { ticketId } = useLocalSearchParams<{ ticketId: string }>();
    const { tickets, user, userData, updateTicket, deleteTicket } = useContext(AuthContext);
    const router = useRouter();

    const ticket = tickets.find((t) => t.id === ticketId);
    const [title, setTitle] = useState(ticket?.title || "");
    const [description, setDescription] = useState(ticket?.description || "");

    useEffect(() => {
        if (!ticket) {
            Alert.alert("Error", "Ticket not found.");
            router.push('/tickets');
        }
    }, [ticket]);

    if (!ticket) return null;

    const isOwner = ticket.userId === user?.uid;
    const isModeratorOrAdmin = ["Moderator", "Admin"].includes(userData?.accountType || "");
    const canEdit = isOwner || isModeratorOrAdmin;

    const handleSave = async () => {
        try {
            if (ticket.status == "Active") {
                const updatedTicket = {
                    createdAt: ticket.createdAt,
                    description,
                    id: ticket.id,
                    status: ticket.status || "Active",
                    title,
                    userId: ticket.userId,
                };
                await updateTicket(updatedTicket);
            } else {
                await updateTicket({ ...ticket, title, description });
            }

            Alert.alert("Success", "Ticket updated successfully!");
            router.back();
        } catch {
            Alert.alert("Error", "Failed to update ticket.");
        }
    };

    const handleDelete = async () => {
        Alert.alert("Confirm", "Delete this ticket?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deleteTicket(ticket.id);
                        Alert.alert("Success", "Ticket deleted.");
                        router.back();
                    } catch {
                        Alert.alert("Error", "Failed to delete ticket.");
                    }
                },
            },
        ]);
    };

    const handleHelp = async () => {
        try {
            await updateTicket({ ...ticket, status: "In Progress", helperId: user?.uid });
            Alert.alert("Success", "You are now helping this ticket.");
            router.back();
        } catch {
            Alert.alert("Error", "Failed to assign help.");
        }
    };

    const handleSetAsCompleted = async () => {
        try {
            await updateTicket({ ...ticket, status: "Completed" });
            Alert.alert("Success", "Ticket marked as Completed.");
            router.back();
        } catch {
            Alert.alert("Error", "Failed to mark ticket as completed.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backButton}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Ticket Details</Text>

                {/* Editable Title */}
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Title:</Text>
                    {canEdit ? (
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Enter title"
                        />
                    ) : (
                        <Text style={styles.value}>{ticket.title}</Text>
                    )}
                </View>

                {/* Editable Description */}
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Description:</Text>
                    {canEdit ? (
                        <TextInput
                            style={[styles.input, styles.descriptionInput]}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                        />
                    ) : (
                        <Text style={styles.value}>{ticket.description}</Text>
                    )}
                </View>

                {/* Ticket Status */}
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.value}>{ticket.status}</Text>
                </View>

                {/* Requester */}
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Requester:</Text>
                    <Text style={styles.value}>{ticket.requesterEmail}</Text>
                </View>

                {/* Helper */}
                {ticket.helperEmail && (
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Helper:</Text>
                        <Text style={styles.value}>{ticket.helperEmail}</Text>
                    </View>
                )}

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    {canEdit && ticket.status !== "Completed" && <Button title="Save Changes" onPress={handleSave} color="#4CAF50" />}
                    {canEdit && (
                        <Button title="Delete Ticket" onPress={handleDelete} color="#D32F2F" />
                    )}
                    {userData?.accountType === "ReadyToHelp" && ticket.status === "Active" && (
                        <Button title="Help with this Ticket" onPress={handleHelp} color="#007AFF" />
                    )}
                    {canEdit && ticket.status !== "Completed" && ticket.status !== "Active" && (
                        <Button
                            title="Set as Completed"
                            onPress={handleSetAsCompleted}
                            color="#388E3C"
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetailedTicketScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    backButton: { fontSize: 16, color: "#007AFF", marginBottom: 16 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    infoContainer: { marginBottom: 16 },
    label: { fontSize: 16, fontWeight: "bold", color: "#555", marginBottom: 4 },
    value: { fontSize: 16, color: "#333" },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 8,
        fontSize: 16,
    },
    descriptionInput: { height: 100, textAlignVertical: "top" },
    buttonContainer: { marginTop: 20, gap: 10 },
});

