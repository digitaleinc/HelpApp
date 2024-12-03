// app/(tabs)/account.tsx

import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

const AccountScreen = () => {
    const router = useRouter();
    const { user, logout } = useContext(AuthContext);
    const [username, setUsername] = useState(user?.username || '');
    const [password, setPassword] = useState(user?.password || '');

    const handleUpdate = () => {
        // Since we're using static data, updating is limited
        // In a real app, you'd update the user data in a backend
        Alert.alert('Info', 'Account details updated (not really, static data).');
    };

    const handleLogout = () => {
        logout();
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Details</Text>
            <Text>Account Type: {user?.accountType}</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Update Details" onPress={handleUpdate} />
            <View style={{ marginTop: 20 }}>
                <Button title="Logout" onPress={handleLogout} color="red" />
            </View>
        </View>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:20,
        backgroundColor:'#fff',
    },
    title: {
        fontSize:24,
        marginBottom:20,
        textAlign:'center',
    },
    input: {
        borderWidth:1,
        borderColor:'#ccc',
        padding:10,
        marginBottom:10,
        borderRadius:5,
    },
});
