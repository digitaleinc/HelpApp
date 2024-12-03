// app/welcome.tsx

import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Automatically navigate to MainTabs after short delay
        const timer = setTimeout(() => {
            router.replace('/(tabs)/tickets');
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome, {user?.username} ({user?.accountType})
            </Text>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    title: {
        fontSize:24,
    },
});
