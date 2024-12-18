// app/(tabs)/new-ticket.tsx

import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from "react-native";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

const NewTicketScreen = () => {
    const { addTicket } = useContext(AuthContext);
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        if (!title.trim() || !description.trim()) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        addTicket(title, description);
        Alert.alert("Success", "Ticket created successfully");
        router.back();
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            {/* Page Title */}
            <Text style={styles.title}>Create New Ticket</Text>

            {/* Input Fields */}
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            />

            {/* Submit Button */}
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default NewTicketScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    backButton: {
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: "#007AFF",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
});

