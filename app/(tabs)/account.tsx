// app/(tabs)/account.tsx

import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

const AccountScreen = () => {
    const router = useRouter();
    const { userData, logout, changePassword } = useContext(AuthContext);

    const [currentPassword, setCurrentPassword] = useState(""); // Current Password
    const [newPassword, setNewPassword] = useState(""); // New Password
    const [loading, setLoading] = useState(false); // Loading state for button

    const accountType = userData?.accountType || "Unknown";

    // Handle Password Change
    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword) {
            Alert.alert("Error", "Please fill in both the current and new passwords.");
            return;
        }

        setLoading(true);
        const success = await changePassword(currentPassword, newPassword);
        setLoading(false);

        if (success) {
            Alert.alert("Success", "Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
        } else {
            Alert.alert("Error", "Failed to change password. Please check your current password.");
        }
    };

    // Handle Logout
    const handleLogout = () => {
        logout();
        router.replace("/signin");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    {/* Account Details */}
                    <Text style={styles.title}>Account Details</Text>
                    <Text style={styles.accountTypeText}>
                        Account Type: {accountType}
                    </Text>

                    {/* Email Display */}
                    <View style={styles.inputContainer}>
                        <Icon
                            name="envelope"
                            size={20}
                            color="#888"
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            value={userData?.email || ""}
                            editable={false}
                        />
                    </View>

                    {/* Change Password Section */}
                    <Text style={styles.sectionTitle}>Change Password</Text>

                    {/* Current Password Input */}
                    <View style={styles.inputContainer}>
                        <Icon
                            name="lock"
                            size={20}
                            color="#888"
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Current Password"
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            secureTextEntry
                        />
                    </View>

                    {/* New Password Input */}
                    <View style={styles.inputContainer}>
                        <Icon
                            name="lock"
                            size={20}
                            color="#888"
                            style={styles.inputIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                        />
                    </View>

                    {/* Update Password Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleChangePassword}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? "Updating..." : "Update Password"}
                        </Text>
                    </TouchableOpacity>

                    {/* Logout Button */}
                    <TouchableOpacity
                        style={[styles.button, styles.logoutButton]}
                        onPress={handleLogout}
                    >
                        <Text style={[styles.buttonText, styles.logoutButtonText]}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f9f9f9"
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 20
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 3,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
        color: "#333"
    },
    accountTypeText: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 24,
        color: "#555"
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 12,
        color: "#333"
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    inputIcon: {
        marginRight: 10
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333"
    },
    button: {
        backgroundColor: "#5a8acd",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 12
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    },
    logoutButton: {
        backgroundColor: "#fa7a7a"
    },
    logoutButtonText: {
        color: "#fff"
    },
});


