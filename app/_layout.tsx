// app/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}
                    />
                </SafeAreaView>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
