// app/welcome.tsx

import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

const WelcomeScreen = () => {
    const router = useRouter();
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        // Automatically navigate to MainTabs after short delay
        const timer = setTimeout(() => {
            router.replace("/(tabs)/tickets");
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    if (!userData) {
        // If user data is not available, show a loading spinner
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.message}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Email: {userData.email}</Text>
            <Text style={styles.subtitle}>
                Account Type: {userData.accountType || "Not Specified"}
            </Text>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#555",
        marginTop: 5,
    },
    message: {
        fontSize: 16,
        marginTop: 10,
    },
});

