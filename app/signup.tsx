// app/signup.tsx

import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const SignUpScreen = () => {
    const { signup } = useContext(AuthContext); // Access signup from AuthContext
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState<"HelpSeeker" | "ReadyToHelp">("HelpSeeker");

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        try {
            const success = await signup(email, password, accountType);
            if (success) {
                router.replace("/welcome"); // Navigate only on success
            } else {
                Alert.alert("Error", "Failed to sign up. Please try again.");
            }
        } catch (error) {
            Alert.alert("Error", "An unexpected error occurred");
            console.error("Signup Error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Help App Sign Up</Text>
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
            <Picker
                selectedValue={accountType}
                style={styles.picker}
                onValueChange={(itemValue) => setAccountType(itemValue as "HelpSeeker" | "ReadyToHelp")}
            >
                <Picker.Item label="Help Seeker" value="HelpSeeker" />
                <Picker.Item label="Ready to Help" value="ReadyToHelp" />
            </Picker>
            <Button title="Sign Up" onPress={handleSignUp} />
            <TouchableOpacity onPress={() => router.push("/signin")}>
                <Text style={styles.text}>
                    Already have an account? <Text style={styles.link}>Login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpScreen;

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
    picker: {
        height: 50,
        width: "100%",
        marginBottom: 10,
    },
    text: {
        marginTop: 10,
        textAlign: "center",
    },
    link: {
        color: "blue",
    },
});
