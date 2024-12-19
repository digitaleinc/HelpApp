// app/signin.tsx

import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

const LoginScreen = () => {
    const router = useRouter();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const success = await login(email, password);
        if (!success) {
            Alert.alert("Error", "Invalid email or password");
        } else {
            router.replace("/welcome");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Help App Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text style={styles.text}>
                    Don't have an account? <Text style={styles.link}>Sign Up</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    text: {
        marginTop: 10,
        textAlign: "center",
    },
    link: {
        color: "blue",
    },
});
